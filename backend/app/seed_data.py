import random
from datetime import datetime, timedelta, timezone
from sqlalchemy.orm import Session
from .models import Student, Campaign, Experiment, Event, FunnelMetric

INDIAN_COLLEGES = [
    "JNTU Hyderabad", "Osmania University", "CBIT Hyderabad", "VNR VJIET",
    "Gokaraju Rangaraju Institute", "Vasavi College of Engineering",
    "BVRIT Hyderabad", "Sreenidhi Institute of Science & Technology",
    "SRM Institute of Science & Tech", "VIT Vellore", "PES University Bangalore",
    "PSG College of Technology", "RV College of Engineering", "Thapar Institute"
]

BRANCHES = [
    "Computer Science & Engineering",
    "Information Technology",
    "Electronics & Communication Engineering",
    "Artificial Intelligence & Data Science",
    "Electrical & Electronics Engineering",
    "Mechanical Engineering"
]

FIRST_NAMES = [
    "Aarav", "Pooja", "Rohan", "Sneha", "Aditya", "Ananya", "Vikram", "Divya",
    "Karthik", "Meera", "Rahul", "Swati", "Nikhil", "Priya", "Siddharth", "Ishita",
    "Varun", "Rhea", "Harish", "Tanvi", "Gautam", "Kavya", "Arjun", "Neha"
]

LAST_NAMES = [
    "Sharma", "Patel", "Verma", "Reddy", "Iyer", "Nair", "Rao", "Gupta",
    "Choudhury", "Mehta", "Deshmukh", "Kulkarni", "Bhat", "Singhal", "Menon"
]

def generate_referral_code(name: str, index: int) -> str:
    clean_prefix = "".join([c for c in name.upper() if c.isalpha()])[:4]
    return f"{clean_prefix}{100 + index}"

