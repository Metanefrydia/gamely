export interface Game {
  name: string;
  logo?: string;
  ranks: string[];
}

export const games: Game[] = [
  {
    name: 'League of legends',
    logo: './../../assets/img/logo/league-of-legends-logo.png',
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
    logo: './../../assets/img/logo/cs-go-logo.png',
    ranks: [
      'Silver I',
      'Silver II',
      'Silver III',
      'Silver IV',
      'Silver Elite Master',
      'Gold Nova I',
      'Gold Nova II',
      'Gold Nova III',
      'Gold Nova Master',
      'Master Guardian I',
      'Master Guardian II',
      'Master Guardian Elite',
      'Distinguished Master Guardian',
      'Legendary Eagle',
      'Legendary Eagle Master',
      'Supreme Master First Class',
      'The Global Elite',
    ]
  },
  {
    name: 'Among us',
    logo: './../../assets/img/logo/among-us-logo.png',
    ranks: []
  },
  {
    name: 'Fortnite',
    logo: './../../assets/img/logo/fortnite-logo.png',
    ranks: []
  },
  {
    name: 'Overwatch',
    logo: './../../assets/img/logo/overwatch-logo.png',
    ranks: [
      'Bronze',
      'Silver',
      'Gold',
      'Platinum',
      'Diamond',
      'Master',
      'Grandmaster'
    ]
  },
  {
    name: 'Apex Legends',
    logo: './../../assets/img/logo/apex-logo.png',
    ranks: [
      'Bronze IV',
      'Bronze III',
      'Bronze II',
      'Bronze I',
      'Silver IV',
      'Silver III',
      'Silver II',
      'Silver I',
      'Gold IV',
      'Gold III',
      'Gold II',
      'Gold I',
      'Platinum IV',
      'Platinum III',
      'Platinum II',
      'Platinum I',
      'Apex Predator'
    ]
  },
  {
    name: 'Rocket League',
    logo: './../../assets/img/logo/rocket-league-logo.png',
    ranks: [
      'Bronze III',
      'Bronze II',
      'Bronze I',
      'Silver III',
      'Silver II',
      'Silver I',
      'Gold III',
      'Gold II',
      'Gold I',
      'Platinum III',
      'Platinum II',
      'Platinum I',
      'Diamond III',
      'Diamond II',
      'Diamond I',
      'Champion III',
      'Champion II',
      'Champion I',
      'Grand Champion III',
      'Grand Champion II',
      'Grand Champion I',
      'Supersonic Legend'
    ]
  },
  {
    name: 'Dota 2',
    logo: './../../assets/img/logo/dota-2-logo.png',
    ranks: [
      'Herald',
      'Guardian',
      'Crusader',
      'Archon',
      'Legend',
      'Ancient',
      'Divine',
      'Immortal'
    ]
  },
  {
    name: 'Valorant',
    logo: './../../assets/img/logo/valorant-logo.png',
    ranks: [
      'Iron III',
      'Iron II',
      'Iron I',
      'Bronze III',
      'Bronze II',
      'Bronze I',
      'Silver III',
      'Silver II',
      'Silver I',
      'Gold III',
      'Gold II',
      'Gold I',
      'Platinum III',
      'Platinum II',
      'Platinum I',
      'Diamond III',
      'Diamond II',
      'Diamond I',
      'Immortal',
      'Radiant'
    ]
  }
];
