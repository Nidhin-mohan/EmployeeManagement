import * as React from 'react';
import { useState } from 'react';
import "@pnp/sp/webs";
import "@pnp/sp/files";
import "@pnp/sp/folders";
import { sp } from '../spAuth';

interface IFileUploadProps {}

const FileUpload: React.FC<IFileUploadProps> = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUploadClick = async () => {
    if (!selectedFile) {
      console.error('No file selected');
      return;
    }

    const documentLibraryName = 'EmployeeLibrary';
    const fileNamePath = encodeURI(selectedFile.name);

    let result: any;
    if (selectedFile.size <= 10485760) {

       
      // small upload
      result = await sp.web.getFolderByServerRelativePath(documentLibraryName).files.addUsingPath(fileNamePath, selectedFile, { Overwrite: true });
    } else {
      // large upload
      result = await sp.web.getFolderByServerRelativePath(documentLibraryName).files.addChunked(fileNamePath, selectedFile, data => {
        console.log(`progress`);
      }, true);
    }

    console.log(`Result of file upload: ${JSON.stringify(result)}`);
  };

  return (
    <div>
      <input type="file" onChange={handleFileInputChange} />
      <button onClick={handleUploadClick}>Upload</button>
    </div>
  );
};

export default FileUpload;