def seed_database(db: Session, full_campaign: bool = True):
    """
    Clears existing records and populates the database.
    If full_campaign is True, seeds the complete 500-registration 7-day simulated dataset.
    If full_campaign is False, creates a minimal clean baseline.
    """
    db.query(Event).delete()
    db.query(Student).delete()
    db.query(Campaign).delete()
    db.query(Experiment).delete()
    db.query(FunnelMetric).delete()
    db.commit()

    # 1. Setup Funnel Metrics
    # Reach: 4,000, Visitors: 2,000, Forms Started: 800, Registrations: 500
    funnel = FunnelMetric(
        stage_reach=4000 if full_campaign else 500,
        stage_visitors=2000 if full_campaign else 250,
        stage_forms_started=800 if full_campaign else 80
    )
    db.add(funnel)

    # 2. Setup Campaigns matching the Challenge constraints
    # Total budget ₹2,000 across 5 channels
    campaign_configs = [
        {"name": "WhatsApp Peer & Class Groups", "channel": "WhatsApp", "budget": 400.0, "impressions": 3200, "clicks": 450, "target_regs": 130},
        {"name": "College Tech & Coding Clubs", "channel": "College Clubs", "budget": 400.0, "impressions": 2800, "clicks": 380, "target_regs": 100},
        {"name": "Student Referral Engine", "channel": "Referral", "budget": 500.0, "impressions": 3600, "clicks": 490, "target_regs": 120},
        {"name": "LinkedIn Placement & Career Posts", "channel": "LinkedIn", "budget": 400.0, "impressions": 2500, "clicks": 310, "target_regs": 80},
        {"name": "Alumni & Placement Cell Emailers", "channel": "Email", "budget": 300.0, "impressions": 1900, "clicks": 260, "target_regs": 70},
    ]

    for cfg in campaign_configs:
        regs = cfg["target_regs"] if full_campaign else int(cfg["target_regs"] * 0.1)
        db_camp = Campaign(
            name=cfg["name"],
            channel=cfg["channel"],
            budget=cfg["budget"],
            impressions=cfg["impressions"] if full_campaign else int(cfg["impressions"] * 0.1),
            clicks=cfg["clicks"] if full_campaign else int(cfg["clicks"] * 0.1),
            registrations=regs
        )
        db.add(db_camp)
    db.commit()

    # 3. Setup A/B Experiments
    exp1 = Experiment(
        name="Landing Page Hero Headline Test",
        variant_a="Build Your First AI Project in 60 Minutes",
        variant_b="Final-Year Students: Build an AI Project Before Your Next Interview",
        impressions_a=1020 if full_campaign else 120,
        impressions_b=980 if full_campaign else 130,
        clicks_a=235 if full_campaign else 28,
        clicks_b=315 if full_campaign else 46,
        registrations_a=210 if full_campaign else 24,
        registrations_b=290 if full_campaign else 38,
        status="Active"
    )
    db.add(exp1)

    exp2 = Experiment(
        name="Primary CTA Button Copy Test",
        variant_a="Register Free for Workshop",
        variant_b="Claim Your Free AI Workshop Seat (Limited)",
        impressions_a=850 if full_campaign else 100,
        impressions_b=820 if full_campaign else 95,
        clicks_a=190 if full_campaign else 20,
        clicks_b=240 if full_campaign else 32,
        registrations_a=140 if full_campaign else 15,
        registrations_b=185 if full_campaign else 22,
        status="Active"
    )
    db.add(exp2)
    db.commit()

    if not full_campaign:
        return

    # 4. Generate 500 Students matching channel distributions
    # WhatsApp: 130, College Clubs: 100, Referral: 120, LinkedIn: 80, Email: 70 -> Total = 500
    now = datetime.now(timezone.utc)
    channel_counts = {
        "WhatsApp": 130,
        "College Clubs": 100,
        "Referral": 120,
        "LinkedIn": 80,
        "Email": 70
    }

    # Top referrers who will generate the referral chain
    # Top 3: Student A (Aarav Sharma) - 18, Student B (Pooja Patel) - 12, Student C (Rohan Verma) - 8, etc.
    top_referrers = [
        {"name": "Aarav Sharma", "code": "AARA101", "target": 18, "channel": "WhatsApp"},
        {"name": "Pooja Patel", "code": "POOJ102", "target": 12, "channel": "College Clubs"},
        {"name": "Rohan Verma", "code": "ROHA103", "target": 8, "channel": "LinkedIn"},
        {"name": "Sneha Reddy", "code": "SNEH104", "target": 7, "channel": "WhatsApp"},
        {"name": "Aditya Iyer", "code": "ADIT105", "target": 6, "channel": "College Clubs"},
        {"name": "Ananya Nair", "code": "ANAN106", "target": 5, "channel": "Email"},
        {"name": "Vikram Rao", "code": "VIKR107", "target": 5, "channel": "WhatsApp"},
        {"name": "Divya Gupta", "code": "DIVY108", "target": 4, "channel": "LinkedIn"},
        {"name": "Karthik Choudhury", "code": "KART109", "target": 4, "channel": "College Clubs"},
        {"name": "Meera Mehta", "code": "MEER110", "target": 3, "channel": "Email"}
    ]

    # Insert top referrers first
    created_students = []
    student_index = 100
    for i, tr in enumerate(top_referrers):
        student_index += 1
        created_time = now - timedelta(days=6, hours=random.randint(1, 10))
        st = Student(
            name=tr["name"],
            email=f"{tr['name'].lower().replace(' ', '.')}@demo.ac.in",
            phone=f"98765{10000 + i}",
            college=INDIAN_COLLEGES[i % len(INDIAN_COLLEGES)],
            branch=BRANCHES[i % len(BRANCHES)],
            graduation_year=2025,
            channel=tr["channel"],
            referral_code=tr["code"],
            referred_by=None,
            created_at=created_time
        )
        db.add(st)
        created_students.append(st)
    db.commit()

    # Distribute the referral targets among the 120 referral students
    referral_pool = []
    for tr in top_referrers:
        referral_pool.extend([tr["code"]] * tr["target"])
    
    # Fill remaining referral pool up to 120 with minor referrers
    other_codes = ["SIDD111", "ISHT112", "VARU113", "RHEA114", "HARI115"]
    while len(referral_pool) < channel_counts["Referral"]:
        referral_pool.append(random.choice(other_codes))

    # Create remaining students per channel
    for channel, total_count in channel_counts.items():
        # Subtract any top referrers already credited to this channel
        already_created_for_channel = sum(1 for s in created_students if s.channel == channel)
        needed = total_count - already_created_for_channel

        for idx in range(needed):
            student_index += 1
            f_name = random.choice(FIRST_NAMES)
            l_name = random.choice(LAST_NAMES)
            full_name = f"{f_name} {l_name}"
            email = f"{f_name.lower()}.{l_name.lower()}{student_index}@demo.ac.in"
            phone = f"98{random.randint(10000000, 99999999)}"
            college = random.choice(INDIAN_COLLEGES)
            branch = random.choice(BRANCHES)
            code = generate_referral_code(full_name, student_index)

            # Random creation time across the 7-day campaign
            days_ago = random.uniform(0.1, 6.9)
            created_time = now - timedelta(days=days_ago)

            ref_by = None
            if channel == "Referral":
                ref_by = referral_pool.pop() if referral_pool else "AARA101"

            st = Student(
                name=full_name,
                email=email,
                phone=phone,
                college=college,
                branch=branch,
                graduation_year=2025,
                channel=channel,
                referral_code=code,
                referred_by=ref_by,
                created_at=created_time
            )
            db.add(st)
            created_students.append(st)

    db.commit()

    # Add sample events to illustrate the tracking architecture
    for st in created_students[:50]:
        db.add(Event(
            student_id=st.id,
            event_type="registration_completed",
            channel=st.channel,
            timestamp=st.created_at
        ))
        if st.referred_by:
            db.add(Event(
                student_id=st.id,
                event_type="referral_conversion",
                channel="Referral",
                timestamp=st.created_at
            ))
    db.commit()
