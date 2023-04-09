import * as React from 'react';
import { useParams } from 'react-router-dom';
import Layout from './Layout/Layout';
import styles from '../Employmanagement.module.scss';
import { sp } from '../spAuth';

import '@pnp/sp/webs';
import '@pnp/sp/lists';
import '@pnp/sp/folders';
import '@pnp/sp/files';

const Profile = (): JSX.Element => {
    const { id } = useParams<{ id: string }>();
    const itemId: number = Number(id);
    const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedFile(event.target.files?.[0] || null);
    };
  
    const handleUpload = async () => {
      if (!selectedFile) {
        return;
      }
  
      // create the target folder if it doesn't exist
      const documentLibraryName = 'EmployeeLibrary';
      const folderRelativeUrl = `/${documentLibraryName}/${itemId}`;
      
      const folder = await sp.web.getFolderByServerRelativePath(folderRelativeUrl).get();
  
      try {
        await folder.get();
      } catch (error) {
        if (error.statusCode === 404) {
          await sp.web.lists.getByTitle(documentLibraryName).rootFolder.folders.add(itemId.toString());
        } else {
          console.error(`Error getting folder: ${error}`);
          return;
        }
      }
  
      const fileName = selectedFile.name;
      const filePath = `${itemId}/${fileName}`;
  
      // upload the file
      const result = await sp.web
        .getFolderByServerRelativePath(folderRelativeUrl)
        .files.addUsingPath(filePath, selectedFile, { Overwrite: true });
  
      console.log(`File '${fileName}' uploaded successfully to '${folderRelativeUrl}'.`, result);
      setSelectedFile(null);
    };
  
    return (
      <Layout>
        <div className={styles.profileContainer}>
          <h2 className={styles.profileHeader}>Employee Profile</h2>
          <p className={styles.profileId}>Employee ID: {id}</p>
          <div className={styles.employeeDetailsContainer}>
            <p className={styles.employeeDetailsLabel}>Name:</p>
            <p className={styles.employeeDetailsValue}>John Doe</p>
            <p className={styles.employeeDetailsLabel}>Email:</p>
            <p className={styles.employeeDetailsValue}>johndoe@example.com</p>
            <p className={styles.employeeDetailsLabel}>Gender:</p>
            <p className={styles.employeeDetailsValue}>Male</p>
            <div>
              <input type="file" onChange={handleFileChange} />
              {selectedFile && (
                <>
                  <p>Selected file: {selectedFile.name}</p>
                  <button onClick={handleUpload}>Upload</button>
                </>
              )}
            </div>
          </div>
        </div>
      </Layout>
    );
  };


export default Profile;
