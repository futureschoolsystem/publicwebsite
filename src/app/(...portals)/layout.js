'use client'
import PortalNavbar from "@/components/portal-components/PortalNavbar";
export default function portalLayout({ children }) {
  return (
      <>
      <PortalNavbar />
            {children}
    </>
  );
}