import * as React from 'react';
import styles from '../Employmanagement.module.scss';
import { IEmployee } from '../../types';
import { useNavigate } from 'react-router-dom';

interface Props {
  employee: IEmployee;
}

const Card: React.FC<Props> = ({ employee }) => {
  const navigate = useNavigate();
  const { id, name, designation, phone_number, email, image_url } = employee;

  const handleCardClick = (id: string) => {
    console.log(`Card with id ${id} clicked`);
    navigate(`/profile/${id}`);
  };

  return (
    <div className={styles.card} id={id.toString()} onClick={() => handleCardClick(employee.id)}  >
  <div className={styles.image}>
  <img src={`${image_url}`} alt="Employee"/>
  </div>
  <div className={styles.content}>
    <h2 className={styles.name}>{name}</h2>
    <p className={styles.designation}>{designation}</p>
    <p className={styles.phoneNumber}>{phone_number}</p>
    <p className={styles.email}>{email}</p>
  </div>
</div>
  );
};

export default Card;
