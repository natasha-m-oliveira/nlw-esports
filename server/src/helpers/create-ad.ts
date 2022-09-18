export const createAt = {
  type: 'object',
  required: [
    'name',
    'yearsPlaying',
    'discord',
    'weekDays',
    'hourStart',
    'hourEnd',
    'useVoiceChannel',
  ],
  properties: {
    name: {
      type: 'string',
      format: 'alphanumeric',
      minLength: 3,
    },
    yearsPlaying: {
      type: 'number',
      minimum: 0,
    },
    discord: {
      type: 'string',
      format: 'alphanumeric',
      minLength: 3,
    },
    weekDays: {
      type: 'array',
      items: {
        type: 'number',
        minimum: 0,
        maximum: 6,
      },
    },
    hourStart: {
      type: 'string',
      pattern: '^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$',
    },
    hourEnd: {
      type: 'string',
      pattern: '^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$',
    },
    useVoiceChannel: {
      type: 'boolean',
    },
  },
};
