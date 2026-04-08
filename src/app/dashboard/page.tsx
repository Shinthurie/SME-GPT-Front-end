"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MobileShell from "@/components/layout/MobileShell";
import BottomNav from "@/components/layout/BottomNav";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import { getSession, logoutUser, SessionUser } from "@/lib/auth";
import { AppLanguage, getStoredLanguage, ui } from "@/lib/i18n";

type DocItem = {
  title: string;
  meta: string;
  size: string;
  type: "po" | "invoice" | "dn";
  status: "processing" | "ready";
  statusSi: string;
};

const documents: DocItem[] = [
  {
    title: "PO - ABC Corp Ltd",
    meta: "Oct 26, 2023",
    size: "245 KB",
    type: "po",
    status: "processing",
    statusSi: "සකසමින් පවතී",
  },
  {
    title: "Invoice #1234 - Hardware Supply",
    meta: "Oct 25, 2023",
    size: "1.2 MB",
    type: "invoice",
    status: "ready",
    statusSi: "සූදානම්",
  },
  {
    title: "DN-2023-88 - Logistics Dispatch",
    meta: "Oct 24, 2023",
    size: "512 KB",
    type: "dn",
    status: "ready",
    statusSi: "සූදානම්",
  },
  {
    title: "PO - Global Exports",
    meta: "Oct 24, 2023",
    size: "320 KB",
    type: "po",
    status: "processing",
    statusSi: "සකසමින් පවතී",
  },
];

function DocIcon({ type }: { type: DocItem["type"] }) {
  if (type === "po") {
    return (
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f5efdc]">
        <span className="material-symbols-outlined text-[20px] text-[#d97706]">
          receipt_long
        </span>
      </div>
    );
  }

  if (type === "invoice") {
    return (
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e7f4ea]">
        <span className="material-symbols-outlined text-[20px] text-[#16a34a]">
          receipt
        </span>
      </div>
    );
  }

  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e7f4ea]">
      <span className="material-symbols-outlined text-[20px] text-[#16a34a]">
        local_shipping
      </span>
    </div>
  );
}

