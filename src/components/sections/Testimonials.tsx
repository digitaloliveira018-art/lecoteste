'use client';

import * as React from 'react';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export function Testimonials() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  const testimonialImages = [
    "https://i.postimg.cc/zfCMZMkr/Whats-App-Image-2026-06-21-at-17-11-25.jpg",
    "https://i.postimg.cc/cHdzsmDy/Whats-App-Image-2026-06-21-at-17-11-26.jpg",
    "https://i.postimg.cc/436MkM1G/Whats-App-Image-2026-06-21-at-17-11-26-(1).jpg",
    "https://i.postimg.cc/0NY3R3Cq/Whats-App-Image-2026-06-21-at-17-11-26-(2).jpg",
    "https://i.postimg.cc/KYPVSV5F/Whats-App-Image-2026-06-21-at-17-11-26-(3).jpg",
    "https://i.postimg.cc/pTPS2Zsw/Whats-App-Image-2026-06-21-at-17-11-26-(4).jpg",
    "https://i.postimg.cc/pTPS2Z0N/Whats-App-Image-2026-06-21-at-17-11-26-(5).jpg",
  ];

  React.useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section className="bg-primary/5 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl font-bold tracking-tight text-secondary sm:text-4xl">
            Quem já contratou recomenda
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Veja alguns retornos de clientes que já confiaram na Leco Fretes para realizar seus fretes e mudanças.
          </p>
          <p className="text-sm font-semibold text-secondary/60 uppercase tracking-widest pt-2">
            Depoimentos reais de clientes atendidos pela Leco Fretes.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <Carousel
            setApi={setApi}
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonialImages.map((src, index) => (
                <CarouselItem key={index} className="sm:basis-1/2 lg:basis-1/3 p-4">
                  <Card className="border-none shadow-lg bg-white h-[500px] overflow-hidden">
                    <CardContent className="p-0 h-full flex items-center justify-center bg-white">
                      <div className="relative w-full h-full">
                        <Image
                          src={src}
                          alt={`Depoimento ${index + 1}`}
                          fill
                          className="object-contain p-2"
                          priority={index < 3}
                          data-ai-hint="depoimento whatsapp"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <div className="hidden md:block">
              <CarouselPrevious className="left-[-50px] bg-secondary text-white border-none hover:bg-secondary/90 h-12 w-12" />
              <CarouselNext className="right-[-50px] bg-secondary text-white border-none hover:bg-secondary/90 h-12 w-12" />
            </div>
          </Carousel>

          {/* Indicadores (Dots) */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: count }).map((_, i) => (
              <button
                key={i}
                className={cn(
                  "h-2.5 w-2.5 rounded-full transition-all duration-300",
                  current === i ? "bg-secondary w-8" : "bg-secondary/20 hover:bg-secondary/40"
                )}
                onClick={() => api?.scrollTo(i)}
                aria-label={`Ir para o slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
