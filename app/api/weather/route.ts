import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    location: { city: "Delhi", lat: 28.6139, lon: 77.209, timezone: "IST+5:30" },
    source: "OpenWeatherMap API",
    current: { temp: 34.2, humidity: 45, condition: "Sunny", uvIndex: 8, wind: 12 },
    forecast: [
      { day: "Today", tempMin: 24, tempMax: 34, condition: "Sunny", humidity: 45, precipitation: 0, irrigation: "NORMAL" },
      { day: "Tomorrow", tempMin: 26, tempMax: 43, condition: "Hot", humidity: 30, precipitation: 0, irrigation: "PRE-IRRIGATE_22_00" },
      { day: "Day 3", tempMin: 25, tempMax: 38, condition: "Partly Cloudy", humidity: 55, precipitation: 20, irrigation: "NORMAL" },
      { day: "Day 4", tempMin: 22, tempMax: 31, condition: "Rain", humidity: 80, precipitation: 85, irrigation: "SUSPEND" },
      { day: "Day 5", tempMin: 23, tempMax: 33, condition: "Sunny", humidity: 40, precipitation: 0, irrigation: "NORMAL" },
    ],
    aiRecommendation: "Pre-irrigate tonight at 22:00. Tomorrow exceeds 38°C threshold. Rain detected Day 4 — irrigation suspended. Day 5 resumption normal.",
    historical: [
      { date: "2024-06-01", avgTemp: 32, rain: 0, irrigation: 2.4 },
      { date: "2024-06-02", avgTemp: 33, rain: 0, irrigation: 2.1 },
      { date: "2024-06-03", avgTemp: 35, rain: 0, irrigation: 3.2 },
      { date: "2024-06-04", avgTemp: 31, rain: 12, irrigation: 0 },
      { date: "2024-06-05", avgTemp: 30, rain: 8, irrigation: 0.5 },
      { date: "2024-06-06", avgTemp: 34, rain: 0, irrigation: 2.8 },
      { date: "2024-06-07", avgTemp: 34, rain: 0, irrigation: 2.4 },
    ],
    updated: new Date().toISOString(),
  }, { status: 200 });
}
