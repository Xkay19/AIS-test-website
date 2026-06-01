"use client";

import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import {
  FileText,
  UploadCloud,
  CheckCircle2,
  Cpu,
  RefreshCw,
  Database,
  ArrowRight,
  Sparkles,
  Table,
} from "lucide-react";

type ConversionStep = "idle" | "uploading" | "extracting" | "mapping" | "completed";

interface ExtractedData {
  parameter: string;
  value: string;
  confidence: string;
  status: "verified" | "warning";
}

export function PdfConverterSimulator() {
  const [step, setStep] = useState<ConversionStep>("idle");
  const [progress, setProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState<string>("static_epd_report.pdf");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const extractedMetrics: ExtractedData[] = [
    { parameter: "Embodied Carbon (A1-A3)", value: "320 kg CO₂e / t", confidence: "99.2%", status: "verified" },
    { parameter: "Recycled Steel Content", value: "98.4%", confidence: "98.7%", status: "verified" },
    { parameter: "LCA Standard", value: "EN 15804+A2", confidence: "100%", status: "verified" },
    { parameter: "Declaration Owner", value: "BuildRight Materials", confidence: "99.5%", status: "verified" },
    { parameter: "ESPR Compliance Score", value: "95 / 100", confidence: "96.4%", status: "verified" },
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === "uploading") {
      setProgress(0);
      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) { clearInterval(timer); setStep("extracting"); return 100; }
          return prev + 10;
        });
      }, 150);
    } else if (step === "extracting") {
      setProgress(0);
      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) { clearInterval(timer); setStep("mapping"); return 100; }
          return prev + 8;
        });
      }, 150);
    } else if (step === "mapping") {
      setProgress(0);
      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) { clearInterval(timer); setStep("completed"); return 100; }
          return prev + 12;
        });
      }, 150);
    }
    return () => clearInterval(timer);
  }, [step]);

  const handleReset = () => { setStep("idle"); setProgress(0); setFileName("static_epd_report.pdf"); };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const processFile = (file: File) => {
    if (file && file.name.endsWith(".pdf")) {
      setFileName(file.name);
      setStep("uploading");
    } else {
      alert("Please upload a valid PDF Environmental Product Declaration (.pdf)");
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation(); setDragActive(false);
    if (e.dataTransfer.files?.[0]) processFile(e.dataTransfer.files[0]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files?.[0]) processFile(e.target.files[0]);
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 shadow-xl overflow-hidden p-6 md:p-8">
      <input ref={fileInputRef} type="file" className="hidden" accept=".pdf" onChange={handleFileChange} />

      <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-100 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <Cpu className="h-5 w-5 text-emerald-600 animate-pulse" />
          <span className="text-sm font-bold text-zinc-900 dark:text-white">EPD to DPP Pipeline Simulator</span>
        </div>
        <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 px-2.5 py-1 rounded-full border border-emerald-100/50">
          OCR Engine v4.2
        </span>
      </div>

      <div className="min-h-[320px] flex flex-col justify-center items-center relative">
        {step === "idle" && (
          <div
            onDragEnter={handleDrag} onDragOver={handleDrag} onDragLeave={handleDrag} onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={cn(
              "w-full border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center gap-4 text-center cursor-pointer transition-all duration-300",
              dragActive
                ? "border-emerald-500 bg-emerald-50/30 dark:bg-emerald-950/10 scale-[1.01]"
                : "border-zinc-200/80 hover:border-emerald-500/50 hover:bg-zinc-50/50 dark:border-zinc-800 dark:hover:border-zinc-700"
            )}
          >
            <div className="h-14 w-14 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800 flex items-center justify-center">
              <UploadCloud className="h-7 w-7 text-zinc-400" />
            </div>
            <div className="space-y-1">
              <h4 className="text-base font-bold text-zinc-900 dark:text-white">Drag & Drop EPD PDF here</h4>
              <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                or <span className="text-emerald-600 font-bold underline">browse your files</span> to select an ISO 14025 EPD document
              </p>
            </div>
            <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1 rounded-full">
              PDF files only
            </div>
          </div>
        )}

        {(step === "uploading" || step === "extracting" || step === "mapping") && (
          <div className="w-full space-y-6 py-4 animate-fade-in">
            <div className="flex items-center justify-center gap-8 relative">
              {[
                { icon: <FileText className={cn("h-6 w-6", step === "uploading" && "animate-pulse")} />, active: step === "uploading" },
                { icon: <Cpu className={cn("h-6 w-6", step === "extracting" && "animate-spin")} />, active: step === "extracting" },
                { icon: <Database className={cn("h-6 w-6", step === "mapping" && "animate-bounce")} />, active: step === "mapping" },
              ].map((item, i) => (
                <React.Fragment key={i}>
                  <div className={cn(
                    "h-12 w-12 rounded-xl flex items-center justify-center border transition-all duration-300",
                    item.active ? "bg-emerald-50 border-emerald-200 text-emerald-600 dark:bg-emerald-950/20" : "bg-zinc-50 border-zinc-200 text-zinc-400 dark:bg-zinc-950/20"
                  )}>{item.icon}</div>
                  {i < 2 && <ArrowRight className="h-4 w-4 text-zinc-300" />}
                </React.Fragment>
              ))}
            </div>
            <div className="text-center space-y-2">
              <h5 className="text-sm font-bold text-zinc-900 dark:text-white">
                {step === "uploading" && `Uploading ${fileName}...`}
                {step === "extracting" && "Extracting lifecycle carbon stages..."}
                {step === "mapping" && "Mapping to EU ESPR data model..."}
              </h5>
              <p className="text-[11px] text-zinc-500 max-w-xs mx-auto">
                {step === "uploading" && "Parsing ISO 14025 compliance rules & tables."}
                {step === "extracting" && "Extracting A1-A3 raw materials, A4 transport, and A5 assembly."}
                {step === "mapping" && "Enriching schema values and generating QR scannable passport."}
              </p>
            </div>
            <div className="w-full max-w-xs mx-auto space-y-2">
              <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full transition-all duration-150 ease-out" style={{ width: `${progress}%` }} />
              </div>
              <div className="flex justify-between text-[10px] font-bold text-zinc-400">
                <span>PROGRESS</span><span>{progress}%</span>
              </div>
            </div>
          </div>
        )}

        {step === "completed" && (
          <div className="w-full space-y-5 py-2 animate-fade-in">
            <div className="flex items-center justify-between bg-emerald-50/60 dark:bg-emerald-950/10 border border-emerald-100/40 p-3 rounded-2xl">
              <div className="flex items-center gap-2.5 text-left">
                <div className="h-8 w-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-zinc-900 dark:text-white truncate max-w-[180px] sm:max-w-[240px]">{fileName}</h4>
                  <p className="text-[10px] text-zinc-500">Converted successfully in 4.5s</p>
                </div>
              </div>
              <div className="inline-flex items-center gap-1 bg-emerald-500 text-white text-[9px] font-bold px-2 py-1 rounded-full shadow-sm">
                <Sparkles className="h-2.5 w-2.5" /><span>LIVE DPP READY</span>
              </div>
            </div>

            <div className="border border-zinc-100 dark:border-zinc-800/80 rounded-2xl overflow-hidden bg-zinc-50/50 dark:bg-zinc-950/20">
              <div className="px-4 py-2.5 border-b border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center gap-1.5">
                <Table className="h-3.5 w-3.5 text-emerald-600" />
                <span className="text-[10px] font-extrabold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Extracted Sustainability Schema</span>
              </div>
              <div className="divide-y divide-zinc-100 dark:divide-zinc-800/60 text-xs">
                {extractedMetrics.map((metric, idx) => (
                  <div key={idx} className="flex justify-between items-center px-4 py-2.5 hover:bg-white dark:hover:bg-zinc-900/40 transition-colors">
                    <span className="text-zinc-500 dark:text-zinc-400 font-medium">{metric.parameter}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-zinc-900 dark:text-white font-bold">{metric.value}</span>
                      <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 px-1.5 py-0.5 rounded-md border border-emerald-100/30">{metric.confidence}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-1">
              <button onClick={handleReset} className="inline-flex items-center gap-1.5 border border-zinc-200 hover:bg-zinc-50 text-zinc-700 font-semibold text-xs px-4 py-2.5 rounded-full transition-all active:scale-[0.98]">
                <RefreshCw className="h-3.5 w-3.5" /><span>Convert Another</span>
              </button>
              <a href="#dashboard" className="inline-flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-xs px-5 py-2.5 rounded-full transition-all shadow-md">
                <span>View Dashboard</span><ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
