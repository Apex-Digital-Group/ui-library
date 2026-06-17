import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Share2, UserPlus } from 'lucide-react';

export default function PostDetailModal({ isOpen, onClose, post }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([
    { id: 1, username: 'ahri_official', text: 'Amazing! 🔥', timestamp: '2h', avatar: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/5bbab6525_0a375a0a705a1f1052460dd069d2953f_erotic_576x324.jpeg' },
    { id: 2, username: 'candy_crush', text: 'Love this content! 💕', timestamp: '1h', avatar: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/cb4bc0b07_1bda7eff495213fc3276fdb20e0cfa72_erotic_576x324.jpeg' },
    { id: 3, username: 'vip_member', text: 'Stunning as always 💜', timestamp: '45m', avatar: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/0794a4326_Screenshot2025-10-20at055030.png' },
    { id: 4, username: 'bella_bombshell', text: 'Queen energy! 👑', timestamp: '30m', avatar: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/df70ae66f_2cde84c396bc0995741d005b75d4fa43_erotic_576x324.jpeg' },
    { id: 5, username: 'luna_luxe', text: 'Can\'t wait for the live stream!', timestamp: '20m', avatar: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/46e088356_3f464eaf5c4d35e56e57b3dd94e05aea_erotic_576x324.jpeg' },
  ]);

  if (!isOpen || !post) return null;

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    setComments([...comments, {
      id: Date.now(),
      username: 'antman_fan',
      text: newComment,
      timestamp: 'now',
      avatar: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f5a0cfe97e644ca7434f9b/0794a4326_Screenshot2025-10-20at055030.png'
    }]);
    setNewComment('');
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/90 z-[10000] flex items-center justify-center p-4"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-white hover:bg-white/10 rounded-full transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-5xl max-h-[90vh] bg-[#1a0e2e] rounded-xl overflow-hidden flex flex-col md:flex-row"
        >
          {/* Left - Image/Video */}
          <div className="md:w-[60%] bg-black flex items-center justify-center">
            <img 
              src={post.image} 
              alt="" 
              className="w-full h-full object-contain max-h-[50vh] md:max-h-[90vh]"
            />
          </div>

          {/* Right - Details */}
          <div className="md:w-[40%] flex flex-col bg-[#2E2249] max-h-[40vh] md:max-h-[90vh]">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <img 
                  src={post.authorImage} 
                  alt={post.author} 
                  className="w-10 h-10 rounded-full object-cover border-2 border-purple-500"
                />
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-white text-sm">{post.author}</span>
                    {post.verified && (
                      <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                    )}
                  </div>
                  <span className="text-white/50 text-xs">{post.timestamp}</span>
                </div>
              </div>
              <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <MoreHorizontal className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Caption & Comments */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Caption */}
              <div className="flex gap-3">
                <img 
                  src={post.authorImage} 
                  alt={post.author} 
                  className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                />
                <div>
                  <span className="font-semibold text-white text-sm">{post.author}</span>{' '}
                  <span className="text-white/90 text-sm">{post.caption}</span>
                </div>
              </div>

              {/* Comments */}
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <img 
                    src={comment.avatar} 
                    alt={comment.username} 
                    className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div>
                      <span className="font-semibold text-white text-sm">{comment.username}</span>{' '}
                      <span className="text-white/90 text-sm">{comment.text}</span>
                    </div>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-white/40 text-xs">{comment.timestamp}</span>
                      <button className="text-white/40 text-xs hover:text-white/60">Reply</button>
                      <button className="text-white/40 hover:text-red-400">
                        <Heart className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="border-t border-white/10 p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-4">
                  <button onClick={() => setLiked(!liked)} className="hover:opacity-70 transition-opacity">
                    <Heart className={`w-6 h-6 ${liked ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                  </button>
                  <button className="hover:opacity-70 transition-opacity">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </button>
                  <button className="hover:opacity-70 transition-opacity">
                    <Send className="w-6 h-6 text-white" />
                  </button>
                  <button className="hover:opacity-70 transition-opacity">
                    <Share2 className="w-6 h-6 text-white" />
                  </button>
                </div>
                <button onClick={() => setSaved(!saved)} className="hover:opacity-70 transition-opacity">
                  <Bookmark className={`w-6 h-6 ${saved ? 'fill-white text-white' : 'text-white'}`} />
                </button>
              </div>

              <div className="text-sm text-white mb-2">
                <span className="font-semibold">{(liked ? post.likes + 1 : post.likes).toLocaleString()} likes</span>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-2 mb-3">
                <button className="flex-1 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg text-white text-sm font-medium transition-all flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" />
                  Send DM
                </button>
                <button className="flex-1 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm font-medium transition-all flex items-center justify-center gap-2">
                  <UserPlus className="w-4 h-4" />
                  Follow
                </button>
              </div>

              {/* Add Comment */}
              <div className="flex gap-2 pt-2 border-t border-white/10">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                  className="flex-1 bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
                />
                {newComment.trim() && (
                  <button 
                    onClick={handleAddComment}
                    className="text-blue-400 text-sm font-semibold hover:text-blue-300"
                  >
                    Post
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}