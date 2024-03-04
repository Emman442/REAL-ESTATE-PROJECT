import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { app } from "../../firebase";
import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../redux/user/userSlice";
export default function Profile() {
  const BASE_URL = "http://localhost:3000";
  const dispatch = useDispatch();
  const {currentUser} = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [fileError, setFileError] = useState(false);
  const [filePerc, setFilePerc] = useState(0);
  const [formData, setFormData] = useState({});
 

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(formData);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      dispatch(updateUserStart);
      const res = await fetch(
        `${BASE_URL}/api/user/update/${currentUser.validUser._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify( formData ),
        }
      );
      console.log(res)
      const data = await res.json();
      
      if (data.success === false) {
        dispatch(updateUserFailure(error.message));
      }
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  }
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log('upload is '+ progress + '% done')
        setFilePerc(Math.round(progress));
      },
      (error) => setFileError(true),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          // console.log(downloadUrl)
          setFormData({ ...formData, avatar: downloadUrl });
        });
      }
    );
  };
  return (
    <div className="p-2 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form action="" onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
          type="file"
          name=""
          id=""
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2 "
          src={formData.avatar || currentUser.validUser.avatar}
          alt="profile"
        />
        <p className="text-center">
          {fileError ? (
            <span className="text-red-700">Error Uploading Image</span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span> {`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-70 text-center">
              Image Successfully Uploaded!
            </span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg"
          id="username"
          defaultValue={currentUser.validUser.username}
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg"
          id="email"
          defaultValue={currentUser.validUser.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
          // defaultValue={currentUser.currentUser.user.password}
        />
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95">
          {" "}
          UPDATE
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign out</span>
      </div>
    </div>
  );
}
