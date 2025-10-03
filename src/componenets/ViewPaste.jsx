import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ViewPaste = () => {
  const { id } = useParams();
  const pastes = useSelector((state) => state.paste.pastes);

  const paste = pastes.find((p) => p.id === id);

  if (!paste) return <p className="text-center text-red-500">Paste not found ❌</p>;

  return (
    <div className="p-5 text-center">
      <h1 className="text-2xl font-bold mb-3">{paste.title}</h1>
      <p className="bg-gray-800 text-white p-5 rounded-xl">{paste.content}</p>
      <p className="text-sm text-gray-400 mt-2">Created At: {paste.createdAt}</p>
    </div>
  );
};

export default ViewPaste;
