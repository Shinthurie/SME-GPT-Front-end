"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import MobileShell from "@/components/layout/MobileShell";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!token) {
      setMessage("Invalid reset link");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Failed to reset password");
        return;
      }

      setMessage("Password reset successful");

      setTimeout(() => {
        router.push("/login");
      }, 1200);
    } catch (error) {
      console.error("RESET PAGE ERROR:", error);
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MobileShell>
      <div className="min-h-screen bg-[#f7f8fb] px-4 py-8">
        <div className="mx-auto max-w-[520px] rounded-[30px] border border-[#d9dff0] bg-white p-8 shadow-sm">
          <h1 className="text-center text-[28px] font-extrabold text-[#0f172a]">
            Reset Password
          </h1>

          <p className="mt-3 text-center text-[13px] text-[#64748b]">
            Enter your new password
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <input
              type="password"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 w-full rounded-2xl border border-[#e3e7f2] bg-white px-4 text-[15px] text-slate-900 outline-none transition focus:border-[#4d7cff] focus:ring-2 focus:ring-[#4d7cff]/15"
              required
            />

            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="h-12 w-full rounded-2xl border border-[#e3e7f2] bg-white px-4 text-[15px] text-slate-900 outline-none transition focus:border-[#4d7cff] focus:ring-2 focus:ring-[#4d7cff]/15"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="flex h-12 w-full items-center justify-center rounded-2xl bg-[#07122f] text-[16px] font-bold text-white"
            >
              {loading ? "Updating..." : "Reset Password"}
            </button>
          </form>

          {message && (
            <p className="mt-4 text-center text-[13px] text-[#2563ff]">
              {message}
            </p>
          )}
        </div>
      </div>
    </MobileShell>
  );
}