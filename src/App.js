import React from "react";
import Header from "../components/Header";
import MemeGenerator from "../components/MemeGenerator";

import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <Header />
      <MemeGenerator />
    </div>
  );
}
