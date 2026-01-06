'use client';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "./textarea";
import { Send, Loader2, X, AlertCircle, CheckCircle } from "lucide-react";
import axios from "axios";

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const showToast = (type, title, description) => {
    setToast({ type, title, description });
    setTimeout(() => setToast(null), 4000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      showToast("warning", "Missing Fields", "Please fill all required fields");
      return;
    }

    setIsSubmitting(true);
     try {
        await axios.post("/api/contact", formData);
        showToast("success", "Message Sent Successfully!", "We'll get back to you as soon as possible.");
        setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
        console.log("Error submitting contact form:", error);
        showToast("error", "Error!", "Something went wrong. Please try after some time.");
    }finally {
        setIsSubmitting(false);
  }

  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-foreground">
            Full Name <span className="text-destructive">*</span>
          </label>
          <Input
            id="name"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            className="h-12 bg-background border-border focus:border-primary focus:ring-primary"
            maxLength={100}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-foreground">
            Email Address <span className="text-destructive">*</span>
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={handleChange}
            className="h-12 bg-background border-border focus:border-primary focus:ring-primary"
            maxLength={255}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="phone" className="text-sm font-medium text-foreground">
          Phone Number
        </label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          placeholder="03000000000"
          value={formData.phone}
          onChange={handleChange}
          className="h-12 bg-background border-border focus:border-primary focus:ring-primary"
          maxLength={20}
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-foreground">
          Your Message <span className="text-destructive">*</span>
        </label>
        <Textarea
          id="message"
          name="message"
          placeholder="How can we help you? Ask about admissions, programs, or schedule a visit..."
          value={formData.message}
          onChange={handleChange}
          className="min-h-[140px] bg-background border-border focus:border-primary focus:ring-primary resize-none"
          maxLength={1000}
        />
      </div>
      
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-primary-foreground font-semibold text-base transition-all duration-300"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-5 h-5 mr-2" />
            Send Message
          </>
        )}
      </Button>

      {/* Toast Notification */}
      {toast && (
  <div className="fixed top-5  right-5 z-50 md:w-full max-w-sm animate-in fade-in slide-in-from-right-5 duration-300">
    <div
      className={`flex gap-3 p-4 rounded-xl border shadow-xl backdrop-blur-sm ${
        toast.type === "success"
          ? "bg-emerald-50 border-emerald-200"
          : toast.type === "warning"
          ? "bg-amber-50 border-amber-200"
          : "bg-rose-50 border-rose-200"
      }`}
    >
      {/* Icon */}
      <div className="mt-0.5">
        {toast.type === "success" ? (
          <CheckCircle className="w-5 h-5 text-emerald-600" />
        ) : toast.type === "warning" ? (
          <AlertCircle className="w-5 h-5 text-amber-600" />
        ) : (
          <AlertCircle className="w-5 h-5 text-rose-600" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1">
        <p
          className={`text-sm font-semibold ${
            toast.type === "success"
              ? "text-emerald-900"
              : toast.type === "warning"
              ? "text-amber-900"
              : "text-rose-900"
          }`}
        >
          {toast.title}
        </p>
        <p
          className={`mt-1 text-xs leading-relaxed ${
            toast.type === "success"
              ? "text-emerald-700"
              : toast.type === "warning"
              ? "text-amber-700"
              : "text-rose-700"
          }`}
        >
          {toast.description}
        </p>
      </div>

      {/* Close */}
      <button
        onClick={() => setToast(null)}
        className={`transition-colors ${
          toast.type === "success"
            ? "text-emerald-500 hover:text-emerald-700"
            : toast.type === "warning"
            ? "text-amber-500 hover:text-amber-700"
            : "text-rose-500 hover:text-rose-700"
        }`}
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  </div>
)}

    </form>
  );
};

export default ContactForm;
