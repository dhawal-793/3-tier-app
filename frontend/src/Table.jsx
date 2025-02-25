const Table = ({ data ,onDelete}) => {
  return (
    <table className="min-w-full bg-gray-800 border border-gray-700">
      <thead>
        <tr className="bg-gray-700 border-b text-center">
          <th className=" py-3 px-4 text-white">Country</th>
          <th className=" py-3 px-4 text-white">Capital</th>
          <th className=" py-3 px-4 text-white">Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index} className="hover:bg-gray-600 border-b text-center">
            <td className="py-3 px-4 text-gray-300">{item.country}</td>
            <td className="py-3 px-4 text-gray-300">{item.capital}</td>
            <td className="py-3 px-4">
              <button
                onClick={() => onDelete(item.id)}
                className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-800"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
