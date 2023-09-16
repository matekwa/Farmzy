// BlogPost.js
import React from 'react';

const BlogPost = ({ title, content, author, date }) => {
  return (
    <div className="bg-white p-4 shadow-md rounded-md">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-gray-600">{content}</p>
      <div className="mt-2 text-sm text-gray-400">
        By {author} on {date}
      </div>
    </div>
  );
};

export default BlogPost;
