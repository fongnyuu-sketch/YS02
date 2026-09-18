import React, { useState } from 'react';
import { X, Calendar, CheckCircle2, AlertTriangle, User, Phone, MapPin } from 'lucide-react';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  largeText: boolean;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose, largeText }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceType, setServiceType] = useState<'체성분(InBody) 측정 & 결과상담' | '혈압·혈당·중성지방 기초측정' | '건강 첫걸음 맞춤 운동상담'>('체성분(InBody) 측정 & 결과상담');
  const [date, setDate] = useState('2026-09-22');
  const [time, setTime] = useState('10:00');
  const [confirmed, setConfirmed] = useState(false);
  const [resNum, setResNum] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      alert('성함과 연락처를 입력해 주세요.');
      return;
    }
    const generated = `ASAN-${Math.floor(100000 + Math.random() * 900000)}`;
    setResNum(generated);
    setConfirmed(true);
  };

  const handleReset = () => {
    setConfirmed(false);
    setName('');
    setPhone('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-emerald-100 overflow-hidden animate-fadeIn">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-700/80 rounded-xl">
              <Calendar className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-amber-300">아산시 동부건강생활지원센터</span>
              <h2 className={`font-bold ${largeText ? 'text-xl' : 'text-lg'}`}>
                체성분 및 건강측정 간편 예약
              </h2>
              <p className="text-emerald-200 text-xs">수강/측정료 전액 무료 · 전문 운동처방사 1:1 상담</p>
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

        {confirmed ? (
          <div className="p-6 text-center">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className={`font-bold text-slate-900 ${largeText ? 'text-2xl' : 'text-xl'}`}>
              예약이 정상 접수되었습니다!
            </h3>
            <p className="text-slate-600 mt-2 text-sm">
              접수번호: <span className="font-mono font-bold text-emerald-700">{resNum}</span>
            </p>

            <div className="mt-5 p-4 bg-emerald-50 rounded-2xl text-left border border-emerald-200 text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">예약 항목:</span>
                <span className="font-semibold text-slate-800">{serviceType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">예약 일시:</span>
                <span className="font-semibold text-slate-800">{date} {time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">예약자:</span>
                <span className="font-semibold text-slate-800">{name} 님 ({phone})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">방문 장소:</span>
                <span className="font-semibold text-slate-800">아산시 배방읍 용연동길 50 (동부센터 1층 체성분측정실)</span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-left text-xs text-amber-900 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>방문 시 유의사항:</strong> 정확한 체성분 측정을 위해 방문 2시간 전 공복 및 금수를 권장하며, 본인 확인용 <strong>신분증</strong>을 지참해 주세요.
              </span>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="mt-6 w-full py-3 bg-emerald-700 text-white rounded-xl font-bold hover:bg-emerald-800 transition-colors"
            >
              확인 완료
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5">
                검사 및 상담 항목 선택 (무료)
              </label>
              <div className="grid grid-cols-1 gap-2">
                {[
                  '체성분(InBody) 측정 & 결과상담',
                  '혈압·혈당·중성지방 기초측정',
                  '건강 첫걸음 맞춤 운동상담',
                ].map((item) => (
                  <label
                    key={item}
                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                      serviceType === item
                        ? 'border-emerald-600 bg-emerald-50/80 font-bold text-emerald-950 ring-1 ring-emerald-500'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="serviceType"
                      checked={serviceType === item}
                      onChange={() => setServiceType(item as any)}
                      className="accent-emerald-600 w-4 h-4"
                    />
                    <span className={largeText ? 'text-base' : 'text-sm'}>{item}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  예약 희망일
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min="2026-09-18"
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  희망 시간 (평일)
                </label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="09:30">오전 09:30</option>
                  <option value="10:00">오전 10:00</option>
                  <option value="10:30">오전 10:30</option>
                  <option value="11:00">오전 11:00</option>
                  <option value="14:00">오후 14:00</option>
                  <option value="15:00">오후 15:00</option>
                  <option value="16:00">오후 16:00</option>
                  <option value="17:00">오후 17:00</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                성함 (주민 본인)
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="예: 홍길동"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                연락처 (예약 확인 문자 수신)
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="예: 010-1234-5678"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 space-y-1">
              <div className="flex items-center gap-1 font-bold">
                <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                <span>장소: 충남 아산시 배방읍 용연동길 50 (동부센터 1층)</span>
              </div>
              <p>* 주민등록번호는 요구하지 않으며, 검사 당일 본인 확인 신분증만 지참하시면 됩니다.</p>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 border border-slate-300 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-colors"
              >
                취소
              </button>
              <button
                type="submit"
                className="flex-1 py-3 bg-emerald-700 text-white rounded-xl font-bold hover:bg-emerald-800 transition-colors shadow-sm"
              >
                예약 신청하기
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
