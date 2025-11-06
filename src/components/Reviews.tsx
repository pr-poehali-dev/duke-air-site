import Icon from '@/components/ui/icon';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface ReviewsProps {
  onMenuClick: () => void;
}

const reviews = [
  {
    id: 1,
    name: 'Анна Петрова',
    rating: 5,
    text: 'Отличный сервис! Рейс был вовремя, персонал приветливый. Обязательно полечу еще раз.',
    date: '2025-10-15'
  },
  {
    id: 2,
    name: 'Михаил Иванов',
    rating: 5,
    text: 'Удобное бронирование, комфортный полет. Цены приятно удивили. Рекомендую!',
    date: '2025-10-20'
  },
  {
    id: 3,
    name: 'Елена Смирнова',
    rating: 4,
    text: 'Хорошая авиакомпания, все прошло гладко. Небольшая задержка, но в целом доволен.',
    date: '2025-10-25'
  },
  {
    id: 4,
    name: 'Дмитрий Козлов',
    rating: 5,
    text: 'Профессиональный подход, современные самолеты. Duke Air - мой выбор!',
    date: '2025-11-01'
  }
];

const Reviews = ({ onMenuClick }: ReviewsProps) => {
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
          <h1 className="text-3xl font-bold">Отзывы</h1>
        </div>
      </header>

      <div className="container mx-auto p-6">
        <div className="grid gap-6 md:grid-cols-2">
          {reviews.map(review => (
            <Card key={review.id}>
              <CardHeader>
                <CardTitle className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {review.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-bold">{review.name}</div>
                      <div className="text-sm text-muted-foreground">{review.date}</div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Icon 
                        key={i}
                        name={i < review.rating ? 'Star' : 'Star'}
                        size={18}
                        className={i < review.rating ? 'fill-secondary text-secondary' : 'text-muted'}
                      />
                    ))}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{review.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
