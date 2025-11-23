"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import LoadingComponet from "./LoadingComponet";

const GuestRoutes = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();
    useEffect(() => {
        if (session && !isPending) {
            router.replace("/")
        }
    }, [session, isPending])

    if (isPending) return <LoadingComponet />

    if (session) {
        return null;
    }

    return (
        <div>{children}</div>
    )
}

export default GuestRoutes