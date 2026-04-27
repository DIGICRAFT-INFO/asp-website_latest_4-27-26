// app/our-cranes/data.js
export const cranes = [
  {
    id: 1,
    slug: "tower-crane",
    name: "Tower Crane",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd",
    description: "Tower cranes provide exceptional height and lifting capacity for high-rise projects.",
    specs: {
      "Model/Type": "Hammerhead / Luffing",
      "Lifting Capacity": "350 MT",
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
    description: "Highly mobile cranes designed for quick setup and transportation.",
    specs: {
      "Model/Type": "Telescopic Hydraulic",
      "Lifting Capacity": "50 MT - 500 MT",
      "Mobility": "On-Road High Speed",
    },
  },
  // Add other cranes (Crawler, Pick & Carry, AWP, Multi-Axle) here following the same structure
];