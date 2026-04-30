export const onRequestPost: PagesFunction = async (context) => {
  try {
    const data = await context.request.json() as { path: string, vote: 'up' | 'down' };
    
    // In a real production app, this is where we would insert into Cloudflare D1
    // const db = context.env.DB;
    // await db.prepare("INSERT INTO feedback (path, vote) VALUES (?, ?)").bind(data.path, data.vote).run();

    console.log(`[FlightManual] Received feedback: ${data.vote} for path: ${data.path}`);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Invalid request" }), { status: 400 });
  }
};
