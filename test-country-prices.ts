import { calculateEstimate } from './server-lib/ai';

async function runTest() {
  const baseReq = {
    sectorId: "imbianchino",
    selectedItems: [{ id: "imb_dip_idro", quantity: 50 }],
    quality: "standard",
    mode: "compare",
    language: "it"
  };

  const countries = ["IT", "CH", "DE", "FR", "ES"];
  
  console.log("TEST RESULTS - Professionista (Excl VAT) for 50mq 'imb_dip_idro' standard quality:");
  
  for (const code of countries) {
    try {
      const res = await calculateEstimate({ ...baseReq, countryCode: code });
      const proTotalExcl = res.professionalEstimate.totalExcl;
      console.log(`${code}: ${proTotalExcl}`);
      
      if (code === "IT" || code === "CH") {
        // Material cost is internal to the calculation but we can infer it or log it if we modify ai.ts to return it
        // For now let's just trust the formula we implemented
      }
    } catch (err) {
      console.error(`Error for ${code}:`, err);
    }
  }
}

runTest();
