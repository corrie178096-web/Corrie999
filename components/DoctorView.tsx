
import React, { useState } from 'react';
import { CheckCircle, Syringe, User, AlertCircle, Calendar, FileText, ChevronLeft, ShieldCheck, Activity, Clock, Inbox, FileInput, ArrowRight, X, UserCheck, Phone, Clipboard, Pill, Stethoscope, FilePlus, Send, Database, Brain, Zap, Users, GraduationCap, Radio, Search, Bell, AlertTriangle, ScanLine, ChevronRight, BarChart2, Microscope, Image as ImageIcon, MessageSquare, TrendingUp } from 'lucide-react';
import { MOCK_DOCTOR_USER, MOCK_DOCTOR_TASKS, MOCK_USER, MOCK_RECORDS, MOCK_WAITING_QUEUE, MOCK_SPECIALIST_REFERRALS } from '../constants';
import { QueuePatient, DoctorType } from '../types';

const DoctorView: React.FC<{ activeTab: string, doctorType: DoctorType }> = ({ activeTab, doctorType }) => {
  // --- Community States ---
  const [scanState, setScanState] = useState<'IDLE' | 'SCANNING' | 'DETECTED' | 'CONFIRMED'>('IDLE');
  const [showReferralModal, setShowReferralModal] = useState(false);
  const [referralStep, setReferralStep] = useState(0); 
  const [selectedQueuePatient, setSelectedQueuePatient] = useState<QueuePatient | null>(null);

  // --- Specialist States ---
  const [consultPatient, setConsultPatient] = useState<QueuePatient | null>(null); 
  const [diagnosisStep, setDiagnosisStep] = useState(0); 
  const [consultTab, setConsultTab] = useState<'OVERVIEW' | 'LABS' | 'IMAGES' | 'MDT'>('OVERVIEW');

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

  // =================================================================================
  // COMMUNITY DOCTOR RENDERERS (WARM / ORANGE THEME)
  // =================================================================================

  const RenderCommunityDashboard = () => (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 pb-28">
       {/* Warm Header */}
       <header className="p-6 pt-8 pb-4">
          <div className="flex justify-between items-center mb-6">
             <div>
                <h1 className="text-2xl font-black text-stone-900 tracking-tight">早安，李医生</h1>
                <p className="text-sm text-stone-500 font-bold mt-1">浦江社区卫生服务中心</p>
             </div>
             <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg shadow-orange-200 border border-orange-100 relative">
                <span className="font-black text-orange-600 text-lg">李</span>
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
                { label: '扫码执行', icon: <ScanLine size={20}/>, bg: 'bg-orange-100', text: 'text-orange-600', action: () => activeTab = 'SCANNER' },
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

  const ReferralReviewModal = () => (
    <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-5 animate-in fade-in duration-200">
        <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-300">
           {/* Header */}
           <div className="bg-orange-500 text-white p-6 relative">
              <button 
                onClick={() => setShowReferralModal(false)}
                className="absolute right-4 top-4 p-2 bg-white/20 rounded-full hover:bg-white/30"
              >
                 <X size={18} />
              </button>
              <div className="flex items-center space-x-2 mb-1 text-orange-100">
                 <Inbox size={20} />
                 <span className="text-xs font-bold uppercase tracking-wider">三甲转诊申请</span>
              </div>
              <h2 className="text-2xl font-black">档案审核</h2>
              <p className="text-orange-100 text-sm mt-1">来自: 瑞金医院 (总院) · 内分泌科</p>
           </div>

           {/* Content */}
           <div className="p-6">
              {referralStep === 0 ? (
                <>
                   {/* Patient Info */}
                   <div className="flex items-center space-x-4 mb-6 border-b border-stone-100 pb-6">
                      <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-xl font-black text-orange-600">
                         陈
                      </div>
                      <div>
                         <h3 className="font-bold text-lg text-stone-900">陈桂芳</h3>
                         <p className="text-xs text-stone-500 font-bold">医保卡号: 310*********4521</p>
                      </div>
                   </div>

                   {/* Medical Plan */}
                   <div className="space-y-4 mb-8">
                      <h4 className="font-bold text-stone-900 flex items-center">
                         <Activity size={16} className="mr-2 text-stone-400" />
                         下转治疗方案
                      </h4>
                      <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100">
                         <p className="font-bold text-stone-900 text-lg mb-1">2型糖尿病伴神经病变</p>
                         <ul className="text-sm text-stone-600 space-y-2 mt-2">
                            <li className="flex items-start">
                               <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-1.5 mr-2"></div>
                               <span>长期医嘱：甲钴胺注射液 (0.5mg)</span>
                            </li>
                            <li className="flex items-start">
                               <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-1.5 mr-2"></div>
                               <span>频次：每两周 1 次</span>
                            </li>
                         </ul>
                      </div>
                   </div>

                   {/* Actions */}
                   <div className="flex space-x-3">
                      <button className="flex-1 py-4 bg-stone-100 text-stone-500 font-bold rounded-2xl">
                         退回重审
                      </button>
                      <button 
                         onClick={() => setReferralStep(1)}
                         className="flex-1 py-4 bg-orange-500 text-white font-bold rounded-2xl shadow-lg flex items-center justify-center space-x-2 shadow-orange-500/30"
                      >
                         <FileInput size={18} />
                         <span>接收并建档</span>
                      </button>
                   </div>
                </>
              ) : (
                <div className="text-center py-8">
                   <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-200">
                      <UserCheck size={40} className="text-white" />
                   </div>
                   <h3 className="text-2xl font-black text-stone-900 mb-2">已完成建档</h3>
                   <p className="text-stone-500 text-sm mb-8">
                      患者陈桂芳的长期治疗方案已同步至<br/>本中心系统，可随时预约执行。
                   </p>
                   <button 
                      onClick={() => setShowReferralModal(false)}
                      className="w-full py-4 bg-stone-900 text-white font-bold rounded-2xl"
                   >
                      返回工作台
                   </button>
                </div>
              )}
           </div>
        </div>
    </div>
  );

  // =================================================================================
  // SPECIALIST DOCTOR: HIGH-TECH THEME (BLUE/YELLOW)
  // =================================================================================

  const RenderSpecialistDashboard = () => (
    <div className="min-h-screen bg-slate-50 pb-28">
       {/* High Tech Header */}
       <header className="bg-indigo-600 text-white rounded-b-[3rem] p-6 pb-12 shadow-2xl shadow-indigo-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full blur-[80px] -mr-20 -mt-20 opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 rounded-full blur-[80px] -ml-20 -mb-20 opacity-40"></div>

          <div className="relative z-10 flex justify-between items-start mb-8">
             <div>
                <div className="flex items-center space-x-2 mb-2 bg-indigo-500/30 w-fit px-3 py-1 rounded-full backdrop-blur-md border border-indigo-400/30">
                   <Zap size={12} className="text-yellow-400 fill-current" />
                   <span className="text-[10px] font-bold tracking-wider uppercase text-indigo-100">Grade 3A Specialist Portal</span>
                </div>
                <h1 className="text-3xl font-black tracking-tight">瑞金数字诊室</h1>
                <p className="text-indigo-200 font-medium text-sm mt-1">内分泌科 · 刘晓静(副主任)</p>
             </div>
             <div className="relative">
                <Bell size={24} className="text-indigo-200" />
                <div className="absolute top-0 right-0 w-2 h-2 bg-yellow-400 rounded-full"></div>
             </div>
          </div>

          {/* Dashboard Metrics (Glassmorphism) */}
          <div className="relative z-10 grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl">
                 <div className="flex items-center space-x-2 mb-2 text-indigo-200">
                    <Activity size={16} />
                    <span className="text-xs font-bold">待处理会诊</span>
                 </div>
                 <div className="flex items-end space-x-2">
                    <span className="text-3xl font-black text-white">4</span>
                    <span className="text-xs text-indigo-200 mb-1">人</span>
                 </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl">
                 <div className="flex items-center space-x-2 mb-2 text-indigo-200">
                    <AlertTriangle size={16} className="text-yellow-400" />
                    <span className="text-xs font-bold text-yellow-100">AI 风险预警</span>
                 </div>
                 <div className="flex items-end space-x-2">
                    <span className="text-3xl font-black text-yellow-400">2</span>
                    <span className="text-xs text-indigo-200 mb-1">高危</span>
                 </div>
              </div>
          </div>
       </header>

       <div className="px-6 -mt-6 relative z-20 space-y-6">
          
          {/* AI Insight Card */}
          <div className="bg-white p-5 rounded-[2rem] shadow-lg shadow-indigo-100 border border-indigo-50">
              <div className="flex items-center justify-between mb-3">
                 <div className="flex items-center space-x-2">
                    <Brain size={18} className="text-indigo-600" />
                    <h3 className="font-bold text-stone-900">智能分析周报</h3>
                 </div>
                 <span className="text-[10px] bg-indigo-50 text-indigo-600 px-2 py-1 rounded-md font-bold">New</span>
              </div>
              <p className="text-xs text-stone-500 leading-relaxed mb-3">
                 本周社区下转患者血糖达标率提升 12%。浦江社区上传了 3 份疑难病例，建议优先处理。
              </p>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                 <div className="h-full bg-indigo-500 w-[70%] rounded-full"></div>
              </div>
          </div>

          {/* Referral Inbox */}
          <div>
             <h3 className="font-bold text-stone-900 mb-4 flex items-center text-lg">
                <Inbox size={20} className="mr-2 text-stone-400" />
                社区上转列表
             </h3>
             <div className="space-y-4">
                {MOCK_SPECIALIST_REFERRALS.map(patient => (
                   <div 
                      key={patient.id}
                      onClick={() => setConsultPatient(patient)}
                      className="bg-white p-5 rounded-[2rem] shadow-sm border border-slate-100 hover:border-indigo-500 hover:shadow-md transition-all cursor-pointer group relative overflow-hidden"
                   >
                      <div className="absolute right-0 top-0 w-24 h-24 bg-indigo-50 rounded-full -mr-12 -mt-12 group-hover:bg-indigo-100 transition-colors"></div>
                      
                      <div className="flex justify-between items-start mb-4 relative z-10">
                         <div className="flex items-center space-x-3">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg text-white bg-indigo-600 shadow-md shadow-indigo-200`}>
                               {patient.name[0]}
                            </div>
                            <div>
                               <h4 className="font-bold text-stone-900">{patient.name}</h4>
                               <p className="text-xs text-stone-400 font-bold">{patient.communityHospital}</p>
                            </div>
                         </div>
                         <span className={`text-[10px] font-bold px-2 py-1 rounded-lg border ${patient.riskLevel === 'HIGH' ? 'bg-red-100 text-red-600 border-red-200' : 'bg-yellow-100 text-yellow-700 border-yellow-200'}`}>
                            {patient.riskLevel === 'HIGH' ? '高危预警' : '待诊断'}
                         </span>
                      </div>
                      
                      <div className="bg-slate-50 p-3 rounded-xl mb-3 relative z-10">
                         <p className="text-slate-600 text-sm font-medium line-clamp-2">
                            <span className="text-indigo-600 font-bold">主诉：</span>
                            {patient.chiefComplaint}
                         </p>
                      </div>

                      <div className="flex justify-between items-center relative z-10">
                         <div className="flex items-center space-x-1 text-xs font-bold text-red-500">
                             <Activity size={14} />
                             <span>{patient.uploadedData?.bloodSugar}</span>
                         </div>
                         <button className="flex items-center space-x-1 text-xs bg-indigo-600 text-white px-4 py-2 rounded-xl font-bold group-hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">
                            <span>开始接诊</span>
                            <ArrowRight size={12} />
                         </button>
                      </div>
                   </div>
                ))}
             </div>
          </div>
          
          {/* Quick Tools */}
          <div className="grid grid-cols-2 gap-4">
             <button className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex items-center space-x-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600">
                   <Users size={20} />
                </div>
                <div className="text-left">
                   <p className="font-bold text-stone-900 text-sm">MDT 协作</p>
                   <p className="text-[10px] text-stone-400">多学科会诊</p>
                </div>
             </button>
             <button className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                   <GraduationCap size={20} />
                </div>
                <div className="text-left">
                   <p className="font-bold text-stone-900 text-sm">教学中心</p>
                   <p className="text-[10px] text-stone-400">下发指南</p>
                </div>
             </button>
          </div>
       </div>
    </div>
  );

  const SpecialistConsultationView = () => (
      <div className="fixed inset-0 bg-slate-100 z-[50] flex flex-col animate-in slide-in-from-right duration-300">
         {/* Specialist Header */}
         <div className="bg-indigo-900 text-white p-4 flex justify-between items-center shadow-lg pt-12 pb-6">
            <div className="flex items-center space-x-4">
               <button onClick={() => {setConsultPatient(null); setDiagnosisStep(0); setConsultTab('OVERVIEW');}} className="p-2 bg-white/10 rounded-full hover:bg-white/20">
                  <ChevronLeft size={20} />
               </button>
               <div>
                  <h1 className="text-lg font-bold">瑞金医院 AI 诊疗中心</h1>
                  <p className="text-xs text-indigo-300">远程会诊工作台</p>
               </div>
            </div>
            <div className="flex items-center space-x-2 text-yellow-400 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
               <Activity size={16} />
               <span className="text-xs font-bold">连接中: {consultPatient?.communityHospital}</span>
            </div>
         </div>

         <div className="flex-1 flex overflow-hidden">
             {/* LEFT: Rich Patient Data (Tabs) */}
             <div className="w-1/2 flex flex-col border-r border-slate-200 bg-white">
                 {/* Tabs */}
                 <div className="flex border-b border-slate-100 p-2 space-x-1">
                    {[
                       { id: 'OVERVIEW', label: '全息概览', icon: <User size={14}/> },
                       { id: 'LABS', label: '检验报告', icon: <Microscope size={14}/> },
                       { id: 'IMAGES', label: '影像资料', icon: <ImageIcon size={14}/> },
                       { id: 'MDT', label: '协作记录', icon: <MessageSquare size={14}/> }
                    ].map(tab => (
                       <button 
                          key={tab.id}
                          onClick={() => setConsultTab(tab.id as any)}
                          className={`flex-1 flex items-center justify-center space-x-1.5 py-3 rounded-xl text-xs font-bold transition-all ${consultTab === tab.id ? 'bg-indigo-50 text-indigo-600' : 'text-stone-400 hover:bg-slate-50'}`}
                       >
                          {tab.icon}
                          <span>{tab.label}</span>
                       </button>
                    ))}
                 </div>

                 {/* Content Area */}
                 <div className="flex-1 overflow-y-auto p-6">
                     {consultTab === 'OVERVIEW' && (
                        <div className="space-y-6 animate-in fade-in duration-300">
                           <div className="flex items-center space-x-4">
                              <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-2xl font-black text-indigo-600">
                                 {consultPatient?.name[0]}
                              </div>
                              <div>
                                 <h2 className="text-2xl font-black text-stone-900">{consultPatient?.name}</h2>
                                 <p className="text-stone-500 font-bold text-sm">{consultPatient?.gender} · {consultPatient?.age}岁 · {consultPatient?.communityHospital}</p>
                              </div>
                           </div>

                           <div className="bg-slate-50 p-5 rounded-[2rem] border border-slate-100">
                              <h3 className="font-bold text-stone-900 mb-3 flex items-center"><FileText size={18} className="mr-2 text-indigo-500"/> 社区首诊备注</h3>
                              <p className="text-stone-600 text-sm leading-relaxed bg-white p-4 rounded-xl shadow-sm italic">
                                 "{consultPatient?.uploadedData?.preliminaryCheck}"
                              </p>
                           </div>

                           {/* Vital Trend Chart Mock */}
                           <div className="bg-slate-50 p-5 rounded-[2rem] border border-slate-100">
                              <h3 className="font-bold text-stone-900 mb-4 flex items-center"><TrendingUp size={18} className="mr-2 text-indigo-500"/> 近期血糖趋势</h3>
                              <div className="bg-white p-4 rounded-xl shadow-sm h-32 flex items-end justify-between px-2">
                                 {consultPatient?.uploadedData?.historyTrend?.map((val, i) => (
                                    <div key={i} className="flex flex-col items-center w-8 group relative">
                                       <div className="absolute bottom-full mb-1 text-[10px] font-bold text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">{val}</div>
                                       <div style={{height: `${val * 8}px`}} className="w-full bg-indigo-500 rounded-t-sm opacity-80 hover:opacity-100 transition-opacity"></div>
                                       <span className="text-[10px] text-stone-400 mt-1">{i+1}日</span>
                                    </div>
                                 ))}
                              </div>
                           </div>
                        </div>
                     )}

                     {consultTab === 'LABS' && (
                        <div className="space-y-4 animate-in fade-in duration-300">
                           <h3 className="font-bold text-lg text-stone-900 mb-2">检验结果汇总</h3>
                           <div className="grid grid-cols-1 gap-3">
                              {consultPatient?.uploadedData?.labResults?.map((lab, i) => (
                                 <div key={i} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
                                    <div>
                                       <p className="font-bold text-stone-900">{lab.name}</p>
                                       <p className="text-xs text-stone-400 mt-0.5">参考值: {lab.range}</p>
                                    </div>
                                    <div className="text-right">
                                       <p className={`font-black text-lg ${lab.status === 'CRITICAL' || lab.status === 'HIGH' ? 'text-red-500' : 'text-stone-900'}`}>{lab.value} <span className="text-xs font-normal text-stone-500">{lab.unit}</span></p>
                                       {lab.status !== 'NORMAL' && <span className="text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-bold">{lab.status}</span>}
                                    </div>
                                 </div>
                              ))}
                           </div>
                        </div>
                     )}

                     {consultTab === 'IMAGES' && (
                        <div className="space-y-4 animate-in fade-in duration-300">
                           <h3 className="font-bold text-lg text-stone-900 mb-2">影像资料 (DICOM预览)</h3>
                           {consultPatient?.uploadedData?.images?.length ? (
                              consultPatient.uploadedData.images.map(img => (
                                 <div key={img.id} className="group relative rounded-2xl overflow-hidden shadow-md">
                                    <div className="h-48 bg-stone-900 flex items-center justify-center relative">
                                       {/* Placeholder for Medical Image */}
                                       <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black"></div>
                                       <ImageIcon size={48} className="text-stone-600 group-hover:text-stone-400 transition-colors" />
                                       <p className="absolute bottom-4 left-4 text-white text-xs font-bold">{img.description}</p>
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                                       <button className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-2 rounded-xl font-bold text-sm">点击全屏阅片</button>
                                    </div>
                                 </div>
                              ))
                           ) : (
                              <div className="text-center py-10 text-stone-400 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                                 <ImageIcon size={32} className="mx-auto mb-2 opacity-50"/>
                                 <p className="text-sm">暂无影像上传</p>
                              </div>
                           )}
                        </div>
                     )}
                     
                     {consultTab === 'MDT' && (
                        <div className="flex flex-col h-full items-center justify-center text-stone-400 animate-in fade-in duration-300">
                           <Users size={48} className="mb-4 text-slate-300"/>
                           <p className="font-bold">暂无MDT会诊记录</p>
                           <button className="mt-4 px-6 py-3 bg-white border border-slate-200 shadow-sm rounded-xl text-sm font-bold text-indigo-600 hover:bg-indigo-50">
                              发起多学科会诊
                           </button>
                        </div>
                     )}
                 </div>
             </div>

             {/* RIGHT: Diagnosis Workspace */}
             <div className="w-1/2 bg-slate-50 p-6 flex flex-col shadow-inner relative">
                 {diagnosisStep === 0 ? (
                    <>
                       <div className="flex-1 space-y-6 overflow-y-auto">
                          <h2 className="font-bold text-xl text-stone-900 mb-6 flex items-center">
                             <Stethoscope size={24} className="mr-2 text-indigo-600" />
                             制定诊疗意见
                          </h2>
                          
                          {/* AI Assistant Tool */}
                          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-1 rounded-2xl shadow-lg shadow-indigo-200">
                              <div className="bg-white p-4 rounded-xl relative overflow-hidden group cursor-pointer hover:bg-slate-50 transition-colors">
                                 <div className="flex items-center space-x-2 mb-2">
                                    <Brain size={16} className="text-indigo-600"/>
                                    <span className="font-bold text-sm text-indigo-900">AI 辅助诊断建议</span>
                                 </div>
                                 <div className="text-xs text-stone-500 mb-3 space-y-1">
                                    <p>• 糖化血红蛋白(8.9%) 提示长期控制不佳。</p>
                                    <p>• 尿酮体阳性，存在代谢紊乱风险。</p>
                                    <p className="font-bold text-indigo-600 mt-2">建议：调整为胰岛素强化治疗 + 神经营养修复。</p>
                                 </div>
                                 <button className="text-xs bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-lg font-bold hover:bg-indigo-200 w-full">
                                    一键引用方案
                                 </button>
                              </div>
                          </div>

                          <div className="space-y-4">
                             <div>
                                <label className="block text-xs font-bold text-stone-500 mb-1 ml-1">临床诊断</label>
                                <input type="text" defaultValue="2型糖尿病伴周围神经病变 (酮症倾向)" className="w-full bg-white p-4 rounded-xl font-bold text-stone-900 border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all shadow-sm" />
                             </div>
                             <div>
                                <label className="block text-xs font-bold text-stone-500 mb-1 ml-1">治疗方案 (长期医嘱)</label>
                                <textarea rows={4} defaultValue={`1. 启动短期胰岛素泵强化治疗（建议转入我院住院1周）\n2. 或：门冬胰岛素30注射液，早12u 晚10u 皮下注射\n3. 甲钴胺注射液 0.5mg im qd`} className="w-full bg-white p-4 rounded-xl font-medium text-stone-900 border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all shadow-sm resize-none"></textarea>
                             </div>
                             <div>
                                <label className="block text-xs font-bold text-stone-500 mb-1 ml-1">社区执行指引 (Down-referral)</label>
                                <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
                                   <div className="flex items-center mb-2">
                                      <input type="checkbox" className="w-4 h-4 text-indigo-600 rounded mr-2" defaultChecked />
                                      <span className="text-sm font-bold text-stone-800">委托社区跟进注射与血糖监测</span>
                                   </div>
                                   <textarea rows={2} placeholder="给社区医生的具体操作提示..." className="w-full bg-white p-2 rounded-lg text-xs text-stone-600 border border-yellow-200 outline-none"></textarea>
                                </div>
                             </div>
                          </div>
                       </div>

                       <div className="border-t border-slate-200 pt-5 mt-4">
                          <div className="flex items-center justify-between mb-4">
                             <span className="text-xs font-bold text-stone-400">签署医师</span>
                             <span className="text-sm font-bold text-stone-900">刘晓静 (副主任医师)</span>
                          </div>
                          <button 
                             onClick={() => setDiagnosisStep(1)}
                             className="w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl text-lg shadow-xl shadow-indigo-600/30 flex items-center justify-center space-x-2 hover:bg-indigo-700 hover:scale-[1.02] transition-all"
                          >
                             <Send size={18} />
                             <span>签署并下发意见书</span>
                          </button>
                       </div>
                    </>
                 ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center animate-in zoom-in">
                       <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-green-200">
                          <CheckCircle size={48} className="text-white" />
                       </div>
                       <h2 className="text-2xl font-black text-stone-900 mb-2">已反馈至患者端</h2>
                       <p className="text-stone-500 text-sm mb-8 max-w-xs">
                          联合诊疗意见书已生成，并同步至浦江社区卫生服务中心系统。
                       </p>
                       <button 
                          onClick={() => {setConsultPatient(null); setDiagnosisStep(0); setConsultTab('OVERVIEW');}}
                          className="px-8 py-3 bg-white border border-stone-200 text-stone-600 font-bold rounded-2xl shadow-sm hover:bg-stone-50"
                       >
                          处理下一个
                       </button>
                    </div>
                 )}
             </div>
         </div>
      </div>
  );

  // =================================================================================
  // MAIN RENDER SWITCH
  // =================================================================================

  if (activeTab === 'DOCTOR_PROFILE') {
      // Simple profile fallback
      return (
        <div className="p-5 max-w-md mx-auto space-y-4">
            <h1 className="text-2xl font-black text-stone-900">个人中心</h1>
            <div className="bg-white p-6 rounded-[2rem] shadow-sm flex items-center space-x-4">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${doctorType === 'COMMUNITY' ? 'bg-orange-100 text-orange-600' : 'bg-indigo-100 text-indigo-600'}`}>
                    <User size={30} />
                </div>
                <div>
                    <h2 className="font-bold text-lg text-stone-900">{doctorType === 'COMMUNITY' ? MOCK_DOCTOR_USER.name : '刘晓静'}</h2>
                    <p className="text-stone-500 text-sm font-medium">{doctorType === 'COMMUNITY' ? MOCK_DOCTOR_USER.hospital : '瑞金医院 · 内分泌科'}</p>
                </div>
            </div>
            
            <div className="bg-white rounded-[2rem] p-2 space-y-1">
                <button className="w-full text-left p-4 rounded-2xl hover:bg-stone-50 font-bold text-stone-700">排班管理</button>
                <button className="w-full text-left p-4 rounded-2xl hover:bg-stone-50 font-bold text-stone-700">历史执行记录</button>
                <button className="w-full text-left p-4 rounded-2xl hover:bg-stone-50 font-bold text-stone-700">设置</button>
            </div>
        </div>
      );
  }

  // Route to appropriate dashboard
  if (doctorType === 'COMMUNITY') {
      if (activeTab === 'SCANNER') {
         // ... Keeping the scanner simple/same as before but maybe adjusting colors ...
         if (scanState === 'IDLE') return (
             <div className="h-full flex flex-col bg-stone-900 relative">
                 <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-8 relative overflow-hidden">
                     <div className="absolute inset-0 opacity-20 bg-gradient-to-b from-orange-500 to-purple-900"></div>
                     <div className="w-72 h-72 border-2 border-orange-500 rounded-[2rem] relative flex items-center justify-center z-10 box-border">
                        <div className="w-full h-0.5 bg-orange-500 shadow-[0_0_20px_#f97316] absolute top-1/2 animate-[ping_2s_infinite]"></div>
                     </div>
                     <div className="z-10 text-center">
                        <p className="text-white font-bold text-lg mb-2">核验就诊码</p>
                        <p className="text-stone-400 text-sm">请患者出示就诊凭证二维码</p>
                     </div>
                     <button onClick={() => setScanState('SCANNING')} className="z-10 bg-orange-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:scale-105 transition-transform">点击模拟扫码</button>
                 </div>
             </div>
         );
         if (scanState === 'SCANNING') return (
             <div className="h-full bg-stone-900 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 border-4 border-stone-800 border-t-orange-500 rounded-full animate-spin mb-6"></div>
                <div className="text-orange-500 font-bold text-xl">正在读取数据...</div>
                {setTimeout(() => setScanState('DETECTED'), 1000) && null} 
             </div>
         );
         if (scanState === 'DETECTED') return (
            <div className="flex flex-col h-full bg-white">
               {/* Detailed View Logic Reuse or Simplified */}
               <div className="bg-orange-500 text-white p-6 rounded-b-[2.5rem] shadow-xl relative z-10">
                   <button onClick={() => setScanState('IDLE')} className="absolute top-6 left-4 p-2 bg-white/10 rounded-full"><ChevronLeft size={20}/></button>
                   <div className="flex items-center space-x-4 mt-8">
                      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-orange-600 font-black text-2xl">{MOCK_USER.name[0]}</div>
                      <div>
                         <h2 className="text-2xl font-black">{MOCK_USER.name}</h2>
                         <p className="text-orange-100 text-sm font-bold">待执行: 甲钴胺注射液</p>
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

      // Default Workbench
      return <RenderCommunityDashboard />;
  }

  // Specialist Routing
  if (doctorType === 'SPECIALIST') {
      if (consultPatient) return <SpecialistConsultationView />;
      return <RenderSpecialistDashboard />;
  }

  return null;
};

export default DoctorView;
