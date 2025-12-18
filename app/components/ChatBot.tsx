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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

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

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // 봇 응답 시뮬레이션
    setTimeout(() => {
      const botResponse = getBotResponse(inputValue, type);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    }, 500);
  };

  const getBotResponse = (input: string, chatType: 'user' | 'admin'): string => {
    const lowerInput = input.toLowerCase();

    if (chatType === 'user') {
      // 일반 사용자용 응답
      if (lowerInput.includes('수영') || lowerInput.includes('해수욕')) {
        return '현재 제주도 해안 11개 지역의 수질 상태를 실시간으로 모니터링하고 있습니다. 지도에서 각 지역을 클릭하시면 수영 가능 여부를 확인하실 수 있습니다.';
      }
      if (lowerInput.includes('쓰레기') || lowerInput.includes('오염')) {
        return '저희 서비스는 AI 기반으로 각 해안 지역의 쓰레기 발생량을 예측합니다. 지도의 3D 원기둥 높이가 예상 쓰레기량을 나타냅니다.';
      }
      if (lowerInput.includes('날씨') || lowerInput.includes('수온')) {
        return '각 지역의 현재 수온과 날씨 정보는 지도에서 해당 지역을 클릭하시면 확인하실 수 있습니다.';
      }
      if (
        lowerInput.includes('어디') ||
        lowerInput.includes('위치') ||
        lowerInput.includes('지역')
      ) {
        return '제주도 전역 11개 주요 해안 지역(애월, 조천, 예래, 한림, 성산, 중문, 구좌, 표선, 안덕, 남원, 대정)을 모니터링하고 있습니다.';
      }
      return '해양환경, 수질 상태, 수영 가능 여부 등에 대해 궁금하신 점을 물어보세요. 지도에서 원하시는 지역을 클릭하면 더 자세한 정보를 확인하실 수 있습니다.';
    } else {
      // 행정업무용 응답
      if (lowerInput.includes('보고서') || lowerInput.includes('리포트')) {
        return '주간/월간 보고서 생성 기능을 제공합니다. 상단 메뉴에서 "보고서 생성" 버튼을 클릭하시면 됩니다.';
      }
      if (lowerInput.includes('통계') || lowerInput.includes('데이터')) {
        return '현재 대시보드에서 총 수거량, 고위험 지역 수, 평균 수질 등의 통계를 확인하실 수 있습니다. 추가 분석이 필요하시면 말씀해주세요.';
      }
      if (lowerInput.includes('알림') || lowerInput.includes('경고')) {
        return '고위험 지역 발생 시 자동으로 알림을 발송합니다. 알림 설정은 우측 상단 설정 메뉴에서 변경 가능합니다.';
      }
      if (lowerInput.includes('수거') || lowerInput.includes('청소')) {
        return '수거 일정 관리 및 작업 배정은 "작업 관리" 메뉴에서 가능합니다. 예상 쓰레기량을 기반으로 우선순위를 자동 설정합니다.';
      }
      if (lowerInput.includes('예측') || lowerInput.includes('ai')) {
        return 'AI 예측 모델은 과거 데이터, 날씨, 해류 등을 분석하여 향후 7일간의 쓰레기 발생량을 예측합니다. 정확도는 약 87%입니다.';
      }
      return '행정업무 관련 기능(보고서 생성, 통계 분석, 수거 일정 관리 등)에 대해 안내해드립니다. 필요하신 기능을 말씀해주세요.';
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
                disabled={!inputValue.trim()}
                className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full transition-all ${
                  inputValue.trim()
                    ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md hover:scale-105'
                    : 'cursor-not-allowed bg-gray-200 text-gray-400'
                }`}
                style={
                  inputValue.trim()
                    ? {
                        boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                      }
                    : {}
                }
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
