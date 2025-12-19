import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Target, Zap, Shield, Rocket, Brain, Award } from "lucide-react";

export default function Sobre() {
  return (
    <Layout>
      {/* Hero Section: A Jornada */}
      <section className="relative min-h-[80vh] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-background z-10" />
          <img 
            src="/images/hero-bg.png" 
            alt="Background Neural" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>

        <div className="container relative z-20 px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <Badge variant="outline" className="border-primary/50 text-primary px-4 py-1 text-xs uppercase tracking-widest">
                Quem é Thiago Piola
              </Badge>
              
              <h1 className="font-display text-5xl md:text-6xl font-bold leading-tight text-white">
                NÃO É SOBRE <br />
                <span className="text-primary">TECNOLOGIA.</span> <br />
                É SOBRE <span className="text-white">POTENCIAL.</span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                Minha obsessão não é com as máquinas, mas com o que elas permitem que o ser humano se torne. Sou um estrategista focado em desbloquear a próxima etapa da evolução cognitiva.
              </p>

              <div className="flex gap-4 pt-4">
                <Button size="lg" className="bg-primary text-black font-bold hover:bg-primary/90 rounded-full px-8">
                  TRABALHE COMIGO <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 relative group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                {/* Placeholder para foto do Thiago */}
                <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-zinc-700 font-display text-2xl">
                  [FOTO THIAGO PIOLA]
                </div>
                
                <div className="absolute bottom-8 left-8 z-20">
                  <p className="text-white font-bold text-2xl">Thiago Piola</p>
                  <p className="text-primary font-mono text-sm">Consultor de Produtividade & Tecnologia</p>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -z-10 top-10 -right-10 w-full h-full border border-primary/20 rounded-2xl" />
              <div className="absolute -z-20 -bottom-10 -left-10 w-full h-full bg-primary/5 rounded-2xl blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Section: A Missão */}
      <section className="py-24 bg-background relative">
        <div className="container px-4 max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full text-primary mb-4">
            <Target size={32} />
          </div>
          
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
            DEMOCRATIZAR A <span className="text-primary">SUPERINTELIGÊNCIA</span>
          </h2>
          
          <p className="text-lg text-muted-foreground leading-relaxed">
            Acredito que estamos vivendo o momento mais crítico da história humana. A divisão entre quem domina a IA e quem é dominado por ela será brutal. Minha missão é garantir que você esteja no lado certo dessa equação, armado com as ferramentas cognitivas e tecnológicas para não apenas sobreviver, mas liderar.
          </p>
        </div>
      </section>

      {/* Section: Valores */}
      <section className="py-24 bg-black/50 border-y border-white/5">
        <div className="container px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Velocidade Absoluta",
                desc: "O mercado não perdoa lentidão. Implementamos sistemas que reduzem processos de dias para minutos."
              },
              {
                icon: Shield,
                title: "Verdade Científica",
                desc: "Sem 'achismos'. Tudo o que ensino em biohacking é baseado em papers revisados e fisiologia aplicada."
              },
              {
                icon: Rocket,
                title: "Autonomia Radical",
                desc: "Não quero que você dependa de mim para sempre. Meu objetivo é transferir o conhecimento e te tornar independente."
              }
            ].map((valor, i) => (
              <Card key={i} className="bg-transparent border-white/10 hover:border-primary/50 transition-colors group">
                <CardContent className="p-8 space-y-4">
                  <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center text-white group-hover:text-primary group-hover:bg-primary/10 transition-all">
                    <valor.icon size={24} />
                  </div>
                  <h3 className="font-display text-xl font-bold text-white">{valor.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {valor.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section: Timeline (Simplificada) */}
      <section className="py-24 bg-background">
        <div className="container px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl font-bold text-white">MINHA <span className="text-primary">TRAJETÓRIA</span></h2>
          </div>

          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-primary/50 before:to-transparent">
            {[
              {
                year: "2018",
                title: "O Despertar para a Eficiência",
                desc: "Início da jornada em otimização de processos corporativos, percebendo que o gargalo sempre era o fator humano."
              },
              {
                year: "2020",
                title: "Imersão em Biohacking",
                desc: "Descoberta de que a produtividade começa na biologia. Certificações internacionais e auto-experimentação intensiva."
              },
              {
                year: "2023",
                title: "A Revolução da IA",
                desc: "Integração total de LLMs (Large Language Models) ao fluxo de trabalho, criando o método 'Inteligência Expandida'."
              },
              {
                year: "HOJE",
                title: "Consultoria Thiago Piola",
                desc: "Ajudando líderes e empresas a navegarem na era da aceleração exponencial."
              }
            ].map((item, i) => (
              <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-primary/50 bg-black shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                </div>
                
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-xl border border-white/10 bg-white/5 hover:border-primary/30 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-white text-lg">{item.title}</h3>
                    <span className="text-primary font-mono text-sm font-bold">{item.year}</span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
