import Help from '../assets/icons/help.svg'
import Notification from '../assets/icons/notification.svg'
import Title from '../assets/icons/Mask group.svg'
import ProfileIcon from '../assets/icons/Vector.svg'
function Header(props){

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
              <div className="leading-tight">

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
            <button className='cursor-pointer'>
                <img src={ProfileIcon} alt='Profile Icon' />
            </button>
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