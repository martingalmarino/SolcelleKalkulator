import { priceData, FylkeType } from "./priceData";
import { incentivesData } from "./incentivesData";

export interface ROICalculationResult {
  annualSavings: number;
  paybackYears: number;
  netCost: number;
  enovaSupport: number;
  localSupport: number;
  systemCost: number;
  totalSupport: number;
}

export function calcROI({ 
  fylke, 
  systemSizeKW, 
  annualProductionKWh 
}: {
  fylke: FylkeType;
  systemSizeKW: number;
  annualProductionKWh: number;
}): ROICalculationResult {
  const powerPrice = priceData[fylke] || 0.18; 
  const annualSavings = annualProductionKWh * powerPrice;

  const systemCost = systemSizeKW * 12000; // NOK per kW (example)
  const enovaSupport = Math.min(
    incentivesData.enova.baseGrantNOK + (systemSizeKW * incentivesData.enova.perKWNOK),
    incentivesData.enova.maxNOK
  );
  const localSupport = incentivesData.local[fylke]?.extraGrantNOK || 0;
  const totalSupport = enovaSupport + localSupport;

  const netCost = systemCost - totalSupport;
  const paybackYears = netCost / annualSavings;

  return { 
    annualSavings, 
    paybackYears, 
    netCost, 
    enovaSupport, 
    localSupport,
    systemCost,
    totalSupport
  };
}
