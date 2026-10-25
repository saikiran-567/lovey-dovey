/**
 * PERSONALIZE YOUR WEBSITE HERE
 * -----------------------------
 * Replace the placeholder values with your own details. The rest of the site
 * reads from this file, so you do not need to edit component code for normal
 * personalization. Do not put private credentials here: browser code is public.
 */
export const loveConfig = {
  girlfriendName: 'GIRLFRIEND_NAME',
  yourName: 'MY_NAME',
  personalNickname: 'my favorite person',
  anniversaryDate: 'OUR_ANNIVERSARY', // Example format: '14 February 2024'
  firstMeetingDate: 'OUR_FIRST_MEMORY',
  accessPassword: 'our-little-secret', // Static frontend gate only; see README security note.
  intro: 'I made this little world for you. Every color, every word, every little detail is here because you mean more to me than words can explain.',
  heartHoverMessage: 'my favorite place is beside you ♡',
  welcomeNote: 'A tiny corner of the universe, filled with little reminders of how loved you are.',
  surpriseMessage: 'Here is your little reminder: you are loved in the quiet moments, in the silly moments, and in all the moments in between. I hope this makes you smile today and whenever you need a reminder.',
  letterDate: 'A day I wanted to make a little more special',
  letterGreeting: 'To My Favorite Person',
  letterBody: [
    'My love,',
    'I wanted to make something that feels a little like the way I feel when I think about you: warm, soft, and full of tiny details. This little website is only a small way of saying something that words can never quite fit around.',
    'Thank you for being exactly who you are. I hope you always remember that you deserve tenderness, patience, laughter, and a love that keeps showing up. I am excited for all the ordinary days and unexpected adventures that are still waiting for us.',
    'Whenever you need a little reminder, come back here and remember that someone made this whole tiny world just to make you feel special.',
    'With all my love, always.'
  ],
  signature: 'MY_NAME',
  finalMessage: 'This is not the end of our story. It is just one little page in everything we still get to write together. ❤️',

  // These are examples, not real relationship facts. Replace titles, dates and stories.
  memories: [
    {
      date: 'OUR_FIRST_MEMORY',
      title: 'The day our story began',
      description: 'Replace this example with the story of how your journey together began. Add the little detail you never want to forget.',
      image: 'images/memory-01.svg',
      icon: 'sparkles',
    },
    {
      date: 'A FAVORITE DATE',
      title: 'A conversation that stayed with me',
      description: 'Write about a conversation, an unexpected laugh, or a moment that felt uniquely yours.',
      image: 'images/memory-02.svg',
      icon: 'message-circle',
    },
    {
      date: 'A LITTLE MOMENT',
      title: 'The smile I wanted to keep',
      description: 'Add a small memory that still makes you smile whenever it comes back to you.',
      image: 'images/memory-03.svg',
      icon: 'heart',
    },
    {
      date: 'A DAY TO REMEMBER',
      title: 'A memory worth keeping',
      description: 'Use this space for a special day, a kind gesture, or a moment that brought you closer.',
      image: 'images/memory-04.svg',
      icon: 'flower-2',
    },
  ],

  // Replace the sample images in public/images with your own photos, then update paths/captions.
  photos: [
    { src: 'images/memory-01.svg', caption: 'Replace with a favorite photo and its story.', date: 'A favorite day', category: 'Us', featured: true, alt: 'Decorative placeholder for a favorite photograph' },
    { src: 'images/memory-02.svg', caption: 'A little moment worth remembering.', date: 'A little moment', category: 'Little things', featured: false, alt: 'Decorative placeholder with soft rose shapes' },
    { src: 'images/memory-03.svg', caption: 'Add the caption you would write on the back of a photo.', date: 'Just because', category: 'Us', featured: true, alt: 'Decorative placeholder with a romantic sunset palette' },
    { src: 'images/memory-04.svg', caption: 'A memory that deserves its own little frame.', date: 'A beautiful day', category: 'Days out', featured: false, alt: 'Decorative placeholder with pearl and pink shapes' },
    { src: 'images/memory-05.svg', caption: 'Replace this illustration with a real memory.', date: 'Our kind of magic', category: 'Little things', featured: false, alt: 'Decorative placeholder with lavender and rose tones' },
    { src: 'images/memory-06.svg', caption: 'One more space for a moment you love.', date: 'More to come', category: 'Us', featured: false, alt: 'Decorative placeholder with a soft pink heart' },
  ],

  // Example reasons; make them specific to her when you personalize the site.
  reasons: [
    { front: 'Your smile', back: 'The way you smile can make an ordinary moment feel a little brighter.' },
    { front: 'Your kind heart', back: 'I admire the care and softness you bring into the world.' },
    { front: 'Our conversations', back: 'I love having a little world where we can talk, laugh, and be ourselves.' },
    { front: 'Your little habits', back: 'The small things you do are often the things I remember most.' },
    { front: 'Your courage', back: 'I hope you see how much strength there is in the way you keep going.' },
    { front: 'The way you care', back: 'Your thoughtfulness matters more than you may realize.' },
    { front: 'Your laugh', back: 'I would gladly make room for more laughter with you, every day.' },
    { front: 'Simply you', back: 'You do not have to do anything extra to be someone worth loving.' },
  ],

  quotes: [
    'If I could keep one moment forever, I would choose the ordinary moment when I get to be with you.',
    'You make my favorite memories feel like places I could visit a thousand times.',
    'Somehow, the world feels softer whenever you are part of my day.',
    'You are not just someone I love. You are one of the reasons my world feels beautiful.',
    'My favorite kind of forever is made from little days, familiar laughter, and choosing each other again.',
    'There is a quiet kind of magic in being fully yourself beside someone who feels like home.',
  ],

  // Use editable placeholder answers. Scored questions compare the chosen answer to correctAnswer.
  quiz: [
    {
      question: 'What was one of the first things we talked about?',
      choices: ['EDIT: first topic', 'EDIT: another topic', 'EDIT: a funny moment', 'EDIT: a place'],
      correctAnswer: 'EDIT: first topic',
      scored: true,
      correctFeedback: 'Look at you remembering our little beginnings! ❤️',
      incorrectFeedback: 'That is okay, baby. We have so many more memories to make. 💕',
    },
    {
      question: 'Which little moment would I happily relive?',
      choices: ['EDIT: favorite memory', 'EDIT: a day out', 'EDIT: a conversation', 'EDIT: another moment'],
      correctAnswer: 'EDIT: favorite memory',
      scored: true,
      correctFeedback: 'You know the little details that make us, us. 💗',
      incorrectFeedback: 'A good excuse to make another favorite memory together. 🥰',
    },
    {
      question: 'Which word best describes our relationship?',
      choices: ['Sweet', 'Adventurous', 'Comforting', 'All of these'],
      scored: false,
      correctFeedback: 'There is no wrong answer when it comes to us. ❤️',
      incorrectFeedback: 'There is no wrong answer when it comes to us. ❤️',
    },
    {
      question: 'What is something I always want you to remember?',
      choices: ['You are loved', 'You must be perfect', 'You cannot make mistakes', 'You should never rest'],
      correctAnswer: 'You are loved',
      scored: true,
      correctFeedback: 'Always, in every version of every day. ❤️',
      incorrectFeedback: 'Let this be your reminder: you are loved, just as you are. 💕',
    },
    {
      question: 'What would make a perfect day together?',
      choices: ['EDIT: your perfect date', 'A day full of pressure', 'No time to talk', 'Nothing to laugh about'],
      correctAnswer: 'EDIT: your perfect date',
      scored: true,
      correctFeedback: 'Adding that to our list of days to make happen. ✨',
      incorrectFeedback: 'We can plan a new perfect day together. 💗',
    },
  ],
  quizScoring: { pointsPerCorrect: 10, thresholds: [
    { min: 90, message: 'You know our little world so beautifully. My heart is smiling right now. ❤️' },
    { min: 70, message: 'You remember so many special things, and I cannot wait to make more memories with you. 💗' },
    { min: 40, message: 'Looks like we need more memory-making dates: more hugs, more laughter, more us. 🥰' },
    { min: 0, message: 'Baby, this is only the beginning of our story. The best memories are still waiting for us. 💋' },
  ]},

  // Optional music: copy a legally usable MP3 into public/audio and set enabled to true.
  music: { enabled: false, src: 'audio/our-song.mp3', label: 'Our song' },
};
