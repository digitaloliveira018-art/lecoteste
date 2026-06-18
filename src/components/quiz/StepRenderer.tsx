
"use client"

import { FormData } from './BookingQuiz';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Box, Info, Loader2, ChevronRight, MapPin, Building2, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

type StepProps = {
  step: number;
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  aiRecommendation: { size: string, reason: string } | null;
  isAiLoading: boolean;
};

export function StepRenderer({ step, formData, updateFormData, onNext, aiRecommendation, isAiLoading }: StepProps) {
  const isStepValid = () => {
    switch (step) {
      case 1: return !!formData.serviceType && (formData.serviceType === "Prefiro explicar direto com o atendente" || !!formData.items);
      case 2: return !!formData.pickupAddress && !!formData.pickupBairro && !!formData.pickupCity && !!formData.pickupAccess && (formData.pickupAccess !== "3" || !!formData.pickupStairs) && (formData.pickupAccess !== "4" || !!formData.pickupCustomAccess);
      case 3: return !!formData.deliveryAddress && !!formData.deliveryBairro && !!formData.deliveryCity && !!formData.deliveryAccess && (formData.deliveryAccess !== "3" || !!formData.deliveryStairs) && (formData.deliveryAccess !== "4" || !!formData.deliveryCustomAccess);
      case 4: return !!formData.helpers;
      case 5: return !!formData.date && !!formData.time;
      case 6: return !!formData.name;
      default: return true;
    }
  };

  const getOptionClasses = (isSelected: boolean, hasSelection: boolean) => {
    return cn(
      "relative flex flex-col rounded-2xl border-2 p-5 cursor-pointer transition-all duration-300 overflow-hidden",
      isSelected 
        ? "border-secondary bg-primary/10 text-secondary ring-4 ring-secondary/5 shadow-lg z-10 scale-[1.02]" 
        : hasSelection 
          ? "opacity-40 grayscale-[0.5] border-muted text-muted-foreground scale-[0.98]" 
          : "border-muted hover:border-secondary/30 bg-white"
    );
  };

  switch (step) {
    case 1:
      return (
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-secondary">Qual tipo de frete você precisa?</h2>
            <p className="text-muted-foreground">Escolha a opção que melhor descreve sua necessidade.</p>
          </div>
          
          <div className="grid gap-4">
            {[
              { label: "Mudança residencial", id: "Mudança residencial" },
              { label: "Frete de poucos itens", id: "Frete de poucos itens" },
              { label: "Prefiro explicar direto com o atendente", id: "Prefiro explicar direto com o atendente" }
            ].map((option) => {
              const isSelected = formData.serviceType === option.id;
              const hasSelection = !!formData.serviceType;
              
              return (
                <div key={option.id} className="space-y-4">
                  <Label 
                    className={getOptionClasses(isSelected, hasSelection)}
                    onClick={() => updateFormData({ serviceType: option.id })}
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-colors",
                        isSelected ? "bg-secondary text-white" : "bg-muted text-muted-foreground"
                      )}>
                        <Box className="h-6 w-6" />
                      </div>
                      <span className="text-lg font-bold">{option.label}</span>
                      {isSelected && <ChevronRight className="ml-auto h-5 w-5 animate-pulse" />}
                    </div>

                    <AnimatePresence>
                      {isSelected && (option.id === "Mudança residencial" || option.id === "Frete de poucos itens") && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="mt-6 pt-6 border-t border-secondary/20"
                        >
                          <Label className="text-sm font-bold uppercase tracking-wider opacity-70 mb-3 block">
                            Quais itens você precisa transportar?
                          </Label>
                          <Textarea
                            placeholder="Ex: geladeira, fogão, sofá, cama, caixas, guarda-roupa..."
                            value={formData.items}
                            onChange={(e) => updateFormData({ items: e.target.value })}
                            className="min-h-[120px] rounded-xl text-lg bg-white/50 focus:bg-white"
                            onClick={(e) => e.stopPropagation()}
                          />
                          <p className="mt-2 text-xs opacity-70 flex items-center gap-2">
                            <Info className="h-4 w-4" />
                            Quanto mais detalhes, melhor será nossa recomendação.
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Label>
                </div>
              );
            })}
          </div>

          <Button disabled={!isStepValid()} onClick={onNext} className="w-full h-14 rounded-full text-lg font-bold bg-secondary">
            Continuar
          </Button>
        </div>
      );

    case 2:
    case 3:
      const isPickup = step === 2;
      const prefix = isPickup ? 'pickup' : 'delivery';
      
      return (
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-secondary">
              {isPickup ? "Onde será feita a retirada?" : "Onde será feita a entrega?"}
            </h2>
            <p className="text-muted-foreground">Informe os dados do local de {isPickup ? "origem" : "destino"}.</p>
          </div>
          
          <div className="grid gap-4 p-4 rounded-2xl bg-muted/20 border">
             <div className="space-y-2">
                <Label className="flex items-center gap-2 text-secondary"><MapPin className="h-4 w-4" /> Endereço completo</Label>
                <Input 
                  placeholder="Rua, número..." 
                  value={formData[`${prefix}Address` as keyof FormData]} 
                  onChange={(e) => updateFormData({ [`${prefix}Address`]: e.target.value })} 
                  className="h-12 bg-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Bairro</Label>
                  <Input 
                    value={formData[`${prefix}Bairro` as keyof FormData]} 
                    onChange={(e) => updateFormData({ [`${prefix}Bairro`]: e.target.value })} 
                    className="h-12 bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Cidade</Label>
                  <Input 
                    value={formData[`${prefix}City` as keyof FormData]} 
                    onChange={(e) => updateFormData({ [`${prefix}City`]: e.target.value })} 
                    className="h-12 bg-white"
                  />
                </div>
              </div>
          </div>

          <div className="space-y-4 pt-6">
            <Label className="text-lg font-bold text-secondary flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Como é o local de {isPickup ? "retirada" : "entrega"}?
            </Label>
            
            <div className="grid gap-3">
              {[
                { id: "1", label: "Local plano / térreo" },
                { id: "2", label: "Tem elevador" },
                { id: "3", label: "Tem escadas" },
                { id: "4", label: "Prefiro descrever melhor" }
              ].map((opt) => {
                const isSelected = formData[`${prefix}Access` as keyof FormData] === opt.id;
                const hasSelection = !!formData[`${prefix}Access` as keyof FormData];
                
                return (
                  <div key={opt.id} className="space-y-3">
                    <Label 
                      className={getOptionClasses(isSelected, hasSelection)}
                      onClick={() => updateFormData({ [`${prefix}Access`]: opt.id })}
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "h-5 w-5 rounded-full border-2 flex items-center justify-center transition-colors",
                          isSelected ? "border-secondary bg-secondary" : "border-muted"
                        )}>
                          {isSelected && <div className="h-2 w-2 rounded-full bg-white" />}
                        </div>
                        <span className="font-bold">{opt.label}</span>
                      </div>

                      <AnimatePresence>
                        {isSelected && opt.id === "3" && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="mt-4 pt-4 border-t border-secondary/20"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Label className="text-sm font-bold opacity-70 mb-3 block">
                              Quantos vãos de escada existem na {isPickup ? "retirada" : "entrega"}?
                            </Label>
                            <RadioGroup 
                              value={formData[`${prefix}Stairs` as keyof FormData]}
                              onValueChange={(v) => updateFormData({ [`${prefix}Stairs`]: v })}
                              className="grid grid-cols-2 sm:grid-cols-3 gap-2"
                            >
                              {["1 vão", "2 vãos", "3 vãos", "4 ou mais", "Não sei informar"].map((v) => (
                                <Label key={v} className={cn(
                                  "flex items-center justify-center p-3 rounded-lg border cursor-pointer text-xs font-bold transition-all",
                                  formData[`${prefix}Stairs` as keyof FormData] === v ? "bg-secondary text-white border-secondary" : "bg-white hover:border-secondary/30"
                                )}>
                                  <RadioGroupItem value={v} className="sr-only" />
                                  {v}
                                </Label>
                              ))}
                            </RadioGroup>
                          </motion.div>
                        )}

                        {isSelected && opt.id === "4" && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="mt-4 pt-4 border-t border-secondary/20"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Label className="text-sm font-bold opacity-70 mb-3 block">
                              Descreva como é o acesso no local de {isPickup ? "retirada" : "entrega"}...
                            </Label>
                            <Textarea 
                              placeholder="Ex: Portão estreito, rampa muito inclinada, etc..." 
                              value={formData[`${prefix}CustomAccess` as keyof FormData]} 
                              onChange={(e) => updateFormData({ [`${prefix}CustomAccess`]: e.target.value })}
                              className="bg-white/50 focus:bg-white"
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Label>
                  </div>
                );
              })}
            </div>
          </div>

          <Button disabled={!isStepValid()} onClick={onNext} className="w-full h-14 rounded-full text-lg font-bold bg-secondary">
            Continuar
          </Button>
        </div>
      );

    case 4:
      return (
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-secondary">Vai precisar de ajudante?</h2>
            <p className="text-muted-foreground">Escolha se precisará de mão de obra para carregar os itens.</p>
          </div>
          <div className="grid gap-4">
            {[
              "Sim, preciso de ajudante",
              "Não, já terei pessoas para ajudar",
              "Ainda não sei",
              "Quero conversar sobre isso com o atendente"
            ].map((option) => {
              const isSelected = formData.helpers === option;
              const hasSelection = !!formData.helpers;
              
              return (
                <Label
                  key={option}
                  className={getOptionClasses(isSelected, hasSelection)}
                  onClick={() => updateFormData({ helpers: option })}
                >
                  <span className="text-lg font-bold">{option}</span>
                </Label>
              );
            })}
          </div>
          <Button disabled={!isStepValid()} onClick={onNext} className="w-full h-14 rounded-full text-lg font-bold bg-secondary">
            Continuar
          </Button>
        </div>
      );

    case 5:
      return (
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-secondary">Para qual dia você deseja o frete?</h2>
            <p className="text-muted-foreground">Escolha a melhor data e período.</p>
          </div>
          <div className="grid gap-6">
            <div className="space-y-2">
              <Label className="text-secondary font-bold">Data desejada</Label>
              <Input 
                type="date" 
                value={formData.date} 
                onChange={(e) => updateFormData({ date: e.target.value })} 
                className="h-14 text-lg border-2 focus:border-secondary"
              />
            </div>
            <div className="space-y-4">
              <Label className="text-lg font-bold text-secondary">Horário preferido</Label>
              <div className="grid grid-cols-2 gap-3">
                {["Pela manhã", "À tarde", "À noite", "Horário flexível"].map((t) => {
                  const isSelected = formData.time === t;
                  const hasSelection = !!formData.time;
                  
                  return (
                    <Label 
                      key={t} 
                      className={cn(
                        "flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer text-center font-bold transition-all duration-300",
                        isSelected 
                          ? "border-secondary bg-primary/10 text-secondary" 
                          : hasSelection 
                            ? "opacity-40 border-muted text-muted-foreground" 
                            : "border-muted hover:border-secondary/30"
                      )}
                      onClick={() => updateFormData({ time: t })}
                    >
                      {t}
                    </Label>
                  );
                })}
              </div>
            </div>
          </div>
          <Button disabled={!isStepValid()} onClick={onNext} className="w-full h-14 rounded-full text-lg font-bold bg-secondary">
            Continuar
          </Button>
        </div>
      );

    case 6:
      return (
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 text-secondary mb-4">
               <User className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-bold text-secondary">Para finalizar, informe seu nome</h2>
            <p className="text-muted-foreground">Como podemos te chamar?</p>
          </div>
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label className="text-secondary font-bold">Seu Nome Completo</Label>
              <Input 
                placeholder="Ex: João da Silva" 
                value={formData.name} 
                onChange={(e) => updateFormData({ name: e.target.value })} 
                className="h-14 text-lg border-2 focus:border-secondary"
              />
            </div>
          </div>

          {isAiLoading && (
            <div className="rounded-2xl bg-secondary/5 p-6 flex flex-col items-center gap-4 animate-pulse border-2 border-dashed border-secondary/20">
              <Loader2 className="h-10 w-10 text-secondary animate-spin" />
              <div className="text-center">
                <p className="text-lg font-bold text-secondary">Análise inteligente Leco AI</p>
                <p className="text-sm text-secondary/60">Estamos processando os detalhes do seu frete para recomendar o melhor veículo...</p>
              </div>
            </div>
          )}

          <Button disabled={!isStepValid() || isAiLoading} onClick={onNext} className="w-full h-16 rounded-full text-xl font-bold bg-secondary shadow-lg hover:shadow-secondary/20 transition-all">
            Ver Resumo e Enviar
          </Button>
        </div>
      );

    default:
      return null;
  }
}
