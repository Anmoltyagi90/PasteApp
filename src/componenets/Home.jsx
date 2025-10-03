import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToPastes, updateToPastes } from "../redux/store";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";




const Home = () => {
  const [title, setTitile] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };
    if (pasteId) {
      dispatch(updateToPastes(paste)); //update
          toast.success("Paste updated successfully 🚀");
    } else {
      dispatch(addToPastes(paste)); //create
        toast.success("Paste created successfully ✅");
    }

    //after creation or updation
    setTitile("");
    setValue("");
    setSearchParams({});
  }

  const pasteId = searchParams.get("pasteId");
  return (
    <div>
      <div className="flex justify-evenly">
        <input
          className="p-2 rounded-2xl mt-3 max-w-lg w-full bg-cyan-900 text-white"
          type="text"
          placeholder="enter title here"
          value={title}
          onChange={(e) => setTitile(e.target.value)}
        />

        <button
          className="rounded-2xl bg-cyan-900 p-3 mt-3 text-white font-semibold cursor-pointer 
             hover:bg-cyan-700 hover:border hover:border-cyan-300 
             shadow-lg transform transition duration-300 ease-in-out hover:scale-105"
          onClick={createPaste}
        >
          {pasteId ? "Update My Paste" : "Create My Paste"}
        </button>
      </div>

      <div className="flex justify-center items-center">
        <textarea
          className="rounded-2xl mt-7  bg-cyan-900 p-3 text-gray-400 w-full sm:w-[600px] md:w-[750px] lg:w-[900px]"
          value={value}
          rows={20}
          placeholder="enter contennt here"
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Home;
