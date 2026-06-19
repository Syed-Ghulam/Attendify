import Icon from "./Icon";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL, apiFetch } from "../config/api";
   

function Header(props) {
    const navigate = useNavigate();

    const [showMenu, setShowMenu] = useState(false);

    const handleLogout = async () => {
      try{

        await apiFetch("/users/logout",{
            method: "POST",
        });
      } finally {
        localStorage.removeItem("userId");
        navigate("/login");
      }
    };

    const user = {
        name: "Syed Ghulam Rasool",
        role: "Developer",
        profileImage: ""
    };

    const getInitials = (name) => {
        return name
            .split(" ")
            .map((word) => word[0])
            .join("")
            .toUpperCase();
    };

    return (
        <header
            className="
                flex
                h-[58px]
                items-center
                justify-between
                bg-[var(--primary-950)]
                px-5
            "
        >
            <div>
                <Icon
                    name="BPLlogo"
                    alt="Title"
                />
            </div>

            <div className="flex items-center gap-5">

                <button className="relative cursor-pointer">
                    <Icon
                        name="Help"
                        alt="Help"
                    />
                </button>

                <button className="relative cursor-pointer">
                    <Icon
                        name="Notification"
                        alt="Notification"
                    />
                </button>

                {/* Profile Section */}
                <div className="relative">

                    <button
                        type="button"
                        onClick={() => setShowMenu(!showMenu)}
                        className="flex items-center gap-3 cursor-pointer"
                    >
                        {/* Profile Icon */}
                        <div
                            className="
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                overflow-hidden
                                rounded-full
                                bg-[var(--primary-100)]
                                text-[12px]
                                font-semibold
                                text-[var(--primary-900)]
                                flex-shrink-0
                            "
                        >
                            {user.profileImage ? (
                                <img
                                    src={user.profileImage}
                                    alt="Profile Image"
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                getInitials(user.name)
                            )}
                        </div>

                        {/* Username */}
                        <div className="leading-tight text-left">

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

                                <Icon
                                    name="DropDown"
                                    alt="DropDown"
                                />
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
                    </button>

                    {showMenu && (
                        <div
                            className="
                                absolute
                                right-0
                                top-12
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
                                    text-white
                                    cursor-pointer
                                "
                            >
                                Logout
                            </button>
                        </div>
                    )}

                </div>

            </div>

        </header>
    );
}

export default Header;