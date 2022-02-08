const BOOKSNOTCOMPLETED= 'booksNotCompleted';
const BOOKSCOMPLETED= 'booksCompleted';
const BOOK_ITEMID = "itemId";


window.addEventListener('DOMContentLoaded', (_) => {
  const submitFormData = document.querySelector('#formTambahData');
  submitFormData.addEventListener('submit', (e) => {
    e.preventDefault();
    addBooks();

    Swal.fire({
      title: "Buku berhasil di tambahkan!",
      text: "",
      icon: "success",
    });
   
  });

  if(isStorageExist()){
    loadDataFromStorage();
  }
});

document.addEventListener("ondatasaved", () => {
  return "berhasil disimpan";
});

document.addEventListener("ondataloaded", () => {
  refreshDataFromBook();
 });

const addBooks = (_) => {
  const booksNotCompleted = document.getElementById(BOOKSNOTCOMPLETED);
  const judulBuku = document.querySelector('#judulBuku').value;
  const penulis = document.querySelector('#penulis').value;
  const penerbit = document.querySelector('#penerbit').value;
  const tahunTerbit = document.querySelector('#tahunTerbit').value;
  const books = makeBooks(judulBuku, penulis, penerbit, tahunTerbit);

  const booksOBJ = composeBookObject(judulBuku, penulis, penerbit, tahunTerbit, false);
  books[BOOK_ITEMID] = booksOBJ.id;
  buku.push(booksOBJ);
  booksNotCompleted.append(books);
  updateDataToStorage();

}

const makeBooks = (judulBuku, penulis, penerbit, tahunTerbit, isCompleted)  => {
 const booksListItem = document.createElement('div'); 
 booksListItem.classList.add('books-list-item');
 booksListItem.innerHTML = `

    <h5 class="card-title">${judulBuku}</h5>
    <p class='penulis'> ${penulis}</p>
    <p class='penerbit'>${penerbit}<span></p>
    <p class='tahunTerbit'>${tahunTerbit}</p>`;

  if (isCompleted) {
    booksListItem.append(
      createUndoButton(),
      createTrashButton()
      );
  } else {
    booksListItem.append(
      checkButton(),
      createTrashButton(),
      );
  }
 
 return booksListItem;
}


const createButton = (typeClass, listener) => {
  const button = document.createElement('button');
  button.classList.add(typeClass);
  button.addEventListener('click', (e)=> {
    listener(e);
  });

  return button;
}

const taskCompleted = (taskElement) => {
  const taskJudulBuku = taskElement.querySelector('.books-list-item > h5').innerText;
  const taskPenulis = taskElement.querySelector('.books-list-item > .penulis').innerText;
  const taskPenerbit = taskElement.querySelector('.books-list-item  > .penerbit').innerText;
  const taskTahunTerbit = taskElement.querySelector('.books-list-item > .tahunTerbit').innerText;

  const newBooks = makeBooks(taskJudulBuku, taskPenulis, taskPenerbit, taskTahunTerbit, true);
  const book = findBook(taskElement[BOOK_ITEMID]);
  const booksCompleted = document.getElementById(BOOKSCOMPLETED);

  book.isCompleted = true;
  newBooks[BOOK_ITEMID] = book.id;
  booksCompleted.append(newBooks);
  taskElement.remove();

  updateDataToStorage();
}

const checkButton = (_) => {
  return createButton('check-button', (e)=> {
    taskCompleted(e.target.parentElement)
    e.stopPropagation();
    Swal.fire({
      title: "Buku dimasukan dirak!",
      text: "",
      icon: "success",
    });
  });
}
const createTrashButton = (_) => {
  return createButton('trash-button', (e)=> {
    removeTaskCompleted(e.target.parentElement);

    Swal.fire({
      title: "Buku dihapus dari rak!",
      text: "",
      icon: "success",
    });
  })
}


const createUndoButton = (_) => {
  return createButton('undo-button', (e) => {
    undoTask(e.target.parentElement);

    Swal.fire({
      title: "Buku dikembalikan dari rak!",
      text: "",
      icon: "success",
    });
  });
}

const removeTaskCompleted = (taskElement) => {
  const bookPosition = findIndex(taskElement[BOOK_ITEMID]);
  buku.splice(bookPosition, 1);
  
  taskElement.remove();
  updateDataToStorage();
}


const undoTask = (taskElement) => {
  const taskJudulBuku = taskElement.querySelector('.books-list-item > h5').innerText;
  const taskPenulis = taskElement.querySelector('.books-list-item > .penulis').innerText;
  const taskPenerbit = taskElement.querySelector('.books-list-item  > .penerbit').innerText;
  const taskTahunTerbit = taskElement.querySelector('.books-list-item > .tahunTerbit').innerText;

  const newBooks = makeBooks(taskJudulBuku, taskPenulis, taskPenerbit, taskTahunTerbit, false);
  const book = findBook(taskElement[BOOK_ITEMID]);

  book.isCompleted = false;
  newBooks[BOOK_ITEMID] = book.id;
  booksNotCompleted.append(newBooks);
  taskElement.remove();

  updateDataToStorage();
}


const refreshDataFromBook = (_) => {
  const booksNotCompleted = document.getElementById(BOOKSNOTCOMPLETED);
  let booksCompleted = document.getElementById(BOOKSCOMPLETED);

  for(book of buku){
      const newBook = makeBooks(book.judulBuku, book.penulis, book.penerbit, book.tahunTerbit, book.isCompleted);
      newBook[BOOK_ITEMID] = book.id;

      if(book.isCompleted){
        booksCompleted.append(newBook);
        
      } else {
        booksNotCompleted.append(newBook);
      }
  }
}