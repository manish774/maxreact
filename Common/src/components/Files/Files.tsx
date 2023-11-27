import React, { useState } from "react";
import Input from "../generic/Input";
import "./Files.scss";
import { getFileType } from "../../utils/Index";
const Files = () => {
  const isMultipleUpload = true;
  const [selectedFiles, setSelectedFiles] = useState<any[]>([]);
  const [isFilesThere, setIsFilesThere] = useState<boolean>(false);
  const [previewEnable, setPreviewEnable] = useState<boolean>(false);
  const onFileChange = (event: any) => {
    const f = event?.target?.files || undefined;
    if (f?.length) {
      for (let i = 0; i < f?.length; i++) {
        const type = getFileType(event.target.files[i]);
        const name = event.target.files[i]?.name;
        const file = {
          path: URL.createObjectURL(event.target.files[i]),
          type,
          name,
        };

        isMultipleUpload
          ? setSelectedFiles((prev) => [...prev, file])
          : setSelectedFiles([file]);
        setIsFilesThere(true);
      }
    }
  };

  const preview = () => {
    setPreviewEnable((prev) => (prev === true ? false : true));
  };

  const previewFiles = selectedFiles.map((file) => {
    return file?.type === "image" ? (
      <div className="file-prev-container">
        <div>
          {" "}
          <img src={file?.path} style={{ width: "40px", height: "40px" }} />
        </div>
        <div style={{ display: "inline-block" }}>{file?.name}</div>
      </div>
    ) : (
      <div className="file-prev-container">
        {" "}
        <div>&#9926;</div>
        <div>{file?.name}</div>
      </div>
    );
  });
  return (
    <>
      <div className="drag-drop-container">
        <div className="input-container-file">
          <Input
            type="file"
            value={""}
            onchangeHandler={onFileChange}
            multiple={isMultipleUpload}
          />
          <h4>Select / Drag {isMultipleUpload ? "files" : "file"} here</h4>
        </div>
        <div>
          {isFilesThere && (
            <button onClick={preview}>
              {!previewEnable
                ? `Preview ${isMultipleUpload ? "files" : "file"}`
                : `Hide Preview`}
            </button>
          )}
        </div>
        {previewEnable && (
          <div className="preview-panel-files">{previewFiles}</div>
        )}
      </div>
    </>
  );
};

export default Files;
