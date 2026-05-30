import { useNavigate } from "react-router-dom";
import Button from "./components/Button";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Back from "./assets/icons/Back.svg";
import Input from "./components/Input";
import Select from "./components/Select";
import { useState } from "react";
import TextArea from './components/TextArea';
import Toggle from "./components/Toggle";


function NewGroup(){
    const navigate = useNavigate();
    const [roleName, setRoleName] = useState();
    const [isOn, setIsOn] = useState();

    const roleOptions = [
        "QC Operations",
        "Technician",
    ];

    const handleRoleChange = (e) =>{
        setRoleName(e.target.value)
    };

    const handleToggle = () => {
        const newStatus = !isOn;

        setIsOn(newStatus);
    }
    return(
        <div className="min-h-screen bg-[var(--color-background)]">
            <Header />

            <div className="flex ">
                <Sidebar />

                <div className="flex flex-1 flex-col">

                    <div 
                       className="
                        border-b
                        border-[var(--color-border-light)]
                        bg-[var(--color-background)]
                        px-6
                        py-4
                        "
                    >

                        <div className="flex gap-3">

                            <Button
                               type="button"
                               className="
                                mt-[22px]
                                flex
                                h-6
                                w-6 
                                justify-center
                                cursor-pointer
                                rounded-full"  
                            >
                                <img src={Back} alt="Back Button" />
                            </Button>

                            <div>
                                <p>
                                    Manage Users /
                                </p>

                                <h2 
                                    className="
                                    text-[30px]
                                    font-bold
                                    leading-none
                                    text-[var(--color-heading)]
                                "
                                >
                                    New Group
                                </h2>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-1 flex-col">
                        <div className="w-[560px] px-6 py-5">
                            <div className="mb-6">
                                <Input 
                                  id="groupName"
                                  label = "Group Name"
                                  type ="text"
                                  required={true}
                                />
                            </div>

                            <div>
                                <Select
                                id="role name"
                                  label = "Role Name"
                                  value ={roleName}
                                  required={true}
                                  options = {roleOptions}
                                       labelClassName="
                                        mb-[6px]
                                        block
                                        text-[13px]
                                        font-semibold
                                        text-[var(--color-label)]
                                        "
                                        className="
                                        h-[42px]
                                        w-full
                                        rounded-[4px]
                                        border
                                        border-[var(--color-border)]
                                        bg-white
                                        px-3
                                        text-[14px]
                                        outline-none
                                        transition-all
                                        focus:border-[var(--color-focus)]
                                        cursor-pointer
                                        " 
                                />
                            </div>

                            <div>
                                <TextArea 
                                 id="description"
                                 label="Description"
                                 placeHolder="Write in details..."
                                 />
                            </div>

                            <div>
                                <Toggle 
                                  label = "Status"
                                  isOn={isOn}
                                  onClick = {handleToggle} 
                                />

                                <p className="text-[14px] text-[var(--color-heading)]">
                                    {isOn? "Active" : "Inactive"}
                                </p>
                            </div>
                        </div>

                        <div
                            className="
                                border-t
                                border-[var(--color-border-light)]
                                bg-white
                                px-6
                                py-5
                                mt-auto
                            "
                            >
                            <div className="flex gap-4">

                                <Button
                                type="submit"
                                text="Create"
                                className="
                                    h-[42px]
                                    w-[125px]
                                    rounded-[4px]
                                    bg-[var(--color-primary)]
                                    text-white
                                    cursor-pointer
                                "
                                />

                                <Button
                                type="button"
                                text="Cancel"
                                onClick={() => navigate("/users")}
                                className="
                                    h-[42px]
                                    w-[125px]
                                    rounded-[4px]
                                    border
                                    border-[var(--color-primary)]
                                    bg-white
                                    text-[var(--color-primary)]
                                    cursor-pointer
                                "
                                />

                            </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default NewGroup;