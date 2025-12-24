import { z } from 'zod';
import { publicProcedure, router } from '../_core/trpc';
import { supabase, News } from '../supabase';

export const newsRouter = router({
  getAll: publicProcedure
    .input(
      z.object({
        category: z.enum(['produtividade', 'biohacking', 'ia', 'saude']).optional(),
        limit: z.number().min(1).max(50).default(20),
        offset: z.number().min(0).default(0),
      })
    )
    .query(async ({ input }) => {
      let query = supabase
        .from('news')
        .select('*', { count: 'exact' })
        .eq('is_published', true)
        .order('published_at', { ascending: false })
        .range(input.offset, input.offset + input.limit - 1);

      if (input.category) {
        query = query.eq('category', input.category);
      }

      const { data, error, count } = await query;

      if (error) {
        console.error('Erro ao buscar notícias:', error);
        return { news: [], total: 0 };
      }

      return {
        news: data as News[],
        total: count || 0,
      };
    }),

  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('slug', input.slug)
        .eq('is_published', true)
        .single();

      if (error || !data) {
        return null;
      }

      // Incrementar views
      await supabase
        .from('news')
        .update({ views: (data.views || 0) + 1 })
        .eq('id', data.id);

      return data as News;
    }),
});
