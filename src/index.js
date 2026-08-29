import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, onSnapshot, query, where } from 'firebase/firestore'

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
console.log("db:", db);

//collection ref
const colRef = collection(db, 'books');

//queries
const que = query(colRef, where("author", "==", "patrick rothfuss"))
console.log(que)

// realtime collection data
onSnapshot(que, (snapshot) => {
    let books = []
    snapshot.docs.forEach(doc => {
        books.push({ ...doc.data(), id: doc.id })
    })
    console.log(books)
})

// adding docs
const addBookForm = document.querySelector('.add');
addBookForm.addEventListener('submit', (e) => {
    e.preventDefault()

    addDoc(colRef, {
        title: addBookForm.title.value,
        author: addBookForm.author.value,
    })
        .then(() => {
            addBookForm.reset()
        })
})

// deleting docs
const deleteBookForm = document.querySelector('.delete');
deleteBookForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const docRef = doc(db, 'books', deleteBookForm.id.value)

    deleteDoc(docRef)
        .then(() => {
            deleteBookForm.reset()
        })
})

//get collection data
// getDocs(colRef)
//     .then((snapshot) => {
//         let books = [];
//         snapshot.docs.forEach((doc) => {
//             books.push({ ...doc.data(), id: doc.id })
//         })
//         console.log(books)
//     })
//     .catch(err => {
//         console.log(err.message)
//     });