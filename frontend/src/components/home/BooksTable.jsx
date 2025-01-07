import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { useState } from "react";

const BooksTable = ({ books }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse bg-gray-800 text-gray-200 rounded-lg">
        <thead>
          <tr className="text-lg font-semibold border-b border-gray-600">
            <th className="px-4 py-2 text-center">No</th>
            <th className="px-4 py-2 text-center">Title</th>
            <th className="px-4 py-2 text-center max-md:hidden">Actors</th>
            <th className="px-4 py-2 text-center max-md:hidden">Release Year</th>
            <th className="px-4 py-2 text-center">Operations</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={book._id} className="hover:bg-gray-700 transition duration-200">
              <td className="border-t border-gray-600 px-4 py-2 text-center">
                {index + 1}
              </td>
              <td className="border-t border-gray-600 px-4 py-2 text-center">
                {book.title}
              </td>
              <td className="border-t border-gray-600 px-4 py-2 text-center max-md:hidden">
                {book.author}
              </td>
              <td className="border-t border-gray-600 px-4 py-2 text-center max-md:hidden">
                {book.publishYear}
              </td>
              <td className="border-t border-gray-600 px-4 py-2 text-center">
                <div className="flex justify-center gap-6">
                  <Link to={`/books/details/${book._id}`} className="text-green-500 hover:text-green-300">
                    <BsInfoCircle className="text-2xl" />
                  </Link>
                  <Link to={`/books/edit/${book._id}`} className="text-yellow-400 hover:text-yellow-200">
                    <AiOutlineEdit className="text-2xl" />
                  </Link>
                  <Link to={`/books/delete/${book._id}`} className="text-red-500 hover:text-red-300">
                    <MdOutlineDelete className="text-2xl" />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BooksTable;
