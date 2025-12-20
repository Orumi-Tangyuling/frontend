'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './ChatBot.module.scss';

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
          className={styles.chatButton}
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>

          {/* Notification Badge */}
          <span className={styles.notificationBadge}>
            <span className={styles.ping}></span>
            <span className={styles.badge}>
              <span>1</span>
            </span>
          </span>

          {/* Shimmer Effect */}
          <div className={styles.shimmer}></div>
        </button>
      )}

      {/* 챗봇 창 */}
      {isOpen && (
        <div className={styles.chatWindow}>
          {/* 헤더 */}
          <div className={`${styles.chatHeader} ${type === 'user' ? styles.user : styles.admin}`}>
            {/* 배경 패턴 */}
            <div className={styles.headerPattern}>
              <div className={styles.circle1}></div>
              <div className={styles.circle2}></div>
            </div>

            <div className={styles.headerContent}>
              <div className={styles.headerLeft}>
                <div className={styles.headerIcon}>
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
                <div className={styles.headerInfo}>
                  <h3>
                    {type === 'user' ? '해양환경 챗봇' : '행정업무 챗봇'}
                  </h3>
                  <p>
                    <span className={styles.onlineIndicator}></span>
                    온라인
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className={styles.closeButton}
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
          <div className={styles.messagesArea}>
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`${styles.messageWrapper} ${message.sender === 'user' ? styles.user : styles.bot}`}
                style={{
                  animationDelay: `${index * 0.05}s`,
                }}
              >
                <div className={`${styles.messageBubble} ${message.sender === 'user' ? styles.user : styles.bot}`}>
                  <p>{message.text}</p>
                  <p className={`${styles.messageTime} ${message.sender === 'user' ? styles.user : styles.bot}`}>
                    {message.sender === 'user' && (
                      <svg viewBox="0 0 12 12" fill="currentColor">
                        <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/>
                      </svg>
                    )}
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
          <div className={styles.inputArea}>
            <div className={styles.inputContainer}>
              <input
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleSend()}
                placeholder="메시지를 입력하세요..."
                className={styles.messageInput}
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className={`${styles.sendButton} ${inputValue.trim() ? styles.active : styles.disabled}`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
                {inputValue.trim() && (
                  <div className={styles.ripple}></div>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
