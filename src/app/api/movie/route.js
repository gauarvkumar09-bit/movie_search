import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: "Please enter an IMDb ID" }, { status: 400 });
  }

  try {

const apiKey = process.env.NEXT_PUBLIC_API_KEY || "64a1c176"; 
// Agar env se nahi mila, toh ye hard-coded key use karega.
    const url = `https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`;
    
    console.log("Fetching from:", url); 

    const res = await fetch(url);
    const data = await res.json();

   
    if (data.Response === "False") {
      console.log("OMDb Error:", data.Error);
      return NextResponse.json({ error: data.Error || "Movie not found" }, { status: 404 });
    }

    // 3. AI Insight Logic
    const rating = parseFloat(data.imdbRating) || 0;
    let sentiment = rating > 7.5 ? "Positive" : rating > 5.5 ? "Mixed" : "Negative";
    
    return NextResponse.json({
      ...data,
      aiSummary: `Audience sentiment for this movie is generally ${sentiment.toLowerCase()}.`,
      sentimentClass: sentiment
    });

  } catch (err) {
    console.error("Server Crash Error:", err);
    return NextResponse.json({ error: "Failed to connect to OMDb API" }, { status: 500 });
  }
}