import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";

// Starfield Animation Component
const Starfield = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let stars: { x: number; y: number; z: number; size: number }[] = [];
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initStars = () => {
      stars = Array.from({ length: 200 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 2,
        size: Math.random() * 1.5
      }));
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';

      stars.forEach(star => {
        star.y -= 0.2 * star.z; // Move upwards slowly
        if (star.y < 0) {
          star.y = canvas.height;
          star.x = Math.random() * canvas.width;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    initStars();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-40" />;
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showCookieBanner, setShowCookieBanner] = useState(true);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-body selection:bg-primary selection:text-primary-foreground overflow-x-hidden">
      <Starfield />
      
      {/* Header */}
      <header className="fixed top-0 w-full z-50 border-b border-border/20 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center gap-3 group">
              <div className="w-10 h-10 relative">
                <img src="/images/thiago-piola-logo.png" alt="Thiago Piola Logo" className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-white group-hover:text-primary transition-colors">
                THIAGO PIOLA
              </span>
            </a>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/#futuro">
              <a className="text-sm font-medium hover:text-primary transition-colors uppercase tracking-wide">O Futuro</a>
            </Link>
            <Link href="/#biohacking">
              <a className="text-sm font-medium hover:text-primary transition-colors uppercase tracking-wide">Biohacking</a>
            </Link>
            <Link href="/#newsletter">
              <a className="text-sm font-medium hover:text-primary transition-colors uppercase tracking-wide">Newsletter</a>
            </Link>
            <Button variant="outline" className="font-display text-xs border-primary/50 text-primary hover:bg-primary hover:text-black uppercase tracking-wider">
              Área do Aluno
            </Button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-foreground hover:text-primary p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-background/95 backdrop-blur-xl border-b border-border p-6 flex flex-col gap-6 animate-in slide-in-from-top-5 shadow-2xl">
            <Link href="/#futuro">
              <a className="text-lg font-medium hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>O Futuro</a>
            </Link>
            <Link href="/#biohacking">
              <a className="text-lg font-medium hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>Biohacking</a>
            </Link>
            <Link href="/#newsletter">
              <a className="text-lg font-medium hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>Newsletter</a>
            </Link>
            <Button className="w-full font-display text-sm bg-primary text-black hover:bg-primary/90 h-12">
              ÁREA DO ALUNO
            </Button>
          </div>
        )}
      </header>

      <main className="flex-1 pt-20 relative z-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/30 bg-black/50 backdrop-blur-sm py-16 mt-20 relative z-10">
        <div className="container mx-auto px-4 grid md:grid-cols-4 gap-12">
          <div className="col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <img src="/images/thiago-piola-logo.png" alt="Logo" className="w-8 h-8" />
              <h3 className="font-display font-bold text-xl text-white">THIAGO PIOLA</h3>
            </div>
            <p className="text-muted-foreground text-sm max-w-md leading-relaxed">
              Acelerando a evolução humana através da neurociência aplicada e inteligência artificial. O futuro pertence a quem domina a velocidade e a resiliência.
            </p>
          </div>
          
          <div>
            <h4 className="font-display text-xs text-primary mb-6 uppercase tracking-widest font-bold">Navegação</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/#futuro"><a className="hover:text-white transition-colors">Inteligência Artificial</a></Link></li>
              <li><Link href="/#biohacking"><a className="hover:text-white transition-colors">Biohacking & Saúde</a></Link></li>
              <li><Link href="/#newsletter"><a className="hover:text-white transition-colors">Inscreva-se</a></Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-xs text-primary mb-6 uppercase tracking-widest font-bold">Legal</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-white transition-colors">Termos de Uso</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Política de Privacidade</a></li>
              <li><a href="#" className="hover:text-white transition-colors">LGPD</a></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-16 pt-8 border-t border-border/10 text-center text-xs text-muted-foreground font-mono">
          © 2025 THIAGO PIOLA. TODOS OS DIREITOS RESERVADOS.
        </div>
      </footer>

      {/* Cookie Banner (LGPD) */}
      {showCookieBanner && (
        <div className="fixed bottom-0 left-0 w-full bg-background/95 backdrop-blur border-t border-primary/20 p-4 z-50 animate-in slide-in-from-bottom-10">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              Utilizamos cookies para otimizar sua experiência e personalizar conteúdo, em conformidade com a <span className="text-white font-bold">LGPD</span>. Ao continuar, você concorda com nossa política.
            </p>
            <div className="flex gap-4">
              <Button variant="ghost" size="sm" onClick={() => setShowCookieBanner(false)} className="text-xs hover:text-white">
                Recusar
              </Button>
              <Button size="sm" onClick={() => setShowCookieBanner(false)} className="bg-primary text-black hover:bg-primary/90 font-bold text-xs px-6">
                ACEITAR
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
