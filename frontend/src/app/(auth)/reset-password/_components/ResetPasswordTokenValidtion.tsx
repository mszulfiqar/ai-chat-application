"use client";
import React, { useEffect, useState } from 'react'
import ErrorInavlidToken from './UI/ErrorInavlidToken';

const ResetPasswordTokenValidtion = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null  | undefined>()
    useEffect(() => {
        const token = new URLSearchParams(window.location.search).get("token");
        setToken(token)
    }, [])
    if (token === undefined) {
        return null; // or <div>Loading...</div>
    }
    if (!token) {
        return <ErrorInavlidToken />
    }

    return (
        <div>{children}</div>
    )
}

export default ResetPasswordTokenValidtion