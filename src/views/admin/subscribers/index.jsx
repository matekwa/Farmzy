import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseURL } from 'utils/constant';

const NewsletterSubscribers = () => {
  const [subscribers, setSubscribers] = useState([]);

  const handleDeleteSubscriber = (subscriberId) => {
    const updatedSubscribers = subscribers.filter(subscriber => subscriber.id !== subscriberId);
    setSubscribers(updatedSubscribers);
  };

  
  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const response = await axios.get(`${baseURL}/getSubscribers`);   
        setSubscribers(response.data.data);  
      } catch (error) {
        console.error('Error fetching subscribers:', error);
      }
    };

    fetchSubscribers();
  }, []);

  return (
    <div className="p-6">

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border">ID</th>
            <th className="py-2 px-4 border">Date Joined</th>
            <th className="py-2 px-4 border">Email</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {subscribers && subscribers.map(subscriber => (
            <tr key={subscriber._id} className="border-t">
              <td className="py-2 px-4 border">{subscriber._id}</td>
              <td className="py-2 px-4 border">{subscriber.date}</td>
              <td className="py-2 px-4 border">{subscriber.email}</td>
              <td className="py-2 px-4 border">
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDeleteSubscriber(subscriber._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NewsletterSubscribers;
