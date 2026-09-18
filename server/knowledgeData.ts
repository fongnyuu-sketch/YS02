import { FaqKnowledgeItem, ProgramItem, CivilComplaintLog, RecommendationItem } from '../src/types.ts';

export const INITIAL_KNOWLEDGE_BASE: FaqKnowledgeItem[] = [
  {
    id: 'kb-1',
    category: '검사/측정',
    question: '아산시 동부건강생활지원센터 체성분(인바디) 검사는 어떻게 예약하나요?',
    answer: '아산시 동부건강생활지원센터(배방읍 장재리 소재) 체성분(InBody) 검사는 아산시민 누구나 **무료**로 이용하실 수 있습니다.\n\n- **소요 시간**: 약 15~20분 (체성분 분석 + 운동처방사 1:1 결과 상담)\n- **예약 방법**: 온라인 간편 예약 또는 운동상담실(☎ 041-536-8724) 전화 예약 우선제입니다. (당일 방문 시 대기시간이 발생할 수 있습니다)\n- **측정 전 유의사항**: 정확한 측정을 위해 검사 2시간 전 공복 및 과도한 수분 섭취를 피해 주세요.\n- **준비물**: 아산시민 본인 확인을 위한 신분증 지참 필수',
    keywords: ['체성분', '인바디', 'inbody', '골격근', '체지방', '측정', '예약', '비용', '무료', '배방', '장재리'],
    department: '운동처방실 (체성분측정실)',
    phone: '041-536-8724',
    actionType: 'reserve',
    actionLabel: '체성분 검사 간편 예약',
    actionPayload: 'inbody_reserve',
    updatedAt: '2026-09-18',
  },
  {
    id: 'kb-2',
    category: '만성질환',
    question: '혈압, 혈당, 콜레스테롤 무료 측정 및 당뇨 상담이 가능한가요?',
    answer: '네, 상시 **만성질환 원스톱 기초건강측정 서비스(전액 무료)**를 운영하고 있습니다.\n\n- **검사 항목**: 혈압, 공복혈당, 총콜레스테롤, 중성지방, HDL/LDL 콜레스테롤\n- **측정 시간**: 평일 09:00 ~ 11:30 (오전 측정 권장, 8시간 이상 금식 필수)\n- **결과 상담**: 손끝 채혈 후 5~10분 내 즉시 측정 결과 확인 및 전담 간호사 1:1 맞춤 상담\n- **대상**: 만 19세 이상 아산시민 (배방읍·탕정면 등 동부권 주민 우선)\n- **문의**: 만성질환상담실 (☎ 041-536-8725)',
    keywords: ['혈압', '혈당', '당뇨', '콜레스테롤', '고혈압', '고지혈증', '당뇨수치', '기초검사', '피검사'],
    department: '만성질환상담실',
    phone: '041-536-8725',
    actionType: 'call',
    actionLabel: '만성질환실 전화 문의',
    actionPayload: '041-536-8725',
    updatedAt: '2026-09-18',
  },
  {
    id: 'kb-3',
    category: '일반/운영',
    question: '아산시 동부건강생활지원센터 위치와 운영 시간, 주차 안내는?',
    answer: '아산시 동부건강생활지원센터(구 배방건강생활지원센터) 이용 안내입니다.\n\n- **위치**: 충청남도 아산시 배방읍 용연동길 50 (장재리 1202, KTX 천안아산역 및 용연마을/연화마을 인근)\n- **운영 시간**: 평일(월~금) 09:00 ~ 18:00 (민원 및 검사 접수는 17:30 마감)\n- **점심시간**: 12:00 ~ 13:00 (점심시간에는 측정 및 상담 업무가 일시 중단됩니다)\n- **휴무일**: 토요일, 일요일 및 법정 공휴일 휴무\n- **주차 안내**: 센터 전용 지상/지하 주차장 무료 이용 가능\n- **공식 밴드**: 네이버 밴드 "동부건강생활지원센터"(band.us/@baebang)',
    keywords: ['위치', '주소', '운영시간', '몇시까지', '점심시간', '주말', '토요일', '주차', '용연동길', '장재리', '배방'],
    department: '동부지원센터팀 (민원총괄)',
    phone: '041-536-8723',
    actionType: 'navigate',
    actionLabel: '센터 위치 및 오시는 길',
    actionPayload: 'location_guide',
    updatedAt: '2026-09-18',
  },
  {
    id: 'kb-4',
    category: '운동/재활',
    question: '‘건강 첫걸음’ 순환운동 프로그램은 어떻게 신청하나요?',
    answer: '아산시 동부건강생활지원센터의 대표 신체활동 프로그램인 **[건강 첫걸음 프로그램]**입니다.\n\n- **대상**: 센터 첫 방문 시민 또는 6개월 이상 신체활동 프로그램 미참여자\n- **내용**: 12주간 주 2회 전문 운동처방사와 함께하는 유압식 순환운동, 맞춤형 운동기구 사용법 및 스트레칭 교육\n- **사전/사후 평가**: 혈압, 혈당, 콜레스테롤, 악력 및 체성분 측정을 통한 건강 개선도 분석\n- **수강료**: **전액 무료**\n- **신청 방법**: 센터 1층 안내데스크 방문 또는 전화(☎ 041-536-8724) 접수',
    keywords: ['건강 첫걸음', '순환운동', '운동기구', '운동', '체력', '신체활동', '무료운동', '헬스'],
    department: '운동처방실',
    phone: '041-536-8724',
    actionType: 'program',
    actionLabel: '건강 첫걸음 프로그램 신청',
    actionPayload: 'prog-1',
    updatedAt: '2026-09-18',
  },
  {
    id: 'kb-5',
    category: '만성질환',
    question: '당뇨·고혈압 집중관리 프로그램과 혈당계 무료 대여가 되나요?',
    answer: '네! **[고혈압·당뇨 집중 건강교실]**을 정기적으로 운영하며, 의료기기 무료 대여를 지원합니다.\n\n- **교육 내용**: 간호사의 투약/혈관 관리 + 영양사의 저염·저당 밥상 실습 + 운동처방사의 실내 근력운동 (4주 과정)\n- **무료 대여**: 참여 어르신 대상 블루투스 스마트 혈압계 및 혈당계 4주 무료 대여 및 소모품(검사지, 란셋) 무상 지원\n- **신청 자격**: 고혈압·당뇨 진단자 또는 전단계 판정을 받은 아산시민\n- **문의**: 만성질환상담실 (☎ 041-536-8725)',
    keywords: ['당뇨', '고혈압', '혈당계대여', '혈압계대여', '만성질환', '당뇨교실', '혈압관리'],
    department: '만성질환상담실',
    phone: '041-536-8725',
    actionType: 'reserve',
    actionLabel: '당뇨·고혈압 교실 수강 신청',
    actionPayload: 'program_chronic',
    updatedAt: '2026-09-18',
  },
  {
    id: 'kb-6',
    category: '운동/재활',
    question: '갱년기 극복 힐링 건강교실은 무엇인가요?',
    answer: '중장년층 및 갱년기 주민을 위한 동부건강생활지원센터의 특화 프로그램입니다.\n\n- **프로그램 내용**: 갱년기 한의학 건강강좌, 천연 아로마테라피, 약선차 만들기, 힐링 미술 및 심리여행, 갱년기 완화 요가·체조\n- **일정**: 분기별 주 1~2회 운영\n- **수강료**: 전액 무료 (재료비 일체 지원)\n- **신청 문의**: 동부건강생활지원센터팀 (☎ 041-537-3594)',
    keywords: ['갱년기', '약선차', '아로마', '한의학', '요가', '힐링', '중장년', '여성건강'],
    department: '동부건강생활지원센터팀',
    phone: '041-537-3594',
    actionType: 'program',
    actionLabel: '갱년기 교실 안내 보기',
    actionPayload: 'prog-3',
    updatedAt: '2026-09-18',
  },
  {
    id: 'kb-7',
    category: '일반/운영',
    question: '아산시 보건소 본청과 동부건강생활지원센터의 차이점은?',
    answer: '아산시민 여러분께서 자주 묻는 질문입니다!\n\n1. **아산시 보건소(온천동 본소)**: 일반 외래진료, 의사 처방전 발행, 보건증(건강진단결과서) 발급, 국가 암검진, 결핵 검진, 법정 감염병 관리 총괄 행정을 수행합니다.\n2. **아산시 동부건강생활지원센터(배방읍)**: 치료나 약 처방전 발행, 보건증 발급은 하지 않는 대신, 배방·탕정 등 동부 생활권 주민 곁에서 **체성분 검사, 혈압·혈당 관리, 순환운동, 영양조리실습, 걷기동아리 등 일상 속 건강증진**에 특화된 소생활권 밀착 기관입니다.\n\n※ 보건증 발급이나 진료는 온천동 아산시 보건소 본소(☎ 041-537-3400)를 이용해 주세요.',
    keywords: ['보건소 차이', '보건증', '진료', '처방전', '온천동', '배방건강생활지원센터'],
    department: '동부지원센터팀',
    phone: '041-536-8723',
    actionType: 'call',
    actionLabel: '아산시보건소 본소 전화',
    actionPayload: '041-537-3400',
    updatedAt: '2026-09-18',
  },
  {
    id: 'kb-8',
    category: '영양/조리',
    question: '영양 조리실습 프로그램과 어린이 건강체험관 견학은 어떻게 하나요?',
    answer: '센터 2층 영양조리실습실 및 어린이 건강체험관 안내입니다.\n\n- **저염·저당 건강밥상 조리실습**: 전문 임상영양사와 함께 저염 소스 만들기, 당뇨 맞춤 지중해식 조리 실습 진행 (재료비 무료 지원)\n- **어린이 건강체험관**: 관내 어린이집 및 유치원 유아를 대상으로 영양, 흡연/음주 예방, 올바른 손씻기, 치아 건강 등 놀이형 체험 교육 (사전 단체예약 필수)\n- **예약 및 문의**: ☎ 041-537-3595',
    keywords: ['어린이', '건강체험관', '조리실습', '요리교실', '저염식', '영양', '어린이집'],
    department: '영양조리실 및 건강체험관',
    phone: '041-537-3595',
    actionType: 'reserve',
    actionLabel: '체험관 및 영양실습 문의',
    actionPayload: '041-537-3595',
    updatedAt: '2026-09-18',
  },
  {
    id: 'kb-9',
    category: '만성질환',
    question: 'AI-IoT 기반 어르신 건강관리 사업은 무엇인가요?',
    answer: '만 65세 이상 아산시 어르신을 대상으로 스마트 기기를 활용한 비대면 맞춤 건강관리 사업입니다.\n\n- **지원 내용**: 스마트폰 앱(오늘건강)과 연동되는 블루투스 활동량계(스마트워치), 체중계, 혈압계, 혈당계 무상 대여\n- **전문가 코칭**: 간호사, 운동처방사, 영양사가 6개월간 매일 건강 미션을 부여하고 정기적 전화/방문 상담\n- **신청 자격**: 만 65세 이상 아산시민 (스마트폰 소지자)\n- **문의**: ☎ 041-537-3596',
    keywords: ['AI-IoT', '어르신', '스마트워치', '오늘건강', '블루투스', '스마트케어', '65세'],
    department: '스마트건강관리팀',
    phone: '041-537-3596',
    actionType: 'call',
    actionLabel: 'AI-IoT 어르신 사업 문의',
    actionPayload: '041-537-3596',
    updatedAt: '2026-09-18',
  }
];

