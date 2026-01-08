
import React, { useState } from 'react';
import { MapPin, Search, Pill, Activity, CalendarPlus, Share2, FileText, ArrowRight, Bot, Syringe, MessageSquare } from 'lucide-react';
import { MOCK_USER, MOCK_ARTICLES } from '../constants';
import { Tab, JourneyStep } from '../types';
import Logo from './Branding';

interface HomeViewProps {
  onChangeTab: (tab: Tab) => void;
  journeyStep: JourneyStep;
  setJourneyStep: (step: JourneyStep) => void;
}

// 模拟参考图中的扁平化医生插图
const DoctorIllustration = () => (
  <div className="relative w-40 h-52 flex items-end justify-center">
    {/* 身体/白大褂 */}
    <div className="absolute bottom-0 w-28 h-36 bg-white rounded-t-[3rem] shadow-sm border border-stone-100"></div>
    {/* 深色内衬 */}
    <div className="absolute bottom-0 w-12 h-24 bg-stone-900 rounded-t-full opacity-10"></div>
    {/* 头部 */}
    <div className="absolute top-4 w-16 h-16 bg-[#FFD1BA] rounded-full border-2 border-white shadow-md overflow-hidden">
        {/* 发型/五官简化示意 */}
        <div className="w-full h-4 bg-stone-800/20 mt-0"></div>
        <div className="absolute top-8 left-4 w-1.5 h-1.5 bg-stone-800 rounded-full"></div>
        <div className="absolute top-8 right-4 w-1.5 h-1.5 bg-stone-800 rounded-full"></div>
    </div>
    {/* 听诊器 */}
    <div className="absolute top-16 w-20 h-10 border-b-2 border-stone-300 rounded-full"></div>
    {/* 装饰线条 */}
    <div className="absolute left-0 top-1/2 w-8 h-px bg-stone-300 -rotate-12"></div>
    <div className="absolute right-4 top-1/4 w-6 h-px bg-stone-300 rotate-45"></div>
  </div>
);

