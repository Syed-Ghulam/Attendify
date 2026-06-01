import DashBoard from '../assets/icons/dashboard.svg';
import WorkStation from '../assets/icons/workstation.svg';
import ProductMaster from '../assets/icons/ProductMaster.svg';
import MyOrders from '../assets/icons/MyOrders.svg';
import UserManagement from '../assets/icons/UserManagement.svg';
import TemperatureHistory from '../assets/icons/TemperatureHistory.svg';
import NCMR from '../assets/icons/NCMR.svg';

import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

function Sidebar() {

    const navigate = useNavigate();

    const location = useLocation();

    const menuItems = [

        {
            id: "dashboard",
            icon: DashBoard,
        },

        {
            id: "workstation",
            icon: WorkStation,
            path:"/workstation"
        },

        {
            id: "product",
            icon: ProductMaster,
        },

        {
            id: "orders",
            icon: MyOrders,
        },

        {
            id: "users",
            icon: UserManagement,
            path: "/users",
        },

        {
            id: "temperature",
            icon: TemperatureHistory,
        },

        {
            id: "ncmr",
            icon: NCMR,
        }

    ];

    const moduleRoutes = {
        users:[
            "/users",
            "/new-user",
            "/edit-user",
            "/new-group",
            "/edit-group"
        ],

        workstation: [
            "/workstation",
            "/new-workstation",
            "/edit-workstation"
        ]
    };

    const handleClick = (item) => {

        if(item.path){
            navigate(item.path);
        }
    };

    return (

        <aside
            className="flex w-[72px] min-h-screen flex-col items-center gap-5
                border-r border-[var(--color-border-light)] bg-[var(--color-white)] py-4 flex-shrink-0"
        >

            {
                menuItems.map((item) => {

                   const isActive = moduleRoutes[item.id]
                     ? moduleRoutes[item.id].some(route => 
                        location.pathname.startsWith(route)
                     )
                     : location.pathname === item.path;
                    return(

                    <button

                        key={item.id}

                        onClick={() => handleClick(item)}

                        className={`flex h-10 w-10 items-center justify-center rounded-[6px] transition-all cursor-pointer
                             ${isActive? "bg-[var(--color-sidebar-active)]" : "bg-transparent"}`}
                    >

                        <img
                            src={item.icon} alt='icon'
                            className={`${isActive? "brightness-0 invert":""}`}
                          
                        />

                    </button>
                    )
                    
                })
            }

        </aside>
    );
}

export default Sidebar;