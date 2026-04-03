"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MobileShell from "@/components/layout/MobileShell";
import BottomNav from "@/components/layout/BottomNav";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import { AppLanguage, getStoredLanguage, ui } from "@/lib/i18n";

export default function UploadPage() {
  const router = useRouter();
  const [lang, setLang] = useState<AppLanguage>("en");

  useEffect(() => {
    setLang(getStoredLanguage());
  }, []);

  const t = ui[lang];

  return (
    <MobileShell>
      <div className="min-h-screen bg-[#f6f7fb]">
        <main className="mx-auto w-full max-w-[980px] px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-4 flex items-center justify-between">
            <button
              onClick={() => router.push("/dashboard")}
              className="text-[14px] font-medium text-[#2563ff]"
            >
              ← {t.backToDashboard}
            </button>
            <LanguageSwitcher />
          </div>

          <h1 className="text-[24px] font-extrabold tracking-tight text-[#0f172a] sm:text-[28px]">
            {t.uploadTitle}
          </h1>
          <p className="mt-2 max-w-3xl text-[13px] leading-7 text-[#64748b] sm:text-[14px]">
            {t.uploadSubtitle}
          </p>

          <div className="mt-8 rounded-[22px] border-2 border-dashed border-[#a9c1ff] bg-white p-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#eaf0ff]">
              <span className="material-symbols-outlined text-[30px] text-[#2563ff]">
                upload_file
              </span>
            </div>

            <h2 className="mt-5 text-[18px] font-bold text-[#0f172a]">{t.dragDrop}</h2>
            <p className="mt-2 text-[13px] text-[#64748b]">{t.maxFileSize}</p>

            <button className="mt-5 rounded-2xl bg-[#dfe7fb] px-6 py-3 text-[14px] font-semibold text-[#2563ff]">
              {t.selectDevice}
            </button>
          </div>

          <div className="mt-5 rounded-[18px] border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#fff1f1] text-[#ef4444]">
                <span className="material-symbols-outlined text-[24px]">picture_as_pdf</span>
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-[16px] font-semibold text-[#0f172a]">
                  Invoice_2024_001.pdf
                </p>
                <p className="text-[12px] text-[#94a3b8]">4.2 MB • Ready for OCR extraction</p>
              </div>

              <button className="text-[#94a3b8]">
                <span className="material-symbols-outlined text-[24px]">close</span>
              </button>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#94a3b8]">
              {t.processingPipeline}
            </p>
            <p className="text-[13px] text-[#2563ff]">{t.explainableAI}</p>
          </div>

          <div className="mt-5 space-y-6">
            {[
              [t.pdfToPages, t.pdfToPagesDesc, true],
              [t.ocrExtraction, t.ocrExtractionDesc, true],
              [t.textChunking, t.textChunkingDesc, false],
              [t.vectorIndexing, t.vectorIndexingDesc, false],
            ].map(([title, desc, active], i) => (
              <div key={i} className="flex gap-4">
                <div className="flex w-8 flex-col items-center">
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-full border-2 text-[10px] ${
                      active
                        ? "border-[#2563ff] bg-[#2563ff] text-white"
                        : "border-slate-300 text-slate-300"
                    }`}
                  >
                    {i === 0 ? "✓" : i === 1 ? "●" : ""}
                  </div>
                  {i < 3 && <div className="mt-2 h-9 w-[2px] bg-slate-200" />}
                </div>

                <div>
                  <p className={`text-[15px] font-semibold ${active ? "text-[#2563ff]" : "text-[#6b7280]"}`}>
                    {title}
                  </p>
                  <p className="text-[13px] text-[#94a3b8]">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-[20px] border border-[#c8d7ff] bg-[#eef4ff] p-5">
            <p className="text-[14px] font-semibold text-[#0f172a]">
              {t.privacyNoteTitle}:{" "}
              <span className="font-normal text-[#475569]">{t.privacyNoteBody}</span>
            </p>
          </div>

          <button className="mt-8 w-full rounded-[20px] bg-[#2563ff] py-4 text-[17px] font-bold text-white shadow-[0_10px_24px_rgba(37,99,255,0.22)]">
            {t.startProcessing}
          </button>
        </main>

        <BottomNav />
      </div>
    </MobileShell>
  );
}