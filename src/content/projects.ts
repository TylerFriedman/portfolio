import alleyswayDiagram from '../assets/projects/alleysway-diagram.svg';
import clockitDiagram from '../assets/projects/clockit-diagram.svg';
import fusionDiagram from '../assets/projects/fusion-diagram.svg';

interface Repo {
  title: string;
  href: string;
}

export interface Project {
  id: string;
  title: string;
  image?: string;
  details: string[];
  repos: Repo[];
  overview: string[];
  howItWorks: string[];
  built: Record<string, string[]>;
  features: string[];
  stack: string[];
}

export const PROJECTS: Project[] = [
  {
    id: 'alleysway',
    title: 'Alleysway',
    image: alleyswayDiagram,
    details: ['2024 · Team of 5', 'Client project'],
    repos: [
      { title: 'Website on GitHub', href: 'https://github.com/TylerFriedman/Alleysway-website' },
      { title: 'App on GitHub', href: 'https://github.com/TylerFriedman/Alleysway-App' },
    ],
    overview: [
      'A booking website and Android app for Alleysway, a real gym. Members find a personal trainer, book sessions, log workouts and track their weight. Trainers manage their availability, clients and payments in one place.',
      'Built in 2024 by a team of five while I was studying full-time.',
    ],
    howItWorks: [
      'Trainers sign in to the website with Google and set their weekly hours, plus any days off.',
      'Members pick an open one-hour slot on the website or in the app. Each booking is saved to Firebase and added to the member’s Google Calendar with the trainer invited, and cancelling on the website removes it again.',
      'Trainers mark sessions as paid on the payment overview and can export any client’s history as a PDF.',
      'In the app, members scan the gym’s QR code to check in, and log workouts and weight entries that sync through Firebase.',
      'The progress graph smooths the weight entries with exponential smoothing, then fits a linear regression line to forecast the next 14 weigh-ins.',
    ],
    built: {
      Website: [
        'An ASP.NET Core MVC site with separate dashboards for trainers and members',
        'Google sign-in, with calendar access for bookings',
        'Open slots built from each trainer’s weekly hours and date overrides, with booked sessions taken out',
        'Booking and cancelling that add and remove Google Calendar events',
        'A payment overview and income page, with a PDF export of each client’s sessions using jsPDF',
        'Chat between members and their trainers, with a message posted for each booking and cancellation',
      ],
      'Android app': [
        'A Kotlin app for members, with QR code check-in using ZXing',
        'Workout logging and weight tracking saved to Firebase',
        'Charts drawn with MPAndroidChart, including a weight forecast from exponential smoothing and linear regression',
        'A "how busy is the gym" chart, and a leaderboard members can leave',
        'Session booking from the app, added to Google Calendar like the website',
      ],
    },
    features: [
      'Session booking added to Google Calendar',
      'Workout logging with sets, reps and weight',
      'Weight tracking with goals and predicted progress',
      'Gym check-in with QR codes',
      'Payment and income tracking for trainers',
    ],
    stack: [
      'C#',
      'ASP.NET Core MVC',
      'Kotlin',
      'Android',
      'Firebase',
      'Google Calendar API',
      'MPAndroidChart',
      'jsPDF',
    ],
  },
  {
    id: 'fusion',
    title: 'Fusion',
    image: fusionDiagram,
    details: ['2024 · Team of 5', 'University project'],
    repos: [
      { title: 'App on GitHub', href: 'https://github.com/TylerFriedman/Fusion' },
      { title: 'API on GitHub', href: 'https://github.com/TylerFriedman/Fusion_API' },
    ],
    overview: [
      'An Android recipe app that helps people decide what to cook. Users search recipes, plan their meals for the week and build a shopping list from the ingredients.',
      'Built in 2024 by a team of five while I was studying full-time, backed by our own Node.js API hosted on Render.',
    ],
    howItWorks: [
      'Users sign up with Firebase Authentication, log in with a username and can switch on fingerprint login after their first sign-in.',
      'Recipe search calls the Spoonacular API through Retrofit, with filters for meal type, calories and main ingredient.',
      'Opening a recipe shows tabs for the overview, ingredients, steps and nutrition.',
      'Adding a recipe to the shopping list sends its ID to our API on Render. The API checks the user’s login token, gets the ingredients from Spoonacular, groups them by supermarket aisle and saves them to Firebase.',
      'Planned meals are stored in Firebase, and Android’s AlarmManager sets a reminder to start cooking, timed from the recipe’s prep time.',
    ],
    built: {
      'Android app': [
        'A Kotlin app with Firebase Authentication, plus fingerprint login through BiometricPrompt',
        'Recipe search, filters and recipe details from the Spoonacular API, called with Retrofit',
        'A shopping list grouped by category, with custom categories',
        'A weekly meal planner, with reminders timed from each recipe’s prep time through AlarmManager',
        'Offline login and favourites cached on the phone',
        'English and Afrikaans through the Google Cloud Translation API',
        'A metric and imperial unit converter, and account deletion',
      ],
      API: [
        'A Node.js and Express API on Render that checks each Firebase login token',
        'A shopping list route that takes a recipe ID, gets its ingredients from Spoonacular and groups them by supermarket aisle',
        'Items saved to Firebase under the user from the verified token, never one named in the request',
      ],
    },
    features: [
      'Fingerprint and offline login',
      'Recipe details with ingredients, steps and nutrition',
      'Weekly meal planner and a shopping list built from recipes',
      'Favourite recipes that work offline',
      'English and Afrikaans',
    ],
    stack: ['Kotlin', 'Android', 'Firebase', 'Retrofit', 'Node.js', 'Express', 'Spoonacular API'],
  },
  {
    id: 'clockit',
    title: 'ClockIT',
    image: clockitDiagram,
    details: ['2024 · Team of 4', 'University project'],
    repos: [{ title: 'ClockIT on GitHub', href: 'https://github.com/TylerFriedman/ClockIT' }],
    overview: [
      'An Android time tracker for students. Users log the time they spend on each activity, set daily goals and see where their time goes.',
      'Built in 2024 by a team of four while I was studying full-time.',
    ],
    howItWorks: [
      'Users create colour-coded categories and the activities that belong to them.',
      'Each session they log is saved to the Firebase Realtime Database, with an optional photo uploaded to Firebase Storage.',
      'Users set a daily minimum and maximum goal for each activity.',
      'For any date range, a bar chart shows the hours logged on an activity each day against its goal lines. A pie chart shows how often they stayed within their goals this month.',
      'The leaderboard turns every logged minute into a point and ranks the user against sample players, with the top three highlighted.',
    ],
    built: {
      'Android app': [
        'A Kotlin app with username login on top of Firebase Authentication',
        'Categories with their own colours, and the activities inside them',
        'Time logs saved to the Firebase Realtime Database, with photos from the camera or gallery uploaded to Firebase Storage',
        'Daily minimum and maximum goals for each activity',
        'A bar chart with goal lines and a goals pie chart, drawn with MPAndroidChart',
        'Insights for any date range',
        'A leaderboard against sample players, where every logged minute counts as a point',
      ],
    },
    features: [
      'Activities and colour-coded categories',
      'Time logs with photos',
      'Daily goals',
      'Graphs and insights by date range',
      'Points leaderboard',
    ],
    stack: ['Kotlin', 'Android', 'Firebase', 'MPAndroidChart'],
  },
  {
    id: 'portfolio',
    title: 'Portfolio',
    details: ['2026 · Solo project'],
    repos: [{ title: 'Portfolio on GitHub', href: 'https://github.com/TylerFriedman/portfolio' }],
    overview: [
      'This website. It recreates the Windows XP desktop in the browser, so visitors explore my work the way they would use an old PC: by opening windows, folders and programs.',
      'Built on my own in 2026, with the look matched to real XP screenshots rather than guessed.',
    ],
    howItWorks: [
      'Every program is listed once in a registry, which gives its desktop icon, Start menu entry and window the same title, icon and content.',
      'A Zustand store keeps each open window’s position, size, state and stacking order, so the desktop and taskbar always agree.',
      'Dragging and resizing use pointer capture, so a window keeps following the mouse even when the cursor slips off it.',
      'A second store snaps desktop icons to a grid and handles selection and arrow-key focus.',
      'Content such as these project pages lives in plain TypeScript files, separate from the components that show it.',
    ],
    built: {
      Website: [
        'The window manager: dragging, resizing from all eight edges, maximize, minimize and focus',
        'Desktop icons with drag-select, Ctrl and Shift selection, grid snapping and keyboard navigation',
        'The taskbar, Start menu and an Explorer window for my projects',
        'Tests in Vitest and Testing Library that check behaviour',
      ],
    },
    features: [
      'Open programs by double-clicking icons or from the Start menu',
      'Works with the keyboard as well as the mouse',
      'Every project in an Explorer window with Back and Up',
      'Links to my GitHub and LinkedIn',
    ],
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'XP.css', 'Zustand', 'Vitest'],
  },
];
