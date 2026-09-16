export interface IngredientItem {
  _id: string;
  name: string;
  casNumber?: string | null;
  aliases?: string[] | null;
}

export interface PaginationResponse {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  limit: number;
  page: number;
  total: number;
  totalPages: number;
}

export interface IngredientsApiResponse {
  data: IngredientItem[];
}

export type IngredientStatus = "good" | "neutral" | "dangerous";
export type CompatibilityRating =
  | "Great"
  | "Good"
  | "Neutral"
  | "Caution"
  | string;

export interface BenefitOrRiskItem {
  _id?: string;
  description: string;
  evidence?: string | unknown[];
}

export interface SkinCompatibility {
  oily?: CompatibilityRating;
  dry?: CompatibilityRating;
  sensitive?: CompatibilityRating;
  acneProne?: CompatibilityRating;
  [key: string]: CompatibilityRating | undefined;
}

export interface AnalysisData {
  _id?: string;
  ingredient?: string;
  description?: string;
  benefits?: Array<string | BenefitOrRiskItem>;
  potentialRisks?: Array<string | BenefitOrRiskItem>;
  risks?: Array<string | BenefitOrRiskItem>;
  whatItDoes?: string[] | string;
  status?: IngredientStatus;
  skinCompatibility?: SkinCompatibility;
}

export interface IngredientAnalysisItem {
  _id: string;
  id?: string;
  name: string;
  casNumber?: string | null;
  aliases?: string[] | null;
  analysis?: AnalysisData | null;
  category?: string;
  status?: IngredientStatus;
}

export interface IngredientCardProps {
  item: IngredientAnalysisItem;
}
