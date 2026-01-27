"use client";

import React from "react"

import { useEffect, useState, useCallback } from "react";
import { X } from "lucide-react";

const BANNER_STORAGE_KEY = "main-page-banner-shown";

export default function MainPageBanner() {
  const [imageUrl, setImageUrl] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // Check if banner was already shown this session
  useEffect(() => {
    const wasShown = sessionStorage.getItem(BANNER_STORAGE_KEY);
    if (wasShown) {
      setVisible(false);
      return;
    }

    async function fetchBanner() {
      try {
        const res = await fetch("/api/admin/main-page-banner");
        if (!res.ok) throw new Error("Failed to fetch banner");

        const data = await res.json();
        if (data?.photoUrl) setImageUrl(data.photoUrl);
      } catch (err) {
        console.error("Error fetching banner:", err);
      }
    }

    fetchBanner();
  }, []);

  // Preload image before showing
  useEffect(() => {
    if (!imageUrl) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageUrl;
    img.onload = () => {
      setLoaded(true);
      setVisible(true);
    };
  }, [imageUrl]);

  // Lock body scroll when banner is visible
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  // Handle escape key to close
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && visible) {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [visible]);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    // Mark as shown in session storage
    sessionStorage.setItem(BANNER_STORAGE_KEY, "true");

    // Wait for animation to complete before hiding
    setTimeout(() => {
      setVisible(false);
      setIsClosing(false);
    }, 300);
  }, []);

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!loaded || !visible || !imageUrl) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
        isClosing ? "opacity-0" : "opacity-100"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Promotional banner"
    >
      {/* Full-screen dark backdrop */}
      <div
        className={`absolute inset-0 bg-black/80 transition-opacity duration-300 ${
          isClosing ? "opacity-0" : "opacity-100"
        }`}
        onClick={handleBackdropClick}
        aria-hidden="true"
      />

      {/* Banner container */}
      <div
        className={`relative z-10 w-full max-w-[95vw] max-h-[95vh] sm:max-w-[90vw] md:max-w-[85vw] lg:max-w-4xl xl:max-w-5xl transition-all duration-300 ${
          isClosing ? "scale-95 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute -top-10 right-0 sm:-top-12 sm:-right-2 z-20 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 p-2 sm:p-2.5 text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
          aria-label="Close banner"
        >
          <X className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        {/* Image container with responsive sizing */}
        <div className="relative w-full overflow-hidden rounded-lg shadow-2xl">
          <img
            src={imageUrl || "/placeholder.svg"}
            alt="Main promotional banner"
            className="w-full h-auto max-h-[85vh] object-contain"
            draggable={false}
          />
        </div>

        {/* Tap to close hint on mobile */}
        <p className="mt-3 text-center text-xs sm:text-sm text-white/60 sm:hidden">
          Tap outside to close
        </p>
      </div>
    </div>
  );
}
