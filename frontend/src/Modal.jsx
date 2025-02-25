import { useState } from "react";

const Modal = ({ isOpen, onSubmit, errorMessage ,onClose}) => {
  const [country, setCountry] = useState("");
  const [capital, setCapital] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ country, capital });
    setCountry("");
    setCapital("");
    // onClose(); // Close the modal after submission
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-800 p-6 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Add Country and Capital</h2>
        {errorMessage && (
          <div className="bg-red-600 text-white p-2 rounded mb-4">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300">Country:</label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="mt-1 p-2 w-full bg-gray-700 text-white border border-gray-600 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">Capital:</label>
            <input
              type="text"
              value={capital}
              onChange={(e) => setCapital(e.target.value)}
              className="mt-1 p-2 w-full bg-gray-700 text-white border border-gray-600 rounded"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
