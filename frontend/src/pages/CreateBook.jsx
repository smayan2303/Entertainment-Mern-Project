import React, { useState } from 'react';
import axios from "axios";
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const CreateBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleSaveBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios.post(`${backendUrl}/books`, data)
    .then(() => {
      setLoading(false);
      enqueueSnackbar('Book Created Successfully', { variant: 'success' });
      navigate('/');
    })
    .catch((error) => {
      setLoading(false);
      enqueueSnackbar('Error Creating Book', { variant: 'error' });
      console.log(error);
    });
  }

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen">
      <div className="p-6 max-w-4xl mx-auto">
        <BackButton />
        <div className="flex justify-center items-center gap-4 my-8">
          <h1 className="text-3xl font-bold">Create Movie/TV Show</h1>
        </div>
        {loading ? (
          <div className="flex flex-col justify-center items-center gap-4">
            <h1 className="text-lg font-medium">Creating your book. Please wait...</h1>
            <Spinner />
          </div>
        ) : (
          <div className="flex flex-col border-2 border-sky-400 rounded-xl p-6 bg-gray-800 mx-auto my-6">
            <div className="my-4">
              <label className="text-xl text-gray-300">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border-2 border-gray-500 text-gray-800 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <div className="my-4">
              <label className="text-xl text-gray-300">Actors</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="border-2 border-gray-500 text-gray-800 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <div className="my-4">
              <label className="text-xl text-gray-300">Release Year - Must be a Number</label>
              <input
                type="text"
                value={publishYear}
                onChange={(e) => setPublishYear(e.target.value)}
                className="border-2 border-gray-500 text-gray-800 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <button
              className="bg-sky-500 hover:bg-sky-400 text-gray-800 p-2 rounded-lg transition duration-300 mt-8"
              onClick={handleSaveBook}
            >
              Save New Item
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateBook;
