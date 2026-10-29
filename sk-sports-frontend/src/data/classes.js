// =========================================================
// CLASSES / PROGRAMS
// Later this will come from Django:  GET /api/classes/
// "image" = file name inside public/images/ (add your own photos there)
// =========================================================

export const classCategories = ['All', 'Kids', 'Teens', 'Adults', 'Competition']

export const classes = [
  {
    id: 'little-dragons',
    name: 'Little Dragons',
    ages: 'Ages 4–7',
    category: 'Kids',
    belt: 'yellow',
    image: 'class-little-dragons.webp',
    duration: '45 mins',
    days: 'Mon, Wed, Fri',
    level: 'Beginner',
    short: 'Fun first steps into Taekwondo: balance, coordination, listening skills and basic kicks through games.',
    learn: ['Basic stances', 'Simple kicks', 'Balance games', 'Courtesy & respect'],
  },
  {
    id: 'junior-warriors',
    name: 'Junior Warriors',
    ages: 'Ages 8–12',
    category: 'Kids',
    belt: 'blue',
    image: 'class-junior-warriors.webp',
    duration: '60 mins',
    days: 'Tue, Thu, Sat',
    level: 'All Levels',
    short: 'Structured training in kicks, blocks and poomsae that builds focus, fitness and confidence.',
    learn: ['Kicks & blocks', 'Poomsae (forms)', 'Light sparring', 'Self-defense'],
  },
  {
    id: 'teens',
    name: 'Teens Program',
    ages: 'Ages 13–17',
    category: 'Teens',
    belt: 'green',
    image: 'class-teens.webp',
    duration: '60 mins',
    days: 'Mon, Wed, Fri',
    level: 'All Levels',
    short: 'Dynamic sessions for teenagers: advanced kicking, sparring drills, fitness and discipline.',
    learn: ['Advanced kicks', 'Sparring drills', 'Strength & flexibility', 'Self-defense'],
  },
  {
    id: 'adults',
    name: 'Adults Program',
    ages: 'Ages 18+',
    category: 'Adults',
    belt: 'red',
    image: 'class-adults.webp',
    duration: '60 mins',
    days: 'Mon, Wed, Fri (AM & PM)',
    level: 'All Levels',
    short: 'Get fit, de-stress and learn practical self-defense. No experience needed, start at any age.',
    learn: ['Fitness & stamina', 'Self-defense', 'Poomsae', 'Flexibility'],
  },
  {
    id: 'competition',
    name: 'Competition Team',
    ages: 'By selection',
    category: 'Competition',
    belt: 'black',
    image: 'class-competition.webp',
    duration: '90 mins',
    days: 'Tue, Thu, Sat',
    level: 'Advanced',
    short: 'High-intensity training for district, state and national level kyorugi (sparring) and poomsae events.',
    learn: ['Competition sparring', 'Speed & agility', 'Tournament strategy', 'Mental toughness'],
  },
]

export const whyTrain = [
  { icon: 'instructor', title: 'Certified Instructors', text: 'Trained and guided by Mr. Surendra Kumar & Mr. Shivam Kumar.' },
  { icon: 'ages', title: 'All Ages Programs', text: 'Batches for kids from age 4, teens and adults.' },
  { icon: 'shield', title: 'Real Self-Defense', text: 'Practical skills that build safety and confidence.' },
  { icon: 'fitness', title: 'Elite Fitness', text: 'Strength, flexibility, speed and stamina.' },
]

// EDIT: confirm fees with the client
export const fees = [
  { name: 'Monthly', price: '₹ 500 ', period: '/ month', features: ['3 classes a week', 'Any one batch', 'Belt grading guidance'] },
  {
    name: 'Quarterly',
    price: '₹ 1300',
    period: '/ 3 months',
    features: ['3 classes a week', 'Save vs monthly', 'Free academy T-shirt', 'Belt grading guidance'],
    highlight: true,
  },
  { name: 'Yearly', price: '₹5,000', period: '/ year', features: ['3 classes a week', 'Best value', 'Priority for tournaments'] },
]
