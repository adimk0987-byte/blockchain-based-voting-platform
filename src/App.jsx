// src/App.jsx
import React from "react";
import Camera from "./components/advanced/Camera";       // adjust path if needed
import AdvancedFeatures from "./pages/AdvancedFeatures";

function App() {
  return (
    <div className="App">
      {/* Show the Camera component */}
      <Camera />

      {/* Also render your full app UI via AdvancedFeatures */}
      <AdvancedFeatures />
    </div>
  );
}

export default App;
