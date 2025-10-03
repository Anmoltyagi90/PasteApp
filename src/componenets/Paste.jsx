import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPaste, resetAllPastes } from "../redux/store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filterData = pastes.filter((paste) =>
    paste?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handlerDelete(pasteId) {
    dispatch(removeFromPaste(pasteId));
    toast.error("Paste Deleted ❌");
  }

  function handlerCopy(content) {
    navigator.clipboard.writeText(content);
    toast.info("Copied to Clipboard 📋");
  }

  function handlerShare(paste) {
    navigator.share
      ? navigator.share({
          title: paste.title,
          text: paste.content,
        })
      : toast.warning("Sharing not supported on this browser ⚠️");
  }

  return (
    <div className="p-5">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search paste..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border rounded-lg p-2 m-3 w-full md:w-1/2"
      />

      {/* Reset All */}
      {pastes.length > 0 && (
        <button
          className="bg-red-700 text-white px-4 py-2 rounded-lg mb-4"
          onClick={() => dispatch(resetAllPastes())}
        >
          Reset All
        </button>
      )}

      {/* Show Filtered Data */}
      <div className="flex flex-col text-center border p-5">
        {filterData.length > 0 ? (
          filterData.map((paste) => (
            <div
              key={paste._id}
              className="bg-gray-800 text-white p-2 my-2 rounded-2xl border"
            >
              <h2 className="font-bold text-lg p-3">{paste.title}</h2>
              <p className="text-gray-300">{paste.content}</p>

              <div className="flex gap-3 justify-center p-3 flex-wrap">
                <button
                  className="bg-blue-600 p-2 rounded-2xl px-4"
                  onClick={() => navigate(`/?pasteId=${paste._id}`)}
                >
                  Edit
                </button>

                {/* ✅ View button */}
                <button
                  className="bg-green-600 p-2 rounded-2xl px-4"
                  onClick={() => navigate(`/view/${paste.id}`)}
                >
                  View
                </button>
                <button
                  className="bg-red-600 p-2 rounded-2xl px-4"
                  onClick={() => handlerDelete(paste.id)}
                >
                  Delete
                </button>
                <button
                  className="bg-yellow-600 p-2 rounded-2xl px-4"
                  onClick={() => handlerCopy(paste.content)}
                >
                  Copy
                </button>
                <button
                  className="bg-purple-600 p-2 rounded-2xl px-4"
                  onClick={() => handlerShare(paste)}
                >
                  Share
                </button>
              </div>

              <p className="text-sm text-gray-400">{paste.createdAt}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No paste found</p>
        )}
      </div>
    </div>
  );
};

export default Paste;
