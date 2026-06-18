
"use client"

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Send, CheckCircle2, Loader2, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { StepRenderer } from './StepRenderer';
import { WHATSAPP_NUMBER } from '@/app/lib/constants';
import { recommendVehicleSize } from '@/ai/flows/ai-recommended-vehicle-size';

export type FormData = {
  serviceType: string;
  items: string;
  pickupAddress: string;
  pickupBairro: string;
  pickupCity: string;
  pickupAccess: string;
  pickupStairs: string;
  pickupCustomAccess: string;
  deliveryAddress: string;
  deliveryBairro: string;
  deliveryCity: string;
  deliveryAccess: string;
  deliveryStairs: string;
  deliveryCustomAccess: string;
  helpers: string;
  date: string;
  time: string;
  name: string;
  preferredTruck?: string;
};

const INITIAL_DATA: FormData = {
  serviceType: '',
  items: '',
  pickupAddress: '',
  pickupBairro: '',
  pickupCity: '',
  pickupAccess: '',
  pickupStairs: '',
  pickupCustomAccess: '',
  deliveryAddress: '',
  deliveryBairro: '',
  deliveryCity: '',
  deliveryAccess: '',
  deliveryStairs: '',
  deliveryCustomAccess: '',
  helpers: '',
  date: '',
  time: '',
  name: '',
};

const TOTAL_STEPS = 7;

export function BookingQuiz() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(INITIAL_DATA);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiRecommendation, setAiRecommendation] = useState<{ size: string, reason: string } | null>(null);
  
  const searchParams = useSearchParams();

  useEffect(() => {
    const caminhao = searchParams.get('caminhao');
    if (caminhao) {
      setFormData(prev => ({ ...prev, preferredTruck: caminhao }));
    }
  }, [searchParams]);

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleNext = async () => {
    if (step === 1 && formData.items.length > 10) {
      setIsAiLoading(true);
      try {
        const res = await recommendVehicleSize({ itemDescription: formData.items });
        setAiRecommendation({ size: res.recommendedSize, reason: res.reasoning });
      } catch (e) {
        console.error("AI recommendation failed", e);
      } finally {
        setIsAiLoading(false);
      }
    }
    setStep((s) => s + 1);
  };

  const handleBack = () => setStep((s) => s - 1);

  const progressValue = (step / TOTAL_STEPS) * 100;

  const generateMessage = () => {
    const truckChoice = formData.preferredTruck 
      ? `\n🚛 Caminhão de interesse: ${formData.preferredTruck.toUpperCase()}\n`
      : "";

    const aiPart = aiRecommendation 
      ? `\n🤖 Recomendação Leco AI:\nVeículo: ${aiRecommendation.size}\nMotivo: ${aiRecommendation.reason}\n`
      : "";

    const message = `Olá, Leco Fretes! Gostaria de solicitar um orçamento.
${truckChoice}
📦 Tipo de serviço:
${formData.serviceType}

📝 Itens para transportar:
${formData.items || "Preferência de explicar com atendente"}${aiPart}

📍 Local de retirada:
Endereço: ${formData.pickupAddress}
Bairro: ${formData.pickupBairro}
Cidade: ${formData.pickupCity}
Acesso: ${formData.pickupAccess === "4" ? formData.pickupCustomAccess : formData.pickupAccess}
${formData.pickupAccess === "3" ? `Vãos de escada na retirada: ${formData.pickupStairs}` : ""}

📍 Local de entrega:
Endereço: ${formData.deliveryAddress}
Bairro: ${formData.deliveryBairro}
Cidade: ${formData.deliveryCity}
Acesso: ${formData.deliveryAccess === "4" ? formData.deliveryCustomAccess : formData.deliveryAccess}
${formData.deliveryAccess === "3" ? `Vãos de escada na entrega: ${formData.deliveryStairs}` : ""}

👥 Ajudante:
${formData.helpers}

📅 Data desejada:
${formData.date}

🕒 Horário preferido:
${formData.time}

👤 Nome:
${formData.name}

Aguardo o retorno com o orçamento. Obrigado!`;

    return message;
  };

  const handleSendWhatsApp = () => {
    const message = generateMessage();
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="rounded-3xl bg-white p-6 shadow-2xl md:p-10">
      <div className="mb-8 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-secondary uppercase tracking-widest">
            {step < TOTAL_STEPS ? `Etapa ${step} de ${TOTAL_STEPS - 1}` : 'Resumo Final'}
          </span>
          {step > 1 && step < TOTAL_STEPS && (
            <button
              onClick={handleBack}
              className="flex items-center gap-1 text-sm font-semibold text-secondary hover:underline"
            >
              <ChevronLeft className="h-4 w-4" />
              Voltar
            </button>
          )}
        </div>
        <Progress value={progressValue} className="h-2 bg-muted transition-all" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          <StepRenderer
            step={step}
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNext}
            aiRecommendation={aiRecommendation}
            isAiLoading={isAiLoading}
          />
        </motion.div>
      </AnimatePresence>

      {step === TOTAL_STEPS && (
        <div className="mt-8 space-y-6">
          <div className="rounded-2xl bg-muted/30 p-6 space-y-4 border">
            <h3 className="text-xl font-bold text-secondary flex items-center gap-2">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
              Tudo pronto! Confira seu resumo:
            </h3>
            
            <div className="grid gap-4 text-sm sm:grid-cols-2">
              <div className="space-y-1">
                <p className="font-bold text-secondary/60">Serviço</p>
                <p className="font-medium">{formData.serviceType}</p>
              </div>
              {formData.preferredTruck && (
                <div className="space-y-1">
                  <p className="font-bold text-secondary/60">Veículo Escolhido</p>
                  <p className="font-medium flex items-center gap-2 text-secondary">
                    <Truck className="h-4 w-4" />
                    {formData.preferredTruck === 'iveco' ? 'Caminhão Iveco' : 'Sprinter'}
                  </p>
                </div>
              )}
              <div className="space-y-1">
                <p className="font-bold text-secondary/60">Retirada</p>
                <p className="font-medium">{formData.pickupAddress}, {formData.pickupBairro} - {formData.pickupCity}</p>
              </div>
              <div className="space-y-1">
                <p className="font-bold text-secondary/60">Entrega</p>
                <p className="font-medium">{formData.deliveryAddress}, {formData.deliveryBairro} - {formData.deliveryCity}</p>
              </div>
              <div className="space-y-1">
                <p className="font-bold text-secondary/60">Data e Hora</p>
                <p className="font-medium">{formData.date} às {formData.time}</p>
              </div>
            </div>

            {aiRecommendation && (
              <div className="rounded-xl bg-primary/20 p-4 border border-primary/40 flex items-start gap-3 mt-4">
                 <CheckCircle2 className="h-5 w-5 text-secondary shrink-0 mt-1" />
                 <div>
                    <p className="text-sm font-bold text-secondary">Sugestão de Caminhão (Leco AI): {aiRecommendation.size}</p>
                    <p className="text-xs text-secondary/70 mt-0.5">{aiRecommendation.reason}</p>
                 </div>
              </div>
            )}
          </div>

          <Button
            onClick={handleSendWhatsApp}
            className="w-full h-16 rounded-full bg-secondary text-white text-lg font-bold hover:scale-105 transition-transform"
          >
            <Send className="mr-2 h-6 w-6" />
            Enviar orçamento no WhatsApp
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            Ao clicar, você será redirecionado para o WhatsApp com os dados preenchidos.
          </p>
        </div>
      )}
    </div>
  );
}
