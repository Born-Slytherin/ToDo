import React from "react";

function Header() {
  return (
    <div className="w-full h-20 bg-black text-white flex justify-center items-center ">
      <div className="bg-yellow-300 w-[90%] rounded-md mt-4 p-4">
        <h4 className="text-black font-bold text-3xl">TODO</h4>
      </div>
    </div>
  );
}

export default Header;
