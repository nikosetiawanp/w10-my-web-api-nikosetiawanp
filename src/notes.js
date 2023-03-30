let API_ENDPOINT = "https://641eb708ad55ae01ccae9e69.mockapi.io/note";

// WORKS
const showAllNote = () => {
  fetch(API_ENDPOINT)
    .then((response) => response.json())
    .then((note) => {
      let notesContainer = document.getElementById("notes-container");
      notesContainer.innerHTML = "";
      for (let i = note.length - 1; i >= 0; i--) {
        notesContainer.innerHTML += `
        <div
        class="flex justify-between w-full bg-white/20 hover:bg-white/30 focus:bg-white/30 hover:cursor-pointer p-6 rounded-xl shadow-lg mt-8 mb-8 backdrop-blur-lg"
        noteid=${note[i].id}
        onclick="editNote(this)"
        <div class="flex justify-between gap-8">
          <div class="flex flex-col gap-2 truncate">
            <h2 class="text-2xl font-bold mb-2 text-white">${note[i].title}</h2>
            <p class="text-white font-medium">${note[i].content}</p>
          </div>
          <div class="flex items-center gap-2 pl-4">
            <button
              class="bg-white/0 hover:bg-white/20 hover:shadow-md active:shadow-none rounded-md p-1 w-20 h-full flex justify-center items-center"
              id="delete-button"
              onclick="deleteNote(this)"
              noteid=${note[i].id}
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
      id: 0,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((note) => showAllNote());
};

// CANNOT UPDATE THE MOCKAPI SIDE
let deleteNote = (e) => {
  const noteId = e.getAttribute("noteid");
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
      console.log(note.title);
      titleInput.value = `${note.title}`;
      textAreaInput.textContent = `${note.content}`;
    });
};

let hideTitlePlaceholder = () => {
  let titleInput = document.getElementById("title-input");
  titleInput.classList.replace(
    "placeholder:text-white/70",
    "placeholder:text-white/0"
  );
};
let hideTextareaPlaceholder = () => {
  let textAreaInput = document.getElementById("textarea-input");
  textAreaInput.classList.replace(
    "placeholder:text-white/70",
    "placeholder:text-white/0"
  );
};
let unhidePlaceholder = () => {
  let titleInput = document.getElementById("title-input");
  let textAreaInput = document.getElementById("textarea-input");
  titleInput.classList.replace(
    "placeholder:text-white/0",
    "placeholder:text-white/70"
  );
  textAreaInput.classList.replace(
    "placeholder:text-white/0",
    "placeholder:text-white/70"
  );
};
document
  .getElementById("title-input")
  .addEventListener("input", unhidePlaceholder);
document
  .getElementById("textarea-input")
  .addEventListener("input", unhidePlaceholder);
