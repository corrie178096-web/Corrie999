
import React from 'react';

interface LogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 64, className = "", showText = false }) => {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-xl"
      >
        {/* 外层盾牌/心形轮廓 - 绿色 */}
        <path 
          d="M50 88C50 88 15 70 15 40C15 25 25 15 40 15C44 15 48 17 50 20C52 17 56 15 60 15C75 15 85 25 85 40C85 70 50 88 50 88Z" 
          stroke="#bef264" 
          strokeWidth="8" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        
        {/* 内层安全圆环 - 黄色点缀 */}
        <circle cx="50" cy="45" r="28" stroke="#fbbf24" strokeWidth="2" strokeDasharray="4 6" opacity="0.6" />
        
        {/* 中心医疗十字 */}
        <path 
          d="M50 30V60M35 45H65" 
          stroke="#bef264" 
          strokeWidth="10" 
          strokeLinecap="round"
        />
        
        {/* 安心闪烁点 */}
        <circle cx="75" cy="25" r="4" fill="#fbbf24" className="animate-pulse" />
      </svg>
      {showText && (
        <div className="mt-2 text-center">
          <span className="text-xl font-black text-stone-900 tracking-tighter">邻医安</span>
          <div className="h-1 w-8 bg-[#bef264] mx-auto rounded-full"></div>
        </div>
      )}
    </div>
  );
};

export default Logo;
