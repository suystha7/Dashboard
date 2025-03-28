// This file creates a server-side proxy to avoid CORS issues

export async function GET() {
    try {
      const response = await fetch("http://montessori.website/hero/api/heroapi/", {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        // The server-side request doesn't have CORS restrictions
      })
  
      if (!response.ok) {
        return new Response(JSON.stringify({ error: `API responded with status: ${response.status}` }), {
          status: response.status,
          headers: { "Content-Type": "application/json" },
        })
      }
  
      const data = await response.json()
  
      // Return the data from our own API route
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    } catch (error) {
      console.error("Proxy error:", error)
      return new Response(JSON.stringify({ error: "Failed to fetch data from API" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      })
    }
  }
  
  