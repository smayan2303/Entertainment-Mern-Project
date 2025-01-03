import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import BooksTable from "../components/home/BooksTable";
import BooksCard from "../components/home/BooksCard";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const savedViewMode = localStorage.getItem("viewMode");
    if (savedViewMode) {
      setShowType(savedViewMode); // Set the state if there's a saved mode
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
    <div className="p-4">
      <div className="flex justify-center items-center gap-x-4">
        <h1>Viewing Options: </h1>
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => {
            setShowType("table");
            localStorage.setItem("viewMode", "table");
          }}
        >
          Table
        </button>
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => {
            setShowType("card");
            localStorage.setItem("viewMode", "card");
          }}
        >
          Card
        </button>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8 ">Movie/TV Show Watch List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {loading ? (
        <div className="flex justify-center items-center">
          <h1>Initializing Backend</h1>
          <Spinner />
        </div>
      ) : showType === "table" ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
      {failed && (
        <div className="text-center text-red-500">
          <h1>
            The database is still loading or is currently unoperational. Please
            wait up to 30 seconds and Refresh the page. 
          </h1>
        </div>
      )}
    </div>
  );
};

export default Home;
