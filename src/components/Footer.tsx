import { Truck, MapPin, Phone, MessageCircle } from 'lucide-react';
import { COMPANY_NAME, WHATSAPP_NUMBER } from '@/app/lib/constants';

export function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-12 md:grid-cols-3">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-primary">
                <Truck className="h-5 w-5 text-secondary" />
              </div>
              <span className="text-lg font-bold text-secondary">{COMPANY_NAME}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Fretes rápidos, seguros e com preço justo para sua mudança ou transporte de itens avulsos.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-secondary">Contato</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-secondary" />
                <span>(32) 99114-5249</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-secondary" />
                <span>Atendimento local e viagens</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <MessageCircle className="h-4 w-4 text-secondary" />
                <span>Orçamento via WhatsApp</span>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-secondary">Links Rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-secondary hover:underline">Página Inicial</a></li>
              <li><a href="/agendar" className="hover:text-secondary hover:underline">Solicitar Orçamento</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} {COMPANY_NAME}. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
