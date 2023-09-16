import React, { useState } from "react";
import InputField from "components/fields/InputField";
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';
import { baseURL } from '../../utils/constant';
import { Link } from 'react-router-dom';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    //Validations
    const validationErrors = {};
    if (!email) {
        validationErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        validationErrors.email = 'Invalid email address';
    }
    if (!username) {
        validationErrors.username = 'Username is required';
    } 
    if (!password) {
        validationErrors.password = 'Password is required';
    } else if (password.length < 6) {
        validationErrors.password = 'Password must be at least 6 characters long';
    }

    if (Object.keys(validationErrors).length === 0) {
        // Form is valid, submit data to the server
        const userData = {
            email,
            password,
            username
        }
        try {
            await axios.post(`${baseURL}/signup`, userData)
                .then((response) => {
                    if (response.data.status === "saved") {
                        setEmail('');
                        setPassword('');
                        setUsername('');
                        setErrors({});
                        setTimeout(() => {
                            setLoading(false);
                        }, 2000);
                        window.location.href = '../auth/sign-in';
                    } else {
                        setLoading(false);
                    }
                });
            setErrors({});
        }
        catch (e) {
            if (e.code === "ERR_NETWORK") {
                // setLoginFail('It seems you not connected to Internet.');
            }
            setLoading(false);
        }
    } else {
        setErrors(validationErrors);
        setLoading(false);
    }
  }

  return (
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">      
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Sign Up
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          Enter your email and password to sign up!
        </p>
        <div className="mb-6 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-lightPrimary hover:cursor-pointer dark:bg-navy-800">
          <div className="rounded-full text-xl">
            <FcGoogle />
          </div>
          <h5 className="text-sm font-medium text-navy-700 dark:text-white">
            Sign Up with Google
          </h5>
        </div>
        <div className="mb-6 flex items-center  gap-3">
          <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
          <p className="text-base text-gray-600 dark:text-white"> or </p>
          <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
        </div>
        <InputField
          variant="auth"
          extra="mb-3"
          label="Email*"
          placeholder="mail@simmmple.com"
          id="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          type="email"
        />
        <InputField
          variant="auth"
          extra="mb-3"
          label="Username*"
          placeholder="John Doe"
          id="username"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
          type="text"
        />
        <InputField
          variant="auth"
          extra="mb-3"
          label="Password*"
          placeholder="Min. 6 characters"
          id="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          type="password"
        />
        <button onClick={handleSubmit} className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
          { loading ? 'Please wait' : 'Sign Up'}
        </button>
        <div className="mt-4">
          <span className=" text-sm font-medium text-navy-700 dark:text-gray-600">
            Already registered?
          </span>
          <a
            href="./sign-in"
            className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
          >
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
}
