import axios from 'axios';
import { useEffect, useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import { GameBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';
import * as Dialog from '@radix-ui/react-dialog';

import 'keen-slider/keen-slider.min.css';
import './styles/main.css';
import logoImg from './assets/logo-nlw-esports.svg';
import { CreateAdModal } from './components/CreateAdModal';

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

function App() {
  const [games, setGames] = useState<Game[]>([]);

  const [ref] = useKeenSlider<HTMLDivElement>({
    breakpoints: {
      '(min-width: 400px)': {
        slides: { perView: 2, spacing: 5 },
      },
      '(min-width: 700px)': {
        slides: { perView: 3, spacing: 5 },
      },
      '(min-width: 1000px)': {
        slides: { perView: 5, spacing: 10 },
      },
    },
    slides: { perView: 1 },
  });

  useEffect(() => {
    axios('http://localhost:3333/games').then(({ data }) => setGames(data));
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto px-4 flex flex-col items-center my-20">
      <img src={logoImg} alt="" />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu{' '}
        <span className="text-transparent bg-nlw-gradient bg-clip-text">
          duo
        </span>{' '}
        está aqui.
      </h1>

      <div ref={ref} className="keen-slider mt-16">
        {games.map(({ id, title, bannerUrl, _count }, index) => (
          <GameBanner
            key={id}
            title={title}
            bannerUrl={bannerUrl}
            adsCount={_count.ads}
            className={`keen-slider__slide number-slide${index + 1}`}
          />
        ))}
      </div>

      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal games={games} />
      </Dialog.Root>
    </div>
  );
}

export default App;
