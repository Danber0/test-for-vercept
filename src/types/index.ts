export interface ImageFile {
  file: File;
  url: string;
  name: string;
  id: number;
}

export interface AnalysisResponse {
  imageId: number;
  imageName: string;
  imageUrl: string;
  query: string;
  response: string;
  timestamp: string;
}
