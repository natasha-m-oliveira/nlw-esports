import { Router } from 'express';
import { validate } from 'express-jsonschema';
import { PrismaClient } from '@prisma/client';
import { convertHourStringToMinutes } from './utils/convert-hour-string-to-minutes';
import { convertMinutesToHourString } from './utils/conver-minutes-to-hour-string';
import { createAt } from './helpers/create-ad';

const router = Router();

const prisma = new PrismaClient({
  log: ['query'],
});

router.get('/games', async (request, response) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        },
      },
    },
  });
  return response.json(games);
});

router.get('/games/:id/ads', async (request, response) => {
  const gameId: any = request.params.id;
  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourStart: true,
      hourEnd: true,
    },
    where: {
      gameId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return response.json(
    ads.map((ad) => {
      return {
        ...ad,
        weekDays: ad.weekDays.split(','),
        hourStart: convertMinutesToHourString(ad.hourStart),
        hourEnd: convertMinutesToHourString(ad.hourEnd),
      };
    }),
  );
});

router.get('/ads/:id/discord', async (request, response) => {
  const adsId: any = request.params.id;
  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: adsId,
    },
  });
  return response.json({
    discord: ad.discord,
  });
});

router.post('/games/:id/ads', async (request, response) => {
  const gameId: any = request.params.id;
  const body = request.body;

  const ad = await prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      weekDays: body.weekDays.join(','),
      hourStart: convertHourStringToMinutes(body.hourStart),
      hourEnd: convertHourStringToMinutes(body.hourEnd),
      useVoiceChannel: body.useVoiceChannel,
    },
  });
  return response.status(201).json(ad);
});

export { router };
