import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [books, setBooks] = useState([])
  const [title, setTitle] = useState("")
  const [releaseYear, setReleaseYear] = useState(0)
  const [newTitle, setNewTitle] = useState("")

  useEffect(() => {
    fetchBooks();
  }, [])

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/books/")
      const data = await response.json()
      setBooks(data)
    } catch (err) {
      console.log(err)
    }
  }

  const addBook = async () => {
    const bookData = {
      title,
      release_year: releaseYear,
    }
    try {
      const response = await fetch("http://127.0.0.1:8000/api/books/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(bookData),
      })

      const data = await response.json()
      setBooks((prev) => [...prev, data])

    } catch (err) {
      console.log(err)
    }
  }

  const updateTitle = async (pk, release_year) => {
    const bookData = {
      title: newTitle,
      release_year
    }
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/books/${pk}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(bookData),
      })

      const data = await response.json()
      setBooks((prev) => prev.map((book) => {
        if (book.id === pk) {
          return data
        } else {
          return book
        }
      }))

    } catch (err) {
      console.log(err)
    }
  }

  const deleteBook = async (pk) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/books/${pk}`, {
        method: "DELETE"
      })

      setBooks((prev) => prev.filter((book) => book.id !== pk))
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <h1 className="text-3xl text-fuchsia-400 font-bold w-auto mb-10 mx-auto">Book Website</h1>

      <div>
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-auto p-2.5 mb-2.5 mx-auto"
          placeholder="Book Title..."
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-auto p-2.5 mb-2.5 mx-auto"
          placeholder="Release Date..."
          onChange={(e) => setReleaseYear(e.target.value)}
        />
        <button
          type="button"
          className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          onClick={addBook}
        >Add Book</button>
      </div>

      <div className="flex flex-wrap">
        {books.map((book) => (
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2">
            <div className="border rounded-lg shadow-sm p-4 flex flex-col">
              <p className="mb-1"><span className="font-bold">Title: </span>{book.title}</p>
              <p className="mb-2"><span className="font-bold">Release Year: </span>{book.release_year}</p>
              <input
                type="text"
                className="w-full p-1.5 mb-2 border rounded"
                placeholder="New Title..."
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <div className="flex gap-2">
                <button
                  className="flex-1 py-1.5 text-sm border rounded"
                  onClick={() => updateTitle(book.id, book.release_year)}
                >
                  Change Title
                </button>
                <button
                  className="flex-1 py-1.5 text-sm border rounded"
                  onClick={() => deleteBook(book.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default App



{/* For Dark Theme= [dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500] ==> css className for input tag of book title and release year */ }
