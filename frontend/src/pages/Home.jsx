import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import BooksTable from "../components/home/BooksTable";
import BooksCard from "../components/home/BooksCard";
import logo from '../assets/ShowCase.png';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const savedViewMode = localStorage.getItem("viewMode");
    if (savedViewMode) {
      setShowType(savedViewMode);
    }

    setLoading(true);
    axios
      .get(`${backendUrl}/books`)
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        alert("Backend restarting, please wait up to 30 seconds.");
        setLoading(false);
        setFailed(true);
      });
  }, []);

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen">
      <div className="p-6 max-w-6xl mx-auto">
        <div className="flex justify-center items-center gap-4">
          <h1 className="text-xl font-semibold">Display Options:</h1>
          <button
            className="bg-blue-600 hover:bg-blue-500 text-gray-100 px-4 py-2 rounded-lg transition duration-300"
            onClick={() => {
              setShowType("table");
              localStorage.setItem("viewMode", "table");
            }}
          >
            Table
          </button>
          <button
            className="bg-green-600 hover:bg-green-500 text-gray-100 px-4 py-2 rounded-lg transition duration-300"
            onClick={() => {
              setShowType("card");
              localStorage.setItem("viewMode", "card");
            }}
          >
            Card
          </button>
        </div>
        <div className="flex justify-between items-center my-8">
          <div className="flex items-center gap-4">
            <img src={logo} alt="Logo" className="w-25 h-24 rounded-lg" />
            <h1 className="text-3xl font-bold">ShowCase: A Movie & TV Show Watch List</h1>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/books/create">
              <span className="text-2xl font-semibold text-gray-100 hover:text-gray-400 transition duration-300">Create Item:</span>
            </Link>
            <Link to="/books/create">
              <MdOutlineAddBox className="text-gray-100 text-4xl hover:text-gray-400 transition duration-300" />
            </Link>
          </div>
        </div>
        {loading ? (
          <div className="flex flex-col justify-center items-center gap-4">
            <h1 className="text-lg font-medium">Initializing Backend, Please Wait Up to 30 Seconds</h1>
            <Spinner />
          </div>
        ) : showType === "table" ? (
          <BooksTable books={books} />
        ) : (
          <BooksCard books={books} />
        )}
        {failed && (
          <div className="text-center text-red-500 mt-4">
            <h1 className="text-lg">The database is currently unoperational. Please refresh and try again later.</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
