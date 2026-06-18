import Image from 'next/image';
import { MapPin, Phone, MessageCircle } from 'lucide-react';
import { COMPANY_NAME } from '@/app/lib/constants';
import { PlaceHolderImages } from '@/app/lib/placeholder-images';

export function Footer() {
  const logo = PlaceHolderImages?.find(img => img.id === 'logo');

  return (
    <footer className="border-t border-secondary/10 bg-primary">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-12 md:grid-cols-3">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              {logo && (
                <Image
                  src={logo.imageUrl}
                  alt={logo.description}
                  width={150}
                  height={50}
                  className="h-10 w-auto object-contain"
                  data-ai-hint={logo.imageHint}
                />
              )}
            </div>
            <p className="text-sm font-medium text-secondary/80">
              Fretes rápidos, seguros e com preço justo para sua mudança ou transporte de itens avulsos.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-secondary">Contato</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm font-medium text-secondary">
                <Phone className="h-4 w-4" />
                <span>(32) 99114-5249</span>
              </li>
              <li className="flex items-center gap-2 text-sm font-medium text-secondary">
                <MapPin className="h-4 w-4" />
                <span>Atendimento local e viagens</span>
              </li>
              <li className="flex items-center gap-2 text-sm font-medium text-secondary">
                <MessageCircle className="h-4 w-4" />
                <span>Orçamento via WhatsApp</span>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-secondary">Links Rápidos</h4>
            <ul className="space-y-2 text-sm font-medium text-secondary">
              <li><a href="/" className="hover:underline">Página Inicial</a></li>
              <li><a href="/agendar" className="hover:underline">Solicitar Orçamento</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-secondary/20 pt-8 text-center text-xs font-bold uppercase tracking-widest text-secondary/60">
          © {new Date().getFullYear()} {COMPANY_NAME}. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
