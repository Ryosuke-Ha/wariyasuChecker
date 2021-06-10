import { UsCompany } from "src/app/model/us-company.model";

export class Sector{
  sectorId: string;
  sectorName: string;
}

export class SectorWithCompanyList{
  sectorName: string;
  companyList: UsCompany[];
}
