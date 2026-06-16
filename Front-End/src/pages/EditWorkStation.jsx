import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { apiService } from "../services/apiServices";
import {toast} from "react-toastify";
import { validateRequired, validateSelect,validateIpAddress } from "../utils/validation";

import Button from "../components/Button";
import Input from "../components/Input";
import Select from "../components/Select";

import Icon from "../components/Icon";
import Toggle from "../components/Toggle";


function EditWorkStation() {

   const navigate = useNavigate();
   const { id } = useParams();
   const [isOn, setIsOn] = useState(false);

   const [formData, setFormData] = useState({
      workstationName: "",
      ipAddress: "",
      facility: "BPL Medical Technologies",
      code: "",
      linenameNumber: "Line 1",
      isActive: false
   });

   const [errors, setErros] = useState({});

   const facilityOptions = [
      "BPL Medical Technologies"
   ];

   const lineOptions = [
      "Electrocardiograph"
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
   loadWorkStation();
}, [id]);

const loadWorkStation = async () => {
   try {

      const data =
         await apiService.getWorkStationById(id);

      setFormData({
         workstationName: data.workstationName || "",
         ipAddress: data.ipAddress || "",
         facility: data.facility || "",
         code: data.code || "",
         linenameNumber: data.linenameNumber || "",
         isActive: data.isActive ?? false
      });

      setIsOn(data.isActive);

   } catch (error) {

      console.log(error);

   }
};

   const validateField = (name, value) => {
   let error = "";

   if (name === "workstationName") 
      error = validateRequired(value, "Workstation Name");
   

   if (name === "ipAddress") 
      error = validateIpAddress(value);

   if (name === "facility") 
      error = validateSelect(value,"Facility");
   

   if (name === "linenameNumber") 
      error = validateSelect(value, "Line Name / Number");
   

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

   const handleUpdate = async() => {
      
      if(!validateForm()){
         return;
      }

      try{
         
         await apiService.updateWorkStation(id,
            {
               ...formData,
               
            }
         );

         toast.success("WorkStation Updated Successfully");
      } catch(error){
         console.log(error);
         toast.error(error.message);
      }
   };

   const validateForm = ()=>{
      let newErrors = {};

      //Workstation
      const workstationError = validateRequired(formData.workstationName, "Workstation Name");
      if(workstationError)
         newErrors.workstationName = workstationError
      
      //IP Address
      const ipError = validateIpAddress(formData.ipAddress);
      if (ipError) 
         newErrors.ipAddress = ipError;

      //Facility
      const facilityError = validateSelect(formData.facility,"Facility");
      if(facilityError)
         newErrors.facility = facilityError;
      
      //LineName/ Number
      const lineError = validateSelect(formData.linenameNumber,"Line Name / Number");
      if(lineError)
         newErrors.linenameNumber = lineError
      

      setErros(newErrors);
      return Object.keys(newErrors).length===0;
   };

   return (

      

            <div className="h-full flex flex-1 flex-col bg-[var(--neutral-100)] overflow-hidden">

               {/* Header Section */}

               <div className="border-b border-[var(--neutral-200)] bg-[var(--neutral-100)] px-6 py-4">

                  <div className="flex items-center gap-3">

                     <Button
                        type="button"
                        onClick={() => navigate("/workstation")}
                        className="mt-[18px] flex h-6 w-6 items-center
                        justify-center rounded-full cursor-pointer"
                     >

                        <Icon name="Back" alt="Back Button" />

                     </Button>

                     <div>

                        <p className="text-[12px] text-[var(--neutral-500)]">
                           Manage Workstation /
                        </p>

                        <h2 className="text-[30px] font-bold leading-none text-[var(--primary-900)]">
                           Edit WorkStation
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

                        {/* Workstation Name */}

                        <div className="mb-5 w-[510px]">

                           <Input
                              id="workstationName"
                              label="Workstation Name"
                              type="text"
                              required={true}
                              value={formData.workstationName}
                              onChange={handleChange}
                              error = {errors.workstationName}
                              placeHolder="Enter workstation name"
                           />
                        </div>

                        {/* IP Address */}

                        <div className="mb-5 w-[510px]">

                           <Input
                              id="ipAddress"
                              label="IP Address"
                              type="text"
                              required={true}
                              value={formData.ipAddress}
                              onChange={handleChange}
                              placeHolder="Enter IP address"
                              error ={errors.ipAddress}
                           />

                        </div>

                        {/* Facility + Code */}

                        <div className="mb-5 flex gap-4">

                           {/* Facility */}

                           <div className="w-[280px]">

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

                           {/* Code */}

                           <div className="w-[230px]">

                              <Input
                                 id="code"
                                 label="Code"
                                 type="text"
                                 value={formData.code}
                                 onChange={handleChange}
                                 placeHolder="Enter code"
                              />

                           </div>

                        </div>

                        {/* Line Name */}

                        <div className="mb-5 w-[510px]">

                           <Select
                              id="linenameNumber"
                              label="Line Name / Number"
                              required={true}
                              value={formData.linenameNumber}
                              onChange={handleChange}
                              options={lineOptions}
                              error = {errors.linenameNumber}
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

                        {/* Status */}

                        <div className="mt-6">

                           <p className="mb-2 text-[13px]
                           font-semibold text-[var(--primary-800)]">

                              Status
                           </p>

                           <div className="flex items-center gap-2">

                              <Toggle
                                 type="button"
                                 isOn={isOn}
                                 onClick={handleToggle}
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
                        text="Save"
                        onClick ={handleUpdate}
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

export default EditWorkStation;