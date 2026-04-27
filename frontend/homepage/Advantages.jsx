'use client';
import Link from 'next/link';

const DEFAULT_CUSTOMER_POINTS = [
  'Expedited Procurement',
  'Nationwide Access to Extensive Crane Inventory',
  'Competitive MOB/DEMOB Rates Comparison and Transparency',
  'Unified and Simplified Proposal Tracking',
  'Expert Engineering and Logistics Support',
  'All-in-One Rental Agreement',
];

const DEFAULT_RENTAL_POINTS = [
  'Company Account Registration',
  'Hassle-Free Fleet Upload and Document Sharing',
  'Access to Verified Customers and Rental Enquiries',
  'Contract Documents and Terms & Conditions Support',
  'Streamlined Rental Process and Documentation',
  'Boosting Opportunities, Efficiency, and Profitability',
];

export default function Advantages({ data }) {
  const title = data?.title || 'Advantages of Renting';
  const subtitle = data?.subtitle || 'through the ASP Cranes platform';
  const customerPoints = data?.customerPoints?.length ? data.customerPoints : DEFAULT_CUSTOMER_POINTS;
  const rentalPoints = data?.rentalPoints?.length ? data.rentalPoints : DEFAULT_RENTAL_POINTS;
  const btnText = data?.btnText || 'Register Now';
  const image = data?.image || 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80';

  return (
    <section className="w-full bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
            <p className="text-lg text-gray-500 mt-2">{subtitle}</p>

            {/* For Customers */}
            <div className="mt-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-red-600">
                  <span className="text-white text-sm font-bold">C</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">For Customers</h3>
              </div>
              <ul className="space-y-2 text-gray-600 text-sm">
                {customerPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-red-600 mt-0.5 flex-shrink-0">•</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* For Rental Company */}
            <div className="mt-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-red-600">
                  <span className="text-white text-sm font-bold">R</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">For Rental Company</h3>
              </div>
              <ul className="space-y-2 text-gray-600 text-sm">
                {rentalPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-red-600 mt-0.5 flex-shrink-0">•</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <Link href="/contact"
                className="flex items-center w-fit border border-gray-800 rounded-sm font-semibold text-gray-900 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all group overflow-hidden">
                <span className="pl-6 pr-2 py-3 text-sm">{btnText}</span>
                <span className="px-4 py-3 bg-red-600 text-white text-xl group-hover:bg-white group-hover:text-gray-900 transition-all">»</span>
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex justify-center">
            <img
              src={image}
              alt="Crane advantages"
              className="rounded-xl shadow-lg object-cover w-full max-w-md aspect-square"
              onError={e => { e.target.src = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80'; }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
