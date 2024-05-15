const Blog = ({ blog }) => {

  return (
    
    <li className='blog'>
      {blog.title}, {blog.author}, {blog._id}, {blog.likes}, {blog.awoejfi}
    </li>
  )
}

export default Blog