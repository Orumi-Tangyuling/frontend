'use client';

import { useEffect, useRef, useState } from 'react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatBotProps {
  type: 'user' | 'admin';
}

export default function ChatBot({ type }: ChatBotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // 세션 ID 초기화
  useEffect(() => {
    // localStorage에서 세션 ID 가져오거나 새로 생성
    const storageKey = `chat_session_${type}`;
    const storedSessionId = localStorage.getItem(storageKey);
    
    if (storedSessionId) {
      setSessionId(storedSessionId);
    } else {
      const newSessionId = `${type}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem(storageKey, newSessionId);
      setSessionId(newSessionId);
    }
  }, [type]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // 초기 환영 메시지
      const welcomeMessage: Message = {
        id: '1',
        text:
          type === 'user'
            ? '안녕하세요! 제주 해양환경 예측 서비스입니다. 궁금하신 점을 물어보세요.'
            : '안녕하세요! 행정업무 지원 챗봇입니다. 데이터 분석, 보고서 생성 등을 도와드립니다.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length, type]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const messageText = inputValue;
    setInputValue('');
    setIsLoading(true);

    try {
      // API 호출
      const apiHost = process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:8000';
      const endpoint = type === 'user' ? '/api/v1/chat/message/user' : '/api/v1/chat/message/admin';
      
      const response = await fetch(`${apiHost}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageText,
          session_id: sessionId,
        }),
      });

      if (!response.ok) {
        throw new Error('챗봇 응답을 가져오는데 실패했습니다.');
      }

      const data = await response.json();
      
      // 서버에서 받은 session_id로 업데이트
      if (data.session_id && data.session_id !== sessionId) {
        setSessionId(data.session_id);
        localStorage.setItem(`chat_session_${type}`, data.session_id);
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('챗봇 에러:', error);
      
      // 에러 발생 시 fallback 응답
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: '죄송합니다. 일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* 챗봇 버튼 */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-8 left-8 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-xl transition-all hover:scale-105"
          style={{
            boxShadow:
              '0 10px 25px -5px rgba(59, 130, 246, 0.5), 0 8px 10px -6px rgba(59, 130, 246, 0.4)',
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>
      )}

      {/* 챗봇 창 */}
      {isOpen && (
        <div
          className="fixed bottom-8 left-8 z-50 flex h-[640px] w-[400px] flex-col overflow-hidden rounded-3xl bg-white"
          style={{
            boxShadow: '0 20px 60px -10px rgba(0, 0, 0, 0.3), 0 0 1px rgba(0, 0, 0, 0.05)',
            backdropFilter: 'blur(10px)',
          }}
        >
          {/* 헤더 */}
          <div
            className={`px-8 py-6 ${
              type === 'user'
                ? 'bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700'
                : 'bg-gradient-to-br from-indigo-500 via-purple-600 to-purple-700'
            } relative overflow-hidden text-white`}
          >
            {/* 배경 패턴 */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white blur-2xl"></div>
              <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white blur-2xl"></div>
            </div>

            <div className="relative flex items-center justify-between gap-4">
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2.5"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    <circle cx="9" cy="10" r="1" fill="white" />
                    <circle cx="15" cy="10" r="1" fill="white" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1 pr-2">
                  <h3 className="mb-1 truncate text-lg leading-tight font-bold">
                    {type === 'user' ? '해양환경 챗봇' : '행정업무 챗봇'}
                  </h3>
                  <p className="text-opacity-80 flex items-center gap-1 text-xs text-white">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-green-400"></span>
                    온라인
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center transition-all hover:scale-110 hover:rotate-90"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>

          {/* 메시지 영역 */}
          <div className="flex-1 space-y-3 overflow-y-auto bg-gradient-to-b from-gray-50 to-white p-6">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-5 py-3.5 ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md'
                      : 'border border-gray-100 bg-white text-gray-800 shadow-sm'
                  }`}
                  style={
                    message.sender === 'user'
                      ? {
                          boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                        }
                      : {}
                  }
                >
                  <p className="text-sm leading-relaxed break-words whitespace-pre-wrap">
                    {message.text}
                  </p>
                  <p
                    className={`mt-2 text-xs ${
                      message.sender === 'user' ? 'text-blue-100' : 'text-gray-400'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString('ko-KR', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))}
            
            {/* 로딩 인디케이터 */}
            {isLoading && (
              <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="max-w-[75%] rounded-2xl border border-gray-100 bg-white px-5 py-3.5 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '0ms' }}></div>
                    <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '150ms' }}></div>
                    <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* 입력 영역 */}
          <div className="border-t border-gray-100 bg-white p-5">
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleSend()}
                placeholder="메시지를 입력하세요..."
                className="flex-1 rounded-full border-0 bg-gray-100 px-5 py-3.5 text-sm transition-all placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                style={{ boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.04)' }}
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim() || isLoading}
                className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full transition-all ${
                  inputValue.trim() && !isLoading
                    ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md hover:scale-105'
                    : 'cursor-not-allowed bg-gray-200 text-gray-400'
                }`}
                style={
                  inputValue.trim() && !isLoading
                    ? {
                        boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                      }
                    : {}
                }
              >
                {isLoading ? (
                  <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
