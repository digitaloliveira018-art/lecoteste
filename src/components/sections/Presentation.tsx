import { Zap, ShieldCheck, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function Presentation() {
  const values = [
    {
      title: "Agilidade no atendimento",
      text: "Respondemos rápido e entendemos sua necessidade antes de passar o orçamento.",
      icon: Zap,
    },
    {
      title: "Cuidado no transporte",
      text: "Seus itens são tratados com responsabilidade durante todo o trajeto.",
      icon: ShieldCheck,
    },
    {
      title: "Fretes locais e viagens",
      text: "Atendemos demandas dentro da cidade e também transportes para outras regiões.",
      icon: MapPin,
    }
  ];

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-secondary sm:text-4xl">Conheça a Leco Fretes</h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            A Leco Fretes nasceu para facilitar a vida de quem precisa transportar móveis, eletrodomésticos, caixas, mercadorias ou fazer pequenas mudanças com segurança e praticidade. Atendemos fretes locais e também viagens, sempre buscando oferecer um serviço organizado, pontual e transparente.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v) => (
            <Card key={v.title} className="border-none shadow-lg hover:shadow-xl transition-shadow bg-background/50">
              <CardHeader>
                <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 text-secondary">
                  <v.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl text-secondary">{v.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{v.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
