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
  companyId: string;
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
  id: string;
  name: string;
  year: number;
  EPS: number | null;
  SPS: number | null;
  BPS: number | null;
  YEILD: number | null;
}

export interface AverageIndex {
  id: string;
  name: string;
  year: number | null;
  highPER: number | null;
  lowPER: number | null;
  highPSR: number | null;
  lowPSR: number | null;
  highPBR: number | null;
  lowPBR: number | null;
  highYeild: number | null;
  lowYeild: number | null;
}

export interface UsCompany{
  companyId: string;
  companyName: string;
  ticker: string;
  sectorId: string;
  deleteFlg: number;
}
