import React, { useState, useEffect } from 'react';
import { X, BookOpen, Users, MapPin, CheckCircle2, Clock, Calendar, Sparkles, Filter, ShieldCheck } from 'lucide-react';
import { ProgramItem } from '../types.ts';

interface ProgramsModalProps {
  isOpen: boolean;
  onClose: () => void;
  largeText: boolean;
  initialSelectedProgramId?: string | null;
}

export const ProgramsModal: React.FC<ProgramsModalProps> = ({
  isOpen,
  onClose,
  largeText,
  initialSelectedProgramId,
}) => {
  const [programs, setPrograms] = useState<ProgramItem[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>('전체');
  const [selectedProgram, setSelectedProgram] = useState<ProgramItem | null>(null);
  const [applicantName, setApplicantName] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [enrolledSuccess, setEnrolledSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetch('/api/programs')
        .then((res) => res.json())
        .then((data) => {
          if (data.programs) {
            setPrograms(data.programs);
            if (initialSelectedProgramId) {
              const matched = data.programs.find((p: ProgramItem) => p.id === initialSelectedProgramId);
              if (matched) {
                setSelectedProgram(matched);
              }
            }
          }
        })
        .catch((err) => console.error('Error fetching programs:', err));
    } else {
      setSelectedProgram(null);
      setEnrolledSuccess(false);
      setApplicantName('');
      setApplicantPhone('');
    }
  }, [isOpen, initialSelectedProgramId]);

  if (!isOpen) return null;

  const filtered = categoryFilter === '전체'
    ? programs
    : programs.filter((p) => p.category === categoryFilter);

  const handleEnrollSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProgram || !applicantName.trim() || !applicantPhone.trim()) return;

    try {
      const res = await fetch('/api/programs/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          programId: selectedProgram.id,
          name: applicantName,
          phone: applicantPhone,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setEnrolledSuccess(true);
        setPrograms((prev) =>
          prev.map((p) => (p.id === selectedProgram.id ? data.program : p))
        );
      }
    } catch (e) {
      alert('신청 처리 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-teal-100 max-h-[90vh] flex flex-col overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-800 via-emerald-800 to-teal-900 text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-teal-700/80 rounded-xl">
              <BookOpen className="w-5 h-5 text-teal-200" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-amber-300">아산시 동부건강생활지원센터 (배방읍 장재리)</span>
              <h2 className={`font-bold ${largeText ? 'text-xl' : 'text-lg'}`}>
                주민 건강증진 개설 프로그램
              </h2>
              <p className="text-teal-200 text-xs">수강료 전액 무료 · 전문 운동처방사 & 간호사 & 영양사 지도</p>
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

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          {/* Enrollment Modal View if a program is selected */}
          {selectedProgram ? (
            <div className="space-y-4 animate-fadeIn">
              <button
                type="button"
                onClick={() => {
                  setSelectedProgram(null);
                  setEnrolledSuccess(false);
                }}
                className="text-xs text-teal-700 hover:text-teal-900 font-bold flex items-center gap-1"
              >
                ← 전체 프로그램 목록으로 돌아가기
              </button>

              <div className="border border-teal-200 bg-teal-50/50 rounded-2xl p-4 sm:p-5">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-teal-100 text-teal-900 border border-teal-200">
                    {selectedProgram.category}
                  </span>
                  <span className="text-xs font-bold text-teal-800">
                    수강료: {selectedProgram.fee} (무료)
                  </span>
                </div>
                <h3 className={`font-bold text-slate-900 mt-2 ${largeText ? 'text-xl' : 'text-lg'}`}>
                  {selectedProgram.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  {selectedProgram.description}
                </p>

                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 bg-white p-3 rounded-xl border border-teal-100">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-teal-600" />
                    <span><strong>일정:</strong> {selectedProgram.schedule}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-teal-600" />
                    <span><strong>장소:</strong> {selectedProgram.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-teal-600" />
                    <span><strong>대상:</strong> {selectedProgram.target}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span><strong>정원:</strong> {selectedProgram.enrolled} / {selectedProgram.capacity}명</span>
                  </div>
                </div>
              </div>

              {enrolledSuccess ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-2" />
                  <h4 className="font-bold text-slate-900 text-lg">신청이 정상 접수되었습니다!</h4>
                  <p className="text-slate-600 text-xs sm:text-sm mt-1">
                    신청하신 성함({applicantName})과 연락처로 개강 전 안내 문자가 발송됩니다.
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    장소: 아산시 배방읍 용연동길 50 동부건강생활지원센터
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedProgram(null);
                      setEnrolledSuccess(false);
                    }}
                    className="mt-4 px-5 py-2 bg-teal-700 text-white rounded-xl text-xs font-bold hover:bg-teal-800"
                  >
                    목록으로 돌아가기
                  </button>
                </div>
              ) : (
                <form onSubmit={handleEnrollSubmit} className="space-y-3 bg-white p-4 rounded-2xl border border-slate-200">
                  <h4 className="font-bold text-slate-800 text-sm">신청자 정보 입력</h4>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      신청자 성함
                    </label>
                    <input
                      type="text"
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      placeholder="예: 홍길동"
                      required
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      휴대전화 번호 (선정 및 일정 안내 문자 수신)
                    </label>
                    <input
                      type="tel"
                      value={applicantPhone}
                      onChange={(e) => setApplicantPhone(e.target.value)}
                      placeholder="예: 010-1234-5678"
                      required
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>

                  <div className="pt-2 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedProgram(null)}
                      className="flex-1 py-2.5 border border-slate-300 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50"
                    >
                      취소
                    </button>
                    <button
                      type="submit"
                      disabled={selectedProgram.status === '마감'}
                      className="flex-1 py-2.5 bg-teal-700 text-white rounded-xl text-xs font-bold hover:bg-teal-800 disabled:bg-slate-300"
                    >
                      {selectedProgram.status === '마감' ? '정원 마감됨' : '프로그램 수강 신청하기'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          ) : (
            <>
              {/* Category Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {['전체', '운동/재활', '만성질환', '영양/조리', '주민동아리'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategoryFilter(cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-colors ${
                      categoryFilter === cat
                        ? 'bg-teal-700 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Programs List */}
              <div className="grid grid-cols-1 gap-3.5">
                {filtered.map((prog) => (
                  <div
                    key={prog.id}
                    className="border border-slate-200 hover:border-teal-400 rounded-2xl p-4 sm:p-5 transition-all shadow-xs hover:shadow-md bg-white flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-teal-50 text-teal-800 border border-teal-200">
                          {prog.category}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                            prog.status === '모집중'
                              ? 'bg-emerald-100 text-emerald-800'
                              : prog.status === '마감임박'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {prog.status}
                        </span>
                      </div>

                      <h3 className={`font-bold text-slate-900 ${largeText ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'}`}>
                        {prog.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 mt-1.5 line-clamp-2">
                        {prog.description}
                      </p>

                      <div className="mt-3 flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-teal-600" />
                          {prog.schedule}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-teal-600" />
                          {prog.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-teal-600" />
                          {prog.target}
                        </span>
                        <span className="flex items-center gap-1 font-semibold text-teal-700">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          {prog.fee}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs text-slate-500 font-medium">
                        접수인원: <strong className="text-teal-800">{prog.enrolled}</strong> / {prog.capacity}명
                      </span>
                      <button
                        type="button"
                        onClick={() => setSelectedProgram(prog)}
                        disabled={prog.status === '마감'}
                        className="px-4 py-1.5 bg-teal-700 hover:bg-teal-800 disabled:bg-slate-300 text-white rounded-xl text-xs font-bold transition-colors"
                      >
                        {prog.status === '마감' ? '마감' : '신청하기'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <p className="text-xs text-slate-500">
            문의: 아산시 동부건강생활지원센터 ☎ 041-536-8723
          </p>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold hover:bg-slate-900 transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
