import React from "react";
import { FacebookAuthProvider, getAuth, signInWithPopup } from "@firebase/auth";
import { getApp } from "firebase/app";
import { app } from "../../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function Oauthfb() {
  

  async function handleFbClick() {
    try {
        const provider = new FacebookAuthProvider();
        const auth = getAuth(app);
        // const result = await signInWithPopup(auth, provider);
        const result = await signInWithPopup(auth, provider);
        console.log(result);
    } catch (error) {
        console.log("Could not signup with facebook", error);
    }
  }
  return (
    <button
      onClick={handleFbClick}
      type="button"
      className="bg-blue-700 hover:opacity-95 text-white p-3 rounded-lg uppercase "
    >
      CONTINUE WITH FACEBOOK
    </button>
  );
}
