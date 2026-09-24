"use client";

import { useState, useRef, useEffect, useId } from "react";
import { Hotspot, CityName, SeasonName } from "../../data/heatData";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: string[];
  timestamp: string;
}

interface ClimateCopilotProps {
  view: "scenario_lab" | "optimizer";
  city: CityName;
  season: SeasonName;
  activeHotspot?: Hotspot;
  levers?: {
    trees: number;
    roofs: number;
    shade: number;
    pavement: number;
    coolingReduction: string;
    scenarioPeakTemp: string;
    scenarioCost: string;
    peopleBenefited: string;
    energySavedMWh: number;
  };
  budget?: {
    amountCr: number;
    optReduction: string;
    optBenefited: string;
    optMWh: number;
  };
}

function CodeBlock({ code, lang }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="my-2.5 rounded-xs overflow-hidden border border-[#233834] bg-[#081514] text-[#E0ECE8] shadow-xs">
      <div className="bg-[#0D2421] px-3 py-1.5 flex items-center justify-between border-b border-[#1A3833] text-[9px] font-mono text-[#8BA8A0]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#E53935]" />
          <span className="w-2 h-2 rounded-full bg-[#FFB300]" />
          <span className="w-2 h-2 rounded-full bg-[#43A047]" />
          <span className="uppercase font-bold text-[#80CBC4] ml-1">
            {lang || "PYTHON"}
          </span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="bg-[#174D46] hover:bg-[#1E6259] text-white px-2 py-0.5 rounded-2xs text-[9px] font-mono cursor-pointer transition-colors flex items-center gap-1"
        >
          <span>{copied ? "✓ COPIED" : "📋 COPY CODE"}</span>
        </button>
      </div>
      <div className="p-3 overflow-x-auto font-mono text-[11px] leading-relaxed text-[#A7F3D0] selection:bg-[#174D46]">
        <pre className="whitespace-pre">{code}</pre>
      </div>
    </div>
  );
}

