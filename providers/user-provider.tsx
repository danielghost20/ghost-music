"use client"

import { MyUSerContextProvider } from "@/hooks/useUser"

interface UserProviderProps {
    children: React.ReactNode
}

export default function UserProvider ({ children }: UserProviderProps) {
    return (
        <MyUSerContextProvider>
            {children}
        </MyUSerContextProvider>
    )
}