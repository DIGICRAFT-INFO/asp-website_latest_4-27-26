"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// 1. Unified Data Array with Slugs added to prevent "Crane Not Found"
const cranes = [
  {
    id: 1,
    slug: "tower-crane",
    name: "Tower Crane",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd",
    description: "Tower cranes provide exceptional height and lifting capacity for high-rise and large-scale construction projects.",
    specs: {
      "Model/Type": "Hammerhead / Luffing",
      "Lifting Capacity": "350 MT",
      "Unladen Weight": "70.7 MT",
      "Main Boom Length": "63 Mtr",
      "Jib Length": "30 Mtr",
      "Counter Weight": "100 MT",
    },
  },
  {
    id: 2,
    slug: "truck-mounted-crane",
    name: "Truck-Mounted Crane",
    image: "https://images.unsplash.com/photo-1590487988256-9ed24133863e",
    description: "Highly mobile cranes designed for quick setup and transportation between multiple job sites.",
    specs: {
      "Model/Type": "Telescopic Hydraulic",
      "Lifting Capacity": "50 MT - 500 MT",
      "Gross Vehicle Weight": "Approx 48 MT",
      "Mobility": "On-Road High Speed",
    },
  },
  {
    id: 3,
    slug: "crawler-crane",
    name: "Crawler Crane",
    image: "https://images.unsplash.com/photo-1545459720-aac273a27b3d",
    description: "Designed for super-heavy lifting, crawler cranes deliver unmatched stability and performance.",
    specs: {
      "Model/Type": "Lattice Boom Crawler",
      "Lifting Capacity": "350 MT",
      "Operating Weight": "Approx 210 MT",
      "Main Boom Length": "63 Mtr",
    },
  },
  {
    id: 4,
    slug: "pick-and-carry-crane",
    name: "Pick & Carry Crane",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f",
    description: "Versatile, articulated cranes used for moving loads over short distances without outriggers.",
    specs: {
      "Model/Type": "Articulated / Next-Gen",
      "Lifting Capacity": "9 MT - 30 MT",
      "Unladen Weight": "12 MT - 20 MT",
      "Steering": "Articulated",
    },
  },
  {
    id: 5,
    slug: "aerial-work-platform",
    name: "Aerial Work Platform (AWP)",
    image: "https://images.unsplash.com/photo-1541625602330-2277a1cd43a1",
    description: "Provides safe temporary access for people or equipment to inaccessible heights.",
    specs: {
      "Model/Type": "Boom / Scissor Lift",
      "Platform Capacity": "230 kg - 450 kg",
      "Machine Weight": "Approx 15 MT",
      "Power": "Electric / Diesel",
    },
  },
  {
    id: 6,
    slug: "multi-axle-trailer",
    name: "Multi-Axle Platform Trailer",
    image: "https://images.unsplash.com/photo-1605141151659-19cc83e39b7d",
    description: "Heavy-duty modular trailers designed for transporting oversized and ultra-heavy cargo.",
    specs: {
      "Model/Type": "Hydraulic Modular Trailer",
      "Payload Capacity": "500+ MT",
      "Tare Weight": "Approx 3.5 MT/Axle",
      "Axles": "Modular Configuration",
    },
  },
];

const typeOfWorkOptions = ["General Construction", "Erection (Tower)", "Loading/Unloading", "Material Handling", "Concrete Pouring", "Other"];
const durationOptions = ["1-7 Days", "1 Month", "2 Months", "3 Months", "4-6 Months", "6+ Months (Long Term)"];

