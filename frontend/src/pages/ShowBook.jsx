import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const ShowBooks = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${backendUrl}/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen">
      <div className="p-6 max-w-4xl mx-auto">
        <BackButton />
        <div className="flex justify-center items-center gap-4 my-8">
          <h1 className="text-3xl font-bold">Movie/TV Show Details</h1>
        </div>
        {loading ? (
          <div className="flex flex-col justify-center items-center gap-4">
            <h1 className="text-lg font-medium">Loading your book details...</h1>
            <Spinner />
          </div>
        ) : (
          <div className="flex flex-col border-2 border-sky-400 rounded-xl p-6 bg-gray-800 mx-auto my-6">
            <div className="my-4">
              <span className="text-xl text-gray-300">Id: </span>
              <span className="text-gray-100">{book._id}</span>
            </div>
            <div className="my-4">
              <span className="text-xl text-gray-300">Title: </span>
              <span className="text-gray-100">{book.title}</span>
            </div>
            <div className="my-4">
              <span className="text-xl text-gray-300">Actors: </span>
              <span className="text-gray-100">{book.author}</span>
            </div>
            <div className="my-4">
              <span className="text-xl text-gray-300">Release Year: </span>
              <span className="text-gray-100">{book.publishYear}</span>
            </div>
            <div className="my-4">
              <span className="text-xl text-gray-300">Create Time: </span>
              <span className="text-gray-100">{new Date(book.createdAt).toString()}</span>
            </div>
            <div className="my-4">
              <span className="text-xl text-gray-300">Last Update Time: </span>
              <span className="text-gray-100">{new Date(book.updatedAt).toString()}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowBooks;
