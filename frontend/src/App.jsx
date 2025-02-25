const BASE_URL = import.meta.env.VITE_HOST;

import { useEffect, useState } from "react";
import "./App.css";
import Table from "./Table";
import Modal from "./Modal";

function App() {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${BASE_URL}/api/data`);

      const clientIp = res.headers.get('X-Client-Ip');
      console.log("Client IP from header:", res.headers);
      const cleanedIp =
        clientIp && clientIp.startsWith("::ffff:")
          ? clientIp.slice(7)
          : clientIp;

      if (cleanedIp) {
        window.newrelic.addPageAction("clientRequest", { clientIp: cleanedIp });
      }

      const parsed_res = await res.json();
      console.log("data=>", parsed_res.data);
      setData(parsed_res.data);
    };
    fetchData();
  }, []);

  const handleClick = () => {
    // console.log("Button is clicked");
    setIsModalOpen(true);
  };

  const handleModalSubmit = async (newData) => {
    setErrorMessage("");
    try {
      const response = await fetch(`${BASE_URL}/api/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });

      if (response.ok) {
        const result = await response.json();
        setData((prev) => [...prev, result.data]);
        setIsModalOpen(false);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || "An error occurred");
      }
    } catch (error) {
      setErrorMessage("Network error, please try again later.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/api/delete/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setData((prev) => prev.filter((item) => item.id !== id)); // Update state to remove the deleted item
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || "Failed to delete item");
      }
    } catch (error) {
      setErrorMessage("Network error, please try again later.");
    }
  };

  return (
    <div className="w-full h-screen overflow-hidden bg-black text-white py-5 px-8">
      <h2 className="text-3xl font-bold italic text-center my-4">
        Countries and Capitals
      </h2>
      <button
        className="px-8 py-2 font-semibold text-lg my-8 text-gray-200 bg-slate-300/40 hover:bg-slate-300/60 rounded-lg hover:outline-2 outline-offset-2 outline-gray-600"
        onClick={handleClick}
      >
        Add Data
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        errorMessage={errorMessage}
      />
      <div className="h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 max-w-screen-sm mx-auto">
        <Table data={data} onDelete={handleDelete} />
      </div>
    </div>
  );
}

export default App;
