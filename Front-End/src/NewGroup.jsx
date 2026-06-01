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
    const [isOn, setIsOn] = useState(false);
    const[formData, setFormData] = useState({
        groupName:"",
        roleName:"",
        description:"",
        status:"Inactive"
    })

    const roleOptions = [
        "QC Operations",
        "Technician",
    ];

    const handleRoleChange = (e) =>{
        setFormData({
            ...formData,roleName: e.target.value
        });
    };

    const handleToggle = () => {
        const newStatus = !isOn;

        setIsOn(newStatus);

        setFormData({
            ...formData, status: newStatus? "Active":"Inactive"
        });
    };

    const handleChange = (e)=>{
        setFormData({
            ...formData,[e.target.id]: e.target.value
        });
    };

    const handleSubmit = async() => {

        const payload = {
            ...formData
        }

        try{
            console.log("Payload: ",payload)
            const response = await fetch(
                "http://localhost:5000/groups",
                {
                    method:"POST",

                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify(payload)
                }
            );

            const data= await response.json();
            console.log(data);
            alert("Group Created Successfully");
        } catch(error){
            console.log(error);
            alert("Error creating group");
        }
    };
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
                               onClick = {() =>navigate("/users")}
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
                        <div className="w-[700px] px-6 py-5">
                            <div className="mb-6">
                                <Input 
                                  id="groupName"
                                  label = "Group Name"
                                  type ="text"
                                  placeHolder="Enter group name"
                                  required={true}
                                  value={formData.groupName}
                                  onChange={handleChange}
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
                                        text-[var(--color-label)]
                                        "
                                />
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
                                onClick={handleSubmit}
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