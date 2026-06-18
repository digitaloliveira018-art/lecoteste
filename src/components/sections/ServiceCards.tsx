
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Truck, Ruler, Box, MapPin, Eye, ChevronRight, HelpCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { PlaceHolderImages } from '@/app/lib/placeholder-images';

export function ServiceCards() {
  const trucks = [
    {
      id: "iveco",
      name: "Iveco",
      tagline: "Ideal para mudanças maiores e fretes com mais volume.",
      dimensions: {
        length: "4,60 m",
        height: "2,15 m",
        width: "2,15 m"
      },
      description: "O Iveco é indicado para mudanças residenciais, transporte de móveis maiores, eletrodomésticos, caixas e serviços que exigem mais espaço interno. É uma ótima opção para quem precisa transportar vários itens de uma só vez com segurança e organização.",
      benefits: ["Maior capacidade", "Ideal para mudanças", "Bom para móveis e caixas", "Fretes locais e viagens"],
      images: [
        PlaceHolderImages.find(img => img.id === 'iveco-1')?.imageUrl || "",
        PlaceHolderImages.find(img => img.id === 'iveco-2')?.imageUrl || "",
        PlaceHolderImages.find(img => img.id === 'iveco-3')?.imageUrl || "",
      ]
    },
    {
      id: "sprinter",
      name: "Sprinter",
      tagline: "Perfeita para fretes rápidos, poucos itens e acessos mais práticos.",
      dimensions: {
        length: "3,50 m",
        height: "2,05 m",
        width: "2,10 m"
      },
      description: "A Sprinter é ideal para fretes menores, transporte de poucos móveis, eletrodomésticos, compras grandes, caixas e entregas mais rápidas. Por ser mais compacta, é uma ótima opção para locais com acesso mais simples e serviços do dia a dia.",
      benefits: ["Fretes rápidos", "Poucos itens", "Mais compacta", "Ótima para o dia a dia"],
      images: [
        PlaceHolderImages.find(img => img.id === 'sprinter-1')?.imageUrl || "",
        PlaceHolderImages.find(img => img.id === 'sprinter-2')?.imageUrl || "",
        PlaceHolderImages.find(img => img.id === 'sprinter-3')?.imageUrl || "",
      ]
    }
  ];

  return (
    <section className="bg-muted/30 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl font-bold tracking-tight text-secondary sm:text-4xl">
            Estrutura para diferentes tipos de frete
          </h2>
          <p className="text-lg text-muted-foreground">
            A Leco Fretes conta com caminhões preparados para atender desde pequenos fretes até mudanças maiores, sempre escolhendo o veículo mais adequado para cada serviço.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {trucks.map((truck) => (
            <Card key={truck.id} className="overflow-hidden bg-white border-none shadow-xl flex flex-col">
              <div className="relative h-64 w-full group">
                <Image
                  src={truck.images[0]}
                  alt={truck.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  data-ai-hint={`caminhão ${truck.id}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                   <Badge className="bg-primary text-secondary font-bold text-lg px-4 py-1">
                     {truck.name}
                   </Badge>
                </div>
              </div>

              <CardHeader className="pt-8">
                <CardTitle className="text-2xl text-secondary font-extrabold leading-tight">
                  {truck.tagline}
                </CardTitle>
                <div className="flex flex-wrap gap-2 pt-4">
                  {truck.benefits.map((benefit) => (
                    <Badge key={benefit} variant="secondary" className="bg-secondary/10 text-secondary border-none">
                      {benefit}
                    </Badge>
                  ))}
                </div>
              </CardHeader>

              <CardContent className="flex-1 space-y-8">
                {/* Medidas Úteis */}
                <div className="grid grid-cols-3 gap-4 p-4 rounded-2xl bg-primary/10 border border-primary/20">
                  <div className="flex flex-col items-center text-center gap-1">
                    <Ruler className="h-5 w-5 text-secondary opacity-70" />
                    <span className="text-[10px] uppercase font-bold text-secondary/60">Comp.</span>
                    <span className="text-sm font-bold text-secondary">{truck.dimensions.length}</span>
                  </div>
                  <div className="flex flex-col items-center text-center gap-1">
                    <Ruler className="h-5 w-5 text-secondary opacity-70 rotate-90" />
                    <span className="text-[10px] uppercase font-bold text-secondary/60">Alt.</span>
                    <span className="text-sm font-bold text-secondary">{truck.dimensions.height}</span>
                  </div>
                  <div className="flex flex-col items-center text-center gap-1">
                    <Ruler className="h-5 w-5 text-secondary opacity-70 -rotate-45" />
                    <span className="text-[10px] uppercase font-bold text-secondary/60">Larg.</span>
                    <span className="text-sm font-bold text-secondary">{truck.dimensions.width}</span>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  {truck.description}
                </p>

                <div className="grid gap-4 sm:grid-cols-2 mt-auto">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full h-12 border-secondary text-secondary hover:bg-secondary/5 font-bold gap-2">
                        <Eye className="h-5 w-5" />
                        Ver mais fotos
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black/95 border-none">
                      <DialogHeader className="p-6 bg-white/10 backdrop-blur-md absolute top-0 w-full z-10">
                        <DialogTitle className="text-white text-2xl font-bold flex items-center gap-3">
                          <Truck className="h-6 w-6 text-primary" />
                          Galeria: Caminhão {truck.name}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="flex items-center justify-center min-h-[400px] md:min-h-[600px] pt-20">
                        <Carousel className="w-full">
                          <CarouselContent>
                            {truck.images.map((img, index) => (
                              <CarouselItem key={index} className="flex items-center justify-center p-4">
                                <div className="relative w-full aspect-[4/3] md:aspect-video rounded-xl overflow-hidden">
                                  <Image
                                    src={img}
                                    alt={`${truck.name} foto ${index + 1}`}
                                    fill
                                    className="object-contain"
                                  />
                                </div>
                              </CarouselItem>
                            ))}
                          </CarouselContent>
                          <div className="hidden md:block">
                            <CarouselPrevious className="left-8 bg-white/20 text-white border-none hover:bg-white/40" />
                            <CarouselNext className="right-8 bg-white/20 text-white border-none hover:bg-white/40" />
                          </div>
                        </Carousel>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Button asChild className="w-full h-12 bg-secondary text-white font-bold hover:bg-secondary/90 shadow-lg shadow-secondary/20">
                    <Link href={`/agendar?caminhao=${truck.id}`}>
                      Solicitar este caminhão
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bloco de Orientação */}
        <div className="mt-16 max-w-4xl mx-auto rounded-3xl bg-white p-8 md:p-12 shadow-2xl border-4 border-primary/20 flex flex-col md:flex-row items-center gap-8">
          <div className="h-20 w-20 shrink-0 rounded-full bg-primary/20 flex items-center justify-center">
            <HelpCircle className="h-10 w-10 text-secondary" />
          </div>
          <div className="flex-1 text-center md:text-left space-y-4">
            <h3 className="text-2xl font-bold text-secondary">Não sabe qual caminhão escolher?</h3>
            <p className="text-muted-foreground">
              Sem problema. Durante o orçamento, a Leco Fretes analisa os itens, o local de retirada, o local de entrega e a necessidade de ajudante para indicar a melhor opção para o seu frete.
            </p>
          </div>
          <Button asChild className="h-14 px-8 rounded-full bg-secondary text-white font-extrabold text-lg hover:scale-105 transition-all">
            <Link href="/agendar">
              Descobrir melhor opção
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
