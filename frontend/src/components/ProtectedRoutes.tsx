"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import LoadingComponet from "./LoadingComponet";
// import { FullPageLoader } from "./LoadingComponet";

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/");
    }
  }, [isPending, session, router]);

  if (isPending) return <LoadingComponet />;

  if (!session) return null; // prevent flashing protected content during redirect

  return <>{children}</>;
};

export default ProtectedRoutes;
