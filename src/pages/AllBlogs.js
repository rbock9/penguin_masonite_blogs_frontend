import React from "react";
import Blog from "../components/blog";

const AllBlogs = (props) => {
  // For each blog in the array render a Blog component
  return props.blogs.map((blog) => <Blog blog={blog} key={blog.id} />);
};

export default AllBlogs;
