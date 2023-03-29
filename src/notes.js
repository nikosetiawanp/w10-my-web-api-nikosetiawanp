let API_ENDPOINT = "https://641eb708ad55ae01ccae9e69.mockapi.io/note";

let getAllNote = () => {
  fetch(API_ENDPOINT)
    .then((response) => response.json())
    .then((note) => {
      console.log(note);

      let leftContainer = document.getElementById("left-container");
      for (let i = note.length - 1; i >= 0; i--) {
        leftContainer.innerHTML += `
        <div
        class="flex flex-col gap-8 border-b w-full bg-white p-6 rounded-xl shadow-lg mt-8"
      >
        <div class="flex justify-between gap-8">
          <div class="flex flex-col gap-2 truncate mr-6">
            <h2 class="text-2xl font-bold mb-3">${note[i].title}</h2>
            <p class="text-gray-600">${note[i].content}</p>
          </div>
          <div class="flex items-center gap-2">
            <button
              class="bg-gray-200 hover:bg-indigo-600 hover:shadow-md rounded-md p-1 w-20 h-full flex justify-center items-center font-bold text-white"
              id="edit-button"
            >
              <img class="h-10" src="../assets/writing.svg" alt="" />
            </button>
            <button
              class="bg-gray-200 hover:bg-red-500 hover:shadow-md rounded-md p-1 w-20 h-full flex justify-center items-center"
              id="delete-button"
              onclick="deleteNoteById(id)"
            >
              <img class="h-10" src="../assets/garbage.svg" alt="garbage" />
            </button>
          </div>
        </div>
      </div>
        `;
      }
    });
};
getAllNote();

let getNoteById = (id) => {
  fetch(API_ENDPOINT + "/" + id)
    .then((response) => response.json())
    .then((note) => {
      console.log(note);
    });
};

let createNewNote = (i) => {
  fetch(API_ENDPOINT, {
    method: "POST",
    body: JSON.stringify({
      title: "New Note",
      content: "Write your note here",
      id: i,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((note) => console.log(note));
  // location.reload();
};

let deleteNoteById = (id) => {
  fetch(API_ENDPOINT + "/" + id, {
    method: "DELETE",
  }).then((response) => response.json());
  location.reload();
};
