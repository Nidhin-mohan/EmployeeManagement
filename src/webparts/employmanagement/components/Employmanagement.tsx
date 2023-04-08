import * as React from 'react';

import { HashRouter } from "react-router-dom"

import { IEmploymanagementProps } from './IEmploymanagementProps';
import App from './App';
import EmployeeContextProvider from './context/employeeContext';

// import { escape } from '@microsoft/sp-lodash-subset';

export default class Employmanagement extends React.Component<IEmploymanagementProps, {}> {
  public render(): React.ReactElement<IEmploymanagementProps> {
  

    return (
      <EmployeeContextProvider>
      <HashRouter>
      <App />
      </HashRouter>
      </EmployeeContextProvider>
    );
  }
}
