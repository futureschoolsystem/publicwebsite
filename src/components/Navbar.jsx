"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Poppins } from "next/font/google";
import { Button } from "@/components/ui/button";
import { FaUser,FaArrowRight } from "react-icons/fa";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600"],
  style: ["italic"],
  display: "swap",
  adjustFontFallback: true,
});

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigationLinks = [
    { href: "/", label: "Home" },
    { href: "/about-us", label: "About Us" },
    { href: "/contact-us", label: "Contact Us" },
    { href: "/gallery", label: "Gallery" },
    { href: "/events-and-announcements", label: "Events & Announcements" },
  ];

  return (
    <nav
      className={`${poppins.className} bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex-shrink-0 transition-transform duration-200 hover:scale-105"
          >
            <Image
              src="/futureschoollogo.png"
              alt="Future School Logo"
              width={120}
              height={100}
              className="w-auto h-auto"
              priority
            />
          </Link>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 lg:px-4 py-2 text-gray-700 hover:text-blue-600 font-medium text-sm lg:text-base transition-colors duration-200 rounded-lg hover:bg-blue-50 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Toggle navigation menu"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[350px]">
                 

                <div className="flex flex-col h-full">
                  {/* Mobile Menu Header */}
                  <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <Image
                      src="/futureschoollogo.png"
                      alt="Future School Logo"
                      width={120}
                      height={40}
                      className="h-auto w-auto"
                    />
                  </div>

      <SheetTitle className="sr-only text-lg text-center font-semibold">Navigation Menu</SheetTitle>

                  {/* Mobile Navigation Links */}
                  <div className="flex flex-col space-y-2 pt-6">
                    {navigationLinks.map((link) => (
                      <SheetClose asChild key={link.href}>
                        <Link
                          href={link.href}
                          className="flex items-center px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-500 active:bg-blue-500 active:text-white rounded-lg font-medium transition-colors duration-200 group"
                          onClick={() => setIsOpen(false)}
                        >
                           <FaArrowRight className="ml-2 mr-3  text-sm" />
                          <span className="text-base">{link.label}</span>
                          <div className="ml-auto w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-6"></div>
                        </Link>
                      </SheetClose>
                    ))}
                  </div>
                  {/* Mobile Menu Footer */}
                  <div className="mt-auto p-2   border-t border-gray-200">
                    <Link
                      href="/login"
                      role="button"
                      aria-label="Login to your portal"
                      className="group flex items-center bg-blue-800 hover:bg-blue-900 active:bg-blue-900  text-white px-4 py-2.5 rounded-full transition-colors duration-300"
                    >
                      <FaUser className="mr-2 text-sm group-hover:rotate-12 transition-transform duration-300" />
                      <span className="font-medium text-sm">Login Portal</span>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
