import React from "react";
import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const phoneNumber = "923112306050"; // Pakistan format (92 + number)
  const message = encodeURIComponent(
    "Hello! I would like to inquire about admissions."
  );

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 group"
    >
      {/* Pulse Ring */}
      <span className="absolute inset-0 rounded-full bg-green-500 opacity-75 animate-ping"></span>

      {/* Button */}
      <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-green-500 shadow-lg transition-all duration-300 group-hover:scale-110 hover:bg-green-600">
        <MessageCircle className="w-7 h-7 text-white" />
      </div>

      {/* Tooltip */}
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-2 rounded-md bg-gray-900 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        Chat with us
      </span>
    </a>
  );
};

export default WhatsAppButton;