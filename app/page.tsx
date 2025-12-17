'use client';

import dynamic from 'next/dynamic';
import Image from "next/image";

const JejuOceanMap = dynamic(() => import('./components/JejuOceanMap'), {
  ssr: false,
  loading: () => <div className="w-full h-full flex items-center justify-center bg-gray-900 text-white">지도 로딩 중...</div>
});

export default function Home() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-100">
      {/* 좌측 사이드바 */}
      <aside className="w-64 bg-gray-200 p-6 flex flex-col flex-shrink-0">
        <div className="mb-8">
          <Image
            src="/next.svg"
            alt="로고"
            width={80}
            height={20}
            className="mb-4"
          />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">
          제주 해양환경
        </h2>
      </aside>

      {/* 메인 컨텐츠 */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* 헤더 */}
        <header className="bg-gray-800 text-white px-8 py-4 flex items-center justify-between flex-shrink-0">
          <h1 className="text-2xl font-bold">제주 해양환경 예측 서비스</h1>
          <button className="px-6 py-2 border border-white rounded hover:bg-gray-700 transition-colors">
            로그인
          </button>
        </header>

        {/* 지도 영역 */}
        <div className="flex-1 w-full relative bg-gray-900" style={{ minHeight: '500px' }}>
          <JejuOceanMap />
        </div>
      </main>
    </div>
  );
}
