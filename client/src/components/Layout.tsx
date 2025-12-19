import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Facebook, Instagram, Linkedin, Twitter, Mail, MessageCircle } from "lucide-react";
import { useState, useEffect, useRef } from "react";

// Neural Network Animation Component
const NeuralNetwork = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: { x: number; y: number; vx: number; vy: number; size: number }[] = [];
    const connectionDistance = 150;
    const particleCount = 80; // Adjusted for performance

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initParticles = () => {
      particles = Array.from({ length: particleCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1
      }));
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 255, 0, 0.5)'; // Neon Green
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            const opacity = 1 - distance / connectionDistance;
            ctx.strokeStyle = `rgba(0, 255, 0, ${opacity * 0.2})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    initParticles();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-30" />;
};

// Custom Icons for TikTok and Kwai (Lucide doesn't have them)
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const KwaiIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
);

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showCookieBanner, setShowCookieBanner] = useState(true);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-body selection:bg-primary selection:text-primary-foreground overflow-x-hidden">
      <NeuralNetwork />
      
      {/* Header */}
      <header className="fixed top-0 w-full z-50 border-b border-border/20 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-24 flex items-center justify-between"> {/* Increased height */}
          <Link href="/">
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="w-14 h-14 relative"> {/* Increased logo size */}
                <img src="/images/thiago-piola-logo-v2.png" alt="Thiago Piola Logo" className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-2xl tracking-tight text-white group-hover:text-primary transition-colors leading-none">
                  THIAGO PIOLA
                </span>
                <span className="text-[10px] text-primary uppercase tracking-widest font-medium hidden md:block">
                  Consultor de Produtividade & Tecnologia
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/#futuro">
              <span className="text-sm font-medium hover:text-primary transition-colors uppercase tracking-wide cursor-pointer">HOME</span>
            </Link>
            <Link href="/#biohacking">
              <span className="text-sm font-medium hover:text-primary transition-colors uppercase tracking-wide cursor-pointer">BLOG</span>
            </Link>
            <Link href="/#newsletter">
              <span className="text-sm font-medium hover:text-primary transition-colors uppercase tracking-wide cursor-pointer">SOBRE</span>
            </Link>
            <a href="mailto:contato@thiagopiola.com.br">
              <Button variant="outline" className="font-display text-xs border-primary/50 text-primary hover:bg-primary hover:text-black uppercase tracking-wider">
                CONTATO
              </Button>
            </a>
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
          <div className="md:hidden absolute top-24 left-0 w-full bg-background/95 backdrop-blur-xl border-b border-border p-6 flex flex-col gap-6 animate-in slide-in-from-top-5 shadow-2xl">
            <Link href="/#futuro">
              <span className="text-lg font-medium hover:text-primary transition-colors cursor-pointer" onClick={() => setIsMenuOpen(false)}>HOME</span>
            </Link>
            <Link href="/#biohacking">
              <span className="text-lg font-medium hover:text-primary transition-colors cursor-pointer" onClick={() => setIsMenuOpen(false)}>BLOG</span>
            </Link>
            <Link href="/#newsletter">
              <span className="text-lg font-medium hover:text-primary transition-colors cursor-pointer" onClick={() => setIsMenuOpen(false)}>SOBRE</span>
            </Link>
            <a href="mailto:contato@thiagopiola.com.br">
              <Button className="w-full font-display text-sm bg-primary text-black hover:bg-primary/90 h-12">
                CONTATO
              </Button>
            </a>
          </div>
        )}
      </header>

      <main className="flex-1 pt-24 relative z-10">
        {children}
      </main>

      {/* WhatsApp Floating Button */}
      <a 
        href="#" 
        className="fixed bottom-8 right-8 z-50 bg-[#25D366] hover:bg-[#128C7E] text-white p-4 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.5)] hover:shadow-[0_0_30px_rgba(37,211,102,0.8)] transition-all duration-300 animate-bounce hover:animate-none"
        aria-label="Fale conosco no WhatsApp"
      >
        <MessageCircle size={32} fill="white" className="text-transparent" />
      </a>

      {/* Footer */}
      <footer className="border-t border-border/30 bg-black/80 backdrop-blur-md py-16 mt-20 relative z-10">
        <div className="container mx-auto px-4 grid md:grid-cols-4 gap-12">
          <div className="col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 relative">
                <img src="/images/thiago-piola-logo-v2.png" alt="Logo" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                <h3 className="font-display font-bold text-2xl text-white leading-none">THIAGO PIOLA</h3>
                <span className="text-[10px] text-primary uppercase tracking-widest font-medium">Consultor de Produtividade</span>
              </div>
            </div>
            <p className="text-muted-foreground text-sm max-w-md leading-relaxed">
              Com Biohacking e IA, conquiste a Produtividade Inabalável, mente e corpo fortalecidos, sem burnout ou limitações – o futuro é seu, não fique para trás. <br/>
              <span className="text-white font-bold">Seja Imparável!</span>
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-4 pt-4">
              {[
                { Icon: Facebook, label: "Facebook" },
                { Icon: Instagram, label: "Instagram" },
                { Icon: Linkedin, label: "LinkedIn" },
                { Icon: Twitter, label: "X" },
                { Icon: Mail, label: "Email" },
                { Icon: TikTokIcon, label: "TikTok" },
                { Icon: KwaiIcon, label: "Kwai" }
              ].map(({ Icon, label }, i) => (
                <a key={i} href="#" className="text-muted-foreground hover:text-primary transition-colors transform hover:scale-110" aria-label={label}>
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-display text-xs text-primary mb-6 uppercase tracking-widest font-bold">Navegação</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/#futuro"><span className="hover:text-white transition-colors cursor-pointer">HOME</span></Link></li>
              <li><Link href="/#biohacking"><span className="hover:text-white transition-colors cursor-pointer">BLOG</span></Link></li>
              <li><Link href="/#newsletter"><span className="hover:text-white transition-colors cursor-pointer">SOBRE</span></Link></li>
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
