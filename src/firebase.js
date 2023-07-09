// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyCObpb03iv4fLlT6Wo4s3aGNn3DTro4cb4',
	authDomain: 'habit-tracker-cd9fc.firebaseapp.com',
	projectId: 'habit-tracker-cd9fc',
	storageBucket: 'habit-tracker-cd9fc.appspot.com',
	messagingSenderId: '192971541968',
	appId: '1:192971541968:web:a996168ebc438610677dd5',
	measurementId: 'G-2Q89VH51BG',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
