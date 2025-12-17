'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 로그인 로직 구현
    console.log('Login attempt:', { username, password, keepLoggedIn });
    router.push('/admin');
  };

  return (
    <div className="min-h-screen flex">
      {/* 왼쪽 일러스트 섹션 */}
      <div className="hidden lg:flex lg:w-1/2 bg-white relative overflow-hidden">
        <div className="w-full h-full flex flex-col items-center justify-center p-12 relative">
          {/* 구름 장식 */}
          <div className="absolute top-20 left-16">
            <svg width="100" height="40" viewBox="0 0 100 40" className="text-gray-300">
              <path d="M20 30 Q10 30 10 20 Q10 10 20 10 Q25 5 35 10 Q45 10 45 20 Q45 30 35 30 Z" 
                    fill="none" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          <div className="absolute top-16 right-32">
            <svg width="120" height="50" viewBox="0 0 120 50" className="text-gray-300">
              <path d="M25 35 Q15 35 15 25 Q15 15 25 15 Q30 10 40 15 Q50 15 50 25 Q50 35 40 35 Z" 
                    fill="none" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>

          {/* 메인 로고 */}
          <div className="text-center mb-8 z-10">
            <div className="relative inline-block mb-4">
              <svg width="80" height="40" viewBox="0 0 80 40" className="mb-2">
                <path d="M10 20 Q20 5 30 20 Q40 5 50 20 Q60 5 70 20" 
                      fill="none" stroke="#374151" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </div>
            <h1 className="text-5xl font-bold text-gray-800 mb-2">깨끗해양</h1>
            <p className="text-lg text-gray-600">제주 해양환경 예측 서비스</p>
          </div>

          {/* 등대와 바다 일러스트 */}
          <div className="relative w-full max-w-md mt-8">
            {/* 등대 */}
            <div className="absolute right-1/4 top-0 z-20">
              <svg width="80" height="140" viewBox="0 0 80 140">
                <rect x="30" y="20" width="20" height="60" fill="#9CA3AF" rx="2"/>
                <rect x="28" y="75" width="24" height="8" fill="#6B7280"/>
                <rect x="32" y="10" width="16" height="15" fill="#4B5563" rx="8"/>
                <circle cx="40" cy="15" r="4" fill="#FCD34D"/>
                <path d="M38 80 L42 80 L40 130 Z" fill="#9CA3AF"/>
              </svg>
            </div>

            {/* 바다 파도 */}
            <svg width="400" height="200" viewBox="0 0 400 200" className="w-full">
              {/* 수평선 */}
              <line x1="0" y1="100" x2="400" y2="100" stroke="#D1D5DB" strokeWidth="2"/>
              
              {/* 파도들 */}
              <path d="M0 120 Q50 110 100 120 Q150 130 200 120 Q250 110 300 120 Q350 130 400 120" 
                    fill="none" stroke="#9CA3AF" strokeWidth="2"/>
              <path d="M0 140 Q60 130 120 140 Q180 150 240 140 Q300 130 360 140 L400 140" 
                    fill="none" stroke="#9CA3AF" strokeWidth="2"/>
              <path d="M0 155 Q40 145 80 155 Q120 165 160 155 Q200 145 240 155 Q280 165 320 155 Q360 145 400 155" 
                    fill="none" stroke="#9CA3AF" strokeWidth="1.5"/>
              
              {/* 모래 해변 */}
              <ellipse cx="200" cy="170" rx="150" ry="10" fill="#E5E7EB" opacity="0.5"/>
              <ellipse cx="180" cy="172" rx="80" ry="6" fill="#E5E7EB" opacity="0.4"/>
              <ellipse cx="240" cy="174" rx="100" ry="7" fill="#E5E7EB" opacity="0.3"/>
              
              {/* 모래 질감 (점들) */}
              {[...Array(30)].map((_, i) => (
                <circle 
                  key={i} 
                  cx={100 + Math.random() * 200} 
                  cy={165 + Math.random() * 15} 
                  r="1" 
                  fill="#D1D5DB" 
                  opacity="0.3"
                />
              ))}
            </svg>
          </div>

          {/* 하단 텍스트 */}
          <div className="absolute bottom-12 text-center">
            <p className="text-sm text-gray-500">행정 담당자 전용 시스템</p>
          </div>
        </div>
      </div>

      {/* 오른쪽 로그인 폼 섹션 */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 p-8">
        <div className="w-full max-w-md">
          {/* 로그인 폼 카드 */}
          <div className="bg-white rounded-3xl shadow-lg p-10 border border-gray-200">
            <h2 className="text-3xl font-bold text-center mb-8">행정 로그인</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 아이디 입력 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  아이디
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="아이디를 입력하세요"
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              {/* 비밀번호 입력 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  비밀번호
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="비밀번호를 입력하세요"
                    className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  >
                    {showPassword ? (
                      <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* 로그인 상태 유지 체크박스 */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="keepLoggedIn"
                  checked={keepLoggedIn}
                  onChange={(e) => setKeepLoggedIn(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="keepLoggedIn" className="ml-2 text-sm text-gray-700">
                  로그인 상태 유지
                </label>
              </div>

              {/* 로그인 버튼 */}
              <button
                type="submit"
                className="w-full bg-gray-900 text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors duration-200"
              >
                로그인
              </button>

              {/* 비밀번호 찾기 / 계정 문의 */}
              <div className="text-center text-sm">
                <a href="#" className="text-gray-600 hover:text-gray-900">비밀번호 찾기</a>
                <span className="mx-2 text-gray-400">|</span>
                <a href="#" className="text-gray-600 hover:text-gray-900">계정 문의</a>
              </div>
            </form>

            {/* 안내 문구 */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500 bg-gray-50 py-3 px-4 rounded-lg">
                행정 담당자만 접근 가능합니다
              </p>
            </div>
          </div>

          {/* 메인으로 돌아가기 */}
          <div className="text-center mt-6">
            <Link href="/" className="text-sm text-gray-600 hover:text-gray-900 flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              메인으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
