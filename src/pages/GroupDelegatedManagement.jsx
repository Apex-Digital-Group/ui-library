import React, { useState } from 'react';
import { Image, Video, FileText, MessageSquare, Lock, AlertTriangle, Plus, Edit, Trash2, Send, Eye } from 'lucide-react';
import GroupsLayout from '../components/groups/GroupsLayout';

const ALLOWED_SECTIONS = [
  { key: 'images', label: 'Images', icon: Image, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  { key: 'videos', label: 'Videos', icon: Video, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
  { key: 'posts', label: 'Posts', icon: FileText, color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' },
  { key: 'chat', label: 'Text Chat', icon: MessageSquare, color: 'text-pink-400', bg: 'bg-pink-500/10', border: 'border-pink-500/20' },
];

const RESTRICTED_SECTIONS = [
  'Username', 'Email', 'Billing', 'Address', 'Personal Details', 'Live Cams', 'Live Calls', 'Wallet'
];

const mockContent = {
  images: [
    { id: 1, title: 'summer_set_01.jpg', date: '2026-04-22', uploaded_by: '@geminiowner' },
    { id: 2, title: 'promo_banner_05.png', date: '2026-04-18', uploaded_by: '@amyrose' },
    { id: 3, title: 'exclusive_04.jpg', date: '2026-04-15', uploaded_by: '@geminiowner' },
  ],
  videos: [
    { id: 1, title: 'intro_video_v2.mp4', date: '2026-04-20', uploaded_by: '@geminiowner' },
    { id: 2, title: 'teaser_clip_03.mp4', date: '2026-04-12', uploaded_by: '@amyrose' },
  ],
  posts: [
    { id: 1, title: 'Weekly update post', date: '2026-04-28', author: '@geminiowner' },
    { id: 2, title: 'New content announcement', date: '2026-04-25', author: '@amyrose' },
  ],
  chat: [
    { id: 1, user: 'Fan123', message: 'Love your content!', time: '2h ago' },
    { id: 2, user: 'SuperFan88', message: 'When is your next live?', time: '5h ago' },
    { id: 3, user: 'TopFan', message: 'Can we do a private session?', time: '1d ago' },
  ],
};

export default function GroupDelegatedManagement() {
  const [activeSection, setActiveSection] = useState('images');
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState(mockContent.chat);

  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    setChatMessages(msgs => [...msgs, { id: Date.now(), user: '@geminiowner (you)', message: chatInput, time: 'just now' }]);
    setChatInput('');
  };

  const renderSection = () => {
    if (activeSection === 'images' || activeSection === 'videos') {
      const items = mockContent[activeSection];
      return (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-white/50 text-sm">{items.length} items</span>
            <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-xl text-xs font-medium text-white transition-colors">
              <Plus className="w-3.5 h-3.5" /> Add {activeSection === 'images' ? 'Image' : 'Video'}
            </button>
          </div>
          {items.map(item => (
            <div key={item.id} className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 hover:border-purple-400/30 rounded-xl transition-all">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                {activeSection === 'images' ? <Image className="w-5 h-5 text-blue-400" /> : <Video className="w-5 h-5 text-purple-400" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-white truncate">{item.title}</div>
                <div className="text-xs text-white/40">{item.date} · by {item.uploaded_by}</div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-white/10 rounded-lg text-white/40 hover:text-white transition-all"><Eye className="w-3.5 h-3.5" /></button>
                <button className="p-2 hover:bg-white/10 rounded-lg text-white/40 hover:text-white transition-all"><Edit className="w-3.5 h-3.5" /></button>
                <button className="p-2 hover:bg-red-500/10 rounded-lg text-white/40 hover:text-red-400 transition-all"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          ))}
        </div>
      );
    }
    if (activeSection === 'posts') {
      return (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-white/50 text-sm">{mockContent.posts.length} posts</span>
            <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-xl text-xs font-medium text-white transition-colors">
              <Plus className="w-3.5 h-3.5" /> Create Post
            </button>
          </div>
          {mockContent.posts.map(post => (
            <div key={post.id} className="p-4 bg-white/5 border border-white/10 hover:border-purple-400/30 rounded-xl transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-white">{post.title}</div>
                  <div className="text-xs text-white/40 mt-1">{post.date} · by {post.author}</div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-white/10 rounded-lg text-white/40 hover:text-white"><Edit className="w-3.5 h-3.5" /></button>
                  <button className="p-2 hover:bg-red-500/10 rounded-lg text-white/40 hover:text-red-400"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }
    if (activeSection === 'chat') {
      return (
        <div className="space-y-4">
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {chatMessages.map(msg => (
              <div key={msg.id} className="flex gap-3 p-3 bg-white/5 rounded-xl">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-white">
                  {msg.user[0].toUpperCase()}
                </div>
                <div>
                  <div className="text-xs text-purple-300 font-medium">{msg.user}</div>
                  <div className="text-sm text-white mt-0.5">{msg.message}</div>
                  <div className="text-xs text-white/30 mt-1">{msg.time}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input value={chatInput} onChange={e => setChatInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSendChat()}
              placeholder="Send a reply as @amyrose..."
              className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-purple-500" />
            <button onClick={handleSendChat} className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 rounded-xl text-white transition-colors">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      );
    }
  };

  return (
    <GroupsLayout activeNav="delegated" role="owner">
      <div className="space-y-6">
        {/* Warning Banner */}
        <div className="bg-orange-500/10 border border-orange-500/30 rounded-2xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold text-white text-sm">Delegated Management Mode</div>
            <p className="text-xs text-white/60 mt-0.5">You are managing the creator account <strong className="text-white">@amyrose</strong> with limited permissions. Sensitive account details, billing and live cam controls are restricted.</p>
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-white">Managing @amyrose</h1>
          <p className="text-white/40 text-sm mt-1">Gemini Elite Creators · Delegated access</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sections Nav */}
          <div className="space-y-3 lg:col-span-1">
            <div className="text-xs text-white/30 uppercase tracking-widest font-semibold px-1 mb-2">Available</div>
            {ALLOWED_SECTIONS.map(s => {
              const Icon = s.icon;
              return (
                <button key={s.key} onClick={() => setActiveSection(s.key)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-all text-sm font-medium
                    ${activeSection === s.key ? `${s.bg} ${s.border} ${s.color}` : 'bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/10'}`}>
                  <Icon className="w-4 h-4" />
                  {s.label}
                </button>
              );
            })}

            <div className="text-xs text-white/30 uppercase tracking-widest font-semibold px-1 mt-5 mb-2">Restricted</div>
            {RESTRICTED_SECTIONS.map(s => (
              <div key={s} className="flex items-center gap-3 px-4 py-2.5 bg-white/3 border border-white/5 rounded-xl text-sm text-white/25 cursor-not-allowed">
                <Lock className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{s}</span>
              </div>
            ))}
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3 bg-[#2E2249] border border-white/10 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-5">
              {ALLOWED_SECTIONS.find(s => s.key === activeSection) && (() => {
                const s = ALLOWED_SECTIONS.find(s => s.key === activeSection);
                const Icon = s.icon;
                return <><Icon className={`w-5 h-5 ${s.color}`} /><h2 className="font-bold text-white">{s.label}</h2></>;
              })()}
            </div>
            {renderSection()}
          </div>
        </div>

        {/* Restricted tooltip */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-start gap-3">
          <Lock className="w-4 h-4 text-white/30 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-white/40">Restricted sections are completely unavailable to Group Owners. This includes: {RESTRICTED_SECTIONS.join(', ')}.</p>
        </div>
      </div>
    </GroupsLayout>
  );
}