import * as React from 'react';
import { useState, useEffect } from "react";
// import { spfi } from "@pnp/sp";
import "@pnp/sp/webs";
import { fileFromServerRelativePath } from "@pnp/sp/files";
import { sp } from './spAuth';

const SharePointImage = () => {
  const [imageSrc, setImageSrc] = useState<string>("");

  useEffect(() => {
    const getImageFromSharePoint = async () => {
      
      const url = "/sites/Nidhin2/EmployeeLibrary/dummy-image.jpg";
      const file = fileFromServerRelativePath(sp.web, url);
      console.log(file)
      const buffer = await file.getBuffer();
      const base64String = btoa(String.fromCharCode(...new Uint8Array(buffer)));
      const src = `data:image/jpeg;base64,${base64String}`;
      setImageSrc(src);
    };

    getImageFromSharePoint();
  }, []);

  return (
    <div>
      <h1>tesing</h1>
      <img src={imageSrc} alt="SharePoint Image" />
    </div>
  );
};

export default SharePointImage;
