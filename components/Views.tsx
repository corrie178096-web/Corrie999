
import React from 'react';
import { Calendar as CalendarIcon, ChevronRight, Settings, Users, Heart, LogOut, Phone, CreditCard, ShieldCheck } from 'lucide-react';
import { MOCK_USER, MOCK_REMINDERS } from '../constants';
import { AuthMethod } from '../types';

// --- Plan View ---
export const PlanView: React.FC = () => {
  const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  const today = new Date().getDay() - 1; 

  return (
    <div className="p-5 max-w-md mx-auto space-y-6">
      <header className="flex justify-between items-end pt-2">
        <h1 className="text-2xl font-black text-stone-900">健康日历</h1>
        <p className="text-sm text-stone-900 font-bold bg-[#bef264] px-3 py-1 rounded-lg">2024年 10月</p>
      </header>

      {/* Calendar Strip */}
      <div className="flex justify-between bg-white p-4 rounded-[2rem] shadow-sm border border-stone-100">
        {days.map((day, idx) => {
          const isToday = idx === (today < 0 ? 6 : today); 
          const isThursday = idx === 3; 
          return (
            <div key={day} className={`flex flex-col items-center justify-center w-10 h-16 rounded-2xl relative transition-all ${isToday ? 'bg-stone-900 text-[#bef264] shadow-lg shadow-stone-500/20 scale-110' : 'text-stone-400'}`}>
              <span className="text-[10px] mb-1 font-bold">{day}</span>
              <span className={`text-lg font-bold ${isToday ? 'text-[#bef264]' : 'text-stone-800'}`}>{24 + idx}</span>
              {isThursday && !isToday && <div className="absolute bottom-1 w-1.5 h-1.5 bg-orange-400 rounded-full"></div>}
            </div>
          )
        })}
      </div>

      <div className="space-y-4">
        <h2 className="font-bold text-stone-800 text-lg">今日任务</h2>
        {/* Mocking a completed task */}
         <div className="flex items-start p-5 bg-white rounded-[2rem] border border-stone-100 opacity-60">
             <div className="flex flex-col items-center mr-5 pt-1">
                <span className="text-sm font-bold text-stone-400">08:00</span>
                <div className="h-full w-0.5 bg-stone-200 mt-2 rounded-full"></div>
             </div>
             <div>
               <h3 className="font-bold text-stone-500 line-through">口服二甲双胍</h3>
               <p className="text-xs text-stone-400 mt-1 font-medium">已完成 • 早餐后</p>
             </div>
        </div>

        {/* Future Task */}
        <div className="flex items-start p-5 bg-stone-900 rounded-[2rem] shadow-xl shadow-stone-300 relative overflow-hidden group">
             {/* Decorative */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-[#bef264] rounded-full -mr-16 -mt-16 opacity-10 group-hover:opacity-20 transition-opacity"></div>

             <div className="absolute right-0 top-0 bg-[#bef264] text-stone-900 text-[10px] font-bold px-3 py-1.5 rounded-bl-2xl">
               后天
             </div>
             <div className="flex flex-col items-center mr-5 pt-1">
                <span className="text-sm font-bold text-[#bef264]">09:00</span>
             </div>
             <div className="relative z-10">
               <h3 className="font-bold text-white text-lg">营养神经注射</h3>
               <p className="text-sm text-stone-400 mt-1">浦江社区卫生服务中心</p>
               <button className="mt-4 text-xs bg-white/10 text-white font-bold px-4 py-2 rounded-xl hover:bg-white/20 transition-colors">
                 查看预约详情
               </button>
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
  return (
    <div className="bg-[#F2F5E8] h-full">
      <div className="bg-stone-900 pt-16 pb-32 px-6 rounded-b-[3rem] shadow-2xl relative overflow-hidden">
         {/* Abstract BG */}
         <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-lime-400 via-stone-900 to-stone-900"></div>

         <div className="flex items-center space-x-5 max-w-md mx-auto relative z-10">
           <div className="w-24 h-24 rounded-3xl bg-[#bef264] text-stone-900 flex items-center justify-center text-4xl font-black shadow-lg shadow-lime-900/20 transform rotate-3">
             {MOCK_USER.name[0]}
           </div>
           <div className="text-white">
             <h1 className="text-3xl font-black tracking-tight">{MOCK_USER.name}</h1>
             <p className="text-stone-400 text-sm mt-2 flex items-center font-medium">
               <ShieldCheck size={14} className="text-[#bef264] mr-1.5" />
               已实名认证 · {MOCK_USER.location.split(' ')[0]}
             </p>
           </div>
         </div>
      </div>

      <div className="px-5 -mt-24 max-w-md mx-auto space-y-5 pb-12 relative z-20">
        {/* Stats / Balance Card */}
        <div className="bg-white p-6 rounded-[2.5rem] shadow-xl flex justify-between items-center">
           <div className="flex items-center space-x-4">
             <div className="bg-[#F2F5E8] p-3 rounded-2xl text-stone-900">
               <CreditCard size={28} />
             </div>
             <div>
               <p className="text-xs text-stone-500 font-bold uppercase tracking-wider">医保账户余额</p>
               <p className="text-2xl font-black text-stone-900 mt-0.5">¥ {MOCK_USER.medicareBalance}</p>
             </div>
           </div>
           
           {/* Payment Linking Indicator */}
           {(authMethod === 'WECHAT' || authMethod === 'ALIPAY') && (
             <div className="text-right">
               <span className={`text-[10px] px-2 py-1 rounded-lg font-bold flex items-center justify-end ${authMethod === 'WECHAT' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'}`}>
                 {authMethod === 'WECHAT' ? '微信支付已免密' : '支付宝已绑定'}
               </span>
             </div>
           )}
        </div>

        {/* Menu */}
        <div className="bg-white rounded-[2.5rem] shadow-sm overflow-hidden border border-stone-100 p-2">
          <MenuItem 
            icon={<Users size={22} className="text-blue-500"/>} 
            label="家庭关怀 (子女账号)" 
            value={MOCK_USER.linkedFamilyMembers[0].split(' ')[0]} 
          />
          <div className="h-px bg-stone-50 mx-6"></div>
          <MenuItem 
            icon={<Heart size={22} className="text-red-500"/>} 
            label="我的收藏医生" 
            value="2人"
          />
          <div className="h-px bg-stone-50 mx-6"></div>
           <MenuItem 
            icon={<Phone size={22} className="text-[#bef264] fill-stone-900"/>} 
            label="紧急联系人" 
            value="女儿"
          />
          <div className="h-px bg-stone-50 mx-6"></div>
          <MenuItem 
            icon={<Settings size={22} className="text-stone-400"/>} 
            label="设置" 
          />
        </div>

        <button 
           onClick={onLogout}
           className="w-full py-4 bg-[#F2F5E8] text-stone-500 font-bold rounded-[2rem] mt-4 flex items-center justify-center space-x-2 border border-transparent hover:bg-stone-200 hover:text-stone-800 transition-colors"
        >
           <LogOut size={20} />
           <span>退出登录</span>
        </button>
      </div>
    </div>
  );
};

const MenuItem: React.FC<{icon: React.ReactNode, label: string, value?: string}> = ({ icon, label, value }) => (
  <div className="flex items-center justify-between p-5 hover:bg-[#F2F5E8] active:bg-[#e9f2d0] rounded-3xl transition-colors cursor-pointer group">
    <div className="flex items-center space-x-4 text-stone-700">
      <div className="group-hover:scale-110 transition-transform">{icon}</div>
      <span className="font-bold text-sm text-stone-800">{label}</span>
    </div>
    <div className="flex items-center space-x-2">
      {value && <span className="text-xs font-bold text-stone-400 bg-stone-100 px-2 py-1 rounded-lg">{value}</span>}
      <ChevronRight size={18} className="text-stone-300 group-hover:text-stone-500" />
    </div>
  </div>
);
