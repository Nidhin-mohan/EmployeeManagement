import * as React from 'react';
import { useState } from 'react';
import Layout from './Layout/Layout';
import { sp } from '../spAuth';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styles from '../Employmanagement.module.scss';

interface IProfileProps {}

const Profile: React.FC<IProfileProps> = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [designation, setDesignation] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [dateOfBirth, setDateOfBirth] = useState<string>('');
  const [image_url, setImage_url] = useState<string>('');
  const { id } = useParams<{ id: string }>();
  const profileId = parseInt(id);
  const navigate = useNavigate();


  const handleDelete = async (id: string) => {
    console.log(id);
    const itemId = Number(id);
    try {
      await sp.web.lists.getByTitle('Employees').items.getById(itemId).delete();
      console.log(`Item with ID ${id} has been deleted from UsersList`);
  // deleting folder 
  await sp.web.rootFolder.folders.getByUrl("EmployeeLibrary/folderName").delete()
        .then(() => {
          console.log("Folder deleted successfully!");
        })
        .catch((error) => {
          console.log(`Error deleting folder: ${error}`);
        });


      navigate(`/`);


    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (id: string) => {
    

      navigate(`/update-emplyee/${id}`);


   
  };


  React.useEffect(() => {
    // get a specific item by id.
    (async () => {
      // get a specific item by id.
      const item: any = await sp.web.lists.getByTitle('Employees').items.getById(profileId)();
      console.log(item.name);
      setDateOfBirth(item.date_of_birth);
      setCity(item.city);
      setPhoneNumber(item.phone_number);
      setGender(item.gender);
      setDesignation(item.designation);
      setEmail(item.email);
      setName(item.name);
      setImage_url(item.Image_url)
      console.log(image_url)
    })();
  },[]);

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

      <div className={styles.container}>
        <div className={styles.left}>
          <img src={`${image_url}`} alt="Employee Picture" />
          <h1>{name}</h1>
          <p> {email}</p>
        </div>
        <div className={styles.right}>
          <div className={styles.infoSection}>
            <h2>Designation:</h2>
            <p>{designation}</p>
          </div>
          <div className={styles.infoSection}>
            <h2>Gender:</h2>
            <p>{gender}</p>
          </div>
          <div className={styles.infoSection}>
            <h2>Phone Number:</h2>
            <p>{phoneNumber}</p>
          </div>
          <div className={styles.infoSection}>
            <h2>City:</h2>
            <p>{city}</p>
          </div>
          <div className={styles.infoSection}>
            <h2>Date of Birth:</h2>
            <p>{dateOfBirth}</p>
          </div>
          <div className={styles.profileHandles}>
             <button className={styles.update} onClick={() => handleUpdate(id)} >Update</button>
             <button className={styles.delete}  onClick={() => handleDelete(id)} >Delete</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
