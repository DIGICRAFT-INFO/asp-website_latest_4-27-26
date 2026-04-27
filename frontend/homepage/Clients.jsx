'use client';

const FALLBACK_CLIENTS = [
  { name: 'L&T', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Larsen_%26_Toubro_Logo.svg' },
  { name: 'Tata', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Tata_logo.svg' },
  { name: 'BHEL', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/BHEL_logo.svg' },
  { name: 'ONGC', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/ONGC_Logo.svg' },
  { name: 'Indian Oil', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9b/Indian_Oil_Logo.svg' },
  { name: 'GAIL', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/18/GAIL_Logo.svg' },
  { name: 'UltraTech', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/UltraTech_Cement_Logo.svg' },
  { name: 'Adani', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Adani_logo.svg' },
  { name: 'JSW', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/JSW_Group_logo.svg' },
  { name: 'Vedanta', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/59/Vedanta_Logo.svg' },
  { name: 'BANDR', logo: '' },
  { name: 'HP', logo: '' },
];

export default function Clients({ clients, data }) {
  const items = clients?.length ? clients : FALLBACK_CLIENTS;
  const tagline = data?.tagline || 'TRUSTED PARTNERS';
  const title = data?.title || 'Our Clients';
  const subtitle = data?.subtitle || 'Partnering with industry leaders to deliver excellence across sectors';

  return (
    <section className="w-full py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <p className="text-red-600 text-xs font-bold uppercase tracking-widest mb-2">{tagline}</p>
          <h2 className="text-4xl font-black text-gray-900">
            Our <span className="text-red-600">Clients</span>
          </h2>
          <p className="text-gray-500 mt-3 text-sm">{subtitle}</p>
        </div>

        {/* Client logos grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {items.map((client, i) => (
            <div key={client._id || i}
              className="bg-white rounded-xl p-4 flex items-center justify-center border border-gray-100 hover:border-red-200 hover:shadow-md transition-all min-h-[80px]">
              {client.logo ? (
                <img
                  src={client.logo}
                  alt={client.name}
                  className="max-h-10 max-w-full object-contain grayscale hover:grayscale-0 transition-all"
                  onError={e => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <span
                className={`text-gray-600 text-xs font-bold text-center ${client.logo ? 'hidden' : 'flex'}`}
                style={{ display: client.logo ? 'none' : 'flex' }}
              >
                {client.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
