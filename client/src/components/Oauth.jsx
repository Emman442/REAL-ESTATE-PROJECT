import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "@firebase/auth";
import { getApp } from "firebase/app";
import { app } from "../../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function Oauth() {
  const BASE_URL = "http://localhost:3000";
  const navigate = useNavigate()
  const dispatch = useDispatch();
  async function handleGoogleClick() {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      console.log(result.user.photoURL)
      const res = await fetch(`${BASE_URL}/api/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate("/")
    } catch (error) {
      console.log("Could not ignup with google", error);
    }
  }
  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="bg-red-700 hover:opacity-95 text-white p-3 rounded-lg uppercase "
    >
      CONTINUE WITH GOOGLE
    </button>
  );
}