export const INITIAL_PROGRAMS: ProgramItem[] = [
  {
    id: 'prog-1',
    title: '‘건강 첫걸음’ 12주 유압식 순환운동 교실',
    category: '운동/재활',
    target: '아산시민 (센터 첫 방문자 또는 6개월 이상 신체활동 미참여자)',
    schedule: '매주 화·목 10:00 ~ 11:30 (12주 과정)',
    location: '아산시 동부건강생활지원센터 2층 건강운동실',
    capacity: 20,
    enrolled: 16,
    fee: '전액 무료',
    status: '모집중',
    instructor: '김태훈 전문운동처방사',
    description: '어르신 및 초보자도 관절 무리 없이 안전하게 기초 근력을 기를 수 있는 12주 순환운동 및 악력/체성분 전후 비교 코칭입니다.',
    requirements: ['신분증 지참', '실내 운동화', '개인 물병']
  },
  {
    id: 'prog-2',
    title: '혈관 튼튼! 고혈압·당뇨 4주 집중케어 교실',
    category: '만성질환',
    target: '고혈압·당뇨 진단자 및 혈관질환 고위험 주민 15명',
    schedule: '매주 월·수 14:00 ~ 15:30 (4주 완성)',
    location: '센터 1층 만성질환 보건교육실',
    capacity: 15,
    enrolled: 12,
    fee: '전액 무료 (스마트 혈당계·혈압계 대여 포함)',
    status: '모집중',
    instructor: '박은정 전담간호사 & 임상영양사',
    description: '혈압·혈당 일지 작성법, 저염 식이요법, 당뇨발 예방, 가정용 블루투스 의료기기 무상 대여를 결합한 통합 케어 강좌입니다.',
    requirements: ['신분증 지참', '복용 중인 약 처방전 지참']
  },
  {
    id: 'prog-3',
    title: '중장년 갱년기 극복 힐링 건강교실',
    category: '운동/재활',
    target: '갱년기 증상으로 활력이 필요한 40~60대 아산시민 15명',
    schedule: '매주 금 10:00 ~ 12:00',
    location: '센터 3층 다목적실',
    capacity: 15,
    enrolled: 14,
    fee: '전액 무료 (약선차·아로마 재료 지원)',
    status: '마감임박',
    instructor: '이정희 한의학 외래강사 & 요가지도자',
    description: '체질별 약선차 시음, 아로마 향기요법, 관절 이완 요가와 명상을 통해 갱년기 불면과 관절통, 우울감을 완화합니다.',
    requirements: ['편안한 복장', '개인 컵']
  },
  {
    id: 'prog-4',
    title: '나트륨·당 쏙 뺀 건강밥상 영양조리실습',
    category: '영양/조리',
    target: '고혈압·당뇨 식단 관리가 필요한 주민 및 독거 가구 12명',
    schedule: '매주 수 10:00 ~ 12:00',
    location: '센터 2층 영양조리실습실',
    capacity: 12,
    enrolled: 12,
    fee: '전액 무료 (식재료 제공)',
    status: '대기접수',
    instructor: '정지혜 수석임상영양사',
    description: '천연 조미료 레시피, 저염 국물 끓이기, 당뇨 환자도 맛있게 즐기는 솥밥 및 저당 샐러드 조리 실습입니다.',
    requirements: ['앞치마', '음식 포장용 반찬통', '신분증']
  },
  {
    id: 'prog-5',
    title: '배방 주민 힐링 걷기동아리 & 건강마을 가꾸기',
    category: '주민동아리',
    target: '배방읍·장재리 등 아산시민 누구나',
    schedule: '매주 화 09:30 ~ 11:00',
    location: '센터 야외광장 집결 후 용연천 둘레길',
    capacity: 35,
    enrolled: 28,
    fee: '전액 무료',
    status: '모집중',
    instructor: '배방 건강지도자 주민회',
    description: '바른 보행 자세 교정과 용연천 둘레길 주간 걷기, 주민 주도 텃밭 가꾸기 및 환경 정화 활동입니다.',
    requirements: ['운동화', '모자', '생수']
  },
  {
    id: 'prog-6',
    title: 'AI-IoT 기반 어르신 맞춤형 스마트 건강관리',
    category: '만성질환',
    target: '만 65세 이상 아산시 어르신 (스마트폰 소지자)',
    schedule: '상시 모집 (6개월 단위 집중 관리)',
    location: '가정 내 비대면 스마트폰 케어 + 센터 정기 방문',
    capacity: 50,
    enrolled: 43,
    fee: '전액 무료 (스마트워치·혈압계 무상 대여)',
    status: '모집중',
    instructor: '보건소 전담 간호사 & 영양사 팀',
    description: '보건복지부-아산시 연계 사업으로 활동량계와 혈압계를 스마트폰에 연동하여 1:1 비대면 건강 미션과 전문 코칭을 제공합니다.',
    requirements: ['만 65세 이상 신분증', '본인 명의 스마트폰 지참']
  }
];

