import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

interface Flight {
  id: string;
  from: string;
  to: string;
  date: Date;
  time: string;
  passengers: number;
  seat: string;
  price: number;
  status: 'booked' | 'paid';
}

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [myFlights, setMyFlights] = useState<Flight[]>([]);
  
  const [bookingData, setBookingData] = useState({
    from: '',
    to: '',
    date: undefined as Date | undefined,
    passengers: 1,
    seat: ''
  });

  const popularDestinations = [
    { city: 'Москва', code: 'MOW' },
    { city: 'Санкт-Петербург', code: 'LED' },
    { city: 'Сочи', code: 'AER' },
    { city: 'Казань', code: 'KZN' }
  ];

  const availableSeats = ['1A', '1B', '2A', '2B', '3A', '3B', '4A', '4B'];

  const handleAuth = () => {
    if (phoneNumber.length >= 10) {
      setIsAuthenticated(true);
      setAuthDialogOpen(false);
    }
  };

  const handleBooking = () => {
    if (!isAuthenticated) {
      setBookingDialogOpen(false);
      setAuthDialogOpen(true);
      return;
    }
    
    if (bookingData.from && bookingData.to && bookingData.date && bookingData.seat) {
      setConfirmDialogOpen(true);
    }
  };

  const handlePayment = () => {
    const newFlight: Flight = {
      id: `FL${Date.now()}`,
      from: bookingData.from,
      to: bookingData.to,
      date: bookingData.date!,
      time: '10:30',
      passengers: bookingData.passengers,
      seat: bookingData.seat,
      price: 8500,
      status: 'paid'
    };
    
    setMyFlights([...myFlights, newFlight]);
    setConfirmDialogOpen(false);
    setBookingDialogOpen(false);
    setBookingData({
      from: '',
      to: '',
      date: undefined,
      passengers: 1,
      seat: ''
    });
  };

  const handleRefund = (flightId: string) => {
    setMyFlights(myFlights.filter(f => f.id !== flightId));
  };

  const reviews = [
    { name: 'Алексей М.', text: 'Отличный сервис! Быстро и удобно забронировал билет.', rating: 5 },
    { name: 'Мария К.', text: 'Приятные цены, всё прошло гладко.', rating: 5 },
    { name: 'Дмитрий П.', text: 'Рекомендую! Лучшая авиакомпания.', rating: 5 }
  ];

  return (
    <div className="min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Plane" className="text-primary" size={28} />
            <span className="text-2xl font-bold text-primary">Duke Air</span>
          </div>
          
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Icon name="Menu" size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] animate-slide-in-right">
              <nav className="flex flex-col gap-4 mt-8">
                <Button variant="ghost" className="justify-start text-lg" onClick={() => setMobileMenuOpen(false)}>
                  <Icon name="Ticket" className="mr-3" size={20} />
                  Мои билеты
                </Button>
                <Button 
                  variant="ghost" 
                  className="justify-start text-lg"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setBookingDialogOpen(true);
                  }}
                >
                  <Icon name="Search" className="mr-3" size={20} />
                  Найти билет
                </Button>
                <Button variant="ghost" className="justify-start text-lg" onClick={() => setMobileMenuOpen(false)}>
                  <Icon name="MessageSquare" className="mr-3" size={20} />
                  Отзывы
                </Button>
                <Button variant="ghost" className="justify-start text-lg" onClick={() => setMobileMenuOpen(false)}>
                  <Icon name="Info" className="mr-3" size={20} />
                  О нас
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-16">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://cdn.poehali.dev/projects/d2eb46e0-b0a9-4f85-86dd-0907dec64c94/files/8949a28b-c79b-42fe-b543-e2ee207743be.jpg')`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-primary/50 to-primary/70" />
        </div>
        
        <div className="relative z-10 text-center px-4 animate-fade-in">
          <h1 className="text-7xl md:text-9xl font-extrabold text-white mb-4 drop-shadow-2xl">
            Duke Air
          </h1>
          <div className="flex items-center justify-center gap-3 mb-8">
            {['D', 'U', 'K', 'E', 'A', 'I', 'R'].map((letter, i) => (
              <span 
                key={i} 
                className="text-2xl md:text-3xl font-bold text-secondary bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg"
              >
                {letter}
              </span>
            ))}
          </div>
          <p className="text-xl md:text-2xl text-white mb-8 font-medium">
            Ваше путешествие начинается здесь
          </p>
          <Button 
            size="lg" 
            className="bg-secondary hover:bg-secondary/90 text-foreground font-bold text-lg px-8 py-6"
            onClick={() => setBookingDialogOpen(true)}
          >
            <Icon name="Plane" className="mr-2" size={20} />
            Забронировать билет
          </Button>
        </div>
      </section>

      {isAuthenticated && myFlights.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-8 text-center">Мои билеты</h2>
            <div className="grid gap-6 max-w-4xl mx-auto">
              {myFlights.map(flight => (
                <Card key={flight.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-2xl">{flight.from} → {flight.to}</CardTitle>
                        <CardDescription className="text-lg mt-1">
                          {format(flight.date, 'd MMMM yyyy', { locale: ru })} в {flight.time}
                        </CardDescription>
                      </div>
                      <Badge className="bg-green-500">{flight.status === 'paid' ? 'Оплачен' : 'Забронирован'}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Рейс</p>
                        <p className="font-semibold">{flight.id}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Место</p>
                        <p className="font-semibold">{flight.seat}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Пассажиры</p>
                        <p className="font-semibold">{flight.passengers}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Цена</p>
                        <p className="font-semibold">{flight.price} ₽</p>
                      </div>
                    </div>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleRefund(flight.id)}
                    >
                      <Icon name="RefreshCw" className="mr-2" size={16} />
                      Возврат
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-center">Популярные направления</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {popularDestinations.map(dest => (
              <Card key={dest.code} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">{dest.city}</CardTitle>
                  <CardDescription>{dest.code}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-center">Отзывы</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {reviews.map((review, i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle className="text-lg">{review.name}</CardTitle>
                  <div className="flex gap-1">
                    {[...Array(review.rating)].map((_, j) => (
                      <Icon key={j} name="Star" size={16} className="text-secondary fill-secondary" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{review.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">О нас</h2>
          <p className="text-lg max-w-2xl mx-auto">
            Duke Air — современная авиакомпания, предоставляющая комфортные и безопасные перелёты по всей России. 
            Мы ценим ваше время и делаем всё для вашего удобства.
          </p>
        </div>
      </section>

      <Dialog open={authDialogOpen} onOpenChange={setAuthDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl">Вход по номеру телефона</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div>
              <Label htmlFor="phone">Номер телефона</Label>
              <Input 
                id="phone"
                type="tel"
                placeholder="+7 (___) ___-__-__"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <Button className="w-full" onClick={handleAuth}>
              Войти
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={bookingDialogOpen} onOpenChange={setBookingDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Забронировать билет</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 pt-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="from">Откуда</Label>
                <Input 
                  id="from"
                  placeholder="Город отправления"
                  value={bookingData.from}
                  onChange={(e) => setBookingData({...bookingData, from: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="to">Куда</Label>
                <Input 
                  id="to"
                  placeholder="Город назначения"
                  value={bookingData.to}
                  onChange={(e) => setBookingData({...bookingData, to: e.target.value})}
                />
              </div>
            </div>

            <div>
              <Label>Дата вылета</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left">
                    <Icon name="Calendar" className="mr-2" size={16} />
                    {bookingData.date ? format(bookingData.date, 'd MMMM yyyy', { locale: ru }) : 'Выберите дату'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={bookingData.date}
                    onSelect={(date) => setBookingData({...bookingData, date})}
                    locale={ru}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label htmlFor="passengers">Количество пассажиров</Label>
              <Input 
                id="passengers"
                type="number"
                min="1"
                max="9"
                value={bookingData.passengers}
                onChange={(e) => setBookingData({...bookingData, passengers: parseInt(e.target.value)})}
              />
            </div>

            <div>
              <Label>Выберите место</Label>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {availableSeats.map(seat => (
                  <Button
                    key={seat}
                    variant={bookingData.seat === seat ? "default" : "outline"}
                    onClick={() => setBookingData({...bookingData, seat})}
                  >
                    {seat}
                  </Button>
                ))}
              </div>
            </div>

            <Button className="w-full" size="lg" onClick={handleBooking}>
              Бронировать
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl">Подтверждение бронирования</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>{bookingData.from} → {bookingData.to}</CardTitle>
                <CardDescription>
                  {bookingData.date && format(bookingData.date, 'd MMMM yyyy', { locale: ru })} в 10:30
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Место:</span>
                    <span className="font-semibold">{bookingData.seat}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Пассажиры:</span>
                    <span className="font-semibold">{bookingData.passengers}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg">
                    <span className="font-bold">Итого:</span>
                    <span className="font-bold text-primary">8 500 ₽</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Button className="w-full" size="lg" onClick={handlePayment}>
              <Icon name="CreditCard" className="mr-2" size={20} />
              Оплатить
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <footer className="bg-foreground text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg">© 2024 Duke Air. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;