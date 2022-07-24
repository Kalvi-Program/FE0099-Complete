showNotes();

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("addTxt");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.push(addTxt.value);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  showNotes();
});

function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function (element, index) {
    // Iteration 1: Assign the length of the "element" (a string) to a variable called "strLength"
    const strLength = element.length;

    html += `
      <div class="noteCard mx-2 my-2 card" style="width: 18rem">
      <div class="card-body">
        <h5 class="card-title" style="font-size: 24px">Note ${index + 1}</h5>
        <p class="card-text">${element}</p>
        <div class="details">
          <p class="total-length">No. of characters: ${strLength}</p>
        </div>
        <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-danger" style="padding: 6px 12px">
          <i  style="font-size: 18px" class="delete fa-solid fa-trash-can"></i>
        </button>
        <button id="${index}" onclick="upNote(this.id)" class="uppercase btn btn-warning" style="padding: 6px 12px">
          Aa
        </button>
      </div>
    </div>
      `;
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
  }
}

function deleteNote(index) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

function upNote(index) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  let arr = notesObj[index].split(" ");
  let temp = new Array(arr.length);
  for (let i = 0; i < arr.length; i++) {
    const word = arr[i];
    // Iteration 2: Get the first character of the word and assign it to firstLetter
    const firstLetter = word[0];
    // Iteration 3: Store the "firstLetter" (in uppercase) in upFirst
    const upFirst = firstLetter.toUpperCase();
    // Iteration 4: Get the whole word except the first letter and store it in "remainingString"
    const remainingString = word.substring(1);
    temp[i] = upFirst + remainingString;
  }
  let newStr = temp.join(" ");
  notesObj[index] = newStr;
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
  // Iteration 5: Store the value of search input in lowercase
  let inputVal = search.value.toLowerCase();
  let noteCards = document.getElementsByClassName("noteCard");

  Array.from(noteCards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText.toLowerCase();
    // Iteration 6: Check whether "cardTxt" includes the string stored in "inputVal" in the condition (replace it with "X")
    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});
