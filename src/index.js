import { initializeApp } from 'firebase/app'
import { DataConnect } from 'firebase/data-connect';
import {
    getFirestore, collection, getDocs, addDoc, deleteDoc, doc,
    onSnapshot, query, where, orderBy, serverTimestamp, getDoc
} from 'firebase/firestore'

console.log('servertimestamp:', serverTimestamp)

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
// const que = query(colRef, where("author", "==", "patrick rothfuss"), orderBy('title', 'asc'))
const q = query(colRef, orderBy('title', 'asc'))
console.log(q)

// realtime collection data
onSnapshot(q, (snapshot) => {
    let books = []
    snapshot.docs.forEach(doc => {
        books.push({ ...doc.data(), id: doc.id })
    })
    console.log(books)
})

// adding docs
const addBookForm = document.querySelector('.add');
addBookForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    console.count('submit handler executed');

    addDoc(colRef, {
        title: addBookForm.title.value,
        author: addBookForm.author.value,
        createdAt: serverTimestamp()
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

//get a single document
const docRef = doc(db, 'books', "hhGX0EboVQ2K3cxJixW0")

getDoc(docRef)
    .then((doc) => {
        console.log(doc.data(), doc.id)
    })

onSnapshot(docRef, (doc) => {
    console.log(doc.data(), doc.id)
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