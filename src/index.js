import { initializeApp } from 'firebase/app'
import { DataConnect } from 'firebase/data-connect';
import {
    getFirestore, collection, getDocs, addDoc, deleteDoc, doc,
    onSnapshot, query, where, orderBy, serverTimestamp, getDoc,
    updateDoc
} from 'firebase/firestore'
import firebaseConfig from './firebaseConfig';

//init firebase app
initializeApp(firebaseConfig);

//init services
const db = getFirestore();
console.log("db:", db);

//collection ref
const colRef = collection(db, 'books');

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

//updating a document
const updateForm = document.querySelector('.update');

updateForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const id = updateForm.id.value;
    console.log("id",id)
    const updatedTitle = updateForm.title.value;

    const docRef = doc(db, 'books', id)

    updateDoc(docRef, {
        title: updatedTitle
    }).then(() => {
        updateForm.reset()
    })

    getDoc(docRef)
        .then((doc) => {
            console.log(doc.data(), doc.id)
        })
})

//get a single document
// const docRef = doc(db, 'books', "hhGX0EboVQ2K3cxJixW0")

// getDoc(docRef)
//     .then((doc) => {
//         console.log(doc.data(), doc.id)
//     })

// onSnapshot(docRef, (doc) => {
//     console.log(doc.data(), doc.id)
// })


