export interface FinalDisplay {
  name: string;
  ticker: string;
  sector: string;
  PBR: number;
  PSR: number;
  XXX: number;
  YYY: number;
}

export interface LatestValue {
  companyId: number;
  companyName: string;
  lastRefreshed: string;
  ticker: string;
  open: number;
  high: number;
  low: number;
  close: number;
  adjusted: number;
}

export interface Index {
  id: number;
  name: string;
  year: number;
  EPS: number | null;
  SPS: number | null;
  BPS: number | null;
  YEILD: number | null;
}

export interface AverageIndex {
  id: number;
  name: string;
  year: number | null;
  highPER: number;
  lowPER: number;
  highPSR: number;
  lowPSR: number;
  highPBR: number;
  lowPBR: number;
  highYeild: number;
  lowYeild: number;
}
