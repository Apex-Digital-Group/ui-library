import React, { useState } from 'react';
import { Send } from 'lucide-react';
import GroupsLayout from '../components/groups/GroupsLayout';

const mockThreads = [
  { id: 1, name: '@geminiowner', lastMessage: 'Your commission has been updated.', time: '2h ago', unread: true },
  { id: 2, name: 'Support', lastMessage: 'Your request has been received.', time: '1d ago', unread: false },
  { id: 3, name: '@amyrose', lastMessage: 'Hey, just checking in!', time: '3d ago', unread: false },
];

const mockMessages = [
  { id: 1, from: '@geminiowner', text: 'Hey, just letting you know your commission has been updated to 12%.', time: '2h ago' },
  { id: 2, from: 'You', text: 'Thanks for letting me know!', time: '2h ago' },
];

export default function GroupMessenger() {
  const [activeThread, setActiveThread] = useState(mockThreads[0]);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(mockMessages);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(ms => [...ms, { id: Date.now(), from: 'You', text: input, time: 'just now' }]);
    setInput('');
  };

  return (
    <GroupsLayout activeNav="messenger" role="creator">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-white">Messenger</h1>
        <div className="grid lg:grid-cols-3 gap-4 h-[60vh]">
          {/* Threads */}
          <div className="bg-[#2E2249] border border-white/10 rounded-2xl overflow-y-auto">
            {mockThreads.map(t => (
              <button key={t.id} onClick={() => setActiveThread(t)}
                className={`w-full text-left px-4 py-3 border-b border-white/5 hover:bg-white/5 transition-colors
                  ${activeThread.id === t.id ? 'bg-purple-600/10 border-l-2 border-l-purple-500' : ''}`}>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-white text-sm">{t.name}</span>
                  <span className="text-xs text-white/30">{t.time}</span>
                </div>
                <div className="text-xs text-white/40 truncate mt-0.5">{t.lastMessage}</div>
                {t.unread && <span className="inline-block w-2 h-2 bg-purple-400 rounded-full mt-1" />}
              </button>
            ))}
          </div>

          {/* Chat */}
          <div className="lg:col-span-2 bg-[#2E2249] border border-white/10 rounded-2xl flex flex-col">
            <div className="px-4 py-3 border-b border-white/10 font-semibold text-white">{activeThread.name}</div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map(m => (
                <div key={m.id} className={`flex ${m.from === 'You' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs px-4 py-2.5 rounded-2xl text-sm
                    ${m.from === 'You' ? 'bg-purple-600 text-white' : 'bg-white/10 text-white'}`}>
                    {m.text}
                    <div className="text-xs opacity-50 mt-1">{m.time}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-white/10 flex gap-2">
              <input value={input} onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-purple-500" />
              <button onClick={handleSend} className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 rounded-xl text-white transition-colors">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </GroupsLayout>
  );
}