'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';

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

  useEffect(() => {
    setIsMounted(true);
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
            className="text-2xl font-bold text-white"
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}
          >
            제주 해양환경 예측 서비스
          </h1>
          <Link
            href="/login"
            className="bg-gray bg-opacity-15 border-opacity-40 hover:bg-opacity-25 rounded-lg border border-white px-6 py-2.5 font-medium text-white shadow-lg backdrop-blur-md transition-all"
          >
            로그인
          </Link>
        </header>
      </main>

      {/* 챗봇 */}
      <ChatBot type="user" />
    </div>
  );
}
