import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { AssistantRuntimeProvider } from '@assistant-ui/react';
import { useChatRuntime } from '@assistant-ui/react-ai-sdk';
import { Thread } from '../assistant-ui/thread';

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  
  // Connects to the /api/chat endpoint using Vercel AI SDK's standard protocol
  const runtime = useChatRuntime({ api: '/api/chat' });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 transition-all transform hover:scale-105 flex items-center justify-center ${isOpen ? 'hidden' : 'block'}`}
        aria-label="Ask AI"
      >
        <MessageSquare size={24} />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[400px] h-[600px] max-h-[80vh] max-w-[calc(100vw-2rem)] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-slate-800 p-4 flex justify-between items-center border-b border-slate-700 shrink-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-slate-100">FlightManual Agent</h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-400">STATEFUL</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-200 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Assistant UI Thread Container */}
          <div className="flex-1 overflow-hidden relative flex flex-col bg-slate-950 text-slate-200 assistant-ui-theme">
            <style>{`
              .assistant-ui-theme {
                --aui-primary: #4f46e5;
                --aui-primary-foreground: #ffffff;
                --aui-muted: #1e293b;
                --aui-muted-foreground: #94a3b8;
                --aui-background: #020617;
                --aui-foreground: #f8fafc;
                --aui-border: #334155;
              }
              /* Simple overrides to make Assistant UI match our dark theme */
              .aui-thread { height: 100%; display: flex; flex-direction: column; }
              .aui-thread-viewport { flex: 1; overflow-y: auto; padding: 1rem; }
              .aui-composer { border-top: 1px solid var(--aui-border); padding: 1rem; background: var(--aui-muted); }
              .aui-composer-input { width: 100%; background: transparent; color: white; border: none; outline: none; }
              .aui-message { margin-bottom: 1rem; }
              .aui-message-user { background: var(--aui-primary); padding: 0.75rem; border-radius: 0.5rem; margin-left: auto; max-width: 85%; }
              .aui-message-assistant { background: var(--aui-background); border: 1px solid var(--aui-border); padding: 0.75rem; border-radius: 0.5rem; margin-right: auto; max-width: 95%; }
            `}</style>
            
            <Thread 
              welcome={{
                message: "Hello! I am your stateful FlightManual AI. What are you building today?"
              }}
            />
          </div>
        </div>
      )}
    </AssistantRuntimeProvider>
  );
}
