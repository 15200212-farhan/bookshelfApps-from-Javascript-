const BOOKSNOTCOMPLETED= 'booksNotCompleted';
const BOOKSCOMPLETED= 'booksCompleted';


window.addEventListener('DOMContentLoaded', (_) => {
  const submitFormData = document.querySelector('#formTambahData');
  const textInfo = document.querySelector('.info');
  const textInfo2 = document.querySelector('.info2');
  textInfo.innerHTML = "Belum menambahkan buku";

  submitFormData.addEventListener('submit', (e) => {
    e.preventDefault();
    addBooks();

    Swal.fire({
      title: "Buku berhasil di tambahkan!",
      text: "",
      icon: "success",
    });

    if(submitFormData) {
      textInfo.innerHTML = "Buku belum dibaca";
      textInfo2.innerHTML = "Buku sudah dibaca";
    }
  
  });

});


const addBooks = (_) => {
  const booksNotCompleted = document.getElementById(BOOKSNOTCOMPLETED);
  const judulBuku = document.querySelector('#judulBuku').value;
  const penulis = document.querySelector('#penulis').value;
  const penerbit = document.querySelector('#penerbit').value;
  const tahunTerbit = document.querySelector('#tahunTerbit').value;
  const books = makeBooks(judulBuku, penulis, penerbit, tahunTerbit);
  booksNotCompleted.append(books);

}

const makeBooks = (judulBuku, penulis, penerbit, tahunTerbit, isCompleted)  => {
 const booksListItem = document.createElement('div'); 
 const createdCardItem = document.createElement('div'); 
 const createdCardItemBody = document.createElement('div');

 booksListItem.classList.add('books-list-item');
//  createdCardItem.classList.add('card');
//  createdCardItemBody.classList.add('card-body');
//  createdCardItem.appendChild(createdCardItemBody);
 booksListItem.innerHTML = `

    <h5 class="card-title">${judulBuku}</h5>
    <p> Ditulis oleh ${penulis}</p>
    <p> Diterbitkan oleh ${penerbit}</p>
    <p> Diterbitkan tahun (${tahunTerbit})</p>`;

  if (isCompleted) {
    booksListItem.append(
      createUndoButton(),
      createTrashButton()
      );
  } else {
    booksListItem.append(checkButton());
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
  const taskJudul = taskElement.querySelector('.books-list-item > h5').innerText;
  const taskPenulis = taskElement.querySelector('.books-list-item > p').innerText;
  const taskPenerbit = taskElement.querySelector('.books-list-item > p').innerText;
  const taskTahunTerbit = taskElement.querySelector('.books-list-item > p').innerText;

  const newBooks = makeBooks(taskJudul, taskPenulis, taskPenerbit, taskTahunTerbit, true);
  const booksCompleted = document.getElementById(BOOKSCOMPLETED);
  booksCompleted.append(newBooks);
  taskElement.remove();
}

const checkButton = (_) => {
  return createButton('check-button', (e)=> {
    taskCompleted(e.target.parentElement)
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
  taskElement.remove();
}


const undoTask = (taskElement) => {
  const taskJudul = taskElement.querySelector('.books-list-item > h5').innerText;
  const taskPenulis = taskElement.querySelector('.books-list-item > p').innerText;
  const taskPenerbit = taskElement.querySelector('.books-list-item > p').innerText;
  const taskTahunTerbit = taskElement.querySelector('.books-list-item > p').innerText;

  const newBooks = makeBooks(taskJudul, taskPenulis, taskPenerbit, taskTahunTerbit, false);
  const booksNotCompleted = document.getElementById(BOOKSNOTCOMPLETED);
  booksNotCompleted.append(newBooks);
  taskElement.remove();
}

