import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Brain, Zap, Lock, Terminal } from "lucide-react";

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero-bg.png" 
            alt="Neural Network Background" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
        </div>

        <div className="container relative z-10 px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-mono animate-in fade-in slide-in-from-left-4 duration-700">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              SYSTEM_ONLINE // V.2.0.25
            </div>
            
            <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight tracking-tighter animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
              HACKEIE SUA <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary animate-pulse">BIOLOGIA</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
              Domine a neurociência da produtividade e a IA para liberar seu potencial máximo. Não é autoajuda. É <span className="text-white font-semibold">bio-engenharia pessoal</span>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white font-bold text-lg px-8 h-14 shadow-[0_0_20px_rgba(255,92,0,0.3)] hover:shadow-[0_0_30px_rgba(255,92,0,0.5)] transition-all">
                INICIAR PROTOCOLO <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-primary/50 text-primary hover:bg-primary/10 font-mono h-14">
                EXPLORAR DADOS
              </Button>
            </div>
          </div>

          {/* Abstract Visual / Avatar */}
          <div className="hidden lg:flex justify-center animate-in fade-in zoom-in duration-1000 delay-500">
            <div className="relative w-[500px] h-[500px]">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
              <img 
                src="/images/nexus-avatar.png" 
                alt="Nexus Avatar" 
                className="relative z-10 w-full h-full object-contain drop-shadow-[0_0_50px_rgba(0,255,0,0.2)] mask-image-gradient-b"
              />
              
              {/* Floating HUD Elements */}
              <div className="absolute top-10 right-0 p-4 border border-primary/30 bg-black/80 backdrop-blur text-xs font-mono text-primary rounded">
                <div>CORTEX_ACTIVITY: 98%</div>
                <div className="w-32 h-1 bg-primary/20 mt-1 overflow-hidden">
                  <div className="h-full bg-primary w-[98%] animate-pulse" />
                </div>
              </div>
              
              <div className="absolute bottom-20 left-0 p-4 border border-secondary/30 bg-black/80 backdrop-blur text-xs font-mono text-secondary rounded">
                <div>DOPAMINE_LEVELS: OPTIMIZED</div>
                <div className="w-32 h-1 bg-secondary/20 mt-1 overflow-hidden">
                  <div className="h-full bg-secondary w-[85%]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Method Section (Ski Slopes) */}
      <section id="metodo" className="py-24 bg-background relative">
        <div className="container px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="font-display text-4xl font-bold tracking-tighter">O SISTEMA <span className="text-primary">SKI-SLOPE</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Uma metodologia progressiva baseada em dificuldade e recompensa neuroquímica. Escolha sua pista.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Green Circle */}
            <Card className="bg-card border-primary/20 hover:border-primary/60 transition-all duration-300 group overflow-hidden">
              <div className="h-2 bg-primary w-full" />
              <CardHeader>
                <div className="w-16 h-16 mb-4 rounded-full bg-black border border-primary/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <img src="/images/green-circle-icon.png" alt="Green Circle" className="w-12 h-12 object-contain" />
                </div>
                <CardTitle className="font-display text-2xl text-primary">GREEN CIRCLE</CardTitle>
                <CardDescription className="font-mono text-xs uppercase tracking-widest">Iniciante • Hacks Rápidos</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Estratégias de entrada. Baixo esforço, recompensa imediata. Otimize seu sono, foco básico e ambiente sem fricção.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full group-hover:text-primary group-hover:bg-primary/10">
                  ACESSAR HACKS <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            {/* Blue Square */}
            <Card className="bg-card border-blue-500/20 hover:border-blue-500/60 transition-all duration-300 group overflow-hidden relative">
              <div className="h-2 bg-blue-500 w-full" />
              <CardHeader>
                <div className="w-16 h-16 mb-4 rounded bg-black border border-blue-500/30 flex items-center justify-center group-hover:rotate-3 transition-transform duration-500">
                  <img src="/images/blue-square-icon.png" alt="Blue Square" className="w-12 h-12 object-contain" />
                </div>
                <CardTitle className="font-display text-2xl text-blue-500">BLUE SQUARE</CardTitle>
                <CardDescription className="font-mono text-xs uppercase tracking-widest">Intermediário • Deep Work</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Protocolos de aprofundamento. Construção de sistemas, automação pessoal e estados de fluxo prolongados.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full group-hover:text-blue-500 group-hover:bg-blue-500/10">
                  DESBLOQUEAR <Lock className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            {/* Black Diamond */}
            <Card className="bg-card border-secondary/20 hover:border-secondary/60 transition-all duration-300 group overflow-hidden">
              <div className="h-2 bg-secondary w-full" />
              <CardHeader>
                <div className="w-16 h-16 mb-4 transform rotate-45 bg-black border border-secondary/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <div className="-rotate-45">
                    <img src="/images/black-diamond-icon.png" alt="Black Diamond" className="w-12 h-12 object-contain" />
                  </div>
                </div>
                <CardTitle className="font-display text-2xl text-secondary">BLACK DIAMOND</CardTitle>
                <CardDescription className="font-mono text-xs uppercase tracking-widest">Expert • Biohacking</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Território extremo. Nootrópicos avançados, modulação hormonal e reestruturação cognitiva completa. Apenas para iniciados.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full group-hover:text-secondary group-hover:bg-secondary/10">
                  ÁREA RESTRITA <Lock className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Latest Hacks Section */}
      <section id="hacks" className="py-24 bg-black/50 border-y border-border/30">
        <div className="container px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-display text-3xl font-bold mb-2">LATEST_DATA</h2>
              <p className="text-muted-foreground font-mono text-sm">Atualizações do sistema neural</p>
            </div>
            <Button variant="link" className="text-primary">VER ARQUIVO COMPLETO</Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="group relative bg-card border border-border hover:border-primary/50 transition-colors overflow-hidden rounded-lg">
                <div className="aspect-video bg-muted relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                  <img src={`https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80`} alt="Tech" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <Badge className="absolute top-4 left-4 z-20 bg-primary text-black font-bold hover:bg-primary">GREEN CIRCLE</Badge>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono mb-3">
                    <Terminal className="w-3 h-3" />
                    <span>SYSTEM_HACK_0{i}</span>
                    <span>•</span>
                    <span>5 MIN READ</span>
                  </div>
                  <h3 className="font-display text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    Protocolo Dopamina: Como resetar seus receptores em 24h
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    Descubra a ciência por trás do jejum de dopamina e como recuperar sua motivação basal sem sofrimento desnecessário.
                  </p>
                  <div className="flex items-center text-primary text-sm font-medium group-hover:translate-x-2 transition-transform">
                    LER DADOS <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter / Lead Magnet Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-primary/20 rounded-full blur-[128px]" />
        
        <div className="container px-4 relative z-10">
          <div className="max-w-4xl mx-auto bg-card border border-primary/30 rounded-2xl p-8 md:p-12 relative overflow-hidden">
            {/* Scanline effect on card */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(0,255,0,0.03)_50%,rgba(0,0,0,0)_50%)] bg-[length:100%_4px]" />
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="font-display text-3xl md:text-4xl font-bold">
                  BAIXE O <span className="text-primary">BLUEPRINT</span> INICIAL
                </h2>
                <p className="text-muted-foreground">
                  Receba o mapa completo das 3 pistas (Green, Blue, Black) e identifique exatamente onde seu sistema está falhando hoje.
                </p>
                <ul className="space-y-3">
                  {['Checklist de Neurotransmissores', 'Rotina Matinal de Ativação', 'Lista de Suplementos Básicos'].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm font-medium">
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                        <Zap className="w-3 h-3" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-black/50 p-6 rounded-xl border border-border backdrop-blur-sm">
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-muted-foreground uppercase">Identificação (Nome)</label>
                    <input type="text" className="w-full bg-background border border-border rounded px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="Seu nome" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-muted-foreground uppercase">Canal de Dados (Email)</label>
                    <input type="email" className="w-full bg-background border border-border rounded px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="seu@email.com" />
                  </div>
                  <Button className="w-full bg-primary text-black hover:bg-primary/90 font-bold h-12">
                    DOWNLOAD SYSTEM_FILE
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    *Seus dados são criptografados. Zero spam.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
