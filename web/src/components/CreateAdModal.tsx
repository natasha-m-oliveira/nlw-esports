import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { Check, GameController } from 'phosphor-react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { Input } from './Form/Input';
import { Select } from './Form/Select';
import { DAYS } from '../utils/days';

interface Game {
  id: string;
  title: string;
}

interface Inputs {
  game: string;
  name: string;
  yearsPlaying: string;
  discord: string;
  weekDays: string[];
  hourStart: string;
  hourEnd: string;
  useVoiceChannel: boolean;
}

interface CreateAdModalProps {
  games: Game[];
}

export function CreateAdModal({ games }: CreateAdModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<Inputs>();

  const [game, setGame] = useState('');
  const [weekDays, setWeekDays] = useState<String[]>([]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await axios.post(`http://localhost:3333/games/${game}/ads`, {
        ...data,
        yearsPlaying: Number(data.yearsPlaying),
        weekDays: data.weekDays.map(Number),
        useVoiceChannel: data.useVoiceChannel ? data.useVoiceChannel : false,
      });
      alert('Anúncio criado com sucesso');
      reset();
      setGame('');
      setWeekDays([]);
    } catch (error) {
      console.log(error);
      alert('Erro ao criar o anúncio!');
    }
  };

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

      <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[500px] shadow-lg shadow-black/25">
        <Dialog.Title className="text-3xl font-black">
          Publique um anúncio
        </Dialog.Title>
        <form
          className="mt-8 flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="game" className="font-semibold">
              Qual o game?
            </label>
            <Select
              id="game"
              placeholder="Selecione o game que deseja jogar"
              selected={game}
              {...(register('game', { required: true }),
              {
                onValueChange: (value) => {
                  setValue('game', value as string);
                  setGame(value);
                },
              })}
              className={
                errors.game && !game
                  ? 'border-2 border-rose-500'
                  : 'border-transparent'
              }
              options={games}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="name">Seu nome (ou nickname)</label>
            <Input
              type="text"
              id="name"
              placeholder="Como te chamam dentro do game?"
              {...register('name', { required: true })}
              className={
                errors.name ? 'border-2 border-rose-500' : 'border-transparent'
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
              <Input
                type="number"
                id="yearsPlaying"
                placeholder="Tudo bem ser ZERO"
                {...register('yearsPlaying', { required: true })}
                className={
                  errors.yearsPlaying
                    ? 'border-2 border-rose-500'
                    : 'border-transparent'
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="discord">Qual seu Discord?</label>
              <Input
                type="text"
                id="discord"
                placeholder="Usuario#0000"
                {...register('discord', { required: true })}
                className={
                  errors.discord
                    ? 'border-2 border-rose-500'
                    : 'border-transparent'
                }
              />
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="weekDays">Quando costuma jogar?</label>
              <ToggleGroup.Root
                type="multiple"
                className="grid grid-cols-4 gap-2"
                {...(register('weekDays', { required: true }),
                {
                  onValueChange: (value: string[]) => {
                    setValue('weekDays', value);
                    setWeekDays(value);
                  },
                })}
              >
                {DAYS.map(({ value, title, text }) => (
                  <ToggleGroup.Item
                    key={value}
                    value={value}
                    title={title}
                    className={`w-8 h-8 rounded ${
                      weekDays.includes(value) ? 'bg-violet-500' : 'bg-zinc-900'
                    } ${
                      errors.weekDays && !weekDays.length
                        ? 'border-2 border-rose-500'
                        : 'border-transparent'
                    }`}
                  >
                    {text}
                  </ToggleGroup.Item>
                ))}
              </ToggleGroup.Root>
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="hourStart">Qual horário do dia?</label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="time"
                  id="hourStart"
                  placeholder="De"
                  {...register('hourStart', { required: true })}
                  className={
                    errors.hourStart
                      ? 'border-2 border-rose-500'
                      : 'border-transparent'
                  }
                />
                <Input
                  type="time"
                  id="hourEnd"
                  placeholder="Até"
                  {...register('hourEnd', { required: true })}
                  className={
                    errors.hourEnd
                      ? 'border-2 border-rose-500'
                      : 'border-transparent'
                  }
                />
              </div>
            </div>
          </div>

          <label className="mt-2 flex items-center gap-2 text-sm">
            <Checkbox.Root
              className="w-6 h-6 p-1 rounded  bg-zinc-900"
              {...(register('useVoiceChannel'),
              {
                onCheckedChange: (value) => {
                  setValue('useVoiceChannel', value as boolean);
                },
              })}
            >
              <Checkbox.Indicator>
                <Check className="w-4 h-4 text-emerald-400" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            Costumo me conectar ao chat de voz
          </label>

          <footer className="mt-4 flex justify-end gap-4">
            <Dialog.Close
              type="button"
              className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
            >
              Cancelar
            </Dialog.Close>
            <button
              type="submit"
              className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
            >
              <GameController className="w-6 h-6" />
              Encontrar duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
