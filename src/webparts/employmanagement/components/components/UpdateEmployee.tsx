import * as React from 'react';
import { useState } from 'react';
import Layout from './Layout/Layout';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

// import { IEmployee } from '../../types';
import styles from '../Employmanagement.module.scss';
import { sp } from '../spAuth';



interface UpdateEmployeeProps {}

const UpdateEmployee: React.FC<UpdateEmployeeProps> = () => {

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [designation, setDesignation] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const { id } = useParams<{ id: string }>();
  

  // const {setEmployees} = React.useContext(EmployeeContext)
  
 
  const navigate = useNavigate();

  React.useEffect(() => {
    // get a specific item by id.
    (async () => {
      // get a specific item by id.
      const item: any = await sp.web.lists.getByTitle('Employees').items.getById(Number(id))();
      console.log(item.name);
    
      setCity(item.city);
      setPhoneNumber(item.phone_number);
     
      setDesignation(item.designation);
      setEmail(item.email);
      setName(item.name);
    
    })();
  },[]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const updateEmployee = {
      name: name,
      email: email,
      designation: designation,
      phone_number: phoneNumber,
      city: city,
    };
    

    await sp.web.lists.getByTitle("Employees").items.getById(Number(id)).update(updateEmployee);

      
     
 
    navigate(`/profile/${id}`);
  };

  return (
    <Layout>
    <div className={styles.addEmployeeContainer}>
      <h1>Update Employee</h1>
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
        <div className={styles.formButton}>
          <button type="submit">Updat Employee</button>
        </div>
      </form>
    </div>
  </Layout>
  
  );
};


export default UpdateEmployee