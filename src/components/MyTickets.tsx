import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Ticket } from '@/pages/Index';

interface MyTicketsProps {
  tickets: Ticket[];
  onMenuClick: () => void;
  onPayTicket: (ticketId: string) => void;
  onReturnTicket: (ticketId: string) => void;
}

const MyTickets = ({ tickets, onMenuClick, onPayTicket, onReturnTicket }: MyTicketsProps) => {
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
              <Card key={ticket.id} className="overflow-hidden">
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
                    <span className="text-sm">{ticket.flight.date} в {ticket.flight.time}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Icon name="User" size={16} className="text-primary" />
                    <span className="text-sm">{ticket.passengerName}</span>
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

                  <div className="pt-2 flex gap-2">
                    {!ticket.isPaid ? (
                      <Button 
                        onClick={() => onPayTicket(ticket.id)} 
                        className="flex-1"
                        size="sm"
                      >
                        <Icon name="CreditCard" size={16} className="mr-1" />
                        Оплатить
                      </Button>
                    ) : (
                      <Button 
                        onClick={() => onReturnTicket(ticket.id)} 
                        variant="destructive"
                        className="flex-1"
                        size="sm"
                      >
                        <Icon name="RotateCcw" size={16} className="mr-1" />
                        Возврат
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTickets;
