export interface DetectifyResponse {
  uuid: string;
}

export interface DetectifiedProcessed extends Detectified {
  image: DetectifiedImage;
  objects: string[];
}

export interface Detectified {
  uuid: string;
  path: string;
  org_path: string;
  results: DetectifiedResult[];
  counts: Record<string, number>;
}

export interface DetectifiedResult {
  label: string;
  score: number;
}

export interface DetectifiedImage {
  original: string;
  predicted: string;
}