const HomeView: React.FC<HomeViewProps> = ({ onChangeTab, journeyStep, setJourneyStep }) => {
  // 逻辑：如果是 ONBOARDING 或 HOME_DEFAULT 状态，视为“未就医”
  // 如果是 CHECKUP_BOOKED 及之后的各种状态，视为“已产生就医行为”
  const hasFirstVisit = journeyStep !== 'ONBOARDING' && journeyStep !== 'HOME_DEFAULT';

  return (
    <div className="space-y-0 p-0 max-w-md mx-auto relative pb-24 animate-in fade-in duration-500">
      
      {/* 1. Hero Section (参照图片：带插图、位置和问候语) */}
      <section className="bg-[#bef264] pt-12 px-6 pb-4 rounded-b-[4rem] relative overflow-hidden">
        {/* Logo 背景点缀 */}
        <div className="absolute top-6 left-6 opacity-10 rotate-12">
            <Logo size={120} />
        </div>
        
        {/* 背景微调：为了让白色医生更突出，加一个浅色圆圈 */}
        <div className="absolute top-10 right-10 w-40 h-40 bg-white/20 rounded-full blur-3xl"></div>
        
        <div className="flex justify-between items-end relative z-10">
          <div className="pb-10 space-y-6">
             {/* 问候气泡 */}
             <div className="bg-white px-5 py-2.5 rounded-full rounded-bl-none shadow-xl shadow-stone-900/5 inline-flex items-center space-x-2 animate-in slide-in-from-left duration-700">
                <Logo size={18} />
                <span className="text-stone-900 font-black text-xs uppercase tracking-tighter">早上好，陈奶奶!</span>
             </div>
             
             {/* 位置信息 */}
             <div className="space-y-1">
                <p className="text-[9px] font-black text-stone-900/30 uppercase tracking-[0.2em]">当前位置</p>
                <div className="flex items-center space-x-1.5 text-stone-900">
                   <MapPin size={16} className="fill-current opacity-40" />
                   <span className="font-black text-xl tracking-tight">闵行 · 浦江镇</span>
                </div>
             </div>
          </div>
          
          <DoctorIllustration />
        </div>

        {/* 2. 搜索框 (参照图片：大圆角、右侧圆钮) */}
        <div className="absolute -bottom-8 left-6 right-6">
           <div className="bg-white h-16 rounded-[2rem] shadow-2xl shadow-stone-900/10 flex items-center px-6 border border-stone-50">
              <Search className="text-stone-300 mr-3" size={22} />
              <input 
                type="text" 
                placeholder="搜索症状、科室或药品..." 
                className="bg-transparent flex-1 text-sm font-bold text-stone-900 focus:outline-none placeholder:text-stone-300"
              />
              <button className="w-11 h-11 bg-stone-900 rounded-full flex items-center justify-center text-[#bef264] shadow-lg active:scale-90 transition-transform">
                 <Search size={20} />
              </button>
           </div>
        </div>
      </section>

      {/* 内容区域：下移避开搜索框 */}
      <div className="px-6 pt-16 space-y-10">
        
        {/* 3. 核心功能卡片组 (参照图片：圆角方块) */}
        <section>
           <h3 className="text-[10px] font-black text-stone-300 uppercase tracking-[0.2em] mb-4 px-2">常用功能</h3>
           <div className="grid grid-cols-2 gap-4">
              {/* 核心功能：预约挂号 */}
              <button 
                onClick={() => alert("正在跳转预约系统...")}
                className="bg-white p-6 rounded-[2.5rem] text-left shadow-sm border border-stone-100 transition-all active:scale-95 flex flex-col justify-between h-40"
              >
                <div className="bg-[#bef264] w-12 h-12 rounded-2xl flex items-center justify-center text-stone-900">
                   <CalendarPlus size={24} strokeWidth={2.5} />
                </div>
                <div className="space-y-1">
                   <h4 className="text-stone-900 font-black text-base">预约挂号</h4>
                   <p className="text-[10px] text-stone-400 font-bold uppercase">Booking</p>
                </div>
              </button>

              {/* 核心功能：一键转档 */}
              <button 
                onClick={() => onChangeTab(Tab.RECORDS)}
                className="bg-white p-6 rounded-[2.5rem] text-left shadow-sm border border-stone-100 transition-all active:scale-95 flex flex-col justify-between h-40"
              >
                <div className="bg-stone-900 w-12 h-12 rounded-2xl flex items-center justify-center text-[#bef264]">
                   <Share2 size={24} strokeWidth={2.5} />
                </div>
                <div className="space-y-1">
                   <h4 className="text-stone-900 font-black text-base">一键转档</h4>
                   <p className="text-[10px] text-stone-400 font-bold uppercase">Record Transfer</p>
                </div>
              </button>

              {/* 条件渲染：有了第一次就医后显示的功能 */}
              {hasFirstVisit && (
                 <>
                   <button 
                    className="bg-stone-900 p-6 rounded-[2.5rem] text-left shadow-xl shadow-stone-900/10 transition-all active:scale-95 flex flex-col justify-between h-40 animate-in zoom-in duration-500"
                   >
                    <div className="bg-white/10 w-12 h-12 rounded-2xl flex items-center justify-center text-[#bef264]">
                       <Pill size={24} strokeWidth={2.5} />
                    </div>
                    <div className="space-y-1">
                       <h4 className="text-white font-black text-base">用药续方</h4>
                       <p className="text-[10px] text-stone-500 font-bold uppercase">Prescription</p>
                    </div>
                   </button>

                   <button 
                    className="bg-white p-6 rounded-[2.5rem] text-left shadow-sm border border-stone-100 transition-all active:scale-95 flex flex-col justify-between h-40 animate-in zoom-in duration-500 delay-75"
                   >
                    <div className="bg-orange-50 w-12 h-12 rounded-2xl flex items-center justify-center text-orange-500">
                       <MessageSquare size={24} strokeWidth={2.5} />
                    </div>
                    <div className="space-y-1">
                       <h4 className="text-stone-900 font-black text-base">下次预约</h4>
                       <p className="text-[10px] text-stone-400 font-bold uppercase">Follow-up</p>
                    </div>
                   </button>
                 </>
              )}
           </div>
        </section>

        {/* 4. 底部引导区块 (参照图片：带插图的长方形卡片) */}
        <section>
          <div className="flex justify-between items-center mb-5 px-2">
             <h3 className="font-black text-stone-900 tracking-tight text-lg">就医助手指南</h3>
             <ArrowRight size={18} className="text-stone-300" />
          </div>
          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-stone-50 flex items-center justify-between group active:bg-stone-50 transition-colors relative overflow-hidden">
             <div className="space-y-3 max-w-[60%] relative z-10">
                <h4 className="font-black text-stone-900 text-xl leading-tight">远离<br/><span className="text-[#bef264] bg-stone-900 px-2 py-0.5 rounded-md">慢病</span>困扰</h4>
                <p className="text-[11px] text-stone-400 font-medium leading-relaxed">申请专家联合诊疗方案，获取长效健康监测指南。</p>
                <button 
                  onClick={() => onChangeTab(Tab.RECORDS)}
                  className="bg-stone-900 text-[#bef264] px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest mt-4 shadow-lg shadow-stone-900/20 active:scale-95 transition-transform"
                >
                  立即申请转档
                </button>
             </div>
             <div className="w-32 h-32 bg-[#F2F5E8] rounded-full flex items-center justify-center text-stone-900 shrink-0 transform translate-x-4 rotate-6">
                <Share2 size={60} strokeWidth={1} className="opacity-20" />
                <Bot size={50} className="absolute text-stone-900" strokeWidth={2.5} />
             </div>
          </div>
        </section>

        {/* 5. 动态提醒 (仅在已就医产生后续计划时) */}
        {journeyStep === 'TREATMENT_ACTIVE' && (
            <section className="animate-in slide-in-from-bottom duration-500">
               <div className="bg-[#bef264] rounded-[2.5rem] p-7 shadow-2xl shadow-lime-900/10 flex items-center space-x-5">
                  <div className="w-16 h-16 bg-stone-900 rounded-3xl flex items-center justify-center text-[#bef264] shrink-0 shadow-xl shadow-stone-900/20">
                     <Syringe size={30} strokeWidth={2.5} />
                  </div>
                  <div className="flex-1">
                     <p className="text-[9px] font-black text-stone-900/40 uppercase tracking-widest mb-1">正在进行中的计划</p>
                     <h4 className="font-black text-stone-900 text-lg leading-tight">甲钴胺注射治疗</h4>
                     <p className="text-xs text-stone-900/60 font-bold flex items-center mt-1"><MapPin size={12} className="mr-1" /> 浦江社区医院 · 注射室</p>
                  </div>
                  <button 
                    onClick={() => onChangeTab(Tab.PASS)}
                    className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-stone-900 shadow-lg active:scale-90 transition-transform"
                  >
                     <ArrowRight size={24} />
                  </button>
               </div>
            </section>
        )}

      </div>
    </div>
  );
};

export default HomeView;
