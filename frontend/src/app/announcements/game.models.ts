export interface Game {
  name: string;
  ranks: string[];
}

export const games: Game[] = [
  {
    name: 'League of legends',
    ranks: [
      'Bronze V',
      'Bronze IV',
      'Bronze III',
      'Bronze II',
      'Bronze I',
      'Silver V',
      'Silver IV',
      'Silver III',
      'Silver II',
      'Silver I',
      'Gold V',
      'Gold IV',
      'Gold III',
      'Gold II',
      'Gold I',
      'Platinum V',
      'Platinum IV',
      'Platinum III',
      'Platinum II',
      'Platinum I',
      'Diamond V',
      'Diamond IV',
      'Diamond III',
      'Diamond II',
      'Diamond I'
    ]
  },
  {
    name: 'CS:GO',
    ranks: []
  },
  {
    name: 'Among us',
    ranks: []
  }
];
