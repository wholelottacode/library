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
  new Book("Harry Potter and the Sorcerer's Stone", 'JK Rowling', 307, true),
  new Book('The Great Gatsby', 'F. Scott Fitzgerald', 212, true),
  new Book('The Count of Monte Cristo', 'Alexandre Dumas', 1215, false)
]

const createBookElement = (book) => {
  const {title, author, numPages, isCompleted, id} = book 
  const container = document.createElement('div')
  container.classList.add('book')
  const pages = `${numPages} ${numPages === 1 ? 'Page' : 'Pages'}`
  const bookData = `
      <h3 ${isCompleted ? "class=completed" : ""}> ${title}</h3>
      <p>${author} &bull; ${pages}</p>
  `
  container.innerHTML = bookData

  const buttonContainer = document.createElement('div')
  buttonContainer.setAttribute('class', 'button_container')

  const checkbox = document.createElement('input')
  checkbox.setAttribute('type', 'checkbox')
  checkbox.setAttribute('id', id)
  checkbox.checked = isCompleted
  checkbox.addEventListener('click', handleCheckboxClick)
  

  const deleteButton = document.createElement('button')
  deleteButton.setAttribute('id', id)
  deleteButton.textContent = 'Delete'
  deleteButton.addEventListener('click', handleDeleteClick)
  
  buttonContainer.appendChild(deleteButton)
  buttonContainer.appendChild(checkbox)

  container.appendChild(buttonContainer)

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
  books.push(book)
  booksList.appendChild(createBookElement(book))
  clearForm(inputs)
  form.classList.toggle('hide')
  newBookButton.classList.toggle('hide')
}

const handleCheckboxClick = (e) => {
  const checkbox = e.target
  const book = books.find(book => book.id === Number(checkbox.getAttribute('id')))
  book.completed = checkbox.checked
  const bookElement = checkbox.parentNode.parentNode
  const title = bookElement.querySelector('h3')
  title.classList.toggle('completed')
}

const handleDeleteClick = (e) => {
  const deleteButton = e.target
  books = books.filter(book => book.id !== Number(deleteButton.getAttribute('id')))
  booksList.removeChild(deleteButton.parentNode.parentNode.parentNode)
}

newBookButton.addEventListener('click', handleNewBookClick)
form.addEventListener('submit', handleFormSubmit)
form.classList.toggle('hide')

books.forEach(book => {
    booksList.appendChild(createBookElement(book))
})


