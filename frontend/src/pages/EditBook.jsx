import React, { useState, useEffect } from 'react';
import axios from "axios";
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${backendUrl}/books/${id}`)
      .then((response) => {
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear)
        setTitle(response.data.title)
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert('An error happened. Please Check console');
        console.log(error);
      });
  }, [id]);

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios.put(`${backendUrl}/books/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Updated Successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error Updating Book', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen">
      <div className="p-6 max-w-4xl mx-auto">
        <BackButton />
        <div className="flex justify-center items-center gap-4 my-8">
          <h1 className="text-3xl font-bold">Edit Movie/TV Show</h1>
        </div>
        {loading ? (
          <div className="flex flex-col justify-center items-center gap-4">
            <h1 className="text-lg font-medium">Updating your book details...</h1>
            <Spinner />
          </div>
        ) : (
          <div className="flex flex-col border-2 border-sky-400 rounded-xl p-6 bg-gray-800 mx-auto my-6">
            <div className="my-4">
              <label className="text-xl text-gray-300">Title</label>
              <input
                type="text"
                value={title}
                onChange={(x) => setTitle(x.target.value)}
                className="border-2 border-gray-500 px-4 py-2 w-full text-gray-900"
              />
            </div>
            <div className="my-4">
              <label className="text-xl text-gray-300">Actors</label>
              <input
                type="text"
                value={author}
                onChange={(x) => setAuthor(x.target.value)}
                className="border-2 border-gray-500 px-4 py-2 w-full text-gray-900"
              />
            </div>
            <div className="my-4">
              <label className="text-xl text-gray-300">Release Year - Must be a Number</label>
              <input
                type="text"
                value={publishYear}
                onChange={(x) => setPublishYear(x.target.value)}
                className="border-2 border-gray-500 px-4 py-2 w-full text-gray-900"
              />
            </div>
            <button
              className="p-2 bg-sky-300 text-gray-900 rounded-lg m-8 hover:bg-sky-400 transition duration-300"
              onClick={handleEditBook}
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditBook;
