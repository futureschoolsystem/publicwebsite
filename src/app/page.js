'use client'
import ImageSlider from "@/components/home/ImageSlider";
import HeroSection from "@/components/home/HeroSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import { TestimonialCards } from "@/components/home/TestimonialCards";
import WhatsAppButton from "@/components/ui/whatsapp-button";
import MainPageBanner from "@/components/MainPageBanner";

export default function Home() {
  return (
    <>
    <MainPageBanner />
    <ImageSlider />
    <HeroSection />
    <WhyChooseUs />
    <TestimonialCards />
    <WhatsAppButton />
    </>
  );
}
