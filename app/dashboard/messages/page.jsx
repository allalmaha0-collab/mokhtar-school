'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Phone, Mail, Calendar, CheckCircle, Inbox } from 'lucide-react';
import toast from 'react-hot-toast';

export default function DashboardMessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [filter, setFilter]     = useState('all');

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch('/api/messages');
      const data = await res.json();
      setMessages(data.messages || []);
    } catch { toast.error('خطأ في تحميل الرسائل'); }
    finally { setLoading(false); }
  }

  async function markRead(id) {
    await fetch('/api/messages', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    setMessages(prev => prev.map(m => m.id === id ? { ...m, isRead: true } : m));
  }

  const filtered = filter === 'unread' ? messages.filter(m => !m.isRead) : messages;
  const unreadCount = messages.filter(m => !m.isRead).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-primary dark:text-white">الرسائل</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {messages.length} رسالة {unreadCount > 0 && <span className="text-red-500 font-bold">({unreadCount} غير مقروءة)</span>}
          </p>
        </div>
        <div className="flex gap-2">
          {['all', 'unread'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${filter === f ? 'bg-primary text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300'}`}>
              {f === 'all' ? 'الكل' : `غير مقروءة (${unreadCount})`}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" /></div>
      ) : filtered.length === 0 ? (
        <div className="card p-16 text-center text-gray-400">
          <Inbox size={48} className="mx-auto mb-3 opacity-40" />
          <p>{filter === 'unread' ? 'لا توجد رسائل غير مقروءة' : 'لا توجد رسائل'}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(m => (
            <motion.div key={m.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className={`card p-5 transition-all ${!m.isRead ? 'border-r-4 border-primary' : ''}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${!m.isRead ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-500'}`}>
                    <MessageSquare size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-black text-gray-800 dark:text-white">{m.name}</p>
                      {!m.isRead && <span className="badge bg-primary text-white text-xs">جديد</span>}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-3">{m.message}</p>
                    <div className="flex flex-wrap gap-3 text-xs text-gray-400">
                      {m.phone && <span className="flex items-center gap-1"><Phone size={11} /> {m.phone}</span>}
                      {m.email && <span className="flex items-center gap-1"><Mail size={11} /> {m.email}</span>}
                      <span className="flex items-center gap-1"><Calendar size={11} /> {new Date(m.createdAt).toLocaleDateString('ar-MA')}</span>
                    </div>
                  </div>
                </div>
                {!m.isRead && (
                  <button onClick={() => markRead(m.id)}
                    className="flex items-center gap-1 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 px-3 py-2 rounded-xl text-xs font-bold transition-all flex-shrink-0">
                    <CheckCircle size={14} /> قُرئت
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
