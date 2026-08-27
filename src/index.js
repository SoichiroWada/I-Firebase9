import { initializeApp} from 'firebase/app'
import { getFirestore, collection, getDocs } from 'firebase/firestore'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDd-SnaRR15Id3pKDE4TeeV7lT4H7QcTVo",
  authDomain: "fir-dojo-232a1.firebaseapp.com",
  projectId: "fir-dojo-232a1",
  storageBucket: "fir-dojo-232a1.firebasestorage.app",
  messagingSenderId: "108155588492",
  appId: "1:108155588492:web:dfdd41d013c8da0fe110a9",
  measurementId: "G-RWNNWMXYKM"
};

//init firebase app
initializeApp(firebaseConfig);

//init services
const db = getFirestore();

//collection ref
const colRef = collection(db, 'books')

//get collection data
getDocs(colRef)
.then((snapshot) => {
    console.log(snapshot.docs)
})