export default function ClimateCopilot({
  view = "scenario_lab",
  city = "Mumbai",
  season = "Summer",
  activeHotspot,
  levers,
  budget,
}: ClimateCopilotProps) {
  const baseId = useId();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial-greeting",
      role: "assistant",
      content:
        view === "scenario_lab"
          ? `### HeatWise Climate Copilot Active\nGrounded in real-time thermodynamic telemetry for **${
              activeHotspot?.name || city
            }** in **${city}** (${season}). Ask me how to optimize your cooling levers, analyze physical microclimate drivers, compare CapEx efficiency, or generate Python simulation models.`
          : `**HeatWise Budget Copilot Active.** Connected to the Pareto allocation engine for **${city}** (${season}) with a current envelope of **₹${
              budget?.amountCr || 12
            } Crore INR**. Ask me how to maximize population protection, optimize ward subsidies, or align with NDMA guidelines.`,
      sources: ["Surface Energy Balance & Thermodynamic Conservation", "NDMA Heat Action Plan"],
      timestamp: "Live Telemetry",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [isFullHeight, setIsFullHeight] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isExpanded) {
      chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isExpanded, isFullHeight]);

  const quickPrompts =
    view === "scenario_lab"
      ? [
          `Why is ${activeHotspot?.name || "this ward"} experiencing high heat stress?`,
          "How can we achieve a -3.0°C reduction with the lowest CapEx?",
          "Compare Cool Roofs vs Tree Canopy in terms of ROI and longevity",
          "Explain the thermodynamic energy balance equation (Rn - G = H + λE)",
        ]
      : [
          `How should we allocate ₹${budget?.amountCr || 12} Cr to maximize lives protected in ${city}?`,
          "Which municipal wards have the highest heat vulnerability score?",
          "Explain the Pareto efficiency tradeoff between CapEx and °C drop",
          "What are the NDMA Heat Action Plan guidelines for this budget?",
        ];

  const handleSend = async (userQuery?: string) => {
    const textToSend = userQuery || input.trim();
    if (!textToSend || loading) return;

    const userMessage: Message = {
      id: `${baseId}-${Date.now()}`,
      role: "user",
      content: textToSend,
      timestamp: "Now",
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!userQuery) setInput("");
    setLoading(true);

    try {
      const payload = {
        messages: [...messages, userMessage].map((m) => ({
          role: m.role,
          content: m.content,
        })),
        context: { view, city, season, activeHotspot, levers, budget },
      };

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      const assistantMessage: Message = {
        id: `${baseId}-assistant-${Date.now()}`,
        role: "assistant",
        content: data.reply || "No response received.",
        sources: data.sources || [],
        timestamp: "Now",
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      const errorMessage: Message = {
        id: `${baseId}-err-${Date.now()}`,
        role: "assistant",
        content: "⚠️ Connection to Climate Copilot backend timed out. Please check network telemetry.",
        timestamp: "Now",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Comprehensive markdown renderer for tables, headers, lists, code, quotes, and math
  const formatMarkdown = (text: string) => {
    const lines = text.split("\n");
    const elements: React.ReactNode[] = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];
      const trimmed = line.trim();

      if (!trimmed) {
        i++;
        continue;
      }

      // Code Block
      if (trimmed.startsWith("```")) {
        const lang = trimmed.slice(3).trim();
        const codeLines: string[] = [];
        i++;
        while (i < lines.length && !lines[i].trim().startsWith("```")) {
          codeLines.push(lines[i]);
          i++;
        }
        if (i < lines.length) i++;
        elements.push(
          <CodeBlock
            key={`code-${i}`}
            code={codeLines.join("\n")}
            lang={lang}
          />
        );
        continue;
      }

      // LaTeX Math Display Block: \[ ... \] or $$ ... $$
      if (trimmed.startsWith("\\[") || trimmed.startsWith("$$")) {
        const mathLines: string[] = [];
        let lineContent = trimmed;
        if (lineContent.startsWith("\\[")) lineContent = lineContent.slice(2);
        else if (lineContent.startsWith("$$")) lineContent = lineContent.slice(2);

        if (lineContent.endsWith("\\]")) {
          mathLines.push(lineContent.slice(0, -2));
          i++;
        } else if (lineContent.endsWith("$$") && lineContent.length > 0) {
          mathLines.push(lineContent.slice(0, -2));
          i++;
        } else {
          if (lineContent.trim()) mathLines.push(lineContent.trim());
          i++;
          while (
            i < lines.length &&
            !lines[i].trim().includes("\\]") &&
            !lines[i].trim().includes("$$")
          ) {
            mathLines.push(lines[i].trim());
            i++;
          }
          if (i < lines.length) {
            const endLine = lines[i]
              .trim()
              .replace("\\]", "")
              .replace("$$", "")
              .trim();
            if (endLine) mathLines.push(endLine);
            i++;
          }
        }

        elements.push(
          <div
            key={`math-${i}`}
            className="my-2.5 p-2.5 bg-[#F0F6F3] border border-[#CCDCD5] rounded-xs text-center font-mono text-[12px] font-bold text-[#0D3830] shadow-2xs overflow-x-auto"
          >
            <div className="text-[8px] uppercase tracking-wider text-[#5C6E6A] font-bold mb-0.5">
              THERMODYNAMIC FORMULA
            </div>
            <code>{mathLines.join(" ")}</code>
          </div>
        );
        continue;
      }

      // Table Detection: line contains | and next line has table delimiter |---|
      if (
        trimmed.startsWith("|") &&
        i + 1 < lines.length &&
        /^\|[-:\s|]+\|?$/.test(lines[i + 1].trim())
      ) {
        const cleanPipeRow = (raw: string) => {
          let s = raw.trim();
          if (s.startsWith("|")) s = s.slice(1);
          if (s.endsWith("|")) s = s.slice(0, -1);
          return s.split("|").map((c) => c.trim());
        };

        const headers = cleanPipeRow(trimmed);
        const rows: string[][] = [];
        i += 2; // skip header and delimiter

        while (i < lines.length && lines[i].trim().startsWith("|")) {
          const cells = cleanPipeRow(lines[i]);
          if (cells.length > 0 && cells.some((c) => c.length > 0)) {
            // Pad cells if row has fewer columns than headers
            while (cells.length < headers.length) {
              cells.push("");
            }
            rows.push(cells);
          }
          i++;
        }

        elements.push(
          <div
            key={`table-${i}`}
            className="overflow-x-auto my-2.5 rounded-xs border border-[#D5DFDC] bg-white shadow-2xs"
          >
            <table className="min-w-full text-xs font-sans border-collapse">
              <thead className="bg-[#EEF4F1] border-b border-[#D5DFDC] text-[#123832] font-mono font-bold text-[10px] uppercase tracking-wider">
                <tr>
                  {headers.map((h, hIdx) => (
                    <th
                      key={hIdx}
                      className="px-3 py-2 text-left font-bold border-r last:border-r-0 border-[#D5DFDC]"
                    >
                      {renderFormattedInline(h)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E6EFEA]">
                {rows.map((row, rIdx) => (
                  <tr
                    key={rIdx}
                    className={`transition-colors hover:bg-[#F2F7F4] ${
                      rIdx % 2 === 0 ? "bg-white" : "bg-[#F9FCFA]"
                    }`}
                  >
                    {row.map((cell, cIdx) => (
                      <td
                        key={cIdx}
                        className="px-3 py-2 text-[#243B36] border-r last:border-r-0 border-[#E6EFEA] leading-relaxed align-top text-xs"
                      >
                        {renderFormattedInline(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        continue;
      }

      // Headings
      if (trimmed.startsWith("#### ")) {
        elements.push(
          <h5
            key={`h4-${i}`}
            className="font-serif font-bold text-[#143D36] text-xs mt-2.5 mb-1 pb-0.5 border-b border-[#E2ECE8]"
          >
            {renderFormattedInline(trimmed.replace(/^####\s+/, ""))}
          </h5>
        );
        i++;
        continue;
      }
      if (trimmed.startsWith("### ")) {
        elements.push(
          <h4
            key={`h3-${i}`}
            className="font-serif font-bold text-[#0E2C27] text-[13px] mt-3 mb-1 pb-1 border-b border-[#D5E2DC]"
          >
            {renderFormattedInline(trimmed.replace(/^###\s+/, ""))}
          </h4>
        );
        i++;
        continue;
      }
      if (trimmed.startsWith("## ")) {
        elements.push(
          <h3
            key={`h2-${i}`}
            className="font-serif font-bold text-[#0B253F] text-sm mt-3 mb-1.5 pb-1 border-b border-[#CCDCD5]"
          >
            {renderFormattedInline(trimmed.replace(/^##\s+/, ""))}
          </h3>
        );
        i++;
        continue;
      }
      if (trimmed.startsWith("# ")) {
        elements.push(
          <h2
            key={`h1-${i}`}
            className="font-serif font-bold text-[#0B253F] text-base mt-3.5 mb-2"
          >
            {renderFormattedInline(trimmed.replace(/^#\s+/, ""))}
          </h2>
        );
        i++;
        continue;
      }

      // Horizontal Rule
      if (trimmed === "---" || trimmed === "***" || trimmed === "___") {
        elements.push(<hr key={`hr-${i}`} className="my-2.5 border-[#DCE6E2]" />);
        i++;
        continue;
      }

      // Blockquote
      if (trimmed.startsWith(">")) {
        const quoteLines: string[] = [];
        while (i < lines.length && lines[i].trim().startsWith(">")) {
          quoteLines.push(lines[i].trim().replace(/^>\s*/, ""));
          i++;
        }
        elements.push(
          <div
            key={`quote-${i}`}
            className="border-l-3 border-[#174D46] bg-[#F0F6F4] pl-3 py-2 my-2 text-xs text-[#284841] italic rounded-r-2xs shadow-2xs"
          >
            {renderFormattedInline(quoteLines.join(" "))}
          </div>
        );
        continue;
      }

      // Unordered List
      if (/^[\*\-]\s+/.test(trimmed)) {
        const items: string[] = [];
        while (i < lines.length && /^[\*\-]\s+/.test(lines[i].trim())) {
          items.push(lines[i].trim().replace(/^[\*\-]\s+/, ""));
          i++;
        }
        elements.push(
          <div key={`ul-${i}`} className="space-y-1 my-1.5 ml-1">
            {items.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2 text-xs text-[#243B36] leading-relaxed"
              >
                <span className="text-[#E06A26] font-bold text-[10px] mt-0.5">●</span>
                <span className="flex-1">{renderFormattedInline(item)}</span>
              </div>
            ))}
          </div>
        );
        continue;
      }

      // Ordered List
      if (/^\d+\.\s+/.test(trimmed)) {
        const items: { num: string; text: string }[] = [];
        while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
          const match = lines[i].trim().match(/^(\d+)\.\s+(.*)$/);
          if (match) {
            items.push({ num: match[1], text: match[2] });
          }
          i++;
        }
        elements.push(
          <div key={`ol-${i}`} className="space-y-1.5 my-2 ml-1">
            {items.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2 text-xs text-[#243B36] leading-relaxed"
              >
                <span className="font-mono font-bold text-[#174D46] text-[10px] bg-[#E8F0EC] px-1.5 py-0.5 rounded-2xs border border-[#C8DBD1] min-w-[20px] text-center">
                  {item.num}
                </span>
                <span className="flex-1">{renderFormattedInline(item.text)}</span>
              </div>
            ))}
          </div>
        );
        continue;
      }

      // Paragraph
      elements.push(
        <p key={`p-${i}`} className="text-xs text-[#243B36] my-1.5 leading-relaxed">
          {renderFormattedInline(trimmed)}
        </p>
      );
      i++;
    }

    return elements;
  };

  const renderFormattedInline = (str: string) => {
    // Matches bold (**...**), code (`...`), math ($...$), and italics (*...*)
    const parts = str.split(/(\*\*.*?\*\*|`.*?`|\$.*?\$|\*.*?\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={i} className="font-bold text-[#0E2C27]">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith("`") && part.endsWith("`")) {
        return (
          <code
            key={i}
            className="px-1.5 py-0.5 bg-[#EAF0EC] text-[#14483F] font-mono text-[10.5px] rounded-2xs font-semibold border border-[#D5E2DC]"
          >
            {part.slice(1, -1)}
          </code>
        );
      }
      if (part.startsWith("$") && part.endsWith("$")) {
        return (
          <span
            key={i}
            className="px-1.5 py-0.5 bg-[#EBF4F0] text-[#0D3830] font-mono text-[11px] font-bold rounded-2xs border border-[#CCDCD5] mx-0.5 inline-block shadow-2xs"
          >
            {part.slice(1, -1)}
          </span>
        );
      }
      if (part.startsWith("*") && part.endsWith("*")) {
        return (
          <em key={i} className="italic text-[#2F4540]">
            {part.slice(1, -1)}
          </em>
        );
      }
      return part;
    });
  };

  return (
    <div className="border border-[#D1DCD6] bg-white rounded-xs shadow-xs overflow-hidden transition-all">
      {/* Header Bar */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full bg-gradient-to-r from-[#0B253F] to-[#174D46] text-white px-3.5 py-2.5 flex items-center justify-between cursor-pointer select-none text-left"
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#4CAF50] animate-pulse" />
          <span className="font-mono text-[9px] uppercase tracking-wider font-bold text-[#80CBC4]">
            RAG AI COPILOT · GROQ ACCELERATED
          </span>
          <span className="hidden sm:inline-block text-[#B2DFDB] text-xs">|</span>
          <span className="font-sans text-xs font-semibold text-white">
            {view === "scenario_lab"
              ? `Urban Cooling Advisor · ${activeHotspot?.name || city}`
              : `Pareto Budget Advisor · ${city}`}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-[9px] text-[#80CBC4] bg-[#004D40]/60 px-1.5 py-0.5 rounded-xs border border-[#80CBC4]/30">
            {view === "scenario_lab"
              ? `Sim: ${levers?.coolingReduction || "0.0°C"}`
              : `Budget: ₹${budget?.amountCr || 12} Cr`}
          </span>
          <span className="text-white hover:text-[#80CBC4] text-xs font-mono px-1">
            {isExpanded ? "▲" : "▼"}
          </span>
        </div>
      </button>

      {/* Expandable Body */}
      {isExpanded && (
        <div className="p-3.5 space-y-3 bg-[#FAFBFA]">
          {/* Quick Telemetry Ribbon */}
          <div className="bg-white border border-[#E2E8E5] px-3 py-1.5 rounded-xs flex flex-wrap items-center justify-between text-[10px] font-mono text-[#5C6E6A] gap-2">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#0B253F]">LIVE TELEMETRY CONTEXT:</span>
              <span>{city} ({season})</span>
              <span>•</span>
              <span className="text-[#E53935] font-semibold">
                {activeHotspot ? `${activeHotspot.name} (${activeHotspot.lst}°C LST)` : `${city} Observation Grid`}
              </span>
            </div>
            {view === "scenario_lab" && levers && (
              <div className="text-[#174D46] font-bold">
                Canopy: +{levers.trees}% | Cool Roof: +{levers.roofs}% | CapEx: ₹{levers.scenarioCost}
              </div>
            )}
            {view === "optimizer" && budget && (
              <div className="text-[#174D46] font-bold">
                Impact: −{budget.optReduction}°C | Residents: {budget.optBenefited}
              </div>
            )}
          </div>

          {/* Quick Inquiry Pills */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[8px] uppercase tracking-wider text-[#5C6E6A] font-bold">
                1-CLICK KNOWLEDGE INQUIRIES:
              </span>
              <button
                type="button"
                onClick={() => setIsFullHeight(!isFullHeight)}
                className="font-mono text-[8.5px] text-[#174D46] hover:text-[#0B253F] font-bold cursor-pointer underline flex items-center gap-1"
              >
                <span>{isFullHeight ? "⤡ Compact Height" : "⤢ Full Height"}</span>
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {quickPrompts.map((prompt, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSend(prompt)}
                  disabled={loading}
                  className="text-[10px] font-sans bg-white hover:bg-[#EBF2F7] hover:border-[#174D46] text-[#162220] border border-[#D1DCD6] px-2.5 py-1 rounded-xs cursor-pointer transition-all disabled:opacity-50 text-left"
                >
                  💡 {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Stream Window */}
          <div
            className={`${
              isFullHeight ? "min-h-[550px] max-h-[850px]" : "h-80 sm:h-96"
            } overflow-y-auto border border-[#E2E8E5] bg-white p-3 rounded-xs space-y-3 shadow-inner transition-all`}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.role === "user" ? "items-end" : "items-start"
                }`}
              >
                <div className="flex items-center gap-1.5 mb-0.5 text-[9px] font-mono text-[#8C9E9A]">
                  <span className="font-bold text-[#162220]">
                    {msg.role === "user" ? "You (Urban Planner)" : "HeatWise AI Copilot"}
                  </span>
                  <span>•</span>
                  <span>{msg.timestamp}</span>
                </div>

                <div
                  className={`p-3 rounded-xs max-w-[98%] sm:max-w-[92%] ${
                    msg.role === "user"
                      ? "bg-[#0B253F] text-white text-xs font-sans shadow-xs"
                      : "bg-[#FAFBFA] border border-[#E2E8E5] text-[#162220] shadow-xs"
                  }`}
                >
                  {msg.role === "user" ? (
                    <p className="text-xs">{msg.content}</p>
                  ) : (
                    <div>
                      {formatMarkdown(msg.content)}

                      {/* Source Citations */}
                      {msg.sources && msg.sources.length > 0 && (
                        <div className="mt-2 pt-1.5 border-t border-[#EDF2EF] flex flex-wrap items-center gap-1">
                          <span className="font-mono text-[7.5px] uppercase text-[#8C9E9A] font-bold">
                            RAG SOURCES:
                          </span>
                          {msg.sources.map((s, idx) => (
                            <span
                              key={idx}
                              className="font-mono text-[7.5px] bg-[#E8F0EC] text-[#174D46] px-1.5 py-0.2 rounded-xs border border-[#C8DBD1]"
                            >
                              📚 {s}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex flex-col items-start space-y-1">
                <span className="text-[9px] font-mono text-[#8C9E9A]">
                  Groq LLM Reasoning & Thermodynamic Retrieval...
                </span>
                <div className="p-2.5 bg-[#FAFBFA] border border-[#E2E8E5] rounded-xs flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#174D46] animate-bounce" />
                  <div
                    className="w-2 h-2 rounded-full bg-[#174D46] animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  />
                  <div
                    className="w-2 h-2 rounded-full bg-[#174D46] animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  />
                </div>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Input Bar */}
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
              placeholder={
                view === "scenario_lab"
                  ? `Ask about cooling levers, thermodynamics, or costs for ${activeHotspot?.name || "this ward"}...`
                  : `Ask about CapEx allocation, population shielding, or NDMA standards in ${city}...`
              }
              className="flex-1 px-3 py-2 text-xs bg-white border border-[#D1DCD6] rounded-xs focus:outline-none focus:border-[#0B253F] focus:ring-1 focus:ring-[#0B253F] font-sans disabled:opacity-50"
            />
            <button
              type="button"
              onClick={() => handleSend()}
              disabled={loading || !input.trim()}
              className="px-4 py-2 bg-[#0B253F] hover:bg-[#174D46] text-white font-mono text-xs font-bold rounded-xs cursor-pointer transition-all disabled:opacity-50 flex items-center gap-1.5"
            >
              <span>SEND</span>
              <span>➔</span>
            </button>
            <button
              type="button"
              onClick={() =>
                setMessages([
                  {
                    id: "greeting-reset",
                    role: "assistant",
                    content: "Chat session cleared. How can I assist with your climate planning?",
                    timestamp: "Live Telemetry",
                  },
                ])
              }
              title="Clear conversation"
              className="px-2.5 py-2 bg-white hover:bg-[#F2F4F3] border border-[#D1DCD6] text-[#5C6E6A] text-xs rounded-xs cursor-pointer"
            >
              🧹
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
