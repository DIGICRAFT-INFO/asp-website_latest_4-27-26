"use client";

import React from "react";
import Image from "next/image";
import lift from "@/public/homepage/lift.png";
import whyChooseUs from "@/public/services/whyChooseUs.png";

const benefits = [
  {
    id: "01",
    title: "ADVANCED TECHNOLOGY",
    description:
      "We craft unique digital experiences. With more years of expertise we design",
    pLeft: "lg:pl-0",
  },
  {
    id: "02",
    title: "TRUSTED COMPANY",
    description:
      "We craft unique digital experiences. With more years of expertise we design",
    pLeft: "lg:pl-10",
  },
  {
    id: "03",
    title: "PROFESSIONAL TEAMS",
    description:
      "We craft unique digital experiences. With more years of expertise we design",
    pLeft: "lg:pl-20",
  },
  {
    id: "04",
    title: "STYLISTIC FORMULA METHOD",
    description:
      "We craft unique digital experiences. With more years of expertise we design",
    pLeft: "lg:pl-30",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16 bg-white">
      {/* Top Label */}
      <div className="flex items-center gap-2 mb-6">
        <p className="flex items-center gap-2 text-sm sm:text-lg font-semibold text-red-500 tracking-widest border-b pb-1">
          <Image src={lift} alt="" width={26} height={26} priority />
          <span>Our Benefits</span>
        </p>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 max-lg:gap-12 items-center">
        {/* Left Column */}
        <div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 mb-8">
            Why choose us
          </h2>

          <Image
            src={whyChooseUs}
            alt="Why Choose Us"
            className="w-full max-w-md mx-auto lg:mx-0 object-contain grayscale hover:grayscale-0 transition duration-300"
            priority
          />
        </div>

        {/* Right Column */}
        <div className="space-y-10">
          {benefits.map((item) => (
            <div
              key={item.id}
              className={`flex gap-6 items-start group ${item.pLeft}`}
            >
              {/* Number */}
              <span className="text-5xl sm:text-6xl font-semibold text-gray-100 group-hover:text-red-500 transition duration-300 leading-none">
                {item.id}
              </span>

              {/* Text */}
              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-gray-800 uppercase">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-sm">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;