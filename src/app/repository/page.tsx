"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import MobileShell from "@/components/layout/MobileShell";
import BottomNav from "@/components/layout/BottomNav";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import { AppLanguage, getStoredLanguage } from "@/lib/i18n";

type RepoItem = {
  id: string;
  type: "invoice" | "po" | "dn";
  title: string;
  amount: string;
  vendorOrClient: string;
  date: string;
  status: "ready" | "processing";
  statusSi: string;
};

const repoItems: RepoItem[] = [
  {
    id: "INV-2024-001",
    type: "invoice",
    title: "INV-2024-001",
    amount: "LKR 45,250.00",
    vendorOrClient: "Lanka Trading Co",
    date: "Oct 24, 2023",
    status: "ready",
    statusSi: "සූදානම්",
  },
  {
    id: "PO-8829-X",
    type: "po",
    title: "PO-8829-X",
    amount: "LKR 128,000.00",
    vendorOrClient: "Global Exports Ltd",
    date: "Oct 23, 2023",
    status: "processing",
    statusSi: "සකසමින්",
  },
  {
    id: "DN-00451",
    type: "dn",
    title: "DN-00451",
    amount: "No Amount",
    vendorOrClient: "Colombo Warehouse",
    date: "Oct 22, 2023",
    status: "ready",
    statusSi: "සූදානම්",
  },
  {
    id: "INV-2024-002",
    type: "invoice",
    title: "INV-2024-002",
    amount: "LKR 12,400.00",
    vendorOrClient: "Metro Supplies",
    date: "Oct 21, 2023",
    status: "ready",
    statusSi: "සූදානම්",
  },
];

type TabType = "all" | "invoice" | "po" | "dn";

function TypeIcon({ type }: { type: RepoItem["type"] }) {
  const map = {
    invoice: {
      bg: "bg-[#eaf0ff]",
      color: "text-[#2563ff]",
      icon: "description",
    },
    po: {
      bg: "bg-[#f3e8ff]",
      color: "text-[#9333ea]",
      icon: "shopping_cart",
    },
    dn: {
      bg: "bg-[#fff7ed]",
      color: "text-[#f97316]",
      icon: "local_shipping",
    },
  };

  const item = map[type];

  return (
    <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${item.bg} ${item.color}`}>
      <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
    </div>
  );
}

export default function RepositoryPage() {
  const router = useRouter();
  const [lang, setLang] = useState<AppLanguage>("en");
  const [tab, setTab] = useState<TabType>("all");

  useEffect(() => {
    setLang(getStoredLanguage());
  }, []);

  const filteredItems = useMemo(() => {
    if (tab === "all") return repoItems;
    return repoItems.filter((item) => item.type === tab);
  }, [tab]);

  const tabLabel = (value: TabType) => {
    if (lang === "si") {
      if (value === "all") return "සියල්ල";
      if (value === "invoice") return "ඉන්වොයිස්";
      if (value === "po") return "PO";
      return "DN";
    }
    if (value === "all") return "All";
    if (value === "invoice") return "Invoice";
    if (value === "po") return "PO";
    return "DN";
  };

  const topSubtitle =
    lang === "si" ? "SME-ව්‍යාපාර ලේඛන" : "SME business documents";

  return (
    <MobileShell>
      <div className="min-h-screen bg-[#f6f7fb] pb-24">
        <main className="mx-auto w-full max-w-[920px] px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <h1 className="text-[24px] font-extrabold tracking-tight text-[#0f172a] sm:text-[28px]">
                Repository
              </h1>
              <p className="mt-1 text-[12px] text-[#94a3b8]">{topSubtitle}</p>
            </div>

            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <button className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-[#64748b] shadow-sm">
                <span className="material-symbols-outlined text-[20px]">search</span>
              </button>
              <button
                onClick={() => router.push("/upload")}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2563ff] text-white shadow-sm"
              >
                <span className="material-symbols-outlined text-[22px]">add</span>
              </button>
            </div>
          </div>

          <div className="mb-5 flex flex-wrap gap-2">
            {(["all", "invoice", "po", "dn"] as TabType[]).map((value) => (
              <button
                key={value}
                onClick={() => setTab(value)}
                className={`rounded-full px-4 py-2 text-[12px] font-semibold transition ${
                  tab === value
                    ? "bg-[#2563ff] text-white shadow-sm"
                    : "border border-slate-200 bg-white text-[#64748b]"
                }`}
              >
                {tabLabel(value)}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="rounded-[18px] border border-slate-200 bg-white p-4 shadow-[0_2px_10px_rgba(15,23,42,0.05)]"
              >
                <div className="flex items-start gap-4">
                  <TypeIcon type={item.type} />

                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#94a3b8]">
                      {item.type === "invoice"
                        ? "INVOICE"
                        : item.type === "po"
                        ? "PURCHASE ORDER"
                        : "DELIVERY NOTE"}
                    </p>

                    <p className="mt-1 text-[15px] font-bold leading-tight text-[#0f172a] sm:text-[16px]">
                      {item.title}
                    </p>

                    <div className="mt-2 grid gap-3 sm:grid-cols-2">
                      <div>
                        <p className="text-[11px] text-[#94a3b8]">
                          {item.type === "po" ? "Client" : item.type === "dn" ? "Receiver" : "Vendor"}
                        </p>
                        <p className="text-[13px] text-[#334155]">{item.vendorOrClient}</p>
                      </div>

                      <div className="sm:text-right">
                        <p className="text-[11px] text-[#94a3b8]">Date</p>
                        <p className="text-[13px] text-[#334155]">{item.date}</p>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between gap-4">
                      <span
                        className={`inline-flex rounded-xl px-3 py-1.5 text-[10px] font-bold uppercase ${
                          item.status === "ready"
                            ? "bg-[#dcfce7] text-[#16a34a]"
                            : "bg-[#fef3c7] text-[#d97706]"
                        }`}
                      >
                        {item.status}
                      </span>

                      <button
                        onClick={() => router.push("/analysis")}
                        className="text-[12px] font-bold text-[#2563ff]"
                      >
                        OPEN
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p
                      className={`text-[13px] font-bold ${
                        item.amount === "No Amount" ? "text-[#94a3b8]" : "text-[#0f172a]"
                      }`}
                    >
                      {item.amount}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>

        <BottomNav />
      </div>
    </MobileShell>
  );
}