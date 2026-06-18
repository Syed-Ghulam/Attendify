import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { apiService } from "../services/apiServices";
import {toast} from "react-toastify";
import {validateRequired, validateSelect} from "../utils/validation"

import Button from "../components/Button";

import Input from "../components/Input";
import Select from "../components/Select";
import Icon from "../components/Icon";
import Toggle from "../components/Toggle";



function NewLine() {

   const navigate = useNavigate();
   const {id} = useParams();
   const isEdit = !!id;
   const [isOn, setIsOn] = useState(false);
   const [isApi, setIsApi] = useState(false);

 const [formData, setFormData] = useState({
   lineNameNumber: "",
   facility: "",
   lineCode: "",
   isActive: false
});

   const [errors, setErros] = useState({});
   const [facilityOptions, setFacilityOptions] = useState([]);


   const handleToggle = () => {
      const newStatus = !isOn;

      setIsOn(newStatus);

     setFormData((prev) => ({
         ...prev,
         isActive: newStatus
      }));
   };

    const validateField = (name, value) => {
    let error = "";

    if (name === "lineNameNumber") {
        error = validateRequired(value, "Line Name / Number");
    }

    if (name === "facility") {
        error = validateSelect(value, "Facility");
    }

    return error;
    };

   const handleChange = (e) => {

      const {id, value} = e.target;

      setFormData((prev)=>({
         ...prev,
         [id]:value
      }));

      setErros((prev)=>({
         ...prev,
         [id]: validateField(id, value)
      }));
   };

   const handleSubmit = async () => {

   if (!validateForm()) {
      return;
   }

   try {

      if (isEdit) {

         await apiService.updateLine(
            id,
            formData
         );

         toast.success("Line Updated Successfully");

      } else {

         await apiService.createLine(
            formData
         );

         toast.success("Line Created Successfully");

      }

      navigate("/workstation", {
         state: {
            activeTab: "Line"
         }
      });

   } catch (error) {

      console.log(error);
      toast.error(error.message);

   }
};

   const validateForm = () => {

   let newErrors = {};

   const lineNameError = validateRequired(formData.lineNameNumber,"Line Name / Number");
   if (lineNameError) 
      newErrors.lineNameNumber =lineNameError;
   
   const facilityError = validateSelect(formData.facility, "Facility");
   if (facilityError) {
      newErrors.facility =facilityError;
   }

   setErros(newErrors);

   return Object.keys(newErrors).length === 0;
};

const loadLine = async () => {

   try {

      const data = await apiService.getLineById(id);

      setFormData({
         lineNameNumber: data.lineNameNumber || "",
         facility: data.facility || "",
         lineCode: data.lineCode || "",
         isActive: data.isActive ?? false
      });

      setIsOn(data.isActive ?? false);

   } catch (error) {

      console.log(error);
      setIsApi(true);

   }
};

const loadFacilities = async () => {
    try {

        const data = await apiService.getFacilities();

        const facilities = [
            ...new Set(
            data
                .filter(item => item.isActive)
                .map(item => item.facilityName)
        )];

        setFacilityOptions(facilities);

    } catch (error) {
        console.log(error);
    }
};

useEffect(() => {

   loadFacilities();

   if (isEdit) {
      loadLine();
   }

}, [isEdit]);

if (isApi) {
   return <p>Try Again</p>;
}

   return (

      

            <div className="h-full flex flex-1 flex-col bg-[var(--neutral-100)] overflow-hidden">

               {/* Header Section */}

               <div className="border-b border-[var(--neutral-200)] bg-[var(--neutral-100)] px-6 py-3">

                  <div className="flex items-center gap-3">

                     <Button
                        type="button"    
                        onClick={() => navigate("/workstation",{
                           state:{
                              activeTab: "Line"
                           }
                        })}
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
                            {isEdit ? "Edit Line" : "New Line"}
                        </h2>

                     </div>

                  </div>

               </div>

               {/* Main Content */}

               <div className="flex flex-1 flex-col">

                  {/* Form Card */}

                  <div
                     className="flex-1 rounded-t-[4px]
                     border border-[var(--neutral-200)]
                     border-b-0
                     bg-[var(--neutral-50)]"
                  >

                     <div className="p-6">

                        <div className="mb-5 w-[550px]">

                           <Input
                              id="lineNameNumber"
                              label="Line Name / Number"
                              type="text"
                              required={true}
                              value={formData.lineNameNumber}
                              onChange={handleChange}
                              error = {errors.lineNameNumber}
                              placeHolder="Enter Line Name / Number "
                           />
                        </div>
                        
                           {/* Facility */}

                           <div className="w-[550px]">

                              <Select
                                 id="facility"
                                 label="Facility"
                                 required={true}
                                 value={formData.facility}
                                 onChange={handleChange}
                                 options={facilityOptions}
                                 error = {errors.facility}
                                 labelClassName="
                                       mb-[6px]
                                       block
                                       text-[13px]
                                       font-semibold
                                       text-[var(--primary-900)]
                                    "
                                 className="h-[42px] w-full rounded-[4px]
                                 border border-[var(--neutral-300)]
                                 bg-white px-3 text-[14px]
                                 outline-none cursor-pointer"
                              />

                           </div>


                           <div className="mt-3 flex gap-6">
                           
                           <div className="w-[300px]">

                              <Input
                                 id="lineCode"
                                 label="Code"
                                 type="text"
                                 value={formData.lineCode}
                                 onChange={handleChange}
                                 placeHolder="Enter code"
                              />

                           </div>

                           <div className="mt-5">  

                              <Toggle
                                 type="button"
                                 label = "Status"
                                 isOn={isOn}
                                 onClick={handleToggle}
                                 labelClassName="mt-3 mb-2 text-[13px] font-semibold text-[var(--primary-800)]"
                                 className={`relative h-5 w-10 rounded-full transition-all
                                 ${
                                    formData.isActive
                                       ? "bg-[var(--success)]"
                                       : "bg-[var(--neutral-300)]"
                                 }`}
                              >

                                 <span
                                    className={`absolute top-[2px]
                                    h-4 w-4 rounded-full bg-white transition-all
                                    ${
                                       formData.isActive
                                          ? "left-5"
                                          : "left-1"
                                    }`}
                                 />
                              </Toggle>

                           </div>

                        </div>

                     </div>

                  </div>

                  {/* Bottom Button Section */}

                  <div
                     className="flex items-center gap-4
                     border border-[var(--neutral-200)]
                     bg-white px-6 py-4"
                  >

                     <Button
                        type="submit"
                        text={isEdit ? "Update" : "Create"}
                        onClick ={handleSubmit}
                        className="w-[120px]
                         bg-[var(--primary-900)] text-white"
                     />

                     <Button
                        type="button"
                        text="Cancel"
                        onClick={() => navigate("/workstation")}
                        className="w-[120px]
                        border border-[var(--primary-900)]
                        bg-white text-[var(--primary-900)]
                     "
                     />

                  </div>

               </div>

            </div>

   );
}

export default NewLine;