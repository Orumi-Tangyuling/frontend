'use client';

import { useState } from 'react';

import Link from 'next/link';

import {
  ArrowDownTrayIcon,
  ArrowTrendingUpIcon,
  ChartBarIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';

import ChatBot from '../components/ChatBot';
import styles from './Admin.module.scss';

export default function AdminDashboard() {
  const [activeMenu, setActiveMenu] = useState('statistics');
  const [chatMessage, setChatMessage] = useState('');
  const [pdfUrl, setPdfUrl] = useState('/sample-report.pdf'); // 더미 PDF URL

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
    {
      id: 1,
      region: '애월해구 A구역',
      amount: '450kg',
      risk: '높음',
      action: '즉시 수거',
      riskColor: 'text-red-600 bg-red-50',
    },
    {
      id: 2,
      region: '강서구 B구역',
      amount: '320kg',
      risk: '중간',
      action: '모니터링 강화',
      riskColor: 'text-yellow-600 bg-yellow-50',
    },
    {
      id: 3,
      region: '영도구 C구역',
      amount: '280kg',
      risk: '낮음',
      action: '정기 점검',
      riskColor: 'text-blue-600 bg-blue-50',
    },
    {
      id: 4,
      region: '서하구 D구역',
      amount: '200kg',
      risk: '낮음',
      action: '주의 관찰',
      riskColor: 'text-blue-600 bg-blue-50',
    },
  ];

  const maxValue = Math.max(...monthlyData.map(d => d.value));

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Chat message:', chatMessage);
    setChatMessage('');
  };

  return (
    <div className={styles.container}>
      {/* 왼쪽 사이드바 */}
      <aside className={styles.sidebar}>
        {/* 로고 */}
        <div className={styles.logoSection}>
          <div className={styles.logoContent}>
            <img src="/logo.png" alt="깨끗해양" className={styles.logoImage} />
            <span className={styles.logoText}>깨끗해양</span>
          </div>
        </div>

        {/* 메뉴 */}
        <nav className={styles.navigation}>
          <div className={styles.navSection}>
            <h3 className={styles.navTitle}>메뉴</h3>
            <div className={styles.navButtons}>
              <button
                onClick={() => setActiveMenu('statistics')}
                className={`${styles.navButton} ${
                  activeMenu === 'statistics' ? styles.active : ''
                }`}
              >
                <ChartBarIcon />
                <span>통계</span>
              </button>
              <button
                onClick={() => setActiveMenu('reports')}
                className={`${styles.navButton} ${
                  activeMenu === 'reports' ? styles.active : ''
                }`}
              >
                <DocumentTextIcon />
                <span>보고서 생성</span>
              </button>
              <button
                onClick={() => setActiveMenu('download')}
                className={`${styles.navButton} ${
                  activeMenu === 'download' ? styles.active : ''
                }`}
              >
                <ArrowDownTrayIcon />
                <span>데이터 다운로드</span>
              </button>
              <button
                onClick={() => setActiveMenu('visitors')}
                className={`${styles.navButton} ${
                  activeMenu === 'visitors' ? styles.active : ''
                }`}
              >
                <MapPinIcon />
                <span>방문객 통계</span>
              </button>
            </div>
          </div>
        </nav>

        {/* 로그아웃 */}
        <div className={styles.logoutSection}>
          <Link
            href="/"
            className={styles.logoutButton}
          >
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            로그아웃
          </Link>
        </div>
      </aside>

      {/* 메인 컨텐츠 */}
      <main className={styles.mainContent}>
        {/* 헤더 */}
        <header className={styles.header}>
          <h1 className={styles.headerTitle}>행정 대시보드</h1>
        </header>

        <div className={styles.contentArea}>
          {activeMenu === 'statistics' && (
            <>
              {/* 타이틀 */}
              <div className={styles.sectionTitle}>
                <h2>
                  월간 예측 대시보드 - 2025년 12월
                </h2>
              </div>

              {/* 통계 카드 */}
              <div className={styles.statsGrid}>
                {/* 총 예상 유입량 */}
                <div className={styles.statsCardSmall}>
                  <h3>총 예상 유입량</h3>
                  <div className={styles.statsValue}>
                    <span className={styles.blue}>1,250 kg</span>
                  </div>
                  <div className={styles.statsDetails}>
                    <span className={styles.label}>전월 대비</span>
                    <span className={`${styles.value} ${styles.positive}`}>
                      +15%
                      <ArrowTrendingUpIcon />
                    </span>
                  </div>
                </div>

                {/* 위험 지역 */}
                <div className={styles.statsCardSmall}>
                  <h3>위험 지역</h3>
                  <div className={styles.statsValue}>
                    <span className={styles.red}>3개소</span>
                  </div>
                  <div className={styles.statsDetails}>
                    <span className={styles.subvalue}>
                      추적 지역: <span>5개소</span>
                    </span>
                  </div>
                </div>

                {/* 수거 계획 필요 */}
                <div className={styles.statsCardSmall}>
                  <h3>수거 계획 필요</h3>
                  <div className={styles.statsValue}>
                    <span className={styles.orange}>즉시 조치 2곳</span>
                  </div>
                  <div className={styles.statsDetails}>
                    <span className={styles.subvalue}>
                      장기 점검 <span>8곳</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* 월별 쓰레기 유입량 추이 차트 */}
              <div className={styles.chartCard}>
                <h3>
                  월별 쓰레기 유입량 추이 (6개월)
                </h3>
                <div className={styles.chartContainer}>
                  {/* Y축 라벨 */}
                  <div className={styles.chartYAxis}>
                    <span>2000</span>
                    <span>1500</span>
                    <span>1000</span>
                    <span>500</span>
                    <span>0</span>
                  </div>

                  {/* 차트 영역 */}
                  <div className={styles.chartArea}>
                    {monthlyData.map((data, index) => {
                      const height = (data.value / maxValue) * 100;
                      return (
                        <div
                          key={data.month}
                          className={styles.chartBar}
                        >
                          <div
                            className={styles.chartBarInner}
                          >
                            <div className={styles.barWrapper}>
                              <div
                                className={styles.bar}
                                style={{ height: `${height}%` }}
                              >
                                <div className={styles.barTooltip}>
                                  {data.value}kg
                                </div>
                              </div>
                            </div>
                          </div>
                          <span className={styles.chartLabel}>{data.month}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* 위험 지역 요약 테이블 */}
              <div className={styles.tableCard}>
                <h3>위험 지역 요약</h3>
                <div className={styles.tableWrapper}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>
                          지역명
                        </th>
                        <th>
                          예상량
                        </th>
                        <th>
                          위험도
                        </th>
                        <th>
                          조치사항
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {riskAreas.map(area => (
                        <tr key={area.id}>
                          <td>{area.region}</td>
                          <td className={styles.fontMedium}>
                            {area.amount}
                          </td>
                          <td>
                            <span
                              className={`${styles.badge} ${
                                area.risk === '높음' ? styles.red :
                                area.risk === '중간' ? styles.yellow :
                                styles.blue
                              }`}
                            >
                              {area.risk}
                            </span>
                          </td>
                          <td>{area.action}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 행정 전용 챗봇 */}
              <div className={styles.chatbotCard}>
                <div className={styles.chatbotHeader}>
                  <ChatBubbleLeftRightIcon />
                  <h3>행정 전용 챗봇</h3>
                </div>

                {/* 빠른 작업 버튼 */}
                <div className={styles.quickActions}>
                  <button className={`${styles.quickActionButton} ${styles.primary}`}>
                    📝 간단 보고서 작성
                  </button>
                  <button className={`${styles.quickActionButton} ${styles.secondary}`}>
                    💾 데이터 다운로드 요청
                  </button>
                </div>

                {/* 채팅 입력 */}
                <form onSubmit={handleChatSubmit} className={styles.chatForm}>
                  <input
                    type="text"
                    value={chatMessage}
                    onChange={e => setChatMessage(e.target.value)}
                    placeholder="궁금한 내용을 입력하세요..."
                    className={styles.chatInput}
                  />
                  <button
                    type="submit"
                    className={styles.chatSubmit}
                  >
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </button>
                </form>
              </div>
            </>
          )}

          {/* 보고서 생성 섹션 */}
          {activeMenu === 'reports' && (
            <>
              <div className={styles.reportHeader}>
                <h2 className={styles.reportTitle}>2025년 12월 해양쓰레기 예측 보고서</h2>
                <div className={styles.reportActions}>
                  <button className={`${styles.reportButton} ${styles.edit}`}>
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    편집
                  </button>
                  <button 
                    className={`${styles.reportButton} ${styles.download}`}
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = pdfUrl;
                      link.download = '해양쓰레기_예측보고서_2025_12.pdf';
                      link.click();
                    }}
                  >
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    다운로드 (PDF)
                  </button>
                  <button className={`${styles.reportButton} ${styles.download}`}>
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    다운로드 (DOCX)
                  </button>
                  <button 
                    className={`${styles.reportButton} ${styles.print}`}
                    onClick={() => {
                      const iframe = document.querySelector('iframe');
                      if (iframe?.contentWindow) {
                        iframe.contentWindow.print();
                      }
                    }}
                  >
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                    인쇄
                  </button>
                </div>
                <div className={styles.reportDate}>생성일: 2025.12.10</div>
              </div>

              <div className={styles.pdfViewerContainer}>
                <iframe
                  src={pdfUrl}
                  className={styles.pdfViewer}
                  title="보고서 PDF 뷰어"
                />
                <div className={styles.pdfPlaceholder}>
                  <svg className={styles.pdfIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <p className={styles.pdfPlaceholderText}>
                    PDF 보고서를 로드하는 중...
                  </p>
                  <p className={styles.pdfPlaceholderSubtext}>
                    실제 환경에서는 백엔드 API에서 생성된 PDF가 표시됩니다.
                  </p>
                </div>
              </div>
            </>
          )}

          {/* 방문객 통계 섹션 */}
          {activeMenu === 'visitors' && (
            <>
              <div className={styles.sectionTitle}>
                <h2>
                  해안별 방문객 통계 (2024.01 ~ 2025.10)
                </h2>
                <p>
                  제주도 주요 해안 지역의 월별 방문객 추이를 확인할 수 있습니다
                </p>
              </div>

              {/* 요약 카드 */}
              <div className={styles.statsGrid}>
                <div className={`${styles.statsCard} ${styles.variant1}`}>
                  <h3>총 방문객 수</h3>
                  <p className={styles.statsValue}>약 2.8억명</p>
                  <p className={styles.statsSubtext}>22개월 누적</p>
                </div>
                <div className={`${styles.statsCard} ${styles.variant2}`}>
                  <h3>최다 방문 해안</h3>
                  <p className={styles.statsValue}>애월해안</p>
                  <p className={styles.statsSubtext}>2,400만명 방문</p>
                </div>
                <div className={`${styles.statsCard} ${styles.variant3}`}>
                  <h3>평균 월 방문객</h3>
                  <p className={styles.statsValue}>1,280만명</p>
                  <p className={styles.statsSubtext}>전체 해안 평균</p>
                </div>
                <div className={`${styles.statsCard} ${styles.variant4}`}>
                  <h3>성수기</h3>
                  <p className={styles.statsValue}>7-8월</p>
                  <p className={styles.statsSubtext}>평균 1,650만명/월</p>
                </div>
              </div>

              {/* 지역별 최근 12개월 차트 */}
              <div className={styles.chartCard}>
                <h3>
                  제주 해안별 월별 방문객 추이 (2024.01 ~ 2025.10)
                </h3>
                <div className={styles.svgChartContainer}>
                  <div className={styles.svgChartInner}>
                    {/* SVG 라인 차트 */}
                    <svg width="1200" height="400" className="mx-auto">
                      <defs>
                        <linearGradient id="gridGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#e5e7eb" stopOpacity="0.5" />
                          <stop offset="100%" stopColor="#e5e7eb" stopOpacity="0" />
                        </linearGradient>
                      </defs>

                      {/* 그리드 라인 */}
                      {[0, 1, 2, 3, 4, 5, 6].map(i => {
                        const y = 50 + i * 50;
                        const value = 1800000 - i * 300000;
                        return (
                          <g key={i}>
                            <line
                              x1="60"
                              y1={y}
                              x2="1180"
                              y2={y}
                              stroke="#e5e7eb"
                              strokeWidth="1"
                            />
                            <text x="45" y={y + 5} fontSize="11" fill="#6b7280" textAnchor="end">
                              {(value / 10000).toFixed(0)}만
                            </text>
                          </g>
                        );
                      })}

                      {/* X축 월별 라벨 */}
                      {[
                        '2024.01',
                        '02',
                        '03',
                        '04',
                        '05',
                        '06',
                        '07',
                        '08',
                        '09',
                        '10',
                        '11',
                        '12',
                        '2025.01',
                        '02',
                        '03',
                        '04',
                        '05',
                        '06',
                        '07',
                        '08',
                        '09',
                        '10',
                      ].map((month, idx) => {
                        const x = 80 + idx * 50;
                        return (
                          <text
                            key={idx}
                            x={x}
                            y="370"
                            fontSize="10"
                            fill="#6b7280"
                            textAnchor="middle"
                          >
                            {month}
                          </text>
                        );
                      })}

                      {/* 데이터 라인 */}
                      {[
                        {
                          name: '조천해안',
                          data: [
                            1112874, 1009199, 1072009, 1161439, 1246657, 1243603, 1428509, 1636257,
                            1164311, 1153969, 1078825, 957819, 1059200, 869894, 947760, 1064042,
                            1232614, 1227062, 1428168, 1623406, 1159237, 1441604,
                          ],
                          color: '#06b6d4',
                          label: '조천해안',
                        },
                        {
                          name: '애월해안',
                          data: [
                            1131444, 973710, 881463, 978662, 1008858, 1185911, 1415125, 1649669,
                            1069690, 1068021, 902593, 908716, 994994, 875487, 797065, 926883,
                            1028371, 1129107, 1427859, 1678016, 1094457, 1272433,
                          ],
                          color: '#ef4444',
                          label: '애월해안',
                        },
                        {
                          name: '예래해안',
                          data: [
                            657725, 628532, 502923, 649005, 700240, 661770, 699022, 849833, 609977,
                            674418, 554326, 554765, 577445, 474121, 443778, 526673, 617738, 637073,
                            671114, 780801, 564291, 743592,
                          ],
                          color: '#22c55e',
                          label: '예래해안',
                        },
                        {
                          name: '성산해안',
                          data: [
                            495320, 450953, 507796, 528999, 574719, 525905, 500602, 553638, 514405,
                            529468, 437578, 415027, 446954, 357151, 387749, 554018, 640180, 535792,
                            560267, 660243, 518479, 740973,
                          ],
                          color: '#a855f7',
                          label: '성산해안',
                        },
                        {
                          name: '한림해안',
                          data: [
                            415211, 383466, 423380, 484591, 520474, 490377, 565394, 688502, 456003,
                            447196, 351883, 317964, 318649, 0, 302506, 406774, 493545, 501343,
                            642890, 748836, 507266, 572515,
                          ],
                          color: '#f59e0b',
                          label: '한림해안',
                        },
                        {
                          name: '표선해안',
                          data: [
                            403931, 352887, 422259, 440681, 0, 475753, 496081, 573889, 442784,
                            479933, 450126, 400373, 396213, 358162, 403445, 448400, 476834, 492684,
                            522982, 576071, 429113, 599058,
                          ],
                          color: '#8b5cf6',
                          label: '표선해안',
                        },
                        {
                          name: '중문해안',
                          data: [
                            378919, 342796, 0, 448133, 488233, 428492, 428755, 505447, 380044,
                            478275, 365868, 295550, 0, 285654, 296212, 408910, 463442, 430765,
                            441324, 512750, 384106, 553002,
                          ],
                          color: '#eab308',
                          label: '중문해안',
                        },
                        {
                          name: '구좌해안',
                          data: [
                            0, 0, 344421, 0, 0, 450913, 515878, 664575, 416424, 0, 0, 0, 0, 0, 0,
                            394638, 480801, 503558, 654161, 762264, 455047, 513333,
                          ],
                          color: '#ec4899',
                          label: '구좌해안',
                        },
                        {
                          name: '남원해안',
                          data: [
                            610377, 448776, 370163, 421629, 435406, 413473, 401330, 471870, 0, 0,
                            343790, 424791, 553909, 329542, 0, 0, 0, 0, 0, 0, 0, 492364,
                          ],
                          color: '#14b8a6',
                          label: '남원해안',
                        },
                      ].map((region, regionIdx) => {
                        const points = region.data
                          .map((value, idx) => {
                            const x = 80 + idx * 50;
                            const y = value > 0 ? 350 - (value / 1800000) * 300 : null;
                            return y !== null ? `${x},${y}` : null;
                          })
                          .filter(p => p !== null)
                          .join(' ');

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
                              const x = 80 + idx * 50;
                              const y = 350 - (value / 1800000) * 300;
                              return (
                                <circle
                                  key={idx}
                                  cx={x}
                                  cy={y}
                                  r="3"
                                  fill={region.color}
                                  className="hover:r-5 cursor-pointer transition-all"
                                />
                              );
                            })}
                          </g>
                        );
                      })}

                      {/* X축 */}
                      <line x1="60" y1="350" x2="1180" y2="350" stroke="#9ca3af" strokeWidth="2" />
                      <text
                        x="620"
                        y="395"
                        fontSize="12"
                        fill="#374151"
                        fontWeight="600"
                        textAnchor="middle"
                      >
                        월별
                      </text>
                    </svg>

                    {/* 범례 */}
                    <div className={styles.legend}>
                      {[
                        { name: '조천해안', color: '#06b6d4' },
                        { name: '애월해안', color: '#ef4444' },
                        { name: '예래해안', color: '#22c55e' },
                        { name: '성산해안', color: '#a855f7' },
                        { name: '한림해안', color: '#f59e0b' },
                        { name: '표선해안', color: '#8b5cf6' },
                        { name: '중문해안', color: '#eab308' },
                        { name: '구좌해안', color: '#ec4899' },
                        { name: '남원해안', color: '#14b8a6' },
                      ].map(legend => (
                        <div key={legend.name} className={styles.legendItem}>
                          <div
                            className={styles.legendColor}
                            style={{ backgroundColor: legend.color }}
                          ></div>
                          <span className={styles.legendLabel}>{legend.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 지역별 상세 테이블 */}
              <div className={styles.tableCard}>
                <h3>
                  해안별 상세 방문객 데이터 (2025년)
                </h3>
                <div className={styles.tableWrapper}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>
                          해안명
                        </th>
                        <th className={styles.alignRight}>
                          2025.01
                        </th>
                        <th className={styles.alignRight}>
                          2025.02
                        </th>
                        <th className={styles.alignRight}>
                          2025.03
                        </th>
                        <th className={styles.alignRight}>
                          2025.04
                        </th>
                        <th className={styles.alignRight}>
                          2025.05
                        </th>
                        <th className={styles.alignRight}>
                          2025.06
                        </th>
                        <th className={styles.alignRight}>
                          2025.07
                        </th>
                        <th className={styles.alignRight}>
                          2025.08
                        </th>
                        <th className={styles.alignRight}>
                          2025.09
                        </th>
                        <th className={styles.alignRight}>
                          2025.10
                        </th>
                        <th className={`${styles.alignRight} ${styles.highlight}`}>
                          합계
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          name: '애월해안',
                          data: [
                            994994, 875487, 797065, 926883, 1028371, 1129107, 1427859, 1678016,
                            1094457, 1272433,
                          ],
                        },
                        {
                          name: '조천해안',
                          data: [
                            1059200, 869894, 947760, 1064042, 1232614, 1227062, 1428168, 1623406,
                            1159237, 1441604,
                          ],
                        },
                        {
                          name: '예래해안',
                          data: [
                            577445, 474121, 443778, 526673, 617738, 637073, 671114, 780801, 564291,
                            743592,
                          ],
                        },
                        { name: '남원해안', data: [553909, 329542, 0, 0, 0, 0, 0, 0, 0, 492364] },
                        {
                          name: '성산해안',
                          data: [
                            446954, 357151, 387749, 554018, 640180, 535792, 560267, 660243, 518479,
                            740973,
                          ],
                        },
                        {
                          name: '한림해안',
                          data: [
                            318649, 0, 302506, 406774, 493545, 501343, 642890, 748836, 507266,
                            572515,
                          ],
                        },
                        {
                          name: '표선해안',
                          data: [
                            396213, 358162, 403445, 448400, 476834, 492684, 522982, 576071, 429113,
                            599058,
                          ],
                        },
                        {
                          name: '중문해안',
                          data: [
                            0, 285654, 296212, 408910, 463442, 430765, 441324, 512750, 384106,
                            553002,
                          ],
                        },
                        {
                          name: '구좌해안',
                          data: [0, 0, 0, 394638, 480801, 503558, 654161, 762264, 455047, 513333],
                        },
                      ].map((region, idx) => (
                        <tr key={idx}>
                          <td>
                            {region.name}
                          </td>
                          {region.data.map((value, i) => (
                            <td key={i} className={styles.alignRight}>
                              {value === 0 ? '-' : (value / 10000).toFixed(1) + '만'}
                            </td>
                          ))}
                          <td className={`${styles.alignRight} ${styles.highlight}`}>
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
