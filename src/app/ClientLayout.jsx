'use client'; 

import { usePathname } from 'next/navigation';
import TopHeader from '@/components/ui/TopHeader';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
export default function ClientLayout({ children }) {
  const pathname = usePathname();

  const hideOnRoutes = ['/login', '/student', '/teacher', '/admin']; // Add more routes to hide nav/footer

  const shouldHideLayout = hideOnRoutes.includes(pathname);

  return (
    <>
      {!shouldHideLayout && <TopHeader />}
      {!shouldHideLayout && <Navbar />}
      
      {children}
      
      {!shouldHideLayout && <Footer />}
      
    </>
  );
}
