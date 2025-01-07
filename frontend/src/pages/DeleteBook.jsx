import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleDeletion = () => {
    setLoading(true);
    axios
      .delete(`${backendUrl}/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Deleted Successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error Deleting Book', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen">
      <div className="p-6 max-w-4xl mx-auto">
        <BackButton />
        <div className="flex justify-center items-center gap-4 my-8">
          <h1 className="text-3xl font-bold">Delete Item</h1>
        </div>
        {loading ? (
          <div className="flex flex-col justify-center items-center gap-4">
            <h1 className="text-lg font-medium">Deleting the item...</h1>
            <Spinner />
          </div>
        ) : (
          <div className="flex flex-col items-center border-2 border-red-600 rounded-xl p-8 bg-gray-800 mx-auto my-6">
            <h3 className="text-2xl text-center text-gray-100">Are You Sure You Want to Delete This Item?</h3>
            <button
              className="p-4 bg-red-600 text-white rounded-lg w-full hover:bg-red-700 transition duration-300 mt-6"
              onClick={handleDeletion}
            >
              Yes, Delete it
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeleteBook;
