import Blog from "./components/Blog.jsx"
import { useState, useEffect } from 'react'
import blogService from './services/blogs' // imports THREE functions as default c: 
import Notification from './components/Notification.jsx'
import Footer from './components/Footer.jsx'

const App = () => {
  const [blogs, setBlogs] = useState(null) // HUOM! Tämä takia, huomaa rivin ~~19 "if(!blogs) {return null}" joka varmistaa, että App:in käynnistäessä ekalla kertaa palautetaan null, ja vasta kun blogs on haettu serveriltä (?), alkaa toimimaan; palautetaan null App:ista, kunnes serveriltä on saatu data. HUOM! "The method based on conditional rendering is suitable in cases where it is impossible to define the state so that the initial rendering is possible." Eli mitään oikeaa syytä initata blogs "null":iksi ei ole; paljon mieluummin inittaa []:ksi, jolloin tätä ongelmaa ei ole!! (ongelma: null:ille ei voi kutsua .map:iä. TAI, joutuisit joka kohdassa tarkistamaan ?.map jne... paskempi vaihtoehto)
  const [newBlog, setNewBlog] = useState('')

  const [errorMessage, setErrorMessage] = useState('')
  
  useEffect(() => {    
    blogService.getAll()
    .then(initialBlogs => {
      setBlogs(initialBlogs)
    }) 
  }, []) // without the [] as 2nd argument, it would keep rendering them FOREVER! Thanks to the [], it will only render them ONCE c:
  if(!blogs) { 
    return null
  }
  console.log('render', blogs.length, 'blogs')

  const addBlog = (event) => {
    event.preventDefault()   // prevents the page from being refreshed on submit event 
    console.log('form onSubmit button clicked', event.currentTarget)  // event.target works too: "event.target will return the element that was clicked but not necessarily the element to which the event listener has been attached."
    const blogObject = { // TO-DO: check what should be going on here!
      title: newBlog,
      author: "testi",
      likes: 0,
      url: "abcd"
      // id : blogs.length+1 // "it's better to let the server generate the new id"
    }

    blogService      
    .create(blogObject)      
    .then(blog => {        
      setBlogs(blogs.concat(blog))
      setNewBlog('')
    })
  }

  const handleBlogChange = (event) => {     // this event handler is called EVERY TIME onChange of the form value (=form field!). See console.logs! This is needed to be able to change the input value of the form; otherwise it's stuck forever as "a new blog" and the console will show a React error message complaining about this c:
    console.log(event.currentTarget.value)
    setNewBlog(event.currentTarget.value)   // this updates the newBlog based on what the value of the form input field is
  }

  let palautettavat_blogit = [...blogs]
  if(!palautettavat_blogit) {
    palautettavat_blogit = []
  } else {
    console.log("blogs:",palautettavat_blogit.length)
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={ errorMessage } />
      <ul>
      <p>BLOGIT TÄNNE!</p>
      {palautettavat_blogit.map(blog => 
        <Blog key={blog.id} blog={blog}/> // returns <li> Blog </li>
      )}
      
      </ul>
      <form onSubmit={addBlog}>        
        <input value={newBlog} onChange={handleBlogChange}/>
        <input value={newBlog} onChange={handleBlogChange}/>
        <input value={newBlog} onChange={handleBlogChange}/>
        <input value={newBlog} onChange={handleBlogChange}/>        
        <button type="submit">save</button>
      </form>
      <Footer/>
    </div>
  )
}

export default App
//