import React from "react";
import { Routes, Route } from "react-router-dom";
import Admin from "./Pages/Admin/Admin";
import AddProduct from "./Components/AddProduct/AddProduct";
import ListProduct from "./Components/ListProduct/ListProduct";
import Navbar from "./Components/Navbar/Navbar";

function App() {
  return (
    <div>
       <Navbar/>
       <Admin/>
    </div>
    
  );
}

export default App;
