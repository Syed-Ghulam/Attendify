import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import Icon from "../components/Icon";
import Input from "../components/Input";
import { useEffect, useState } from "react";
import Select from "../components/Select";
import Toggle from "../components/Toggle";
import { apiService } from "../services/apiServices";
import { toast } from "react-toastify";
import { validateRequired, validateSelect } from "../utils/validation";

function EditLine(){

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [isOn, setIsOn] = useState(false);
    const {id} = useParams();

    const [formData, setFormData] = useState({
        lineNameNumber: "",
        facility:"BPL Medical Technologies",
        lineCode:"",
        isActive: false
    });

    const facilityOptions = [
        "BPL Medical Technologies"
    ];

    const handleToggle = () => {
        const newStatus = !isOn;

        setIsOn(newStatus);

        setFormData((prev) => ({
            ...prev,
            isActive: newStatus
        }));
    };

useEffect(() => {
    loadLine();
}, [id]);

const loadLine = async () => {
    try {

        const data =
            await apiService.getLineById(id);

        setFormData({
            lineNameNumber:
                data.lineNameNumber || "",
            facility:
                data.facility || "",
            lineCode:
                data.lineCode || "",
            isActive:
                data.isActive ?? false
        });

        setIsOn(data.isActive ?? false);

    } catch (error) {

        console.log(error);

    }
};

    const validateField = (name, value) => {
        let error = "";

        if(name === "lineNameNumber")
            error = validateRequired(value, "Line Name / Number ");

        if(name === "facility")
            error = validateSelect(value, "Facility");

        return error;
    };

    const handleChange = (e) => {
        const {id, value} = e.target;

        setFormData((prev) => ({
             ...prev,
             [id]:value
        }));

        setErrors((prev)=>({
            ...prev,
            [id]: validateField(id,value)
        }));
    };

    const handleUpdate = async() => {

        if(!validateForm())
            return;

        try{
            await apiService.updateLine(
                id,
                {
                    ...formData
                }
            );

            toast.success("Line Updated Successfully");
        
        } catch(error){
            console.log(error);
            toast.error(error.message);
        }
    };

    const validateForm = () => {

        let newErrors = {};

        const lineNameError = validateRequired(formData.lineNameNumber, "Line Name / Number");
        if(lineNameError){
            newErrors.lineNameNumber = lineNameError;
        };

        const facilityError = validateSelect(formData.facility, "Facility");
        if(facilityError){
            newErrors.facility = facilityError;
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length ===0;
    };

    return(

        <div className="h-full flex flex-1 flex-col bg-[var(--neutral-100)] overflow-hidden">

            <div className="border-b border-[var(--neutral-200)] bg-[var(--neutral-100)] px-6 py-4">

                <div className="flex items-center gap-3">

                    <Button 
                      type = "button"
                      onClick = {() => navigate("/workstation")}
                      className="mt-[18px] flex h-6 w-6 items-center
                      justify-center rounded-full cursor-pointer"
                    >

                        <Icon name="Back" alt="Back Button" />

                    </Button>

                    <div>

                        <p className="text-[12px] text-[var(--neutral-500)]">
                            Manage Workstation /
                        </p>

                        <h2 className="text-[20px] font-bold text-[var(--primary-900)]">
                            Edit Line
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
                               id = "lineNameNumber"
                               label="Line Name / Number"
                               type="text"
                               placeHolder = "Enter Line Name / Number"
                               required={true}
                               value = {formData.lineNameNumber}
                               onChange = {handleChange}
                               error = {errors.lineNameNumber}
                            />
                        </div>

                        <div className="w-[550px]">

                            <Select 
                               id="facility"
                               label="Facility"
                               required={true}
                               value = {formData.facility}
                               onChange = {handleChange}
                               options = {facilityOptions}
                               error = {errors.facility}
                               labelClassName="mb-[6px] block text-[13px] font-semibold text-[var(--primary-900)]"
                               className="h-[42px] w-full rounded-[4px] border border-[var(--neutral-300)]
                                          bg-white px-3 text-[14px] outline-none cursor-pointer"
                            />
                        </div>

                        <div className="mt-6 flex gap-6">

                            <div className="w-[300px]">

                                <Input 
                                    id="lineCode"
                                    label="Code"
                                    type="text"
                                    placeHolder="Enter code"
                                    value={formData.lineCode}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>

                                <p className="mb-2 text-[13px] font-semibold text-[var(--primary-800)]">

                                    Status
                                </p>

                                <div>

                                    <Toggle
                                        type="button"
                                        isOn={isOn}
                                        onClick = {handleToggle}
                                        className={`relative h-5 w-10 rounded-full transition-all
                                            ${
                                                formData.isActive ? "bg-[var(--success)]" : "bg-[var(--neutral-300)]"
                                            }`}
                                    >
                                        <span 
                                          className={`absolute top-[2px] h-4 w-4 rounded-full bg-white transition-all
                                            ${
                                                formData.isActive ? "left-5" : "left-1"
                                            }`}
                                        />
                                    </Toggle>
                                </div>
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
                        onClick={() => navigate("/workstation")}
                        className="w-[120px] border border-[var(--primary-900)] bg-white text-[var(--primary-900)]"
                    />
                </div>
            </div>
        </div>
    )
}
export default EditLine;