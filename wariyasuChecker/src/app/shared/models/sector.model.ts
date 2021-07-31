import { UsCompany } from "./display.model";

export class Sector{
  sectorId: string;
  sectorName: string;
}

export class SectorWithCompanyList{
  sectorName: string;
  companyList: UsCompany[];
}
