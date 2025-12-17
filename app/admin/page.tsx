'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ChartBarIcon, 
  DocumentTextIcon, 
  ArrowDownTrayIcon,
  ChatBubbleLeftRightIcon,
  ArrowTrendingUpIcon,
  MapPinIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

export default function AdminDashboard() {
  const [activeMenu, setActiveMenu] = useState('statistics');
  const [chatMessage, setChatMessage] = useState('');

  // 월별 데이터
  const monthlyData = [
    { month: 'Jul', value: 500 },
    { month: 'Aug', value: 750 },
    { month: 'Sep', value: 850 },
    { month: 'Oct', value: 1050 },
    { month: 'Nov', value: 1400 },
    { month: 'Dec', value: 1700 },
  ];

  // 위험 지역 데이터
  const riskAreas = [
    { id: 1, region: '애월해구 A구역', amount: '450kg', risk: '높음', action: '즉시 수거', riskColor: 'text-red-600 bg-red-50' },
    { id: 2, region: '강서구 B구역', amount: '320kg', risk: '중간', action: '모니터링 강화', riskColor: 'text-yellow-600 bg-yellow-50' },
    { id: 3, region: '영도구 C구역', amount: '280kg', risk: '낮음', action: '정기 점검', riskColor: 'text-blue-600 bg-blue-50' },
    { id: 4, region: '서하구 D구역', amount: '200kg', risk: '낮음', action: '주의 관찰', riskColor: 'text-blue-600 bg-blue-50' },
  ];

  const maxValue = Math.max(...monthlyData.map(d => d.value));

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Chat message:', chatMessage);
    setChatMessage('');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* 왼쪽 사이드바 */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* 로고 */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-800">깨끗해양</span>
          </div>
        </div>

        {/* 메뉴 */}
        <nav className="flex-1 p-4">
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">메뉴</h3>
            <div className="space-y-1">
              <button
                onClick={() => setActiveMenu('statistics')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeMenu === 'statistics'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <ChartBarIcon className="w-5 h-5" />
                <span className="font-medium">통계</span>
              </button>
              <button
                onClick={() => setActiveMenu('reports')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeMenu === 'reports'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <DocumentTextIcon className="w-5 h-5" />
                <span className="font-medium">보고서 생성</span>
              </button>
              <button
                onClick={() => setActiveMenu('download')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeMenu === 'download'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <ArrowDownTrayIcon className="w-5 h-5" />
                <span className="font-medium">데이터 다운로드</span>
              </button>
            </div>
          </div>
        </nav>

        {/* 로그아웃 */}
        <div className="p-4 border-t border-gray-200">
          <Link 
            href="/"
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            로그아웃
          </Link>
        </div>
      </aside>

      {/* 메인 컨텐츠 */}
      <main className="flex-1 overflow-y-auto">
        {/* 헤더 */}
        <header className="bg-white border-b border-gray-200 px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-800">행정 대시보드</h1>
        </header>

        <div className="p-8">
          {/* 타이틀 */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">월간 예측 대시보드 - 2025년 12월</h2>
          </div>

          {/* 통계 카드 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* 총 예상 유입량 */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">총 예상 유입량</h3>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-4xl font-bold text-blue-600">1,250 kg</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <span className="text-gray-500">전월 대비</span>
                <span className="text-red-500 font-medium flex items-center">
                  +15%
                  <ArrowTrendingUpIcon className="w-4 h-4 ml-1" />
                </span>
              </div>
            </div>

            {/* 위험 지역 */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">위험 지역</h3>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-4xl font-bold text-red-600">3개소</span>
              </div>
              <div className="text-sm text-gray-500">
                추적 지역: <span className="font-medium text-gray-700">5개소</span>
              </div>
            </div>

            {/* 수거 계획 필요 */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">수거 계획 필요</h3>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-4xl font-bold text-orange-600">즉시 조치 2곳</span>
              </div>
              <div className="text-sm text-gray-500">
                장기 점검 <span className="font-medium text-gray-700">8곳</span>
              </div>
            </div>
          </div>

          {/* 월별 쓰레기 유입량 추이 차트 */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-bold text-gray-800 mb-6">월별 쓰레기 유입량 추이 (6개월)</h3>
            <div className="relative h-64">
              {/* Y축 라벨 */}
              <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-sm text-gray-500">
                <span>2000</span>
                <span>1500</span>
                <span>1000</span>
                <span>500</span>
                <span>0</span>
              </div>

              {/* 차트 영역 */}
              <div className="ml-12 h-full flex items-end justify-around pb-8 border-b border-l border-gray-200">
                {monthlyData.map((data, index) => {
                  const height = (data.value / maxValue) * 100;
                  return (
                    <div key={data.month} className="flex flex-col items-center flex-1 max-w-[80px]">
                      <div className="w-full flex flex-col items-center justify-end" style={{ height: '200px' }}>
                        <div className="relative w-full flex items-end justify-center">
                          <div
                            className="w-16 bg-blue-500 rounded-t-lg relative group cursor-pointer hover:bg-blue-600 transition-colors"
                            style={{ height: `${height}%` }}
                          >
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                              {data.value}kg
                            </div>
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-gray-600 mt-2">{data.month}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 위험 지역 요약 테이블 */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4">위험 지역 요약</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">지역명</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">예상량</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">위험도</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">조치사항</th>
                  </tr>
                </thead>
                <tbody>
                  {riskAreas.map((area) => (
                    <tr key={area.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-4 text-sm text-gray-800">{area.region}</td>
                      <td className="px-4 py-4 text-sm font-medium text-gray-900">{area.amount}</td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${area.riskColor}`}>
                          {area.risk}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700">{area.action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 행정 전용 챗봇 */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <ChatBubbleLeftRightIcon className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-bold text-gray-800">행정 전용 챗봇</h3>
            </div>

            {/* 빠른 작업 버튼 */}
            <div className="flex flex-wrap gap-3 mb-4">
              <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
                📝 간단 보고서 작성
              </button>
              <button className="px-4 py-2 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
                💾 데이터 다운로드 요청
              </button>
            </div>

            {/* 채팅 입력 */}
            <form onSubmit={handleChatSubmit} className="flex gap-2">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="궁금한 내용을 입력하세요..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
