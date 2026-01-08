
import { Reminder, MedicalRecord, Hospital, UserProfile, DoctorTask, Appointment, QueuePatient, VitalSign, HealthArticle } from './types';

export const MOCK_USER: UserProfile = {
  name: "陈桂芳",
  age: 70,
  location: "上海市闵行区浦江镇",
  linkedFamilyMembers: ["李敏 (女儿 - 徐汇区)"],
  medicareBalance: "1,245.50",
  idCardLast4: "4521"
};

export const MOCK_FAMILY_USER: UserProfile = {
  name: "李敏",
  age: 42,
  location: "上海市徐汇区",
  linkedFamilyMembers: ["陈桂芳 (母亲)"],
  medicareBalance: "0.00",
  avatar: "LM"
};

// 扩展社区医生数据
export const MOCK_COMMUNITY_DOCTOR = {
  name: "李清泉",
  title: "全科主任医师",
  hospital: "浦江社区卫生服务中心",
  department: "全科门诊",
  id: "DOC_202488",
  rating: 4.9,
  stats: {
    totalPatients: 1240,
    referralRate: "92%",
    consultationTime: "8.5min",
    mdtJoined: 12
  },
  tags: ["上海市优秀全科医生", "糖尿病管理专家"]
};

// 扩展三甲专家数据
export const MOCK_SPECIALIST_DOCTOR = {
  name: "刘晓静",
  title: "内分泌科 主任医师",
  hospital: "上海交通大学医学院附属瑞金医院",
  department: "内分泌与代谢科",
  id: "SP_99201",
  rating: 5.0,
  stats: {
    totalConsults: 856,
    successRate: "98.5%",
    studentCount: 15,
    mdtLed: 42
  },
  tags: ["长江学者", "国家重点实验室成员", "博士生导师"]
};

// Represents an active appointment for the Pass View
export const MOCK_APPOINTMENT: Appointment = {
  id: "APT_9982",
  hospitalName: "浦江社区卫生服务中心",
  department: "注射室",
  floor: "1F",
  room: "103室",
  date: "2024-10-24 (周四)",
  timeSlot: "09:00 - 09:30",
  project: "营养神经注射 (甲钴胺)",
  status: "UPCOMING",
  queueNumber: "A-005"
};

export const MOCK_WAITING_QUEUE: QueuePatient[] = [
  { 
    id: 'q1', 
    name: '王建国', 
    age: 68, 
    gender: '男',
    status: 'WAITING', 
    waitTime: '5min', 
    type: '慢病续方', 
    chiefComplaint: '降压药已用完，需续开苯磺酸氨氯地平。',
    allergies: ['青霉素'],
    lastVisit: '2024-10-10',
    avatarColor: 'bg-blue-100 text-blue-600' 
  },
  { 
    id: 'q2', 
    name: '张秀英', 
    age: 72, 
    gender: '女',
    status: 'IN_PROGRESS', 
    waitTime: '12min', 
    type: '注射治疗', 
    chiefComplaint: '预约甲钴胺注射，自述今日左脚微麻。',
    allergies: [],
    lastVisit: '2024-10-22',
    avatarColor: 'bg-orange-100 text-orange-600' 
  },
  { 
    id: 'q3', 
    name: '李大爷', 
    age: 80, 
    gender: '男',
    status: 'WAITING', 
    waitTime: '1min', 
    type: '全科问诊', 
    chiefComplaint: '近期夜间咳嗽，无发热。',
    allergies: ['磺胺类'],
    lastVisit: '2024-09-15',
    avatarColor: 'bg-purple-100 text-purple-600' 
  },
];

export const MOCK_SPECIALIST_REFERRALS: QueuePatient[] = [
  {
     id: 'ref1',
     name: '陈桂芳',
     age: 70,
     gender: '女',
     status: 'WAITING',
     waitTime: '1天',
     type: '上转会诊',
     chiefComplaint: '空腹血糖波动，社区初筛异常，申请专家制定治疗方案。',
     allergies: [],
     lastVisit: '2024-10-22',
     avatarColor: 'bg-orange-100 text-orange-600',
     diagnosisPending: true,
     riskLevel: 'HIGH',
     communityHospital: '浦江社区卫生服务中心',
     uploadedData: {
       bloodSugar: '11.5 mmol/L',
       symptoms: ['多饮', '手脚麻木', '视力模糊'],
       preliminaryCheck: '社区初诊疑似2型糖尿病复发，建议调整用药。',
       historyTrend: [6.2, 6.5, 7.1, 8.4, 9.2, 11.5], // Rising trend
       labResults: [
          { name: 'HbA1c', value: '8.9', unit: '%', range: '4.0-6.0', status: 'CRITICAL' },
          { name: '空腹血糖', value: '11.5', unit: 'mmol/L', range: '3.9-6.1', status: 'HIGH' },
          { name: '总胆固醇', value: '5.2', unit: 'mmol/L', range: '<5.2', status: 'NORMAL' },
          { name: '尿酮体', value: '+', unit: '', range: '-', status: 'HIGH' },
       ],
       images: [
         { id: 'img1', type: 'CT', url: 'chest_ct', date: '2024-10-22', description: '胸部CT平扫' },
         { id: 'img2', type: 'ULTRASOUND', url: 'doppler', date: '2024-10-22', description: '下肢血管多普勒' }
       ]
     }
  },
  {
     id: 'ref2',
     name: '刘建平',
     age: 65,
     gender: '男',
     status: 'WAITING',
     waitTime: '2小时',
     type: '远程阅片',
     chiefComplaint: '胸闷气短一周，社区心电图提示ST段改变。',
     allergies: ['头孢'],
     lastVisit: '2024-10-23',
     avatarColor: 'bg-blue-100 text-blue-600',
     diagnosisPending: true,
     riskLevel: 'MEDIUM',
     communityHospital: '古美社区卫生服务中心',
     uploadedData: {
        bloodSugar: '5.6 mmol/L',
        symptoms: ['胸闷', '心悸'],
        preliminaryCheck: '疑似冠心病，请专家阅片确诊。',
        historyTrend: [130, 135, 142, 138, 145, 140], // BP Trend mock
        labResults: [
           { name: '肌钙蛋白', value: '0.08', unit: 'ng/ml', range: '<0.04', status: 'HIGH' },
           { name: 'CK-MB', value: '22', unit: 'U/L', range: '0-24', status: 'NORMAL' }
        ],
        images: []
     }
  }
];