export default function Cranes() {
  const [openId, setOpenId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [selectedCrane, setSelectedCrane] = useState("");
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    contactNumber: "",
    designation: "",
    typeOfWork: "",
    location: "",
    startDate: "",
    noOfShifts: "1",
    shiftHours: "8hrs",
    duration: "",
    modelType: "",
    reqCapacity: "",
    loadWeight: "",
    reqRadius: "",
    maxHeight: "",
  });

  const toggle = (id) => setOpenId(openId === id ? null : id);

  const openQuoteForm = (craneName) => {
    setSelectedCrane(craneName);
    setIsModalOpen(true);
    setShowMore(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Quote request submitted successfully!");
    setIsModalOpen(false);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-10 font-sans">
      <h2 className="text-3xl font-extrabold mb-8 text-gray-800 border-l-4 border-red-500 pl-4">Our Fleet</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cranes.map((crane) => (
          <div key={crane.id} className="group border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl bg-white overflow-hidden flex flex-col transition-all duration-300 transform hover:-translate-y-1">
            {/* Image Container */}
            <div className="relative h-56 bg-gray-200 overflow-hidden">
              <Image 
                src={crane.image} 
                alt={crane.name} 
                fill 
                className="object-cover transition-transform duration-500 group-hover:scale-110" 
              />
              <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase">
                Premium Fleet
              </div>
            </div>

            {/* Content Container */}
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="font-bold text-xl text-gray-900 mb-2">{crane.name}</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-grow">{crane.description}</p>

              {/* Specification Toggle (Commented out in your original but functional here) */}
              {/* <button 
                onClick={() => toggle(crane.id)} 
                className="text-red-500 text-xs font-bold mb-4 text-left hover:text-red-700 flex items-center gap-1 transition"
              >
                {openId === crane.id ? "✕ Hide Specs" : "→ View Key Specs"}
              </button> */}

              {openId === crane.id && (
                <ul className="bg-gray-50 p-4 rounded-xl mb-4 text-sm space-y-2 border border-gray-100 animate-in fade-in slide-in-from-top-1 duration-300">
                  {Object.entries(crane.specs).slice(0, 4).map(([key, val]) => (
                    <li key={key} className="flex justify-between border-b border-gray-200/50 last:border-0 pb-1">
                      <span className="text-gray-500">{key}</span>
                      <span className="font-semibold text-gray-800">{val}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Action Buttons */}
              <div className="mt-auto flex gap-3">
                <button 
                  onClick={() => openQuoteForm(crane.name)} 
                  className="flex-1 bg-red-600 text-white py-3 rounded-lg text-sm font-bold hover:bg-red-700 active:scale-95 transition shadow-md shadow-red-200"
                >
                  Get Quote
                </button>
                
                <Link 
                  href={`/our-cranes/${crane.slug}`} 
                  className="flex-1 border-2 border-red-600 text-red-600 py-3 rounded-lg text-sm font-bold text-center hover:bg-red-50 active:scale-95 transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- QUOTE MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md transition-all">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[92vh] overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-6 border-b flex justify-between items-center bg-white sticky top-0 z-20">
              <div>
                <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Request Quote</h3>
                <p className="text-sm text-red-600 font-bold">{selectedCrane}</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 text-gray-500 hover:bg-red-500 hover:text-white transition-colors"
              >
                <span className="text-2xl">&times;</span>
              </button>
            </div>

            {/* Scrollable Form Body */}
            <div className="overflow-y-auto flex-1 p-6 lg:p-8">
              <form id="quote-form" onSubmit={handleSubmit} className="space-y-6">
                {/* Section 1: Client Info */}
                <div className="space-y-4">
                  <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest border-b pb-2">Company Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-700">Company Name *</label>
                      <input type="text" name="companyName" onChange={handleInputChange} required className="w-full border-2 border-gray-100 p-3 rounded-xl outline-none focus:border-red-500 bg-gray-50/50 transition" placeholder="Muraad Construction" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-700">Contact Person *</label>
                      <input type="text" name="contactPerson" onChange={handleInputChange} required className="w-full border-2 border-gray-100 p-3 rounded-xl outline-none focus:border-red-500 bg-gray-50/50 transition" placeholder="John Doe" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-700">Contact Number *</label>
                      <input type="tel" name="contactNumber" onChange={handleInputChange} required className="w-full border-2 border-gray-100 p-3 rounded-xl outline-none focus:border-red-500 bg-gray-50/50 transition" placeholder="+91 00000 00000" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-700">Designation</label>
                      <input type="text" name="designation" onChange={handleInputChange} className="w-full border-2 border-gray-100 p-3 rounded-xl outline-none focus:border-red-500 bg-gray-50/50 transition" placeholder="Project Manager" />
                    </div>
                  </div>
                </div>

                {/* Section 2: Toggleable Advanced Details */}
                {!showMore ? (
                  <button 
                    type="button" 
                    onClick={() => setShowMore(true)}
                    className="group w-full py-4 border-2 border-dashed hover:border-gray-300 hover:text-gray-500 font-bold rounded-xl border-red-500 text-red-600 transition-all flex items-center justify-center gap-2"
                  >
                    <span className="text-xl group-hover:rotate-90 transition-transform">+</span>
                    Add Technical & Site Details (Recommended)
                  </button>
                ) : (
                  <div className="space-y-6 animate-in slide-in-from-top-4 duration-500">
                    <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest border-b pb-2">Site & Machine Specs</h4>
                    
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-700">Specific Model/Type Preference</label>
                      <input type="text" name="modelType" onChange={handleInputChange} className="w-full border-2 border-gray-100 p-3 rounded-xl outline-none focus:border-red-500 bg-gray-50/50 transition" placeholder="e.g. Luffing Jib, Next-Gen" />
                    </div>

                    <div className="bg-red-50/50 p-5 rounded-2xl border border-red-100">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-red-600 uppercase">Req. Capacity (MT)</label>
                          <input type="text" name="reqCapacity" onChange={handleInputChange} className="w-full border-2 border-white p-2.5 rounded-lg shadow-sm" placeholder="e.g. 50" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-blue-600 uppercase">Max Load Weight (MT)</label>
                          <input type="text" name="loadWeight" onChange={handleInputChange} className="w-full border-2 border-white p-2.5 rounded-lg shadow-sm" placeholder="e.g. 40" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-gray-600 uppercase">Working Radius (Mtr)</label>
                          <input type="text" name="reqRadius" onChange={handleInputChange} className="w-full border-2 border-white p-2.5 rounded-lg shadow-sm" placeholder="e.g. 30" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-gray-600 uppercase">Max Lifting Height (Mtr)</label>
                          <input type="text" name="maxHeight" onChange={handleInputChange} className="w-full border-2 border-white p-2.5 rounded-lg shadow-sm" placeholder="e.g. 60" />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-700">Work Environment</label>
                        <select name="typeOfWork" onChange={handleInputChange} className="w-full border-2 border-gray-100 p-3 rounded-xl bg-white outline-none focus:border-red-500 transition">
                          <option value="">Select Work Type</option>
                          {typeOfWorkOptions.map((opt) => (<option key={opt} value={opt}>{opt}</option>))}
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-700">Project Location</label>
                        <input type="text" name="location" onChange={handleInputChange} className="w-full border-2 border-gray-100 p-3 rounded-xl outline-none focus:border-red-500 transition" placeholder="City / Site Address" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-700">Work Shifts</label>
                        <input type="number" name="noOfShifts" onChange={handleInputChange} defaultValue="1" className="w-full border-2 border-gray-100 p-3 rounded-xl outline-none focus:border-red-500 transition" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-700">Shift Duration</label>
                        <input type="text" name="shiftHours" onChange={handleInputChange} placeholder="e.g. 8hrs or 12hrs" className="w-full border-2 border-gray-100 p-3 rounded-xl outline-none focus:border-red-500 transition" />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-700">Rental Duration</label>
                      <select name="duration" onChange={handleInputChange} className="w-full border-2 border-gray-100 p-3 rounded-xl bg-white outline-none focus:border-red-500 transition">
                        <option value="">Select Duration</option>
                        {durationOptions.map((opt) => (<option key={opt} value={opt}>{opt}</option>))}
                      </select>
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* Footer Submit Button */}
            <div className="p-6 border-t bg-white shadow-[0_-10px_20px_rgba(0,0,0,0.02)] z-30">
              <button 
                type="submit" 
                form="quote-form" 
                className="w-full hover:bg-gray-900 text-white font-black py-4 rounded-lg bg-red-600 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3"
              >
                SUBMIT QUOTE REQUEST
                <span className="text-xl">→</span>
              </button>
              {/* <p className="text-[10px] text-center text-gray-400 mt-3 font-medium uppercase tracking-widest">
                Our team will contact you within 24 business hours
              </p> */}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}