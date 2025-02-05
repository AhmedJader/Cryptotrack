import { NextResponse } from "next/server";


export async function GET() {
  try {
    const url = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=cad&include_24hr_change=true&precision=0";
    
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
