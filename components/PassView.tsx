
import React from 'react';
import { QrCode, MapPin, Clock, Calendar, Syringe, User, Building2, Activity, Navigation } from 'lucide-react';
import { MOCK_APPOINTMENT, MOCK_USER } from '../constants';
import { JourneyStep } from '../types';

interface PassViewProps {
  journeyStep: JourneyStep;
}

const PassView: React.FC<PassViewProps> = ({ journeyStep }) => {
  const apt = MOCK_APPOINTMENT;

  // Determine Ticket Content based on Journey Step
  const isCheckup = journeyStep === 'CHECKUP_BOOKED' || journeyStep === 'PAYMENT_PENDING' || journeyStep === 'ANALYZING';
  
  const ticketTitle = isCheckup ? '常规检查 + 档案上传' : apt.project;
  const ticketDept = isCheckup ? '全科门诊' : apt.department;
  const ticketIcon = isCheckup ? <Activity size={12} className="mr-1"/> : <Syringe size={12} className="mr-1"/>;
  const ticketColor = isCheckup ? 'bg-[#bef264]' : 'bg-orange-300'; // Different header color for distinction

  return (
    <div className="p-5 h-full flex flex-col justify-start max-w-md mx-auto pb-24 overflow-y-auto no-scrollbar">
      
      <div className="text-center mb-6 mt-2">
        <h1 className="text-2xl font-black text-stone-900">我的就诊凭证</h1>
        <p className="text-stone-500 text-sm font-medium mt-1">到达医院后，请向医护人员出示</p>
      </div>

      {/* Ticket Container */}
      <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden relative animate-in slide-in-from-bottom duration-500 shrink-0">
        
        {/* Header Section */}
        <div className={`${ticketColor} p-6 pb-8 relative transition-colors duration-500`}>
           <div className="flex justify-between items-start">
              <div>
                 <div className="flex items-center space-x-2 text-stone-900 mb-2">
                    <Building2 size={18} />
                    <span className="font-black text-lg">{apt.hospitalName}</span>
                 </div>
                 <div className="flex items-center space-x-3 text-sm font-bold text-stone-800/80">
                    <span className="bg-white/30 px-2 py-1 rounded-lg backdrop-blur-sm">{apt.floor}</span>
                    <span className="bg-white/30 px-2 py-1 rounded-lg backdrop-blur-sm">{ticketDept}</span>
                    <span className="bg-white/30 px-2 py-1 rounded-lg backdrop-blur-sm">{apt.room}</span>
                 </div>
              </div>
              <div className="text-right">
                 <span className="block text-[10px] font-bold text-stone-700 uppercase">序号</span>
                 <span className="block text-3xl font-black text-stone-900">{apt.queueNumber}</span>
              </div>
           </div>
        </div>

        {/* Perforation Effect */}
        <div className="relative h-4 bg-white -mt-2">
            <div className="absolute top-0 left-0 w-4 h-4 bg-[#F2F5E8] rounded-full -ml-2 -mt-2"></div>
            <div className="absolute top-0 right-0 w-4 h-4 bg-[#F2F5E8] rounded-full -mr-2 -mt-2"></div>
            <div className="absolute top-0 left-4 right-4 border-t-2 border-dashed border-stone-300"></div>
        </div>

        {/* Body Section */}
        <div className="p-6 pt-2 space-y-6">
           
           {/* Info Grid */}
           <div className="grid grid-cols-2 gap-y-4 gap-x-2">
              <div>
                 <p className="text-xs text-stone-400 font-bold mb-1 flex items-center"><User size={12} className="mr-1"/> 就诊人</p>
                 <p className="font-bold text-stone-900">{MOCK_USER.name}</p>
              </div>
              <div>
                 <p className="text-xs text-stone-400 font-bold mb-1 flex items-center">{ticketIcon} 项目</p>
                 <p className="font-bold text-stone-900 truncate">{ticketTitle}</p>
              </div>
              <div>
                 <p className="text-xs text-stone-400 font-bold mb-1 flex items-center"><Calendar size={12} className="mr-1"/> 日期</p>
                 <p className="font-bold text-stone-900">{isCheckup ? '今天' : apt.date.split(' ')[0]}</p>
              </div>
              <div>
                 <p className="text-xs text-stone-400 font-bold mb-1 flex items-center"><Clock size={12} className="mr-1"/> 时间段</p>
                 <p className="font-bold text-stone-900">{isCheckup ? '09:00 - 09:30' : apt.timeSlot}</p>
              </div>
           </div>

           {/* QR Code */}
           <div className="bg-stone-900 rounded-3xl p-6 flex flex-col items-center justify-center relative group cursor-pointer shadow-inner">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
              <div className="bg-white p-2 rounded-xl mb-3 relative z-10">
                 <QrCode size={140} className="text-stone-900" />
              </div>
              <p className="text-[#bef264] text-xs font-bold tracking-widest uppercase animate-pulse">Scan to Verify</p>
              
              {/* Scan Line Animation */}
              <div className="absolute top-6 left-10 right-10 h-0.5 bg-[#bef264] shadow-[0_0_10px_#bef264] animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
           </div>

           <div className="text-center">
              <p className="text-xs text-stone-400 font-medium">凭此码可直接在护士站/诊室扫码报到</p>
              <p className="text-xs text-stone-300 mt-1">ID: {apt.id}</p>
           </div>
        </div>
      </div>

      {/* --- ENRICHMENT: NAVIGATION GUIDE --- */}
      <div className="mt-6 bg-white rounded-[2rem] p-5 shadow-sm border border-stone-100 animate-in slide-in-from-bottom duration-700 delay-100">
         <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-stone-900 flex items-center">
               <Navigation size={18} className="mr-2 text-stone-400" />
               院内指引
            </h3>
            <span className="text-[10px] bg-stone-100 text-stone-500 px-2 py-1 rounded-lg font-bold">1F 平面图</span>
         </div>
         
         <div className="bg-[#F2F5E8] rounded-2xl h-32 relative overflow-hidden flex items-center justify-center border border-stone-200">
            {/* Abstract Map Visual */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]"></div>
            
            {/* Rooms */}
            <div className="absolute left-4 top-4 w-20 h-16 bg-white border-2 border-stone-300 rounded-lg flex items-center justify-center text-[10px] font-bold text-stone-400">药房</div>
            <div className="absolute right-4 top-4 w-24 h-24 bg-white border-2 border-[#bef264] rounded-lg flex flex-col items-center justify-center shadow-lg">
               <span className="text-xs font-bold text-stone-900">{ticketDept}</span>
               <div className="text-[10px] text-stone-500 mt-1">{apt.room}</div>
               <div className="absolute -bottom-1 w-2 h-2 bg-[#bef264] rotate-45"></div>
            </div>
            
            {/* Path */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
               <path d="M 40 100 Q 80 100 150 60" fill="none" stroke="#bef264" strokeWidth="4" strokeDasharray="4 4" className="animate-[dash_1s_linear_infinite]" />
            </svg>
         </div>

         <div className="mt-4 flex justify-between text-xs font-bold text-stone-500">
            <div className="flex items-center"><div className="w-2 h-2 bg-stone-300 rounded-full mr-2"></div>进门直行</div>
            <div className="flex items-center"><div className="w-2 h-2 bg-stone-300 rounded-full mr-2"></div>右转大厅</div>
            <div className="flex items-center text-stone-900"><div className="w-2 h-2 bg-[#bef264] rounded-full mr-2"></div>{apt.room}</div>
         </div>
      </div>
    </div>
  );
};

export default PassView;
