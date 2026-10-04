import React, { useState, useEffect } from 'react';
import { Student } from '../types';
import { api } from '../services/api';
import { Search, Filter, Users, Download, ArrowUpDown } from 'lucide-react';

export const RegistrationsTableTab: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedChannel, setSelectedChannel] = useState<string>('All');

  useEffect(() => {
    fetchStudents();
  }, [selectedChannel]);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const channelParam = selectedChannel === 'All' ? undefined : selectedChannel;
      const data = await api.getRegistrations(300, 0, channelParam);
      setStudents(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.college.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      s.referral_code.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  const maskPhone = (phone: string) => {
    if (phone.length <= 4) return '******';
    return phone.slice(0, 4) + '******';
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            Live Registered Cohort ({filteredStudents.length} Students)
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Real-time database records of registered final-year engineering students with attribution tags.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, college, code..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 w-56 sm:w-64"
            />
          </div>

          {/* Channel Filter */}
          <select
            value={selectedChannel}
            onChange={(e) => setSelectedChannel(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500"
          >
            <option value="All">All Channels</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="College Clubs">College Clubs</option>
            <option value="Referral">Referral</option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="Email">Email</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl glass-panel border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 text-slate-400 uppercase tracking-wider text-[10px] font-semibold border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">Email Address</th>
                <th className="py-3 px-4">College</th>
                <th className="py-3 px-4">Branch</th>
                <th className="py-3 px-4">Channel</th>
                <th className="py-3 px-4">Referral Code</th>
                <th className="py-3 px-4">Referred By</th>
                <th className="py-3 px-4">Registered Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400 font-sans">
                    <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                    Loading registrations...
                  </td>
                </tr>
              ) : filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400 font-sans">
                    No student registrations found matching your query.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-800/30 transition">
                    <td className="py-3 px-4 font-sans font-semibold text-white">
                      {s.name}
                    </td>
                    <td className="py-3 px-4 text-slate-400">{s.email}</td>
                    <td className="py-3 px-4 font-sans text-slate-300 max-w-[180px] truncate">
                      {s.college}
                    </td>
                    <td className="py-3 px-4 font-sans text-slate-400 max-w-[150px] truncate">
                      {s.branch}
                    </td>
                    <td className="py-3 px-4 font-sans">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-800 text-slate-200">
                        {s.channel}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-pink-400 font-bold">{s.referral_code}</td>
                    <td className="py-3 px-4 text-indigo-300">
                      {s.referred_by || <span className="text-slate-600">—</span>}
                    </td>
                    <td className="py-3 px-4 text-slate-500 font-sans text-[11px]">
                      {new Date(s.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
