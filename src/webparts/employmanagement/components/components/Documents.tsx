import * as React from 'react';
import Layout from './Layout/Layout';
import { sp } from '../spAuth';
// import { useNavigate } from 'react-router-dom';

interface Document {
  id: number;
  name: string;
  url: string;
}

const Documents: React.FC = () => {
  const [documents, setDocuments] = React.useState<Document[]>([]);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [id] = React.useState(31)
  // const navigate = useNavigate();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  const handleUploadClick = async () => {

    console.log("first")

    if (!selectedFile) {
      console.error('No file selected');
      return;
    }

    const documentLibraryName = `EmployeeLibrary/${id}`;
    const fileNamePath = `{selectedFile.name}`;

    let result: any;
    if (selectedFile.size <= 10485760) {
      // small upload
      result = await sp.web
        .getFolderByServerRelativePath(`${documentLibraryName}/${id}`)
        .files.addUsingPath(fileNamePath, selectedFile, { Overwrite: true });
    } else {
      // large upload
      result = await sp.web
        .getFolderByServerRelativePath(`${documentLibraryName}/${id}`)
        .files.addChunked(fileNamePath, selectedFile, (data) => {
          console.log(`progress:`);
        }, true);
    }
    setDocuments([...documents, { id: documents.length + 1, name: selectedFile.name, url: result.data.ServerRelativeUrl }]);
    setSelectedFile(null);
  };

  return (
    <Layout>
      <h1>Documents</h1>
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
