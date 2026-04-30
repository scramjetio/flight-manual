export const onRequestPost: PagesFunction = async (context) => {
  try {
    // Vercel AI SDK useChat hook sends { messages: [...] }
    const body = await context.request.json() as { messages: any[] };
    
    // Assistant UI sends the entire history, but since we are stateful,
    // we only care about the latest user message.
    const latestMessage = body.messages[body.messages.length - 1]?.content;

    if (!latestMessage) {
      return new Response('Message is required', { status: 400 });
    }

    // In a real cloud environment, we would grab a Durable Object stub
    // const id = context.env.DOCS_AGENT.idFromName("default-session");
    // const agent = context.env.DOCS_AGENT.get(id);
    // return agent.fetch(new Request("http://internal/chat", {
    //   method: "POST",
    //   body: JSON.stringify({ message: latestMessage })
    // }));

    // For local development without Durable Objects bound, we will mock the
    // Vercel AI SDK 'data' stream format which assistant-ui expects.
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const text = "Hi there! I am the FlightManual Stateful Agent. I am running locally without Cloudflare Durable Object bindings, so this is a simulated stream. Once you deploy to Cloudflare, I will become fully stateful!";
        const chunks = text.split(" ");
        for (const chunk of chunks) {
          // Vercel AI SDK stream protocol uses '0: "chunk"' format
          controller.enqueue(encoder.encode(`0:${JSON.stringify(chunk + " ")}\n`));
          await new Promise(r => setTimeout(r, 50));
        }
        controller.close();
      }
    });

    return new Response(stream, { 
      headers: { 
        'Content-Type': 'text/plain; charset=utf-8',
        'x-vercel-ai-data-stream': 'v1'
      } 
    });

  } catch (error) {
    console.error('Agent Error:', error);
    return new Response(JSON.stringify({ error: "Failed to communicate with Agent" }), { status: 500 });
  }
};
