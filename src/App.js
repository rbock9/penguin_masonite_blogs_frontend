// Import Our Components
import AllBlogs from "./pages/AllBlogs"
import SingleBlog from "./pages/SingleBlog";
import Form from "./pages/Form";

// Import hooks from React
import { useState, useEffect } from "react";

// Import components from React Router
import { Route, Routes, Link, useNavigate } from "react-router-dom";



function App() {
  ////////////////////
  // Style Objects
  ////////////////////

  const h1 = {
    textAlign: "center",
    margin: "10px",
  };

  const button = {
    backgroundColor: "navy",
    display: "block",
    margin: "auto",
  };

  ///////////////
  // State & Other Variables
  ///////////////
  const navigate = useNavigate()

  // Our Api Url
  const url = "https://penguin-mason-blog-backend-rb.herokuapp.com/blogs/";

  // State to Hold The List of Blogs
  const [blogs, setBlogs] = useState([]);

  // an object that represents a null blog
  const nullBlog = {
    title: "",
    body: "",
  };

  // const state to hold blog to edit
  const [targetBlog, setTargetBlog] = useState(nullBlog);

  //////////////
  // Functions
  //////////////

  // Function to get list of Blogs from API
  const getBlogs = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setBlogs(data);
  };

  // Function to add blog from form data
  const addBlogs = async (newBlog) => {
    const response = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBlog),
    });

    // get updated list of blogs
    getBlogs();
  };

  // Function to select blog to edit
  const getTargetBlog = (blog) => {
    setTargetBlog(blog);
    navigate("/edit");
  };

  // Function to edit blog on form submission
  const updateBlog = async (blog) => {
    await fetch(url + blog.id + "/", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blog),
    });

    // get updated list of blogs
    getBlogs();
  };

  // Function to delete blog on form submission
  const deleteBlog = async (blog) => {
    await fetch(url + blog.id + "/", {
      method: "delete",
    });

    // get updated list of blogs
    getBlogs();
    navigate("/");
  };


  //////////////
  // useEffects
  //////////////
  // useEffect to get list of blogs when page loads
  useEffect(() => {
    getBlogs();
  }, []);


  //////////////////////////
  // Returned JSX
  //////////////////////////

  return (
    <div className="App">
      <h1 style={h1}>My Blog List</h1>
      <Link to="/new"><button style={button}>Create New Blog
      </button></Link>
      <Routes>
        <Route path="/" element={<AllBlogs blogs={blogs}/>}/>
        <Route path="/blog/:id" element={<SingleBlog 
        blogs={blogs} 
        edit={getTargetBlog}
        deleteBlog={deleteBlog}
        />} />
        <Route path="/new" element={<Form
          initialBlog={nullBlog}
          handleSubmit={addBlogs}
          buttonLabel="Create Blog"
        />}/>
        <Route path="/edit" element={<Form
          initialBlog={targetBlog}
          handleSubmit={updateBlog}
          buttonLabel="Update Blog"
        />}/>
      </Routes>
    </div>
  );
}

export default App;
