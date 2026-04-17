
"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, ChevronRight, X, Minus, Square } from "lucide-react";
import { COMMANDS, CommandResponse } from "@/lib/terminal-commands";
import { MechPanel } from "./MechPanel";

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
      case "success": return "text-mech-cyan";
      case "error": return "text-red-500";
      case "warning": return "text-mech-blue font-bold";
      case "ascii": return "text-mech-silver font-mono text-[10px]";
      default: return "text-mech-silver";
    }
  };

  return (
    <MechPanel border glowHover={false} className="w-full max-w-2xl mx-auto overflow-hidden flex flex-col h-[400px]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-mech-panel/50 border-b border-mech-cyan/20">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-mech-cyan" />
          <span className="font-orbitron text-[10px] tracking-widest text-mech-silver uppercase">FM_OS :: TERMINAL_V1.0</span>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setIsMinimized(!isMinimized)} 
            className="p-1 hover:text-mech-cyan transition-colors"
            aria-label={isMinimized ? "Expand terminal" : "Minimize terminal"}
          >
             <Minus className="w-3 h-3" />
          </button>
          <Square className="w-3 h-3 opacity-20" />
          <X className="w-3 h-3 opacity-20" />
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
              className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-sm scrollbar-thin scrollbar-thumb-mech-cyan/20 cursor-text"
            >
              {/* Welcome Message */}
              <div className="text-mech-cyan/60 animate-pulse">
                [SYSTEM READY] - UNKNOWN SUBJECT DETECTED.
                INITIALIZING NEURAL LINK... TYPE 'help' TO BEGIN.
              </div>

              {history.map((item) => (
                <div key={item.id} className="space-y-1">
                  <div className="flex items-center gap-2 text-mech-white">
                    <ChevronRight className="w-3 h-3 text-mech-cyan" />
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
            <form onSubmit={handleCommand} className="p-4 border-t border-mech-cyan/10 bg-mech-base/30 flex items-center gap-2 relative">
              <ChevronRight className="w-4 h-4 text-mech-cyan" />
              <span className="font-mono text-mech-cyan/40 text-xs">@terminal:</span>
              <div className="flex-1 relative flex items-center">
                <input 
                  ref={inputRef}
                  autoFocus
                  type="text"
                  id="terminal-input"
                  aria-label="Terminal command interface"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-mech-cyan font-mono text-sm caret-transparent"
                  autoComplete="off"
                  spellCheck="false"
                />
                {!input && (
                  <motion.span 
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="absolute left-0 w-2 h-4 bg-mech-cyan/80 translate-y-[1px]"
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
