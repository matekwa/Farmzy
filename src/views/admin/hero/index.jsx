import React, { useState, useEffect } from 'react';
import axios from 'axios'
import {baseURL } from "../../../utils/constant"

const EditHero = () => {
  const [title1, setTitle1] = useState('Welcome to Our Website');
  const [title2, setTitle2] = useState('Discover Amazing Features');
  const [title3, setTitle3] = useState('Join Us Today');
  const [backgroundImage, setBackgroundImage] = useState(''); 
  const [previewImage, setPreviewImage] = useState(''); 
  const [hero, setHero] = useState(''); 

  const handleTitle1Change = (e) => {
    setTitle1(e.target.value);
  };

  const handleTitle2Change = (e) => {
    setTitle2(e.target.value);
  };

  const handleTitle3Change = (e) => {
    setTitle3(e.target.value);
  };

  const handleBackgroundImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setBackgroundImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title1 || !title2 || !title3 || !backgroundImage) {
      alert('Please fill out all required fields.');
      return;
    }
    
    // Create a FormData object to handle file uploads
    const formData = new FormData();
    formData.append('title1', title1);
    formData.append('title2', title2);
    formData.append('title3', title3);
    formData.append('backgroundImage', backgroundImage);

    try {
      // Perform API call or update logic with edited hero content
      const response = await axios.put(`${baseURL}/edit-hero`, formData);

      console.log('Hero content updated successfully:', response.data);
      // Redirect or show success message
    } catch (error) {
      console.error('Error updating hero content:', error);
      // Show error message
    }
  };

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const response = await axios.get(`${baseURL}/getHero`);   
        setHero(response.data.data);  
      } catch (error) {
        console.error('Error fetching hero:', error);
      }
    };

    fetchHero();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Hero</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title1" className="block text-sm font-medium text-gray-700">
            Title 1
          </label>
          <input
            type="text"
            id="title1"
            name="title1"
            value={title1}
            onChange={handleTitle1Change}
            className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-indigo-300"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="title2" className="block text-sm font-medium text-gray-700">
            Title 2
          </label>
          <input
            type="text"
            id="title2"
            name="title2"
            value={title2}
            onChange={handleTitle2Change}
            className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-indigo-300"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="title3" className="block text-sm font-medium text-gray-700">
            Title 3
          </label>
          <input
            type="text"
            id="title3"
            name="title3"
            value={title3}
            onChange={handleTitle3Change}
            className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-indigo-300"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="backgroundImage" className="block text-sm font-medium text-gray-700">
            Background Image
          </label>
          {backgroundImage && (
            <img src={previewImage} alt="Background" className="max-h-24 mb-2" />
          )}
          <input
            type="file"
            id="backgroundImage"
            name="backgroundImage"
            accept="image/*"
            onChange={handleBackgroundImageUpload}
            className="mt-1 p-2 border rounded-md focus:ring focus:ring-indigo-300"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditHero;
