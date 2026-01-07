
import React, { useState } from 'react';
import Layout from './components/Layout';
import HomeView from './components/HomeView';
import RecordsView from './components/RecordsView';
import PassView from './components/PassView'; 
import LoginView from './components/LoginView';
import DoctorView from './components/DoctorView';
import FamilyView from './components/FamilyView';
import { PlanView, ProfileView } from './components/Views';
import { Tab, AuthState, LoginType, AuthMethod, UserRole, JourneyStep, DoctorType } from './types';
import { Layers, ChevronLeft, ChevronRight, Play } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.HOME);
  const [authState, setAuthState] = useState<AuthState>({
    isLoggedIn: false,
    userType: 'SHANGHAI',
    role: 'PATIENT',
    isVisitor: false
  });
  
  const [journeyStep, setJourneyStep] = useState<JourneyStep>('ONBOARDING');
  const [showDemoMenu, setShowDemoMenu] = useState(true);

  const handleLoginSuccess = (userType: LoginType, method: AuthMethod, role: UserRole, isVisitor: boolean, doctorType?: DoctorType) => {
      setAuthState({
        isLoggedIn: true,
        userType,
        role,
        authMethod: method,
        isVisitor,
        doctorType
      });
      if (role === 'DOCTOR') setActiveTab(Tab.WORKBENCH);
      else if (role === 'FAMILY') setActiveTab(Tab.FAMILY_HOME);
      else setActiveTab(Tab.HOME);
  };

  const handleLogout = () => {
     setAuthState({ isLoggedIn: false, userType: 'SHANGHAI', role: 'PATIENT', authMethod: undefined });
     setActiveTab(Tab.HOME);
     setJourneyStep('ONBOARDING');
  };

  // --- DEMO TOUR LOGIC ---
  const goToScene = (scene: number) => {
    switch(scene) {
      case 1: // Splash / Login
        handleLogout();
        break;
      case 2: // Patient Onboarding
        handleLoginSuccess('SHANGHAI', 'MEDICARE', 'PATIENT', false);
        setJourneyStep('ONBOARDING');
        setActiveTab(Tab.HOME);
        break;
      case 3: // Joint Diagnosis Result
        handleLoginSuccess('SHANGHAI', 'MEDICARE', 'PATIENT', false);
        setJourneyStep('REPORT_READY');
        setActiveTab(Tab.HOME);
        break;
      case 4: // Specialist View
        handleLoginSuccess('SHANGHAI', 'WORK_ID', 'DOCTOR', false, 'SPECIALIST');
        setActiveTab(Tab.WORKBENCH);
        break;
      case 5: // Community View
        handleLoginSuccess('SHANGHAI', 'WORK_ID', 'DOCTOR', false, 'COMMUNITY');
        setActiveTab(Tab.WORKBENCH);
        break;
      case 6: // Family View
        handleLoginSuccess('SHANGHAI', 'WECHAT', 'FAMILY', false);
        setActiveTab(Tab.FAMILY_HOME);
        break;
    }
  };

  const renderContent = () => {
    if (!authState.isLoggedIn) {
      return <LoginView onLoginSuccess={handleLoginSuccess} />;
    }

    if (authState.role === 'DOCTOR') {
       const props = { activeTab, doctorType: authState.doctorType || 'COMMUNITY' };
       return <DoctorView {...props} />;
    }

    if (authState.role === 'FAMILY') {
      if (activeTab === Tab.FAMILY_HOME || activeTab === Tab.FAMILY_PROFILE) {
        return <FamilyView activeTab={activeTab} />;
      }
      if (activeTab === Tab.RECORDS) return <RecordsView />;
      if (activeTab === Tab.PLAN) return <PlanView />;
      return <FamilyView activeTab={'FAMILY_HOME'} />;
    }

    switch (activeTab) {
      case Tab.HOME:
        return <HomeView onChangeTab={setActiveTab} journeyStep={journeyStep} setJourneyStep={setJourneyStep} />;
      case Tab.RECORDS:
        return <RecordsView onTransferSuccess={() => {
            setJourneyStep('TREATMENT_ACTIVE');
            setActiveTab(Tab.HOME);
        }} />;
      case Tab.PASS:
        return <PassView journeyStep={journeyStep} />;
      case Tab.PLAN:
        return <PlanView />;
      case Tab.PROFILE:
        return <ProfileView onLogout={handleLogout} authMethod={authState.authMethod} />;
      default:
        return <HomeView onChangeTab={setActiveTab} journeyStep={journeyStep} setJourneyStep={setJourneyStep} />;
    }
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Demo Controller Overlay */}
      <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-[200] transition-all duration-500 ${showDemoMenu ? 'translate-y-0' : '-translate-y-24'}`}>
        <div className="bg-stone-900/80 backdrop-blur-xl border border-white/20 px-2 py-2 rounded-full shadow-2xl flex items-center space-x-1">
          <div className="px-3 py-1 text-white/40"><Layers size={16} /></div>
          {[
            { id: 1, label: '登录' },
            { id: 2, label: '引导' },
            { id: 3, label: '报告' },
            { id: 4, label: '专家' },
            { id: 5, label: '社区' },
            { id: 6, label: '家属' }
          ].map(s => (
            <button 
              key={s.id}
              onClick={() => goToScene(s.id)}
              className="px-4 py-1.5 rounded-full text-[11px] font-bold transition-all text-white/70 hover:bg-white/10 active:scale-90"
            >
              {s.label}
            </button>
          ))}
          <button 
            onClick={() => setShowDemoMenu(false)}
            className="w-8 h-8 rounded-full bg-[#bef264] text-stone-900 flex items-center justify-center ml-2"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {!showDemoMenu && (
        <button 
          onClick={() => setShowDemoMenu(true)}
          className="fixed top-4 right-4 z-[200] w-10 h-10 bg-stone-900 text-[#bef264] rounded-full shadow-lg flex items-center justify-center animate-bounce"
        >
          <Play size={16} />
        </button>
      )}

      <Layout 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        role={authState.role} 
        doctorType={authState.doctorType}
      >
        {renderContent()}
      </Layout>
    </div>
  );
};

export default App;
