import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Slide } from "react-toastify";
import { BsEyeSlashFill, BsEyeFill } from "react-icons/bs";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [input, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({
    nameError: "",
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Reset error on valid input
    if (name === "name" && value.trim() !== "") {
      setError((prev) => ({ ...prev, nameError: "" }));
    }
    if (name === "email" && validateEmail(value)) {
      setError((prev) => ({ ...prev, emailError: "" }));
    }
    if (name === "password" && value.length >= 6) {
      setError((prev) => ({ ...prev, passwordError: "" }));
    }
    if (name === "confirmPassword" && value.trim() !== "") {
      setError((prev) => ({ ...prev, confirmPasswordError: "" }));
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const Validation = () => {
    let newError = { ...error };
    let isValid = true;

    const { name, email, password, confirmPassword } = input;

    if (name.trim() === "") {
      newError.nameError = "Name is required.";
      isValid = false;
    } else {
      newError.nameError = "";
    }

    if (email.trim() === "") {
      newError.emailError = "Email is required.";
      isValid = false;
    } else if (!validateEmail(email)) {
      newError.emailError = "Invalid email.";
      isValid = false;
    } else {
      newError.emailError = "";
    }

    if (password.trim() === "") {
      newError.passwordError = "Password is required.";
      isValid = false;
    } else if (!validatePassword(password)) {
      newError.passwordError =
        "Password must be at least 8 characters long and include at least one number.";
      isValid = false;
    } else {
      newError.passwordError = "";
    }

    if (confirmPassword.trim() === "") {
      newError.confirmPasswordError = "Confirm Password is required.";
      isValid = false;
    } else if (password !== confirmPassword) {
      newError.confirmPasswordError = "Passwords do not match.";
      isValid = false;
    } else {
      newError.confirmPasswordError = "";
    }

    setError(newError);
    return isValid;
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirm(!showConfirm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!Validation()) {
      toast.error("Please fix the errors!", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        input.email,
        input.password
      );
      const user = userCredential.user;

      console.log("Firebase Auth User UID:", user.uid);

      await addSignUp(user.uid);

      toast.success("Sign up successfully!", {
        position: "top-center",
        autoClose: 2000,
      });

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Error:", error.message);
      toast.error(error.message);
    }
  };

  const addSignUp = async (userId) => {
    try {
      const userRef = await addDoc(collection(db, "users"), {
        name: input.name,
        email: input.email,
        password: input.password,
        confirmPassword: input.confirmPassword,
        LoggedUserId: userId,
      });

      console.log("Firestore User Document ID:", userRef.id);
    } catch (error) {
      console.error("Firestore Error:", error.message);
    }
  };

  return (
    <section className="min-h-screen w-full flex justify-center items-center bg-gray-100 m-0 p-0 md:pt-0">
      <div className="w-full max-w-md min-h-screen sm:min-h-full sm:w-full p-6 bg-white shadow-lg sm:rounded-none rounded-lg">
        <h1 className="text-center text-2xl font-bold mb-6">
          Sign up to your account
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 mb-6">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={input.name}
                onChange={handleInput}
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 ${
                  error.nameError ? "border-red-500" : ""
                }`}
                placeholder="John Doe"
                required
              />
              {error.nameError && (
                <p className="text-red-500 text-sm">{error.nameError}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={input.email}
                onChange={handleInput}
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 ${
                  error.emailError ? "border-red-500" : ""
                }`}
                placeholder="john.doe@company.com"
                required
              />
              {error.emailError && (
                <p className="text-red-500 text-sm">{error.emailError}</p>
              )}
            </div>
          </div>

          {/* Password Fields */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Password:
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={input.password}
                  onChange={handleInput}
                  className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 ${
                    error.passwordError ? "border-red-500" : ""
                  }`}
                  placeholder="•••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-5 right-3 flex items-center z-20"
                >
                  {showPassword ? (
                    <BsEyeFill size={18} />
                  ) : (
                    <BsEyeSlashFill size={18} />
                  )}
                </button>
              </div>
            </label>
            {error.passwordError && (
              <p className="text-red-500 text-sm">{error.passwordError}</p>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Confirm Password:
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={input.confirmPassword}
                  onChange={handleInput}
                  className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 ${
                    error.confirmPasswordError ? "border-red-500" : ""
                  }`}
                  placeholder="•••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute inset-y-5 right-3 flex items-center z-20"
                >
                  {showConfirm ? (
                    <BsEyeFill size={18} />
                  ) : (
                    <BsEyeSlashFill size={18} />
                  )}
                </button>
              </div>
            </label>
            {error.confirmPasswordError && (
              <p className="text-red-500 text-sm">
                {error.confirmPasswordError}
              </p>
            )}
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-start mb-6">
            <input
              id="terms"
              type="checkbox"
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50"
              required
            />
            <label htmlFor="terms" className="ml-2 text-sm text-gray-900">
              I agree with the{" "}
              <a href="#" className="text-blue-600 hover:underline">
                terms and conditions
              </a>
              .
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Submit
          </button>
        </form>

        <div className="flex mt-5 text-center justify-center">
          <p>Already have an account?</p>
          <Link to="/" className="font-bold ml-1">
            Login Here
          </Link>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer transition={Slide} />
    </section>
  );
};

export default SignUp;
