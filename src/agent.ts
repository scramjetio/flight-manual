import { DurableObject } from "cloudflare:workers";

/**
 * DocsAgent is a stateful Cloudflare Durable Object.
 * Instead of relying on the browser to send the full conversation history,
 * this Agent retains long-term memory in its persistent state.
 */
export class DocsAgent extends DurableObject {
  private messages: Array<{role: string, content: string}> = [];
  
  constructor(ctx: DurableObjectState, env: any) {
    super(ctx, env);
    this.messages = [
      { role: "system", content: "You are the FlightManual Stateful Agent. You remember conversation history." }
    ];
    
    // Load history from persistent storage when waking up
    ctx.blockConcurrencyWhile(async () => {
      const stored = await ctx.storage.get("messages");
      if (stored) {
        this.messages = stored as any;
      }
    });
  }

  async fetch(request: Request) {
    const { message } = await request.json() as { message: string };
    
    if (!message) {
      return new Response('Message required', { status: 400 });
    }

    // Append user message to stateful history
    this.messages.push({ role: "user", content: message });

    // Since this is a demo, if we don't have the AI binding, simulate it
    if (!this.env.AI) {
      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        async start(controller) {
          const text = "I am the FlightManual Stateful Agent! Since you are running locally without bindings, this is a simulation. But I remember that this is message number " + this.messages.length;
          const chunks = text.split(" ");
          for (const chunk of chunks) {
            controller.enqueue(encoder.encode("0:" + JSON.stringify(chunk + " ") + "\n"));
            await new Promise(r => setTimeout(r, 50));
          }
          controller.close();
        }
      });
      
      this.messages.push({ role: "assistant", content: "I am the FlightManual Stateful Agent..." });
      await this.ctx.storage.put("messages", this.messages);
      
      return new Response(stream, { headers: { "Content-Type": "text/x-unknown" } });
    }

    // Call Cloudflare Workers AI with full retained history
    const stream = await this.env.AI.run(
      '@cf/meta/llama-3-8b-instruct',
      {
        messages: this.messages,
        stream: true
      }
    );

    // TODO: In a real implementation, we would consume the stream, append the final assistant response
    // to this.messages, and save it to this.ctx.storage, while forwarding the stream to the user.
    // For now, we return the stream directly to the Pages proxy.

    return new Response(stream, {
      headers: { "Content-Type": "text/event-stream" }
    });
  }
}
