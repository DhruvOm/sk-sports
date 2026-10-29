// =========================================================
// ABOUT, GALLERY, TESTIMONIALS, FAQs, STATS
// EDIT: everything here is placeholder content to confirm with the client.
// Images: put photos in public/images/ with these exact file names.
// =========================================================

// ---------- Instructors ----------
export const instructors = [
  {
    id: 'surendra-kumar',
    name: 'Mr. Surendra Kumar',
    role: 'Head Trainer & Founder',
    rank: 'Black Belt · Dan rank (EDIT)',
    image: 'trainer-surendra-kumar.jpg',
    experience: '25+ Years Experience',
    // EDIT: only list real, verifiable achievements & certifications
    achievements: [
      'Certification / affiliation (EDIT)',
      'Tournament achievement (EDIT)',
      'Coaching achievement (EDIT)',
    ],
    quote: 'Taekwondo is not just about winning a match. It is about conquering yourself.',
  },
  {
    id: 'shivam-kumar',
    name: 'Mr. Shivam Kumar',
    role: 'Co-Trainer',
    rank: 'Black Belt · Dan rank (EDIT)',
    image: 'trainer-shivam-kumar.jpg',
    specialty: 'Sparring & Fitness (EDIT)',
    experience: '6+ Years Experience',
    achievements: ['Certification (EDIT)', 'Achievement (EDIT)'],
  },
]

export const about = {
  established: '20XX', // EDIT
  story: [
    'SK Sports Taekwondo Academy was founded in Lucknow by Mr. Surendra Kumar with one simple goal: to make high-quality Taekwondo training available to every child and adult in the city.',
    'What started as a small batch of students has grown into a family of athletes who train for fitness, self-defense, discipline and competition. Together with co-trainer Mr. Shivam Kumar, we focus on strong basics, good character and real confidence.',
  ],
  mission: 'To empower lives through authentic martial arts training, building discipline, confidence and respect in every student.',
  vision: 'To be Lucknow’s leading Taekwondo academy, producing champions on the mat and responsible citizens off it.',
  // EDIT: real milestones
  timeline: [
    { year: '20XX', title: 'Academy founded', text: 'First batch starts training in Lucknow.' },
    { year: '20XX', title: 'First tournament', text: 'Students compete at district level.' },
    { year: '20XX', title: '100 students', text: 'The SK Sports family keeps growing.' },
    { year: '20XX', title: 'First black belts', text: 'Our first students earn their black belts.' },
    { year: '20XX', title: 'What’s next', text: 'New batches and state-level champions.' },
  ],
  // EDIT: only add real affiliations
  affiliations: ['Affiliation 1', 'Affiliation 2', 'Affiliation 3', 'Affiliation 4'],
}

export const tenets = [
  { icon: 'courtesy', name: 'Courtesy', text: 'Respect for others and good manners.' },
  { icon: 'integrity', name: 'Integrity', text: 'Knowing right from wrong.' },
  { icon: 'perseverance', name: 'Perseverance', text: 'Never giving up on a goal.' },
  { icon: 'selfcontrol', name: 'Self-Control', text: 'Control of mind and body.' },
  { icon: 'spirit', name: 'Indomitable Spirit', text: 'Courage in the face of difficulty.' },
]

// EDIT: real numbers
export const stats = [
  { value: 'XXX+', label: 'Students Trained', color: 'orange' },
  { value: 'XX+', label: 'Medals Won', color: 'blue' },
  { value: 'XX+', label: 'Black Belts', color: 'orange' },
  { value: 'XX+', label: 'Years Experience', color: 'blue' },
]

// ---------- Gallery ----------
export const galleryCategories = ['All', 'Training', 'Belt Grading', 'Tournaments', 'Events']

export const galleryFeatured = [
  { image: 'gallery-featured-1.jpg', title: 'District Championship', date: 'OCT 2026' },
  { image: 'gallery-featured-2.jpg', title: 'Belt Grading Ceremony', date: 'SEP 2026' },
  { image: 'gallery-featured-3.jpg', title: 'Summer Training Camp', date: 'JUN 2026' },
]

