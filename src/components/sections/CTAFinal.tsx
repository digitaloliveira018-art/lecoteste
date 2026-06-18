import Link from 'next/link';
import { MessageCircle } from 'lucide-react';

export function CTAFinal() {
  return (
    <section className="bg-secondary px-4 py-20 text-white">
      <div className="container mx-auto max-w-4xl text-center space-y-8">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Precisa de um frete? <span className="text-primary">Solicite seu orçamento agora</span>
        </h2>
        <p className="text-xl text-white/80 leading-relaxed">
          Responda algumas perguntas rápidas para entendermos melhor o seu frete e enviar as informações organizadas direto para o WhatsApp da Leco Fretes.
        </p>
        <div className="pt-4">
          <Link
            href="/agendar"
            className="inline-flex h-16 items-center gap-3 rounded-full bg-primary px-10 text-xl font-extrabold text-secondary transition-all hover:scale-105 hover:bg-primary/90"
          >
            <MessageCircle className="h-6 w-6" />
            Fazer orçamento pelo WhatsApp
          </Link>
        </div>
      </div>
    </section>
  );
}
