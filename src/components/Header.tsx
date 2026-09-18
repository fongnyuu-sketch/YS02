import React from 'react';
import { HeartPulse, Phone, Type, BookOpen, Calendar, MapPin, UserCheck, Sparkles } from 'lucide-react';

interface HeaderProps {
  largeText: boolean;
  setLargeText: (val: boolean | ((prev: boolean) => boolean)) => void;
  activeTab: 'chat' | 'admin';
  setActiveTab: (tab: 'chat' | 'admin') => void;
  onOpenReservation: () => void;
  onOpenPrograms: () => void;
  onOpenCenterInfo: () => void;
  onOpenRecommendation: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  largeText,
  setLargeText,
  activeTab,
  setActiveTab,
  onOpenReservation,
  onOpenPrograms,
  onOpenCenterInfo,
  onOpenRecommendation,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs">
      {/* Top emergency & accessibility bar */}
      <div className="bg-emerald-800 text-emerald-50 px-4 py-1.5 text-xs sm:text-sm font-medium flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 bg-emerald-700/80 px-2 py-0.5 rounded-full text-emerald-100 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
            24시간 자동 응대
          </span>
          <span className="hidden sm:inline text-emerald-200">|</span>
          <span className="text-emerald-100">충청남도 아산시 보건소 · 아산시 동부건강생활지원센터 (구 배방)</span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="tel:041-536-8723"
            className="flex items-center gap-1.5 text-emerald-100 hover:text-white font-semibold transition-colors"
            title="아산시 동부건강생활지원센터 바로 전화 연결"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-300" />
            <span>민원실 직통: 041-536-8723</span>
          </a>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Logo and Center Title */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('chat')}>
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-md shadow-emerald-600/20 ring-2 ring-emerald-100">
            <HeartPulse className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className={`font-bold tracking-tight text-slate-900 ${largeText ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'}`}>
                아산시 동부건강생활지원센터 민원 AI 상담소
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              배방읍·장재리 거점 · 체성분 검사 · 건강 첫걸음 순환운동 · 맞춤 프로그램 추천
            </p>
          </div>
        </div>

        {/* Action buttons & mode toggles */}
        <div className="flex items-center flex-wrap gap-2 sm:gap-3">
          {/* Quick service modal buttons (when in chat mode) */}
          {activeTab === 'chat' && (
            <div className="hidden lg:flex items-center gap-2 mr-2">
              <button
                type="button"
                onClick={onOpenRecommendation}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100 transition-colors shadow-2xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                맞춤 건강 추천
              </button>
              <button
                type="button"
                onClick={onOpenReservation}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors"
              >
                <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                체성분 무료예약
              </button>
              <button
                type="button"
                onClick={onOpenPrograms}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200 hover:bg-teal-100 transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5 text-teal-600" />
                센터 프로그램
              </button>
              <button
                type="button"
                onClick={onOpenCenterInfo}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-slate-600" />
                센터 이용안내
              </button>
            </div>
          )}

          {/* Large text accessibility toggle */}
          <button
            type="button"
            onClick={() => setLargeText((prev) => !prev)}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-xs ${
              largeText
                ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-400 font-bold'
                : 'bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100'
            }`}
            title="글자 크기를 크게 키우고 시인성을 높입니다"
          >
            <Type className="w-4 h-4 text-amber-700" />
            <span>{largeText ? '큰 글자 켜짐 (어르신)' : '큰 글자 모드'}</span>
          </button>

          {/* Resident vs Admin switch */}
          <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200">
            <button
              type="button"
              onClick={() => setActiveTab('chat')}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'chat'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              주민 민원 상담
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('admin')}
              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'admin'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              담당자 관리
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
