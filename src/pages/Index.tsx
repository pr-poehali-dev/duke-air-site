import { useState } from 'react';
import Hero from '@/components/Hero';
import MobileMenu from '@/components/MobileMenu';
import BookingDialog from '@/components/BookingDialog';
import LoginDialog from '@/components/LoginDialog';
import MyTickets from '@/components/MyTickets';
import Reviews from '@/components/Reviews';
import About from '@/components/About';

export type Flight = {
  id: string;
  from: string;
  to: string;
  date: string;
  time: string;
  price: number;
  availableSeats: string[];
};

export type Ticket = {
  id: string;
  flight: Flight;
  seat: string;
  passengerName: string;
  passengerPhone: string;
  isPaid: boolean;
};

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'tickets' | 'reviews' | 'about'>('home');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [userPhone, setUserPhone] = useState<string | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const handleMenuClick = (page: 'home' | 'tickets' | 'reviews' | 'about' | 'book') => {
    setIsMenuOpen(false);
    if (page === 'book') {
      if (!userPhone) {
        setIsLoginOpen(true);
      } else {
        setIsBookingOpen(true);
      }
    } else {
      setCurrentPage(page);
    }
  };

  const handleLogin = (phone: string) => {
    setUserPhone(phone);
    setIsLoginOpen(false);
    setIsBookingOpen(true);
  };

  const handleBookTicket = (ticket: Ticket) => {
    setTickets([...tickets, ticket]);
    setIsBookingOpen(false);
  };

  const handlePayTicket = (ticketId: string) => {
    setTickets(tickets.map(t => t.id === ticketId ? { ...t, isPaid: true } : t));
  };

  const handleReturnTicket = (ticketId: string) => {
    setTickets(tickets.filter(t => t.id !== ticketId));
  };

  return (
    <div className="min-h-screen bg-background">
      {currentPage === 'home' && (
        <Hero 
          onMenuClick={() => setIsMenuOpen(true)} 
          onBookClick={() => handleMenuClick('book')}
        />
      )}
      {currentPage === 'tickets' && (
        <MyTickets 
          tickets={tickets}
          onMenuClick={() => setIsMenuOpen(true)}
          onPayTicket={handlePayTicket}
          onReturnTicket={handleReturnTicket}
        />
      )}
      {currentPage === 'reviews' && (
        <Reviews onMenuClick={() => setIsMenuOpen(true)} />
      )}
      {currentPage === 'about' && (
        <About onMenuClick={() => setIsMenuOpen(true)} />
      )}

      <MobileMenu 
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onMenuClick={handleMenuClick}
      />

      <LoginDialog 
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={handleLogin}
      />

      <BookingDialog 
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        onBook={handleBookTicket}
        userPhone={userPhone || ''}
      />
    </div>
  );
};

export default Index;
