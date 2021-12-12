class Book {
  constructor(title, author, numPages, isCompleted) {
    this.author = author
    this.title = title
    this.numPages = numPages
    this.isCompleted = isCompleted
  }
}

const books = [
  new Book('JK Rowling', "Harry Potter and the Sorcerer's Stone", 307, true),
  new Book('F. Scott Fitzgerald', 'The Great Gatsby', 212, true),
  new Book('Alexandre Dumas', 'The Count of Monte Cristo', 1215, false)
]

const createBookElement = (book) => {
  const listItem = document.createElement('li')
  const bookElement = `
    <div>
      <h3>${book.title}</h3>
      <p>${book.author}</p>
      <p>Number of Pages: ${book.numPages}</p>
      <input type='checkbox' ${book.isCompleted ? 'checked' : ''}/>
    </div>
  `
  listItem.innerHTML = bookElement
  return listItem
}

const newBookButton = document.querySelector('button')
const form = document.querySelector('form')
const booksList = document.querySelector('.books')

const handleNewBookClick = (e) => {
  console.log('show the form')
  e.target.classList.toggle('hide')
  form.classList.toggle('hide')
}

const handleFormSubmit = (e) => {
  e.preventDefault()
  const form = e.target
  console.log('form submitted');
  const inputs = Array.from(form.querySelectorAll("input:not(input[type='submit'])"))
  console.log(inputs)
  const [title, author, numPages, completed] = inputs
  const book = new Book(title.value, author.value, numPages.value, completed.checked)
  booksList.appendChild(createBookElement(book))
  // clear form <-- extract into separate function
  inputs.forEach(input => input.value = '')
  // form.classList.toggle('hide')
  // newBookButton.classList.toggle('hide')
}

newBookButton.addEventListener('click', handleNewBookClick)
form.addEventListener('submit', handleFormSubmit)
form.classList.toggle('hide')

books.forEach(book => {
    const bookNode = createBookElement(book)
    booksList.appendChild(bookNode)
})



