import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message, subject } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields", required: ["name", "email", "message"] },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const transmissionId = `VERDE-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Date.now().toString(36).substring(4).toUpperCase()}`;

    return NextResponse.json({
      success: true,
      message: "Transmission received. Our neural mesh will process your inquiry.",
      transmissionId,
      timestamp: new Date().toISOString(),
      protocol: "HTTPS // TLS 1.3",
      estimatedResponse: "< 24 hours",
    }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid payload", detail: err instanceof Error ? err.message : "Unknown" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    endpoint: "/api/contact",
    status: "ONLINE",
    protocol: "HTTPS // TLS 1.3",
    methods: ["POST", "GET"],
    version: "3.0.0",
  }, { status: 200 });
}
