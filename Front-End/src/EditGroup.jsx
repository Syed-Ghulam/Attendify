import Button from "./components/Button";
import Icon from "./components/Icon";
import { useNavigate, useParams } from "react-router-dom";
import Input from "./components/Input";
import { useEffect, useState } from "react";
import { apiService } from "./services/apiServices";
import Select from "./components/Select";
import TextArea from "./components/TextArea";
import Toggle from "./components/Toggle";
import { toast } from "react-toastify";
import { validateRequired, validateSelect } from "./utils/validation";

function EditGroup (){
    const navigate = useNavigate();
    const {id} = useParams();
    const[errors, setErrors] = useState({});

    const[formData, setFormData] = useState({
        groupName: "",
        roleName: "",
        description: "",
        isActive: false
    });

    const roleOptions = [
        "QC Operations",
        "Technician"
    ];

    const validateField = (name, value) => {
        let error = "";

        if (name === "groupName") {
            error = validateRequired(value,"Group Name");
        }

        if (name === "roleName") {
            error = validateSelect(value,"Role Name");
        }

        return error;
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

    const handleChange = (e) => {
        const {id, value} = e.target;

        setFormData((prev) => ({
            ...prev,
            [id]: value
        }));

        setErrors((prev) => ({
            ...prev,
            [id]: validateField(id,value)
        }));
    };

    const handleUpdate = async() => {
        if(!validateForm()){
            return;
        }

        try{

            const data = await apiService.updateGroup(
                    id,
                    {
                        ...formData,  
                    }
                    );

             console.log(data);
             
             toast.success("Group Updated Successfully");
        } catch(error){
            console.log(error);
            toast.error(error.message);
        }
    };

   useEffect(() => {
  loadGroup();
}, [id]);

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

  } catch (error) {

    console.log(error);

  }
};
    
    return(
        <div className="h-full flex flex-1 flex-col bg-[var(--neutral-100)] overflow-hidden">
            <div  className="
                border-b
                border-[var(--neutral-200)]
                bg-[var(--neutral-100)]
                px-6
                py-4
            ">
                <div className="flex gap-3">
                    <Button
                        type="button"
                        onClick={() =>
                            navigate("/users", {
                                state: {
                                activeTab: "Groups"
                                }
                            })
                            }
                        className="
                        mt-[22px]
                        flex
                        h-6
                        w-6 
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
                            text-[30px]
                            font-bold
                            text-[var(--primary-900)]
                        "
                        >
                        Edit Group
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
                           type = "text"
                           required={true}
                           value = {formData.groupName}
                           onChange = {handleChange}
                           error={errors.groupName}
                        />
                    </div>

                    <div>
                        <Select 
                         id="roleName"
                         label="Role Name"
                         value = {formData.roleName}
                         required={true}
                         options = {roleOptions}
                         onChange = {handleChange}
                         error={errors.roleName}
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
                          id = "description"
                          label="Description"
                          value={formData.description}
                          onChange={handleChange}
                        />
                    </div>

                    <div>
                        <Toggle
                          label="Status"
                          isOn={formData.isActive}
                          onClick={() =>
                            setFormData((prev) => ({
                                    ...prev,
                                    isActive: !prev.isActive
                                }))
                          }
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
                                text="Save"
                                onClick={handleUpdate}
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
export default EditGroup;