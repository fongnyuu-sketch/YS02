import React from 'react';
import { X, Clock, MapPin, Phone, Car, FileCheck, Building2, ShieldCheck } from 'lucide-react';

interface CenterInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  largeText: boolean;
}

export const CenterInfoModal: React.FC<CenterInfoModalProps> = ({ isOpen, onClose, largeText }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 max-h-[90vh] flex flex-col overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-700 rounded-xl">
              <Building2 className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-amber-300">충청남도 아산시 보건소 산하</span>
              <h2 className={`font-bold ${largeText ? 'text-xl' : 'text-lg'}`}>
                아산시 동부건강생활지원센터 이용 안내
              </h2>
              <p className="text-slate-400 text-xs">배방읍·장재리 거점 소생활권 중심 주민 밀착형 건강증진기관</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-5">
          {/* Operating hours & Lunch break */}
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm mb-2">
              <Clock className="w-4 h-4 text-emerald-700" />
              <span>운영 시간 및 민원 상담 시간</span>
            </div>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
              <li>• <strong>평일(월~금)</strong>: 09:00 ~ 18:00 (측정 및 접수 마감 17:30)</li>
              <li>• <strong>점심시간</strong>: 12:00 ~ 13:00 (체성분 측정실 및 전화 상담 일시 중단)</li>
              <li>• <strong>휴무일</strong>: 매주 토요일, 일요일 및 법정 공휴일 휴무</li>
            </ul>
          </div>

          {/* Key difference: Health Center vs Community Health Living Center */}
          <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-4">
            <div className="flex items-center gap-2 text-blue-950 font-bold text-sm mb-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-700" />
              <span>온천동 보건소 본소와의 차이점 안내 (방문 전 필수 확인)</span>
            </div>
            <p className="text-xs sm:text-sm text-blue-900 leading-relaxed">
              아산시 동부건강생활지원센터(배방읍 장재리)는 <strong>일반 진료, 의사 약 처방전 발행, 보건증(건강진단결과서) 발급 업무를 하지 않습니다.</strong><br />
              (※ 보건증 발급이나 진료는 <strong>온천동 아산시 보건소 본소(041-537-3400)</strong>를 이용하셔야 합니다.)<br />
              대신 동부센터는 주민들의 <strong>체성분(인바디) 무료 검사, 건강 첫걸음 12주 순환운동, 고혈압·당뇨 집중교실, 스마트 혈당계 지원, 어린이 건강체험관 운영, 건강 운동프로그램 및 동아리 운영</strong> 등 주민 일상 속 건강증진에 특화된 공공기관입니다.
            </p>
          </div>

          {/* Department Phone Directory */}
          <div>
            <h3 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-emerald-700" />
              <span>아산시 동부건강생활지원센터 직통 전화번호 (클릭 시 바로 연결)</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                { name: '민원안내 및 총괄', dept: '동부지원센터팀', phone: '041-536-8723' },
                { name: '체성분 검사 & 순환운동', dept: '운동상담실 (1층)', phone: '041-536-8724' },
                { name: '혈압·혈당 & 만성질환관리', dept: '만성질환상담실 (1층)', phone: '041-536-8725' },
                { name: '식단상담 & 저당조리실습', dept: '영양조리실습실 (2층)', phone: '041-536-8726' },
                { name: '온천동 아산시 보건소 본소', dept: '진료/보건증/예방접종', phone: '041-537-3400' },
              ].map((item, i) => (
                <a
                  key={i}
                  href={`tel:${item.phone.replace(/[^0-9]/g, '')}`}
                  className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 transition-all text-xs"
                >
                  <div>
                    <p className="font-bold text-slate-800">{item.name}</p>
                    <p className="text-slate-500">{item.dept}</p>
                  </div>
                  <span className="font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-1 rounded-md">
                    {item.phone}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Location & Parking */}
          <div className="border border-slate-200 rounded-2xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <MapPin className="w-4 h-4 text-emerald-700" />
              <span>오시는 길 및 주차</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700">
              • <strong>주소</strong>: 충청남도 아산시 배방읍 용연동길 50 (장재리 1202, 아산시 동부건강생활지원센터)
            </p>
            <p className="text-xs sm:text-sm text-slate-700">
              • <strong>대중교통</strong>: KTX/SRT 천안아산역 및 수도권 1호선 아산역 인근 (차량 5분 거리) / 시내버스 990번, 777번 배방 용연마을 1·2단지 정류장 하차 후 도보 3분
            </p>
            <p className="text-xs sm:text-sm text-slate-700 flex items-center gap-1">
              <Car className="w-3.5 h-3.5 text-slate-500" />
              <span><strong>주차 안내</strong>: 센터 지상 및 지하 민원인 주차장 (방문 주민 <strong>전액 무료 주차</strong> 지원)</span>
            </p>
          </div>

          {/* Checklist */}
          <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
            <FileCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-950">
              <p className="font-bold">방문 전 필수 준비물</p>
              <p className="mt-0.5 leading-relaxed">
                아산시민 무료 혜택 확인을 위해 <strong>신분증(주민등록증, 운전면허증, 모바일신분증 중 1종)</strong>을 꼭 지참해 주세요. 체성분 및 혈당 검사는 검사 2시간 전 공복 상태를 권장합니다.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
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
