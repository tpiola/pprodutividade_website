import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, CheckCircle2, AlertCircle } from 'lucide-react';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';

interface NewsletterFormProps {
  source?: string;
  variant?: 'default' | 'compact' | 'inline';
  className?: string;
}

export default function NewsletterForm({ 
  source = 'unknown', 
  variant = 'default',
  className = '' 
}: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const subscribeMutation = trpc.newsletter.subscribe.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Por favor, insira um email válido');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await subscribeMutation.mutateAsync({ email, source });
      
      if (result.success) {
        setIsSuccess(true);
        setEmail('');
        toast.success(result.message);
        
        // Confetti effect
        if (typeof window !== 'undefined' && (window as any).confetti) {
          (window as any).confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        }
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('Erro ao cadastrar. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess && variant !== 'inline') {
    return (
      <div className={`flex flex-col items-center justify-center gap-4 p-8 bg-primary/10 border border-primary/30 rounded-2xl ${className}`}>
        <CheckCircle2 className="w-16 h-16 text-primary animate-bounce" />
        <h3 className="font-display text-2xl font-bold text-white">Bem-vindo à Revolução!</h3>
        <p className="text-muted-foreground text-center max-w-md">
          Você acaba de dar o primeiro passo para dominar a produtividade exponencial. 
          Verifique seu email para confirmar.
        </p>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <form onSubmit={handleSubmit} className={`flex gap-2 ${className}`}>
        <Input
          type="email"
          placeholder="Seu melhor email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-white/5 border-white/10 text-white placeholder:text-muted-foreground"
          disabled={isSubmitting}
        />
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="bg-primary hover:bg-primary/90 text-black font-bold whitespace-nowrap"
        >
          {isSubmitting ? 'Enviando...' : 'Inscrever'}
        </Button>
      </form>
    );
  }

  if (variant === 'inline') {
    return (
      <form onSubmit={handleSubmit} className={`flex flex-col sm:flex-row gap-3 ${className}`}>
        <div className="flex-1 relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-11 h-12 bg-white/5 border-white/10 text-white placeholder:text-muted-foreground rounded-full"
            disabled={isSubmitting}
          />
        </div>
        <Button 
          type="submit" 
          disabled={isSubmitting}
          size="lg"
          className="h-12 px-8 bg-primary hover:bg-primary/90 text-black font-bold rounded-full shadow-lg hover:shadow-primary/25 transition-all"
        >
          {isSubmitting ? 'Enviando...' : 'INSCREVER-SE'}
        </Button>
      </form>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/30 mb-4">
          <Mail className="w-8 h-8 text-primary" />
        </div>
        <h3 className="font-display text-2xl md:text-3xl font-bold text-white">
          RECEBA INSIGHTS <span className="text-primary">EXCLUSIVOS</span>
        </h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          Junte-se a milhares de profissionais que já dominam IA, Produtividade e Biohacking.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="email"
            placeholder="Digite seu melhor email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-12 h-14 bg-white/5 border-white/10 text-white placeholder:text-muted-foreground rounded-full text-lg"
            disabled={isSubmitting}
          />
        </div>
        
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full h-14 bg-primary hover:bg-primary/90 text-black font-bold text-lg rounded-full shadow-lg hover:shadow-primary/25 transition-all"
        >
          {isSubmitting ? 'ENVIANDO...' : 'QUERO EVOLUIR AGORA'}
        </Button>
        
        <p className="text-xs text-muted-foreground text-center">
          *Conteúdo profissional e livre de spam. Cancele quando quiser.
        </p>
      </form>
    </div>
  );
}
