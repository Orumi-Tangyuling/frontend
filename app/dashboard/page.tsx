'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

import ChatBot from '../components/ChatBot';
import styles from './DashboardHeader.module.scss';

// 최소 로딩 시간을 보장하는 래퍼
const JejuOceanMap = dynamic(
  () => {
    const start = Date.now();
    return import('../components/JejuOceanMap').then(mod => {
      const elapsed = Date.now() - start;
      const minLoadingTime = 1500; // 최소 1.5초 로딩 화면 표시
      if (elapsed < minLoadingTime) {
        return new Promise(resolve => {
          setTimeout(() => resolve(mod), minLoadingTime - elapsed);
        });
      }
      return mod;
    });
  },
  {
    ssr: false,
    loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Animated Wave Background */}
      <div className="absolute inset-0 opacity-10">
        <svg className="wave-pattern w-full h-full" viewBox="0 0 1200 400" preserveAspectRatio="none">
          <path
            d="M0,160 C200,100 400,180 600,160 C800,140 1000,200 1200,160 L1200,400 L0,400 Z"
            fill="url(#waveGradient1)"
            opacity="0.3"
          >
            <animate
              attributeName="d"
              dur="8s"
              repeatCount="indefinite"
              values="
                M0,160 C200,100 400,180 600,160 C800,140 1000,200 1200,160 L1200,400 L0,400 Z;
                M0,180 C200,140 400,160 600,180 C800,200 1000,140 1200,180 L1200,400 L0,400 Z;
                M0,160 C200,100 400,180 600,160 C800,140 1000,200 1200,160 L1200,400 L0,400 Z
              "
            />
          </path>
          <path
            d="M0,220 C300,180 500,240 800,220 C1000,200 1100,260 1200,220 L1200,400 L0,400 Z"
            fill="url(#waveGradient2)"
            opacity="0.2"
          >
            <animate
              attributeName="d"
              dur="12s"
              repeatCount="indefinite"
              values="
                M0,220 C300,180 500,240 800,220 C1000,200 1100,260 1200,220 L1200,400 L0,400 Z;
                M0,240 C300,220 500,200 800,240 C1000,260 1100,220 1200,240 L1200,400 L0,400 Z;
                M0,220 C300,180 500,240 800,220 C1000,200 1100,260 1200,220 L1200,400 L0,400 Z
              "
            />
          </path>
          <defs>
            <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Central Loader */}
      <div className="relative z-10 text-center">
        {/* Pulsing Circle Loader */}
        <div className="mb-6 inline-block">
          <div className="relative h-20 w-20">
            <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping"></div>
            <div className="absolute inset-0 rounded-full bg-blue-500/10 animate-pulse"></div>
            <div className="relative h-full w-full rounded-full border-4 border-blue-400/30 border-t-blue-400 animate-spin"></div>
            <div className="absolute inset-2 rounded-full bg-blue-500/5 backdrop-blur-sm"></div>
          </div>
        </div>

        {/* Loading Text */}
        <p className="text-xl font-medium text-white tracking-wide animate-fade-in-up mb-2">
          데이터 로딩 중
          <span className="inline-block ml-1">
            <span className="animate-pulse">.</span>
            <span className="animate-pulse animation-delay-200">.</span>
            <span className="animate-pulse animation-delay-400">.</span>
          </span>
        </p>
        <p className="text-sm text-blue-300/70 animate-fade-in-up">제주 해양환경 정보를 불러오는 중입니다</p>

        {/* Progress Bar */}
        <div className="mt-6 h-1 w-64 mx-auto bg-slate-700/50 rounded-full overflow-hidden backdrop-blur-sm">
          <div className="h-full w-full bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 origin-left">
            <div className="h-full w-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
    </div>
  ),
});

export default function DashboardPage() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-100">
      {/* 메인 컨텐츠 */}
      <main className="relative w-full flex-1">
        {/* 지도 영역 (전체 화면) */}
        <div className="absolute inset-0">
          <JejuOceanMap />
        </div>

        {/* 헤더 (지도 위에 떠있음) */}
        <header className={styles.dashboardHeader}>
          <div className={styles.headerContainer}>
            {/* Logo and Title */}
            <div className={styles.logoSection}>

              {/* Title */}
              <h1 className={styles.title}>
                제주 해양환경 대시보드              </h1>
            </div>

            {/* Login Button */}
            <Link href="/login" className={styles.loginButton}>
              <span>로그인</span>
              {/* Hover Glow Effect */}
              <div className={styles.glowEffect}></div>
              {/* Subtle Shimmer on Hover */}
              <div className={styles.shimmerEffect}></div>
            </Link>
          </div>
        </header>
      </main>

      {/* 챗봇 */}
      <ChatBot type="user" />
    </div>
  );
}
