-- Tabela de Newsletter
CREATE TABLE IF NOT EXISTS newsletter (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  source VARCHAR(100), -- 'home', 'blog', 'noticias', 'sobre'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  confirmed BOOLEAN DEFAULT FALSE
);

-- Índice para busca rápida por email
CREATE INDEX idx_newsletter_email ON newsletter(email);
CREATE INDEX idx_newsletter_created_at ON newsletter(created_at DESC);

-- Tabela de Posts do Blog
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  category VARCHAR(50) NOT NULL, -- 'produtividade', 'biohacking', 'ia'
  tags TEXT[], -- Array de tags
  featured_image VARCHAR(500),
  author_id UUID,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  views INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE
);

-- Índices para otimização de busca
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_category ON blog_posts(category);
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX idx_blog_posts_tags ON blog_posts USING GIN(tags);

-- Tabela de Notícias
CREATE TABLE IF NOT EXISTS news (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT,
  category VARCHAR(50) NOT NULL, -- 'produtividade', 'biohacking', 'ia', 'saude'
  source_name VARCHAR(100),
  source_url VARCHAR(500),
  featured_image VARCHAR(500),
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  views INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE
);

-- Índices para otimização de busca
CREATE INDEX idx_news_slug ON news(slug);
CREATE INDEX idx_news_category ON news(category);
CREATE INDEX idx_news_published_at ON news(published_at DESC);

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para blog_posts
CREATE TRIGGER update_blog_posts_updated_at
BEFORE UPDATE ON blog_posts
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Habilitar Row Level Security (RLS)
ALTER TABLE newsletter ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

-- Políticas de acesso (público pode ler, apenas autenticados podem escrever)
CREATE POLICY "Permitir leitura pública de posts publicados"
ON blog_posts FOR SELECT
USING (is_published = TRUE);

CREATE POLICY "Permitir leitura pública de notícias publicadas"
ON news FOR SELECT
USING (is_published = TRUE);

CREATE POLICY "Permitir inserção de newsletter"
ON newsletter FOR INSERT
WITH CHECK (TRUE);

-- Comentários para documentação
COMMENT ON TABLE newsletter IS 'Armazena emails capturados dos formulários de newsletter';
COMMENT ON TABLE blog_posts IS 'Armazena artigos do blog sobre Produtividade, Biohacking e IA';
COMMENT ON TABLE news IS 'Armazena notícias curadas sobre os temas principais';
