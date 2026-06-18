import { useNavigate, useParams } from "react-router-dom";
import Button from "./components/Button";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Icon from "./components/Icon";
import Input from "./components/Input";
import Select from "./components/Select";
import { useState, useEffect } from "react";
import TextArea from './components/TextArea';
import Toggle from "./components/Toggle";
import { apiService } from "./services/apiServices";
import {toast} from "react-toastify";
import { validateRequired, validateSelect } from "./utils/validation";


function NewGroup(){
    const navigate = useNavigate();
    const {id} = useParams();
    const isEdit = !!id;
    const [isOn, setIsOn] = useState(false);
    const [isApi, setIsApi] = useState(false);
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

    if (name === "groupName") 
        error = validateRequired(value,"Group Name");
    

    if (name === "roleName") 
        error = validateSelect(value,"Role Name");
    

    return error;
};

    const handleRoleChange = (e) =>{
        const value = e.target.value;

        setFormData((prev) => ({
            ...prev,
            roleName: value
        }));

        setErrors((prev) => ({
            ...prev,
            roleName: validateField("roleName",value)
        }));
    };

    const handleToggle = () => {
        const newStatus = !isOn;

        setIsOn(newStatus);

     setFormData((prev) => ({
            ...prev,
            isActive: newStatus
        }));
    };

    const handleChange = (e)=>{

        const {id, value} = e.target;

        setFormData((prev) => ({
            ...prev,
            [id]: value
        }));

        setErrors((prev) => ({
            ...prev,
            [id]: validateField(id, value)
        }));
    };

     const validateForm = () => {

    let newErrors = {};

    const groupNameError = validateRequired(formData.groupName,"Group Name");
    if (groupNameError)
        newErrors.groupName = groupNameError;
    

    const roleNameError = validateSelect(formData.roleName,"Role Name");
    if (roleNameError)
        newErrors.roleName = roleNameError;
    

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
};

   const handleSubmit = async () => {

    if (!validateForm()) {
        return;
    }

    try {

        if (isEdit) {

            await apiService.updateGroup(
                id,
                formData
            );

            toast.success("Group Updated Successfully");

        } else {

            await apiService.createGroup(
                formData
            );

            toast.success("Group Created Successfully");

        }

        navigate("/users", {
            state: {
                activeTab: "Groups"
            }
        });

    } catch (error) {

        console.log(error);
        toast.error(error.message);

    }

};

const loadGroup = async () => {
  try {

    const data =
      await apiService.getGroupById(id);

    setFormData({
      groupName: data.groupName || "",
      roleName: data.roleName || "",
      description: data.description || "",
      isActive: data.isActive || false
    });

    setIsOn(data.isActive);

  } catch (error) {

    console.log(error);

  }
};

useEffect(() => {

    if (isEdit) {
        loadGroup();
    }

}, [isEdit]);

if (isApi) {
    return <p>Try again</p>;
}
    return(
       

                <div className="h-full flex flex-1 flex-col bg-[var(--neutral-100)] overflow-hidden">

                    <div 
                       className="
                        border-b
                        border-[var(--neutral-200)]
                        bg-[var(--neutral-100)]
                        px-6
                        py-3
                        "
                    >

                        <div className="flex items-center gap-3">

                            <Button
                               onClick={() =>
                                    navigate("/users", {
                                        state: {
                                        activeTab: "Groups"
                                        }
                                    })}
                               type="button"
                               className="
                                mt-[18px]
                                flex
                                h-6
                                w-6 
                                items-center
                                justify-center
                                cursor-pointer
                                rounded-full"  
                            >
                                <Icon name="Back" alt="Back Button" />
                            </Button>

                            <div>
                                <p className="text-[12px] text-[var(--neutral-500)]">
                                    Manage Users /
                                </p>

                                <h2 
                                    className="
                                    text-[20px]
                                    font-bold
                                    text-[var(--primary-900)]
                                "
                                >
                                    {isEdit ? "Edit Group" : "New Group"}

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
                                  id="roleName"
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
                                text={isEdit ? "Save" : "Create"}
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