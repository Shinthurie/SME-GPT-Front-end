"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MobileShell from "@/components/layout/MobileShell";
import BottomNav from "@/components/layout/BottomNav";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import { AppLanguage, getStoredLanguage, ui } from "@/lib/i18n";

export default function QueryPage() {
  const router = useRouter();
  const [lang, setLang] = useState<AppLanguage>("en");
  const [question, setQuestion] = useState("");

  useEffect(() => {
    setLang(getStoredLanguage());
  }, []);

  const t = ui[lang];

  return (
    <MobileShell>
      <div className="min-h-screen bg-[#f6f7fb] pb-24">
        <main className="mx-auto w-full max-w-[980px] px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-4 flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="text-[14px] font-medium text-[#2563ff]"
            >
              ← Back
            </button>
            <div className="flex items-center gap-2">
              <div className="rounded-full border border-[#b7cbff] bg-[#eef4ff] px-4 py-2 text-[12px] text-[#2563ff]">
                PHYSICS DEPT
              </div>
              <LanguageSwitcher />
            </div>
          </div>

          <h1 className="text-[24px] font-extrabold tracking-tight text-[#0f172a] sm:text-[28px]">
            {t.askQuestion}
          </h1>

          <p className="mt-4 max-w-4xl text-[14px] leading-8 text-[#64748b]">
            {t.querySubtitleLong}
          </p>

          <div className="mt-8 rounded-[20px] border border-slate-200 bg-white shadow-sm">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder={t.queryPlaceholder}
              rows={8}
              className="w-full resize-none rounded-t-[20px] border-0 bg-transparent px-5 py-5 text-[18px] text-[#94a3b8] outline-none"
            />
            <div className="flex items-center justify-between rounded-b-[20px] border-t border-slate-100 px-5 py-3 text-[#94a3b8]">
              <div className="flex gap-4">
                <span className="material-symbols-outlined text-[24px]">attach_file</span>
                <span className="material-symbols-outlined text-[24px]">mic</span>
              </div>
              <span className="text-[12px]">{t.autoOcrEnabled}</span>
            </div>
          </div>

          <div className="mt-6 rounded-[20px] border border-[#c8d7ff] bg-[#eef4ff] p-5">
            <p className="text-[14px] leading-7 text-[#334155]">
              <span className="font-bold text-[#2563ff]">{t.proTip}: </span>
              {t.proTipBody}
            </p>
          </div>

          <button
            onClick={() => router.push("/answer")}
            className="mt-8 w-full rounded-[20px] bg-[#2563ff] py-4 text-[17px] font-bold text-white shadow-[0_10px_24px_rgba(37,99,255,0.22)]"
          >
            ✨ {t.submitQuery}
          </button>
        </main>

        <BottomNav />
      </div>
    </MobileShell>
  );
}