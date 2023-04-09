import * as React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import "@pnp/sp/webs";
import "@pnp/sp/files";
import "@pnp/sp/folders";
import { sp } from '../spAuth';
import Layout from './Layout/Layout';

interface IFileUploadProps {}

const AddImage: React.FC<IFileUploadProps> = () => {
    const { id } = useParams<{ id: string }>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const navigate = useNavigate();
  console.log(id)
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

    const documentLibraryName = `EmployeeLibrary/${id}`;
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
    navigate(`/`);
  };

  return (
    <Layout>
    <div>
      <input type="file" onChange={handleFileInputChange} />
      <button onClick={handleUploadClick}>Upload</button>
      {selectedFile && (
        <div>
          <p>Selected file: {selectedFile.name}</p>
          <img src={URL.createObjectURL(selectedFile)} alt="Selected file preview" />
        </div>
      )}
    </div>
  </Layout>
  );
};

export default AddImage;