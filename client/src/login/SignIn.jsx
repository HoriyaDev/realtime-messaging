
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsEyeSlash, BsEyeFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { ToastContainer, toast, Slide } from 'react-toastify';
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

  const handleLogin = (e) => {
    e.preventDefault();
    const loggedData = JSON.parse(localStorage.getItem("user"));
  
    if (input.email.trim() === "" && input.password.trim() === "") {
      toast.warn('Fill the fields', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (loggedData && input.email === loggedData.email && input.password === loggedData.password) {
      toast.success('Login Successfully', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
  
      // Delay the navigation to the dashboard to allow the success toast to show
      setTimeout(() => {
        localStorage.setItem("logged", "true");
        navigate('/home');
      }, 2000); // Delay of 2 seconds (matches the toast duration)
      
    } else {
      toast.warn('Incorrect email and password', {
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
    // <div className='w-1/2 h-[500px] mx-auto mt-20 flex flex-col items-center justify-center'>
      
    //   <h1 className='mb-10 text-center'>Sign in </h1>

    //   <form onSubmit={handleLogin}>
    //     <div className="relative mb-8">
    //       <label htmlFor="email" className="absolute top-3 left-6 z-10 text-blue-700">Email</label>
    //       <input
    //         type="email"
    //         id="email"
    //         name='email'
    //         value={input.email}
    //         onChange={handleInput}
    //         className="w-[520px] h-[70px] pl-5 pt-6 border-blue-600 border-2 text-xl rounded-full focus:outline-none"
    //       />
    //     </div>

    //     <div className="relative mb-8">
    //       <label htmlFor="password" className="absolute top-3 left-6 z-10 text-blue-700">Password</label>
    //       <input
    //         type={showPassword ? "text" : "password"}
    //         id="password"
    //         value={input.password}
    //         onChange={handleInput}
    //         name='password'
    //         className="w-[520px] h-[70px] pl-5 pt-6 border-blue-600 border-2 text-xl rounded-full focus:outline-none"
    //       />
    //       <button
    //         type='button'
    //         className='absolute inset-y-0 right-8 text-blue-700 z-20'
    //         onClick={handleShow}
    //       >
    //         {showPassword ? <BsEyeFill size={'20px'} /> : <BsEyeSlash size={'20px'} />}
    //       </button>
    //     </div>

    //     <button
    //       type='submit'
    //       className='w-[520px] h-[50px] mt-2 text-white bg-blue-500 rounded-full text-xl'
    //     >
    //       Login
    //     </button>

    //     <div className='mt-5 text-center'>
    //       <p>Don't have an account?
    //         <Link to="/sign-up" className='font-bold'> Sign up Here</Link>
    //       </p>
    //     </div>
    //   </form>
    //   <ToastContainer
    //     position="top-center"
    //     autoClose={2000}
    //     hideProgressBar={false}
    //     newestOnTop={false}
    //     closeOnClick
    //     rtl={false}
    //     pauseOnFocusLoss
    //     draggable
    //     pauseOnHover
    //     theme="light"
    //     transition={Slide} // Using Slide transition
    //   />
    // </div> */}
  );
};



export default SignIn