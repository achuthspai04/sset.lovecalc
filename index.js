import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js';
import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/9.20.0/firebase-firestore.js';


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
const flamesResultElement = document.querySelector("#flames-result");

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    if (name1Input.value.length === 0 || name2Input.value.length === 0) {
        alert("Please fill in the names");
        return;
    }

    // FLAMES algorithm
    const flamesResult = calculateFlames(name1Input.value, name2Input.value);
    flamesResultElement.innerHTML = flamesResult;

    // Store data in Firestore
    try {
        await addDoc(collection(db, "love_calculations"), {
            name1: name1Input.value,
            name2: name2Input.value,
            flames: flamesResult,
            timestamp: new Date()
        });
        console.log("Document written successfully");
    } catch (e) {
        console.error("Error adding document: ", e);
    }
});

function calculateFlames(name1, name2) {
    name1 = name1.toLowerCase().replace(/\s/g, '');
    name2 = name2.toLowerCase().replace(/\s/g, '');

    let combined = name1 + name2;

    for (let char of name1) {
        if (name2.includes(char)) {
            name1 = name1.replace(char, '');
            name2 = name2.replace(char, '');
        }
    }

    let totalCount = name1.length + name2.length;
    const flames = ['Friends', 'Lovers', 'Affectionate', 'Marriage', 'Enemies', 'Siblings'];

    let index = 0;
    while (flames.length > 1) {
        index = (index + totalCount - 1) % flames.length;
        flames.splice(index, 1);
    }

    return flames[0];
}
