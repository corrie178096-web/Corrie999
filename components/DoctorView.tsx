
import React, { useState } from 'react';
import { CheckCircle, Syringe, User, AlertCircle, Calendar, FileText, ChevronLeft, ShieldCheck, Activity, Clock, Inbox, FileInput, ArrowRight, X, UserCheck, Phone, Clipboard, Pill, Stethoscope, FilePlus, Send, Database, Brain, Zap, Users, GraduationCap, Radio, Search, Bell, AlertTriangle, ScanLine, ChevronRight, BarChart2, Microscope, Image as ImageIcon, MessageSquare, TrendingUp, Building2, Star, Award, Settings, LogOut, Verified, Briefcase, Share2, Users2, Target } from 'lucide-react';
import { MOCK_USER, MOCK_RECORDS, MOCK_WAITING_QUEUE, MOCK_SPECIALIST_REFERRALS, MOCK_COMMUNITY_DOCTOR, MOCK_SPECIALIST_DOCTOR } from '../constants';
import { QueuePatient, DoctorType, Tab } from '../types';

const DoctorView: React.FC<{ activeTab: string, doctorType: DoctorType }> = ({ activeTab, doctorType }) => {
  // --- Community States ---
  const [scanState, setScanState] = useState<'IDLE' | 'SCANNING' | 'DETECTED' | 'CONFIRMED'>('IDLE');
  const [showReferralModal, setShowReferralModal] = useState(false);
  const [referralStep, setReferralStep] = useState(0); 
  const [selectedQueuePatient, setSelectedQueuePatient] = useState<QueuePatient | null>(null);

  // --- Specialist States ---
  const [consultPatient, setConsultPatient] = useState<QueuePatient | null>(null); 
  const [consultTab, setConsultTab] = useState<'OVERVIEW' | 'LABS' | 'IMAGES' | 'MDT'>('OVERVIEW');

  // --- Doctor Profile Stats Components ---
  const DoctorProfile = () => {
    const isCommunity = doctorType === 'COMMUNITY';
    const data = isCommunity ? MOCK_COMMUNITY_DOCTOR : MOCK_SPECIALIST_DOCTOR;
    const accentColor = isCommunity ? 'text-orange-500' : 'text-indigo-600';
    const bgColor = isCommunity ? 'bg-orange-500' : 'bg-indigo-600';

    return (
      <div className="min-h-full bg-gray-50 pb-32 animate-in fade-in duration-500">
         {/* 1. Header (Professional Identity) */}
         <section className={`${bgColor} pt-20 pb-24 px-8 rounded-b-[3.5rem] relative overflow-hidden shadow-2xl`}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-[60px] -ml-24 -mb-24"></div>
            
            <div className="flex items-center space-x-6 relative z-10 max-w-md mx-auto">
               <div className="w-24 h-24 rounded-[2.5rem] bg-white text-stone-900 flex items-center justify-center text-4xl font-black shadow-2xl transform -rotate-3 ring-4 ring-white/20">
                  {data.name[0]}
               </div>
               <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <h1 className="text-3xl font-black text-white tracking-tight">{data.name}</h1>
                    <Verified size={20} className="text-yellow-400 fill-yellow-400/20" />
                  </div>
                  <p className="text-white/80 font-bold text-sm">{data.title}</p>
                  <div className="bg-black/20 px-3 py-1 rounded-full inline-flex items-center space-x-2 border border-white/10 backdrop-blur-sm">
                     <Building2 size={12} className="text-white" />
                     <span className="text-[10px] font-black text-white uppercase tracking-widest">{data.hospital}</span>
                  </div>
               </div>
            </div>
         </section>

         <div className="px-6 -mt-12 max-w-md mx-auto space-y-6 relative z-20">
            {/* 2. Business Dashboard (Stats) */}
            <div className="bg-white p-6 rounded-[2.5rem] shadow-xl border border-stone-50 grid grid-cols-2 gap-4">
               <div className="space-y-1 p-2">
                  <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">
                     {isCommunity ? '累计管理患者' : '累计专家会诊'}
                  </p>
                  <div className="flex items-baseline space-x-1">
                    <span className={`text-3xl font-black text-stone-900`}>
                       {/* Fix: Directly accessing mock objects to resolve property access issues on union type */}
                       {isCommunity ? MOCK_COMMUNITY_DOCTOR.stats.totalPatients : MOCK_SPECIALIST_DOCTOR.stats.totalConsults}
                    </span>
                    <span className="text-[10px] font-black text-stone-400">位</span>
                  </div>
               </div>
               <div className="space-y-1 p-2 border-l border-stone-100">
                  <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">
                     {isCommunity ? '转诊闭环率' : '会诊成功率'}
                  </p>
                  <div className="flex items-baseline space-x-1">
                    <span className={`text-3xl font-black ${accentColor}`}>
                       {/* Fix: Directly accessing mock objects to resolve property access issues on union type */}
                       {isCommunity ? MOCK_COMMUNITY_DOCTOR.stats.referralRate : MOCK_SPECIALIST_DOCTOR.stats.successRate}
                    </span>
                  </div>
               </div>
               <div className="col-span-2 h-px bg-stone-100 my-1"></div>
               <div className="space-y-1 p-2">
                  <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">
                     {isCommunity ? '参与MDT次数' : '带教医生/学生'}
                  </p>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-2xl font-black text-stone-900">
                       {/* Fix: Directly accessing mock objects to resolve property access issues on union type */}
                       {isCommunity ? MOCK_COMMUNITY_DOCTOR.stats.mdtJoined : MOCK_SPECIALIST_DOCTOR.stats.studentCount}
                    </span>
                    <span className="text-[10px] font-black text-stone-400">
                       {isCommunity ? '次' : '人'}
                    </span>
                  </div>
               </div>
               <div className="space-y-1 p-2 border-l border-stone-100">
                  <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">患者综合评分</p>
                  <div className="flex items-center space-x-1">
                    <span className="text-2xl font-black text-stone-900">{data.rating}</span>
                    <Star size={16} className="text-yellow-400 fill-yellow-400" />
                  </div>
               </div>
            </div>

            {/* 3. Professional Capabilities & Tags */}
            <section className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-stone-100">
               <h3 className="font-black text-stone-900 tracking-tight flex items-center mb-4">
                  <Award size={20} className="mr-2 text-stone-300" />
                  专业资历与标签
               </h3>
               <div className="flex flex-wrap gap-2">
                  {data.tags.map((tag, i) => (
                    <span key={i} className={`px-4 py-2 rounded-2xl text-[11px] font-black ${isCommunity ? 'bg-orange-50 text-orange-600 border border-orange-100' : 'bg-indigo-50 text-indigo-600 border border-indigo-100'}`}>
                       {tag}
                    </span>
                  ))}
               </div>
            </section>

            {/* 4. Professional Tools Menu */}
            <section className="bg-white rounded-[2.5rem] shadow-sm overflow-hidden border border-stone-100 p-2">
               <div className="px-6 py-4 flex items-center justify-between border-b border-stone-50">
                  <h3 className="font-black text-stone-900 tracking-tight flex items-center">
                     <Briefcase size={18} className="mr-2 text-stone-300" />
                     执业工具
                  </h3>
               </div>
               
               <MenuItem 
                 icon={<Calendar size={22} className={accentColor}/>} 
                 label="排班与接诊设置" 
                 value="开启中" 
               />
               <div className="h-px bg-stone-50 mx-6"></div>
               <MenuItem 
                 icon={<Share2 size={22} className="text-blue-500"/>} 
                 label="远程协作中心 (MDT)" 
                 value={`${isCommunity ? '已加入2个' : '待处理1个'}`}
               />
               <div className="h-px bg-stone-50 mx-6"></div>
               <MenuItem 
                 icon={<GraduationCap size={22} className="text-purple-500"/>} 
                 label="继续教育与学分" 
                 value="85.5 分"
               />
               <div className="h-px bg-stone-50 mx-6"></div>
               <MenuItem 
                 icon={<Users2 size={22} className="text-teal-500"/>} 
                 label="协作医生网络" 
                 value="12 成员"
               />
            </section>

            {/* 5. Account Settings */}
            <section className="bg-white rounded-[2.5rem] shadow-sm border border-stone-100 p-2">
               <MenuItem icon={<Settings size={22} className="text-stone-300"/>} label="系统偏好设置" />
               <div className="h-px bg-stone-50 mx-6"></div>
               <MenuItem icon={<Radio size={22} className="text-stone-300"/>} label="通知与隐私" />
            </section>

            <button 
              className="w-full py-5 bg-stone-50 text-stone-400 font-black rounded-[2rem] flex items-center justify-center space-x-2 border-2 border-stone-100 hover:bg-stone-100 hover:text-stone-600 transition-all uppercase tracking-widest text-xs"
            >
              <LogOut size={18} />
              <span>安全退出医生端</span>
            </button>
         </div>
      </div>
    );
  };

  const MenuItem: React.FC<{icon: React.ReactNode, label: string, value?: string}> = ({ icon, label, value }) => (
    <div className="flex items-center justify-between p-6 hover:bg-stone-50 active:bg-stone-100 rounded-[2rem] transition-colors cursor-pointer group">
      <div className="flex items-center space-x-4">
        <div className="group-hover:scale-110 transition-transform">{icon}</div>
        <span className="font-black text-sm text-stone-800">{label}</span>
      </div>
      <div className="flex items-center space-x-2">
        {value && <span className="text-[10px] font-black text-stone-400 bg-stone-50 px-2 py-1 rounded-lg uppercase">{value}</span>}
        <ChevronRight size={18} className="text-stone-200 group-hover:text-stone-500" />
      </div>
    </div>
  );

  // =================================================================================
  // SHARED: PATIENT 360 MODAL (Community Version)
  // =================================================================================

  const Patient360Modal = ({ patient, onClose }: { patient: QueuePatient, onClose: () => void }) => (
     <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-5 animate-in fade-in duration-200">
        <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-300 max-h-[90vh] overflow-y-auto">
           {/* Header */}
           <div className={`p-6 relative ${doctorType === 'COMMUNITY' ? 'bg-orange-50' : 'bg-slate-50'}`}>
              <button onClick={onClose} className="absolute right-4 top-4 p-2 bg-white/50 rounded-full">
                 <X size={18} />
              </button>
              <div className="flex items-center space-x-4">
                 <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black ${patient.avatarColor}`}>
                    {patient.name[0]}
                 </div>
                 <div>
                    <h2 className="text-2xl font-black text-stone-900">{patient.name}</h2>
                    <p className="text-sm font-bold text-stone-500">{patient.gender} · {patient.age}岁 · {patient.type}</p>
                 </div>
              </div>
           </div>
           {/* Content */}
           <div className="p-6 space-y-6">
              <div>
                 <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">主诉 / Chief Complaint</h3>
                 <div className="bg-white border-2 border-stone-100 p-4 rounded-2xl text-stone-800 font-bold leading-relaxed">
                    "{patient.chiefComplaint}"
                 </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="bg-stone-50 p-4 rounded-2xl">
                    <h4 className="text-xs font-bold text-stone-400 mb-1 flex items-center"><Clock size={12} className="mr-1"/> 上次就诊</h4>
                    <p className="font-bold text-stone-900">{patient.lastVisit}</p>
                 </div>
                 <div className="bg-red-50 p-4 rounded-2xl">
                    <h4 className="text-xs font-bold text-red-400 mb-1 flex items-center"><AlertCircle size={12} className="mr-1"/> 过敏史</h4>
                    <p className="font-bold text-red-900">
                       {patient.allergies.length > 0 ? patient.allergies.join(', ') : '无'}
                    </p>
                 </div>
              </div>
              
              {/* Doctor Actions */}
              <div className="flex space-x-3 pt-4">
                 <button className={`flex-1 py-3 rounded-xl font-bold text-white shadow-lg ${doctorType === 'COMMUNITY' ? 'bg-orange-500' : 'bg-indigo-600'}`}>
                    叫号
                 </button>
                 <button className="flex-1 py-3 bg-stone-100 text-stone-600 font-bold rounded-xl">
                    查看详情
                 </button>
              </div>
           </div>
        </div>
     </div>
  );

  const ReferralReviewModal = () => (
    <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-5 animate-in fade-in duration-200">
       <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-300">
          <div className="p-6 bg-orange-50 border-b border-orange-100 flex justify-between items-center">
             <h3 className="font-bold text-lg text-stone-900">转诊申请审核</h3>
             <button onClick={() => setShowReferralModal(false)} className="p-2 bg-white rounded-full text-stone-400"><X size={16}/></button>
          </div>
          <div className="p-6">
             {referralStep === 0 && (
                <div className="space-y-4">
                   <div className="bg-stone-50 p-4 rounded-2xl">
                      <p className="text-xs text-stone-400 font-bold mb-1">申请人</p>
                      <p className="font-bold text-stone-900">陈桂芳 (II型糖尿病)</p>
                   </div>
                   <div className="bg-stone-50 p-4 rounded-2xl">
                       <p className="text-xs text-stone-400 font-bold mb-1">转入目标</p>
                       <p className="font-bold text-stone-900">瑞金医院 (内分泌科)</p>
                   </div>
                   <button onClick={() => setReferralStep(1)} className="w-full py-3.5 bg-orange-500 text-white font-bold rounded-xl shadow-lg mt-4">批准并上传档案</button>
                </div>
             )}
             {referralStep === 1 && (
                <div className="text-center py-8">
                   <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle size={32} />
                   </div>
                   <h3 className="font-black text-xl text-stone-900">转诊单已生成</h3>
                   <p className="text-stone-500 text-sm mt-2">患者将收到短信通知</p>
                   <button onClick={() => setShowReferralModal(false)} className="w-full py-3.5 bg-stone-100 text-stone-600 font-bold rounded-xl mt-8">关闭</button>
                </div>
             )}
          </div>
       </div>
    </div>
  );

  const RenderCommunityDashboard = () => (
    <div className="min-h-full bg-gradient-to-br from-orange-50 via-white to-amber-50 pb-28">
       {/* Warm Header */}
       <header className="p-6 pt-8 pb-4">
          <div className="flex justify-between items-center mb-6">
             <div>
                <h1 className="text-2xl font-black text-stone-900 tracking-tight">早安，{MOCK_COMMUNITY_DOCTOR.name}</h1>
                <p className="text-sm text-stone-500 font-bold mt-1">{MOCK_COMMUNITY_DOCTOR.hospital}</p>
             </div>
             <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg shadow-orange-200 border border-orange-100 relative">
                <span className="font-black text-orange-600 text-lg">{MOCK_COMMUNITY_DOCTOR.name[0]}</span>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
             </div>
          </div>

          {/* Status Cards */}
          <div className="flex space-x-3 overflow-x-auto no-scrollbar">
             <div className="min-w-[140px] bg-orange-500 text-white p-4 rounded-[1.5rem] shadow-lg shadow-orange-500/30 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-white/20 rounded-full -mr-6 -mt-6"></div>
                <p className="text-xs font-bold text-orange-100 mb-1">今日候诊</p>
                <div className="flex items-baseline space-x-1">
                   <span className="text-3xl font-black">12</span>
                   <span className="text-sm">人</span>
                </div>
             </div>
             <div className="min-w-[140px] bg-white text-stone-900 p-4 rounded-[1.5rem] shadow-sm border border-orange-100">
                <p className="text-xs font-bold text-stone-400 mb-1">待执行注射</p>
                <div className="flex items-baseline space-x-1">
                   <span className="text-3xl font-black">5</span>
                   <span className="text-sm">单</span>
                </div>
             </div>
             <div className="min-w-[140px] bg-white text-stone-900 p-4 rounded-[1.5rem] shadow-sm border border-orange-100">
                <p className="text-xs font-bold text-stone-400 mb-1">待审核转入</p>
                <div className="flex items-baseline space-x-1">
                   <span className="text-3xl font-black text-orange-500">2</span>
                   <span className="text-sm">人</span>
                </div>
             </div>
          </div>
       </header>

       {/* Quick Actions Grid */}
       <div className="px-6 mb-6">
          <h2 className="text-sm font-bold text-stone-900 mb-3 px-1">快捷功能</h2>
          <div className="grid grid-cols-4 gap-3">
             {[
                { label: '扫码执行', icon: <ScanLine size={20}/>, bg: 'bg-orange-100', text: 'text-orange-600' },
                { label: '一键续方', icon: <Pill size={20}/>, bg: 'bg-green-100', text: 'text-green-600' },
                { label: '宣教推送', icon: <Send size={20}/>, bg: 'bg-blue-100', text: 'text-blue-600' },
                { label: '查房模式', icon: <Clipboard size={20}/>, bg: 'bg-purple-100', text: 'text-purple-600' },
             ].map((item, i) => (
                <button key={i} className="flex flex-col items-center space-y-2">
                   <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.bg} ${item.text} shadow-sm active:scale-95 transition-transform`}>
                      {item.icon}
                   </div>
                   <span className="text-[10px] font-bold text-stone-600">{item.label}</span>
                </button>
             ))}
          </div>
       </div>

       {/* Patient Queue */}
       <div className="px-6 space-y-4">
          <div className="flex justify-between items-center">
             <h2 className="text-lg font-black text-stone-900">候诊队列</h2>
             <button className="text-xs font-bold text-orange-600 bg-orange-100 px-3 py-1 rounded-full">查看全部</button>
          </div>
          
          <div className="space-y-3">
             {MOCK_WAITING_QUEUE.map((patient, idx) => (
                <div 
                   key={patient.id}
                   onClick={() => setSelectedQueuePatient(patient)}
                   className="bg-white p-5 rounded-[2rem] shadow-sm border border-stone-50 flex items-center space-x-4 relative overflow-hidden active:bg-orange-50 transition-colors"
                >
                   {idx === 0 && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-orange-500"></div>}
                   <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-black ${patient.avatarColor} shrink-0`}>
                      {patient.name[0]}
                   </div>
                   <div className="flex-1">
                      <div className="flex justify-between items-start">
                         <h3 className="font-bold text-stone-900">{patient.name}</h3>
                         <span className="text-xs font-bold text-stone-400">{patient.waitTime}</span>
                      </div>
                      <p className="text-xs text-stone-500 font-medium mt-1 truncate">{patient.type} · {patient.chiefComplaint}</p>
                   </div>
                   <button className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center">
                      <ChevronRight size={16} className="text-stone-400" />
                   </button>
                </div>
             ))}
          </div>
       </div>

       {/* Modals */}
       {showReferralModal && <ReferralReviewModal />}
       {selectedQueuePatient && <Patient360Modal patient={selectedQueuePatient} onClose={() => setSelectedQueuePatient(null)} />}
    </div>
  );

  const RenderSpecialistDashboard = () => (
    <div className="min-h-full bg-[#f8fafc] pb-28">
        {/* Header */}
        <header className="p-6 pt-8 bg-white rounded-b-[2.5rem] shadow-sm mb-6">
           <div className="flex justify-between items-center mb-6">
             <div>
                <h1 className="text-2xl font-black text-stone-900 tracking-tight">下午好</h1>
                <p className="text-sm text-indigo-500 font-bold mt-1 flex items-center">
                   <ShieldCheck size={14} className="mr-1"/> {MOCK_SPECIALIST_DOCTOR.hospital}
                </p>
             </div>
             <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-black text-lg border-2 border-white shadow-sm">
                {MOCK_SPECIALIST_DOCTOR.name[0]}
             </div>
           </div>
           {/* Stats */}
           <div className="grid grid-cols-2 gap-4">
              <div className="bg-indigo-600 text-white p-5 rounded-[1.5rem] relative overflow-hidden shadow-lg shadow-indigo-500/30">
                 <div className="absolute right-0 top-0 w-20 h-20 bg-white/10 rounded-full -mr-6 -mt-6"></div>
                 <p className="text-xs font-bold text-indigo-200 mb-1">待处理会诊</p>
                 <span className="text-3xl font-black">4</span>
              </div>
              <div className="bg-white border border-stone-100 text-stone-900 p-5 rounded-[1.5rem] shadow-sm">
                 <p className="text-xs font-bold text-stone-400 mb-1">今日已完成</p>
                 <span className="text-3xl font-black">12</span>
              </div>
           </div>
        </header>

        {/* List */}
        <div className="px-6 space-y-4">
           <div className="flex justify-between items-center px-1">
              <h2 className="font-bold text-stone-900">社区转诊/会诊申请</h2>
              <button className="w-8 h-8 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-400">
                <Activity size={16} />
              </button>
           </div>
           
           <div className="space-y-3">
              {MOCK_SPECIALIST_REFERRALS.map((patient) => (
                 <button 
                   key={patient.id}
                   onClick={() => setConsultPatient(patient)}
                   className="w-full bg-white p-5 rounded-[2rem] shadow-sm border border-stone-100 text-left relative overflow-hidden active:scale-[0.98] transition-transform"
                 >
                    {patient.riskLevel === 'HIGH' && (
                       <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl">
                          高风险
                       </div>
                    )}
                    <div className="flex items-start space-x-4">
                       <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black shrink-0 ${patient.riskLevel === 'HIGH' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                          {patient.name[0]}
                       </div>
                       <div>
                          <div className="flex items-center space-x-2">
                             <h3 className="font-bold text-stone-900 text-lg">{patient.name}</h3>
                             <span className="text-xs text-stone-400 font-bold">{patient.age}岁</span>
                          </div>
                          <p className="text-xs font-bold text-stone-500 mt-1 flex items-center">
                             <Building2 size={12} className="mr-1" /> {patient.communityHospital}
                          </p>
                          <div className="mt-3 bg-stone-50 p-2 rounded-xl text-xs text-stone-600 font-medium border border-stone-100">
                             "{patient.chiefComplaint}"
                          </div>
                       </div>
                    </div>
                 </button>
              ))}
           </div>
        </div>
    </div>
  );

  const SpecialistConsultationView = () => {
    if (!consultPatient) return null;

    return (
      <div className="min-h-full bg-white flex flex-col">
         {/* Top Bar */}
         <div className="p-4 flex items-center justify-between border-b border-stone-100 sticky top-0 bg-white/80 backdrop-blur-md z-20">
            <button onClick={() => setConsultPatient(null)} className="p-2 hover:bg-stone-50 rounded-full">
               <ChevronLeft size={24} className="text-stone-600" />
            </button>
            <div className="text-center">
               <h2 className="font-bold text-stone-900">{consultPatient.name}</h2>
               <p className="text-xs text-stone-400">{consultPatient.gender} {consultPatient.age}岁 · {consultPatient.communityHospital}</p>
            </div>
            <button className="p-2 text-indigo-600 font-bold text-sm">更多</button>
         </div>

         {/* Patient Context Header */}
         <div className="bg-indigo-50 p-6 pb-8">
             <div className="bg-white rounded-2xl p-4 shadow-sm border border-indigo-100">
                <div className="flex justify-between items-start mb-2">
                   <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">社区初诊意见</h3>
                   <span className="text-[10px] bg-stone-100 text-stone-500 px-2 py-1 rounded font-bold">由 李医生 提交</span>
                </div>
                <p className="text-stone-800 font-bold text-sm leading-relaxed">
                   {consultPatient.uploadedData?.preliminaryCheck}
                </p>
             </div>
         </div>

         {/* Tabs */}
         <div className="flex bg-white shadow-sm sticky top-[73px] z-10">
             {['OVERVIEW', 'LABS', 'IMAGES'].map((t) => (
                <button 
                  key={t}
                  onClick={() => setConsultTab(t as any)}
                  className={`flex-1 py-4 text-xs font-bold border-b-2 transition-colors ${consultTab === t ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-stone-400'}`}
                >
                  {t === 'OVERVIEW' ? '综合视图' : t === 'LABS' ? '检验数据' : '影像资料'}
                </button>
             ))}
         </div>

         {/* Content Area */}
         <div className="flex-1 p-6 pb-32 overflow-y-auto bg-stone-50">
             
             {consultTab === 'OVERVIEW' && (
                <div className="space-y-6 animate-in slide-in-from-bottom-2">
                   {/* Vitals Sparkline Mock */}
                   <div className="bg-white p-5 rounded-[2rem] shadow-sm">
                      <h4 className="font-bold text-stone-900 mb-4 flex items-center"><Activity size={18} className="mr-2 text-stone-400"/> 近期指标趋势</h4>
                      <div className="h-32 flex items-end justify-between space-x-2 px-2">
                         {consultPatient.uploadedData?.historyTrend?.map((val, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center">
                               <div style={{height: `${(val / 15) * 100}%`}} className="w-full bg-indigo-100 rounded-t-lg relative group">
                                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-stone-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                     {val}
                                  </div>
                               </div>
                            </div>
                         ))}
                      </div>
                      <div className="flex justify-between text-[10px] text-stone-400 mt-2 px-2">
                         <span>10-15</span>
                         <span>今天</span>
                      </div>
                   </div>

                   {/* Symptoms */}
                   <div className="bg-white p-5 rounded-[2rem] shadow-sm">
                       <h4 className="font-bold text-stone-900 mb-3">症状标签</h4>
                       <div className="flex flex-wrap gap-2">
                          {consultPatient.uploadedData?.symptoms.map(s => (
                             <span key={s} className="px-3 py-1.5 bg-stone-100 text-stone-600 rounded-xl text-xs font-bold">{s}</span>
                          ))}
                       </div>
                   </div>
                </div>
             )}

             {consultTab === 'LABS' && (
                <div className="space-y-3 animate-in slide-in-from-bottom-2">
                   {consultPatient.uploadedData?.labResults?.map((lab, i) => (
                      <div key={i} className="bg-white p-4 rounded-2xl shadow-sm flex justify-between items-center">
                         <div>
                            <p className="font-bold text-stone-900">{lab.name}</p>
                            <p className="text-xs text-stone-400 mt-0.5">参考值: {lab.range}</p>
                         </div>
                         <div className="text-right">
                            <p className={`font-black text-lg ${lab.status === 'NORMAL' ? 'text-stone-900' : 'text-orange-500'}`}>
                               {lab.value} <span className="text-xs font-medium text-stone-400">{lab.unit}</span>
                            </p>
                            {lab.status !== 'NORMAL' && <span className="text-[10px] font-bold text-orange-500 bg-orange-50 px-1.5 rounded">异常</span>}
                         </div>
                      </div>
                   ))}
                </div>
             )}

             {consultTab === 'IMAGES' && (
                <div className="grid grid-cols-2 gap-3 animate-in slide-in-from-bottom-2">
                   {consultPatient.uploadedData?.images?.length ? consultPatient.uploadedData.images.map((img, i) => (
                      <div key={i} className="bg-stone-900 rounded-2xl aspect-square relative overflow-hidden group">
                         <div className="absolute inset-0 flex items-center justify-center text-stone-500">
                            <ImageIcon size={32} />
                         </div>
                         <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                            <p className="text-white text-xs font-bold">{img.description}</p>
                            <p className="text-stone-400 text-[10px]">{img.date}</p>
                         </div>
                      </div>
                   )) : (
                      <div className="col-span-2 py-12 text-center text-stone-400 text-sm">
                         暂无影像资料
                      </div>
                   )}
                </div>
             )}
         </div>

         {/* Diagnosis Action Bar */}
         <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-stone-100 z-30 pb-8 md:pb-8 max-w-[393px] mx-auto rounded-t-[2rem] shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
             <div className="flex space-x-3">
                <button className="flex-1 py-3.5 bg-stone-100 text-stone-600 font-bold rounded-2xl">
                   退回补充
                </button>
                <button onClick={() => alert("下达诊断建议...")} className="flex-[2] py-3.5 bg-indigo-600 text-white font-bold rounded-2xl shadow-lg shadow-indigo-200">
                   下达诊疗建议
                </button>
             </div>
         </div>
      </div>
    );
  };

  // --- Router for Doctor Profile Tab ---
  if (activeTab === Tab.DOCTOR_PROFILE) {
      return <DoctorProfile />;
  }

  // Specialist Routing
  if (doctorType === 'SPECIALIST') {
      if (consultPatient) return <SpecialistConsultationView />;
      return <RenderSpecialistDashboard />;
  }

  // Handle Scanner Separate State Logic
  if (doctorType === 'COMMUNITY' && activeTab === 'SCANNER') {
      if (scanState === 'IDLE') return (
          <div className="h-full flex flex-col bg-stone-900 relative">
              <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-8 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20 bg-gradient-to-b from-orange-500 to-purple-900"></div>
                  {/* Scanner Visual */}
                  <div className="w-72 h-72 border-2 border-[#bef264] rounded-[2rem] relative flex items-center justify-center z-10 box-border overflow-hidden bg-black/30 backdrop-blur-sm shadow-[0_0_30px_rgba(190,242,100,0.2)]">
                     <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#bef264]/20 to-transparent w-full h-full animate-[spin_4s_linear_infinite]"></div>
                     <ScanLine size={64} className="text-[#bef264] opacity-50" />
                     <div className="w-full h-0.5 bg-[#bef264] shadow-[0_0_20px_#bef264] absolute top-1/2 animate-[ping_2s_infinite]"></div>
                  </div>
                  <div className="z-10 text-center">
                     <p className="text-white font-bold text-lg mb-2">核验就诊码</p>
                     <p className="text-stone-400 text-sm">请患者出示就诊凭证二维码</p>
                  </div>
                  <button onClick={() => setScanState('SCANNING')} className="z-10 bg-[#bef264] text-stone-900 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:scale-105 transition-transform">点击模拟扫码</button>
              </div>
          </div>
      );
      if (scanState === 'SCANNING') return (
          <div className="h-full bg-stone-900 flex flex-col items-center justify-center text-center space-y-8">
             <div className="graphic-loader w-32 h-32">
                <div className="graphic-loader-content">
                   <ScanLine size={40} className="text-[#bef264]" />
                </div>
             </div>
             <div className="text-[#bef264] font-bold text-xl">正在读取数据...</div>
             {setTimeout(() => setScanState('DETECTED'), 2000) && null} 
          </div>
      );
      if (scanState === 'DETECTED') return (
         <div className="flex flex-col h-full bg-white">
            <div className="bg-stone-900 text-white p-6 rounded-b-[2.5rem] shadow-xl relative z-10">
                <button onClick={() => setScanState('IDLE')} className="absolute top-6 left-4 p-2 bg-white/10 rounded-full"><ChevronLeft size={20}/></button>
                <div className="flex items-center space-x-4 mt-8">
                   <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-stone-900 font-black text-2xl">{MOCK_USER.name[0]}</div>
                   <div>
                      <h2 className="text-2xl font-black">{MOCK_USER.name}</h2>
                      <p className="text-stone-400 text-sm font-bold">待执行: 甲钴胺注射液</p>
                   </div>
                </div>
            </div>
            <div className="p-6">
               <button onClick={() => setScanState('CONFIRMED')} className="w-full py-4 bg-stone-900 text-white font-bold rounded-[2rem] text-lg shadow-lg">确认执行</button>
            </div>
         </div>
      );
      if (scanState === 'CONFIRMED') return (
          <div className="flex-1 bg-green-500 flex flex-col items-center justify-center p-8 text-center animate-in zoom-in">
             <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-xl"><CheckCircle size={48} className="text-green-500" /></div>
             <h2 className="text-3xl font-black text-white mb-2">执行成功</h2>
             <button onClick={() => setScanState('IDLE')} className="px-12 py-4 bg-white text-stone-900 font-bold rounded-2xl shadow-lg mt-8">继续下一位</button>
          </div>
      );
  }

  // Fallback for Community Dashboard
  return <RenderCommunityDashboard />;
};

export default DoctorView;
