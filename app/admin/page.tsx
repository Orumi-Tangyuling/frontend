'use client';

import { useState } from 'react';
import Link from 'next/link';
import ChatBot from '../components/ChatBot';
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
              <button
                onClick={() => setActiveMenu('visitors')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeMenu === 'visitors'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <MapPinIcon className="w-5 h-5" />
                <span className="font-medium">방문객 통계</span>
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
          {activeMenu === 'statistics' && (
            <>
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
            </>
          )}

          {/* 방문객 통계 섹션 */}
          {activeMenu === 'visitors' && (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">해안별 방문객 통계 (2024.01 ~ 2025.10)</h2>
                <p className="text-gray-600">제주도 주요 해안 지역의 월별 방문객 추이를 확인할 수 있습니다</p>
              </div>

              {/* 요약 카드 */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6">
                  <h3 className="text-sm font-semibold text-blue-600 mb-2">총 방문객 수</h3>
                  <p className="text-3xl font-bold text-blue-900">약 2.8억명</p>
                  <p className="text-xs text-blue-600 mt-1">22개월 누적</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-6">
                  <h3 className="text-sm font-semibold text-green-600 mb-2">최다 방문 해안</h3>
                  <p className="text-2xl font-bold text-green-900">애월해안</p>
                  <p className="text-xs text-green-600 mt-1">2,400만명 방문</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-6">
                  <h3 className="text-sm font-semibold text-purple-600 mb-2">평균 월 방문객</h3>
                  <p className="text-3xl font-bold text-purple-900">1,280만명</p>
                  <p className="text-xs text-purple-600 mt-1">전체 해안 평균</p>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-xl p-6">
                  <h3 className="text-sm font-semibold text-orange-600 mb-2">성수기</h3>
                  <p className="text-2xl font-bold text-orange-900">7-8월</p>
                  <p className="text-xs text-orange-600 mt-1">평균 1,650만명/월</p>
                </div>
              </div>

              {/* 지역별 최근 12개월 차트 */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
                <h3 className="text-lg font-bold text-gray-800 mb-6">제주 해안별 월별 방문객 추이 (2024.01 ~ 2025.10)</h3>
                <div className="overflow-x-auto">
                  <div className="min-w-[1200px]">
                    {/* SVG 라인 차트 */}
                    <svg width="1200" height="400" className="mx-auto">
                      <defs>
                        <linearGradient id="gridGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#e5e7eb" stopOpacity="0.5"/>
                          <stop offset="100%" stopColor="#e5e7eb" stopOpacity="0"/>
                        </linearGradient>
                      </defs>
                      
                      {/* 그리드 라인 */}
                      {[0, 1, 2, 3, 4, 5, 6].map((i) => {
                        const y = 50 + (i * 50);
                        const value = 1800000 - (i * 300000);
                        return (
                          <g key={i}>
                            <line x1="60" y1={y} x2="1180" y2={y} stroke="#e5e7eb" strokeWidth="1"/>
                            <text x="45" y={y + 5} fontSize="11" fill="#6b7280" textAnchor="end">
                              {(value / 10000).toFixed(0)}만
                            </text>
                          </g>
                        );
                      })}
                      
                      {/* X축 월별 라벨 */}
                      {['2024.01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '2025.01', '02', '03', '04', '05', '06', '07', '08', '09', '10'].map((month, idx) => {
                        const x = 80 + (idx * 50);
                        return (
                          <text key={idx} x={x} y="370" fontSize="10" fill="#6b7280" textAnchor="middle">
                            {month}
                          </text>
                        );
                      })}
                      
                      {/* 데이터 라인 */}
                      {[
                        { name: '조천해안', data: [1112874, 1009199, 1072009, 1161439, 1246657, 1243603, 1428509, 1636257, 1164311, 1153969, 1078825, 957819, 1059200, 869894, 947760, 1064042, 1232614, 1227062, 1428168, 1623406, 1159237, 1441604], color: '#06b6d4', label: '조천해안' },
                        { name: '애월해안', data: [1131444, 973710, 881463, 978662, 1008858, 1185911, 1415125, 1649669, 1069690, 1068021, 902593, 908716, 994994, 875487, 797065, 926883, 1028371, 1129107, 1427859, 1678016, 1094457, 1272433], color: '#ef4444', label: '애월해안' },
                        { name: '예래해안', data: [657725, 628532, 502923, 649005, 700240, 661770, 699022, 849833, 609977, 674418, 554326, 554765, 577445, 474121, 443778, 526673, 617738, 637073, 671114, 780801, 564291, 743592], color: '#22c55e', label: '예래해안' },
                        { name: '성산해안', data: [495320, 450953, 507796, 528999, 574719, 525905, 500602, 553638, 514405, 529468, 437578, 415027, 446954, 357151, 387749, 554018, 640180, 535792, 560267, 660243, 518479, 740973], color: '#a855f7', label: '성산해안' },
                        { name: '한림해안', data: [415211, 383466, 423380, 484591, 520474, 490377, 565394, 688502, 456003, 447196, 351883, 317964, 318649, 0, 302506, 406774, 493545, 501343, 642890, 748836, 507266, 572515], color: '#f59e0b', label: '한림해안' },
                        { name: '표선해안', data: [403931, 352887, 422259, 440681, 0, 475753, 496081, 573889, 442784, 479933, 450126, 400373, 396213, 358162, 403445, 448400, 476834, 492684, 522982, 576071, 429113, 599058], color: '#8b5cf6', label: '표선해안' },
                        { name: '중문해안', data: [378919, 342796, 0, 448133, 488233, 428492, 428755, 505447, 380044, 478275, 365868, 295550, 0, 285654, 296212, 408910, 463442, 430765, 441324, 512750, 384106, 553002], color: '#eab308', label: '중문해안' },
                        { name: '구좌해안', data: [0, 0, 344421, 0, 0, 450913, 515878, 664575, 416424, 0, 0, 0, 0, 0, 0, 394638, 480801, 503558, 654161, 762264, 455047, 513333], color: '#ec4899', label: '구좌해안' },
                        { name: '남원해안', data: [610377, 448776, 370163, 421629, 435406, 413473, 401330, 471870, 0, 0, 343790, 424791, 553909, 329542, 0, 0, 0, 0, 0, 0, 0, 492364], color: '#14b8a6', label: '남원해안' }
                      ].map((region, regionIdx) => {
                        const points = region.data.map((value, idx) => {
                          const x = 80 + (idx * 50);
                          const y = value > 0 ? (350 - ((value / 1800000) * 300)) : null;
                          return y !== null ? `${x},${y}` : null;
                        }).filter(p => p !== null).join(' ');
                        
                        return (
                          <g key={regionIdx}>
                            <polyline
                              points={points}
                              fill="none"
                              stroke={region.color}
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            {region.data.map((value, idx) => {
                              if (value === 0) return null;
                              const x = 80 + (idx * 50);
                              const y = 350 - ((value / 1800000) * 300);
                              return (
                                <circle
                                  key={idx}
                                  cx={x}
                                  cy={y}
                                  r="3"
                                  fill={region.color}
                                  className="hover:r-5 transition-all cursor-pointer"
                                />
                              );
                            })}
                          </g>
                        );
                      })}
                      
                      {/* X축 */}
                      <line x1="60" y1="350" x2="1180" y2="350" stroke="#9ca3af" strokeWidth="2"/>
                      <text x="620" y="395" fontSize="12" fill="#374151" fontWeight="600" textAnchor="middle">월별</text>
                    </svg>
                    
                    {/* 범례 */}
                    <div className="flex flex-wrap gap-4 justify-center mt-6">
                      {[
                        { name: '조천해안', color: '#06b6d4' },
                        { name: '애월해안', color: '#ef4444' },
                        { name: '예래해안', color: '#22c55e' },
                        { name: '성산해안', color: '#a855f7' },
                        { name: '한림해안', color: '#f59e0b' },
                        { name: '표선해안', color: '#8b5cf6' },
                        { name: '중문해안', color: '#eab308' },
                        { name: '구좌해안', color: '#ec4899' },
                        { name: '남원해안', color: '#14b8a6' }
                      ].map((legend) => (
                        <div key={legend.name} className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: legend.color }}></div>
                          <span className="text-sm text-gray-700 font-medium">{legend.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 지역별 상세 테이블 */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">해안별 상세 방문객 데이터 (2025년)</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">해안명</th>
                        <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">2025.01</th>
                        <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">2025.02</th>
                        <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">2025.03</th>
                        <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">2025.04</th>
                        <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">2025.05</th>
                        <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">2025.06</th>
                        <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">2025.07</th>
                        <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">2025.08</th>
                        <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">2025.09</th>
                        <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">2025.10</th>
                        <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700 bg-blue-50">합계</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { name: '애월해안', data: [994994, 875487, 797065, 926883, 1028371, 1129107, 1427859, 1678016, 1094457, 1272433] },
                        { name: '조천해안', data: [1059200, 869894, 947760, 1064042, 1232614, 1227062, 1428168, 1623406, 1159237, 1441604] },
                        { name: '예래해안', data: [577445, 474121, 443778, 526673, 617738, 637073, 671114, 780801, 564291, 743592] },
                        { name: '남원해안', data: [553909, 329542, 0, 0, 0, 0, 0, 0, 0, 492364] },
                        { name: '성산해안', data: [446954, 357151, 387749, 554018, 640180, 535792, 560267, 660243, 518479, 740973] },
                        { name: '한림해안', data: [318649, 0, 302506, 406774, 493545, 501343, 642890, 748836, 507266, 572515] },
                        { name: '표선해안', data: [396213, 358162, 403445, 448400, 476834, 492684, 522982, 576071, 429113, 599058] },
                        { name: '중문해안', data: [0, 285654, 296212, 408910, 463442, 430765, 441324, 512750, 384106, 553002] },
                        { name: '구좌해안', data: [0, 0, 0, 394638, 480801, 503558, 654161, 762264, 455047, 513333] }
                      ].map((region, idx) => (
                        <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm font-medium text-gray-800">{region.name}</td>
                          {region.data.map((value, i) => (
                            <td key={i} className="px-4 py-3 text-right text-sm text-gray-600">
                              {value === 0 ? '-' : (value / 10000).toFixed(1) + '만'}
                            </td>
                          ))}
                          <td className="px-4 py-3 text-right text-sm font-bold text-blue-600 bg-blue-50">
                            {(region.data.reduce((a, b) => a + b, 0) / 10000).toFixed(0)}만
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      
      {/* 챗봇 */}
      <ChatBot type="admin" />
    </div>
  );
}
