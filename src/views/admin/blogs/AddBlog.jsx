import React, { useState, useRef  } from 'react';
import { Link } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios'
import {baseURL } from "../../../utils/constant"

const AddBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [tags, setTags] = useState('');
  const [thumbnail, setThumbnail] = useState(null);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
    }
  };  

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleAuthorChange = (e) => {
    setAuthor(e.target.value);
  };

  const handleTagsChange = (e) => {
    setTags(e.target.value);
  };

  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['blockquote', 'code-block'],
      [{ color: [] }, { background: [] }],
      ['link', 'image'],
      ['clean'],
    ],
  };
  

  const quillRef = useRef(null); // Create a ref for the Quill instance

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || !author || !tags || !thumbnail) {
      alert('All fields are required.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('author', author);
    formData.append('tags', tags);
    formData.append('thumbnail', thumbnail);  
   
    try { 
      const response = await axios.post(`${baseURL}/add-blog`, formData);  
      console.log('Blog added successfully:', response.data);
    } catch (error) {
      console.error('Error adding blog:', error); 
    }
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={handleTitleChange}
            className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-indigo-300"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700">
            Thumbnail
          </label>
          <input
            type="file"
            id="thumbnail"
            name="thumbnail"
            accept="image/*"
            onChange={handleThumbnailUpload}
            className="mt-1 p-2 border rounded-md focus:ring focus:ring-indigo-300"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block font-medium text-gray-700">
            Content
          </label>
          <ReactQuill
          ref={quillRef}
          value={content}
          onChange={handleContentChange}
          modules={modules}
          className="border rounded focus:ring focus:ring-indigo-300"
        />
        </div>
        <div className="mb-4">
          <label htmlFor="author" className="block text-sm font-medium text-gray-700">
            Author
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={author}
            onChange={handleAuthorChange}
            className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-indigo-300"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
            Tags
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={tags}
            onChange={handleTagsChange}
            className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-indigo-300"
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Add Blog
          </button>
        </div>
      </form>
      <Link to="/admin" className="block mt-4 text-blue-500 hover:underline">
        Back to Admin Panel
      </Link>
    </div>
  );
};

export default AddBlog;
