import { NextResponse } from "next/server";


export async function GET() {
  try {
    const url = "https://api.coingecko.com/api/v3/simple/supported_vs_currencies";
    
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": process.env.COINGECKO_API_KEY ?? "",
      },
    };

    const response = await fetch(url, options);
    if (!response.ok) throw new Error("Failed to fetch crypto data");

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
