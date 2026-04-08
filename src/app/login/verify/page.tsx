import { Suspense } from "react";
import { connection } from "next/server";
import LoginVerifyClient from "./LoginVerifyClient";

export default async function LoginVerifyPage() {
  await connection();

  return (
    <Suspense fallback={<div className="p-6 text-center">Loading...</div>}>
      <LoginVerifyClient />
    </Suspense>
  );
}