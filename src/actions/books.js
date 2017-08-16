
//GET A BOOK
export function getBooks(books){
  return {
    type:'GET_BOOKS',
    payload:books
  }
}


// POST A BOOK
export function postBooks(book){
  return {
    type:'POST_BOOK',
    payload:book
  }
}

// DELET A BOOK
export function deleteBook(id){
  return {
    type:'DELETE_BOOK',
    payload:id
  }
}

// UPDATE A BOOK
export function updateBook(book){
  return {
    type:'UPDATE_BOOK',
    payload:book
  }
}
