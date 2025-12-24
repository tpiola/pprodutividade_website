import { z } from 'zod';
import { publicProcedure, router } from '../_core/trpc';
import { supabase } from '../supabase';

export const newsletterRouter = router({
  subscribe: publicProcedure
    .input(
      z.object({
        email: z.string().email('Email inválido'),
        source: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { email, source = 'unknown' } = input;

      // Verificar se o email já existe
      const { data: existing } = await supabase
        .from('newsletter')
        .select('id')
        .eq('email', email)
        .single();

      if (existing) {
        return {
          success: false,
          message: 'Este email já está cadastrado!',
        };
      }

      // Inserir novo email
      const { error } = await supabase
        .from('newsletter')
        .insert({ email, source });

      if (error) {
        console.error('Erro ao cadastrar email:', error);
        return {
          success: false,
          message: 'Erro ao cadastrar. Tente novamente.',
        };
      }

      return {
        success: true,
        message: 'Email cadastrado com sucesso! Verifique sua caixa de entrada.',
      };
    }),

  count: publicProcedure.query(async () => {
    const { count, error } = await supabase
      .from('newsletter')
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.error('Erro ao contar emails:', error);
      return 0;
    }

    return count || 0;
  }),
});
