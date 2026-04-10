"use client";

import { useEffect, useState } from "react";
import MobileShell from "@/components/layout/MobileShell";
import BottomNav from "@/components/layout/BottomNav";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import { AppLanguage, getStoredLanguage, ui } from "@/lib/i18n";

export default function AnswerPage() {
  const [lang, setLang] = useState<AppLanguage>("en");

  useEffect(() => {
    setLang(getStoredLanguage());
  }, []);

  const t = ui[lang];

  return (
    <MobileShell>
      <div className="min-h-screen bg-[#f6f7fb] pb-24">
        <main className="mx-auto w-full max-w-[980px] px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-4 flex items-center justify-between">
            <button className="text-[14px] font-medium text-[#2563ff]">← Back</button>
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <button className="text-[#2563ff]">•••</button>
            </div>
          </div>

          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#64748b]">
            {t.insightsAnalysis}
          </p>
          <h1 className="text-[24px] font-extrabold text-[#0f172a]">
            {t.invoiceVerification}
          </h1>

          <div className="mt-6 rounded-[18px] border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#64748b]">
              Query
            </p>
            <p className="mt-3 text-[14px] leading-7 text-[#334155]">
              "Check if the unit price for 20kg Cement bags matches PO-882 and highlight discrepancies in Sinhala."
            </p>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#64748b]">
              {t.businessInsight}
            </p>
            <span className="rounded-full bg-[#eef4ff] px-4 py-2 text-[12px] font-bold text-[#2563ff]">
              98% {t.accuracy}
            </span>
          </div>

          <div className="mt-4 rounded-[20px] border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-[14px] leading-8 text-[#111827]">
              A discrepancy was found in <span className="font-bold underline">Invoice #INV-2024-012</span>. The unit price for
              <span className="mx-2 rounded bg-slate-100 px-2 py-1">Portland Cement (20kg)</span>
              is listed at <span className="font-bold text-red-500">LKR 2,450.00</span>, which is
              <span className="font-bold"> 8.8% higher</span> than the agreed price in
              <span className="font-bold text-[#2563ff]"> PO-882</span> (LKR 2,250.00).
            </p>

            <div className="mt-5 rounded-[18px] border-l-4 border-[#2563ff] bg-[#f8fafc] p-4">
              <p className="text-[12px] font-semibold text-[#94a3b8]">සිංහල පැහැදිලි කිරීම</p>
              <p className="mt-2 text-[14px] leading-8 text-[#111827]">
                මෙහි ඉන්වොයිසියේ සඳහන් සිමෙන්ති (20kg) එකක මිල, මුල් ගිවිසුමේ අනුමත PO-882 වඩා වැඩියි.
                ඔබ ගෙවිය යුතු මුදල රු. 2,250.00 වුවත් නව ඉන්වොයිස් හි රු. 2,450.00 ලෙස සඳහන්ව ඇත.
              </p>
            </div>

            <div className="mt-5 flex flex-wrap gap-5 border-t border-slate-100 pt-4">
              <button className="text-[13px] font-semibold text-[#2563ff]">{t.adjustTotal}</button>
              <button className="text-[13px] font-semibold text-[#64748b]">{t.notifySupplier}</button>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button className="flex-1 rounded-[18px] bg-[#f1f5f9] px-5 py-4 text-[14px] font-bold text-[#334155]">
              {t.export}
            </button>
            <button className="flex-[1.8] rounded-[18px] bg-[#07122f] px-5 py-4 text-[14px] font-bold text-white">
              {t.flagForReview}
            </button>
          </div>
        </main>

        <BottomNav />
      </div>
    </MobileShell>
  );
}