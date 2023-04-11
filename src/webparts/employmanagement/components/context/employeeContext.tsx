import { createContext, useEffect, useState } from 'react';
import * as React from 'react';

import { sp } from '../spAuth';
import '@pnp/sp/webs';
import '@pnp/sp/folders';
import { IEmployee } from '../../types';



type EmployeeContextType = {
  employees: IEmployee[];
  setEmployees: React.Dispatch<React.SetStateAction<IEmployee[]>>;
};

type EmployeeContextProviderProps = {
  children: React.ReactNode;
};

export const EmployeeContext = createContext<EmployeeContextType>({
  employees: [],
  setEmployees: () => {},
});

const EmployeeContextProvider = ({ children }: EmployeeContextProviderProps) => {
  const [employees, setEmployees] = useState<IEmployee[]>([]);

  useEffect(() => {
    (async () => {
      const items: any = await sp.web.lists.getByTitle('Employees').items();
      const newEmployees = items.map((item: any) => ({
        id: item.Id ,
        name: item.name,
        email: item.email,
        gender: item.gender,
        designation: item.designation,
        phone_number: item.phone_number,
        city: item.city,
        date_of_birth: item.date_of_birth,
        image_url : item.Image_url,
      }));
      setEmployees(newEmployees);
      console.log(`employees ${employees}`)
    })();
  }, []);

  return (
    <EmployeeContext.Provider value={{ employees, setEmployees }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export default EmployeeContextProvider;
