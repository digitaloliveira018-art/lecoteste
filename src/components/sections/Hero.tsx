import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import { PlaceHolderImages } from '@/app/lib/placeholder-images';

export function Hero() {
  const truckImg = PlaceHolderImages?.find(img => img.id === 'hero-truck');
  const points = [
    "Atendimento rápido",
    "Fretes locais e viagens",
    "Cuidado com seus itens",
    "Orçamento pelo WhatsApp"
  ];

  return (
    <section className="relative overflow-hidden bg-primary px-4 py-16 md:py-24">
      <div className="container mx-auto grid gap-12 lg:grid-cols-2 lg:items-center">
        {/* Imagem do Caminhão - Agora aparece primeiro no mobile (order-1) */}
        <div className="relative flex justify-center lg:justify-end order-1 lg:order-2">
          <div className="relative h-[300px] w-full max-w-[500px] md:h-[400px]">
            <div className="absolute inset-0 flex items-center justify-center">
              {truckImg && (
                <div className="relative h-72 w-full md:h-96">
                   <Image 
                     src={truckImg.imageUrl} 
                     alt={truckImg.description}
                     fill
                     className="object-contain drop-shadow-2xl"
                     priority
                     data-ai-hint={truckImg.imageHint}
                   />
                </div>
              )}
              <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-secondary/5 blur-2xl" />
              <div className="absolute -top-4 -right-4 h-32 w-32 rounded-full bg-secondary/10 blur-3xl" />
            </div>
          </div>
        </div>

        {/* Texto e Headline - Agora aparece depois da foto no mobile (order-2) */}
        <div className="space-y-8 order-2 lg:order-1">
          <div className="space-y-4 text-center lg:text-left">
            <h1 className="text-4xl font-extrabold tracking-tight text-secondary md:text-6xl">
              Fretes rápidos, seguros e com preço justo
            </h1>
            <p className="max-w-[600px] mx-auto lg:mx-0 text-lg font-medium text-secondary/80 md:text-xl">
              A Leco Fretes realiza fretes locais, pequenas mudanças e viagens com cuidado, agilidade e compromisso do início ao fim.
            </p>
          </div>
          
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-center lg:justify-start">
            <Link
              href="/agendar"
              className="inline-flex h-14 items-center justify-center rounded-full bg-secondary px-8 text-lg font-bold text-white transition-all hover:scale-105 hover:bg-secondary/90"
            >
              Solicitar orçamento agora
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {points.map((point) => (
              <div key={point} className="flex items-center gap-2 text-secondary font-semibold">
                <CheckCircle2 className="h-5 w-5 shrink-0" />
                <span className="text-sm md:text-base">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
