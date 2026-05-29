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
                bg-[#272757]
                px-5
            ">
        <div>
           <img src={Title}>
        </img>
        </div>

        <div className='flex items-center gap-5'>
            <button className='relative cursor-pointer'>
                <img src={Help}/>
            </button>

            <button className='relative cursor-pointer'>
                <img src={Notification} />
            </button>

            <div className="flex h-9 w-9 items-center justify-center overflow-hidden
            rounded-full bg-[#D8D7F3] text-[12px] font-semibold text-[#25245D] flex-shrink-0">
                {
                    user.profileImage ? (
                        <img src={user.profileImage}
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
                <img src={ProfileIcon} />
            </button>
        </h4>

        <p
            className="
                text-[10px]
                text-[#C8C8E2]
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