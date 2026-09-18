import React from 'react';
import { X, Sparkles, CheckCircle2, Calendar, Clock, ArrowRight, ShieldCheck, HeartHandshake } from 'lucide-react';
import { RecommendationItem } from '../types.ts';

interface RecommendationModalProps {
  isOpen: boolean;
  onClose: () => void;
  recommendations: RecommendationItem[];
  primaryHealthGoal?: string;
  largeText: boolean;
  onSelectProgramToEnroll: (programId?: string) => void;
}

export const RecommendationModal: React.FC<RecommendationModalProps> = ({
  isOpen,
  onClose,
  recommendations,
  primaryHealthGoal,
  largeText,
  onSelectProgramToEnroll,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-emerald-100 max-h-[90vh] flex flex-col overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-700/80 rounded-2xl shadow-inner border border-emerald-600">
              <Sparkles className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-slate-950">
                  AI 맞춤 분석
                </span>
                <span className="text-emerald-200 text-xs font-semibold">아산시 동부건강생활지원센터</span>
              </div>
              <h2 className={`font-bold mt-0.5 ${largeText ? 'text-xl' : 'text-lg'}`}>
                주민님을 위한 맞춤 건강 프로그램 & 활동 추천
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-5">
          {/* Analysis Banner */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3">
            <HeartHandshake className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-emerald-950 leading-relaxed">
              <p className="font-bold text-emerald-900">
                질문 분석 결과: <span className="text-emerald-700 underline underline-offset-2">{primaryHealthGoal || '만성질환 예방 및 신체활동 증진'}</span>
              </p>
              <p className="mt-1 text-slate-600 text-xs">
                AI가 주민님께서 문의하신 건강 관심사와 센터의 개설 강좌를 분석하여, <strong>함께 참여했을 때 시너지 효과가 가장 높은 연계 프로그램</strong>을 선별했습니다.
              </p>
            </div>
          </div>

          {/* Recommendations Cards */}
          <div className="space-y-3.5">
            {recommendations.map((rec, index) => (
              <div
                key={rec.id || index}
                className="border border-slate-200 hover:border-emerald-500 rounded-2xl p-4 sm:p-5 bg-white shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden"
              >
                {/* Accent top stripe */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500"></div>

                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2 pt-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-900 border border-emerald-200">
                        {rec.badge}
                      </span>
                      <span className="px-2 py-0.5 rounded-md text-xs font-semibold bg-slate-100 text-slate-600">
                        {rec.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>적합도 {rec.matchScore}%</span>
                    </div>
                  </div>

                  <h3 className={`font-bold text-slate-900 ${largeText ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'}`}>
                    {rec.programTitle}
                  </h3>

                  {/* AI Reason */}
                  <div className="mt-2.5 text-xs sm:text-sm text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1.5">
                    <p className="leading-relaxed">
                      <strong className="text-emerald-900">💡 AI 추천 이유:</strong> {rec.reason}
                    </p>
                    <p className="text-emerald-800 font-medium leading-relaxed bg-emerald-50/70 p-2 rounded-lg border border-emerald-100/80">
                      <strong>🔗 상호보완 연계 팁:</strong> {rec.complementaryTip}
                    </p>
                  </div>

                  {/* Meta details */}
                  <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                    {rec.schedule && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-emerald-600" />
                        {rec.schedule}
                      </span>
                    )}
                    <span className="flex items-center gap-1 font-bold text-emerald-700">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      수강료 {rec.fee || '전액 무료'}
                    </span>
                  </div>
                </div>

                {/* Apply Button */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">아산시 배방읍 용연동길 50 (장재리)</span>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onSelectProgramToEnroll(rec.programId);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-colors"
                  >
                    <span>프로그램 접수하기</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <p className="text-xs text-slate-500">
            문의: 아산시 동부건강생활지원센터 ☎ 041-536-8723
          </p>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-800 text-white rounded-xl text-xs font-bold hover:bg-slate-900 transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
