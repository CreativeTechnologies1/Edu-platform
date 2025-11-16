
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'IT', progress: 85, engagement: 92 },
  { name: 'Marketing', progress: 72, engagement: 88 },
  { name: 'Finance', progress: 65, engagement: 78 },
  { name: 'Sales', progress: 91, engagement: 95 },
  { name: 'HR', progress: 58, engagement: 71 },
];

const teamMembers = [
    { name: 'Alex Johnson', role: 'Frontend Developer', progress: 95, path: 'React Mastery' },
    { name: 'Maria Garcia', role: 'SEO Specialist', progress: 88, path: 'Advanced SEO' },
    { name: 'Chen Wei', role: 'Financial Analyst', progress: 76, path: 'Quantitative Analysis' },
    { name: 'Sarah Miller', role: 'Junior Developer', progress: 62, path: 'JavaScript Fundamentals' }
];

export const CorporateDashboard: React.FC = () => {
  return (
    <div className="p-8 bg-slate-900 rounded-2xl border border-slate-800">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
            <h2 className="text-3xl font-bold text-white">Corporate Dashboard</h2>
            <p className="text-slate-400 mt-1">Analytics and management for your team's upskilling journey.</p>
        </div>
        <button className="mt-4 md:mt-0 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
            Request a Demo
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 p-6 bg-slate-800/50 rounded-xl border border-slate-700">
          <h3 className="text-xl font-semibold mb-4">Team Progress by Department</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}/>
              <Legend />
              <Bar dataKey="progress" fill="#6366f1" name="Avg. Progress (%)" />
              <Bar dataKey="engagement" fill="#818cf8" name="Engagement (%)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700 flex flex-col justify-center text-center">
            <h3 className="text-xl font-semibold mb-2">Overall Completion</h3>
            <p className="text-6xl font-bold text-emerald-400">78%</p>
            <p className="text-slate-400 mt-2">Across all active learning paths.</p>
        </div>

        <div className="lg:col-span-3 p-6 bg-slate-800/50 rounded-xl border border-slate-700">
             <h3 className="text-xl font-semibold mb-4">Employee Leaderboard</h3>
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-slate-700">
                            <th className="p-3 text-sm font-semibold text-slate-400">Employee</th>
                            <th className="p-3 text-sm font-semibold text-slate-400">Learning Path</th>
                            <th className="p-3 text-sm font-semibold text-slate-400 text-right">Progress</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teamMembers.map(member => (
                            <tr key={member.name} className="border-b border-slate-800 hover:bg-slate-800 transition-colors">
                                <td className="p-3">
                                    <p className="font-medium text-white">{member.name}</p>
                                    <p className="text-sm text-slate-400">{member.role}</p>
                                </td>
                                <td className="p-3 text-slate-300">{member.path}</td>
                                <td className="p-3 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <span className="font-semibold text-white">{member.progress}%</span>
                                        <div className="w-24 bg-slate-700 rounded-full h-2">
                                            <div className="bg-indigo-500 h-2 rounded-full" style={{width: `${member.progress}%`}}></div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
             </div>
        </div>
      </div>
    </div>
  );
};
