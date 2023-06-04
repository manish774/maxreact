import React, { useState } from "react";
import ReactDiffViewer from "react-diff-viewer-continued";
import "./App.css";
const App = () => {
  const [file1, setFile1] = useState("");
  const [file2, setFile2] = useState("");
  const [darkTheme, setDarkTheme] = useState(false);
  const setTheme = () => {
    setDarkTheme(!darkTheme);
  };
  return (
    <div>
      <textarea
        onChange={(e) => {
          setFile1(e.target.value);
        }}
        className="textarea"
      ></textarea>
      <textarea
        onChange={(e) => {
          setFile2(e.target.value);
        }}
        className="textarea"
      ></textarea>
      <button onClick={setTheme}>Dark</button>
      <ReactDiffViewer
        oldValue={file1}
        newValue={file2}
        splitView={true}
        useDarkTheme={darkTheme}
      />
    </div>
  );
};

export default App;
