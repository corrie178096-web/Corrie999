
import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronRight, Settings, Users, Heart, LogOut, Phone, CreditCard, ShieldCheck, Watch, Bluetooth, RefreshCw, Activity, HeartPulse, Thermometer, TrendingUp, Minus } from 'lucide-react';
import { MOCK_USER, MOCK_REMINDERS, MOCK_VITALS } from '../constants';
import { AuthMethod } from '../types';

// --- Plan View --- (保持不变，或小调以适应风格)
export const PlanView: React.FC = () => {
  const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  const today = new Date().getDay() - 1; 

  return (
    <div className="p-6 max-w-md mx-auto space-y-6">
      <header className="flex justify-between items-end pt-4">
        <h1 className="text-3xl font-black text-stone-900">健康日历</h1>
        <p className="text-xs text-stone-900 font-black bg-[#bef264] px-4 py-2 rounded-full uppercase tracking-widest">Oct 2024</p>
      </header>

      {/* Calendar Strip */}
      <div className="flex justify-between bg-white p-6 rounded-[2.5rem] shadow-sm border border-stone-100">
        {days.map((day, idx) => {
          const isToday = idx === (today < 0 ? 6 : today); 
          return (
            <div key={day} className={`flex flex-col items-center justify-center w-11 h-20 rounded-3xl transition-all ${isToday ? 'bg-stone-900 text-[#bef264] shadow-xl shadow-stone-300 scale-110' : 'text-stone-300'}`}>
              <span className="text-[10px] mb-2 font-black uppercase">{day.replace('周', '')}</span>
              <span className={`text-lg font-black ${isToday ? 'text-[#bef264]' : 'text-stone-800'}`}>{24 + idx}</span>
            </div>
          )
        })}
      </div>

      <div className="space-y-4">
        <h2 className="font-black text-stone-900 text-xl px-2">今日任务</h2>
         <div className="flex items-start p-6 bg-white rounded-[2.5rem] border border-stone-100 opacity-50">
             <div className="mr-6 pt-1">
                <span className="text-xs font-black text-stone-400">08:00</span>
             </div>
             <div>
               <h3 className="font-black text-stone-500 line-through">口服二甲双胍</h3>
               <p className="text-[10px] font-black text-stone-300 uppercase tracking-widest mt-1">已完成 • 早餐后</p>
             </div>
        </div>
      </div>
    </div>
  );
};

