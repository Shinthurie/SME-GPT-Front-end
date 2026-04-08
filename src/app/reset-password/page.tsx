"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import MobileShell from "@/components/layout/MobileShell";

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const [message, setMessage] = useState("Validating reset link...");

  useEffect(() => {
    if (!token) {
      setMessage("Invalid or expired reset link.");
    } else {
      setMessage("Please enter your new password.");
    }
  }, [token]);

  return (
    <MobileShell>
      <div className="min-h-screen bg-[#f7f8fb] px-4 py-8">
        <div className="mx-auto max-w-[520px] rounded-[30px] border border-[#d9dff0] bg-white p-8 shadow-sm">
          <h1 className="text-center text-[28px] font-extrabold text-[#0f172a]">
            Reset Password
          </h1>

          <p className="mt-4 text-center text-[14px] text-[#64748b]">
            {message}
          </p>

          {/* keep your existing form/UI here */}
        </div>
      </div>
    </MobileShell>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="p-6 text-center">Loading...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}