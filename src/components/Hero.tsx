import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

interface HeroProps {
  onMenuClick: () => void;
  onBookClick: () => void;
}

const Hero = ({ onMenuClick, onBookClick }: HeroProps) => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://cdn.poehali.dev/projects/d2eb46e0-b0a9-4f85-86dd-0907dec64c94/files/daf58e11-8c7d-4e48-9bf5-420eb6064df8.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-primary/40 to-primary/60"></div>
      </div>

      <div className="relative z-10">
        <header className="p-6 flex justify-between items-center">
          <button 
            onClick={onMenuClick}
            className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
          >
            <Icon name="Menu" size={32} className="text-white" />
          </button>
        </header>

        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] px-6 text-center">
          <div className="space-y-8 animate-fade-in">
            <h1 className="text-7xl md:text-9xl font-black text-white tracking-wider drop-shadow-2xl">
              DUKE AIR
            </h1>
            
            <div className="flex gap-4 justify-center text-3xl md:text-5xl font-bold text-secondary drop-shadow-lg tracking-[0.3em]">
              <span>D</span>
              <span>U</span>
              <span>K</span>
              <span>E</span>
              <span>A</span>
              <span>I</span>
              <span>R</span>
            </div>

            <p className="text-xl md:text-2xl text-white/90 font-medium mt-8">
              Ваш путь в небо начинается здесь
            </p>

            <Button 
              onClick={onBookClick}
              size="lg"
              className="mt-12 bg-secondary text-secondary-foreground hover:bg-secondary/90 text-lg px-8 py-6 font-bold"
            >
              <Icon name="Plane" size={24} className="mr-2" />
              Купить билет
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
