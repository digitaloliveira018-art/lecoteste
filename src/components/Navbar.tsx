'use client';

import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/app/lib/placeholder-images';

export function Navbar() {
  const logo = PlaceHolderImages?.find(img => img.id === 'logo');

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-secondary/10 bg-primary shadow-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/" className="flex items-center">
          {logo && (
            <Image
              src={logo.imageUrl}
              alt={logo.description}
              width={180}
              height={60}
              className="h-12 w-auto object-contain"
              priority
              data-ai-hint={logo.imageHint}
            />
          )}
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/agendar"
            className="hidden rounded-full bg-secondary px-6 py-2 text-sm font-semibold text-white transition-all hover:bg-secondary/90 sm:block"
          >
            Agendar Agora
          </Link>
        </div>
      </div>
    </nav>
  );
}
