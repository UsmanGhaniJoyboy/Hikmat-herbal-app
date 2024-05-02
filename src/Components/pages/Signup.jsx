import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../StyleSheets/Signup.css';
import logo_again from "../images/logo again.png";
import { useNavigate } from 'react-router-dom';


const Signup = () => {

  const navigate = useNavigate();


  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [image, setImage] = useState(null);
  const [role, setRole] = useState('patient'); // Default role is patient

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here
    console.log(`Username: ${username}, Email: ${email}, Password: ${password}, Confirm Password: ${confirmPassword}, Image: ${image}, Role: ${role}`);
  };

  const handleImageChange = (e) => {
    // Handle image upload
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <div className="signup-container">
      <div className="title_container">
          <img
            src={logo_again}
            alt="oops"
            style={{ width: "8%", height: "auto", margin: "0px" }}
          />
          <h1 className="title">Hikmat App</h1>
        </div>
        <hr
          style={{
            margin: "auto",
            width: "80%",
            color: "black",
            height: "2px",
            border: "1px solid black",
          }}
        />
      <h2 style={{ textAlign: "center", marginTop: "10px",fontSize:'1.6rem'}}>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-container ">
          <label htmlFor="image">Upload Image:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>
        <div className="input-container radio">
          <label style={{fontSize:'1.3rem'}}>Role:</label>
          <label>
            <input
              type="radio"
              value="patient"
              checked={role === 'patient'}
              onChange={() => setRole('patient')}
            />
            <span className='label_radio'> Patient</span>
          </label>
          <label>
            <input
              type="radio"
              value="hakeem"
              checked={role === 'hakeem'}
              onChange={() => setRole('hakeem')}
            />
            <span>Hakeem</span>
          </label>
        </div>
        <button onClick={()=>navigate("/")} type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
};

export default Signup;
