
"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, ChevronRight, X, Minus, Square } from "lucide-react";
import { COMMANDS, CommandResponse } from "@/lib/terminal-commands";
import { MechPanel } from "./MechPanel";
import { cn } from "@/lib/utils";

interface HistoryItem {
  command: string;
  response: CommandResponse;
  id: string;
}

export function TerminalCLI() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isMinimized, setIsMinimized] = useState(false);
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
    // Always keep input focused
    inputRef.current?.focus();
  }, [history, isMinimized]);

  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim(); // Keep original case for processing if needed, but commands registry uses lowercase
    const lowerCmd = cmd.toLowerCase();
    
    let response: CommandResponse;
    
    if (lowerCmd === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    // Try full command first (for multi-word commands like 'sudo hire')
    if (COMMANDS[lowerCmd]) {
      response = await COMMANDS[lowerCmd]([]);
    } else {
      // Try first word as command
      const [commandName, ...args] = lowerCmd.split(" ");
      if (COMMANDS[commandName]) {
        response = await COMMANDS[commandName](args);
      } else {
        response = {
          output: `ERROR: Command '${lowerCmd}' not recognized. Type 'help' for directory.`,
          type: "error"
        };
      }
    }

    setHistory(prev => [...prev, {
      command: cmd,
      response,
      id: Math.random().toString(36).substr(2, 9)
    }]);
    setInput("");

    // Handle automated navigation if requested by command
    if (response.redirect) {
      setTimeout(() => {
        router.push(response.redirect!);
      }, 1000);
    }
    
    // Ensure focus returns to input after async command
    setTimeout(() => {
      inputRef.current?.focus();
    }, 10);
  };

  const getTypeColor = (type: CommandResponse["type"]) => {
    switch (type) {
      case "success": return "text-[var(--neon)]";
      case "error": return "text-red-500";
      case "warning": return "text-[color-mix(in_srgb,var(--neon)_80%,white)] font-bold";
      case "ascii": return "text-[var(--text)] font-mono text-[10px]";
      default: return "text-[var(--text)]";
    }
  };

  return (
    <MechPanel border glowHover={false} className={cn("w-full max-w-2xl mx-auto flex flex-col transition-all duration-300", isMinimized ? "h-auto" : "h-[400px]")}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[var(--bg2)] border-b border-[color-mix(in_srgb,var(--neon)_20%,transparent)]">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[var(--neon)]" />
          <span className="font-orbitron text-[10px] tracking-widest text-[var(--text)] uppercase">FM_OS :: TERMINAL_V1.0</span>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setIsMinimized(!isMinimized)} 
            className="p-1 hover:text-[var(--neon)] transition-colors"
            aria-label={isMinimized ? "Expand terminal" : "Minimize terminal"}
          >
             <Minus className="w-3 h-3" />
          </button>
          <Square className="w-3 h-3 opacity-20" />
          <button
            onClick={() => setIsMinimized(true)}
            aria-label="Close terminal"
            className="opacity-20 hover:text-red-500 hover:opacity-100 transition-colors cursor-pointer"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {!isMinimized && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="flex-1 flex flex-col overflow-hidden"
          >
            <div 
              ref={scrollRef}
              onClick={() => inputRef.current?.focus()} // Focus input when clicking terminal area
              className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-sm scrollbar-thin scrollbar-thumb-[var(--neon)] cursor-text"
            >
              {/* Welcome Message */}
              <div className="text-[var(--neon)]/60 animate-pulse">
                [SYSTEM READY] - UNKNOWN SUBJECT DETECTED.
                INITIALIZING NEURAL LINK... TYPE 'help' TO BEGIN.
              </div>

              {history.map((item) => (
                <div key={item.id} className="space-y-1">
                  <div className="flex items-center gap-2 text-white">
                    <ChevronRight className="w-3 h-3 text-[var(--neon)]" />
                    <span className="opacity-50">@terminal:</span>
                    <span>{item.command}</span>
                  </div>
                  <div className={`pl-5 whitespace-pre-wrap leading-relaxed ${getTypeColor(item.response.type)}`}>
                    {item.response.output}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Line */}
            <form onSubmit={handleCommand} className="p-4 border-t border-[color-mix(in_srgb,var(--neon)_20%,transparent)] bg-[var(--bg)] flex items-center gap-2 relative">
              <ChevronRight className="w-4 h-4 text-[var(--neon)]" />
              <span className="font-mono text-[color-mix(in_srgb,var(--neon)_40%,transparent)] text-xs">@terminal:</span>
              <div className="flex-1 relative flex items-center">
                <input 
                  ref={inputRef}
                  autoFocus
                  type="text"
                  id="terminal-input"
                  aria-label="Terminal command interface"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-[var(--neon)] font-mono text-sm caret-transparent"
                  autoComplete="off"
                  spellCheck="false"
                />
                {!input && (
                  <motion.span 
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="absolute left-0 w-2 h-4 translate-y-[1px]"
                    style={{ backgroundColor: "var(--neon)" }}
                  />
                )}
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </MechPanel>
  );
}
