export type AnalysisStatus = "Processing" | "Failed" | "Completed";

export interface BenefitItem {
  _id: string;
  description: string;
  evidence: string[];
}

export interface PotentialRiskItem {
  _id: string;
  description: string;
  evidence: string[];
}

export interface SkinCompatibility {
  acneProne: string;
  dry: string;
  oily: string;
  sensitive: string;
}

export interface IngredientAnalysisDetail {
  _id: string;
  __v: number;
  ingredient: string;
  description: string;
  benefits: BenefitItem[];
  potentialRisks: PotentialRiskItem[];
  skinCompatibility: SkinCompatibility;
  whatItDoes: string[];
  createdAt: string;
  updatedAt: string;
}

export interface AnalyzedIngredient {
  _id: string;
  id: string;
  name: string;
  casNumber: string | null;
  aliases: string[];
  __v: number;
  analysis: IngredientAnalysisDetail;
}

export interface ImageAnalysisApiResponse {
  _id: string;
  __v: number;
  User: string;
  status: AnalysisStatus;
  Analysis: AnalyzedIngredient[];
  createdAt: string;
  updatedAt: string;
}
