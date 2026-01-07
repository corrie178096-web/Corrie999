
import React, { useState } from 'react';
import { ShieldCheck, MessageCircle, CreditCard, User, AlertTriangle, FileText, Eye, Stethoscope, Users, Lock, ChevronRight, Building2, Activity, ScanLine, Scan, Key, FileKey, Smartphone, ChevronDown, CheckCircle2 } from 'lucide-react';
import { AuthMethod, LoginType, LoginStep, UserRole, DoctorType } from '../types';

interface LoginViewProps {
  onLoginSuccess: (type: LoginType, method: AuthMethod, role: UserRole, isVisitor: boolean, doctorType?: DoctorType) => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess }) => {
  const [step, setStep] = useState<LoginStep>('LOGIN_FORM'); 
  const [role, setRole] = useState<UserRole>('PATIENT'); 
  const [portal, setPortal] = useState<'PUBLIC' | 'MEDICAL'>('PUBLIC'); 
  const [selectedRegion, setSelectedRegion] = useState<LoginType>('SHANGHAI'); 
  const [loginMethod, setLoginMethod] = useState<AuthMethod | undefined>();

  // Medical Staff Inputs
  const [doctorType, setDoctorType] = useState<DoctorType>('COMMUNITY');
  const [medicalAuthMode, setMedicalAuthMode] = useState<'CA' | 'OA'>('CA'); // CA Certificate or OA Account
  const [selectedHospital, setSelectedHospital] = useState('');
  const [workId, setWorkId] = useState('');
  const [password, setPassword] = useState('');
  
  // Mock Hospital Lists
  const COMMUNITY_HOSPITALS = ['浦江社区卫生服务中心', '古美社区卫生服务中心', '吴泾社区卫生服务中心'];
  const SPECIALIST_HOSPITALS = ['瑞金医院 (总院)', '仁济医院 (南院)', '中山医院', '华山医院'];

  // --- Login Logic ---
  const handlePublicLogin = (method: AuthMethod, selectedRole: UserRole = 'PATIENT') => {
    setLoginMethod(method);
    setRole(selectedRole);
    setStep('PROCESSING');
    
    setTimeout(() => {
      checkInsuranceRegion(method, selectedRole);
    }, 2000); // Increased slightly to show off animation
  };

  const handleMedicalLogin = () => {
    if(!selectedHospital) {
        alert("请选择所属医疗机构");
        return;
    }
    if(medicalAuthMode === 'OA' && (!workId || !password)) return;
    
    setLoginMethod('WORK_ID');
    setRole('DOCTOR');
    setStep('PROCESSING');

    setTimeout(() => {
      onLoginSuccess('SHANGHAI', 'WORK_ID', 'DOCTOR', false, doctorType);
    }, 2000);
  }

  const checkInsuranceRegion = (method: AuthMethod, role: UserRole) => {
    if (selectedRegion === 'SHANGHAI') {
      onLoginSuccess('SHANGHAI', method, role, false);
    } else {
      setStep('REGION_WARNING');
    }
  };

  const handleFileRecord = () => {
    alert("正在跳转至‘国家医保服务平台’办理异地备案...");
    onLoginSuccess('NON_SHANGHAI', loginMethod!, role, false);
  };

  const handleJustLook = () => {
    onLoginSuccess('NON_SHANGHAI', loginMethod!, role, true);
  };

  // --- RENDERERS ---

  if (step === 'LOGIN_FORM') {
    return (
      <div className="h-full flex flex-col relative bg-white">
         {/* Background Gradients */}
         <div className="absolute top-0 left-0 w-full h-[60%] bg-gradient-to-b from-teal-50 via-cyan-50/50 to-transparent pointer-events-none"></div>
         <div className="absolute bottom-0 left-0 w-full h-[40%] bg-gradient-to-t from-yellow-50/80 via-white to-transparent pointer-events-none"></div>
         
         {/* Dev Toggle */}
         <div className="absolute top-4 right-4 z-50 opacity-30 hover:opacity-100 transition-opacity">
            <button 
              onClick={() => setSelectedRegion(selectedRegion === 'SHANGHAI' ? 'NON_SHANGHAI' : 'SHANGHAI')}
              className="text-[10px] bg-black text-white px-2 py-1 rounded"
            >
              {selectedRegion === 'SHANGHAI' ? '上海' : '外地'}
            </button>
         </div>

         <div className="flex-1 flex flex-col px-6 pt-24 pb-8 z-10 overflow-y-auto no-scrollbar">
            
            {/* 1. Portal Switcher */}
            <div className="bg-gray-100/80 p-1.5 rounded-2xl flex mb-8 backdrop-blur-sm relative border border-white/50">
               <button 
                 onClick={() => setPortal('PUBLIC')}
                 className={`flex-1 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 ${portal === 'PUBLIC' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-400 hover:text-stone-600'}`}
               >
                 大众/家属
               </button>
               <button 
                 onClick={() => setPortal('MEDICAL')}
                 className={`flex-1 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 ${portal === 'MEDICAL' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-400 hover:text-stone-600'}`}
               >
                 医务工作者
               </button>
            </div>

            {/* PUBLIC PORTAL CONTENT */}
            {portal === 'PUBLIC' && (
               <div className="flex-1 flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="grid grid-cols-2 gap-4 mb-10">
                      <button 
                        onClick={() => setRole('PATIENT')}
                        className={`relative p-5 rounded-[2rem] text-left transition-all duration-300 group overflow-hidden border-2
                          ${role === 'PATIENT' 
                             ? 'bg-blue-50/80 border-white shadow-lg shadow-blue-100 ring-2 ring-blue-100/50' 
                             : 'bg-white/60 border-transparent hover:bg-white'}`}
                      >
                         <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-colors ${role === 'PATIENT' ? 'bg-white text-blue-500 shadow-sm' : 'bg-white text-stone-400'}`}>
                            <User size={28} strokeWidth={2.5} />
                         </div>
                         <h3 className="text-xl font-black text-stone-900 mb-1">我是患者</h3>
                         <p className={`text-xs font-bold ${role === 'PATIENT' ? 'text-blue-500' : 'text-blue-300/80'}`}>查看档案</p>
                      </button>

                      <button 
                        onClick={() => setRole('FAMILY')}
                        className={`relative p-5 rounded-[2rem] text-left transition-all duration-300 group overflow-hidden border-2
                          ${role === 'FAMILY' 
                             ? 'bg-emerald-50/80 border-white shadow-lg shadow-emerald-100 ring-2 ring-emerald-100/50' 
                             : 'bg-white/60 border-transparent hover:bg-white'}`}
                      >
                         <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-colors ${role === 'FAMILY' ? 'bg-white text-emerald-500 shadow-sm' : 'bg-white text-stone-400'}`}>
                            <Users size={28} strokeWidth={2.5} />
                         </div>
                         <h3 className="text-xl font-black text-stone-900 mb-1">我是家属</h3>
                         <p className={`text-xs font-bold ${role === 'FAMILY' ? 'text-emerald-500' : 'text-emerald-300/80'}`}>绑定代办</p>
                      </button>
                  </div>

                  <button 
                    onClick={() => handlePublicLogin('MEDICARE', role)}
                    className="w-full bg-[#0F172A] text-white py-5 rounded-[2rem] flex items-center justify-between px-6 shadow-xl shadow-stone-200 hover:scale-[1.02] active:scale-95 transition-all group"
                  >
                     <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/10 group-hover:bg-white/20 transition-colors">
                           <Scan size={20} />
                        </div>
                        <span className="text-lg font-bold">医保电子凭证登录</span>
                     </div>
                     <ChevronRight size={20} className="text-white/40 group-hover:text-white transition-colors" />
                  </button>

                  <div className="flex-1"></div>

                  <div className="mt-8">
                     <div className="flex items-center justify-center space-x-4 mb-6">
                        <div className="h-px w-16 bg-stone-200"></div>
                        <span className="text-xs text-stone-400 font-medium">其他登陆方式</span>
                        <div className="h-px w-16 bg-stone-200"></div>
                     </div>
                     
                     <div className="flex justify-center space-x-8">
                        <button 
                           onClick={() => handlePublicLogin('WECHAT', role)}
                           className="w-16 h-16 rounded-full bg-[#f0fdf4] border border-[#dcfce7] flex items-center justify-center text-[#16a34a] shadow-sm hover:scale-110 transition-transform"
                        >
                           <MessageCircle size={28} fill="currentColor" className="text-[#16a34a]" />
                        </button>
                        <button 
                           onClick={() => handlePublicLogin('ALIPAY', role)}
                           className="w-16 h-16 rounded-full bg-[#eff6ff] border border-[#dbeafe] flex items-center justify-center text-[#2563eb] shadow-sm hover:scale-110 transition-transform font-black text-2xl pb-1"
                        >
                           支
                        </button>
                     </div>
                  </div>
               </div>
            )}

            {/* MEDICAL PORTAL CONTENT (IMPROVED) */}
            {portal === 'MEDICAL' && (
               <div className="flex-1 flex flex-col space-y-4 animate-in fade-in slide-in-from-right duration-500">
                  
                  {/* 1. Identity Type */}
                  <div className="flex space-x-3 mb-2">
                      <button 
                        onClick={() => { setDoctorType('COMMUNITY'); setSelectedHospital(''); }}
                        className={`flex-1 p-4 rounded-2xl border transition-all flex flex-col items-center justify-center space-y-2
                           ${doctorType === 'COMMUNITY' ? 'bg-white border-orange-200 shadow-md ring-1 ring-orange-100' : 'bg-white/40 border-transparent text-stone-400'}`}
                      >
                         <Building2 size={24} className={doctorType === 'COMMUNITY' ? 'text-orange-500' : 'text-stone-300'} />
                         <span className={`text-xs font-bold ${doctorType === 'COMMUNITY' ? 'text-stone-900' : 'text-stone-400'}`}>社区/基层</span>
                      </button>
                      <button 
                        onClick={() => { setDoctorType('SPECIALIST'); setSelectedHospital(''); }}
                        className={`flex-1 p-4 rounded-2xl border transition-all flex flex-col items-center justify-center space-y-2
                           ${doctorType === 'SPECIALIST' ? 'bg-white border-indigo-200 shadow-md ring-1 ring-indigo-100' : 'bg-white/40 border-transparent text-stone-400'}`}
                      >
                         <Activity size={24} className={doctorType === 'SPECIALIST' ? 'text-indigo-600' : 'text-stone-300'} />
                         <span className={`text-xs font-bold ${doctorType === 'SPECIALIST' ? 'text-stone-900' : 'text-stone-400'}`}>三甲/专科</span>
                      </button>
                  </div>

                  <div className="bg-white/80 backdrop-blur-xl p-6 rounded-[2.5rem] shadow-sm border border-white space-y-6">
                     
                     {/* 2. Hospital Selector */}
                     <div className="space-y-2">
                        <label className="text-xs font-bold text-stone-500 ml-2">所属医疗机构</label>
                        <div className="relative">
                            <select 
                                value={selectedHospital}
                                onChange={(e) => setSelectedHospital(e.target.value)}
                                className="w-full bg-slate-50 appearance-none px-4 py-4 rounded-2xl font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-200 border border-transparent"
                            >
                                <option value="" disabled>请选择您的工作单位</option>
                                {(doctorType === 'COMMUNITY' ? COMMUNITY_HOSPITALS : SPECIALIST_HOSPITALS).map(h => (
                                    <option key={h} value={h}>{h}</option>
                                ))}
                            </select>
                            <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
                        </div>
                     </div>

                     {/* 3. Auth Mode Tabs */}
                     <div className="flex border-b border-stone-100">
                        <button 
                           onClick={() => setMedicalAuthMode('CA')}
                           className={`flex-1 pb-3 text-sm font-bold border-b-2 transition-colors ${medicalAuthMode === 'CA' ? 'border-stone-900 text-stone-900' : 'border-transparent text-stone-400'}`}
                        >
                           CA数字证书
                        </button>
                        <button 
                           onClick={() => setMedicalAuthMode('OA')}
                           className={`flex-1 pb-3 text-sm font-bold border-b-2 transition-colors ${medicalAuthMode === 'OA' ? 'border-stone-900 text-stone-900' : 'border-transparent text-stone-400'}`}
                        >
                           OA账号密码
                        </button>
                     </div>

                     {/* 4. Auth Inputs */}
                     {medicalAuthMode === 'CA' ? (
                        <div className="py-4 space-y-4">
                            <div className="bg-blue-50/50 rounded-2xl p-4 flex items-start space-x-3 border border-blue-100">
                                <ShieldCheck size={20} className="text-blue-600 mt-0.5" />
                                <div>
                                    <h4 className="font-bold text-sm text-blue-900">医务人员数字认证</h4>
                                    <p className="text-xs text-blue-700/70 mt-1">请使用“医卫帮”APP扫码或插入U-Key</p>
                                </div>
                            </div>
                            <button 
                               onClick={handleMedicalLogin}
                               className="w-full bg-[#1e293b] text-white py-4 rounded-2xl font-bold text-lg shadow-lg flex items-center justify-center space-x-2"
                            >
                               <FileKey size={20} className="text-sky-400" />
                               <span>唤起移动CA认证</span>
                            </button>
                        </div>
                     ) : (
                        <div className="space-y-4 pt-2">
                            <div>
                               <label className="text-xs font-bold text-stone-400 ml-2 mb-1 block">工号 / Username</label>
                               <input 
                                 type="text" 
                                 value={workId}
                                 onChange={(e) => setWorkId(e.target.value)}
                                 placeholder="请输入医院工号"
                                 className="w-full bg-slate-50 px-4 py-3.5 rounded-2xl font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-200"
                               />
                            </div>
                            <div>
                               <label className="text-xs font-bold text-stone-400 ml-2 mb-1 block">密码 / Password</label>
                               <input 
                                 type="password" 
                                 value={password}
                                 onChange={(e) => setPassword(e.target.value)}
                                 placeholder="请输入OA系统密码"
                                 className="w-full bg-slate-50 px-4 py-3.5 rounded-2xl font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-200"
                               />
                            </div>
                            <button 
                               onClick={handleMedicalLogin}
                               className="w-full bg-[#1e293b] text-white py-4 rounded-2xl font-bold text-lg shadow-lg flex items-center justify-center space-x-2 mt-2"
                            >
                               <Key size={20} className="text-orange-400" />
                               <span>登录工作台</span>
                            </button>
                        </div>
                     )}
                  </div>
               </div>
            )}

         </div>
      </div>
    );
  }

  if (step === 'PROCESSING') {
    return (
      <div className="h-full bg-white flex flex-col items-center justify-center p-8 text-center space-y-12">
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
           <h3 className="text-xl font-black text-stone-900">
             {portal === 'PUBLIC' ? '正在连接医保平台...' : `正在验证${doctorType === 'COMMUNITY' ? '社区医护' : '专科医生'}权限...`}
           </h3>
           <p className="text-stone-500 text-sm mt-2 font-medium">
              {medicalAuthMode === 'CA' ? '正在校验证书签名...' : '正在进行安全握手...'}
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
