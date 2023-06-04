import React from "react";
import Tree from "./components/Tree";

const App = () => {
  const meta = [
    {
      name: "mas",
      child: [
        {
          name: "na",
          child: [
            {
              name: "os",
            },
            {
              name: "bs",
              child: [{ name: "most" }],
            },
          ],
        },
      ],
    },
    {
      name: "ma",
      child: [
        {
          name: "na",
        },
      ],
    },
  ];
  return (
    <div>
      <Tree metadata={meta} />
    </div>
  );
};

export default App;
