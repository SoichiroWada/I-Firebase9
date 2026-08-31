import { initializeApp } from 'firebase/app'
import { DataConnect } from 'firebase/data-connect';
import {
    getFirestore, collection, getDocs, addDoc, deleteDoc, doc,
    onSnapshot, query, where, orderBy, serverTimestamp, getDoc,
    updateDoc
} from 'firebase/firestore'
import firebaseConfig from './firebaseConfig'
import {
    getAuth, createUserWithEmailAndPassword, signOut,
    signInWithEmailAndPassword, onAuthStateChanged
} from 'firebase/auth'

//init firebase app
initializeApp(firebaseConfig);

//init services
const db = getFirestore();
const auth = getAuth();

//collection ref
const colRef = collection(db, 'books');

//queries
// const que = query(colRef, where("author", "==", "patrick rothfuss"), orderBy('title', 'asc'))
const queryParam = query(colRef, orderBy('title', 'asc'));
console.log(queryParam)

// realtime collection data
// onSnapshot(queryParam, (snapshot) => {
//     let books = []
//     snapshot.docs.forEach(doc => {
//         books.push({ ...doc.data(), id: doc.id })
//     })
//     console.log(books)
// })

///////////////////////////////////////////////////////////
const booksList = document.querySelector('.books');
onSnapshot(queryParam, (snapshot) => {
    booksList.innerHTML = '';

    snapshot.docs.forEach((bookDocument) => {
        const book = bookDocument.data();

        const listItem = document.createElement('li');

        const title = document.createElement('strong');
        title.textContent = book.title;

        const author = document.createElement('span');
        author.textContent = ` — ${book.author}`;

        const documentId = document.createElement('small');
        documentId.textContent = ` (ID: ${bookDocument.id})`;

        listItem.append(title, author, documentId);
        booksList.append(listItem);
    });
});
///////////////////////////////////////////////////////////

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
    console.log("id", id)
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

// signing users up
const signupForm = document.querySelector('.signup');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const email = signupForm.email.value
    const password = signupForm.password.value

    createUserWithEmailAndPassword(auth, email, password)
        .then(cred => {
            console.log('user created:', cred.user)
            signupForm.reset()
        })
        .catch(err => {
            console.log(err.message)
        })
})

// logging in and out
const logoutButton = document.querySelector('.logout')
logoutButton.addEventListener('click', () => {
    signOut(auth)
        .then(() => {
            console.log('user signed out')
        })
        .catch(err => {
            console.log(err.message)
        })
})

const loginForm = document.querySelector('.login')
loginForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const email = loginForm.email.value
    const password = loginForm.password.value

    signInWithEmailAndPassword(auth, email, password)
        .then(cred => {
            console.log('user logged in:', cred.user)
            loginForm.reset()
        })
        .catch(err => {
            console.log(err.message)
        })
})

const element = document.getElementById('auth');
onAuthStateChanged(auth, (user) => {
    if (user) {
        document.body.style.backgroundColor = 'lightblue';
        element.innerHTML = "Firebase Auth" + " (" + user.email + ")";
    } else {
        document.body.style.backgroundColor = 'white';
        element.innerHTML = "Firebase Auth";
    }
});