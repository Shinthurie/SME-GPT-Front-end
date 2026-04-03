"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MobileShell from "@/components/layout/MobileShell";
import BottomNav from "@/components/layout/BottomNav";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import { getSession, logoutUser, SessionUser } from "@/lib/auth";
import { AppLanguage, getStoredLanguage, ui } from "@/lib/i18n";

function SectionTitle({
  children,
  danger,
}: {
  children: React.ReactNode;
  danger?: boolean;
}) {
  return (
    <p
      className={`mt-8 mb-3 text-[12px] font-bold uppercase tracking-[0.12em] ${
        danger ? "text-red-600" : "text-[#64748b]"
      }`}
    >
      {children}
    </p>
  );
}

function Toggle({ enabled }: { enabled: boolean }) {
  return (
    <div className={`h-7 w-12 rounded-full p-[3px] ${enabled ? "bg-[#2563ff]" : "bg-slate-300"}`}>
      <div className={`h-5 w-5 rounded-full bg-white transition ${enabled ? "translate-x-5" : ""}`} />
    </div>
  );
}

function Row({
  icon,
  title,
  value,
  right,
  iconBg = "bg-[#eef2ff]",
  iconColor = "text-[#2563ff]",
}: {
  icon: string;
  title: string;
  value?: string;
  right?: React.ReactNode;
  iconBg?: string;
  iconColor?: string;
}) {
  return (
    <div className="flex items-center justify-between px-5 py-4">
      <div className="flex items-center gap-4">
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconBg} ${iconColor}`}>
          <span className="material-symbols-outlined text-[20px]">{icon}</span>
        </div>
        <div>
          <p className="text-[13px] text-[#64748b]">{title}</p>
          {value && <p className="text-[15px] font-semibold leading-tight text-[#0f172a] sm:text-[16px]">{value}</p>}
        </div>
      </div>
      {right}
    </div>
  );
}

export default function ProfilePage() {
  const router = useRouter();
  const [lang, setLang] = useState<AppLanguage>("en");
  const [session, setSession] = useState<SessionUser | null>(null);

  useEffect(() => {
    setLang(getStoredLanguage());
    const currentSession = getSession();
    if (!currentSession?.isLoggedIn) {
      router.push("/login");
      return;
    }
    setSession(currentSession);
  }, [router]);

  if (!session) return null;

  const t = ui[lang];

  return (
    <MobileShell>
      <div className="min-h-screen bg-[#f6f7fb]">
        <main className="mx-auto w-full max-w-[980px] px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-[24px] font-extrabold tracking-tight text-[#0f172a] sm:text-[28px]">
              {t.profileTitle}
            </h1>
            <LanguageSwitcher />
          </div>

          <div className="rounded-[20px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f7b092] text-white">
                  <span className="material-symbols-outlined text-[28px]">person</span>
                </div>
                <div className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-[#2563ff] text-white shadow">
                  <span className="material-symbols-outlined text-[14px]">verified</span>
                </div>
              </div>

              <div className="min-w-0">
                <h2 className="truncate text-[18px] font-bold text-[#0f172a]">
                  {session.fullName}
                </h2>
                <p className="truncate text-[13px] text-[#64748b]">{session.email}</p>
                <span className="mt-2 inline-block rounded-full bg-[#e0edff] px-3 py-1 text-[10px] font-bold text-[#2563ff]">
                  {t.adminAccess}
                </span>
              </div>
            </div>
          </div>

          <SectionTitle>{t.businessStructure}</SectionTitle>
          <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-sm">
            <Row icon="domain" title={t.organization} value={session.companyName} />
            <div className="border-t" />
            <Row
              icon="business_center"
              title={t.businessUnit}
              value={lang === "si" ? "මූල්‍ය හා මෙහෙයුම්" : "Finance & Operations"}
            />
            <div className="border-t" />
            <Row
              icon="groups"
              title={t.department}
              value={lang === "si" ? "ලේඛන බුද්ධි ඒකකය" : "Document Intelligence Unit"}
            />
          </div>

          <SectionTitle>{t.documentProcessing}</SectionTitle>
          <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-sm">
            <Row
              icon="translate"
              title={`${t.primaryLanguage} (සිංහල / English)`}
              right={
                <span className="text-[13px] font-semibold text-[#2563ff]">
                  {lang === "si" ? "සිංහල" : "English"}
                </span>
              }
            />
            <div className="border-t" />
            <Row icon="auto_awesome" title={t.autoClassify} right={<Toggle enabled={true} />} />
          </div>

          <SectionTitle danger>{t.corporateSecurity}</SectionTitle>
          <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-sm">
            <Row
              icon="key"
              title={t.changePassword}
              right={<span className="material-symbols-outlined text-[#94a3b8]">chevron_right</span>}
              iconBg="bg-[#fee2e2]"
              iconColor="text-red-500"
            />
            <div className="border-t" />
            <Row icon="shield" title={t.twoFactor} right={<Toggle enabled={true} />} />
            <div className="border-t" />
            <Row
              icon="admin_panel_settings"
              title={t.sessionManagement}
              right={<span className="material-symbols-outlined text-[#94a3b8]">chevron_right</span>}
              iconBg="bg-[#fef3c7]"
              iconColor="text-[#d97706]"
            />
          </div>

          <button
            onClick={() => {
              logoutUser();
              router.push("/login");
            }}
            className="mt-8 w-full rounded-[20px] border border-red-300 bg-[#fff5f5] py-4 text-[15px] font-bold text-red-600 sm:text-[16px]"
          >
            {t.signOut}
          </button>

          <div className="mt-6 text-center text-[11px] text-[#94a3b8]">
            <p>SME-GPT v3.1.0 Enterprise</p>
            <p className="mt-1">{t.auditFooter}</p>
          </div>
        </main>

        <BottomNav />
      </div>
    </MobileShell>
  );
}