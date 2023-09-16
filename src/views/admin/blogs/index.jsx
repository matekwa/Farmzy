// BlogPage.js
import React, { useEffect, useState } from 'react';
import BlogPost from './BlogPost';
import { Link } from 'react-router-dom'; 
import axios from 'axios';
import { baseURL } from 'utils/constant';

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Fetch blogs from API and update the state
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${baseURL}/getBlogs`); 
        console.log(response);  
        setBlogs(response.data.data);  
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <BlogPost
            key={blog.id}
            title={blog.title}
            content={blog.content}
            author={blog.author}
            date={blog.date}
          />
        ))}
      </div>
      <div className="mt-6">
      <Link to="../add-blog" className="bg-blue-500 text-white py-2 px-4 rounded">
          Add New Blog
        </Link>
      </div>
    </div>
  );
};

export default BlogPage;
