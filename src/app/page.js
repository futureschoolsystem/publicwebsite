'use client'
import ImageSlider from "@/components/home/ImageSlider";
import HeroSection from "@/components/home/HeroSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import { TestimonialCards } from "@/components/home/TestimonialCards";

export default function Home() {
  return (
    <>
    <ImageSlider />
    <HeroSection />
    <WhyChooseUs />
    <TestimonialCards />
    </>
  );
}
