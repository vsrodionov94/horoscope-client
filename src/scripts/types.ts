type State = {
  vkId: number;
  sign?: Signs;
  screen?: Screens;
  day: number;
  stars: number;
};

enum Screens {
  Today = 'Сегодня',
  Tomorrow = 'Завтра',
  Week = 'Неделя', 
}

enum Fonts {
  Nasalization = 'Nasalization',
  GothaPro = 'GothaPro',
};

enum Signs {
  Aries = 'aries',
  Taurus = 'taurus',
  Gemini = 'gemini',
  Cancer = 'cancer',
  Leo = 'leo',
  Virgo = 'virgo',
  Libra = 'libra',
  Scorpio = 'scorpio',
  Sagittarius = 'sagittarius',
  Capricorn = 'capricorn',
  Aquarius = 'aquarius',
  Pisces = 'pisces',
};

export {
  State,
  Screens,
  Fonts,
  Signs,
};