export const galleryItems = [
  { image: 'gallery-1.jpg', title: 'High-kick practice', category: 'Training', shape: 'tall' },
  { image: 'gallery-2.jpg', title: 'Sparring drill', category: 'Training', shape: 'square' },
  { image: 'gallery-3.jpg', title: 'Yellow belt promotion', category: 'Belt Grading', shape: 'wide' },
  { image: 'gallery-4.jpg', title: 'Medal podium', category: 'Tournaments', shape: 'square' },
  { image: 'gallery-5.jpg', title: 'Kids batch', category: 'Training', shape: 'tall' },
  { image: 'gallery-6.jpg', title: 'Team photo', category: 'Events', shape: 'wide' },
  { image: 'gallery-7.jpg', title: 'Poomsae performance', category: 'Tournaments', shape: 'square' },
  { image: 'gallery-8.jpg', title: 'Board breaking', category: 'Belt Grading', shape: 'tall' },
  { image: 'gallery-9.jpg', title: 'Annual function demo', category: 'Events', shape: 'square' },
  { image: 'gallery-10.jpg', title: 'Flexibility training', category: 'Training', shape: 'square' },
  { image: 'gallery-11.jpg', title: 'Black belt ceremony', category: 'Belt Grading', shape: 'wide' },
  { image: 'gallery-12.jpg', title: 'State championship', category: 'Tournaments', shape: 'tall' },
]

// EDIT: add YouTube video links (or leave empty)
export const videos = [
  { image: 'video-1.jpg', title: 'Demo Performance', url: '' },
  { image: 'video-2.jpg', title: 'Tournament Highlights', url: '' },
  { image: 'video-3.jpg', title: 'Kids Class Fun', url: '' },
]

// ---------- Testimonials ----------
// EDIT: replace with REAL testimonials (with permission). Never publish made-up reviews.
export const testimonials = [
  { quote: 'Add a real testimonial from a parent here: what changed for their child after joining.', name: 'Parent name', detail: 'Parent of student, Age X' },
  { quote: 'Add a real testimonial from a student here: their experience with the trainers and classes.', name: 'Student name', detail: 'Adults batch' },
  { quote: 'Add a real testimonial about the free trial class or the academy environment.', name: 'Parent name', detail: 'Parent of student, Age X' },
]

// ---------- FAQs ----------
export const faqs = {
  classes: [
    { q: 'What should my child wear for the first class?', a: 'Comfortable sports clothes (T-shirt and track pants) are fine for the trial. A dobok (uniform) is needed after joining, and we can help you get one.' },
    { q: 'Is the first class really free?', a: 'Yes! Book a free trial, attend one full class and meet the trainers. No payment or commitment needed.' },
    { q: 'What is the minimum age to join?', a: 'Children can join from age 4 in our Little Dragons batch. There is no upper age limit for adults.' },
    { q: 'How do belt grading tests work?', a: 'Grading tests are held every few months. Students who meet attendance and skill requirements are recommended by the trainer.' },
  ],
  contact: [
    { q: 'How do I enroll?', a: 'Book a free trial online or visit the academy. After the trial, fill in the admission form and pay the first month’s fee.' },
    { q: 'What are the fees and payment plans?', a: 'We offer monthly, quarterly and yearly plans. Contact us or visit the academy for current fees.' },
    { q: 'What should I bring to the first class?', a: 'Comfortable clothes, a water bottle and a small towel. Please arrive 10 minutes early.' },
    { q: 'Is parking available?', a: 'EDIT: add parking details for the academy location.' },
  ],
  trial: [
    { q: 'Do I need a uniform for the trial?', a: 'No. Comfortable sports clothes are perfect for your trial class.' },
    { q: 'Can parents watch?', a: 'Yes, parents are welcome to watch the trial class. For students under 18, a parent or guardian must be present.' },
    { q: 'How do I reschedule?', a: 'Just message us on WhatsApp or call us and we will move your trial to another batch.' },
  ],
}

export const trialSteps = [
  { title: 'Warm-up', time: '10 min' },
  { title: 'Basic Kicks', time: '15 min' },
  { title: 'Fun Drills', time: '20 min' },
  { title: 'Meet the Master', time: '10 min' },
]
