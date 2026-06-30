import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useTravelStore from '../store/useTravelStore';
import { chatWithAI } from '../services/aiService';
import ReactMarkdown from 'react-markdown';

export default function ChatbotPage() {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState('');
  
  const {
    chatMessages,
    addChatMessage,
    chatLoading,
    setChatLoading,
    itinerary,
    setItinerary,
    selectedPreferences,
    tripInfo,
  } = useTravelStore();

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, chatLoading]);

  const initialized = useRef(false);

  // Welcome message on first load
  useEffect(() => {
    if (chatMessages.length === 0 && !initialized.current) {
      initialized.current = true;
      addChatMessage({
        role: 'assistant',
        content: 'Xin chào! 🌿 Tôi là **GiaLai Guide** - trợ lý du lịch AI của bạn.\n\nTôi có thể giúp bạn:\n- 🗺️ Thêm hoặc thay đổi địa điểm trong lịch trình\n- 🍜 Gợi ý món ăn đặc sản Gia Lai\n- 🚗 Thông tin di chuyển & đường đi\n- 💡 Mẹo du lịch hữu ích\n\nBạn muốn hỏi gì nào? 😊',
        timestamp: new Date().toISOString(),
      });
    }
  }, [chatMessages.length, addChatMessage]);

  const handleSend = async () => {
    const message = inputValue.trim();
    if (!message || chatLoading) return;

    // Add user message
    const userMsg = {
      role: 'user',
      content: message,
      timestamp: new Date().toISOString(),
    };
    addChatMessage(userMsg);
    setInputValue('');
    setChatLoading(true);

    try {
      const allMessages = [...chatMessages, userMsg];
      const result = await chatWithAI(
        allMessages,
        itinerary,
        selectedPreferences,
        tripInfo
      );

      // Add AI response
      addChatMessage({
        role: 'assistant',
        content: result.content,
        timestamp: new Date().toISOString(),
      });

      // If AI returned updated itinerary, apply it
      if (result.hasItineraryUpdate && result.updatedItinerary) {
        setItinerary(result.updatedItinerary);
      }
    } catch (error) {
      console.error('Chat error:', error);
      addChatMessage({
        role: 'assistant',
        content: 'Xin lỗi, tôi gặp sự cố khi xử lý. Bạn thử lại nhé! 🙏',
        timestamp: new Date().toISOString(),
      });
    } finally {
      setChatLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickActions = [
    { label: '➕ Thêm địa điểm', message: 'Tôi muốn thêm một địa điểm mới vào lịch trình' },
    { label: '➖ Xóa địa điểm', message: 'Tôi muốn bỏ bớt một số địa điểm trong lịch trình' },
    { label: '🔄 Đổi lịch trình', message: 'Tôi muốn thay đổi lịch trình hiện tại' },
    { label: 'ℹ️ Thông tin địa điểm', message: 'Tôi muốn hỏi thông tin chi tiết về một địa điểm' },
    { label: '🍜 Gợi ý món ăn', message: 'Gợi ý cho tôi các món ăn đặc sản ở Gia Lai' },
  ];

  // We'll use ReactMarkdown for rendering instead of simple formatMessage

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-950 flex flex-col h-screen relative overflow-hidden">
      
      {/* ── Chatbot AI Aura Background ── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Blurred landscape */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 dark:opacity-20 blur-3xl scale-110"
          style={{ backgroundImage: 'url("/images/gialai_hero_landscape.png")' }}
        />
        {/* Glowing Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary-400/20 rounded-full blur-[100px] animate-pulse-soft" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent-400/10 rounded-full blur-[100px] animate-pulse-slow" />
        {/* Central Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center opacity-[0.04] dark:opacity-[0.06]">
          <span className="text-[250px] leading-none mb-4">🌿</span>
          <h1 className="text-4xl md:text-7xl font-black uppercase tracking-[0.3em] text-center w-full whitespace-nowrap">GiaLai Guide</h1>
        </div>
      </div>

      {/* Header */}
      <div className="sticky top-0 z-10 glass dark:bg-slate-900/80 border-b border-white/20 dark:border-slate-800 px-4 py-3">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/itinerary')}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition-all"
          >
            <svg className="w-5 h-5 text-dark-600 dark:text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex items-center gap-3 flex-1">
            <div className="relative">
              <div className="absolute inset-0 bg-primary-500 rounded-full blur opacity-40 animate-pulse"></div>
              <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-500/30 border border-white/20">
                <span className="text-white text-lg">🌿</span>
              </div>
            </div>
            <div>
              <h1 className="font-bold text-dark-900 dark:text-white text-sm">GiaLai Guide</h1>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-xs text-dark-500 dark:text-slate-400">Trợ lý AI • Đang hoạt động</span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => navigate('/itinerary')}
            className="px-3 py-1.5 text-xs font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/50 transition-colors"
          >
            📋 Lịch trình
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="relative z-10 flex-1 overflow-y-auto px-4 pt-4 pb-40 space-y-5 scrollbar-hide">
        {chatMessages.map((msg, index) => (
          <div 
            key={index} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}
            style={{ animationDelay: `${Math.min(index * 50, 300)}ms` }}
          >
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center mr-2 mt-1 flex-shrink-0 shadow-sm">
                <span className="text-sm">🌿</span>
              </div>
            )}
            <div className={msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}>
              <div className="markdown-prose">
                <ReactMarkdown>
                  {msg.content}
                </ReactMarkdown>
              </div>
              <div className={`text-[10px] mt-1.5 ${msg.role === 'user' ? 'text-white/60' : 'text-dark-400 dark:text-slate-400'}`}>
                {new Date(msg.timestamp).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {chatLoading && (
          <div className="flex justify-start animate-fade-in">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center mr-2 mt-1 flex-shrink-0">
              <span className="text-sm">🌿</span>
            </div>
            <div className="chat-bubble-ai">
              <div className="flex items-center gap-1.5 py-1">
                <div className="w-2 h-2 bg-dark-400 dark:bg-slate-400 rounded-full animate-typing"></div>
                <div className="w-2 h-2 bg-dark-400 dark:bg-slate-400 rounded-full animate-typing delay-200"></div>
                <div className="w-2 h-2 bg-dark-400 dark:bg-slate-400 rounded-full animate-typing delay-400"></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Floating Input Area & Quick Actions */}
      <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-col justify-end pointer-events-none">
        
        {/* Quick Actions */}
        {chatMessages.length <= 1 && (
          <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide pointer-events-auto">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => {
                  setInputValue(action.message);
                  inputRef.current?.focus();
                }}
                className="flex-shrink-0 px-4 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-dark-200 dark:border-slate-700 rounded-2xl text-xs font-semibold text-dark-700 dark:text-slate-300 hover:border-primary-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-white transition-all shadow-sm flex items-center gap-1.5"
              >
                {action.label}
              </button>
            ))}
          </div>
        )}

        {/* Input Box */}
        <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border border-dark-200 dark:border-slate-700 rounded-[24px] shadow-2xl shadow-dark-900/5 p-1.5 flex items-end gap-2 transition-all focus-within:ring-4 focus-within:ring-primary-500/20 focus-within:border-primary-400 pointer-events-auto">
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Nhập tin nhắn cho GiaLai Guide..."
              rows={1}
              className="w-full px-4 py-3 bg-transparent border-none rounded-[20px] text-sm text-dark-800 dark:text-slate-100 placeholder:text-dark-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-0 transition-all resize-none leading-relaxed"
              style={{ maxHeight: '120px' }}
              onInput={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
              }}
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!inputValue.trim() || chatLoading}
            className="w-10 h-10 mb-1.5 mr-1.5 flex-shrink-0 flex items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
          >
            {chatLoading ? (
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 translate-x-[1px] translate-y-[-1px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
