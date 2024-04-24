// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, setDoc, doc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJ8gUbA-JVzz4XP4r3YEM-0zLVflhf_Xc",
  authDomain: "crud-27704.firebaseapp.com",
  projectId: "crud-27704",
  storageBucket: "crud-27704.appspot.com",
  messagingSenderId: "503728560336",
  appId: "1:503728560336:web:46402f6b029318c47ee6d5",
  measurementId: "G-TRT2KKW88Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function writeNoteData(titleTxt, descTxt) {
    await setDoc(doc(db, "Notes", `note: ${titleTxt}`), {
        title: titleTxt,
        description: descTxt
    });
}

const noteContainer = document.getElementById("notes-container");

const addBtn = document.getElementById("add-note-btn");
addBtn.addEventListener("click", createForm);
var latestTitle = "";
var latestDescription = "";
var noteCount = 0;

function addNote() {
    //createForm();

    noteCount++; //increment note count

    //create new note element
    const newNote = document.createElement("div");
    newNote.className = "note";
    newNote.id = `note-${noteCount}`;

    var titleText = document.createElement("h1");
    titleText.innerHTML = latestTitle;

    var descriptionText = document.createElement("p");
    descriptionText.innerHTML = latestDescription;

    newNote.appendChild(titleText);
    newNote.appendChild(document.createElement("br"));
    newNote.appendChild(descriptionText);
    newNote.appendChild(document.createElement("br"));

    noteContainer.appendChild(newNote);
}

function createForm() {
    const newDiv = document.createElement("div");

    newDiv.className = "modal";

    var title = document.createElement("input");
    title.setAttribute("type", "text");
    title.setAttribute("placeholder", "Title");
    title.setAttribute("name", "Title");

    var description = document.createElement("textarea");
    description.setAttribute("type", "text");
    description.setAttribute("placeholder", "Description here...");
    description.setAttribute("name", "Description");

    // var submitBtn = document.createElement("input");
    // submitBtn.setAttribute("type", "submit");
    // submitBtn.setAttribute("value", "Submit");

    var btn = document.createElement("button");
    btn.innerHTML = "Submit";
    btn.addEventListener("click", () => {
        removeForm(newDiv, title.value, description.value);
        //writeNoteData(latestTitle, latestDescription);
        addNote();
    });

    newDiv.appendChild(title);
    newDiv.appendChild(description);
    newDiv.appendChild(btn);

    document.body.appendChild(newDiv);    
} 

const removeForm = (child, titleValue, descriptValue) => {
    latestTitle = titleValue;
    latestDescription = descriptValue;
    document.body.removeChild(child);
}