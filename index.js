import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js';
import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/9.20.0/firebase-firestore.js';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC1y78P5FTCgUTXUa6oT2lTxFGAWydKoGg",
    authDomain: "sset-lovecalc.firebaseapp.com",
    projectId: "sset-lovecalc",
    storageBucket: "sset-lovecalc.appspot.com",
    messagingSenderId: "107238745226",
    appId: "1:107238745226:web:3dd6331c633ebd7b5af973",
    measurementId: "G-XSYWCPWR0F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const form = document.querySelector(".form");
const name1Input = document.querySelector("#name1");
const name2Input = document.querySelector("#name2");
const loveScoreElement = document.querySelector("#love-score");

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    if (name1Input.value.length === 0 || name2Input.value.length === 0) {
        alert("Please fill in the names");
        return;
    }

    // Calculate the love score
    let loveScore = Math.random() * 100;
    loveScore = Math.floor(loveScore) + 1;

    // Display the love score
    loveScoreElement.innerHTML = loveScore + "%";


    try {
        await addDoc(collection(db, "love_calculations"), {
            name1: name1Input.value,
            name2: name2Input.value,
            score: loveScore,
            timestamp: new Date()
        });
        console.log("Document written successfully");
    } catch (e) {
        console.error("Error adding document: ", e);
    }
});

// index.js

