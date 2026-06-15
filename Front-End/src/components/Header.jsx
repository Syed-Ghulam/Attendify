import Help from '../assets/icons/help.svg'
import Notification from '../assets/icons/notification.svg'
import Title from '../assets/icons/Mask group.svg'
import ProfileIcon from '../assets/icons/Vector.svg'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
function Header(props){

    const navigate = useNavigate();

    const [showMenu, setShowMenu] = useState(false);
    
    const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    navigate("/login");
    };

    const user = {
        name:"Syed Ghulam Rasool",
        role:"Developer",
        profileImage:""
    };

    const getInitials = (name) =>{

        return name.split(" ") // ["Syed","Ghulam","Rasool"]
        .map((word) => word[0]) // 1 -> "Syed"
        .join("")
        .toUpperCase();
    };
    return(
        <header className="
                flex
                h-[58px]
                items-center
                justify-between
                bg-[var(--primary-950)]
                px-5
            ">
        <div>
           <img src={Title} alt='Title' />
        </div>

        <div className='flex items-center gap-5'>
            <button className='relative cursor-pointer'>
                <img src={Help} alt='help'/>
            </button>

            <button className='relative cursor-pointer'>
                <img src={Notification} alt='notification' />
            </button>
            <button
             className='cursor-pointer'
             onClick={() => setShowMenu(!showMenu)}
             >
            <div className="flex h-9 w-9 items-center justify-center overflow-hidden
            rounded-full bg-[var(--primary-100)] text-[12px] font-semibold text-[var(--primary-900)] flex-shrink-0">
                {
                    user.profileImage ? (
                        <img src={user.profileImage} alt='Profile Image'
                            className='h-full w-full object-cover'/>) :(
                                getInitials(user.name)
                            )
                    
                }
            </div>
            </button>
              <div className="relative leading-tight">

        <h4
            className="
                flex
                gap-3
                text-[12px]
                font-semibold
                text-white
                
            "
        >
            {user.name} 
        
            <button className='cursor-pointer'
                    onClick={() => setShowMenu(!showMenu)}>
                <img src={ProfileIcon} alt='Profile Icon' />
            </button>

                        {
                showMenu && (
                    <div
                        className="
                            absolute
                            right-0
                            top-8
                            z-50
                            min-w-[140px]
                            rounded-md
                            border
                            border-[var(--neutral-200)]
                            bg-white
                            shadow-lg
                        "
                    >
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="
                                w-full
                                px-4
                                py-2
                                text-left
                                text-sm
                                bg-[var(--primary-900)]
                                cursor-pointer
                            "
                        >
                            Logout
                        </button>
                    </div>
                )
            }
        </h4>

        

        <p
            className="
                text-[10px]
                text-[var(--neutral-300)]
            "
        >
            {user.role}
        </p>

    </div>
    
        </div>
            
        </header>
    )
}
export default Header