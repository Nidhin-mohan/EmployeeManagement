import * as React from 'react';
import { useState } from 'react';
import Layout from './Layout/Layout';
import { useNavigate } from 'react-router-dom';
// import { IEmployee } from '../../types';
import styles from '../Employmanagement.module.scss';
import { EmployeeContext } from '../context/employeeContext';
import { sp } from '../spAuth';



interface AddEmployeeProps {}

const AddEmployee: React.FC<AddEmployeeProps> = () => {

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [designation, setDesignation] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [dateOfBirth, setDateOfBirth] = useState<string>('');
  const {setEmployees} = React.useContext(EmployeeContext)
  

  // const {setEmployees} = React.useContext(EmployeeContext)
  
 
  const navigate = useNavigate();

 

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newEmployee = {
      name: name,
      email: email,
      designation: designation,
      gender: gender,
      phone_number: phoneNumber,
      city: city,
      date_of_birth: dateOfBirth
    };
    
   
    const resp = await sp.web.lists.getByTitle('Employees').items.add(newEmployee);
    setEmployees(prevEmployees => [...prevEmployees, newEmployee]);

    console.log(resp.data.Id)
     const folderName = resp.data.Id
  //adding new folder
  const documentLibraryName = "EmployeeLibrary";
  const newFolderName =  `${folderName}`;
  const documentLibrary = sp.web.lists.getByTitle(documentLibraryName);
  documentLibrary.rootFolder.folders.addUsingPath(newFolderName)
 .then(() => {
  console.log(`Folder '${newFolderName}' created successfully.`);
 })
 .catch((error) => {
  console.error(`Error creating folder: ${error}`);
 });
    navigate(`/add-emplyee/image/${folderName}`);
  };

  return (
    <Layout>
    <div className={styles.addEmployeeContainer}>
      <h1>Add Employee</h1>
      <form className={styles.formGroup} onSubmit={handleSubmit}>
        <div className={styles.formInput}>
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className={styles.formInput}>
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className={styles.formInput}>
          <label htmlFor="gender">Gender:</label>
          <select name="gender" id="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value=""></option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className={styles.formInput}>
          <label htmlFor="designation">Designation:</label>
          <input type="text" name="designation" id="designation" value={designation} onChange={(e) => setDesignation(e.target.value)} />
        </div>
        <div className={styles.formInput}>
          <label htmlFor="phone_no">Phone Number:</label>
          <input type="text" name="phone_no" id="phone_no" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </div>
        <div className={styles.formInput}>
          <label htmlFor="city">City:</label>
          <input type="text" name="city" id="city" value={city} onChange={(e) => setCity(e.target.value)} />
        </div>
        <div className={styles.formInput}>
          <label htmlFor="date_of_birth">Date of Birth:</label>
          <input type="date" name="date_of_birth" id="date_of_birth" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
        </div>
        <div className={styles.formButton}>
          <button type="submit">Add Employee</button>
        </div>
      </form>
    </div>
  </Layout>
  
  );
};


export default AddEmployee