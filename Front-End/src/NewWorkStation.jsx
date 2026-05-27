import { useNavigate } from "react-router-dom";
import { useState } from "react";

import Button from "./components/Button";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Input from "./components/Input";
import Select from "./components/Select";

import Back from "./assets/icons/Back.svg";

function NewWorkStation() {

   const navigate = useNavigate();

   const [formData, setFormData] = useState({
      workstationName: "",
      ipAddress: "",
      facility: "BPL Medical Technologies",
      code: "",
      linenameNumber: "Line 1",
      status: "Active"
   });

   const [errors, setErros] = useState({});

   const facilityOptions = [
      "BPL Medical Technologies"
   ];

   const lineOptions = [
      "Electrocardiograph"
   ];

   const handleChange = (e) => {

      setFormData({
         ...formData,
         [e.target.id]: e.target.value
      });
   };

   const handleSubmit = async() => {
      
      if(!validateForm()){
         return;
      }

      try{
         const response = await fetch(
            "http://localhost:5000/workstation",
            {
               method:"POST",
               headers:{
                  "content-Type":"application/json"
               },
               body: JSON.stringify(formData)
            }
         );
         const data = await response.json();
         console.log(data);
         alert("WorkStation Created Successfully");
      } catch(error){
         console.log(error);
         alert("Error Creating WorkStation");
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

      <div className="min-h-screen bg-[#F4F5FB]">

         <Header />

         <div className="flex">

            <Sidebar />

            <div className="flex flex-1 flex-col">

               {/* Header Section */}

               <div className="border-b border-[#E5E7F2] bg-[#F4F5FB] px-6 py-4">

                  <div className="flex items-center gap-3">

                     <Button
                        onClick={() => navigate("/workstation")}
                        className="mt-[18px] flex h-6 w-6 items-center
                        justify-center rounded-full cursor-pointer"
                     >

                        <img src={Back} />

                     </Button>

                     <div>

                        <p className="text-[12px] text-[#8B8BA7]">
                           Manage Workstation /
                        </p>

                        <h2 className="text-[30px] font-bold leading-none text-[#1C1C4D]">
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
                     border border-[#E5E7F2]
                     border-b-0
                     bg-[#F7F8FC]"
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
                              placeHolder="Enter workstation name"
                              labelClassName="mb-[6px] block
                              text-[13px] font-semibold text-[#2D2D5A]"
                              className="h-[42px] w-full rounded-[4px]
                              border border-[#D9DCEA]
                              bg-white px-3 text-[14px]
                              outline-none focus:border-[#5B52A3]"
                           />
                           {
                              errors.workstationName && (
                                 <p className="mt-1 text-sm text-red-500">
                                    {errors.workstationName}
                                 </p>
                              )
                           }

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
                              labelClassName="mb-[6px] block
                              text-[13px] font-semibold text-[#2D2D5A]"
                              className="h-[42px] w-full rounded-[4px]
                              border border-[#D9DCEA]
                              bg-white px-3 text-[14px]
                              outline-none focus:border-[#5B52A3]"
                           />

                            {
                              errors.ipAddress && (
                                 <p className="mt-1 text-sm text-red-500">
                                    {errors.ipAddress}
                                 </p>
                              )
                           }

                        </div>

                        {/* Facility + Code */}

                        <div className="mb-5 flex gap-4">

                           {/* Facility */}

                           <div className="w-[280px]">

                              <Select
                                 label="Facility"
                                 required={true}
                                 value={formData.facility}
                                 onChange={(e) =>
                                    setFormData({
                                       ...formData,
                                       facility: e.target.value
                                    })
                                 }
                                 options={facilityOptions}
                                 className="h-[42px] w-full rounded-[4px]
                                 border border-[#D9DCEA]
                                 bg-white px-3 text-[14px]
                                 outline-none cursor-pointer"
                              />
                                 {
                                 errors.facility && (
                                    <p className="mt-1 text-sm text-red-500">
                                       {errors.facility}
                                    </p>
                                 )
                                }

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
                                 labelClassName="mb-[6px] block
                                 text-[13px] font-semibold text-[#2D2D5A]"
                                 className="h-[42px] w-full rounded-[4px]
                                 border border-[#D9DCEA]
                                 bg-white px-3 text-[14px]
                                 outline-none focus:border-[#5B52A3]"
                              />

                           </div>

                        </div>

                        {/* Line Name */}

                        <div className="mb-5 w-[510px]">

                           <Select
                              label="Line Name / Number"
                              required={true}
                              value={formData.linenameNumber}
                              onChange={(e) =>
                                 setFormData({
                                    ...formData,
                                    linenameNumber: e.target.value
                                 })
                              }
                              options={lineOptions}
                              className="h-[42px] w-full rounded-[4px]
                              border border-[#D9DCEA]
                              bg-white px-3 text-[14px]
                              outline-none cursor-pointer"
                           />

                            {
                              errors.linenameNumber && (
                                 <p className="mt-1 text-sm text-red-500">
                                    {errors.linenameNumber}
                                 </p>
                              )
                           }

                        </div>

                        {/* Status */}

                        <div className="mt-6">

                           <p className="mb-2 text-[13px]
                           font-semibold text-[#2D2D5A]">

                              Status

                           </p>

                           <div className="flex items-center gap-2">

                              <button
                                 type="button"
                                 onClick={() =>
                                    setFormData({
                                       ...formData,
                                       status:
                                          formData.status === "Active"
                                             ? "Inactive"
                                             : "Active"
                                    })
                                 }
                                 className={`relative h-5 w-10 rounded-full transition-all
                                 ${
                                    formData.status === "Active"
                                       ? "bg-green-500"
                                       : "bg-gray-300"
                                 }`}
                              >

                                 <span
                                    className={`absolute top-[2px]
                                    h-4 w-4 rounded-full bg-white transition-all
                                    ${
                                       formData.status === "Active"
                                          ? "left-5"
                                          : "left-1"
                                    }`}
                                 />

                              </button>

                              <span className="text-[14px] text-[#2D2D5A]">

                                 {formData.status}

                              </span>

                           </div>

                        </div>

                     </div>

                  </div>

                  {/* Bottom Button Section */}

                  <div
                     className="flex items-center gap-4
                     border border-[#E5E7F2]
                     bg-white px-6 py-4"
                  >

                     <Button
                        text="Create"
                        onClick ={handleSubmit}
                        className="h-[42px] w-[115px]
                        rounded-[4px] bg-[#3F3F8D]
                        text-white cursor-pointer"
                     />

                     <Button
                        text="Cancel"
                        onClick={() => navigate("/workstation")}
                        className="h-[42px] w-[115px]
                        rounded-[4px]
                        border border-[#3F3F8D]
                        bg-white text-[#3F3F8D]
                        cursor-pointer"
                     />

                  </div>

               </div>

            </div>

         </div>

      </div>
   );
}

export default NewWorkStation;