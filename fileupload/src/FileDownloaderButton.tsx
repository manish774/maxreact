import React, { MouseEvent } from "react";

const FileDownloaderButton = ({ onClick: callback }: any) => {
  const onClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    console.log(e);
    callback(e);
  };
  return (
    <>
      <button onClick={onClickHandler}>Click to download photo</button>
    </>
  );
};

export default FileDownloaderButton;
