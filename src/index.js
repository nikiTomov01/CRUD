// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, deleteDoc, setDoc, getDoc, doc, collection, getCountFromServer, getDocs, where, query } from "firebase/firestore";
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

// do stuff with db
const db = getFirestore(app);
const coll = collection(db, "Notes");


// const querySnapshot = await getDocs(q);
// querySnapshot.forEach((doc) => {
//     console.log(doc.id, " -> ", doc.data());
//     console.log(doc.id, "has title: ", doc.data().title, " and descript: ", doc.data().description);
// })

async function writeNoteData(noteId, titleTxt, descTxt) { // sets the title and description for a note in the db
    await setDoc(doc(db, "Notes", `${noteId}`), {
        title: titleTxt,
        description: descTxt
    });
}

async function deleteNote(noteId) { // removes a note from the db
    await deleteDoc(doc(db, "Notes", `${noteId}`));
    document.location.reload();
}

async function loadNotes() { // loads previous notes saved in the db.
    const q = query(coll);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((docs) => {
        const newNote = document.createElement("div");
        newNote.className = "note";
        newNote.id = `note-${latestTitle}`;

        var delBtn = document.createElement("button");
        delBtn.id = "remove-note-btn";
        delBtn.innerHTML = "X";
        delBtn.addEventListener("click", () => {
            console.log("deleted: ", docs.data().title);
            deleteNote("note-" + docs.data().title);
        });

        var titleText = document.createElement("h1");
        titleText.innerHTML = docs.data().title;

        var descriptionText = document.createElement("p");
        descriptionText.innerHTML = docs.data().description;

        newNote.appendChild(delBtn);
        newNote.appendChild(titleText);
        newNote.appendChild(document.createElement("br"));
        newNote.appendChild(descriptionText);
        newNote.appendChild(document.createElement("br"));

        noteContainer.appendChild(newNote);
    })
}

loadNotes(); // called so that every time the page reloads the notes are updated

const noteContainer = document.getElementById("notes-container");

const addBtn = document.getElementById("add-note-btn");
addBtn.addEventListener("click", createForm);
var latestTitle = "";
var latestDescription = "";
//var noteCount = 0;

function addNote() { // creates a new note adds it to the db and to the note container div.
    //noteCount++; //increment note count

    //create new note element
    const newNote = document.createElement("div");
    newNote.className = "note";
    newNote.id = `note-${latestTitle}`;
    writeNoteData(newNote.id, latestTitle, latestDescription);

    var delBtn = document.createElement("button");
    delBtn.id = "remove-note-btn";
    delBtn.innerHTML = "X";
    delBtn.addEventListener("click", () => {
        deleteNote(newNote.id);
    });

    var titleText = document.createElement("h1");
    titleText.innerHTML = latestTitle;

    var descriptionText = document.createElement("p");
    descriptionText.innerHTML = latestDescription;

    newNote.appendChild(delBtn);
    newNote.appendChild(titleText);
    newNote.appendChild(document.createElement("br"));
    newNote.appendChild(descriptionText);
    newNote.appendChild(document.createElement("br"));

    noteContainer.appendChild(newNote);
}

function createForm() { // creates the form ui used to create a note
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

const removeForm = (child, titleValue, descriptValue) => { // removes the form ui and sets the latest title and description to be used for new note.
    latestTitle = titleValue;
    latestDescription = descriptValue;
    document.body.removeChild(child);
}