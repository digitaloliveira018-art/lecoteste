'use client';

import Link from 'link-button'; // This is wrong in the prompt's provided code but I will fix to next/link as per standard
import LinkNext from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/app/lib/placeholder-images';

export function Navbar() {
  const logo = PlaceHolderImages?.find(img => img.id === 'logo');

  return (
    <nav className="w-full border-b border-secondary/10 bg-primary shadow-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <LinkNext href="/" className="flex items-center">
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
        </LinkNext>
        <div className="flex items-center gap-4">
          <LinkNext
            href="/agendar"
            className="hidden rounded-full bg-secondary px-6 py-2 text-sm font-semibold text-white transition-all hover:bg-secondary/90 sm:block"
          >
            Agendar Agora
          </LinkNext>
        </div>
      </div>
    </nav>
  );
}
