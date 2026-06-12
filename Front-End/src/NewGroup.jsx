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
import { apiFetch } from "./config/api";
import {toast} from "react-toastify";


function NewGroup(){
    const navigate = useNavigate();
    const [isOn, setIsOn] = useState(false);
    const [error, setErrors] = useState({});
    const[formData, setFormData] = useState({
        groupName:"",
        roleName:"",
        description:"",
        isActive: false
    });

    const roleOptions = [
        "QC Operations",
        "Technician",
    ];

    const validateField = (name, value) => {
    let error = "";

    if (name === "groupName" && !value.trim()) {
        error = "Group Name is required";
    }

    if (name === "roleName" && !value) {
        error = "Role Name is required";
    }

    return error;
};

    const handleRoleChange = (e) =>{
        const value = e.target.value;

        setFormData({
            ...formData,roleName: value
        });

        setErrors((prev) => ({
            ...prev,
            roleName: validateField("roleName",value)
        }));
    };

    const handleToggle = () => {
        const newStatus = !isOn;

        setIsOn(newStatus);

        setFormData({
            ...formData, isActive: newStatus
        });
    };

    const handleChange = (e)=>{

        const {id, value} = e.target;

        setFormData({
            ...formData,[id]: value
        });

        setErrors((prev) => ({
            ...prev,
            [id]: validateField(id, value)
        }));
    };

    const validateForm = () => {
    let newErrors = {};

    if (!formData.groupName.trim()) {
        newErrors.groupName = "Group Name is required";
    }

    if (!formData.roleName) {
        newErrors.roleName = "Role Name is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
};

    const handleSubmit = async() => {

        if(!validateForm()){
            return;
        }

        const payload = {
            ...formData,
            createdBy: localStorage.getItem("userId"),
            updatedBy: localStorage.getItem("userId")
        }

        try{
            console.log("Payload: ",payload)
            const response = await apiFetch('/groups',
                {
                    method:"POST",
                    body:JSON.stringify(payload)
                }
            );

            const data= await response.json();
            console.log(data);
            toast.success("Group Created Successfully");
        } catch(error){
            console.log(error);
            toast.error("Error creating group");
        }
    };
    return(
       

                <div className="h-full flex flex-1 flex-col bg-[var(--neutral-100)] overflow-hidden">

                    <div 
                       className="
                        border-b
                        border-[var(--neutral-200)]
                        bg-[var(--neutral-100)]
                        px-6
                        py-4
                        "
                    >

                        <div className="flex gap-3">

                            <Button
                               onClick={() =>
                                    navigate("/users", {
                                        state: {
                                        activeTab: "Groups"
                                        }
                                    })}
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
                                <p className="text-[12px] text-[var(--neutral-500)]">
                                    Manage Users /
                                </p>

                                <h2 
                                    className="
                                    text-[30px]
                                    font-bold
                                    text-[var(--primary-900)]
                                "
                                >
                                    New Group
                                </h2>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-1 flex-col overflow-auto">
                        <div className="w-full max-w-[1150px] px-6 py-5">
                            <div className="mb-6">
                                <Input 
                                  id="groupName"
                                  label = "Group Name"
                                  type ="text"
                                  placeHolder="Enter group name"
                                  required={true}
                                  value={formData.groupName}
                                  onChange={handleChange}
                                  error={error.groupName}
                                />
                            </div>

                            <div>
                                <Select
                                  id="role name"
                                  label = "Role Name"
                                  value ={formData.roleName}
                                  required={true}
                                  options = {roleOptions}
                                  onChange={handleRoleChange}
                                  error={error.roleName}
                                  labelClassName="
                                        mb-[6px]
                                        block
                                        text-[13px]
                                        font-semibold
                                        text-[var(--primary-900)]
                                        "
                                        className="
                                        h-[42px]
                                        w-full
                                        rounded-[4px]
                                        border
                                        border-[var(--neutral-300)]
                                        bg-white
                                        px-3
                                        text-[14px]
                                        outline-none
                                        transition-all
                                        focus:border-[var(--primary-500)]
                                        cursor-pointer
                                        " 
                                />
                              
                            </div>

                            <div>
                                <TextArea 
                                 id="description"
                                 label="Description"
                                 placeHolder="Write in details..."
                                 value={formData.description}
                                 onChange={handleChange}
                                 />
                            </div>

                            <div>
                                <Toggle 
                                  label = "Status"
                                  isOn={isOn}
                                  onClick = {handleToggle} 
                                  labelClassName="
                                        mt-[15px]
                                        mb-[6px]
                                        block
                                        text-[13px]
                                        font-semibold
                                        text-[var(--primary-900)]
                                        "
                                />
                            </div>
                        </div>

                        <div
                            className="
                                border-t
                                border-[var(--neutral-200)]
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
                                onClick={handleSubmit}
                                className="
                                    w-[125px]
                                    bg-[var(--primary-900)]
                                    text-white
                                "
                                />

                                <Button
                                type="button"
                                text="Cancel"
                                onClick={() =>
                                    navigate("/users", {
                                        state: {
                                        activeTab: "Groups"
                                        }
                                    })
                                    }
                                className="
                                    w-[125px]
                                    border
                                    border-[var(--primary-900)]
                                    bg-white
                                    text-[var(--primary-900)]
                                "
                                />

                            </div>
                            </div>
                    </div>
                </div>
         
    )
}
export default NewGroup;