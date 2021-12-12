class Book {
  constructor(author, title, numPages, isCompleted) {
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
