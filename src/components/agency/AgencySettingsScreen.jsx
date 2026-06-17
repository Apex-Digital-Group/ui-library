import React, { useState } from 'react';
import { Building, Users, Shield, CreditCard, ChevronRight } from 'lucide-react';

export default function AgencySettingsScreen() {
  const [selectedMember, setSelectedMember] = useState(null);

  const teamMembers = [
    { id: 1, name: 'John Manager', role: 'Agency Manager', permissions: ['All Access'], active: true },
    { id: 2, name: 'Sarah Analytics', role: 'Data Analyst', permissions: ['Earnings', 'Creators'], active: true },
    { id: 3, name: 'Mike Support', role: 'Support Lead', permissions: ['Creators', 'Payouts'], active: true },
    { id: 4, name: 'Lisa Marketing', role: 'Marketing Manager', permissions: ['Promotions'], active: false },
  ];

  return (
    <div className="space-y-6">
      {/* Agency Profile */}
      <div className="bg-gradient-to-br from-[#2E2249] to-[#1a0e2e] border border-white/10 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <Building className="w-5 h-5 text-purple-400" />
          <h2 className="text-xl font-bold">Agency Profile</h2>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-white/60 mb-2">Agency Name</label>
            <input
              type="text"
              defaultValue="Elite Models Agency"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/60 mb-2">Contact Email</label>
            <input
              type="email"
              defaultValue="contact@elitemodels.com"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/60 mb-2">Default Commission</label>
            <input
              type="text"
              defaultValue="20%"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/60 mb-2">Payout Schedule</label>
            <select className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option>Weekly</option>
              <option>Bi-weekly</option>
              <option>Monthly</option>
            </select>
          </div>
        </div>
      </div>

      {/* Team Members */}
      <div className="bg-gradient-to-br from-[#2E2249] to-[#1a0e2e] border border-white/10 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-400" />
            <h2 className="text-xl font-bold">Team Members</h2>
          </div>
          <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg text-sm font-medium transition-all">
            Add Member
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-sm font-medium text-white/60">Name</th>
                <th className="text-left p-4 text-sm font-medium text-white/60">Role</th>
                <th className="text-left p-4 text-sm font-medium text-white/60">Permissions</th>
                <th className="text-left p-4 text-sm font-medium text-white/60">Status</th>
                <th className="text-right p-4 text-sm font-medium text-white/60">Action</th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.map((member) => (
                <tr
                  key={member.id}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
                  onClick={() => setSelectedMember(member)}
                >
                  <td className="p-4 font-medium">{member.name}</td>
                  <td className="p-4 text-white/80">{member.role}</td>
                  <td className="p-4 text-white/60">{member.permissions.join(', ')}</td>
                  <td className="p-4">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={member.active} onChange={() => {}} className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedMember(member);
                      }}
                      className="text-purple-400 hover:text-purple-300"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-gradient-to-br from-[#2E2249] to-[#1a0e2e] border border-white/10 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <CreditCard className="w-5 h-5 text-purple-400" />
          <h2 className="text-xl font-bold">Payment Methods</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded flex items-center justify-center text-xs font-bold">
                VISA
              </div>
              <div>
                <p className="font-medium">•••• 4242</p>
                <p className="text-xs text-white/60">Expires 12/26</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-medium rounded-full">Default</span>
          </div>
          <button className="w-full py-3 border-2 border-dashed border-white/20 rounded-xl hover:border-white/40 transition-colors text-white/60 hover:text-white">
            + Add Payment Method
          </button>
        </div>
      </div>

      {/* Member Permission Panel */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center" onClick={() => setSelectedMember(null)}>
          <div className="bg-gradient-to-br from-[#2E2249] to-[#1a0e2e] border border-white/10 rounded-2xl p-6 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold mb-4">Manage Permissions: {selectedMember.name}</h3>
            <div className="space-y-3">
              {['Creators', 'Earnings', 'Payouts', 'Promotions', 'Settings'].map((permission) => (
                <label key={permission} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-colors">
                  <input type="checkbox" defaultChecked={selectedMember.permissions.includes(permission)} className="w-5 h-5 rounded" />
                  <span>{permission}</span>
                </label>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setSelectedMember(null)} className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg font-medium transition-all">
                Cancel
              </button>
              <button onClick={() => setSelectedMember(null)} className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-medium transition-all">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}