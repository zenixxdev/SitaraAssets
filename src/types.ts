export interface Asset {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  categoryId: string;
  tags: string[];
  previewImage: string;
  coverImage: string;
  license: string;
  stars: number;
  reviewCount: number;
  featured: boolean;
  editorChoice: boolean;
  mainBoard: boolean;
  createdDate: string;
  updatedDate: string;
  codeStructureType: string;
  threejsCode: string;
  usageInstructions: string;
  customizationInstructions: string;
  performanceTips: string;
  visibility: 'visible' | 'hidden';
}

export interface Review {
  id: string;
  assetId: string;
  rating: number;
  text: string;
  name?: string;
  createdAt: string;
  approved: boolean;
  helpfulVotes: number;
}

export interface Category {
  id: string;
  name: string;
}
