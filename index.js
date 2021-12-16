class Book {
  static count = 0
  constructor(title, author, numPages, isCompleted) {
    this.author = author
    this.title = title
    this.numPages = numPages
    this.isCompleted = isCompleted
    this.id = Book.count
    Book.count += 1
  }

  set completed(completed) {
    this.isCompleted = completed
  }
}

let books = [
  new Book('JK Rowling', "Harry Potter and the Sorcerer's Stone", 307, true),
  new Book('F. Scott Fitzgerald', 'The Great Gatsby', 212, true),
  new Book('Alexandre Dumas', 'The Count of Monte Cristo', 1215, false)
]

const createBookElement = (book) => {
  const container = document.createElement('div')
  const bookData = `
      <h3>${book.title}</h3>
      <p>${book.author}</p>
      <p>Number of Pages: ${book.numPages}</p>
  `
  container.innerHTML = bookData

  const checkbox = document.createElement('input')
  checkbox.setAttribute('type', 'checkbox')
  checkbox.setAttribute('id', book.id)
  checkbox.checked = book.isCompleted
  checkbox.addEventListener('click', handleCheckboxClick)
  container.appendChild(checkbox)

  const deleteButton = document.createElement('button')
  deleteButton.setAttribute('id', book.id)
  deleteButton.textContent = 'Delete'
  deleteButton.addEventListener('click', handleDeleteClick)
  container.appendChild(deleteButton)

  const bookElement = document.createElement('li')
  bookElement.appendChild(container)
  return bookElement
}

const newBookButton = document.querySelector('button')
const form = document.querySelector('form')
const booksList = document.querySelector('.books')

const handleNewBookClick = (e) => {
  e.target.classList.toggle('hide')
  form.classList.toggle('hide')
}

const getFormData = (inputs) => {
  const data = inputs.map(input => {
    const inputType = input.getAttribute('type')
    if(inputType === 'checkbox') {
      return input.checked
    }
    return input.value
  })
  return data
}

const clearForm = (inputs) => {
  inputs.forEach(input => {
    const inputType = input.getAttribute('type')
    if(inputType === 'checkbox') {
      input.checked = false
    } else {
      input.value = ''
    }
  })
}

const handleFormSubmit = (e) => {
  e.preventDefault()
  const form = e.target
  const inputs = Array.from(form.querySelectorAll("input:not(input[type='submit'])"))
  
  const [title, author, numPages, completed] = getFormData(inputs)
  const book = new Book(title, author, parseInt(numPages), completed)
  booksList.appendChild(createBookElement(book))

  clearForm(inputs)
  form.classList.toggle('hide')
  newBookButton.classList.toggle('hide')
}

const handleCheckboxClick = (e) => {
  const checkbox = e.target
  const book = books.find(book => book.id === Number(checkbox.getAttribute('id')))
  book.completed = checkbox.checked
}

const handleDeleteClick = (e) => {
  const deleteButton = e.target
  books = books.filter(book => book.id !== Number(deleteButton.getAttribute('id')))
  booksList.removeChild(deleteButton.parentNode.parentNode)
}

newBookButton.addEventListener('click', handleNewBookClick)
form.addEventListener('submit', handleFormSubmit)
form.classList.toggle('hide')

books.forEach(book => {
    booksList.appendChild(createBookElement(book))
})


