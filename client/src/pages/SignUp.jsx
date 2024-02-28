import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const BASE_URL = "http://localhost:3000";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [loading, setisLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate()
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setisLoading(true);
   try {
     const res = await fetch(`${BASE_URL}/api/auth/signup`, {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify(formData),
     });

     console.log("res:  ", res);
     const data = await res.json();
     if (data.success === false) {
       setError(data.message);
       setisLoading(false);
       return;
     }
     console.log(data);
     setisLoading(false);
     setError(null)
     navigate("/sign-in")
   } catch (error) {
    setError(data.message);
    setisLoading(false);
   }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Signup</h1>
      <form action="" className="flex gap-4 flex-col" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          className="border p-3 rounded-lg"
          id="username"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <button
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95"
          disabled={loading}
        >
          {loading? 'Loading...': 'Sign up'}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an Account? </p>
        <Link to="/sign-in">
          {" "}
          <span className="text-blue-700">Sign in</span>{" "}
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}
