import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Navber from '../Components/Navber/Navber';
import { AuthContex } from '../Context/Contex';

const Main = () => {
    const {dark} = useContext(AuthContex)
    return (
        <div className={`${dark ? 'bg-gray-700' :''}`}>
            <Navber></Navber>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;