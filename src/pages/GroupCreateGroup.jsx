import React, { useState } from 'react';
import { Upload, CheckCircle } from 'lucide-react';
import GroupsLayout from '../components/groups/GroupsLayout';

export default function GroupCreateGroup() {
  const [form, setForm] = useState({ name: '', description: '', commission: '', rules: '' });
  const [submitted, setSubmitted] = useState(false);

  // Simulate: user is already in a group (change to 'owner' or 'member' to test guard states)
  const userGroupState = 'none'; // 'none' | 'owner' | 'member'

  if (userGroupState === 'owner') {
    return (
      <GroupsLayout activeNav="browse" role="creator">
        <div className="text-center py-16 space-y-3">
          <div className="text-4xl">🏠</div>
          <h2 className="text-2xl font-bold text-white">You already own a group.</h2>
          <p className="text-white/50">A creator can only own one group at a time.</p>
          <a href="/groups/owner-dashboard" className="inline-block mt-4 px-6 py-3 bg-purple-600 rounded-xl text-sm font-bold text-white">Go to My Group Dashboard</a>
        </div>
      </GroupsLayout>
    );
  }

  if (userGroupState === 'member') {
    return (
      <GroupsLayout activeNav="browse" role="creator">
        <div className="text-center py-16 space-y-3">
          <div className="text-4xl">🔒</div>
          <h2 className="text-2xl font-bold text-white">You cannot create a group while you are a member of another group.</h2>
          <p className="text-white/50">Leave your current group first to create your own.</p>
          <a href="/groups/my-group" className="inline-block mt-4 px-6 py-3 bg-purple-600 rounded-xl text-sm font-bold text-white">View My Group</a>
        </div>
      </GroupsLayout>
    );
  }

  if (submitted) {
    return (
      <GroupsLayout activeNav="browse" role="creator">
        <div className="text-center py-16 space-y-4">
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto" />
          <h2 className="text-2xl font-bold text-white">Group Created!</h2>
          <p className="text-white/60">Your group <strong className="text-white">{form.name}</strong> is now live.</p>
          <a href="/groups/owner-dashboard" className="inline-block mt-4 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-sm font-bold text-white">Go to Group Dashboard</a>
        </div>
      </GroupsLayout>
    );
  }

  return (
    <GroupsLayout activeNav="browse" role="creator">
      <div className="max-w-2xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Create a Group</h1>
          <p className="text-white/50 mt-1">Set up your creator group and start accepting members.</p>
        </div>

        <div className="bg-[#2E2249] border border-white/10 rounded-2xl p-6 space-y-6">
          {/* Avatar & Banner */}
          <div className="flex gap-4">
            <div>
              <label className="block text-xs text-white/40 mb-2">Group Avatar</label>
              <div className="w-20 h-20 bg-white/5 border-2 border-dashed border-white/20 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-purple-400/50 transition-colors">
                <Upload className="w-5 h-5 text-white/30 mb-1" />
                <span className="text-xs text-white/30">Upload</span>
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-xs text-white/40 mb-2">Group Banner</label>
              <div className="h-20 bg-white/5 border-2 border-dashed border-white/20 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-purple-400/50 transition-colors">
                <Upload className="w-5 h-5 text-white/30 mb-1" />
                <span className="text-xs text-white/30">Upload banner image</span>
              </div>
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">Group Name *</label>
            <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              placeholder="e.g. Gemini Elite Creators"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-purple-500" />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">Description *</label>
            <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              placeholder="Describe your group, what you offer, and the type of creators you're looking for..."
              rows={4}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-purple-500 resize-none" />
          </div>

          {/* Commission */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">Advertised Commission Rate (%)</label>
            <div className="flex items-center gap-3">
              <input type="number" min="0" max="50" value={form.commission} onChange={e => setForm(f => ({ ...f, commission: e.target.value }))}
                placeholder="e.g. 10"
                className="w-40 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-purple-500 text-lg font-bold" />
              <span className="text-white/50 text-2xl">%</span>
              <span className="text-xs text-white/40">This is the rate shown publicly to potential members.</span>
            </div>
          </div>

          {/* Rules */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">Group Rules</label>
            <textarea value={form.rules} onChange={e => setForm(f => ({ ...f, rules: e.target.value }))}
              placeholder="Any specific rules or expectations for group members..."
              rows={3}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-purple-500 resize-none" />
          </div>

          <button
            onClick={() => form.name && form.commission && setSubmitted(true)}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl text-white font-bold text-lg transition-all">
            Create Group
          </button>
        </div>
      </div>
    </GroupsLayout>
  );
}