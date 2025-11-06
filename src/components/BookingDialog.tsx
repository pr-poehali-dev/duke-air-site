import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { Flight, Ticket } from '@/pages/Index';

interface BookingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onBook: (ticket: Ticket) => void;
  userPhone: string;
}

const mockFlights: Flight[] = [
  {
    id: '1',
    from: 'Москва (SVO)',
    to: 'Санкт-Петербург (LED)',
    date: '2025-11-15',
    time: '10:30',
    price: 5500,
    availableSeats: ['1A', '1B', '2A', '2B', '3A', '3B', '4A', '4B']
  },
  {
    id: '2',
    from: 'Москва (DME)',
    to: 'Казань (KZN)',
    date: '2025-11-16',
    time: '14:20',
    price: 4200,
    availableSeats: ['1A', '1B', '2A', '2B', '3A', '3B']
  },
  {
    id: '3',
    from: 'Санкт-Петербург (LED)',
    to: 'Сочи (AER)',
    date: '2025-11-17',
    time: '09:15',
    price: 7800,
    availableSeats: ['1A', '1B', '2A', '2B', '3A', '3B', '4A', '4B', '5A', '5B']
  }
];

const BookingDialog = ({ isOpen, onClose, onBook, userPhone }: BookingDialogProps) => {
  const [step, setStep] = useState<'search' | 'select-seat' | 'confirm'>('search');
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [selectedSeat, setSelectedSeat] = useState('');
  const [passengerName, setPassengerName] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');

  const handleSearchFlights = () => {
    const flight = mockFlights.find(f => 
      f.from.includes(from) && f.to.includes(to) && f.date === date
    );
    
    if (flight) {
      setSelectedFlight(flight);
      setStep('select-seat');
    }
  };

  const handleSelectSeat = (seat: string) => {
    setSelectedSeat(seat);
  };

  const handleConfirmBooking = () => {
    if (selectedFlight && selectedSeat) {
      setStep('confirm');
    }
  };

  const handlePayment = () => {
    if (selectedFlight && selectedSeat && passengerName) {
      const ticket: Ticket = {
        id: Date.now().toString(),
        flight: selectedFlight,
        seat: selectedSeat,
        passengerName,
        passengerPhone: userPhone,
        isPaid: false
      };
      onBook(ticket);
      resetForm();
    }
  };

  const resetForm = () => {
    setStep('search');
    setSelectedFlight(null);
    setSelectedSeat('');
    setPassengerName('');
    setFrom('');
    setTo('');
    setDate('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {step === 'search' && 'Поиск рейса'}
            {step === 'select-seat' && 'Выбор места'}
            {step === 'confirm' && 'Подтверждение и оплата'}
          </DialogTitle>
        </DialogHeader>

        {step === 'search' && (
          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="from">Откуда</Label>
                <Select value={from} onValueChange={setFrom}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите город" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Москва">Москва</SelectItem>
                    <SelectItem value="Санкт-Петербург">Санкт-Петербург</SelectItem>
                    <SelectItem value="Казань">Казань</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="to">Куда</Label>
                <Select value={to} onValueChange={setTo}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите город" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Санкт-Петербург">Санкт-Петербург</SelectItem>
                    <SelectItem value="Казань">Казань</SelectItem>
                    <SelectItem value="Сочи">Сочи</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Дата вылета</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <Button onClick={handleSearchFlights} className="w-full" size="lg">
              <Icon name="Search" className="mr-2" size={20} />
              Найти рейсы
            </Button>
          </div>
        )}

        {step === 'select-seat' && selectedFlight && (
          <div className="space-y-6 mt-4">
            <div className="bg-accent/50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="Plane" className="text-primary" size={20} />
                <span className="font-bold">{selectedFlight.from} → {selectedFlight.to}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                {selectedFlight.date} в {selectedFlight.time}
              </div>
              <div className="text-lg font-bold text-primary mt-2">
                {selectedFlight.price} ₽
              </div>
            </div>

            <div>
              <Label>Выберите место</Label>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {selectedFlight.availableSeats.map(seat => (
                  <Button
                    key={seat}
                    variant={selectedSeat === seat ? 'default' : 'outline'}
                    onClick={() => handleSelectSeat(seat)}
                    className="h-12"
                  >
                    {seat}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="passengerName">ФИО пассажира</Label>
              <Input
                id="passengerName"
                placeholder="Иванов Иван Иванович"
                value={passengerName}
                onChange={(e) => setPassengerName(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep('search')} className="flex-1">
                Назад
              </Button>
              <Button 
                onClick={handleConfirmBooking} 
                className="flex-1"
                disabled={!selectedSeat || !passengerName}
              >
                Бронировать
              </Button>
            </div>
          </div>
        )}

        {step === 'confirm' && selectedFlight && (
          <div className="space-y-6 mt-4">
            <div className="bg-accent/50 p-6 rounded-lg space-y-3">
              <h3 className="font-bold text-lg">Информация о билете</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Маршрут:</span>
                  <span className="font-medium">{selectedFlight.from} → {selectedFlight.to}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Дата и время:</span>
                  <span className="font-medium">{selectedFlight.date} в {selectedFlight.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Пассажир:</span>
                  <span className="font-medium">{passengerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Место:</span>
                  <span className="font-medium">{selectedSeat}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Телефон:</span>
                  <span className="font-medium">{userPhone}</span>
                </div>
                <div className="border-t pt-2 mt-2 flex justify-between">
                  <span className="font-bold">Итого:</span>
                  <span className="font-bold text-primary text-xl">{selectedFlight.price} ₽</span>
                </div>
              </div>
            </div>

            <Button onClick={handlePayment} className="w-full" size="lg">
              <Icon name="CreditCard" className="mr-2" size={20} />
              Оплатить билет
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
