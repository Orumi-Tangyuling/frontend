'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function WelcomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 relative overflow-hidden">
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
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* 로고와 타이틀 */}
        <div className={`text-center mb-12 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          {/* 로고 아이콘 */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center shadow-2xl">
                <svg className="w-20 h-20 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              {/* 물방울 효과 */}
              <div className="absolute top-0 -right-2 w-6 h-6 bg-blue-400 rounded-full opacity-70 animate-ping"></div>
              <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-cyan-300 rounded-full opacity-50 animate-pulse"></div>
            </div>
          </div>

          <h1 className="text-6xl font-bold text-gray-800 mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              깨끗해양
            </span>
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto mb-6 rounded-full"></div>
          <p className="text-2xl text-gray-700 font-medium mb-2">
            제주 해양환경 예측 서비스
          </p>
          <p className="text-lg text-gray-500">
            에 오신 것을 환영합니다
          </p>
        </div>

        {/* 설명 */}
        <div className={`max-w-2xl text-center mb-12 transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            AI 기반 해양 쓰레기 예측 시스템으로<br />
            제주 바다를 더 깨끗하게 관리하세요
          </p>
          
          {/* 주요 기능 카드 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white bg-opacity-80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-blue-100 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">실시간 예측</h3>
              <p className="text-sm text-gray-600">해양 쓰레기 유입량 실시간 모니터링</p>
            </div>

            <div className="bg-white bg-opacity-80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-cyan-100 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">지역별 분석</h3>
              <p className="text-sm text-gray-600">11개 주요 해안 지역 집중 관리</p>
            </div>

            <div className="bg-white bg-opacity-80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-indigo-100 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">행정 지원</h3>
              <p className="text-sm text-gray-600">담당자용 리포트 자동 생성</p>
            </div>
          </div>
        </div>

        {/* 액션 버튼 */}
        <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Link 
            href="/dashboard"
            className="group px-10 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            <span>서비스 시작하기</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>

          <Link 
            href="/login"
            className="px-10 py-4 bg-white text-gray-700 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 border-gray-200 hover:border-blue-300"
          >
            행정 담당자 로그인
          </Link>
        </div>

        {/* 하단 정보 */}
        <div className={`mt-16 text-center transition-all duration-1000 delay-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
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
