import React, { useState, useEffect } from 'react';
import Custome_heading from '../inc/Custome_heading';  
import axios from 'axios';
import Nav2_forPatient from '../inc/Nav2_forPatient';
// import '../StyleSheets/Comment_Reply.css';

const Comment_Reply = () => {
  const [comments, setComments] = useState([]);

  // useEffect(() => {
  //   // Fetch comments from the API
  //   const fetchComments = async () => {
  //     try {
  //       const response = await axios.get('http://localhost/Hakeemhikmat/api/comments');
  //       setComments(response.data);
  //     } catch (error) {
  //       console.error('Error fetching comments:', error);
  //     }
  //   };

  //   fetchComments();
  // }, []);

  return (
    <div>
      <Nav2_forPatient/>
      <Custome_heading title="Comment & Reply" />

      <div className="comments-container">
        {/* {comments.map((comment, index) => (
          <div key={index} className="comment">
            <div className="comment-header">
              <div className="comment-author">{comment.author}</div>
              <div className="comment-date">{new Date(comment.date).toLocaleDateString()}</div>
            </div>
            <div className="comment-body">{comment.text}</div>
          </div>
        ))} */}
      </div>
    </div>
  );
}

export default Comment_Reply;