function StatCard({
  label,
  value,
  valueColor,
}: {
  label: string;
  value: string;
  valueColor?: string;
}) {
  return (
    <div className="rounded-[18px] border border-slate-200 bg-white px-4 py-4 shadow-[0_2px_10px_rgba(15,23,42,0.05)]">
      <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#94a3b8]">
        {label}
      </p>
      <p
        className="mt-2 text-[20px] font-extrabold leading-none"
        style={{ color: valueColor || "#0f172a" }}
      >
        {value}
      </p>
    </div>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const [session, setSession] = useState<SessionUser | null>(null);
  const [lang, setLang] = useState<AppLanguage>("en");

  useEffect(() => {
    const load = async () => {
      setLang(getStoredLanguage());

      const currentSession = await getSession();

      if (!currentSession) {
        router.push("/login");
        return;
      }

      setSession(currentSession);
    };

    load();
  }, [router]);

  if (!session) return null;

  const t = ui[lang];

  return (
    <MobileShell>
      <div className="min-h-screen bg-[#f6f7fb] pb-24">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#2563ff] text-white shadow-sm">
                <span className="material-symbols-outlined text-[20px]">
                  receipt_long
                </span>
              </div>

              <div>
                <h1 className="text-[20px] font-extrabold tracking-tight text-[#0f172a]">
                  SME-GPT
                </h1>
                <p className="text-[12px] text-[#64748b]">{session.companyName}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <LanguageSwitcher />

              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eef2f7] text-[#475569] transition hover:bg-[#e6ebf2]">
                <span className="material-symbols-outlined text-[18px]">
                  notifications
                </span>
              </button>

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f7b092] text-white shadow-sm">
                <span className="material-symbols-outlined text-[18px]">
                  person
                </span>
              </div>

              <button
                onClick={async () => {
                  await logoutUser();
                  router.push("/login");
                }}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-[12px] font-semibold text-[#64748b] transition hover:bg-slate-50"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1180px] px-4 py-6 sm:px-6 lg:px-8">
          <section>
            <h2 className="text-[24px] font-extrabold tracking-tight text-[#0f172a] sm:text-[28px]">
              {t.welcomeTitle}
            </h2>
            <p className="mt-2 text-[13px] leading-7 text-[#64748b] sm:text-[14px]">
              {t.welcomeSubtitle}
            </p>
          </section>

          <section className="mt-6">
            <button
              onClick={() => router.push("/upload")}
              className="flex w-full items-center gap-4 rounded-[18px] bg-[#2563ff] px-5 py-5 text-left text-white shadow-[0_10px_24px_rgba(37,99,255,0.22)] transition hover:translate-y-[1px] hover:opacity-95"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
                <span className="material-symbols-outlined text-[22px]">
                  upload_file
                </span>
              </div>
              <span className="text-[15px] font-bold leading-7">
                {t.uploadCTA}
              </span>
            </button>
          </section>

          <section className="mt-8 grid gap-3 sm:grid-cols-3">
            <StatCard label={t.totalDocs} value="482" />
            <StatCard label={t.pending} value="12" valueColor="#f59e0b" />
            <StatCard label={t.ready} value="470" valueColor="#16a34a" />
          </section>

          <section className="mt-8">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-[18px] font-extrabold tracking-tight text-[#0f172a]">
                {t.recentDocuments}
              </h3>
              <button
                onClick={() => router.push("/repository")}
                className="text-[13px] font-bold text-[#2563ff] transition hover:opacity-80"
              >
                {t.viewAll}
              </button>
            </div>

            <div className="space-y-4">
              {documents.map((doc) => (
                <button
                  key={doc.title}
                  onClick={() => router.push("/analysis")}
                  className="w-full rounded-[20px] border border-slate-200 bg-white px-4 py-4 text-left shadow-[0_2px_10px_rgba(15,23,42,0.05)] transition hover:-translate-y-[1px] hover:shadow-md"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <DocIcon type={doc.type} />

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[15px] font-bold tracking-tight text-[#0f172a] sm:text-[16px]">
                        {doc.title}
                      </p>
                      <p className="mt-1 text-[12px] text-[#64748b] sm:text-[13px]">
                        {doc.meta} <span className="mx-2">•</span> {doc.size}
                      </p>
                    </div>

                    <div className="text-left sm:text-right">
                      <span
                        className={`inline-flex rounded-xl px-3 py-1.5 text-[10px] font-bold uppercase ${
                          doc.status === "ready"
                            ? "bg-[#dcfce7] text-[#16a34a]"
                            : "bg-[#fef3c7] text-[#d97706]"
                        }`}
                      >
                        {lang === "si"
                          ? doc.status === "ready"
                            ? "සූදානම්"
                            : "සකසමින්"
                          : doc.status}
                      </span>
                      <p
                        className={`mt-2 text-[10px] ${
                          doc.status === "ready"
                            ? "text-[#65a30d]"
                            : "text-[#d97706]"
                        }`}
                      >
                        {lang === "si" ? doc.statusSi : doc.status}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>

          <section className="mt-8">
            <div className="rounded-[20px] border border-[#b8c8ff] bg-[#eef4ff] px-5 py-5 shadow-[0_2px_10px_rgba(15,23,42,0.03)]">
              <div className="flex gap-4">
                <div className="pt-1 text-[#2563ff]">
                  <span className="material-symbols-outlined text-[24px]">
                    query_stats
                  </span>
                </div>

                <div>
                  <h4 className="text-[15px] font-extrabold text-[#0f172a]">
                    {t.insightsReady}
                  </h4>
                  <p className="mt-2 text-[13px] leading-7 text-[#475569]">
                    {t.insightsDescription}
                  </p>
                  <button
                    onClick={() => router.push("/answer")}
                    className="mt-2 text-[13px] font-bold text-[#2563ff] transition hover:opacity-80"
                  >
                    {t.viewComparison} →
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>

        <BottomNav />
      </div>
    </MobileShell>
  );
}