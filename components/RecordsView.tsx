
import React, { useState } from 'react';
import { FileText, ChevronRight, Share, Sparkles, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import { MOCK_RECORDS, MOCK_HOSPITALS } from '../constants';
import { analyzeMedicalRecord } from '../services/geminiService';
import { MedicalRecord } from '../types';

interface RecordsViewProps {
  onTransferSuccess?: () => void;
}

const RecordsView: React.FC<RecordsViewProps> = ({ onTransferSuccess }) => {
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isTransferring, setIsTransferring] = useState(false);
  const [transferStep, setTransferStep] = useState(0); 

  // Handle AI Analysis
  const handleAnalyze = async (record: MedicalRecord) => {
    setIsAnalyzing(true);
    setAiAnalysis('');
    const result = await analyzeMedicalRecord(record);
    setAiAnalysis(result);
    setIsAnalyzing(false);
  };

  const startTransfer = () => setTransferStep(1);
  const confirmTransfer = async () => {
    setIsTransferring(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsTransferring(false);
    setTransferStep(2);
  };

  if (selectedRecord) {
    return (
      <div className="p-5 max-w-md mx-auto space-y-4">
        <button 
          onClick={() => { setSelectedRecord(null); setAiAnalysis(''); setTransferStep(0); }}
          className="text-sm text-stone-600 font-bold flex items-center mb-2 bg-white px-4 py-2 rounded-xl shadow-sm w-fit"
        >
          <ArrowLeft size={16} className="mr-2" /> 返回列表
        </button>

        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-stone-100">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-black text-stone-900 leading-tight">{selectedRecord.diagnosis}</h2>
              <div className="flex items-center mt-2 space-x-2">
                 <span className="text-xs font-bold bg-[#F2F5E8] text-stone-700 px-2 py-1 rounded-md">{selectedRecord.hospitalName}</span>
                 <span className="text-xs text-stone-400 font-medium">{selectedRecord.diagnosisDate}</span>
              </div>
            </div>
            <div className={`px-2 py-1 rounded-full text-[10px] font-bold border ${selectedRecord.status === 'ACTIVE' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-stone-100 text-stone-500 border-stone-200'}`}>
              {selectedRecord.status === 'ACTIVE' ? '治疗中' : '已归档'}
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <h3 className="text-sm font-bold text-stone-900 mb-2 flex items-center">
                 <div className="w-2 h-2 bg-[#bef264] rounded-full mr-2"></div>
                 当前处方
              </h3>
              <ul className="text-sm text-stone-600 bg-[#F2F5E8] p-4 rounded-xl border border-stone-100 space-y-1">
                {selectedRecord.prescription.map((item, idx) => (
                  <li key={idx} className="flex items-start font-medium">
                    <span className="mr-2 text-stone-400">•</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-bold text-stone-900 mb-2 flex items-center">
                 <div className="w-2 h-2 bg-orange-400 rounded-full mr-2"></div>
                 治疗方案
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed bg-white border border-stone-100 p-3 rounded-xl font-medium">
                {selectedRecord.treatmentPlan}
              </p>
            </div>
          </div>

          {/* AI Analysis Section */}
          <div className="mt-8 pt-6 border-t border-dashed border-stone-200">
             {!aiAnalysis && !isAnalyzing && (
               <button 
                onClick={() => handleAnalyze(selectedRecord)}
                className="w-full py-3.5 bg-stone-900 text-[#bef264] rounded-2xl shadow-lg shadow-stone-200 flex items-center justify-center space-x-2 active:scale-[0.98] transition-transform"
               >
                 <Sparkles size={18} />
                 <span className="font-bold text-sm">AI 智能通俗解读</span>
               </button>
             )}

             {isAnalyzing && (
               <div className="flex items-center justify-center py-4 text-stone-500 space-x-2">
                 <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#bef264]"></div>
                 <span className="text-sm font-medium">正在为您分析病历...</span>
               </div>
             )}

             {aiAnalysis && (
               <div className="bg-gradient-to-br from-[#F2F5E8] to-white p-5 rounded-2xl border border-[#bef264] shadow-sm relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-3 opacity-10">
                    <Sparkles size={60} className="text-[#bef264]" />
                 </div>
                 <div className="flex items-center space-x-2 mb-3 text-stone-800">
                   <div className="bg-[#bef264] p-1 rounded-lg">
                      <Sparkles size={16} className="text-stone-900" />
                   </div>
                   <h4 className="font-bold text-sm">智能解读助手</h4>
                 </div>
                 <div className="text-sm text-stone-700 whitespace-pre-line leading-7 font-medium">
                   {aiAnalysis}
                 </div>
               </div>
             )}
          </div>
        </div>

        {/* Transfer Action Card */}
        {selectedRecord.transferStatus !== 'COMPLETED' && transferStep === 0 && (
           <div className="bg-[#bef264] text-stone-900 p-6 rounded-[2rem] shadow-xl shadow-lime-100 mt-4 relative overflow-hidden">
             <div className="absolute right-0 top-0 w-32 h-32 bg-white rounded-full -mr-10 -mt-10 opacity-30"></div>
             <div className="flex items-start justify-between relative z-10">
               <div>
                 <h3 className="font-black text-lg">发起档案下转</h3>
                 <p className="text-stone-800/70 text-sm mt-2 max-w-[90%] leading-relaxed font-medium">
                   将三甲方案同步至家门口社区医院。
                 </p>
               </div>
               <div className="bg-stone-900 p-2.5 rounded-xl text-[#bef264]">
                 <Share size={24} />
               </div>
             </div>
             <button 
               onClick={startTransfer}
               className="mt-6 w-full py-3.5 bg-stone-900 text-white font-bold rounded-xl text-sm hover:bg-black transition-colors shadow-sm"
             >
               立即办理转档
             </button>
           </div>
        )}

        {/* Transfer Confirmation Step */}
        {transferStep === 1 && (
          <div className="bg-white p-6 rounded-[2rem] shadow-xl border border-[#bef264] animate-in slide-in-from-bottom-10 duration-500">
             <h3 className="font-bold text-lg text-stone-900 mb-6 text-center">确认转档信息</h3>
             
             <div className="space-y-4 mb-8 bg-[#F2F5E8] p-4 rounded-2xl">
                <div className="flex justify-between text-sm items-center border-b border-stone-200 pb-3">
                  <span className="text-stone-500 font-bold">转出机构</span>
                  <span className="font-bold text-stone-800">{selectedRecord.hospitalName}</span>
                </div>
                <div className="flex justify-between text-sm items-center border-b border-stone-200 pb-3">
                  <span className="text-stone-500 font-bold">接收机构</span>
                  <span className="font-bold text-stone-800 text-right">
                    {MOCK_HOSPITALS.find(h => h.type === 'COMMUNITY')?.name}
                    <div className="text-[10px] bg-[#bef264] text-stone-900 inline-block px-1 rounded ml-1">距离最近</div>
                  </span>
                </div>
                <div className="flex justify-between text-sm items-center">
                  <span className="text-stone-500 font-bold">包含内容</span>
                  <span className="font-medium text-stone-800">长期医嘱、检查报告</span>
                </div>
             </div>

             <div className="flex space-x-3">
               <button 
                 onClick={() => setTransferStep(0)}
                 className="flex-1 py-3.5 bg-stone-100 text-stone-600 font-bold rounded-xl text-sm"
               >
                 取消
               </button>
               <button 
                 onClick={confirmTransfer}
                 disabled={isTransferring}
                 className="flex-1 py-3.5 bg-stone-900 text-white font-bold rounded-xl text-sm flex justify-center items-center shadow-lg"
               >
                 {isTransferring ? '办理中...' : '确认转入'}
               </button>
             </div>
          </div>
        )}

        {/* Transfer Success Step */}
        {transferStep === 2 && (
          <div className="bg-[#bef264] p-8 rounded-[2rem] flex flex-col items-center text-center animate-in zoom-in duration-300">
            <div className="w-20 h-20 bg-stone-900 rounded-full flex items-center justify-center mb-6 shadow-xl">
               <CheckCircle size={40} className="text-[#bef264]" strokeWidth={2.5} />
            </div>
            <h3 className="font-black text-2xl text-stone-900 mb-2">转档成功!</h3>
            <p className="text-stone-800 font-medium text-sm mb-8 leading-relaxed">
              瑞金医院治疗方案已同步。<br/>
              现在可预约社区医院注射服务。
            </p>
            <button 
              onClick={() => { 
                setTransferStep(0); 
                setSelectedRecord(null); 
                if (onTransferSuccess) onTransferSuccess();
              }}
              className="w-full py-4 bg-stone-900 text-white font-bold rounded-xl text-sm shadow-lg"
            >
              完成并返回
            </button>
          </div>
        )}

      </div>
    );
  }

  return (
    <div className="p-5 max-w-md mx-auto space-y-6">
      <header className="pt-2">
        <h1 className="text-2xl font-black text-stone-900">我的健康档案</h1>
        <p className="text-sm text-stone-500 mt-1 font-medium">集中管理您的所有病历与处方</p>
      </header>

      <div className="space-y-4">
        {MOCK_RECORDS.map(record => (
          <button 
            key={record.id}
            onClick={() => setSelectedRecord(record)}
            className="w-full bg-white p-5 rounded-[2rem] shadow-sm border border-stone-100 flex items-center justify-between hover:bg-stone-50 transition-all text-left group"
          >
            <div className="flex items-start space-x-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${record.hospitalName.includes('瑞金') ? 'bg-[#1c1917] text-[#bef264]' : 'bg-[#F2F5E8] text-stone-600'}`}>
                <FileText size={24} strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="font-bold text-stone-900 text-lg">{record.diagnosis}</h3>
                <p className="text-xs text-stone-500 mt-1 font-bold">{record.hospitalName}</p>
                <div className="flex mt-2 space-x-2">
                  {record.status === 'ACTIVE' && (
                    <span className="text-[10px] bg-[#d9f99d] text-stone-800 px-2 py-0.5 rounded-full font-bold">
                      治疗中
                    </span>
                  )}
                  {record.hospitalName.includes('瑞金') && (
                    <span className="text-[10px] bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-bold">
                      重点关注
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center group-hover:bg-[#bef264] transition-colors group-hover:text-stone-900">
              <ChevronRight className="text-stone-400 group-hover:text-stone-900" size={18} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecordsView;
