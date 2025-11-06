import Icon from '@/components/ui/icon';
import { Sheet, SheetContent } from '@/components/ui/sheet';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onMenuClick: (page: 'home' | 'tickets' | 'reviews' | 'about' | 'book') => void;
}

const MobileMenu = ({ isOpen, onClose, onMenuClick }: MobileMenuProps) => {
  const menuItems = [
    { id: 'home' as const, label: 'Главная', icon: 'Home' },
    { id: 'book' as const, label: 'Найти билет', icon: 'Search' },
    { id: 'tickets' as const, label: 'Мои билеты', icon: 'Ticket' },
    { id: 'reviews' as const, label: 'Отзывы', icon: 'MessageSquare' },
    { id: 'about' as const, label: 'О нас', icon: 'Info' },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-80 bg-card p-0">
        <div className="bg-primary p-6 text-primary-foreground">
          <h2 className="text-2xl font-bold">DUKE AIR</h2>
          <p className="text-sm opacity-90 mt-1">Меню навигации</p>
        </div>

        <nav className="p-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onMenuClick(item.id)}
              className="w-full flex items-center gap-4 p-4 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors text-left group"
            >
              <Icon 
                name={item.icon} 
                size={24} 
                className="text-primary group-hover:text-accent-foreground transition-colors" 
              />
              <span className="text-lg font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
