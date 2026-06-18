import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function Testimonials() {
  const testimonials = [
    {
      name: "Mariana S.",
      text: "Precisei fazer uma pequena mudança e fui muito bem atendida. Chegaram no horário e cuidaram bem dos móveis.",
    },
    {
      name: "Carlos R.",
      text: "Contratei para levar alguns eletrodomésticos e deu tudo certo. Atendimento rápido e preço justo.",
    },
    {
      name: "Fernanda A.",
      text: "Gostei muito da organização. Expliquei o que precisava pelo WhatsApp e já recebi o orçamento certinho.",
    },
    {
      name: "João P.",
      text: "Fiz um frete para outra cidade e o serviço foi excelente. Recomendo.",
    }
  ];

  return (
    <section className="bg-muted/20 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-secondary sm:text-4xl">Quem já contratou recomenda</h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <Card key={i} className="border-none shadow-sm bg-white">
              <CardContent className="pt-6 space-y-4">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed italic">
                  &quot;{t.text}&quot;
                </p>
                <div className="pt-2 border-t">
                  <span className="text-sm font-bold text-secondary">{t.name}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
