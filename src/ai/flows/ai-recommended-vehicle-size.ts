'use server';
/**
 * @fileOverview An AI agent that recommends a truck size based on item descriptions.
 *
 * - recommendVehicleSize - A function that handles the vehicle size recommendation process.
 * - AIRecommendedVehicleSizeInput - The input type for the recommendVehicleSize function.
 * - AIRecommendedVehicleSizeOutput - The return type for the recommendVehicleSize function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIRecommendedVehicleSizeInputSchema = z.object({
  itemDescription: z
    .string()
    .describe('A detailed description of the items to be transported.'),
});
export type AIRecommendedVehicleSizeInput = z.infer<
  typeof AIRecommendedVehicleSizeInputSchema
>;

const AIRecommendedVehicleSizeOutputSchema = z.object({
  recommendedSize: z
    .enum(['Pequeno', 'Médio', 'Grande'])
    .describe(
      'The recommended truck size (Pequeno, Médio, Grande) for the described items.'
    ),
  reasoning: z
    .string()
    .describe('The explanation for the recommended truck size.'),
});
export type AIRecommendedVehicleSizeOutput = z.infer<
  typeof AIRecommendedVehicleSizeOutputSchema
>;

export async function recommendVehicleSize(
  input: AIRecommendedVehicleSizeInput
): Promise<AIRecommendedVehicleSizeOutput> {
  return aiRecommendedVehicleSizeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiRecommendedVehicleSizePrompt',
  input: {schema: AIRecommendedVehicleSizeInputSchema},
  output: {schema: AIRecommendedVehicleSizeOutputSchema},
  prompt: `Você é um assistente de logística de Leco Fretes.
Sua tarefa é analisar a descrição dos itens que o cliente precisa transportar e recomendar o tamanho de caminhão mais adequado, fornecendo também uma breve justificativa.

Considere as seguintes categorias de tamanho:
- **Pequeno**: Ideal para poucos móveis, eletrodomésticos, caixas, compras grandes ou itens avulsos. Exemplos: geladeira, fogão, máquina de lavar, sofá de 2 lugares, até 10 caixas médias.
- **Médio**: Indicado para mudanças residenciais de pequeno porte, transporte de vários móveis e volumes maiores. Exemplos: mudança de apartamento de 1 ou 2 quartos, sofá de 3 lugares, cama de casal, guarda-roupa pequeno, cerca de 20-30 caixas médias.
- **Grande**: Para mudanças residenciais completas, transporte de muitos móveis e grandes volumes. Exemplos: mudança de casa ou apartamento maior, múltiplos eletrodomésticos, conjuntos de sofá, armários grandes, mais de 40 caixas.

Descrição dos itens para transporte: {{{itemDescription}}}

Recomende o tamanho do caminhão e justifique sua escolha.`,
});

const aiRecommendedVehicleSizeFlow = ai.defineFlow(
  {
    name: 'aiRecommendedVehicleSizeFlow',
    inputSchema: AIRecommendedVehicleSizeInputSchema,
    outputSchema: AIRecommendedVehicleSizeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('Failed to get a recommendation from the AI model.');
    }
    return output;
  }
);