export const INITIAL_COMPLAINT_LOGS: CivilComplaintLog[] = [
  {
    id: 'log-1',
    timestamp: '2026-09-18 09:15',
    question: '배방읍 장재리에 있는 동부건강생활지원센터에서 인바디 검사 주말에도 하나요?',
    answer: '아산시 동부건강생활지원센터는 평일(월~금) 09:00~18:00 운영하며, 주말(토·일) 및 공휴일은 휴무입니다. 평일 방문 시 1층 체성분측정실에서 무료 측정이 가능합니다.',
    category: '검사/측정',
    isVoice: true,
    status: 'resolved',
    feedback: 'helpful'
  },
  {
    id: 'log-2',
    timestamp: '2026-09-17 15:20',
    question: '어머니 당뇨 수치가 높은데 배방 센터에서 혈당계 무료로 빌려주나요?',
    answer: '네, 아산시 동부건강생활지원센터 [고혈압·당뇨 집중 건강교실] 참여 주민께는 4주간 스마트 혈당계와 혈당 검사지를 무상으로 대여해 드립니다.',
    category: '만성질환',
    isVoice: true,
    status: 'resolved',
    feedback: 'helpful'
  },
  {
    id: 'log-3',
    timestamp: '2026-09-17 11:30',
    question: '온천동 보건소까지 안 가고 배방에서 보건증 발급받을 수 있나요?',
    answer: '죄송합니다. 건강생활지원센터는 예방 및 건강증진 특화 기관으로 보건증(건강진단결과서) 발급 업무는 하지 않습니다. 온천동 아산시 보건소 본소 민원실(041-537-3400)을 방문해 주시기 바랍니다.',
    category: '일반/운영',
    isVoice: false,
    status: 'resolved',
    feedback: 'helpful'
  }
];

