
import React from 'react';
import { Home, FileText, QrCode, Calendar, User, LayoutDashboard, ScanLine, MessageSquare, Activity, Stethoscope } from 'lucide-react';
import { Tab, UserRole, DoctorType } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  role: UserRole;
  doctorType?: DoctorType; // To differentiate doctor themes
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange, role, doctorType }) => {
  
  // Dynamic styling based on role
  const getNavTheme = () => {
    if (role === 'DOCTOR') {
      if (doctorType === 'COMMUNITY') {
        return {
          bg: 'bg-orange-500',
          textActive: 'text-white',
          textInactive: 'text-orange-200',
          shadow: 'shadow-orange-500/40'
        };
      } else {
        // Specialist
        return {
          bg: 'bg-indigo-600',
          textActive: 'text-yellow-400',
          textInactive: 'text-indigo-300',
          shadow: 'shadow-indigo-600/40'
        };
      }
    }
    // Patient / Family (Default Black/Lime)
    return {
      bg: 'bg-stone-900',
      textActive: 'text-[#bef264]',
      textInactive: 'text-stone-400',
      shadow: 'shadow-stone-900/30'
    };
  };

  const theme = getNavTheme();
  
  const renderNavItems = () => {
    switch (role) {
      case 'DOCTOR':
        return (
          <>
            <NavItem 
              icon={<LayoutDashboard size={24} strokeWidth={2.5} />} 
              label="工作台" 
              isActive={activeTab === Tab.WORKBENCH} 
              onClick={() => onTabChange(Tab.WORKBENCH)} 
              theme={theme}
            />
            <NavItem 
              icon={<ScanLine size={24} strokeWidth={2.5} />} 
              label={doctorType === 'COMMUNITY' ? "扫码执行" : "远程会诊"} 
              isActive={activeTab === Tab.SCANNER} 
              onClick={() => onTabChange(Tab.SCANNER)} 
              theme={theme}
            />
             <NavItem 
              icon={<User size={24} strokeWidth={2.5} />} 
              label="我的" 
              isActive={activeTab === Tab.DOCTOR_PROFILE} 
              onClick={() => onTabChange(Tab.DOCTOR_PROFILE)} 
              theme={theme}
            />
          </>
        );
      case 'FAMILY':
        return (
          <>
             <NavItem 
              icon={<Home size={24} strokeWidth={2.5} />} 
              label="关怀首页" 
              isActive={activeTab === Tab.FAMILY_HOME} 
              onClick={() => onTabChange(Tab.FAMILY_HOME)} 
              theme={theme}
            />
             <NavItem 
              icon={<FileText size={24} strokeWidth={2.5} />} 
              label="家人档案" 
              isActive={activeTab === Tab.RECORDS} 
              onClick={() => onTabChange(Tab.RECORDS)} 
              theme={theme}
            />
             <div className="w-12"></div>
            <NavItem 
              icon={<Calendar size={24} strokeWidth={2.5} />} 
              label="日历" 
              isActive={activeTab === Tab.PLAN} 
              onClick={() => onTabChange(Tab.PLAN)} 
              theme={theme}
            />
             <NavItem 
              icon={<User size={24} strokeWidth={2.5} />} 
              label="我的" 
              isActive={activeTab === Tab.FAMILY_PROFILE} 
              onClick={() => onTabChange(Tab.FAMILY_PROFILE)} 
              theme={theme}
            />
          </>
        );
      case 'PATIENT':
      default:
        return (
          <>
            <NavItem 
              icon={<Home size={24} strokeWidth={2.5} />} 
              label="首页" 
              isActive={activeTab === Tab.HOME} 
              onClick={() => onTabChange(Tab.HOME)} 
              theme={theme}
            />
            <NavItem 
              icon={<FileText size={24} strokeWidth={2.5} />} 
              label="档案" 
              isActive={activeTab === Tab.RECORDS} 
              onClick={() => onTabChange(Tab.RECORDS)} 
              theme={theme}
            />
            
            {/* Center Space for Floating Button */}
            <div className="w-16 relative"></div>

            <NavItem 
              icon={<Calendar size={24} strokeWidth={2.5} />} 
              label="计划" 
              isActive={activeTab === Tab.PLAN} 
              onClick={() => onTabChange(Tab.PLAN)} 
              theme={theme}
            />
            <NavItem 
              icon={<User size={24} strokeWidth={2.5} />} 
              label="我的" 
              isActive={activeTab === Tab.PROFILE} 
              onClick={() => onTabChange(Tab.PROFILE)} 
              theme={theme}
            />
          </>
        );
    }
  };

  return (
    <div className={`flex flex-col h-full font-sans ${role === 'PATIENT' || role === 'FAMILY' ? 'bg-[#F2F5E8]' : 'bg-gray-50'}`}>
      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-28 no-scrollbar pt-8 md:pt-12">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className={`absolute bottom-6 left-4 right-4 ${theme.bg} rounded-[2.5rem] shadow-2xl ${theme.shadow} z-50 transition-colors duration-500`}>
        
        {/* Central Floating Button for Patient */}
        {role === 'PATIENT' && (
           <button 
             onClick={() => onTabChange(Tab.PASS)}
             className={`absolute left-1/2 transform -translate-x-1/2 -top-6 w-16 h-16 rounded-full flex items-center justify-center border-4 border-[#F2F5E8] shadow-lg transition-transform active:scale-95
               ${activeTab === Tab.PASS ? 'bg-white text-stone-900 rotate-180' : 'bg-[#bef264] text-stone-900'}`}
           >
             <QrCode size={30} strokeWidth={2.5} />
           </button>
        )}

        {/* Central Floating Action for Specialist (MDT) */}
        {role === 'DOCTOR' && doctorType === 'SPECIALIST' && (
           <button 
             className={`absolute left-1/2 transform -translate-x-1/2 -top-6 w-16 h-16 rounded-full flex items-center justify-center border-4 border-gray-50 shadow-lg bg-yellow-400 text-indigo-900`}
           >
             <MessageSquare size={28} strokeWidth={2.5} fill="currentColor" className="text-indigo-900/20" />
             <MessageSquare size={28} strokeWidth={2.5} className="absolute" />
           </button>
        )}

        {/* Central Floating Action for Community (Scanner) */}
        {role === 'DOCTOR' && doctorType === 'COMMUNITY' && (
           <button 
             onClick={() => onTabChange(Tab.SCANNER)}
             className={`absolute left-1/2 transform -translate-x-1/2 -top-6 w-16 h-16 rounded-full flex items-center justify-center border-4 border-orange-50 shadow-lg bg-white text-orange-500 active:scale-95 transition-transform`}
           >
             <ScanLine size={30} strokeWidth={2.5} />
           </button>
        )}

        <div className="flex justify-around items-center h-20 px-2">
          {renderNavItems()}
        </div>
      </nav>
    </div>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
  theme: { textActive: string; textInactive: string; };
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, isActive, onClick, theme }) => {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center justify-center w-14 h-full space-y-1 transition-all duration-300 relative
        ${isActive ? theme.textActive : theme.textInactive}`}
    >
      <div className={`transition-transform duration-300 ${isActive ? '-translate-y-1' : ''}`}>
        {icon}
      </div>
      <span className={`text-[10px] font-bold tracking-wide ${isActive ? 'opacity-100' : 'opacity-0 scale-0'} transition-all duration-300 absolute bottom-3`}>{label}</span>
    </button>
  );
};

export default Layout;
