import { MapPin, Phone, Mail, Clock } from "lucide-react";

const contactDetails = [
  {
    icon: MapPin,
    title: "Our Location",
    details: ["JALAL TOWN G.T ROAD، 1 Multan Okara Rd, Okara, Pakistan"],
  },
  {
    icon: Phone,
    title: "Contact Numbers",
    details: ["+92 311 2306050","0442715620","0442702080"],
  },
  {
    icon: Mail,
    title: "Email Address",
    details: ["futureSchoolSystem7@gmail.com"],
  },
  {
    icon: Clock,
    title: "Office Hours",
    details: [
      "Monday - Friday: 8:00 AM - 4:00 PM",
      "Saturday: 9:00 AM - 1:00 PM",
    ],
  },
];

const ContactInfo = () => {
  return (
    <div className="space-y-6">
      {contactDetails.map((item, index) => (
        <div
          key={index}
          className="flex gap-4 p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors duration-200"
        >
          {/* Icon */}
          <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center">
            <item.icon className="w-6 h-6 text-white" />
          </div>

          {/* Text */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">
              {item.title}
            </h3>
            {item.details.map((detail, i) => (
              <p key={i} className="text-sm text-gray-600">
                {detail}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactInfo;
