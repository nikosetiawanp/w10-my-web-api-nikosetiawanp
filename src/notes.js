let API_ENDPOINT = "https://641eb708ad55ae01ccae9e69.mockapi.io/note";
let userName = localStorage.getItem("userName");
let userID = localStorage.getItem("userID");
let title = (document.getElementById(
  "title"
).innerHTML = `${userName}'s Notes`);

// WORKS
const showAllNote = () => {
  let textAreaInput = document.getElementById("textarea-input");
  let titleInput = document.getElementById("title-input");
  let userID = localStorage.getItem("userID");
  let notesContainer = document.getElementById("notes-container");

  fetch(API_ENDPOINT)
    .then((response) => response.json())
    .then((note) => {
      let filterValue = localStorage.getItem("userID");
      let filteredNote = note.filter((val) => val.userId.includes(filterValue));
      console.log(filteredNote);

      textAreaInput.value = "";
      titleInput.value = "";
      notesContainer.innerHTML = "";

      for (let i = filteredNote.length - 1; i >= 0; i--) {
        notesContainer.innerHTML += `
        <div
        class="flex justify-between w-full bg-white/20 hover:bg-white/30 focus:bg-white/30 hover:cursor-pointer p-6 rounded-xl shadow-lg mt-8 mb-8 backdrop-blur-lg"
        noteid=${filteredNote[i].id}
        onclick="editNote(this)"
        <div class="flex justify-between gap-8">
          <div class="flex flex-col gap-2 truncate">
            <h2 class="text-2xl font-bold mb-2 text-white">${filteredNote[i].title}</h2>
            <p class="text-white font-medium">${filteredNote[i].content}</p>
          </div>
          <div class="flex items-center gap-2 pl-4">
            <button
              class="bg-white/0 hover:bg-white/20 hover:shadow-md active:shadow-none rounded-md p-1 w-20 h-full flex justify-center items-center"
              id="delete-button"
              onclick="deleteNote(this)"
              noteid=${filteredNote[i].id}
            >
              <img class="h-8" src="../assets/garbage.svg" alt="garbage" />
            </button>
          </div>
        </div>
      </div>
        `;
      }
    });
};
// WORKS
const createNewNote = () => {
  let notesContainer = document.getElementById("notes-container");
  let userID = localStorage.getItem("userID");
  let newNote = `
    <div
    class="flex justify-between w-full bg-white/20 hover:bg-white/30 focus:bg-white/30 hover:cursor-pointer p-6 rounded-xl shadow-lg mt-8 backdrop-blur-lg"
    <div class="flex justify-between gap-8">
      <div class="flex flex-col gap-2 truncate">
        <h2 class="text-2xl font-bold mb-2 text-white">New Note</h2>
        <p class="text-white font-medium">What's on your mind?</p>
      </div>
      <div class="flex items-center gap-2 pl-4">
        <button
          class="bg-white/0 hover:bg-white/20 hover:shadow-md active:shadow-none rounded-md p-1 w-20 h-full flex justify-center items-center"
          id="delete-button"
          onclick="deleteNote(this)"
        >
          <img class="h-8" src="../assets/garbage.svg" alt="garbage" />
        </button>
      </div>
    </div>
  </div>
    `;
  notesContainer.innerHTML = newNote + notesContainer.innerHTML;
  fetch(API_ENDPOINT, {
    method: "POST",
    body: JSON.stringify({
      title: "New Note",
      content: "What's on your mind?",
      userId: userID,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((note) => showAllNote());
};
let deleteNote = (e) => {
  const noteId = e.getAttribute("noteid");
  let textAreaInput = document.getElementById("textarea-input");
  let titleInput = document.getElementById("title-input");

  e.parentElement.parentElement.remove();
  fetch(API_ENDPOINT + "/" + noteId, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((note) => showAllNote());
};

let editNote = (e) => {
  const noteId = e.getAttribute("noteid");
  let titleInput = document.getElementById("title-input");
  let textAreaInput = document.getElementById("textarea-input");

  fetch(API_ENDPOINT + "/" + noteId)
    .then((response) => response.json())
    .then((note) => {
      titleInput.value = `${note.title}`;
      textAreaInput.value = `${note.content}`;
      localStorage.setItem("cardID", `${note.id}`);
    });
};

const updateNote = () => {
  let titleInput = document.getElementById("title-input");
  let textAreaInput = document.getElementById("textarea-input");
  let userID = localStorage.getItem("userID");
  let cardID = localStorage.getItem("cardID");

  fetch(API_ENDPOINT + "/" + cardID, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: `${titleInput.value}`,
      content: `${textAreaInput.value}`,
      userId: userID,
    }),
  })
    .then((response) => response.json())
    .then((note) => showAllNote());
  // ERROR 415
};
