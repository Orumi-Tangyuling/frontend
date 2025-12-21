'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import Cookies from 'js-cookie';

import ChatBot from '../components/ChatBot';

const JejuOceanMap = dynamic(() => import('../components/JejuOceanMap'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-gray-900 text-white">
      지도 로딩 중...
    </div>
  ),
});

export default function DashboardPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // 로그인 상태 확인
    const accessToken = Cookies.get('access_token');
    setIsLoggedIn(!!accessToken);
  }, []);

  if (!isMounted) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gray-900 text-white">
        <div className="text-center">
          <div className="mb-4 h-16 w-16 animate-spin rounded-full border-4 border-gray-700 border-t-blue-500 mx-auto"></div>
          <p className="text-lg">지도 초기화 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-100">
      {/* 메인 컨텐츠 */}
      <main className="relative w-full flex-1">
        {/* 지도 영역 (전체 화면) */}
        <div className="absolute inset-0">
          <JejuOceanMap />
        </div>

        {/* 헤더 (지도 위에 떠있음) */}
        <header className="absolute top-0 right-0 left-0 z-20 flex items-center justify-between px-8 py-6">
          <h1
            className="text-3xl font-extrabold tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #a5f3fc 50%, #22d3ee 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3)) drop-shadow(0 4px 12px rgba(34, 211, 238, 0.3))',
            }}
          >
            제주 해양환경 예측 서비스
          </h1>
          <Link
            href={isLoggedIn ? "/dashboard" : "/login"}
            className="relative flex items-center gap-2 rounded-2xl border-2 border-white/20 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-xl transition-all hover:scale-105 hover:border-white/40 hover:bg-white/20 hover:shadow-xl"
          >
            {isLoggedIn ? (
              <>
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                대시보드
              </>
            ) : (
              <>
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                행정 담당자 로그인
              </>
            )}
          </Link>
        </header>
      </main>

      {/* 챗봇 */}
      <ChatBot type="user" />
    </div>
  );
}
