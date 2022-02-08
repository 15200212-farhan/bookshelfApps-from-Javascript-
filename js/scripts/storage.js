const STORAGE_KEY = "BOOKSHELF_APPS";
 
let buku = [];
 
function isStorageExist() /* boolean */ {
   if(typeof(Storage) === undefined){
       alert("Browser kamu tidak mendukung local storage");
       return false
   }
   return true;
}
 
function saveData() {
   const parsed = JSON.stringify(buku);
   localStorage.setItem(STORAGE_KEY, parsed);
   document.dispatchEvent(new Event("ondatasaved"));
}
 
function loadDataFromStorage() {
   const serializedData = localStorage.getItem(STORAGE_KEY);
   
   let data = JSON.parse(serializedData);
   
   if(data !== null)
       buku = data;
 
   document.dispatchEvent(new Event("ondataloaded"));
}
 
function updateDataToStorage() {
   if(isStorageExist())
       saveData();
}
 
function composeBookObject(judulBuku, penulis, penerbit, tahunTerbit, isCompleted) {
   return {
       id: Math.random(),
       judulBuku,
       penulis,
       penerbit,
       tahunTerbit,
       isCompleted,
   };
}
 
function findBook(bookId) {
   for(book of buku){
       if(book.id === bookId)
           return book;
   }
   return null;
}
 
 
function findIndex(bookId) {
   let index = 0
   for (book of buku) {
       if(book.id === bookId)
           return index;
 
       index++;
   }
 
   return -1;
}

