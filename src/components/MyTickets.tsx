import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Ticket } from '@/pages/Index';

interface MyTicketsProps {
  tickets: Ticket[];
  onMenuClick: () => void;
  onPayTicket: (ticketId: string) => void;
  onReturnTicket: (ticketId: string) => void;
}

const MyTickets = ({ tickets, onMenuClick, onPayTicket, onReturnTicket }: MyTicketsProps) => {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [showPaymentConfirm, setShowPaymentConfirm] = useState(false);

  const handleTicketClick = (ticket: Ticket) => {
    setSelectedTicket(ticket);
  };

  const handleCloseDetails = () => {
    setSelectedTicket(null);
    setShowPaymentConfirm(false);
  };

  const handlePayClick = () => {
    setShowPaymentConfirm(true);
  };

  const handleConfirmPayment = () => {
    if (selectedTicket) {
      onPayTicket(selectedTicket.id);
      handleCloseDetails();
    }
  };

  const handleReturnClick = () => {
    if (selectedTicket) {
      onReturnTicket(selectedTicket.id);
      handleCloseDetails();
    }
  };

  const getBoardingTime = (flightTime: string) => {
    const [hours, minutes] = flightTime.split(':');
    const boardingHours = parseInt(hours) - 1;
    return `${boardingHours.toString().padStart(2, '0')}:${minutes}`;
  };

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
          <h1 className="text-3xl font-bold">Мои билеты</h1>
        </div>
      </header>

      <div className="container mx-auto p-6">
        {tickets.length === 0 ? (
          <div className="text-center py-20">
            <Icon name="Ticket" size={64} className="mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold text-muted-foreground mb-2">Билетов пока нет</h2>
            <p className="text-muted-foreground">Забронируйте свой первый рейс!</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tickets.map(ticket => (
              <Card 
                key={ticket.id} 
                className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleTicketClick(ticket)}
              >
                <CardHeader className={ticket.isPaid ? 'bg-green-50' : 'bg-yellow-50'}>
                  <CardTitle className="flex items-center justify-between">
                    <span className="text-lg">Билет #{ticket.id.slice(-6)}</span>
                    {ticket.isPaid ? (
                      <span className="text-sm bg-green-600 text-white px-3 py-1 rounded-full">
                        Оплачен
                      </span>
                    ) : (
                      <span className="text-sm bg-yellow-600 text-white px-3 py-1 rounded-full">
                        Ожидает оплаты
                      </span>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <Icon name="MapPin" size={16} className="text-primary" />
                    <span className="text-sm font-medium">
                      {ticket.flight.from} → {ticket.flight.to}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Icon name="Calendar" size={16} className="text-primary" />
                    <span className="text-sm">{ticket.flight.date}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Icon name="Armchair" size={16} className="text-primary" />
                    <span className="text-sm font-bold">Место {ticket.seat}</span>
                  </div>

                  <div className="pt-2 border-t">
                    <div className="text-xl font-bold text-primary">
                      {ticket.flight.price} ₽
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Dialog open={selectedTicket !== null && !showPaymentConfirm} onOpenChange={handleCloseDetails}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              Билет #{selectedTicket?.id.slice(-6)}
            </DialogTitle>
          </DialogHeader>

          {selectedTicket && (
            <div className="space-y-6 mt-4">
              <div className={`p-4 rounded-lg ${selectedTicket.isPaid ? 'bg-green-50' : 'bg-yellow-50'}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-lg">Статус билета</span>
                  {selectedTicket.isPaid ? (
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                      Оплачен
                    </span>
                  ) : (
                    <span className="bg-yellow-600 text-white px-3 py-1 rounded-full text-sm">
                      Ожидает оплаты
                    </span>
                  )}
                </div>
              </div>

              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-lg space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b">
                  <Icon name="Plane" className="text-primary" size={32} />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold">{selectedTicket.flight.from}</h3>
                    <div className="text-3xl font-bold text-primary my-1">↓</div>
                    <h3 className="text-xl font-bold">{selectedTicket.flight.to}</h3>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Icon name="Calendar" size={16} />
                      <span>Дата вылета</span>
                    </div>
                    <div className="font-bold text-lg">{selectedTicket.flight.date}</div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Icon name="Clock" size={16} />
                      <span>Время вылета</span>
                    </div>
                    <div className="font-bold text-lg">{selectedTicket.flight.time}</div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Icon name="LogIn" size={16} />
                      <span>Регистрация</span>
                    </div>
                    <div className="font-bold">{getBoardingTime(selectedTicket.flight.time)}</div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Icon name="DoorOpen" size={16} />
                      <span>Посадка</span>
                    </div>
                    <div className="font-bold">{selectedTicket.flight.time}</div>
                  </div>
                </div>

                <div className="pt-3 border-t space-y-2">
                  <div className="flex items-center gap-2">
                    <Icon name="User" size={18} className="text-primary" />
                    <span className="text-sm text-muted-foreground">Пассажир:</span>
                    <span className="font-medium">{selectedTicket.passengerName}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Icon name="Armchair" size={18} className="text-primary" />
                    <span className="text-sm text-muted-foreground">Место:</span>
                    <span className="font-bold text-lg">{selectedTicket.seat}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Icon name="Phone" size={18} className="text-primary" />
                    <span className="text-sm text-muted-foreground">Телефон:</span>
                    <span className="font-medium">{selectedTicket.passengerPhone}</span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium">Стоимость:</span>
                    <span className="text-3xl font-bold text-primary">
                      {selectedTicket.flight.price} ₽
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                {!selectedTicket.isPaid ? (
                  <Button 
                    onClick={handlePayClick} 
                    className="flex-1"
                    size="lg"
                  >
                    <Icon name="CreditCard" size={20} className="mr-2" />
                    Оплатить билет
                  </Button>
                ) : (
                  <Button 
                    onClick={handleReturnClick} 
                    variant="destructive"
                    className="flex-1"
                    size="lg"
                  >
                    <Icon name="RotateCcw" size={20} className="mr-2" />
                    Вернуть билет
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showPaymentConfirm} onOpenChange={() => setShowPaymentConfirm(false)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              Подтвердите покупку
            </DialogTitle>
          </DialogHeader>

          {selectedTicket && (
            <div className="space-y-6 mt-4">
              <div className="bg-accent/50 p-6 rounded-lg text-center">
                <div className="text-sm text-muted-foreground mb-2">Сумма к оплате</div>
                <div className="text-4xl font-bold text-primary">
                  {selectedTicket.flight.price} ₽
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Рейс:</span>
                  <span className="font-medium">{selectedTicket.flight.from} → {selectedTicket.flight.to}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Пассажир:</span>
                  <span className="font-medium">{selectedTicket.passengerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Место:</span>
                  <span className="font-medium">{selectedTicket.seat}</span>
                </div>
              </div>

              <DialogFooter className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setShowPaymentConfirm(false)}
                  className="flex-1"
                >
                  Отмена
                </Button>
                <Button 
                  onClick={handleConfirmPayment}
                  className="flex-1"
                >
                  <Icon name="Check" size={20} className="mr-2" />
                  Подтвердить
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyTickets;
