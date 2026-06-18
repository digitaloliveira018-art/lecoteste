import Link from 'next/link';
import { Truck } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <Truck className="h-6 w-6 text-secondary" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-secondary">
            LECO <span className="text-primary-foreground">FRETES</span>
          </span>
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
