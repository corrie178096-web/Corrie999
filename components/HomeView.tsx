
import React, { useState, useEffect } from 'react';
import { Bell, Activity, Syringe, Check, MapPin, QrCode, X, Sun, Thermometer, Bot, ChevronDown, CalendarPlus, UserPlus, ArrowRight, FileText, CheckCircle, CreditCard, Loader2, ScanFace, Shield, CloudCog, TrendingUp, TrendingDown, Minus, BookOpen, Pill, MessageSquare, Headphones } from 'lucide-react';
import { MOCK_REMINDERS, MOCK_USER, MOCK_HOSPITALS, MOCK_RECORDS, MOCK_VITALS, MOCK_ARTICLES } from '../constants';
import { Tab, JourneyStep } from '../types';

interface HomeViewProps {
  onChangeTab: (tab: Tab) => void;
  journeyStep: JourneyStep;
  setJourneyStep: (step: JourneyStep) => void;
}

const VitalsCard = () => (
  <div className="bg-white rounded-[2rem] p-5 shadow-sm border border-stone-100 space-y-4">
      <div className="flex justify-between items-center">
         <h3 className="font-bold text-stone-900 flex items-center">
            <Activity size={18} className="mr-2 text-stone-400" />
            健康数据监测
         </h3>
         <button className="text-[10px] bg-stone-100 text-stone-500 px-2 py-1 rounded-lg font-bold">更新</button>
      </div>
      <div className="grid grid-cols-2 gap-4">
         {MOCK_VITALS.map((vital, idx) => (
            <div key={idx} className="bg-[#F2F5E8] rounded-2xl p-4 relative overflow-hidden">
               <div className="flex justify-between items-start mb-2">
                  <span className="text-xs text-stone-500 font-bold">{vital.type === 'SUGAR' ? '空腹血糖' : '血压'}</span>
                  {vital.trend === 'STABLE' ? <Minus size={14} className="text-green-500"/> : 
                   vital.trend === 'UP' ? <TrendingUp size={14} className="text-orange-500"/> : <TrendingDown size={14} className="text-blue-500"/>}
               </div>
               <div className="flex items-baseline space-x-1">
                  <span className={`text-2xl font-black ${vital.status === 'HIGH' ? 'text-orange-500' : 'text-stone-900'}`}>{vital.value}</span>
                  <span className="text-[10px] text-stone-400 font-bold">{vital.unit}</span>
               </div>
               <p className="text-[10px] text-stone-400 mt-2">{vital.lastMeasured}</p>
            </div>
         ))}
      </div>
  </div>
);

