import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-body selection:bg-primary selection:text-primary-foreground">
      {/* Scanline Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] opacity-20" />

      <header className="fixed top-0 w-full z-40 border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/">
            <a className="font-display font-bold text-2xl tracking-tighter hover:text-primary transition-colors flex items-center gap-2">
              <span className="text-primary">/</span>PIROLÍTICA
            </a>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/#metodo">
              <a className="text-sm font-medium hover:text-primary transition-colors">O MÉTODO</a>
            </Link>
            <Link href="/#hacks">
              <a className="text-sm font-medium hover:text-primary transition-colors">HACKS</a>
            </Link>
            <Link href="/#comunidade">
              <a className="text-sm font-medium hover:text-primary transition-colors">COMUNIDADE</a>
            </Link>
            <Button variant="outline" className="font-mono text-xs border-primary/50 text-primary hover:bg-primary hover:text-black">
              LOGIN_SYSTEM
            </Button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-foreground hover:text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-background border-b border-border p-4 flex flex-col gap-4 animate-in slide-in-from-top-5">
            <Link href="/#metodo">
              <a className="text-sm font-medium hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>O MÉTODO</a>
            </Link>
            <Link href="/#hacks">
              <a className="text-sm font-medium hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>HACKS</a>
            </Link>
            <Link href="/#comunidade">
              <a className="text-sm font-medium hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>COMUNIDADE</a>
            </Link>
            <Button className="w-full font-mono text-xs bg-primary text-black hover:bg-primary/90">
              LOGIN_SYSTEM
            </Button>
          </div>
        )}
      </header>

      <main className="flex-1 pt-16 relative">
        {children}
      </main>

      <footer className="border-t border-border bg-card py-12 mt-20">
        <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <h3 className="font-display font-bold text-xl mb-4 flex items-center gap-2">
              <span className="text-primary">/</span>PIROLÍTICA
            </h3>
            <p className="text-muted-foreground text-sm max-w-md">
              Dominando a neurociência da produtividade e a inteligência artificial para hackear o sistema e liberar seu potencial máximo.
            </p>
          </div>
          
          <div>
            <h4 className="font-mono text-xs text-primary mb-4 uppercase tracking-wider">Navegação</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/#metodo"><a className="hover:text-white transition-colors">O Método</a></Link></li>
              <li><Link href="/#hacks"><a className="hover:text-white transition-colors">Hacks Gratuitos</a></Link></li>
              <li><Link href="/#comunidade"><a className="hover:text-white transition-colors">Comunidade</a></Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs text-primary mb-4 uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-white transition-colors">Termos de Uso</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacidade</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-12 pt-8 border-t border-border/20 text-center text-xs text-muted-foreground font-mono">
          © 2025 PIROLÍTICA SYSTEMS. ALL RIGHTS RESERVED.
        </div>
      </footer>
    </div>
  );
}
