import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { apiFetch } from "./config/api";
import {toast} from "react-toastify";

import Button from "./components/Button";

import Input from "./components/Input";
import Select from "./components/Select";

import Back from "./assets/icons/Back.svg";
import Toggle from "./components/Toggle";


function NewWorkStation() {

   const navigate = useNavigate();
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

      setFormData({
         ...formData,
         isActive: newStatus
      });
   };

   const validateField = (name, value) => {
   let error = "";

   if (name === "workstationName" && !value.trim()) {
      error = "Workstation Name is required";
   }

   if (name === "ipAddress" && !value.trim()) {
      error = "IP Address is required";
   }

   if (name === "facility" && !value) {
      error = "Facility is required";
   }

   if (name === "linenameNumber" && !value) {
      error = "Line Name/Number is required";
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

   const handleSubmit = async() => {
      
      if(!validateForm()){
         return;
      }

      const loggedInUserId = localStorage.getItem("userId");

         const payload = {
            ...formData,
            createdBy: loggedInUserId,
            updatedBy: loggedInUserId
         };

      try{
         const response = await apiFetch(`/workstation`,
            {
               method:"POST",
               body: JSON.stringify(payload)
            }
         );
         const data = await response.json();
         
         if(!response.ok){
            toast.error(data.message);
            return;
         }
         toast.success("WorkStation Created Successfully");
      } catch(error){
         console.log(error);
         toast.error("Error Creating WorkStation");
      }
   };

   const validateForm = ()=>{
      let newErrors = {};

      //Workstation
      if(!formData.workstationName.trim()){
         newErrors.workstationName = "Workstation Name is required"
      }

      //IP Address
      if(!formData.ipAddress.trim()){
         newErrors.ipAddress = "IP Address is required"
      }

      //Facility
      if(!formData.facility){
         newErrors.facility = "Facility is required"
      }

      //LineName/ Number
      if(!formData.linenameNumber){
         newErrors.linenameNumber = "LineName/Number is required"
      }

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

                        <img src={Back} alt="Back Button" />

                     </Button>

                     <div>

                        <p className="text-[12px] text-[var(--neutral-500)]">
                           Manage Workstation /
                        </p>

                        <h2 className="text-[30px] font-bold text-[var(--primary-900)]">
                           New WorkStation
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
                        text="Create"
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

export default NewWorkStation;