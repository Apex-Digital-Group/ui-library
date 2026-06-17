import React, { useState } from 'react';
import { MessageCircle, Share2, ThumbsUp, MoreHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const reactionEmojis = [
  { id: 'like', label: '👍', color: 'hover:scale-125' },
  { id: 'love', label: '❤️', color: 'hover:scale-125' },
  { id: 'happy', label: '😊', color: 'hover:scale-125' },
  { id: 'kiss', label: '😘', color: 'hover:scale-125' },
  { id: 'thinking', label: '🤔', color: 'hover:scale-125' },
  { id: 'angry', label: '😠', color: 'hover:scale-125' }
];

export default function PostCard({ post }) {
  const [showReactions, setShowReactions] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState(null);
  const [likesCount, setLikesCount] = useState(Math.floor(Math.random() * 500) + 50);
  const [commentsCount, setCommentsCount] = useState(Math.floor(Math.random() * 50) + 5);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([
    { id: 1, author: 'Fan123', text: 'Amazing! 😍', timestamp: '1h ago' },
    { id: 2, author: 'Viewer456', text: 'So beautiful! ✨', timestamp: '2h ago' }
  ]);
  const [newComment, setNewComment] = useState('');
  const [imageIndex, setImageIndex] = useState(0);

  const handleReaction = (reactionId) => {
    if (selectedReaction === reactionId) {
      setSelectedReaction(null);
      setLikesCount(prev => prev - 1);
    } else {
      if (!selectedReaction) {
        setLikesCount(prev => prev + 1);
      }
      setSelectedReaction(reactionId);
    }
    setShowReactions(false);
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([{ id: Date.now(), author: 'You', text: newComment, timestamp: 'Just now' }, ...comments]);
      setNewComment('');
      setCommentsCount(prev => prev + 1);
    }
  };

  const handleShare = () => {
    alert('Share functionality would open a share dialog here!');
  };

  const isGallery = post.images.length > 1;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#2E2249]/50 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/30 transition-all group"
    >
      {/* Post Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img 
            src={post.authorImage} 
            alt={post.author}
            className="w-10 h-10 rounded-full object-cover border-2 border-purple-500"
          />
          <div>
            <h3 className="font-semibold text-white">{post.author}</h3>
            <p className="text-xs text-white/60">{post.timestamp}</p>
          </div>
        </div>
        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
          <MoreHorizontal className="w-5 h-5 text-white/60" />
        </button>
      </div>

      {/* Post Content */}
      {post.content && (
        <div className="px-4 pb-3">
          <p className="text-white/90 text-sm">{post.content}</p>
        </div>
      )}

      {/* Post Images */}
      <div className="relative">
        {isGallery ? (
          <div className="relative">
            <img 
              src={post.images[imageIndex]} 
              alt={`Post by ${post.author}`}
              className="w-full h-auto object-cover"
            />
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
              {post.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setImageIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === imageIndex ? 'bg-white w-6' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
              {imageIndex + 1} / {post.images.length}
            </div>
          </div>
        ) : (
          <img 
            src={post.images[0]} 
            alt={`Post by ${post.author}`}
            className="w-full h-auto object-cover"
          />
        )}
      </div>

      {/* Reactions Bar */}
      <div className="px-4 py-3 border-t border-white/10">
        <div className="flex items-center justify-between text-sm text-white/60 mb-3">
          <span>{likesCount} reactions</span>
          <div className="flex items-center gap-3">
            <button onClick={() => setShowComments(!showComments)} className="hover:text-white transition-colors">
              {commentsCount} comments
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <button 
              onMouseEnter={() => setShowReactions(true)}
              onMouseLeave={() => setShowReactions(false)}
              onClick={() => !selectedReaction && handleReaction('like')}
              className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all ${
                selectedReaction 
                  ? 'bg-purple-600/20 text-purple-400' 
                  : 'hover:bg-white/5 text-white/70 hover:text-white'
              }`}
            >
              {selectedReaction ? (
                <>
                  <span className="text-lg">{reactionEmojis.find(r => r.id === selectedReaction)?.label}</span>
                  <span className="text-sm font-medium capitalize">
                    {reactionEmojis.find(r => r.id === selectedReaction)?.id}
                  </span>
                </>
              ) : (
                <>
                  <ThumbsUp className="w-5 h-5" />
                  <span className="text-sm font-medium">Like</span>
                </>
              )}
            </button>

            {/* Reaction Picker */}
            <AnimatePresence>
              {showReactions && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  onMouseEnter={() => setShowReactions(true)}
                  onMouseLeave={() => setShowReactions(false)}
                  className="absolute bottom-full left-0 mb-2 bg-[#1a0e2e] border border-white/20 rounded-full px-3 py-2 flex items-center gap-2 shadow-2xl z-10"
                >
                  {reactionEmojis.map((reaction) => (
                    <button
                      key={reaction.id}
                      onClick={() => handleReaction(reaction.id)}
                      className="text-2xl hover:scale-125 transition-transform"
                      title={reaction.id}
                    >
                      {reaction.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button 
            onClick={() => setShowComments(!showComments)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg hover:bg-white/5 transition-all text-white/70 hover:text-white"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm font-medium">Comment</span>
          </button>

          <button 
            onClick={handleShare}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg hover:bg-white/5 transition-all text-white/70 hover:text-white"
          >
            <Share2 className="w-5 h-5" />
            <span className="text-sm font-medium">Share</span>
          </button>
        </div>
      </div>

      {/* Comments Section */}
      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-white/10 overflow-hidden"
          >
            <div className="p-4 space-y-3 max-h-64 overflow-y-auto">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex-shrink-0" />
                  <div className="flex-1 bg-white/5 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-sm text-white">{comment.author}</span>
                      <span className="text-xs text-white/40">{comment.timestamp}</span>
                    </div>
                    <p className="text-sm text-white/80">{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Comment */}
            <form onSubmit={handleAddComment} className="p-4 border-t border-white/10 flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex-shrink-0" />
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-purple-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-full text-sm font-medium transition-all"
              >
                Post
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}