import * as React from 'react';
import Layout from './Layout/Layout';
import { sp } from '../spAuth';
// import { useNavigate } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
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
  // const [fileContent, setFileContent] = React.useState("");
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const { id } = useParams<{ id: string }>();
    const emplyeeId = parseInt(id)
  const navigate = useNavigate();
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


  React.useEffect(() => {


    const web = new Web("https://contoso.sharepoint.com/sites/dev");
const folder = web.getFolderByServerRelativeUrl("/sites/dev/documents");
const files = await folder.files.get();

for (const file of files) {
  const fileContent = await file.getText();
  console.log(fileContent);
}

    const folderUrl = `/sites/Nidhin2/EmployeeLibrary/${id}`;
    sp.web.getFolderByServerRelativePath(folderUrl)
      .files.get()
      .then((files : any) => {
        // Map the files to an array of Document objects
        const documents = files.map((file) => ({
          id: file.UniqueId,
          name: file.Name,
          url: file.ServerRelativeUrl
        }));
        setDocuments(documents);
      })
      .catch((error) => console.log(error));
  }, []);

  
  const web = new Web("https://contoso.sharepoint.com/sites/dev");
const folder = web.getFolderByServerRelativeUrl("/sites/dev/documents");
const files = await folder.files.get();

for (const file of files) {
  const fileContent = await file.getText();
  console.log(fileContent);
}

  
  const handleProfileClick = () => {
    navigate(`/profile/${id}`);
  };

  const handleDocumentsClick = () => {
    navigate(`/profile/documents/${id}`);
  };


  return (
    <Layout>

<div className={styles.profileNav}>
      <button className='profile' onClick={handleProfileClick}>
        Profile
      </button>
      <button className='documents' onClick={handleDocumentsClick}>
        Documents
      </button>
    </div>


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
