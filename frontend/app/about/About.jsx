"use client";

import React from "react";
import { ArrowUpRight, Target, Eye } from "lucide-react";
import about from "@/public/about/about.jpg";
import Image from "next/image";
import lift from "@/public/homepage/lift.png";
import Button1 from "@/ui/buttons/Button1";

const About = () => {
  return (
    <section className="bg-white py-16 px-4 md:px-8 lg:px-16 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col max-lg:flex-col-reverse lg:flex-row gap-12 items-center">
        {/* Left Content Side */}
        <div className="w-full lg:w-1/2 ">
         
            <p className="text-lg inline-flex font-bold text-red-500 gap-2 border-b tracking-widest mb-4 relative">
              <Image src={lift} alt="" width={30} height={30} priority />
              <span>ABOUT US</span>
            </p>
         

          <h1 className="text-4xl md:text-6xl font-semibold text-slate-900 mb-4 leading-tight">
            WE BUILD EVERYTHING THAT YOU NEED
          </h1>

          <p className="text-slate-600 text-lg leading-relaxed mb-4 max-w-xl">
            ASP Cranes is a leading crane rental and heavy lifting service
            provider, delivering professional solutions to India’s
            infrastructure and industrial sectors. Our operations are driven by
            technical expertise, safety awareness, and customer satisfaction.
          </p>
          {/* <p className="text-slate-600 text-lg leading-relaxed max-w-xl mb-4">
            ASP Cranes is a leading crane rental and heavy lifting service
            provider, delivering professional solutions to India’s
            infrastructure and industrial sectors. Our operations are driven by
            technical expertise, safety awareness, and customer satisfaction.
          </p> */}

          <ul className="space-y-4 mb-4">
            <li className="flex items-center gap-3 text-slate-800 font-semibold">
              <span className="w-5 h-5 border-2 border-orange-500 rounded-full flex items-center justify-center text-[10px] text-orange-500">
                ○
              </span>
              Safety First
            </li>
            <li className="flex items-center gap-3 text-slate-800 font-semibold">
              <span className="w-5 h-5 border-2 border-orange-500 rounded-full flex items-center justify-center text-[10px] text-orange-500">
                ○
              </span>
              Integrity & Transparency
            </li>
            <li className="flex items-center gap-3 text-slate-800 font-semibold">
              <span className="w-5 h-5 border-2 border-orange-500 rounded-full flex items-center justify-center text-[10px] text-orange-500">
                ○
              </span>
              Professional Excellence
            </li>
            <li className="flex items-center gap-3 text-slate-800 font-semibold">
              <span className="w-5 h-5 border-2 border-orange-500 rounded-full flex items-center justify-center text-[10px] text-orange-500">
                ○
              </span>
              Customer Commitment
            </li>
            <li className="flex items-center gap-3 text-slate-800 font-semibold">
              <span className="w-5 h-5 border-2 border-orange-500 rounded-full flex items-center justify-center text-[10px] text-orange-500">
                ○
              </span>
              Continuous Improvement
            </li>
          </ul>

          <div className="grid grid-cols-1 mb-8 md:grid-cols-2 gap-8 pt-4">
            <div className="flex gap-4">
              <div className="bg-slate-50 p-4 rounded-sm flex-shrink-0">
                <Target className="text-orange-600 w-8 h-8" />
              </div>
              <div>
                <h3 className="font-bold text-xl text-slate-900">
                  Our Mission
                </h3>
                <p className="text-slate-500 text-sm mt-1">
                  To deliver reliable, safe, and innovative lifting solutions
                  that support our clients’ project success.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-slate-50 p-4 rounded-sm flex-shrink-0">
                <Eye className="text-orange-600 w-8 h-8" />
              </div>
              <div>
                <h3 className="font-bold text-xl text-slate-900">Our Vision</h3>
                <p className="text-slate-500 text-sm mt-1">
                  To become one of India’s most trusted and technologically
                  advanced crane rental companies.
                </p>
              </div>
            </div>
          </div>

          {/* <button className="flex items-center pl-6 justify-between border border-gray-800 rounded-sm font-semibold text-gray-900 w-fit hover:bg-red-600 hover:text-white transition group">
            Explore Our Company
            <span className="pb-2 px-4 h-full ml-6 text-4xl flex items-center justify-center bg-red-600 text-white group-hover:bg-white group-hover:text-gray-800 transition">
              »
            </span>
          </button> */}
          <Button1 button1="About Us" />
        </div>

        {/* Right Image Side */}
        <div className="w-full lg:w-1/2 relative">
          <div className="relative z-10 overflow-hidden rounded-sm">
            <Image
              src={about}
              alt="Construction Worker"
              width={1000}
              height={1000}
              priority
              className="w-full object-cover"
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        .clip-triangle {
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        }
      `}</style>
    </section>
  );
};

export default About;
