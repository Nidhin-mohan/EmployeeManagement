import * as React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import "@pnp/sp/webs";
import "@pnp/sp/files";
import "@pnp/sp/folders";
import { sp } from '../spAuth';
import Layout from './Layout/Layout';
import styles from '../Employmanagement.module.scss';

interface IFileUploadProps {}

const AddImage: React.FC<IFileUploadProps> = () => {
    const { id } = useParams<{ id: string }>();
    const emplyeeId = parseInt(id)
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
    const fileNamePath = `profilepic.png`;

    let result: any;
    if (selectedFile.size <= 10485760) {

       console.log(selectedFile);
      // small upload
      result = await sp.web.getFolderByServerRelativePath(documentLibraryName).files.addUsingPath(fileNamePath, selectedFile, { Overwrite: true });
      console.log("url test",result)


     

    } else {
      // large upload
      result = await sp.web.getFolderByServerRelativePath(documentLibraryName).files.addChunked(fileNamePath, selectedFile, data => {
        console.log(`progress`);
      }, true);
    }

    // console.log(`Result of file upload: ${JSON.stringify(result)}`);
    console.log("url test",result?.data?.ServerRelativeUrl)
    const url = ` https://2mxff3.sharepoint.com/sites/Nidhin2/EmployeeLibrary/${emplyeeId}/profilepic.png`   
    const list = sp.web.lists.getByTitle("Employees");
   console.log(emplyeeId)
  list.items.getById(emplyeeId).update({
     Image_url:url
   });

    navigate(`/`);
  };

  return (
    <Layout>
   <div className={styles.uploadcontainer}>
      <input type="file" onChange={handleFileInputChange} />
      <button onClick={handleUploadClick}>Upload</button>
      {selectedFile && (
        <div className={styles['selected-file']}>
          <p>Selected file: {selectedFile.name}</p>
          <img src={URL.createObjectURL(selectedFile)} alt="Selected file preview" />
        </div>
      )}
    </div>

  </Layout>
  );
};

export default AddImage;
