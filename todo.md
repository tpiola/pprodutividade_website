# Projeto Thiago Piola - TODO List

## FASE 1: Backend & Database
- [ ] Criar schema da tabela `newsletter` no Supabase (email, created_at, source)
- [ ] Criar schema da tabela `blog_posts` (title, slug, content, category, tags, published_at)
- [ ] Criar schema da tabela `news` (title, slug, excerpt, category, source_url, published_at)
- [ ] Implementar endpoint tRPC `newsletter.subscribe`
- [ ] Implementar endpoint tRPC `blog.getAll` com filtros
- [ ] Implementar endpoint tRPC `news.getAll` com filtros

## FASE 2: Páginas Blog e Notícias
- [ ] Criar página `/blog` com grid de posts
- [ ] Implementar filtros por categoria (Produtividade, Biohacking, IA)
- [ ] Implementar busca por texto
- [ ] Criar template de post individual `/blog/[slug]`
- [ ] Criar página `/noticias` com feed de notícias
- [ ] Implementar scroll infinito (lazy loading)
- [ ] Adicionar botão "Voltar ao topo" flutuante

## FASE 3: Redesign Visual
- [ ] Gerar novo logo ampliado (sem subtítulo)
- [ ] Atualizar Hero Section com efeito parallax
- [ ] Substituir imagem do Hero por stock realista de transformação
- [ ] Implementar Header sticky com transição de cor/sombra
- [ ] Ajustar botão WhatsApp para flutuação sutil (respiração)
- [ ] Remover "Consultor de Produtividade & Tecnologia" do footer

## FASE 4: Neurociência & Conversão
- [ ] Adicionar formulário Newsletter no topo de todas as páginas
- [ ] Adicionar formulário Newsletter no meio de todas as páginas
- [ ] Adicionar formulário Newsletter no fim de todas as páginas
- [ ] Implementar micro-recompensas visuais (confetti, checkmarks animados)
- [ ] Adicionar progress bar de leitura nos posts
- [ ] Implementar "Artigos Relacionados" com IA (recomendação)

## FASE 5: SEO/GEO Avançado
- [ ] Adicionar meta tags geolocalizadas (Brasil, cidades principais)
- [ ] Implementar Schema.org markup (Article, Organization, Person)
- [ ] Gerar sitemap.xml dinâmico
- [ ] Adicionar Google Analytics 4
- [ ] Adicionar Google Search Console verification
- [ ] Otimizar alt texts de todas as imagens
- [ ] Implementar Open Graph tags para redes sociais
- [ ] Adicionar Twitter Cards

## FASE 6: Performance
- [ ] Otimizar imagens (WebP, lazy loading)
- [ ] Minificar CSS/JS
- [ ] Implementar cache de API
- [ ] Reduzir tamanho do bundle (code splitting)
- [ ] Testar Lighthouse score (meta: 90+)

## FASE 7: Preparação Saúde
- [ ] Adicionar categoria "Saúde" no schema
- [ ] Adicionar tags: bem-estar, atividade física, longevidade, vitalidade
- [ ] Preparar seção na página Sobre para "Farmacêutico 15 anos"

## FASE 8: Testes Finais
- [ ] Testar todos os botões e links
- [ ] Verificar responsividade (mobile, tablet, desktop)
- [ ] Testar formulários de Newsletter
- [ ] Verificar velocidade de carregamento
- [ ] Corrigir erros de console
- [ ] Validar HTML/CSS
- [ ] Testar SEO com ferramentas (Ahrefs, SEMrush)
