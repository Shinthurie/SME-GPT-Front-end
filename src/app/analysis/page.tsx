"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MobileShell from "@/components/layout/MobileShell";
import BottomNav from "@/components/layout/BottomNav";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import { AppLanguage, getStoredLanguage, ui } from "@/lib/i18n";

export default function AnalysisPage() {
  const router = useRouter();
  const [lang, setLang] = useState<AppLanguage>("en");

  useEffect(() => {
    setLang(getStoredLanguage());
  }, []);

  const t = ui[lang];

  return (
    <MobileShell>
      <div className="min-h-screen bg-[#f6f7fb]">
        <main className="mx-auto w-full max-w-[1180px] px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-4 flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#2563ff] transition hover:bg-[#eef4ff]"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>

            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <button className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#2563ff] transition hover:bg-[#eef4ff]">
                <span className="material-symbols-outlined">share</span>
              </button>
              <button className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#2563ff] transition hover:bg-[#eef4ff]">
                <span className="material-symbols-outlined">more_vert</span>
              </button>
            </div>
          </div>

          <div className="mb-5">
            <h1 className="text-[24px] font-extrabold tracking-tight text-[#0f172a] sm:text-[28px]">
              INV-2024-001.pdf
            </h1>
            <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#64748b]">
              Financial Document Analysis
            </p>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[20px] bg-[#eef2f7] p-3 shadow-sm">
              <div className="rounded-[16px] bg-white p-3">
                <div className="flex h-[420px] items-center justify-center rounded-[16px] bg-[#f3f4f6] text-[13px] text-[#94a3b8] sm:h-[520px]">
                  PDF Preview Area
                </div>
              </div>
            </div>

            <div>
              <div className="rounded-[20px] border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-[18px] font-extrabold text-[#0f172a] sm:text-[20px]">
                    {t.intelligenceDetail}
                  </h2>

                  <div className="flex items-center gap-2">
                    <span className="text-[12px] text-[#64748b]">{t.evidence}</span>
                    <div className="h-7 w-12 rounded-full bg-[#2563ff] p-1">
                      <div className="ml-auto h-5 w-5 rounded-full bg-white" />
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-xl bg-[#eef4ff] px-3 py-2 text-[12px] font-semibold text-[#2563ff]">
                    98.4% {t.confidence}
                  </span>
                  <span className="rounded-xl bg-[#f1f5f9] px-3 py-2 text-[12px] text-[#334155]">
                    EN-US
                  </span>
                  <span className="rounded-xl bg-[#f1f5f9] px-3 py-2 text-[12px] text-[#334155]">
                    NLP v4.2
                  </span>
                </div>
              </div>

              <div className="mt-4 space-y-4">
                <div className="rounded-[18px] border border-[#b8c8ff] bg-white p-5 shadow-sm">
                  <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#64748b]">
                    {t.keyFinding}
                  </p>
                  <p className="mt-3 text-[14px] leading-7 text-[#111827]">
                    Invoice total and payable amount match the extracted summary.
                    A discrepancy was found in the unit rate of Portland Cement
                    compared with PO-882.
                  </p>
                </div>

                <div className="rounded-[18px] border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#64748b]">
                    {t.metadata}
                  </p>
                  <p className="mt-3 text-[14px] leading-7 text-[#334155]">
                    Vendor:{" "}
                    <span className="font-semibold text-[#0f172a]">
                      Lanka Trading Co
                    </span>
                    <br />
                    Invoice Date:{" "}
                    <span className="font-semibold text-[#0f172a]">
                      2023-10-24
                    </span>
                    <br />
                    Reference:{" "}
                    <span className="font-semibold text-[#0f172a]">PO-882</span>
                  </p>

                  <span className="mt-4 inline-block rounded-full bg-[#fef3c7] px-4 py-2 text-[12px] text-[#d97706]">
                    {t.verifyRequired}
                  </span>
                </div>

                <div className="rounded-[18px] border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#64748b]">
                    {t.methodology}
                  </p>
                  <p className="mt-3 text-[14px] leading-7 text-[#334155]">
                    OCR and semantic extraction were applied to identify invoice
                    number, supplier, line items, subtotal, tax, and payable
                    amount.
                  </p>
                </div>

                <div className="rounded-[18px] border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#64748b]">
                    {t.conclusion}
                  </p>
                  <p className="mt-3 text-[14px] leading-7 text-[#334155]">
                    Further validation is recommended for the cement unit price
                    because the invoice rate exceeds the agreed PO rate.
                  </p>
                </div>
              </div>

              <button className="mt-5 w-full rounded-[18px] bg-[#2563ff] py-4 text-[15px] font-bold text-white shadow-[0_10px_24px_rgba(37,99,255,0.22)]">
                {t.validateFindings}
              </button>
            </div>
          </div>
        </main>

        <BottomNav />
      </div>
    </MobileShell>
  );
}