const QuickActions = () => (
  <div className="flex space-x-4 overflow-x-auto no-scrollbar py-2">
     {[
       { icon: <Pill size={20} />, label: "我的用药", color: "text-blue-500", bg: "bg-blue-50" },
       { icon: <FileText size={20} />, label: "检验报告", color: "text-purple-500", bg: "bg-purple-50" },
       { icon: <MessageSquare size={20} />, label: "在线咨询", color: "text-green-500", bg: "bg-green-50" },
       { icon: <Headphones size={20} />, label: "专属客服", color: "text-orange-500", bg: "bg-orange-50" },
     ].map((action, i) => (
       <button key={i} className="flex flex-col items-center space-y-2 min-w-[70px]">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${action.bg} ${action.color} shadow-sm active:scale-95 transition-transform`}>
             {action.icon}
          </div>
          <span className="text-[10px] font-bold text-stone-600">{action.label}</span>
       </button>
     ))}
  </div>
);

const HealthFeed = () => (
  <div className="space-y-4">
     <div className="flex justify-between items-center px-1">
        <h3 className="font-bold text-lg text-stone-900">健康百科</h3>
        <span className="text-xs text-stone-400 font-bold">为您推荐</span>
     </div>
     <div className="space-y-3">
        {MOCK_ARTICLES.map(article => (
           <div key={article.id} className="bg-white p-4 rounded-[1.5rem] shadow-sm flex justify-between items-center border border-stone-50 active:scale-[0.98] transition-transform">
              <div>
                 <span className="text-[10px] text-[#bef264] bg-stone-900 px-2 py-0.5 rounded font-bold">{article.category}</span>
                 <h4 className="font-bold text-stone-900 mt-2 text-sm">{article.title}</h4>
                 <p className="text-[10px] text-stone-400 mt-1">{article.readCount} 人已阅读</p>
              </div>
              <div className="w-16 h-16 bg-stone-100 rounded-xl flex items-center justify-center text-stone-300">
                 <BookOpen size={24} />
              </div>
           </div>
        ))}
     </div>
  </div>
);

const MascotBubble: React.FC<{ message: string, onClick?: () => void, actionText?: string }> = ({ message, onClick, actionText }) => (
  <div className="flex items-end space-x-3 mb-6 animate-in slide-in-from-left duration-500">
    <div className="relative">
        <div className="w-16 h-16 bg-stone-900 rounded-2xl flex items-center justify-center shadow-xl shadow-stone-900/20 transform hover:-translate-y-1 transition-transform duration-300">
            <Bot size={40} className="text-[#bef264]" />
        </div>
        <div className="text-[10px] text-center font-bold text-stone-400 mt-1">医医 YiYi</div>
    </div>
    <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-stone-100 max-w-[75%] relative">
        <p className="text-sm font-bold text-stone-800 leading-relaxed">{message}</p>
        {actionText && onClick && (
          <button onClick={onClick} className="mt-2 text-xs font-bold text-[#bef264] bg-stone-900 px-3 py-1.5 rounded-lg flex items-center space-x-1">
            <span>{actionText}</span>
            <ArrowRight size={12} />
          </button>
        )}
    </div>
  </div>
);

const HomeView: React.FC<HomeViewProps> = ({ onChangeTab, journeyStep, setJourneyStep }) => {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingType, setBookingType] = useState<'GENERAL' | 'TREATMENT'>('GENERAL');
  const [showDiagnosisReport, setShowDiagnosisReport] = useState(false);
  const [bindStep, setBindStep] = useState(0); 

  useEffect(() => {
    if (journeyStep === 'REPORT_READY') {
      setShowDiagnosisReport(true);
    }
  }, [journeyStep]);

  const nearbyHospital = MOCK_HOSPITALS.find(h => h.id === 'h1'); 

  const handleBookClick = (type: 'GENERAL' | 'TREATMENT') => {
    setBookingType(type);
    setShowBookingModal(true);
  };

  const confirmBooking = () => {
    setShowBookingModal(false);
    if (bookingType === 'GENERAL') setJourneyStep('CHECKUP_BOOKED');
  };

  const handlePayment = () => {
    setJourneyStep('ANALYZING');
    setTimeout(() => setJourneyStep('REPORT_READY'), 2000);
  };

  const handleAcceptPlan = () => {
    setShowDiagnosisReport(false);
    setJourneyStep('TREATMENT_ACTIVE');
  };

  if (journeyStep === 'ONBOARDING') {
     return (
        <div className="h-full bg-[#F2F5E8] animate-in fade-in duration-700">
           {bindStep === 0 && (
             <div className="h-full flex flex-col items-center justify-center p-8 text-center space-y-8">
                <div className="w-32 h-32 bg-stone-900 rounded-[2.5rem] flex items-center justify-center shadow-2xl relative">
                    <Bot size={64} className="text-[#bef264]" />
                </div>
                <div>
                   <h1 className="text-3xl font-black text-stone-900 mb-2">欢迎, {MOCK_USER.name}</h1>
                   <p className="text-stone-500 font-medium">完善您的健康数字档案，开启智能分级诊疗服务。</p>
                </div>
                <button onClick={() => setBindStep(1)} className="w-full max-w-sm py-4 bg-stone-900 text-[#bef264] font-bold rounded-[2rem] text-lg shadow-xl">开始绑定档案</button>
             </div>
           )}
           {bindStep === 1 && (
              <div className="h-full flex flex-col items-center justify-center p-8 animate-in slide-in-from-right">
                 <h2 className="text-2xl font-black text-stone-900 mb-2 text-center">身份核验</h2>
                 <div className="relative w-64 h-64 my-12">
                    <div className="absolute inset-0 border-4 border-stone-200 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-[#bef264] rounded-full border-t-transparent animate-spin"></div>
                    <div className="absolute inset-4 rounded-full overflow-hidden bg-stone-100 flex items-center justify-center">
                       <ScanFace size={100} className="text-stone-300" />
                    </div>
                 </div>
                 <button onClick={() => setBindStep(2)} className="w-full max-w-xs py-4 bg-[#bef264] text-stone-900 font-bold rounded-[2rem] text-lg shadow-lg">开始人脸识别</button>
              </div>
           )}
           {bindStep === 2 && (
              <div className="h-full flex flex-col items-center justify-center p-8 text-center space-y-4">
                 <Loader2 size={48} className="text-[#bef264] animate-spin mb-4" />
                 <h2 className="text-xl font-bold text-stone-900">正在同步健康云数据...</h2>
                 <button onClick={() => setJourneyStep('HOME_DEFAULT')} className="text-stone-400 text-xs mt-8">跳过演示</button>
              </div>
           )}
        </div>
     );
  }

  return (
    <div className="space-y-6 p-5 max-w-md mx-auto relative pb-20 animate-in fade-in duration-500">
      
      {showDiagnosisReport && (
        <div className="fixed inset-0 bg-stone-100 z-[300] overflow-y-auto animate-in slide-in-from-bottom duration-500">
           <div className="max-w-md mx-auto min-h-screen bg-white shadow-2xl relative flex flex-col">
              <div className="bg-[#1c1917] text-white p-6 pb-12">
                 <div className="flex justify-between items-start">
                    <div>
                       <h2 className="text-xl font-bold">三甲-社区联合诊疗意见书</h2>
                       <p className="text-xs text-stone-400 mt-1 uppercase">Joint Diagnosis Report</p>
                    </div>
                 </div>
              </div>
              <div className="px-6 py-8 -mt-6 bg-white rounded-t-[2rem] flex-1 space-y-8">
                  <div>
                     <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">临床诊断</h3>
                     <div className="bg-red-50 border-l-4 border-red-500 p-4">
                        <p className="text-xl font-black text-stone-900">2型糖尿病</p>
                        <p className="text-stone-600 mt-1">伴周围神经病变</p>
                     </div>
                  </div>
                  <div>
                     <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">治疗方案</h3>
                     <div className="space-y-4">
                        <div className="flex items-start">
                           <div className="w-6 h-6 rounded-full bg-stone-900 text-white flex items-center justify-center text-xs font-bold mr-3 mt-0.5">1</div>
                           <p className="text-sm font-bold text-stone-900">二甲双胍 0.5g，每日一次</p>
                        </div>
                        <div className="flex items-start">
                           <div className="w-6 h-6 rounded-full bg-[#bef264] text-stone-900 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">2</div>
                           <p className="text-sm font-bold text-stone-900">新增注射治疗：甲钴胺 (每两周一次)</p>
                        </div>
                     </div>
                  </div>
              </div>
              <div className="p-5 border-t border-stone-100">
                  <button onClick={handleAcceptPlan} className="w-full bg-[#bef264] text-stone-900 font-bold py-4 rounded-[2rem] text-lg shadow-lg">确认方案并同步至社区医院</button>
              </div>
           </div>
        </div>
      )}

      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-stone-900">早安, {MOCK_USER.name}</h1>
          <p className="text-sm text-stone-500 mt-0.5">今天感觉怎么样？</p>
        </div>
        <button className="p-3 bg-white rounded-full shadow-sm border border-stone-100"><Bell size={20} className="text-stone-700" /></button>
      </header>

      <VitalsCard />
      <QuickActions />

      <section className="space-y-6">
         {journeyStep === 'HOME_DEFAULT' && <MascotBubble message="档案同步完成！如果有身体不适，可以点击下方预约挂号去社区医院做个检查。🏥" />}
         
         {journeyStep === 'PAYMENT_PENDING' && (
            <div className="bg-white border-2 border-red-100 rounded-[2rem] p-6 shadow-sm">
               <h3 className="font-bold text-lg text-stone-900 mb-4">待支付检查费用</h3>
               <div className="flex justify-between items-baseline border-b border-stone-100 pb-4 mb-4">
                  <span className="text-stone-500 text-sm">检查检验费</span>
                  <span className="text-2xl font-black text-stone-900">¥ 50.00</span>
               </div>
               <button onClick={handlePayment} className="w-full bg-[#1677FF] text-white font-bold py-3.5 rounded-xl">一键医保支付</button>
            </div>
         )}

         {journeyStep === 'ANALYZING' && (
            <div className="bg-white rounded-[2rem] p-8 text-center shadow-sm border border-stone-100">
                <Loader2 size={32} className="mx-auto text-[#bef264] animate-spin mb-4" />
                <h3 className="font-bold text-lg text-stone-900">正在等待瑞金医院诊断反馈...</h3>
                <p className="text-stone-500 text-sm mt-2">数据已上传至 3A 医院 AI 诊疗中心</p>
            </div>
         )}

         {journeyStep === 'TREATMENT_ACTIVE' && (
            <div className="bg-[#1c1917] rounded-[2rem] p-6 text-white shadow-xl relative overflow-hidden">
               <div className="flex items-start">
                 <div className="p-3.5 bg-stone-800 rounded-2xl mr-4 border border-stone-700">
                   <Syringe size={28} className="text-[#bef264]" />
                 </div>
                 <div className="flex-1">
                   <h3 className="font-bold text-xl text-[#f2f5e8]">本周注射任务</h3>
                   <p className="text-stone-400 text-sm mt-1">甲钴胺注射液 • 瑞金医院医嘱</p>
                   <p className="text-[#bef264] text-xs mt-2 font-bold flex items-center"><MapPin size={12} className="mr-1" /> 浦江社区卫生服务中心</p>
                   <button onClick={() => handleBookClick('TREATMENT')} className="mt-5 w-full bg-[#bef264] text-stone-900 text-sm font-bold py-3.5 rounded-xl">预约社区执行</button>
                 </div>
               </div>
            </div>
         )}
      </section>

      <div className="grid grid-cols-2 gap-3">
          <button onClick={() => handleBookClick('GENERAL')} className="bg-white p-5 rounded-[2rem] shadow-sm flex flex-col items-start h-40 justify-between">
              <div className="w-12 h-12 rounded-2xl bg-lime-100 flex items-center justify-center text-lime-600"><CalendarPlus size={24} /></div>
              <h3 className="font-bold text-lg text-stone-900">预约挂号</h3>
          </button>
          <button onClick={() => onChangeTab(Tab.RECORDS)} className="bg-white p-5 rounded-[2rem] shadow-sm flex flex-col items-start h-40 justify-between">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600"><Activity size={24} /></div>
              <h3 className="font-bold text-lg text-stone-900">一键转档</h3>
          </button>
      </div>

      <HealthFeed />

      {showBookingModal && (
        <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-md z-[100] flex items-end justify-center">
          <div className="bg-white w-full max-w-md rounded-t-[2.5rem] p-6 animate-in slide-in-from-bottom">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black text-stone-900">{bookingType === 'TREATMENT' ? '预约治疗' : '预约挂号'}</h2>
              <button onClick={() => setShowBookingModal(false)} className="p-2 bg-stone-100 rounded-full"><X size={20} /></button>
            </div>
            <div className="space-y-4 mb-8">
              <div className="p-4 bg-[#F2F5E8] rounded-[2rem] border-2 border-[#bef264]">
                 <p className="text-xs text-stone-500 font-bold">智能推荐机构</p>
                 <div className="text-lg font-bold text-stone-900 mt-1">{nearbyHospital?.name}</div>
              </div>
              <button onClick={confirmBooking} className="w-full bg-[#bef264] text-stone-900 font-bold py-4 rounded-[2rem] text-lg shadow-lg">确认预约</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeView;
