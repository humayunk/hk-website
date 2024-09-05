'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <nav className="bg-gray-900 rounded-full px-8 py-4 shadow-lg">
        <ul className="flex items-center space-x-6">
          <li>
            <Link href="/" className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8">
              <Image
                src="/images/logomark.svg"
                alt="HK"
                width={24}
                height={24}
                className="h-6 w-6 sm:h-6 sm:w-6"
                priority
              />
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className={`transition-colors ${
                pathname === '/'
                  ? 'font-bold text-white'
                  : 'text-white/70 hover:text-yellow-400'
              }`}
            >
              Home
            </Link>
          </li>
          {/* <li>
            <Link
              href="/work"
              className={`transition-colors ${
                pathname === '/work'
                  ? 'font-bold text-white'
                  : 'text-white/70 hover:text-yellow-400'
              }`}
            >
              Work
            </Link>
          </li> */}
          <li>
            <Link
              href="/blog"
              className={`transition-colors ${
                pathname === '/blog'
                  ? 'font-bold text-white'
                  : 'text-white/70 hover:text-yellow-400'
              }`}
            >
              Blog
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
