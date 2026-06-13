import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import Back from "../assets/icons/Back.svg";
import Input from "../components/Input";
import TextArea from "../components/TextArea";
import Toggle from "../components/Toggle";
import { useEffect, useState } from "react";
import { apiFetch } from "../config/api";
import { toast } from "react-toastify";

function EditFacility(){

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [isOn, setIsOn] = useState(false);
    const {id} = useParams();

    const [formData, setFormData] = useState({
        facilityName: "",
        location:"",
        code:"",
        description:"",
        isActive: false
    });

    const handleToggle = () => {
        const newStatus = !isOn;

        setIsOn(newStatus);
        
        setFormData({
            ...formData,
            isActive: newStatus
        });
    };

    const validateField = (name, value) => {

        let error = "";
        
        if(name === "facilityName" && !value.trim())
            error = "Facility Name is required";

        if(name === "location" && !value.trim())
            error = "Location is required";
    }

    const handleChange = (e) => {
        const {id, value} = e.target;

        setFormData((prev) => ({
            ...prev,
            [id] : value
        }));

        setErrors((prev) => ({
            ...prev,
            [id] : validateField(id,value)
        }));
    };

    const handleUpdate = async() => {

        if(!validateForm())
            return;

        try{
            const response = await apiFetch(`/facility/${id}`,{
                method:"PUT",
                body: JSON.stringify({...formData,
                    updatedBy: localStorage.getItem("userId")
                })
            });

            const data = await response.json();

            if(!response.ok){
                toast.error(data.message);
                return;
            }

            toast.success("Facility Updated Successfully");
        } catch(error){
            console.log(error);
            toast.error("Error Updating Line");
        }
    };

    const validateForm = () => {

        let newErrors = {};

        if(!formData.facilityName.trim())
            newErrors.facilityName = "Facility Name is required";

        if(!formData.location.trim())
            newErrors.location = "Location is required";

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    useEffect(() => {
        apiFetch(`/facility/${id}`)
        .then((res) => res.json())
        .then((data) => {
            setFormData({
                facilityName: data.facilityName || "",
                location: data.location || "",
                code: data.code || "",
                description: data.description || "",
                isActive: data.isActive || false
            });

            setIsOn(data.isActive);
        })

        .catch((err) => console.log(err));
    }, [id]);

    return(

        <div className="h-full flex flex-1 flex-col bg-[var(--neutral-100)] overflow-hidden">

            <div className="border-b border-[var(--neutral-200)] bg-[var(--neutral-100)] px-6 py-4">

                <div className="flex items-center gap-3">

                    <Button
                       type = "button"
                       onClick = {() => navigate("/workstation")}
                       className = "mt-[18px] flex h-6 w-6 items-center justify-center rounded-full cursor-pointer"
                    >
                        <img src={Back} alt="Back Button" />
                    </Button>

                    <div>

                        <p className="text-[12px] text-[var(--neutral-500)]">
                            Manage Workstation /
                        </p>

                        <h2 className="text-[20px] font-bold text-[var(--primary-900)]">
                            Edit Facility
                        </h2>
                    </div>
                </div>
            </div>

            <div className="flex flex-1 flex-col">

                <div className="flex-1 rounded-t-[4px] border border-[var(--neutral-200)]
                      border-b-0 bg-[var(--neutral-50)]"
                >

                    <div className="p-6">

                        <div className="mb-5 w-[550px]">

                            <Input
                               id="facilityName"
                               label="Facility Name"
                               type="text"
                               placeHolder = "Enter facility name"
                               required={true}
                               value = {formData.facilityName}
                               onChange = {handleChange}
                               error = {errors.facilityName}                           />
                        </div>

                        <div className="mt-6 flex gap-6">

                            <div className="w-[300px]">

                                <Input
                                  id="location"
                                  label="Location"
                                  type="text"
                                  placeHolder="Enter Location"
                                  required={true}
                                  value={formData.location}
                                  onChange = {handleChange}
                                  error = {errors.location}
                                />
                            </div>

                            <div className="w-[225px]">

                                <Input
                                   id="code"
                                   label="Code"
                                   type="text"
                                   placeHolder="Enter Code"
                                   value = {formData.handleChange}
                                   onChange = {handleChange} 
                                />
                            </div>

                        </div>

                        <div className="w-[550px]">
                            <TextArea
                              id="description"
                              label="Description"
                              type="text"
                              placeHolder="Write in Details"
                              value = {formData.description}
                              onChange = {handleChange}
                            />
                        </div>

                        <div>

                            <Toggle
                              type="button"
                              label="Status"
                              isOn = {isOn}
                              onClick = {handleToggle}
                              labelClassName = "mb-2 text-[13px] font-semibold text-[var(--primary-800)]"
                              className = {`relative h-5 w-10 rounded-full transition-all
                                ${formData.isActive ? "bg-[var(--success)]" : "bg-[var(--neutral-300)]"}`}
                            >
                                <span
                                  className={`absolute top-[2px] h-4 w-4 rounded-full bg-white transition-all
                                    ${formData.isActive ? "left-5" : "left-1"}`}
                                />
                            </Toggle>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4 border border-[var(--neutral-200)] bg-white px-6 py-4">

                <Button
                  type="submit"
                  text="Save"
                  onClick = {handleUpdate}
                  className="w-[120px] bg-[var(--primary-900)] text-white"
                />

                <Button
                  type = "button"
                  text = "cancel"
                  onClick = {() => navigate("/workstation")}
                  className = "w-[120px] border border-[var(--primary-900)] bg-white text-[var(--primary-900)]"
                />
            </div>
        </div>

    )
}
export default EditFacility;