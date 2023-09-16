import React, { useState, useEffect } from 'react';
import {baseURL } from "../../../utils/constant";
import axios from 'axios';


const Partners = () => {
  const [partnerLogos, setPartnerLogos] = useState([]); // State to store partner logos
  const [presentClients, setPresentClients] = useState([]);

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('logo', file);

      try {
        const response = await axios.post(`${baseURL}/upload-logo`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        // If the upload was successful, you can handle the response as needed
        console.log('Logo uploaded:', response.data);
        setPartnerLogos([...partnerLogos, response.data.logoUrl]);
      } catch (error) {
        console.error('Error uploading logo:', error);
      }
    }
  };

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get(`${baseURL}/getClients`);   
        setPresentClients(response.data.data);  
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    fetchClients();
  }, []);

  return (
    <div className="p-6">
      <div className="grid grid-cols-3 gap-4">
        {partnerLogos.map((logoUrl, index) => (
          <div key={index} className="border p-4">
            <img src={logoUrl} alt={`Partner Logo ${index + 1}`} className="max-h-24 mx-auto" />
          </div>
        ))}
        <label htmlFor="logoInput" className="border p-8 flex flex-col items-center justify-center cursor-pointer">
          <span className="text-gray-400 text-xl">Add Partner's logo</span>
          <input
            type="file"
            id="logoInput"
            accept="image/*"
            onChange={handleLogoUpload}
            className="hidden"
          />
        </label>
        {
          presentClients && presentClients.map((client)=>{
            <div key={client._id}>
              <img src={client.image} alt="Client Photo" />
            </div>
          })
          }
      </div>
    </div>
  );
};

export default Partners;
