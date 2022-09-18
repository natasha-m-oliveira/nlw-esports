import { useState } from 'react';
import { useQuery } from 'react-query';
import ReactLoading from 'react-loading';
import { useKeenSlider } from 'keen-slider/react';
import { GameBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';
import { CreateAdModal } from './components/CreateAdModal';
import { WheelControls } from './utils/wheel-controls';
import * as Dialog from '@radix-ui/react-dialog';

import 'keen-slider/keen-slider.min.css';
import './styles/main.css';
import logoImg from './assets/logo-nlw-esports.svg';
import axios from 'axios';

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

function App() {
  const [options, setOptions] = useState({});
  const [ref] = useKeenSlider<HTMLDivElement>(options, [WheelControls]);
  const { data: games, isFetching } = useQuery<Game[]>(
    'getGames',
    async () => {
      const responde = await axios.get('http://localhost:3333/games');
      setOptions({
        breakpoints: {
          '(min-width: 400px)': {
            slides: { perView: 2, spacing: 10 },
          },
          '(min-width: 700px)': {
            slides: { perView: 5, spacing: 20 },
          },
          '(min-width: 1200px)': {
            slides: { perView: 6, spacing: 20 },
          },
        },
        slides: { origin: 'center', perView: 1, spacing: 10 },
      });
      return responde.data;
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 5000 * 60, // 5 minutes
    },
  );

  return (
    <div className="max-w-2xl mx-auto px-4 flex flex-col items-center my-20 md:max-w-[1344px]">
      {isFetching && <ReactLoading type="spin" color="#9572FC" />}
      <img src={logoImg} alt="" />
      <h1 className="text-4xl text-white font-black mt-20 md:text-6xl">
        Seu{' '}
        <span className="text-transparent bg-nlw-gradient bg-clip-text">
          duo
        </span>{' '}
        está aqui.
      </h1>

      <div ref={ref} className="keen-slider mt-16">
        {games?.map(({ id, title, bannerUrl, _count }, index) => (
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
        <CreateAdModal games={games ? games : []} />
      </Dialog.Root>
    </div>
  );
}

export default App;
