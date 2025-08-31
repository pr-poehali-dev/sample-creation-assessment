import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface AnimeEpisode {
  id: string;
  title: string;
  poster: string;
  episode: number;
  totalEpisodes: number;
  time: string;
  genre: string;
  rating: number;
  isNew?: boolean;
}

const animeList: AnimeEpisode[] = [
  {
    id: '1',
    title: 'Парные боевые духи',
    poster: '/img/cddfe589-ca0c-46d4-a853-a95030b286e8.jpg',
    episode: 19,
    totalEpisodes: 24,
    time: '22:44',
    genre: 'Боевик',
    rating: 4.8,
    isNew: true
  },
  {
    id: '2',
    title: 'Боевой мастер',
    poster: '/img/ae75b47a-aefd-4f68-a651-9c4cd895d666.jpg',
    episode: 577,
    totalEpisodes: 600,
    time: '22:43',
    genre: 'Приключения',
    rating: 4.9
  },
  {
    id: '3',
    title: 'Гачиакута',
    poster: '/img/ea4748a9-8b3d-423e-885b-5dbedac0d9c2.jpg',
    episode: 8,
    totalEpisodes: 12,
    time: '20:26',
    genre: 'Фантастика',
    rating: 4.7
  },
  {
    id: '4',
    title: 'Межкультурный обмен с девушкой',
    poster: '/img/cddfe589-ca0c-46d4-a853-a95030b286e8.jpg',
    episode: 8,
    totalEpisodes: 12,
    time: '20:23',
    genre: 'Романтика',
    rating: 4.5
  },
  {
    id: '5',
    title: 'Драгоценности Рури',
    poster: '/img/ae75b47a-aefd-4f68-a651-9c4cd895d666.jpg',
    episode: 9,
    totalEpisodes: 12,
    time: '19:39',
    genre: 'Драма',
    rating: 4.6
  }
];

const Index = () => {
  const [selectedAnime, setSelectedAnime] = useState<AnimeEpisode | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handlePlayVideo = (anime: AnimeEpisode) => {
    setSelectedAnime(anime);
    setIsVideoPlaying(true);
  };

  const handleCloseVideo = () => {
    setIsVideoPlaying(false);
    setSelectedAnime(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 dark">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                AnimeStream
              </h1>
              <nav className="hidden md:flex space-x-6">
                {['Главная', 'Каталог', 'Новинки', 'Жанры', 'Профиль'].map((item) => (
                  <Button key={item} variant="ghost" className="text-foreground hover:text-primary">
                    {item}
                  </Button>
                ))}
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Icon name="Search" size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="User" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Video Player Modal */}
      {isVideoPlaying && selectedAnime && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center animate-fade-in">
          <div className="relative w-full max-w-4xl mx-4 animate-scale-in">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCloseVideo}
              className="absolute -top-12 right-0 text-white hover:text-primary z-10"
            >
              <Icon name="X" size={24} />
            </Button>
            <Card className="bg-black border-0 overflow-hidden">
              <CardContent className="p-0">
                <div className="relative aspect-video bg-black">
                  <video
                    className="w-full h-full"
                    controls
                    poster={selectedAnime.poster}
                    autoPlay
                  >
                    <source src="#" type="video/mp4" />
                    <track kind="subtitles" src="#" srcLang="ru" label="Русские" default />
                    Ваш браузер не поддерживает видео.
                  </video>
                  
                  {/* Subtitle overlay */}
                  <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-black/70 px-4 py-2 rounded-md">
                    <p className="text-white text-center font-medium">
                      [Субтитры]: Пример текста субтитров...
                    </p>
                  </div>
                </div>
                
                <div className="p-6 bg-card">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-card-foreground">{selectedAnime.title}</h3>
                      <p className="text-muted-foreground">Эпизод {selectedAnime.episode} из {selectedAnime.totalEpisodes}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Icon
                            key={i}
                            name="Star"
                            size={16}
                            className={i < Math.floor(selectedAnime.rating) ? 'text-yellow-500 fill-current' : 'text-gray-400'}
                          />
                        ))}
                        <span className="ml-2 text-sm text-muted-foreground">{selectedAnime.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="relative h-96 rounded-2xl overflow-hidden bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 animate-gradient-shift bg-[length:400%_400%]">
            <div className="absolute inset-0 bg-black/30" />
            <div className="relative h-full flex items-center justify-center text-center">
              <div className="max-w-2xl animate-fade-in">
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                  Смотри аниме
                  <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    без ограничений
                  </span>
                </h2>
                <p className="text-xl text-white/80 mb-8">
                  Тысячи эпизодов, HD качество, русские субтитры
                </p>
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Icon name="Play" size={20} className="mr-2" />
                  Начать просмотр
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* New Episodes Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold text-foreground">НОВЫЕ СЕРИИ АНИМЕ</h3>
            <Button variant="outline" className="hidden md:inline-flex">
              Показать все
              <Icon name="ArrowRight" size={16} className="ml-2" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {animeList.map((anime, index) => (
              <Card
                key={anime.id}
                className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-fade-in bg-card border-border/50"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => handlePlayVideo(anime)}
              >
                <CardContent className="p-0">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
                    <img
                      src={anime.poster}
                      alt={anime.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-primary/90 p-4 rounded-full">
                        <Icon name="Play" size={32} className="text-primary-foreground ml-1" />
                      </div>
                    </div>

                    {/* New Badge */}
                    {anime.isNew && (
                      <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                        НОВОЕ
                      </Badge>
                    )}

                    {/* Episode Count */}
                    <div className="absolute bottom-4 right-4">
                      <Badge variant="secondary" className="text-lg font-bold">
                        {anime.episode}
                        <span className="text-sm font-normal ml-1">серия</span>
                      </Badge>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {anime.title}
                      </h4>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                      <span>Сегодня, {anime.time}</span>
                      <Badge variant="outline">{anime.genre}</Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Icon
                            key={i}
                            name="Star"
                            size={14}
                            className={i < Math.floor(anime.rating) ? 'text-yellow-500 fill-current' : 'text-gray-400'}
                          />
                        ))}
                        <span className="ml-2 text-sm">{anime.rating}</span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-primary hover:text-primary/80"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePlayVideo(anime);
                        }}
                      >
                        Смотреть
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Bottom Navigation for Mobile */}
        <nav className="fixed bottom-0 left-0 right-0 md:hidden bg-background/90 backdrop-blur-md border-t border-border/50 z-40">
          <div className="flex items-center justify-around py-2">
            {[
              { icon: 'Home', label: 'Главная' },
              { icon: 'Grid3x3', label: 'Каталог' },
              { icon: 'Sparkles', label: 'Новинки' },
              { icon: 'Tag', label: 'Жанры' },
              { icon: 'User', label: 'Профиль' }
            ].map((item) => (
              <Button key={item.label} variant="ghost" size="sm" className="flex-col py-3 px-2">
                <Icon name={item.icon as any} size={20} />
                <span className="text-xs mt-1">{item.label}</span>
              </Button>
            ))}
          </div>
        </nav>
      </main>
    </div>
  );
};

export default Index;