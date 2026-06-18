import Link from 'next/link';
import { Truck, Package, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function ServiceCards() {
  const services = [
    {
      title: "Caminhão para pequenos fretes",
      text: "Ideal para transporte de poucos móveis, eletrodomésticos, caixas, compras grandes ou itens avulsos.",
      icon: Package,
    },
    {
      title: "Caminhão para mudanças",
      text: "Indicado para mudanças residenciais, transporte de vários móveis e volumes maiores.",
      icon: Truck,
    },
    {
      title: "Fretes para viagens",
      text: "Opção para quem precisa transportar itens para outras cidades ou regiões com segurança.",
      icon: Globe,
    }
  ];

  return (
    <section className="bg-muted/30 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-secondary sm:text-4xl">
            Estrutura para diferentes tipos de frete
          </h2>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {services.map((s) => (
            <Card key={s.title} className="flex flex-col h-full bg-white border-blue-100/50 shadow-sm">
              <CardHeader className="flex-1">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-secondary/10">
                  <s.icon className="h-8 w-8 text-secondary" />
                </div>
                <CardTitle className="text-xl text-secondary font-bold leading-snug">{s.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-sm text-muted-foreground">{s.text}</p>
                <Button asChild variant="outline" className="w-full border-secondary text-secondary hover:bg-secondary hover:text-white">
                  <Link href="/agendar">Solicitar orçamento</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