// --- Profile View ---
interface ProfileViewProps {
  onLogout: () => void;
  authMethod?: AuthMethod;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ onLogout, authMethod }) => {
  const [deviceState, setDeviceState] = useState<'DISCONNECTED' | 'CONNECTING' | 'CONNECTED'>('DISCONNECTED');

  const handleConnect = () => {
    setDeviceState('CONNECTING');
    setTimeout(() => {
      setDeviceState('CONNECTED');
    }, 2500);
  };

  return (
    <div className="bg-[#f2f5e8]/30 min-h-full pb-28">
      {/* 仿参考图的个人信息头部 */}
      <section className="bg-stone-900 pt-20 pb-24 px-8 rounded-b-[3.5rem] relative overflow-hidden shadow-2xl">
         <div className="absolute top-0 right-0 w-64 h-64 bg-[#bef264]/10 rounded-full blur-[80px] -mr-32 -mt-32"></div>
         
         <div className="flex items-center space-x-6 relative z-10 max-w-md mx-auto">
           <div className="w-24 h-24 rounded-[2.5rem] bg-[#bef264] text-stone-900 flex items-center justify-center text-4xl font-black shadow-xl shadow-stone-900/40 transform -rotate-3 ring-4 ring-stone-800">
             {MOCK_USER.name[0]}
           </div>
           <div className="space-y-1">
             <h1 className="text-3xl font-black text-white tracking-tight">{MOCK_USER.name}</h1>
             <div className="bg-stone-800 px-3 py-1 rounded-full inline-flex items-center space-x-2 border border-stone-700">
                <ShieldCheck size={12} className="text-[#bef264]" />
                <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">已实名认证</span>
             </div>
           </div>
         </div>
      </section>

      <div className="px-6 -mt-16 max-w-md mx-auto space-y-6">
        
        {/* 核心改动：智能设备监测区 */}
        <section className="bg-white p-6 rounded-[2.5rem] shadow-xl border border-stone-50">
           <div className="flex justify-between items-center mb-6">
              <h3 className="font-black text-stone-900 tracking-tight flex items-center">
                 <Watch size={20} className="mr-2 text-stone-300" />
                 智能健康监测
              </h3>
              {deviceState === 'CONNECTED' && (
                 <span className="flex h-2 w-2 relative">
                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                   <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                 </span>
              )}
           </div>

           {deviceState === 'DISCONNECTED' && (
              <div className="py-4 text-center space-y-4">
                 <div className="w-20 h-20 bg-stone-50 rounded-[2rem] flex items-center justify-center mx-auto text-stone-200">
                    <Bluetooth size={40} />
                 </div>
                 <p className="text-xs text-stone-400 font-bold leading-relaxed px-4">同步您的智能手表数据，实时掌握血糖与心率波动。</p>
                 <button 
                   onClick={handleConnect}
                   className="w-full bg-stone-900 text-[#bef264] py-4 rounded-[1.5rem] font-black text-sm uppercase tracking-widest shadow-lg shadow-stone-100"
                 >
                   开始蓝牙连接
                 </button>
              </div>
           )}

           {deviceState === 'CONNECTING' && (
              <div className="py-12 flex flex-col items-center justify-center space-y-6">
                 <div className="graphic-loader w-20 h-20">
                    <div className="graphic-loader-content">
                       <Watch size={32} className="text-[#bef264]" />
                    </div>
                 </div>
                 <p className="text-sm font-black text-stone-900 animate-pulse uppercase tracking-widest">正在搜索邻近设备...</p>
              </div>
           )}

           {deviceState === 'CONNECTED' && (
              <div className="grid grid-cols-2 gap-4 animate-in zoom-in duration-500">
                 {MOCK_VITALS.map((vital, idx) => (
                    <div key={idx} className={`p-5 rounded-[2rem] relative overflow-hidden ${vital.status === 'HIGH' ? 'bg-orange-50 border-orange-100' : 'bg-[#F2F5E8] border-[#bef264]/20'} border`}>
                       <div className="flex justify-between items-start mb-4">
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${vital.status === 'HIGH' ? 'bg-white text-orange-500' : 'bg-white text-stone-900'} shadow-sm`}>
                             {vital.type === 'SUGAR' ? <Thermometer size={16} /> : <Activity size={16} />}
                          </div>
                          {vital.trend === 'UP' ? <TrendingUp size={14} className="text-orange-400"/> : <Minus size={14} className="text-stone-300"/>}
                       </div>
                       <div className="space-y-1">
                          <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">{vital.type === 'SUGAR' ? 'Blood Sugar' : 'Blood Pressure'}</p>
                          <div className="flex items-baseline space-x-1">
                             <span className="text-2xl font-black text-stone-900">{vital.value}</span>
                             <span className="text-[10px] font-black text-stone-400">{vital.unit}</span>
                          </div>
                       </div>
                    </div>
                 ))}
                 {/* 仿参考图的额外数据项 */}
                 <div className="col-span-2 bg-stone-50 p-5 rounded-[2rem] flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                       <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-red-500 shadow-sm">
                          <HeartPulse size={20} />
                       </div>
                       <div>
                          <p className="text-xs font-black text-stone-900">静息心率</p>
                          <p className="text-[10px] text-stone-400 font-bold">10分钟前更新</p>
                       </div>
                    </div>
                    <span className="text-xl font-black text-stone-900">72 <span className="text-[10px] text-stone-400">BPM</span></span>
                 </div>
              </div>
           )}
        </section>

        {/* 其他菜单项 */}
        <section className="bg-white rounded-[2.5rem] shadow-sm border border-stone-100 p-2">
           <MenuItem icon={<Users size={20} className="text-blue-500" />} label="家庭关怀 (子女账号)" value="李敏" />
           <div className="h-px bg-stone-50 mx-6"></div>
           <MenuItem icon={<CreditCard size={20} className="text-stone-900" />} label="医保账户管理" value={`余额 ¥${MOCK_USER.medicareBalance}`} />
           <div className="h-px bg-stone-50 mx-6"></div>
           <MenuItem icon={<Phone size={20} className="text-orange-500" />} label="紧急联系人设置" />
           <div className="h-px bg-stone-50 mx-6"></div>
           <MenuItem icon={<Settings size={20} className="text-stone-300" />} label="系统通用设置" />
        </section>

        <button 
           onClick={onLogout}
           className="w-full py-5 bg-stone-50 text-stone-400 font-black rounded-[2rem] flex items-center justify-center space-x-2 border-2 border-stone-100 hover:bg-stone-100 hover:text-stone-600 transition-all uppercase tracking-widest text-xs"
        >
           <LogOut size={18} />
           <span>退出邻医安</span>
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
