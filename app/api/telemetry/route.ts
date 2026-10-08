import { NextRequest, NextResponse } from "next/server";

function generateTrend(base: number, variance: number, count: number) {
  return Array.from({ length: count }, () => parseFloat((base + (Math.random() - 0.5) * variance).toFixed(1)));
}

export async function GET() {
  const moisture = Math.round(60 + Math.random() * 20);
  const temperature = parseFloat((20 + Math.random() * 10).toFixed(1));
  const humidity = Math.round(55 + Math.random() * 15);
  const light = Math.round(150 + Math.random() * 200);

  const data = {
    timestamp: new Date().toISOString(),
    sensors: {
      moisture: { value: moisture, unit: "%", threshold: 65, status: moisture < 65 ? "BELOW_THRESHOLD" : "NOMINAL", trend: generateTrend(moisture, 5, 8) },
      temperature: { value: temperature, unit: "°C", threshold: 32, status: "NOMINAL", trend: generateTrend(temperature, 2, 8) },
      humidity: { value: humidity, unit: "%", threshold: 80, status: "NOMINAL", trend: generateTrend(humidity, 5, 8) },
      light: { value: light, unit: "lux", threshold: 200, status: light > 200 ? "NOMINAL" : "LOW", trend: generateTrend(light, 50, 8) },
    },
    tank: { level: Math.round(70 + Math.random() * 20), unit: "%", capacity: 10, status: Math.random() > 0.8 ? "LOW" : "NOMINAL", trend: generateTrend(75, 8, 8) },
    npk: { n: Math.round(40 + Math.random() * 10), p: Math.round(20 + Math.random() * 10), k: Math.round(60 + Math.random() * 10), unit: "ppm" },
    actuator: {
      pump: { status: Math.random() > 0.7 ? "RUNNING" : "IDLE", relay: "K1", runtime: Math.round(Math.random() * 10) },
      uvArray: { status: Math.random() > 0.5 ? "ON" : "OFF" },
    },
    system: { uptime: 99.97, firmware: "V3.0.0", wifi: { ssid: "VERDE_MESH_01", signal: -42, standard: "802.11n" } },
    ai: { activeProfile: "Tulsi", confidence: 0.94, mode: "AUTONOMOUS" },
  };
  return NextResponse.json({ success: true, data }, { status: 200 });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    return NextResponse.json({
      success: true,
      received: true,
      timestamp: new Date().toISOString(),
      payload: body,
      sync: "QUEUED",
    }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
}
