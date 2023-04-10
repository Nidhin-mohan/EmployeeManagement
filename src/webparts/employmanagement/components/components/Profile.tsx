import * as React from 'react';
import { useState } from 'react';
import Layout from './Layout/Layout';
import { sp } from '../spAuth';
import { useParams } from 'react-router-dom';
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
  const { id } = useParams<{ id: string }>();
  const profileId = parseInt(id);

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
    })();
  });

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.left}>
          <img src="" alt="Employee Picture" />
          <h1>{name}</h1>
          <p>Email: {email}</p>
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
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
