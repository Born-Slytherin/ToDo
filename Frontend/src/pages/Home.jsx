import React from "react";
import Addtodo from "../components/Addtodo";
import Showtodo from "../components/Showtodo";


function Home() {
  return (
    <div className="bg-black w-screen h-screen">
      <Addtodo />
      <Showtodo />
    </div>
  );
}

export default Home;
