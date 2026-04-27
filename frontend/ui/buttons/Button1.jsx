import Link from 'next/link';

export default function Button1({ button1 = 'Learn More', link = '/contact' }) {
  return (
    <Link
      href={link}
      className="flex items-center w-fit border border-gray-800 rounded-sm font-semibold text-gray-900 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all group overflow-hidden"
    >
      <span className="pl-6 pr-2 py-3 text-sm">{button1}</span>
      <span className="px-4 py-3 flex items-center justify-center bg-red-600 text-white text-xl group-hover:bg-white group-hover:text-gray-900 transition-all">
        »
      </span>
    </Link>
  );
}
