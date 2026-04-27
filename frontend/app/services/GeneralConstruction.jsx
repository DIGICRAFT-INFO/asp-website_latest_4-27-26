import React from "react";
import { HardHat, Ruler, Construction } from "lucide-react";

const GeneralConstruction = () => {
  const services = [
    {
      title: "Shifting & Loading",
      desc: "We specialize in heavy equipment shifting and loading for industrial plants, infrastructure sites, and factories. Our team ensures precise handling, minimizing downtime and risk.",
      icon: <Construction className="w-10 h-10 text-orange-600" />,
    },
    {
      title: "Winch Handling",
      desc: "Professional winch operations for controlled pulling, positioning, and lifting of heavy components in confined or challenging environments.",
      icon: <Ruler className="w-10 h-10 text-orange-600" />,
    },
    {
      title: "Material Handling",
      desc: "Complete material handling solutions including lifting, positioning, and movement of heavy and oversized materials using appropriate equipment.",
      icon: <HardHat className="w-10 h-10 text-orange-600" />,
    },
    {
      title: "Jacking (Machine Jacking & Leveling)",
      desc: "Accurate machine jacking and leveling services for installation, alignment, and relocation of industrial machinery.",
      icon: <HardHat className="w-10 h-10 text-orange-600" />,
    },
    {
      title: "Operations & Maintenance (O&M)",
      desc: "Dedicated O&M services for long-term projects, ensuring equipment uptime, safety compliance, and operational efficiency.",
      icon: <HardHat className="w-10 h-10 text-orange-600" />,
    },
  ];

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto font-sans">
      {/* Header Section */}
      <div className="mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          Our services that we provide
        </h2>
        <p className="text-gray-500 leading-relaxed max-w-5xl text-sm md:text-base">
         We craft unique digital experiences. With more than 7 years of expertise we design and code clean
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-[#F9FAFB] p-8 flex items-start gap-4 transition-all hover:shadow-md group"
          >
            {/* Icon Wrapper with circle background */}
            <div className="relative flex-shrink-0">
              <div className="absolute -inset-2 bg-orange-100 rounded-full opacity-50 scale-110"></div>
              <div className="relative">{service.icon}</div>
            </div>

            {/* Content */}
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-800 leading-snug">
                {service.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {service.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GeneralConstruction;
