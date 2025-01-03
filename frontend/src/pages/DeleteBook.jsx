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
      enqueueSnackbar('Book Deleted Successfully', {variant: 'success'});
      navigate('/');
    })
    .catch((error) => {
      setLoading(false);
      //alert("An error occurred. check console for more information.");
      enqueueSnackbar('Error Deleting Book', {variant: 'error'});
      console.log(error);
    });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4 text-center'>Delete Item</h1>
      {loading ? <div className='flex justify-center items-center'><Spinner /></div> : ''}

      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are You Sure You want to delete this Item?</h3>

        <button
          className='p-4 bg-red-600 text-white m-8 w-full'
          onClick={handleDeletion}
        >
          Yes, Delete it
        </button>
      </div>

    </div>
  )
}

export default DeleteBook