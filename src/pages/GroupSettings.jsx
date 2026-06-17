import React, { useState } from 'react';
import { Save } from 'lucide-react';
import GroupsLayout from '../components/groups/GroupsLayout';

export default function GroupSettings() {
  const [form, setForm] = useState({
    name: 'Gemini Elite Creators',
    description: 'A premium group for high-performing creators on the LiveGemini platform.',
    commission: '10',
    maxMembers: '50',
    rules: 'Be respectful. No spam. Minimum 2 streams per week.',
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <GroupsLayout activeNav="settings" role="owner">
      <div className="max-w-2xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Group Settings</h1>
          <p className="text-white/50 mt-1">Manage your group configuration and public details.</p>
        </div>

        <div className="bg-[#2E2249] border border-white/10 rounded-2xl p-6 space-y-5">
          {[
            { label: 'Group Name', key: 'name', type: 'text' },
            { label: 'Advertised Commission (%)', key: 'commission', type: 'number' },
            { label: 'Max Members', key: 'maxMembers', type: 'number' },
          ].map(f => (
            <div key={f.key}>
              <label className="block text-sm font-medium text-white mb-2">{f.label}</label>
              <input type={f.type} value={form[f.key]}
                onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-purple-500" />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-white mb-2">Description</label>
            <textarea rows={3} value={form.description}
              onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-purple-500 resize-none" />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">Group Rules</label>
            <textarea rows={3} value={form.rules}
              onChange={e => setForm(p => ({ ...p, rules: e.target.value }))}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-purple-500 resize-none" />
          </div>

          <button onClick={handleSave}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl text-white font-bold transition-all">
            <Save className="w-4 h-4" />
            {saved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>
    </GroupsLayout>
  );
}