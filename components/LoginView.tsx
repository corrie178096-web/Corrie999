
import React, { useState } from 'react';
import { ShieldCheck, MessageCircle, CreditCard, User, AlertTriangle, FileText, Eye, Stethoscope, Users, Lock, ChevronRight, Building2, Activity, ScanLine, Scan, Key, FileKey, Smartphone, ChevronDown, CheckCircle2 } from 'lucide-react';
import { AuthMethod, LoginType, LoginStep, UserRole, DoctorType } from '../types';

interface LoginViewProps {
  onLoginSuccess: (type: LoginType, method: AuthMethod, role: UserRole, isVisitor: boolean, doctorType?: DoctorType) => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess }) => {
  const [step, setStep] = useState<LoginStep>('SPLASH');
  const [role, setRole] = useState<UserRole>('PATIENT'); 
  const [portal, setPortal] = useState<'PUBLIC' | 'MEDICAL'>('PUBLIC'); // Visual switcher
  const [selectedRegion, setSelectedRegion] = useState<LoginType>('SHANGHAI'); 
  const [loginMethod, setLoginMethod] = useState<AuthMethod | undefined>();
  const [agreed, setAgreed] = useState(false);

  // Medical Staff Inputs
  const [workId, setWorkId] = useState('');
  const [password, setPassword] = useState('');
  const [doctorType, setDoctorType] = useState<DoctorType>('COMMUNITY');

  // --- Step 1: Splash Screen logic ---
  const handleSplashAgree = () => {
    if (agreed) setStep('LOGIN_FORM');
  };

  // --- Step 2: Login Form logic ---
  const handlePublicLogin = (method: AuthMethod, selectedRole: UserRole = 'PATIENT') => {
    setLoginMethod(method);
    setRole(selectedRole);
    setStep('PROCESSING');
    
    setTimeout(() => {
      checkInsuranceRegion(method, selectedRole);
    }, 1500);
  };

  const handleMedicalLogin = () => {
    if(!workId || !password) return;
    setLoginMethod('WORK_ID');
    setRole('DOCTOR');
    setStep('PROCESSING');

    setTimeout(() => {
      onLoginSuccess('SHANGHAI', 'WORK_ID', 'DOCTOR', false, doctorType);
    }, 1500);
  }

  const checkInsuranceRegion = (method: AuthMethod, role: UserRole) => {
    if (selectedRegion === 'SHANGHAI') {
      onLoginSuccess('SHANGHAI', method, role, false);
    } else {
      setStep('REGION_WARNING');
    }
  };

  const handleFileRecord = () => {
    // Simulate redirection
    alert("正在跳转至‘国家医保服务平台’办理异地备案...");
    onLoginSuccess('NON_SHANGHAI', loginMethod!, role, false);
  };

  const handleJustLook = () => {
    onLoginSuccess('NON_SHANGHAI', loginMethod!, role, true);
  };

  // --- RENDERERS ---

  if (step === 'SPLASH') {
    return (
      <div className="min-h-screen bg-[#F2F5E8] flex flex-col relative overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#d9f99d] rounded-full blur-[80px] -mr-16 -mt-16 opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#bef264] rounded-full blur-[80px] -ml-16 -mb-16 opacity-60"></div>

        <div className="flex-1 flex flex-col justify-center items-center p-8 z-10">
          <div className="w-32 h-32 bg-stone-900 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-lime-500/20 mb-8 rotate-6 animate-in zoom-in duration-700">
            <ShieldCheck size={60} className="text-[#bef264]" />
          </div>
          <h1 className="text-4xl font-black text-stone-900 mb-2 tracking-tight">邻医安</h1>
          <p className="text-stone-500 font-medium text-lg">分级诊疗 · 医患互联</p>
          
          <div className="mt-12 bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-white space-y-4 w-full max-w-xs shadow-sm">
             <h3 className="font-bold text-stone-800">启动声明</h3>
             <p className="text-sm text-stone-600 leading-relaxed">
               欢迎使用邻医安。我们致力于打通三甲医院与社区医疗，为您提供便捷的转诊与续方服务。
             </p>
          </div>
        </div>

        <div className="p-8 pb-12 z-10">
          <div 
            onClick={() => setAgreed(!agreed)}
            className="flex items-center justify-center space-x-3 mb-6 cursor-pointer"
          >
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${agreed ? 'bg-stone-900 border-stone-900' : 'border-stone-400'}`}>
              {agreed && <Eye size={14} className="text-[#bef264]" />}
            </div>
            <span className="text-stone-600 font-bold text-sm">我已阅读并同意用户协议</span>
          </div>

          <button 
            onClick={handleSplashAgree}
            disabled={!agreed}
            className={`w-full py-5 rounded-[2rem] font-bold text-lg shadow-xl transition-all flex items-center justify-center space-x-2
              ${agreed ? 'bg-[#bef264] text-stone-900 hover:scale-[1.02] active:scale-95 cursor-pointer shadow-lime-400/30' : 'bg-stone-200 text-stone-400 cursor-not-allowed'}`}
          >
            <span>开始使用</span>
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  if (step === 'LOGIN_FORM') {
    return (
      <div className="min-h-screen bg-[#F2F5E8] flex flex-col relative">
         {/* Dev Toggle */}
         <div className="absolute top-4 right-4 z-50 opacity-30 hover:opacity-100 transition-opacity">
            <button 
              onClick={() => setSelectedRegion(selectedRegion === 'SHANGHAI' ? 'NON_SHANGHAI' : 'SHANGHAI')}
              className="text-[10px] bg-black text-white px-2 py-1 rounded"
            >
              模拟: {selectedRegion === 'SHANGHAI' ? '上海' : '外地'}
            </button>
         </div>

         {/* Portal Switcher */}
         <div className="pt-12 px-6 pb-4">
            <h2 className="text-3xl font-black text-stone-900 mb-6">欢迎登录</h2>
            <div className="flex bg-stone-200 p-1 rounded-2xl mb-4">
               <button 
                 onClick={() => setPortal('PUBLIC')}
                 className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${portal === 'PUBLIC' ? 'bg-stone-900 text-white shadow-md' : 'text-stone-500'}`}
               >
                 大众/家属入口
               </button>
               <button 
                 onClick={() => setPortal('MEDICAL')}
                 className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${portal === 'MEDICAL' ? 'bg-white text-stone-900 shadow-md' : 'text-stone-500'}`}
               >
                 医务工作者入口
               </button>
            </div>
         </div>

         {/* PUBLIC PORTAL */}
         {portal === 'PUBLIC' && (
           <div className="flex-1 flex flex-col px-6 space-y-6 animate-in slide-in-from-right duration-300">
              {/* Role Choice */}
              <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => setRole('PATIENT')}
                    className={`p-4 rounded-2xl border-2 text-left transition-all ${role === 'PATIENT' ? 'bg-white border-[#bef264] ring-2 ring-[#bef264]/30' : 'bg-white/50 border-transparent'}`}
                  >
                     <User size={24} className={role === 'PATIENT' ? 'text-stone-900' : 'text-stone-400'} />
                     <p className="font-bold text-stone-900 mt-2">我是患者</p>
                     <p className="text-xs text-stone-500">查看我的档案</p>
                  </button>
                  <button 
                    onClick={() => setRole('FAMILY')}
                    className={`p-4 rounded-2xl border-2 text-left transition-all ${role === 'FAMILY' ? 'bg-white border-[#bef264] ring-2 ring-[#bef264]/30' : 'bg-white/50 border-transparent'}`}
                  >
                     <Users size={24} className={role === 'FAMILY' ? 'text-stone-900' : 'text-stone-400'} />
                     <p className="font-bold text-stone-900 mt-2">我是家属</p>
                     <p className="text-xs text-stone-500">绑定与代办</p>
                  </button>
              </div>

              {/* Login Methods */}
              <div className="space-y-3">
                 <button 
                   onClick={() => handlePublicLogin('MEDICARE', role)}
                   className="w-full bg-[#bef264] py-5 rounded-[2rem] flex items-center justify-center space-x-3 hover:bg-[#b0e64c] transition-colors relative overflow-hidden"
                 >
                   <CreditCard size={20} className="text-stone-900" />
                   <span className="text-lg font-bold text-stone-900">医保电子凭证登录</span>
                 </button>

                 <div className="grid grid-cols-2 gap-3">
                   <button onClick={() => handlePublicLogin('WECHAT', role)} className="bg-white py-4 rounded-[2rem] font-bold text-stone-700 flex items-center justify-center space-x-2">
                     <MessageCircle size={20} className="text-[#07C160]" />
                     <span>微信</span>
                   </button>
                   <button onClick={() => handlePublicLogin('ALIPAY', role)} className="bg-white py-4 rounded-[2rem] font-bold text-stone-700 flex items-center justify-center space-x-2">
                     <span className="text-[#1677FF] font-black text-lg">支</span>
                     <span>支付宝</span>
                   </button>
                 </div>
              </div>
           </div>
         )}

         {/* MEDICAL PORTAL */}
         {portal === 'MEDICAL' && (
           <div className="flex-1 flex flex-col px-6 space-y-6 animate-in slide-in-from-right duration-300">
              <div className="bg-white p-6 rounded-[2.5rem] shadow-sm space-y-5">
                 <div className="flex items-center space-x-3 text-stone-900 mb-2">
                    <Stethoscope size={28} className="text-[#bef264]" />
                    <h3 className="font-bold text-lg">专业身份验证</h3>
                 </div>

                 {/* Role Selection */}
                 <div className="flex space-x-2 bg-stone-100 p-1 rounded-xl">
                    <button 
                      onClick={() => setDoctorType('COMMUNITY')}
                      className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${doctorType === 'COMMUNITY' ? 'bg-white text-stone-900 shadow' : 'text-stone-500'}`}
                    >
                      <Building2 size={16} className="inline mr-1 mb-0.5" />
                      社区医院
                    </button>
                    <button 
                      onClick={() => setDoctorType('SPECIALIST')}
                      className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${doctorType === 'SPECIALIST' ? 'bg-white text-stone-900 shadow' : 'text-stone-500'}`}
                    >
                      <Activity size={16} className="inline mr-1 mb-0.5" />
                      三甲专家
                    </button>
                 </div>
                 
                 <div className="space-y-4">
                    <div>
                      <label className="text-xs font-bold text-stone-500 ml-2">工号 / ID</label>
                      <input 
                        type="text" 
                        value={workId}
                        onChange={(e) => setWorkId(e.target.value)}
                        placeholder={doctorType === 'COMMUNITY' ? "请输入社区医生工号" : "请输入三甲专家ID"}
                        className="w-full bg-[#F2F5E8] px-4 py-3.5 rounded-2xl font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#bef264]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-stone-500 ml-2">验证密码</label>
                      <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="请输入登录密码"
                        className="w-full bg-[#F2F5E8] px-4 py-3.5 rounded-2xl font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#bef264]"
                      />
                    </div>
                 </div>

                 <button 
                   onClick={handleMedicalLogin}
                   className="w-full bg-stone-900 text-white py-4 rounded-2xl font-bold text-lg shadow-lg flex items-center justify-center space-x-2 mt-4"
                 >
                   <Lock size={18} className="text-[#bef264]" />
                   <span>安全登录</span>
                 </button>
              </div>
              <p className="text-center text-xs text-stone-400">
                {doctorType === 'COMMUNITY' 
                  ? '适用于社区全科医生、护士及窗口人员' 
                  : '适用于三级甲等医院专科医生 (瑞金/仁济等)'}
              </p>
           </div>
         )}
      </div>
    );
  }

  if (step === 'PROCESSING') {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 text-center space-y-6">
         {/* Graphic Loader */}
         <div className="graphic-loader w-32 h-32">
             <div className="graphic-loader-content">
                {portal === 'PUBLIC' ? (
                   <Scan size={40} className="text-[#bef264] fill-stone-900" />
                ) : (
                   <ShieldCheck size={40} className="text-[#3b82f6] fill-blue-50" />
                )}
             </div>
         </div>
         
         <div className="animate-in fade-in slide-in-from-bottom-2">
           <h3 className="text-xl font-bold text-stone-900">
             {portal === 'PUBLIC' ? '正在连接医保平台...' : `正在验证${doctorType === 'COMMUNITY' ? '社区医护' : '专科医生'}权限...`}
           </h3>
           <p className="text-stone-500 text-sm mt-1">
              {portal === 'MEDICAL' ? '正在校验证书签名...' : '正在进行安全握手...'}
           </p>
         </div>
      </div>
    );
  }

  if (step === 'REGION_WARNING') {
    return (
      <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
        <div className="bg-white w-full max-w-sm rounded-[2.5rem] p-6 animate-in zoom-in duration-300">
              <div className="w-16 h-16 bg-amber-100 text-amber-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                 <AlertTriangle size={32} />
              </div>
              <h2 className="text-2xl font-black text-stone-900 mb-3 text-center">参保地提醒</h2>
              <div className="bg-[#F2F5E8] p-4 rounded-2xl mb-6">
                <p className="text-stone-800 font-bold text-sm">检测到您的参保地为: <span className="text-amber-600">非上海</span></p>
                <p className="text-stone-600 text-xs mt-1">建议您完成“异地就医备案”以便顺利报销。</p>
              </div>
              
              <div className="space-y-3">
                <button 
                  onClick={handleFileRecord}
                  className="w-full py-4 bg-[#bef264] text-stone-900 font-bold rounded-2xl"
                >
                  去备案 (国家医保平台)
                </button>
                <button 
                  onClick={handleJustLook}
                  className="w-full py-4 bg-white border border-stone-200 text-stone-500 font-bold rounded-2xl"
                >
                  先看看
                </button>
              </div>
        </div>
      </div>
    );
  }

  return null;
};

export default LoginView;
