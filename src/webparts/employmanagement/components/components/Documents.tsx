import * as React from 'react';
import Layout from './Layout/Layout';
import { sp } from '../spAuth';
// import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import styles from '../Employmanagement.module.scss';


interface Document {
  id: number;
  name: string;
  url: string;
}



const files = [
  {
    name: "Document 1",
    url: "https://example.com/document-1.pdf"
  },
  {
    name: "Document 2",
    url: "https://example.com/document-2.docx"
  },
  {
    name: "Image 1",
    url: "https://example.com/image-1.jpg"
  },
  {
    name: "Spreadsheet 1",
    url: "https://example.com/spreadsheet-1.xlsx"
  }
];


const Documents: React.FC = () => {
  const [documents] = React.useState<Document[]>([]);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const { id } = useParams<{ id: string }>();
    const emplyeeId = parseInt(id)
  // const navigate = useNavigate();
  console.log(id)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  const handleUploadClick = async () => {
    console.log("handleUpload cicked")
    if (!selectedFile) {
      console.error('No file selected');
      return;
    }

    const documentLibraryName = `EmployeeLibrary/${emplyeeId}`;
    const fileNamePath = `${selectedFile.name}`;


    let result: any;
    if (selectedFile.size <= 10485760) {

      //  console.log(selectedFile);
      // small upload
      result = await sp.web.getFolderByServerRelativePath(documentLibraryName).files.addUsingPath(fileNamePath, selectedFile, { Overwrite: true });
      console.log("result",result, id)


     

    } else {
      // large upload
      result = await sp.web.getFolderByServerRelativePath(documentLibraryName).files.addChunked(fileNamePath, selectedFile, data => {
        console.log(`progress`);
      }, true);
    }


  
  };


  React.useEffect(()=> {

  },[])



  return (
    <Layout>
      <h1>Documents</h1>




       <div className={styles.docList}>
      <h1>File List</h1>
      <ul>
        {files.map((file) => (
          <li key={file.name}>
            <span>{file.name}</span>
            <button >Download</button>
          </li>
        ))}
      </ul>
    </div>













      <input type="file" onChange={handleFileSelect} />
      <button type="button" onClick={handleUploadClick}>
        Upload
      </button>
      <ul>
        {documents.map((document) => (
          <li key={document.id}>
            <a href={document.url} target="_blank" rel="noopener noreferrer">
              {document.name}
            </a>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default Documents;
