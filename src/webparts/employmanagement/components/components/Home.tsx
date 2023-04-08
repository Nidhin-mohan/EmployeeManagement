
import * as React from 'react';
import Layout from './Layout/Layout';
import styles from '../Employmanagement.module.scss';
import { useNavigate } from 'react-router-dom';
import Card from './Card';
import { EmployeeContext } from '../context/employeeContext';







const Home = (): JSX.Element => {

  const {employees} = React.useContext(EmployeeContext)
  const [searchTerm, setSearchTerm] = React.useState(''); 
  const navigate = useNavigate();

 

  const filteredEmployees = employees.filter((employee) => {
    return employee.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

const handleAddEmployeeClick = () => {
  console.log('Add Employee button clicked');
  navigate('/add-emplyee');
};
 
  return (
      <Layout>
         
     <div className={styles.searchContainer}>
          <input type="text" name="searchTerm" id="searchTerm" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}   placeholder="Search..." className={styles.searchBar}/>
  
  <button type="button" className={styles.searchButton} >
    Search
  </button>
  <button type="button" className={styles.addButton} onClick={handleAddEmployeeClick}>
    Add Employee
  </button>
</div>

      <div className={styles.cardList}>
      {filteredEmployees.map((employee) => (
          <Card key={employee.id} employee={employee} />
        ))}
    </div>
   


      </Layout> 
  );
};

export default Home;
