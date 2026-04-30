export const onRequest: PagesFunction = async (context) => {
  const url = new URL(context.request.url);

  // Apply RBAC to any route under /enterprise/
  if (url.pathname.startsWith('/enterprise/')) {
    
    // Check for authorization (via cookie or query param for demo purposes)
    const cookieHeader = context.request.headers.get('Cookie');
    const hasAuthCookie = cookieHeader && cookieHeader.includes('FM_ENTERPRISE_TOKEN=authorized');
    const hasQueryToken = url.searchParams.get('token') === 'secret';

    if (!hasAuthCookie && !hasQueryToken) {
      return new Response(
        `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>401 - Unauthorized</title>
          <style>
            body { font-family: system-ui, -apple-system, sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; background-color: #0f172a; color: #f8fafc; }
            h1 { font-size: 3rem; margin-bottom: 0.5rem; color: #ef4444; }
            p { font-size: 1.25rem; opacity: 0.8; margin-bottom: 2rem; }
            .btn { background: #6366f1; color: white; padding: 0.75rem 1.5rem; text-decoration: none; border-radius: 0.5rem; font-weight: 600; }
          </style>
        </head>
        <body>
          <h1>401 Unauthorized</h1>
          <p>This documentation is restricted to Enterprise customers.</p>
          <a href="/?token=secret" class="btn">Login (Demo)</a>
        </body>
        </html>`,
        { 
          status: 401,
          headers: {
            'Content-Type': 'text/html',
          }
        }
      );
    }
  }

  // Pass through if authorized or not a restricted route
  return await context.next();
};
