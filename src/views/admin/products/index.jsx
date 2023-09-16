// BlogPage.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import axios from 'axios';
import { baseURL } from 'utils/constant';

const SolutionsPage = () => {
  const [solutions, setSolutions] = useState([]);

  useEffect(() => {
  
    const fetchProducts = async () => {
      try {
        const response = await axios.post(`${baseURL}/getSolutions`);   
        setSolutions(response.data.data);
      } catch (error) {
        console.error('Error fetching solutions:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {solutions && solutions.map((solution) => (
          <div key={solution.id}>               
            <h2>{solution.title}</h2>           
          </div>         
        ))}
      </div>
      <div className="mt-6">
      <Link to="../add-solution" className="bg-blue-500 text-white py-2 px-4 rounded">
          Add New Product/Service
        </Link>
      </div>
    </div>
  );
};

export default SolutionsPage;
