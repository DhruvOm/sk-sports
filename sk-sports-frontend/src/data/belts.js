// =========================================================
// BELT PROGRESSION (Kukkiwon-style syllabus)
// EDIT: academies differ - confirm each belt's syllabus with
// Mr. Surendra Kumar before going live.
// =========================================================

export const belts = [
  {
    id: 'white',
    name: 'White Belt',
    color: 'var(--belt-white)',
    meaning: 'Purity & a beginner’s mind',
    duration: '2–3 months',
    requirements: {
      stances: ['Natural stance (Ap Seogi)', 'Front stance (Ap Kubi)'],
      hands: ['Middle punch (Momtong Jireugi)', 'Low block (Arae Makki)'],
      kicks: ['Front snap kick (Ap Chagi)', 'Front rising kick (Ap Ollyeo Chagi)'],
      poomsae: 'Taegeuk Il Jang',
      character: ['Courtesy', 'Discipline'],
      breaking: 'Not required',
    },
    readiness: ['24 classes attended', 'Taegeuk Il Jang performed', 'Dojang etiquette sign-off'],
  },
  {
    id: 'yellow',
    name: 'Yellow Belt',
    color: 'var(--belt-yellow)',
    meaning: 'The earth, where the seed takes root',
    duration: '3 months',
    requirements: {
      stances: ['Walking stance', 'Horse-riding stance (Juchum Seogi)'],
      hands: ['Inner middle block (Momtong An Makki)', 'High block (Eolgul Makki)'],
      kicks: ['Roundhouse kick (Dollyo Chagi)', 'Axe kick (Naeryeo Chagi)'],
      poomsae: 'Taegeuk Ee Jang',
      character: ['Respect', 'Perseverance'],
      breaking: 'Palm strike (optional)',
    },
    readiness: ['30 classes attended', 'Taegeuk Ee Jang performed', 'Basic kicks assessed'],
  },
  {
    id: 'green',
    name: 'Green Belt',
    color: 'var(--belt-green)',
    meaning: 'Growth, like a plant beginning to grow',
    duration: '3–4 months',
    requirements: {
      stances: ['Back stance (Dwit Kubi)', 'Tiger stance (Beom Seogi)'],
      hands: ['Knife-hand block (Sonnal Makki)', 'Knife-hand strike (Sonnal Chigi)'],
      kicks: ['Side kick (Yeop Chagi)', 'Push kick (Mireo Chagi)'],
      poomsae: 'Taegeuk Sam Jang & Sa Jang',
      character: ['Integrity', 'Self-control'],
      breaking: 'Front snap kick',
    },
    readiness: ['36 classes attended', 'Two Taegeuk forms', 'Step sparring'],
  },
  {
    id: 'blue',
    name: 'Blue Belt',
    color: 'var(--belt-blue)',
    meaning: 'The sky, reaching higher',
    duration: '4 months',
    requirements: {
      stances: ['Cross stance (Kkoa Seogi)', 'Stance transitions'],
      hands: ['Double knife-hand block', 'Elbow strike (Palkup Chigi)'],
      kicks: ['Back kick (Dwi Chagi)', 'Hook kick (Huryeo Chagi)'],
      poomsae: 'Taegeuk Oh Jang & Yuk Jang',
      character: ['Leadership', 'Perseverance'],
      breaking: 'Side kick',
    },
    readiness: ['40 classes attended', 'Two Taegeuk forms', 'Free sparring rounds'],
  },
  {
    id: 'red',
    name: 'Red Belt',
    color: 'var(--belt-red)',
    meaning: 'Caution & control of power',
    duration: '4–6 months',
    requirements: {
      stances: ['All stances with power', 'Balance under pressure'],
      hands: ['Combination blocks', 'Counter-attacks'],
      kicks: ['Spinning hook kick (Dwi Huryeo Chagi)', 'Jumping kicks (Twieo Chagi)'],
      poomsae: 'Taegeuk Chil Jang & Pal Jang',
      character: ['Self-control', 'Indomitable spirit'],
      breaking: 'Spinning or jumping kick',
    },
    readiness: ['48 classes attended', 'All 8 Taegeuk forms', 'Competition-style sparring'],
  },
  {
    id: 'black',
    name: 'Black Belt',
    color: 'var(--belt-black)',
    meaning: 'Maturity & mastery of the basics',
    duration: 'Poom / Dan test',
    requirements: {
      stances: ['Complete stance mastery'],
      hands: ['Full hand technique syllabus'],
      kicks: ['All kicks incl. jumping & spinning'],
      poomsae: 'All Taegeuk forms + Koryo',
      character: ['All five tenets', 'Helping juniors'],
      breaking: 'Multiple board techniques',
    },
    readiness: ['Minimum training period met', 'Poom/Dan test registration', 'Master’s recommendation'],
  },
]

export const requirementGroups = [
  { key: 'stances', title: 'Stances & Footwork' },
  { key: 'hands', title: 'Hand Strikes & Blocks' },
  { key: 'kicks', title: 'Kicks (Chagi)' },
  { key: 'poomsae', title: 'Forms (Poomsae)' },
  { key: 'character', title: 'Character & Tenets' },
  { key: 'breaking', title: 'Board Breaking' },
]
