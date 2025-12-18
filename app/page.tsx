'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

export default function WelcomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* 배경 애니메이션 - 파도 효과 */}
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            fill="#E0F2FE"
            fillOpacity="0.5"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            className={mounted ? 'animate-wave' : ''}
          />
        </svg>
        <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            fill="#BAE6FD"
            fillOpacity="0.4"
            d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            className={mounted ? 'animate-wave-slow' : ''}
          />
        </svg>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4">
        {/* 로고와 타이틀 */}
        <div
          className={`mb-12 text-center transition-all duration-1000 ${mounted ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}
        >
          {/* 로고 아이콘 */}
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 shadow-2xl">
                <svg
                  className="h-20 w-20 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              {/* 물방울 효과 */}
              <div className="absolute top-0 -right-2 h-6 w-6 animate-ping rounded-full bg-blue-400 opacity-70"></div>
              <div className="absolute -bottom-2 -left-2 h-8 w-8 animate-pulse rounded-full bg-cyan-300 opacity-50"></div>
            </div>
          </div>

          <h1 className="mb-4 text-6xl font-bold text-gray-800">
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              깨끗해양
            </span>
          </h1>
          <div className="mx-auto mb-6 h-1 w-32 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"></div>
          <p className="mb-2 text-2xl font-medium text-gray-700">제주 해양환경 예측 서비스</p>
          <p className="text-lg text-gray-500">에 오신 것을 환영합니다</p>
        </div>

        {/* 설명 */}
        <div
          className={`mb-12 max-w-2xl text-center transition-all delay-300 duration-1000 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <p className="mb-6 text-lg leading-relaxed text-gray-600">
            AI 기반 해양 쓰레기 예측 시스템으로
            <br />
            제주 바다를 더 깨끗하게 관리하세요
          </p>

          {/* 주요 기능 카드 */}
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="bg-opacity-80 rounded-2xl border border-blue-100 bg-white p-6 shadow-lg backdrop-blur-sm transition-shadow hover:shadow-xl">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <svg
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 font-bold text-gray-800">실시간 예측</h3>
              <p className="text-sm text-gray-600">해양 쓰레기 유입량 실시간 모니터링</p>
            </div>

            <div className="bg-opacity-80 rounded-2xl border border-cyan-100 bg-white p-6 shadow-lg backdrop-blur-sm transition-shadow hover:shadow-xl">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-cyan-100">
                <svg
                  className="h-6 w-6 text-cyan-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
              </div>
              <h3 className="mb-2 font-bold text-gray-800">지역별 분석</h3>
              <p className="text-sm text-gray-600">11개 주요 해안 지역 집중 관리</p>
            </div>

            <div className="bg-opacity-80 rounded-2xl border border-indigo-100 bg-white p-6 shadow-lg backdrop-blur-sm transition-shadow hover:shadow-xl">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
                <svg
                  className="h-6 w-6 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 font-bold text-gray-800">행정 지원</h3>
              <p className="text-sm text-gray-600">담당자용 리포트 자동 생성</p>
            </div>
          </div>
        </div>

        {/* 액션 버튼 */}
        <div
          className={`flex flex-col gap-4 transition-all delay-500 duration-1000 sm:flex-row ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <Link
            href="/dashboard"
            className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-10 py-4 text-lg font-semibold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <span>서비스 시작하기</span>
            <svg
              className="h-5 w-5 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>

          <Link
            href="/login"
            className="rounded-full border-2 border-gray-200 bg-white px-10 py-4 text-lg font-semibold text-gray-700 shadow-lg transition-all duration-300 hover:scale-105 hover:border-blue-300 hover:shadow-xl"
          >
            행정 담당자 로그인
          </Link>
        </div>

        {/* 하단 정보 */}
        <div
          className={`mt-16 text-center transition-all delay-700 duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}
        >
          <p className="text-sm text-gray-500">
            제주특별자치도 해양환경 보호를 위한 AI 예측 시스템
          </p>
        </div>
      </div>

      {/* 애니메이션 스타일 */}
      <style jsx>{`
        @keyframes wave {
          0% {
            transform: translateX(0) translateY(0);
          }
          50% {
            transform: translateX(-25%) translateY(-10px);
          }
          100% {
            transform: translateX(0) translateY(0);
          }
        }
        @keyframes wave-slow {
          0% {
            transform: translateX(0) translateY(0);
          }
          50% {
            transform: translateX(-20%) translateY(-15px);
          }
          100% {
            transform: translateX(0) translateY(0);
          }
        }
        .animate-wave {
          animation: wave 8s ease-in-out infinite;
        }
        .animate-wave-slow {
          animation: wave-slow 12s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