export const MOCK_DOCTOR_TASKS: DoctorTask[] = [
  {
    id: 't2',
    type: 'TRANSFER_REVIEW',
    patientName: '陈桂芳',
    description: '申请从【瑞金医院】转入：II型糖尿病慢病管理方案',
    time: '10:30',
    urgent: true,
    status: 'PENDING'
  },
  {
    id: 't1',
    type: 'APPOINTMENT',
    patientName: '王建国',
    description: '预约：甲钴胺注射 (09:00)',
    time: '09:00',
    urgent: false,
    status: 'PENDING'
  },
  {
    id: 't3',
    type: 'MESSAGE',
    patientName: '张阿姨',
    description: '咨询：胰岛素针头是否可以重复使用？',
    time: '08:45',
    urgent: false,
    status: 'DONE'
  }
];

export const MOCK_REMINDERS: Reminder[] = [
  {
    id: 'r1',
    type: 'TREATMENT',
    title: '营养神经注射治疗',
    time: '本周四 (后天)',
    detail: '甲钴胺注射液 1支 • 需提前预约',
    status: 'PENDING', 
    actionLabel: '一键预约',
    location: '推荐: 浦江社区卫生服务中心'
  },
  {
    id: 'r2',
    type: 'MEDICATION',
    title: '口服降糖药',
    time: '每日 08:00',
    detail: '二甲双胍 0.5g, 早餐后服用',
    status: 'COMPLETED',
  }
];

export const MOCK_RECORDS: MedicalRecord[] = [
  {
    id: 'rec1',
    diagnosis: 'II型糖尿病 (伴周围神经病变)',
    diagnosisDate: '2019-05-10',
    hospitalName: '瑞金医院 (总院)',
    doctorName: '刘晓静 主任医师',
    prescription: ['甲钴胺注射液', '盐酸二甲双胍片'],
    treatmentPlan: '长期医嘱：每两周进行一次甲钴胺肌注，改善手脚麻木症状。建议转至社区医院执行。',
    status: 'ACTIVE',
    transferStatus: 'NONE' 
  },
  {
    id: 'rec2',
    diagnosis: '老年性白内障 (初期)',
    diagnosisDate: '2022-11-20',
    hospitalName: '五官科医院',
    doctorName: '张明 医师',
    prescription: ['莎普爱思滴眼液'],
    treatmentPlan: '定期复查眼底。',
    status: 'ACTIVE',
    transferStatus: 'COMPLETED'
  }
];

export const MOCK_HOSPITALS: Hospital[] = [
  {
    id: 'h1',
    name: '浦江社区卫生服务中心',
    type: 'COMMUNITY',
    distance: '800米',
    address: '江月路1200号',
    tags: ['注射执行', '医保定点', '慢病管理'],
    rating: 4.9,
    availableServices: ['简易门诊', '注射室', '家庭医生'],
    waitingTime: '无需排队',
    isRecommended: true
  },
  {
    id: 'h2',
    name: '瑞金医院 (总院)',
    type: 'GRADE_3A',
    distance: '18.5公里',
    address: '瑞金二路197号',
    tags: ['三甲', '内分泌科强项'],
    rating: 5.0,
    availableServices: ['专家门诊', '疑难杂症'],
    waitingTime: '2小时+'
  },
  {
    id: 'h3',
    name: '仁济医院 (南院)',
    type: 'GRADE_3A',
    distance: '15公里',
    address: '江月路2000号',
    tags: ['三甲', '综合'],
    rating: 4.7,
    availableServices: ['专家门诊', '住院服务'],
    waitingTime: '1小时'
  }
];

export const MOCK_VITALS: VitalSign[] = [
  { type: 'SUGAR', value: '6.4', unit: 'mmol/L', status: 'NORMAL', trend: 'STABLE', lastMeasured: '今日 07:00' },
  { type: 'PRESSURE', value: '135/88', unit: 'mmHg', status: 'HIGH', trend: 'UP', lastMeasured: '昨日 19:30' },
];

export const MOCK_ARTICLES: HealthArticle[] = [
  { id: 'a1', title: '秋冬季节糖尿病足的预防与护理', category: '慢病护理', readCount: 2340 },
  { id: 'a2', title: '甲钴胺注射后的注意事项', category: '用药指南', readCount: 1502 },
  { id: 'a3', title: '老年人流感疫苗接种通知', category: '社区公告', readCount: 5600 },
];
