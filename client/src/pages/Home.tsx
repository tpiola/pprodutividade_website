import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Brain, Zap, Globe, Cpu, Activity, CheckCircle2 } from "lucide-react";

export default function Home() {
  return (
    <Layout>
      {/* Hero Section: Inteligência e Harmonia */}
      <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden pt-20">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero-brain-harmony.png" 
            alt="Inteligência Artificial e Cérebro Humano em Harmonia" 
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/40 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80" />
        </div>

        <div className="container relative z-10 px-4 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-display font-medium tracking-wider animate-in fade-in slide-in-from-left-4 duration-700 uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              O Futuro é Agora
            </div>
            
            <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
              INTELIGÊNCIA <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary animate-pulse">EXPANDIDA</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 leading-relaxed">
              A Inteligência Artificial não veio para substituir você, mas para <span className="text-white font-semibold">potencializar quem você é</span>. Domine a produtividade exponencial e o biohacking para liderar na nova economia.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-black font-bold text-lg px-10 h-14 shadow-[0_0_30px_rgba(0,255,0,0.2)] hover:shadow-[0_0_40px_rgba(0,255,0,0.4)] transition-all rounded-full">
                 <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            
            <p className="text-xs text-muted-foreground font-mono animate-in fade-in delay-500">
              Junte-se a +15.000 mentes inovadoras
            </p>
          </div>

          {/* Visual Element */}
          <div className="hidden lg:flex justify-center animate-in fade-in zoom-in duration-1000 delay-300">
            <div className="relative w-[500px] h-[500px] rounded-full border border-primary/10 bg-gradient-to-b from-primary/5 to-transparent backdrop-blur-sm flex items-center justify-center p-12">
               <img 
                src="/images/ai-productivity.png" 
                alt="IA e Produtividade" 
                className="w-full h-full object-contain drop-shadow-2xl rounded-2xl mask-image-gradient-b"
              />
              
              {/* Floating Cards */}
              <div className="absolute -right-8 top-20 bg-card/80 backdrop-blur border border-border p-4 rounded-xl shadow-2xl animate-bounce duration-[3000ms]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-green-500/20 rounded-lg text-green-500"><Cpu size={18} /></div>
                  <span className="text-sm font-bold text-white">Produtividade 10x</span>
                </div>
                <div className="h-1.5 w-32 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-[92%]" />
                </div>
              </div>

              <div className="absolute -left-8 bottom-20 bg-card/80 backdrop-blur border border-border p-4 rounded-xl shadow-2xl animate-bounce duration-[4000ms]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-blue-500/20 rounded-lg text-blue-500"><Brain size={18} /></div>
                  <span className="text-sm font-bold text-white">Foco Neural</span>
                </div>
                <div className="h-1.5 w-32 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-[88%]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: O Cenário Global (Desvantagem Competitiva) */}
      <section id="futuro" className="py-24 bg-black relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        
        <div className="container px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              <img 
                src="/images/global-competition-ptbr.png" 
                alt="Mapa Global de Competitividade" 
                className="w-full rounded-2xl border border-border/50 shadow-2xl opacity-90 hover:opacity-100 transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            </div>
            
            <div className="order-1 lg:order-2 space-y-6">
              <Badge variant="outline" className="border-primary/50 text-primary px-4 py-1 text-xs uppercase tracking-widest">
                Contexto Global
              </Badge>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
                A DESVANTAGEM <span className="text-primary">INVISÍVEL</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Enquanto você lê isso, ecossistemas inteiros nos EUA, China e Israel já integraram a IA como uma extensão biológica. No Brasil, ainda estamos engatinhando.
              </p>
              <p className="text-white font-medium text-lg">
                A lacuna está aumentando a cada segundo. Mas isso cria uma oportunidade única para quem decidir agir agora.
              </p>
              
              <ul className="space-y-4 pt-4">
                {[
                  "Automatização de tarefas cognitivas complexas",
                  "Tomada de decisão baseada em Big Data pessoal",
                  "Aprendizado acelerado com tutores de IA"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Depoimentos (Prova Social) */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="container px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <Badge variant="outline" className="border-primary/50 text-primary px-4 py-1 text-xs uppercase tracking-widest">
              Casos de Sucesso
            </Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
              QUEM JÁ <span className="text-primary">DOMINA O FUTURO</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Dr. Ricardo Silva",
                role: "Neurocirurgião",
                text: "A metodologia do Thiago mudou minha prática. Uso IA para analisar exames e biohacking para manter o foco em cirurgias de 12 horas. Minha produtividade triplicou.",
                image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=faces"
              },
              {
                name: "Ana Clara",
                role: "CEO de Startup Tech",
                text: "Estava à beira do burnout. Com os protocolos de saúde e a automação de processos que aprendi, recuperei minha energia e escalei minha empresa em tempo recorde.",
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=faces"
              },
              {
                name: "Marcos Viana",
                role: "Investidor Anjo",
                text: "O Brasil está atrasado, mas o Thiago traz o que há de mais avançado lá fora. A visão sobre IA como extensão cognitiva é simplesmente brilhante e lucrativa.",
                image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=faces"
              }
            ].map((testimonial, i) => (
              <Card key={i} className="bg-white/5 backdrop-blur-md border-white/10 hover:border-primary/50 transition-all duration-300 group">
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20 group-hover:border-primary transition-colors">
                      <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{testimonial.name}</h4>
                      <p className="text-xs text-primary uppercase tracking-wider">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed italic">
                    "{testimonial.text}"
                  </p>
                  <div className="flex gap-1 text-primary">
                    {[...Array(5)].map((_, j) => (
                      <Zap key={j} size={14} fill="currentColor" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section: Biohacking & Saúde */}
      <section id="biohacking" className="py-24 bg-background relative">
        <div className="container px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              BIOHACKING: <span className="text-primary">VELOCIDADE & RESILIÊNCIA</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Não adianta ter as melhores ferramentas se o "hardware" (seu corpo) está lento. Otimize sua biologia para suportar a alta performance.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-card/50 border-border hover:border-primary/50 transition-all duration-300 group">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                  <Zap size={24} />
                </div>
                <CardTitle className="font-display text-xl">Energia Mitocondrial</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Protocolos para aumentar a produção de ATP. Tenha energia estável do momento que acorda até a hora de dormir, sem crash de cafeína.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border hover:border-primary/50 transition-all duration-300 group">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-500 mb-4 group-hover:scale-110 transition-transform">
                  <Brain size={24} />
                </div>
                <CardTitle className="font-display text-xl">Neuroplasticidade</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Técnicas para acelerar o aprendizado e a adaptação. Mantenha seu cérebro jovem, rápido e capaz de absorver novas tecnologias.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border hover:border-primary/50 transition-all duration-300 group">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center text-purple-500 mb-4 group-hover:scale-110 transition-transform">
                  <Activity size={24} />
                </div>
                <CardTitle className="font-display text-xl">Gestão de Stress</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Use dados biométricos para monitorar sua recuperação. Transforme stress em foco agudo e evite o burnout silencioso.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-16 relative rounded-2xl overflow-hidden border border-border/50">
            <img src="/images/biohacking-health-ptbr.png" alt="Biohacking Visualization" className="w-full h-[400px] object-cover opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Seu corpo é a única máquina que você não pode trocar.</h3>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white hover:text-black">
                CONHECER PROTOCOLOS DE SAÚDE
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section (High Conversion) */}
      <section id="newsletter" className="py-24 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container px-4 relative z-10">
          <div className="max-w-4xl mx-auto bg-card/80 backdrop-blur-xl border border-primary/20 rounded-3xl p-8 md:p-16 shadow-2xl text-center">
            <div className="inline-block p-3 rounded-full bg-primary/10 text-primary mb-6">
              <Globe size={32} />
            </div>
            
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              NÃO FIQUE PARA TRÁS NA <br />
              <span className="text-primary">NOVA ECONOMIA</span>
            </h2>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
              Receba semanalmente insights profundos sobre IA, Produtividade e Biohacking que a mídia tradicional ignora. Aprenda de verdade com quem está criando o FUTURO
            </p>

            <form className="max-w-md mx-auto space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Seu melhor e-mail" 
                  className="w-full h-14 pl-6 pr-4 rounded-full bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-lg"
                />
              </div>
              <Button className="w-full h-14 rounded-full bg-primary text-black font-bold text-lg hover:bg-primary/90 shadow-lg hover:shadow-primary/25 transition-all">
                INSCREVER-SE AGORA
              </Button>
              <p className="text-xs text-muted-foreground mt-4">
                *Conteúdo profissional e livre de spam. Cancele quando quiser.
              </p>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}