export function maskSensitiveResidentData(text: string): { sanitized: string; wasMasked: boolean } {
  const rrnPattern = /\b(\d{6})[-–—\s]?([1-8]\d{6})\b/g;
  const raw13DigitPattern = /\b\d{13}\b/g;

  let wasMasked = false;
  let sanitized = text;

  if (rrnPattern.test(sanitized)) {
    wasMasked = true;
    sanitized = sanitized.replace(rrnPattern, '******-******* [개인정보 자동 마스킹]');
  }

  if (raw13DigitPattern.test(sanitized)) {
    wasMasked = true;
    sanitized = sanitized.replace(raw13DigitPattern, '************* [개인정보 자동 마스킹]');
  }

  return { sanitized, wasMasked };
}

/**
 * AI Personalized Recommendation Engine
 * Analyzes user's query history (e.g., diabetes, hypertension, inbody, menopause, walking)
 * and generates complementary, synergistic health offerings available at 아산시 동부건강생활지원센터.
 */
export function generatePersonalizedRecommendations(
  userQueries: string[],
  currentQuery?: string
): RecommendationItem[] {
  const allText = [...userQueries, currentQuery || ''].join(' ').toLowerCase();
  const recommendations: RecommendationItem[] = [];

  // Case 1: Diabetes / Blood Sugar queries
  if (
    allText.includes('당뇨') ||
    allText.includes('혈당') ||
    allText.includes('인슐린') ||
    allText.includes('당 수치') ||
    allText.includes('당화혈색소')
  ) {
    recommendations.push({
      id: 'rec-diabetes-1',
      programId: 'prog-2',
      programTitle: '혈관 튼튼! 고혈압·당뇨 4주 집중케어 교실',
      category: '만성질환',
      reason: '당뇨 및 혈당 관리에 관한 문의를 주셨습니다. 4주간 전담 간호사와 임상영양사가 혈당 조절법을 1:1로 코칭합니다.',
      complementaryTip: '참여 시 가정에서 직접 수치를 기록할 수 있는 스마트 혈당계와 소모품을 4주간 무료로 대여해 드립니다.',
      matchScore: 98,
      badge: '당뇨·혈당 맞춤 추천',
      schedule: '매주 월·수 14:00 (무료)',
      fee: '전액 무료',
    });

    recommendations.push({
      id: 'rec-diabetes-2',
      programId: 'prog-4',
      programTitle: '나트륨·당 쏙 뺀 건강밥상 영양조리실습',
      category: '영양/조리',
      reason: '당뇨 관리는 식단이 핵심입니다. 혈당 스파이크를 억제하는 저당·저염 지중해식 조리법을 2층 실습실에서 직접 배웁니다.',
      complementaryTip: '당뇨 집중교실과 식단 조리실습을 병행하시면 당화혈색소 개선에 최고의 시너지 효과를 보실 수 있습니다.',
      matchScore: 94,
      badge: '식단 연계 추천',
      schedule: '매주 수 10:00 (무료)',
      fee: '식재료 전액 지원',
    });

    recommendations.push({
      id: 'rec-diabetes-3',
      programId: 'prog-6',
      programTitle: 'AI-IoT 기반 어르신 맞춤형 스마트 건강관리',
      category: '만성질환',
      reason: '만 65세 이상이시라면 스마트 혈당계와 스마트워치를 무상 지원받아 매일 비대면 모니터링을 받을 수 있습니다.',
      complementaryTip: '스마트폰 앱을 통해 아산시 보건소 전담팀이 실시간 혈당 수치 피드백을 드립니다.',
      matchScore: 89,
      badge: '어르신 스마트 케어',
      schedule: '상시 접수 (6개월 케어)',
      fee: '전액 무료',
    });
  }

  // Case 2: Hypertension / Blood pressure / Cholesterol
  else if (
    allText.includes('혈압') ||
    allText.includes('고혈압') ||
    allText.includes('콜레스테롤') ||
    allText.includes('지질') ||
    allText.includes('혈관')
  ) {
    recommendations.push({
      id: 'rec-htn-1',
      programId: 'prog-2',
      programTitle: '혈관 튼튼! 고혈압·당뇨 4주 집중케어 교실',
      category: '만성질환',
      reason: '혈압 및 혈관 건강 문의를 주셨습니다. 간호사의 올바른 가정 혈압 측정법 및 투약 관리가 진행됩니다.',
      complementaryTip: '블루투스 혈압계가 무료 대여되어 매일 아침/저녁 혈압 변화를 전담 간호사가 함께 점검합니다.',
      matchScore: 97,
      badge: '혈압·혈관 맞춤 추천',
      schedule: '매주 월·수 14:00',
      fee: '전액 무료',
    });

    recommendations.push({
      id: 'rec-htn-2',
      programId: 'prog-1',
      programTitle: '‘건강 첫걸음’ 12주 유압식 순환운동 교실',
      category: '운동/재활',
      reason: '혈압 조절에는 가벼운 전신 순환운동이 필수입니다. 유압식 기구로 혈압 급상승 없이 안전하게 운동할 수 있습니다.',
      complementaryTip: '12주간 주 2회 운동처방사와 함께하며 혈관 탄력도를 높입니다.',
      matchScore: 93,
      badge: '유산소·운동 시너지',
      schedule: '매주 화·목 10:00',
      fee: '전액 무료',
    });
  }

  // Case 3: InBody / Muscle / Weight / Exercise
  else if (
    allText.includes('체성분') ||
    allText.includes('인바디') ||
    allText.includes('근육') ||
    allText.includes('골격근') ||
    allText.includes('체지방') ||
    allText.includes('체중') ||
    allText.includes('비만') ||
    allText.includes('운동') ||
    allText.includes('체력')
  ) {
    recommendations.push({
      id: 'rec-inbody-1',
      programId: 'prog-1',
      programTitle: '‘건강 첫걸음’ 12주 유압식 순환운동 교실',
      category: '운동/재활',
      reason: '체성분 분석 후 나에게 맞는 운동을 찾고 계시다면 배방 센터 대표 12주 순환운동을 강력 추천합니다.',
      complementaryTip: '12주 전후로 인바디 및 골격근량, 악력 변화를 정밀 비교 리포트로 제공합니다.',
      matchScore: 96,
      badge: '체성분 개선 1순위',
      schedule: '매주 화·목 10:00',
      fee: '전액 무료',
    });

    recommendations.push({
      id: 'rec-inbody-2',
      programId: 'prog-5',
      programTitle: '배방 주민 힐링 걷기동아리 & 건강마을 가꾸기',
      category: '주민동아리',
      reason: '체지방 감량 및 심폐지구력 증진을 위해 이웃 주민들과 매주 용연천 둘레길을 함께 걷는 유산소 동호회입니다.',
      complementaryTip: '바른 보행 자세 교정 및 보수계 대여를 함께 제공합니다.',
      matchScore: 90,
      badge: '걷기 유산소 추천',
      schedule: '매주 화 09:30',
      fee: '전액 무료',
    });
  }

  // Case 4: Menopause / Women / Joint / Wellness
  else if (
    allText.includes('갱년기') ||
    allText.includes('우울') ||
    allText.includes('불면') ||
    allText.includes('약선차') ||
    allText.includes('요가') ||
    allText.includes('관절')
  ) {
    recommendations.push({
      id: 'rec-meno-1',
      programId: 'prog-3',
      programTitle: '중장년 갱년기 극복 힐링 건강교실',
      category: '운동/재활',
      reason: '갱년기 증상, 수면 장애, 활력 저하에 도움을 주는 한의학 강좌, 약선차 실습, 아로마 이완 요가 과정입니다.',
      complementaryTip: '참여자 전원에게 갱년기 완화에 좋은 천연 아로마 롤온 및 약선차 세트를 지원합니다.',
      matchScore: 98,
      badge: '갱년기 힐링 맞춤',
      schedule: '매주 금 10:00',
      fee: '전액 무료 (재료비 지원)',
    });
  }

  // Fallback default recommendations
  if (recommendations.length === 0) {
    recommendations.push({
      id: 'rec-default-1',
      programId: 'prog-1',
      programTitle: '‘건강 첫걸음’ 12주 유압식 순환운동 교실',
      category: '운동/재활',
      reason: '아산시 동부건강생활지원센터에 처음 오셨다면 누구나 부담 없이 시작할 수 있는 맞춤 기초 순환운동 강좌입니다.',
      complementaryTip: '체성분 검사와 함께 신청하시면 전문 운동처방사가 체력 수준에 맞춰 1:1로 지도해 드립니다.',
      matchScore: 95,
      badge: '센터 첫 방문 추천',
      schedule: '매주 화·목 10:00 (12주)',
      fee: '전액 무료',
    });

    recommendations.push({
      id: 'rec-default-2',
      programId: 'prog-2',
      programTitle: '혈관 튼튼! 고혈압·당뇨 4주 집중케어 교실',
      category: '만성질환',
      reason: '동부센터의 핵심 사업으로, 혈압·혈당 무료 측정 후 전담 간호사 및 영양사의 체계적인 관리를 받으실 수 있습니다.',
      complementaryTip: '스마트 혈당계 및 혈압계 4주 무료 대여 혜택이 포함되어 있습니다.',
      matchScore: 88,
      badge: '만성질환 예방 추천',
      schedule: '매주 월·수 14:00',
      fee: '전액 무료',
    });
  }

  return recommendations;
}
