import React, { useState, useRef  } from 'react';
import { Link } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios'
import {baseURL } from "../../../utils/constant"

const AddProducts = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [benefits, setBenefits] = useState('');
  const [features, setFeatures] = useState('');
  const [howItWorks, setHowItWorks] = useState('');
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

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleBenefits = (e) => {
    setBenefits(e.target.value);
  };

  const handleFeatures = (e) => {
    setFeatures(e.target.value);
  };

  const handleHowItWorks = (e) => {
    setHowItWorks(e.target.value);
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

    if (!title || !description || !benefits || !features || !howItWorks || !thumbnail) {
      alert('All fields are required.');
      return;
    }
  
    // Create a FormData object to handle file uploads
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('benefits', benefits);
    formData.append('features', features);
    formData.append('howItWorks', howItWorks);
    formData.append('thumbnail', thumbnail);
  
    try {
      // Perform API call to add blog with title, content, author, tags, and thumbnail
      const response = await axios.post(`${baseURL}/add-blog`, formData);
  
      console.log('Blog added successfully:', response.data);
      // Redirect or show success message
    } catch (error) {
      console.error('Error adding blog:', error);
      // Show error message
    }
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Solution Title
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
          <label htmlFor="description" className="block font-medium text-gray-700">
            Description
          </label>
          <ReactQuill
          ref={quillRef}
          value={description}
          onChange={handleDescription}
          modules={modules}
          className="border rounded focus:ring focus:ring-indigo-300"
        />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block font-medium text-gray-700">
            Key Features
          </label>
          <ReactQuill
          ref={quillRef}
          value={features}
          onChange={handleFeatures}
          modules={modules}
          className="border rounded focus:ring focus:ring-indigo-300"
        />
        </div>
        <div className="mb-4">
          <label htmlFor="howitworks" className="block font-medium text-gray-700">
            How it Works
          </label>
          <ReactQuill
          ref={quillRef}
          value={howItWorks}
          onChange={handleHowItWorks}
          modules={modules}
          className="border rounded focus:ring focus:ring-indigo-300"
        />
        </div>
        <div className="mb-4">
          <label htmlFor="benefits" className="block font-medium text-gray-700">
            Benefits
          </label>
          <ReactQuill
          ref={quillRef}
          value={benefits}
          onChange={handleBenefits}
          modules={modules}
          className="border rounded focus:ring focus:ring-indigo-300"
        />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
      <Link to="/admin" className="block mt-4 text-blue-500 hover:underline">
        Back to Admin Panel
      </Link>
    </div>
  );
};

export default AddProducts;
