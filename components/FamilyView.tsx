
import React, { useState } from 'react';
import { User, Heart, Calendar, Activity, Bell, ChevronRight, Check } from 'lucide-react';
import { MOCK_FAMILY_USER, MOCK_USER } from '../constants';

const FamilyView: React.FC<{ activeTab: string }> = ({ activeTab }) => {
  const mom = MOCK_USER; 
  const [bookingStatus, setBookingStatus] = useState<'IDLE' | 'BOOKING' | 'SUCCESS'>('IDLE');

  const handleRemoteBook = () => {
    setBookingStatus('BOOKING');
    setTimeout(() => setBookingStatus('SUCCESS'), 1500);
  };

  if (activeTab === 'FAMILY_HOME') {
    return (
      <div className="p-5 max-w-md mx-auto space-y-6">
         <header className="flex justify-between items-center">
            <div>
               <h1 className="text-2xl font-black text-stone-900">家属关怀模式</h1>
               <p className="text-sm text-stone-600 font-bold mt-1">当前关注: {mom.name} (母亲)</p>
            </div>
            <div className="w-10 h-10 bg-[#bef264] rounded-full flex items-center justify-center text-stone-900 font-bold border-2 border-white shadow-sm">
               {MOCK_FAMILY_USER.avatar}
            </div>
         </header>

         {/* Mom's Status Card */}
         <div className="bg-stone-900 rounded-[2.5rem] p-6 text-white relative overflow-hidden shadow-xl shadow-stone-900/30">
             <div className="absolute right-0 top-0 w-40 h-40 bg-[#bef264] rounded-full blur-[50px] opacity-10"></div>
             
             <div className="flex items-center space-x-4 mb-6 relative z-10">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-2xl font-black backdrop-blur-sm border border-white/10">
                   {mom.name[0]}
                </div>
                <div>
                   <h2 className="text-xl font-bold">妈妈的健康状态</h2>
                   <div className="flex items-center text-xs font-bold text-[#bef264] mt-2 bg-white/10 px-3 py-1 rounded-lg w-fit">
                      <Activity size={12} className="mr-1.5" />
                      今日已服药
                   </div>
                </div>
             </div>

             <div className="space-y-4 relative z-10">
                {/* Dynamic Action Area based on Booking Status */}
                {bookingStatus === 'IDLE' && (
                    <div className="bg-stone-800 p-4 rounded-2xl flex justify-between items-center border border-stone-700">
                        <div>
                            <p className="text-xs text-stone-400 font-bold mb-1">本周四 (后天)</p>
                            <p className="font-bold text-white">营养神经注射</p>
                        </div>
                        <button 
                            onClick={handleRemoteBook}
                            className="bg-[#bef264] text-stone-900 text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-lime-400 transition-colors"
                        >
                            一键代预约
                        </button>
                    </div>
                )}

                {bookingStatus === 'BOOKING' && (
                    <div className="bg-stone-800 p-4 rounded-2xl flex justify-center items-center h-[72px]">
                        <div className="w-5 h-5 border-2 border-[#bef264] border-t-transparent rounded-full animate-spin mr-3"></div>
                        <span className="text-sm font-bold text-stone-300">正在同步医院号源...</span>
                    </div>
                )}

                {bookingStatus === 'SUCCESS' && (
                    <div className="bg-[#bef264] p-4 rounded-2xl flex justify-between items-center h-[72px]">
                        <div className="flex items-center text-stone-900">
                           <Check size={20} className="mr-2" strokeWidth={3} />
                           <div>
                              <p className="font-black text-sm">已预约成功</p>
                              <p className="text-xs font-medium">通知已发送至妈妈手机</p>
                           </div>
                        </div>
                    </div>
                )}
             </div>
         </div>

         {/* Features */}
         <div className="grid grid-cols-2 gap-4">
            <button className="bg-white p-5 rounded-[2rem] text-left shadow-sm hover:bg-stone-50 transition-colors border border-stone-100">
               <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-500 mb-3">
                  <Calendar size={24} />
               </div>
               <h3 className="font-bold text-stone-900">健康日历</h3>
               <p className="text-xs text-stone-500 mt-1">查看就诊计划</p>
            </button>
            <button className="bg-white p-5 rounded-[2rem] text-left shadow-sm hover:bg-stone-50 transition-colors border border-stone-100">
               <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-500 mb-3">
                  <Bell size={24} />
               </div>
               <h3 className="font-bold text-stone-900">用药提醒</h3>
               <p className="text-xs text-stone-500 mt-1">远程设置闹钟</p>
            </button>
         </div>

         {/* Recent Activity */}
         <div>
            <div className="flex justify-between items-end mb-3 px-1">
                <h3 className="font-bold text-lg text-stone-900">最近动态</h3>
                <span className="text-xs font-bold text-stone-500">更多 <ChevronRight size={10} className="inline"/></span>
            </div>
            
            <div className="bg-white p-5 rounded-[2rem] shadow-sm border border-stone-100 space-y-6">
               <div className="flex items-start">
                  <div className="w-2.5 h-2.5 bg-green-500 rounded-full mt-1.5 mr-4 shrink-0 shadow-[0_0_5px_rgba(34,197,94,0.4)]"></div>
                  <div>
                     <p className="text-sm font-bold text-stone-800">血糖测量: 6.8 mmol/L</p>
                     <p className="text-xs text-stone-400 mt-1 font-medium">今天 08:30 · 正常范围</p>
                  </div>
               </div>
               <div className="w-full h-px bg-stone-100"></div>
               <div className="flex items-start">
                  <div className="w-2.5 h-2.5 bg-stone-300 rounded-full mt-1.5 mr-4 shrink-0"></div>
                  <div>
                     <p className="text-sm font-bold text-stone-800">完成复诊预约</p>
                     <p className="text-xs text-stone-400 mt-1 font-medium">昨天 19:00 · 浦江社区医院</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
    );
  }

  // Fallback for profile tab in Family View
  return (
    <div className="p-5 max-w-md mx-auto space-y-4">
        <h1 className="text-2xl font-black text-stone-900">我的信息</h1>
        <div className="bg-white p-6 rounded-[2rem] shadow-sm flex items-center space-x-4">
            <div className="w-16 h-16 bg-[#bef264] rounded-full flex items-center justify-center text-stone-900 font-bold text-xl">
                {MOCK_FAMILY_USER.avatar}
            </div>
            <div>
                <h2 className="font-bold text-lg">{MOCK_FAMILY_USER.name}</h2>
                <p className="text-stone-500 text-sm">已绑定 1 位家人</p>
            </div>
        </div>
    </div>
  );
};

export default FamilyView;
