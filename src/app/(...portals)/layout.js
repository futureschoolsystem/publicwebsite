'use client'
import { SessionProvider } from "next-auth/react";
export default function portalLayout({ children }) {
  return (
      <>
      <SessionProvider>        
            {children}
      </SessionProvider>
    </>
  );
}