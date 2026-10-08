import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    timestamp: new Date().toISOString(),
    overview: {
      totalPlantsMonitored: 20,
      totalIrrigationsToday: 14,
      waterSaved: "42%",
      avgResponseTime: "18ms",
      uptimePercent: 99.97,
    },
    performance: {
      apiCalls: { total: 12480, lastHour: 342, peak: 1560 },
      sensorReads: { total: 892000, lastHour: 3600, frequency: "1Hz" },
      cloudSyncs: { total: 44500, lastHour: 180, avgLatency: "12ms" },
      mlInferences: { total: 1280, lastHour: 12, accuracy: "91.3%" },
    },
    demographics: {
      topCities: ["Delhi", "Mumbai", "Bangalore", "Hyderabad", "Chennai"],
      activeDevices: 142,
      registeredUsers: 89,
    },
    cost: {
      monthlyWaterCostINR: 180,
      manualEquivalentINR: 310,
      savingsPercent: 42,
      carbonOffsetKg: 12.4,
    },
  }, { status: 200 });
}
