import React, { useState, useEffect } from 'react';
import { Play, Loader2, CheckCircle2, XCircle, Key } from 'lucide-react';

interface InlinePlaygroundProps {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  url: string;
  defaultBody?: string;
}

export function InlinePlayground({ method = 'GET', url, defaultBody = '' }: InlinePlaygroundProps) {
  const [body, setBody] = useState(defaultBody);
  const [response, setResponse] = useState<string | null>(null);
  const [status, setStatus] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    setApiKey(localStorage.getItem('flight-manual-api-key') || '');
  }, []);

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setApiKey(val);
    localStorage.setItem('flight-manual-api-key', val);
  };

  const methodColors = {
    GET: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    POST: 'bg-green-500/10 text-green-500 border-green-500/20',
    PUT: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
    DELETE: 'bg-red-500/10 text-red-500 border-red-500/20',
    PATCH: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  };

  const handleSend = async () => {
    setLoading(true);
    setResponse(null);
    setStatus(null);

    try {
      const options: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(apiKey ? { 'Authorization': `Bearer ${apiKey}` } : {})
        },
      };

      if (method !== 'GET' && method !== 'DELETE' && body) {
        options.body = body;
      }

      const res = await fetch(url, options);
      setStatus(res.status);
      
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await res.json();
        setResponse(JSON.stringify(data, null, 2));
      } else {
        const text = await res.text();
        setResponse(text);
      }
    } catch (error: any) {
      setStatus(0);
      setResponse(error.message || 'Network Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-6 flex flex-col overflow-hidden rounded-xl border border-border/60 bg-background shadow-sm">
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-border/60 bg-muted/30 px-4 py-3">
        <div className="flex items-center gap-3 overflow-hidden">
          <span className={`rounded px-2 py-0.5 text-[11px] font-bold tracking-wider uppercase border ${methodColors[method]}`}>
            {method}
          </span>
          <code className="truncate text-sm font-mono font-medium text-foreground/80">{url}</code>
        </div>
        <button
          onClick={handleSend}
          disabled={loading}
          className="flex items-center gap-2 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 disabled:opacity-50 active:scale-95 cursor-pointer"
        >
          {loading ? <Loader2 size={14} className="animate-spin" /> : <Play size={14} className="fill-current" />}
          Send
        </button>
      </div>

      {/* Auth Input */}
      <div className="flex items-center gap-2 border-b border-border/60 bg-muted/10 px-4 py-2">
        <Key size={14} className="text-muted-foreground" />
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider min-w-[100px]">Bearer Token</span>
        <input 
          type="password"
          value={apiKey}
          onChange={handleApiKeyChange}
          placeholder="Enter your API key..."
          className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
        />
      </div>

      {/* Body Input */}
      {method !== 'GET' && method !== 'DELETE' && (
        <div className="border-b border-border/60 bg-muted/5 p-4">
          <div className="mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Body (JSON)</div>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full rounded-md border border-border/40 bg-background/50 p-3 text-sm font-mono text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary min-h-[120px] resize-y"
            placeholder="{\n  \u0022key\u0022: \u0022value\u0022\n}"
            spellCheck={false}
          />
        </div>
      )}

      {/* Response Area */}
      {status !== null && (
        <div className="bg-muted/10 p-4">
          <div className="mb-3 flex items-center gap-2">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Response</div>
            <div className={`flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-bold border ${status >= 200 && status < 300 ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}>
              {status >= 200 && status < 300 ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
              {status === 0 ? 'Error' : status}
            </div>
          </div>
          <div className="relative overflow-hidden rounded-md border border-border/40 bg-[#0d1117] p-4 text-sm shadow-inner">
            <pre className="overflow-x-auto">
              <code className="font-mono text-[#c9d1d9]">{response}</code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
