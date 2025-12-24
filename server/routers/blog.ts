import { z } from 'zod';
import { publicProcedure, router } from '../_core/trpc';
import { supabase, BlogPost } from '../supabase';

export const blogRouter = router({
  getAll: publicProcedure
    .input(
      z.object({
        category: z.enum(['produtividade', 'biohacking', 'ia']).optional(),
        search: z.string().optional(),
        limit: z.number().min(1).max(100).default(12),
        offset: z.number().min(0).default(0),
      })
    )
    .query(async ({ input }) => {
      let query = supabase
        .from('blog_posts')
        .select('*', { count: 'exact' })
        .eq('is_published', true)
        .order('published_at', { ascending: false })
        .range(input.offset, input.offset + input.limit - 1);

      if (input.category) {
        query = query.eq('category', input.category);
      }

      if (input.search) {
        query = query.or(`title.ilike.%${input.search}%,excerpt.ilike.%${input.search}%`);
      }

      const { data, error, count } = await query;

      if (error) {
        console.error('Erro ao buscar posts:', error);
        return { posts: [], total: 0 };
      }

      return {
        posts: data as BlogPost[],
        total: count || 0,
      };
    }),

  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', input.slug)
        .eq('is_published', true)
        .single();

      if (error || !data) {
        return null;
      }

      // Incrementar views
      await supabase
        .from('blog_posts')
        .update({ views: (data.views || 0) + 1 })
        .eq('id', data.id);

      return data as BlogPost;
    }),

  getRelated: publicProcedure
    .input(
      z.object({
        currentSlug: z.string(),
        category: z.enum(['produtividade', 'biohacking', 'ia']),
        limit: z.number().min(1).max(6).default(3),
      })
    )
    .query(async ({ input }) => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('category', input.category)
        .eq('is_published', true)
        .neq('slug', input.currentSlug)
        .order('published_at', { ascending: false })
        .limit(input.limit);

      if (error) {
        console.error('Erro ao buscar posts relacionados:', error);
        return [];
      }

      return data as BlogPost[];
    }),
});
