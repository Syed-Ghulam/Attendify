import Button from './Button';
import { menuItems } from '../config/sidebarMenu';
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

function Sidebar() {

    const navigate = useNavigate();

    const location = useLocation();


    const moduleRoutes = {
        users:[
            "/users",
            "/new-user",
            "/edit-user",
            "/view-user",
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
            className="flex w-[72px] flex-col items-center gap-5
                border-r border-[var(--neutral-200)] bg-white py-4 flex-shrink-0"
        >

            {
                menuItems.map((item) => {

                   const isActive = moduleRoutes[item.id]
                     ? moduleRoutes[item.id].some(route => 
                        location.pathname.startsWith(route)
                     )
                     : location.pathname === item.path;
                    return(

                    <Button
                        type="button"
                        key={item.id}

                        onClick={() => handleClick(item)}

                        className={`flex px-0 w-10 items-center justify-center transition-all
                             ${isActive? "bg-[var(--primary-900)]" : "bg-transparent"}`}
                    >

                        <img
                            src={item.icon} alt='icon'
                            className={`${isActive? "brightness-0 invert":""}`}
                          
                        />

                    </Button>
                    )
                    
                })
            }

        </aside>
    );
}

export default Sidebar;