const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const TMDB_Access_Key = import.meta.env.VITE_TMDB_ACCESS_KEY;
const TMDB_Token = import.meta.env.VITE_TMDB_TOKEN;

export { firebaseConfig, TMDB_Access_Key, TMDB_Token };
