"use client";
import React from "react";
import Image from "next/image";

import hero from "@/public/homepage/hero1.png";
import lift from "@/public/homepage/lift.png";
import Button1 from "@/ui/buttons/Button1";

export default function AboutCranes() {
  return (
    <section className="w-full bg-gray-50 py-14 sm:py-20 lg:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          
          {/* Image */}
          <div className="relative w-full h-[260px] sm:h-[360px] lg:h-[480px]">
            <Image
              src={hero}
              alt="Crane"
              fill
              priority
              className="object-cover rounded-lg"
            />
          </div>

          {/* Content */}
          <div>
            {/* Tag */}
            <p className="flex items-center gap-2 text-sm sm:text-base font-semibold 
                          text-red-500 tracking-widest border-b pb-2 mb-4 w-fit">
              <Image src={lift} alt="" width={26} height={26} priority />
              <span>Our Cranes</span>
            </p>

            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold 
                           text-gray-900 leading-tight mb-6">
              Our Commitment To <br className="hidden sm:block" />
              Excellence Construction
            </h2>

            {/* Description */}
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-4">
              ASP Cranes (Aadishakti Projects) is a professionally managed crane
              rental company headquartered in Raipur, Chhattisgarh. We specialize
              in providing advanced lifting solutions using a diverse fleet of
              cranes and access equipment, supported by skilled manpower and
              strict safety protocols.
            </p>

            <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-8">
              Founded with a vision to support India’s growing infrastructure
              sector, ASP Cranes is part of the Rajdev Group — a diversified
              business group with experience across logistics, construction
              support, and heavy engineering services.
            </p>

            {/* Button */}
           <Button1 button1="About Us"/>
          </div>
        </div>
      </div>
    </section>
  );
}