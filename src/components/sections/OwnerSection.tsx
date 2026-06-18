import { User } from 'lucide-react';
import { OWNER_NAME } from '@/app/lib/constants';

export function OwnerSection() {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 items-center md:grid-cols-2">
          <div className="relative mx-auto aspect-square w-full max-w-[400px]">
            <div className="h-full w-full rounded-3xl bg-primary flex items-center justify-center relative overflow-hidden">
               <User className="h-48 w-48 text-secondary/30" />
               <div className="absolute inset-0 flex items-end justify-center pb-8">
                 <div className="bg-white/90 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-xl">
                   <p className="text-lg font-bold text-secondary">{OWNER_NAME}</p>
                   <p className="text-sm text-muted-foreground italic">Responsável pela Leco Fretes</p>
                 </div>
               </div>
            </div>
            <div className="absolute -z-10 -bottom-6 -right-6 h-full w-full rounded-3xl border-2 border-primary/30" />
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight text-secondary sm:text-4xl">
              Quem está por trás da Leco Fretes
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                A Leco Fretes é conduzida com responsabilidade, compromisso e atenção aos detalhes. Cada frete é tratado com seriedade, desde o primeiro contato até a entrega final.
              </p>
              <p>
                Mais do que transportar objetos, o objetivo é oferecer tranquilidade para o cliente, garantindo que tudo chegue ao destino da melhor forma possível.
              </p>
            </div>
            <div className="pt-4">
              <blockquote className="border-l-4 border-primary pl-6 italic">
                <p className="text-2xl font-semibold text-secondary">
                  “Meu compromisso é cuidar do seu frete como se fosse meu.”
                </p>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
