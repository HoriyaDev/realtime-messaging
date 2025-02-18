
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsEyeSlash, BsEyeFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { ToastContainer, toast, Slide } from 'react-toastify';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import 'react-toastify/dist/ReactToastify.css';


const SignIn = () => {

    const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {  // Make function async
    e.preventDefault();
  
    // Check if fields are empty
    if (input.email.trim() === "" || input.password.trim() === "") {
      toast.warn("Fill the fields", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return; // Stop execution if fields are empty
    }
  
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        input.email,
        input.password
      );
  
      console.log(userCredential.user.email); // Access the user from userCredential
  
      // Show success toast
      toast.success("Login successful!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
  
      // Delay navigation to allow toast to show (2 seconds)
      setTimeout(() => {
        navigate("./home");
      }, 2000);
    } catch (error) {
      console.log(error.code); // Log the error code
  
      // Show error toast only for incorrect credentials
      if (error.code === "auth/invalid-credential") {
        toast.error("Incorrect email or password", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error("Login failed. Please try again.", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };
  
  const handleShow = () => {
    setShowPassword(!showPassword);
  };

  return (

    <section className='min-h-screen w-full flex justify-center items-center bg-gray-100 m-0 p-0 md:pt-0"'> 


   <div  className="w-full max-w-md min-h-screen sm:min-h-full sm:w-full p-6 bg-white shadow-lg sm:rounded-none rounded-lg">


   <h1 className="text-center text-2xl font-bold mb-6">
   Sign in to your account
        </h1>



        <form onSubmit={handleLogin}>
        <div className="relative mb-8">
        <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Email address
              </label>
          <input
            type="email"
            id="email"
            name='email'
            value={input.email}
            onChange={handleInput}
            className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"}
          />
        </div>

        <div className="relative mb-8">
        <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Password
              </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={input.password}
            onChange={handleInput}
            name='password'
            className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"}
          />
          <button
            type='button'
            className='absolute inset-y-10 right-2  z-20'
            onClick={handleShow}
          >
            {showPassword ? <BsEyeFill size={18} /> : <BsEyeSlash size={18} />}
          </button>
        </div>

        <button
          type='submit'
          className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Login
        </button>

        <div className='mt-5 text-center'>
          <p>Don't have an account?
            <Link to="/sign-up" className='font-bold'> Sign up Here</Link>
          </p>
        </div>
      </form>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide} // Using Slide transition
      />
   </div>


     </section>
    
  );
};



export default SignIn