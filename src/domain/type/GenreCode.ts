export type GenreCodeItem = {
  code: string;
  displayName: string;
  icon: ReturnType<typeof require>;
};

export const GenreCode = {
  THEATER: {
    code: 'AAAA',
    displayName: '연극',
    icon: require('../../assets/images/ic_play.png'),
  },
  MUSICAL: {
    code: 'GGGA',
    displayName: '뮤지컬',
    icon: require('../../assets/images/ic_musical.png'),
  },
  CLASSIC: {
    code: 'CCCA',
    displayName: '클래식',
    icon: require('../../assets/images/ic_west_music.png'),
  },
  KOREAN_MUSIC: {
    code: 'CCCC',
    displayName: '국악',
    icon: require('../../assets/images/ic_koeran_music.png'),
  },
  POP_MUSIC: {
    code: 'CCCD',
    displayName: '대중음악',
    icon: require('../../assets/images/ic_mass_music.png'),
  },
  DANCE: {
    code: 'BBBC',
    displayName: '무용',
    icon: require('../../assets/images/ic_dancing.png'),
  },
  POP_DANCE: {
    code: 'BBBR',
    displayName: '대중무용',
    icon: require('../../assets/images/ic_mess_dancing.png'),
  },
  CIRCUS_MAGIC: {
    code: 'EEEB',
    displayName: '서커스/마술',
    icon: require('../../assets/images/ic_circus.png'),
  },
  KID: {
    code: 'KID',
    displayName: '아동',
    icon: require('../../assets/images/ic_kids.png'),
  },
  OPEN_RUN: {
    code: 'OPEN',
    displayName: '오픈런',
    icon: require('../../assets/images/ic_open_run.png'),
  },
} as const satisfies Record<string, GenreCodeItem>;

export const GenreCodes = Object.values(GenreCode);

export function toGenreCode(
  code: string | null | undefined,
): GenreCodeItem | undefined {
  return GenreCodes.find(genre => genre.code === code);
}
