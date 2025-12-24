import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types para as tabelas
export interface Newsletter {
  id: string;
  email: string;
  source: string | null;
  created_at: string;
  confirmed: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  category: 'produtividade' | 'biohacking' | 'ia';
  tags: string[] | null;
  featured_image: string | null;
  author_id: string | null;
  published_at: string;
  updated_at: string;
  views: number;
  is_published: boolean;
}

export interface News {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string | null;
  category: 'produtividade' | 'biohacking' | 'ia' | 'saude';
  source_name: string | null;
  source_url: string | null;
  featured_image: string | null;
  published_at: string;
  views: number;
  is_published: boolean;
}
