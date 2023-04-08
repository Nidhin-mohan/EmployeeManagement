import * as React from 'react';
import { useParams } from 'react-router-dom';
import Layout from './Layout/Layout';

const Profile = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  
  return (
    <Layout>
      <h2>Employee Profile</h2>
      <p>Employee ID: {id}</p>
      {/* Here you can fetch and display the employee details based on the id */}
    </Layout>
  );
};

export default Profile;
