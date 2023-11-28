import React, { useState } from "react";
import Input from "../generic/Input";
import "./Files.scss";
import { generateRandomString, getFileType } from "../../utils/Index";

type FilesProps = {
  isMultipleUpload?: boolean;
  maximumFiles?: number;
  maxOutError?: string;
  shouldPreview?: boolean;
};

const Files = ({
  maximumFiles = 1,
  maxOutError = `Maximum ${maximumFiles} files allowed`,
  shouldPreview = false,
  isMultipleUpload = false,
}: FilesProps) => {
  const [selectedFiles, setSelectedFiles] = useState<any[]>([]);
  const [isFilesThere, setIsFilesThere] = useState<boolean>(false);
  const [previewEnable, setPreviewEnable] = useState<boolean>(false);
  const [maxError, setMaxError] = useState<string>("");

  const onFileChange = (event: any) => {
    const f = event?.target?.files || undefined;
    if (f?.length) {
      if (f?.length > maximumFiles || selectedFiles?.length >= maximumFiles) {
        setMaxError(maxOutError);
        return;
      }
      setMaxError("");
      for (let i = 0; i < f?.length; i++) {
        const id = generateRandomString(16);
        const type = getFileType(event.target.files[i]);
        const name = event.target.files[i]?.name;
        const file = {
          path: URL.createObjectURL(event.target.files[i]),
          type,
          name,
          id,
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

  const removeFile = (e: any) => {
    setSelectedFiles(selectedFiles.filter((fil) => fil?.id !== e));
    if (selectedFiles?.length > 0) {
      setMaxError("");
    }
  };
  const previewFiles = selectedFiles.map((file, i) => {
    return file?.type === "image" ? (
      <div className="file-prev-container">
        <div style={{ width: "100%" }}>
          <button onClick={() => removeFile(file?.id)} className="btn-remove">
            x
          </button>
        </div>
        <div style={{ textAlign: "center" }}>
          <div>
            <img src={file?.path} style={{ width: "40px", height: "40px" }} />
          </div>
          <br />
          <div>{i}</div>
        </div>
      </div>
    ) : (
      <div className="file-prev-container">
        <div style={{ width: "100%" }}>
          <button onClick={() => removeFile(file?.id)} className="btn-remove">
            x
          </button>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "40px" }}>&#9926;</div>
          <br />
          <div>{i}</div>
        </div>
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
          {isFilesThere && "Files loaded"}
          {maxError && <p>{maxError}</p>}
          {shouldPreview && isFilesThere && (
            <button onClick={preview}>
              {!previewEnable
                ? `Preview ${isMultipleUpload ? "files" : "file"}`
                : `Hide Preview`}
            </button>
          )}
        </div>
        <div></div>
        {shouldPreview && previewEnable && (
          <div
            className="preview-panel-files"
            style={{ maxHeight: "300px", overflowY: "scroll" }}
          >
            {previewFiles}
          </div>
        )}
      </div>
    </>
  );
};

export default Files;
