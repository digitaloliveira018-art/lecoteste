
"use client"

import { FormData } from './BookingQuiz';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Box, Info, Loader2 } from 'lucide-react';

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
      case 1: return !!formData.serviceType;
      case 2: return !!formData.pickupAddress && !!formData.pickupBairro && !!formData.pickupCity && !!formData.pickupAccess && (formData.pickupAccess !== "3" || !!formData.pickupStairs);
      case 3: return !!formData.deliveryAddress && !!formData.deliveryBairro && !!formData.deliveryCity && !!formData.deliveryAccess && (formData.deliveryAccess !== "3" || !!formData.deliveryStairs);
      case 4: return !!formData.helpers;
      case 5: return !!formData.date && !!formData.time;
      case 6: return !!formData.name;
      default: return true;
    }
  };

  switch (step) {
    case 1:
      return (
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-secondary">Qual tipo de frete você precisa?</h2>
            <p className="text-muted-foreground">Escolha a opção que melhor descreve sua necessidade.</p>
          </div>
          <RadioGroup 
            value={formData.serviceType} 
            onValueChange={(v) => updateFormData({ serviceType: v })}
            className="grid gap-4"
          >
            {[
              "Mudança residencial",
              "Frete de poucos itens",
              "Prefiro explicar direto com o atendente"
            ].map((option) => (
              <Label
                key={option}
                className={`flex items-center gap-4 rounded-2xl border-2 p-5 cursor-pointer transition-all ${
                  formData.serviceType === option ? 'border-primary bg-primary/5' : 'border-muted hover:border-primary/50'
                }`}
              >
                <RadioGroupItem value={option} className="sr-only" />
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/20 text-secondary">
                  <Box className="h-5 w-5" />
                </div>
                <span className="text-lg font-bold text-secondary">{option}</span>
              </Label>
            ))}
          </RadioGroup>

          {(formData.serviceType === "Frete de poucos itens" || formData.serviceType === "Mudança residencial") && (
            <div className="mt-6 space-y-4 pt-6 border-t">
              <Label className="text-lg font-bold text-secondary">Quais itens você precisa transportar?</Label>
              <Textarea
                placeholder="Ex: geladeira, fogão, sofá, cama, caixas, guarda-roupa..."
                value={formData.items}
                onChange={(e) => updateFormData({ items: e.target.value })}
                className="min-h-[120px] rounded-xl text-lg"
              />
              <p className="text-xs text-muted-foreground flex items-center gap-2">
                <Info className="h-4 w-4" />
                Quanto mais detalhes, melhor será nossa recomendação.
              </p>
            </div>
          )}

          <Button disabled={!isStepValid()} onClick={onNext} className="w-full h-14 rounded-full text-lg font-bold bg-secondary">
            Continuar
          </Button>
        </div>
      );

    case 2:
      return (
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-secondary">Onde será feita a retirada?</h2>
            <p className="text-muted-foreground">Informe os dados do local de origem.</p>
          </div>
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label>Endereço de retirada</Label>
              <Input 
                placeholder="Rua, número..." 
                value={formData.pickupAddress} 
                onChange={(e) => updateFormData({ pickupAddress: e.target.value })} 
                className="h-12"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Bairro</Label>
                <Input 
                  value={formData.pickupBairro} 
                  onChange={(e) => updateFormData({ pickupBairro: e.target.value })} 
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label>Cidade</Label>
                <Input 
                  value={formData.pickupCity} 
                  onChange={(e) => updateFormData({ pickupCity: e.target.value })} 
                  className="h-12"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-6 border-t">
            <Label className="text-lg font-bold text-secondary">Como é o local de retirada?</Label>
            <RadioGroup 
              value={formData.pickupAccess} 
              onValueChange={(v) => updateFormData({ pickupAccess: v })}
              className="grid gap-3"
            >
              {[
                { id: "1", label: "Local plano / térreo" },
                { id: "2", label: "Tem elevador" },
                { id: "3", label: "Tem escadas" },
                { id: "4", label: "Prefiro descrever melhor" }
              ].map((opt) => (
                <Label key={opt.id} className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer ${formData.pickupAccess === opt.id ? 'border-primary bg-primary/5' : ''}`}>
                  <RadioGroupItem value={opt.id} />
                  <span className="font-semibold text-secondary">{opt.label}</span>
                </Label>
              ))}
            </RadioGroup>

            {formData.pickupAccess === "3" && (
              <div className="space-y-2 pl-6">
                <Label>Quantos vãos de escada? (Ex: 2 vãos, 3 andares...)</Label>
                <Input 
                  placeholder="Escreva a quantidade..." 
                  value={formData.pickupStairs} 
                  onChange={(e) => updateFormData({ pickupStairs: e.target.value })}
                  className="h-12"
                />
              </div>
            )}

            {formData.pickupAccess === "4" && (
              <Textarea 
                placeholder="Descreva como é o acesso..." 
                value={formData.pickupCustomAccess} 
                onChange={(e) => updateFormData({ pickupCustomAccess: e.target.value })}
              />
            )}
          </div>

          <Button disabled={!isStepValid()} onClick={onNext} className="w-full h-14 rounded-full text-lg font-bold bg-secondary">
            Continuar
          </Button>
        </div>
      );

    case 3:
      return (
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-secondary">Onde será feita a entrega?</h2>
            <p className="text-muted-foreground">Informe os dados do local de destino.</p>
          </div>
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label>Endereço de entrega</Label>
              <Input 
                placeholder="Rua, número..." 
                value={formData.deliveryAddress} 
                onChange={(e) => updateFormData({ deliveryAddress: e.target.value })} 
                className="h-12"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Bairro</Label>
                <Input 
                  value={formData.deliveryBairro} 
                  onChange={(e) => updateFormData({ deliveryBairro: e.target.value })} 
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label>Cidade</Label>
                <Input 
                  value={formData.deliveryCity} 
                  onChange={(e) => updateFormData({ deliveryCity: e.target.value })} 
                  className="h-12"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-6 border-t">
            <Label className="text-lg font-bold text-secondary">Como é o local de entrega?</Label>
            <RadioGroup 
              value={formData.deliveryAccess} 
              onValueChange={(v) => updateFormData({ deliveryAccess: v })}
              className="grid gap-3"
            >
              {[
                { id: "1", label: "Local plano / térreo" },
                { id: "2", label: "Tem elevador" },
                { id: "3", label: "Tem escadas" },
                { id: "4", label: "Prefiro descrever melhor" }
              ].map((opt) => (
                <Label key={opt.id} className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer ${formData.deliveryAccess === opt.id ? 'border-primary bg-primary/5' : ''}`}>
                  <RadioGroupItem value={opt.id} />
                  <span className="font-semibold text-secondary">{opt.label}</span>
                </Label>
              ))}
            </RadioGroup>

            {formData.deliveryAccess === "3" && (
              <div className="space-y-2 pl-6">
                <Label>Quantos vãos de escada? (Ex: 2 vãos, 3 andares...)</Label>
                <Input 
                  placeholder="Escreva a quantidade..." 
                  value={formData.deliveryStairs} 
                  onChange={(e) => updateFormData({ deliveryStairs: e.target.value })}
                  className="h-12"
                />
              </div>
            )}

            {formData.deliveryAccess === "4" && (
              <Textarea 
                placeholder="Descreva como é o acesso..." 
                value={formData.deliveryCustomAccess} 
                onChange={(e) => updateFormData({ deliveryCustomAccess: e.target.value })}
              />
            )}
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
          <RadioGroup 
            value={formData.helpers} 
            onValueChange={(v) => updateFormData({ helpers: v })}
            className="grid gap-4"
          >
            {[
              "Sim, preciso de ajudante",
              "Não, já terei pessoas para ajudar",
              "Ainda não sei",
              "Quero conversar sobre isso com o atendente"
            ].map((option) => (
              <Label
                key={option}
                className={`flex items-center gap-4 rounded-2xl border-2 p-5 cursor-pointer transition-all ${
                  formData.helpers === option ? 'border-primary bg-primary/5' : 'border-muted hover:border-primary/50'
                }`}
              >
                <RadioGroupItem value={option} className="sr-only" />
                <span className="text-lg font-bold text-secondary">{option}</span>
              </Label>
            ))}
          </RadioGroup>
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
              <Label>Data desejada</Label>
              <Input 
                type="date" 
                value={formData.date} 
                onChange={(e) => updateFormData({ date: e.target.value })} 
                className="h-12 text-lg"
              />
            </div>
            <div className="space-y-4">
              <Label className="text-lg font-bold text-secondary">Horário preferido</Label>
              <RadioGroup 
                value={formData.time} 
                onValueChange={(v) => updateFormData({ time: v })}
                className="grid grid-cols-2 gap-3"
              >
                {["Pela manhã", "À tarde", "À noite", "Horário flexível"].map((t) => (
                  <Label key={t} className={`flex items-center justify-center gap-2 p-4 rounded-xl border cursor-pointer text-center ${formData.time === t ? 'border-primary bg-primary/5' : ''}`}>
                    <RadioGroupItem value={t} className="sr-only" />
                    <span className="font-semibold text-secondary">{t}</span>
                  </Label>
                ))}
              </RadioGroup>
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
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-secondary">Para finalizar, informe seu nome</h2>
            <p className="text-muted-foreground">Como podemos te chamar?</p>
          </div>
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label>Seu Nome Completo</Label>
              <Input 
                placeholder="Ex: João da Silva" 
                value={formData.name} 
                onChange={(e) => updateFormData({ name: e.target.value })} 
                className="h-14 text-lg"
              />
            </div>
          </div>

          {isAiLoading && (
            <div className="rounded-xl bg-blue-50 p-4 flex items-center gap-3 animate-pulse border border-blue-100">
              <Loader2 className="h-5 w-5 text-secondary animate-spin" />
              <p className="text-sm font-medium text-secondary">Nossa Inteligência Artificial está analisando seu frete...</p>
            </div>
          )}

          <Button disabled={!isStepValid()} onClick={onNext} className="w-full h-14 rounded-full text-lg font-bold bg-secondary">
            Ver Resumo e Enviar
          </Button>
        </div>
      );

    default:
      return null;
  }
}
