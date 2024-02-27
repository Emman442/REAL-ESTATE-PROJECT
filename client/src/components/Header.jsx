import React from 'react'
import {FaSearch} from "react-icons/fa"
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className=" bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Chidera</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>

        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="search..."
            className="bg-transparent focus:outline-none sm-w-64 w-24"
          />
          <FaSearch className="text-slate-600" />
        </form>
        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden sm:inline hover:underline text-slate-700">
              Home
            </li>
          </Link>
          <Link to="/">
            <li className="hidden sm:inline hover:underline text-slate-700">
              About
            </li>
          </Link>
          <li className="hover:underline text-slate-700">Sign in </li>
        </ul>
      </div>
    </header> //header tag is good for SEO purposes
  );
}
