
import { GoogleGenAI } from "@google/genai";
import { MedicalRecord, Hospital } from '../types';

// Initialize Gemini
// Note: In a real app, ensure process.env.API_KEY is defined.
// If missing, we'll handle gracefully in the UI.
const apiKey = process.env.API_KEY || ''; 
const ai = new GoogleGenAI({ apiKey });

export const analyzeMedicalRecord = async (record: MedicalRecord): Promise<string> => {
  if (!apiKey) return "API Key 未配置，无法使用智能分析功能。";

  try {
    const prompt = `
      请作为一名专业的全科医生助手，用通俗易懂的语言（适合老年人阅读）为患者解读以下病历摘要。
      重点解释：
      1. 诊断结果是什么意思？
      2. 这种治疗方案的目的是什么？
      3. 日常生活需要注意什么？
      
      病历信息：
      诊断：${record.diagnosis}
      医院：${record.hospitalName}
      处方：${record.prescription.join(', ')}
      治疗计划：${record.treatmentPlan}
    `;

    // Using gemini-3-flash-preview as recommended for text processing tasks
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "无法生成解读，请稍后再试。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "智能服务暂时不可用，请检查网络连接。";
  }
};

export const recommendHospital = async (record: MedicalRecord, hospitals: Hospital[]): Promise<string> => {
    if (!apiKey) return "API Key 未配置。";

    try {
      const hospitalListStr = hospitals
        .filter(h => h.type === 'COMMUNITY')
        .map(h => `- ${h.name} (标签: ${h.tags.join(', ')})`)
        .join('\n');

      const prompt = `
        患者需要进行以下治疗：${record.treatmentPlan} (处方: ${record.prescription.join(', ')})。
        请在以下社区医院列表中，推荐最适合承接该患者后续治疗（如注射、取药）的机构，并说明理由。
        
        候选医院：
        ${hospitalListStr}
      `;

      // Using gemini-3-flash-preview as recommended for text processing tasks
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });

      return response.text || "无法生成推荐。";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "智能推荐暂时不可用。";
    }
};
