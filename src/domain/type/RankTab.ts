export type RankTabItem = {
  display: string;
  startRank: number;
  endRank: number;
};

export const RankTab = {
  TOP_1_10: {
    display: '1-10위',
    startRank: 1,
    endRank: 10,
  },
  TOP_11_20: {
    display: '11-20위',
    startRank: 11,
    endRank: 20,
  },
  TOP_21_30: {
    display: '21-30위',
    startRank: 21,
    endRank: 30,
  },
  TOP_31_40: {
    display: '31-40위',
    startRank: 31,
    endRank: 40,
  },
  TOP_41_50: {
    display: '41-50위',
    startRank: 41,
    endRank: 50,
  },
};

export const rankTabList = Object.values(RankTab);
