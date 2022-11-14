import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, Grid } from "@mui/material";

import { FileUploaderProps } from "../types";

const FileUpload = (props: FileUploaderProps): React.ReactElement => {
  const [imageurl, setImageurl] = useState(props.imageUrlLink);
  const fileUploadFieldRef = React.useRef<HTMLInputElement>(null);

  const handleFileUploadButtonClick = () => {
    fileUploadFieldRef.current && fileUploadFieldRef.current.click();
  };

  const handleFileFieldClick = () => {
    if (fileUploadFieldRef.current) {
      fileUploadFieldRef.current.value = "";
    }
  };

  const handleFileSelect = async (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    if (target.files === null) return;
    const file = target.files[0];

    const fileType = file.type.split("/").pop() as string;
    if (props.fileTypes && !props.fileTypes.includes(fileType)) {
      props.onError("This file type is not allowed");
      setImageurl("");
      return;
    }

    setImageurl(URL.createObjectURL(file));
    props.onSuccess(file);
  };

  useEffect(() => {
    setImageurl(props.imageUrlLink);
  }, [props.imageUrlLink])

  return (
    <Grid item sm={12} margin={2}>
      <Button onClick={handleFileUploadButtonClick} disabled={props.loading}>
        {props.buttonText}
      </Button>
      {imageurl && <img src={imageurl} width={200} height={200}></img>}
      <input
        style={{ display: "none" }}
        ref={fileUploadFieldRef}
        type="file"
        onChange={handleFileSelect}
        onClick={handleFileFieldClick}
      />
    </Grid>
  );
};

export default FileUpload;
