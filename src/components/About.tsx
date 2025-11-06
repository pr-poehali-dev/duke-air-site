import Icon from '@/components/ui/icon';
import { Card, CardContent } from '@/components/ui/card';

interface AboutProps {
  onMenuClick: () => void;
}

const About = ({ onMenuClick }: AboutProps) => {
  const features = [
    {
      icon: 'Plane',
      title: 'Современный флот',
      description: 'Новейшие самолеты с максимальным комфортом'
    },
    {
      icon: 'Shield',
      title: 'Безопасность',
      description: 'Высочайшие стандарты авиационной безопасности'
    },
    {
      icon: 'Clock',
      title: 'Пунктуальность',
      description: 'Вовремя доставим вас в любую точку мира'
    },
    {
      icon: 'Headphones',
      title: 'Поддержка 24/7',
      description: 'Всегда на связи, готовы помочь'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground p-6 shadow-lg">
        <div className="flex items-center gap-4">
          <button 
            onClick={onMenuClick}
            className="hover:bg-white/20 p-2 rounded-lg transition-colors"
          >
            <Icon name="Menu" size={32} />
          </button>
          <h1 className="text-3xl font-bold">О нас</h1>
        </div>
      </header>

      <div className="container mx-auto p-6 space-y-8">
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-4">Duke Air</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Мы - современная авиакомпания, которая ставит комфорт и безопасность пассажиров 
            на первое место. С момента основания мы выполнили тысячи рейсов и доставили 
            миллионы пассажиров в различные точки мира. Наша миссия - сделать авиаперелеты 
            доступными, комфортными и безопасными для каждого.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 space-y-3">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name={feature.icon} size={32} className="text-primary" />
                </div>
                <h3 className="font-bold text-lg">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="bg-card p-6 rounded-lg shadow-md">
            <div className="text-4xl font-bold text-primary mb-2">150+</div>
            <div className="text-muted-foreground">Направлений</div>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-md">
            <div className="text-4xl font-bold text-primary mb-2">50+</div>
            <div className="text-muted-foreground">Самолетов</div>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-md">
            <div className="text-4xl font-bold text-primary mb-2">2M+</div>
            <div className="text-muted-foreground">Пассажиров в год</div>
          </div>
        </div>

        <div className="bg-card p-8 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold mb-4">Свяжитесь с нами</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Icon name="Phone" className="text-primary" size={20} />
              <span>+7 (800) 555-35-35</span>
            </div>
            <div className="flex items-center gap-3">
              <Icon name="Mail" className="text-primary" size={20} />
              <span>support@dukeair.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Icon name="MapPin" className="text-primary" size={20} />
              <span>Москва, Международный аэропорт Шереметьево</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
