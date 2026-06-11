import Input from "./components/Input";
import SearchableSelect from "./components/SearchableSelect";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";
import Select from "./components/Select";
import Toggle from "./components/Toggle";
import ImgUploader from "./components/ImgUploader";
import Button from "./components/Button";
import Back from './assets/icons/Back.svg';
import { apiFetch } from "./config/api";

function NewUser() {

  const navigate = useNavigate();
  const [isOn, setIsOn] = useState(false);
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
  userId: "",
  groupName: "",
  firstName: "",
  lastName: "",
  dob: "",
  gender: "Male",
  phone: "",
  email: "",
  address: "",
  isActive: false,
  image: ""  
});
  const [errors, setErrors] = useState({});
  

  const grpoptions = [
    "Operator",
    "Developer",
    "Consultant"
  ];

  const genderOptions = [
    "Male",
    "Female",
    "Other"
  ];

  const handleToggle = () => {
    const newStatus = !isOn;

    setIsOn(newStatus);

    setFormData({
    ...formData,
    isActive: newStatus
  });
  };

  const handleImageChange = (file) => {

    setImage(URL.createObjectURL(file));

    setFormData({
      ...formData,
      image: file.name
    });
  };

  const validateField = (name, value) =>{
    let error = "";

    if(name === "userId" && !value.trim()){
      error = "User ID is required";
    }

    if(name === "groupName" && !value){
      error = "Group Name is required";
    }

    if(name === "firstName"){
      if(!value.trim()){
        error = "First Name is required";
      }
      else if(!/^[A-Za-z\s]+$/.test(value)){
        error = "Enter Valid First Name";
      }
    }

    if(name === "lastName" && value.trim()){
      if(!/^[A-Za-z\s]+$/.test(value)){
        error = "Enter Valid Lastname";
      }
    }

    if(name === "email" && value && (!value.includes("@") || !value.includes("."))){
      error = "Enter valid Email";
    }

    if(name === "phone"){
      if(!value.trim() || !/^[6-9]\d{9}$/.test(value) || /(\d)\1{4,}/.test(value)){
        error = "Enter Valid Phone Number";
    }}

    if(name === "dob" && value){
      const dob = new Date(value);
      const today = new Date();

      const hundredYearsAgo = new Date();
      hundredYearsAgo.setFullYear(today.getFullYear() - 100);
      if(dob > today || dob < hundredYearsAgo){
        error = "Enter valid Date of Birth";
      }
    }

    return error;
  }

  const handleChange = (e)=>{
    const {id, value} = e.target;

    setFormData({
      ...formData,[id]: value
    });

    const error = validateField(id, value);

    setErrors((prev) => ({
      ...prev,[id]: error
    }))
  };

  const handleSubmit = async() => {
     
    if(!validateForm()){
      return;
    }

    const loggedInUserId =localStorage.getItem("userId");

    const payload = {
      ...formData,
      createdBy: loggedInUserId,
      updatedBy: loggedInUserId
    };

    console.log(payload)
    try{
     
      const response = await apiFetch('/users',
        {
          method:"POST",
          body:JSON.stringify(payload)
        }
      );

      const data = await response.json();

      if(!response.ok){
        toast.error(data.message);
        return;
      }
      
      toast.success("User Created Successfully");
    } catch(error){
      console.log(error);
      toast.error("Error creating user");
    }
  };

  const validateForm = ()=>{
    let newErrors = {};
    
    //User ID
    if(!formData.userId.trim()){
      newErrors.userId = "User ID is required";
    }

    //First Name
   if(!formData.firstName.trim()){
      newErrors.firstName = "First Name is required";
    }
    else if(!/^[A-Za-z\s]+$/.test(formData.firstName)){
      newErrors.firstName = "Enter valid First Name";
    }

    //last Name
    if(formData.lastName.trim() &&
      !/^[A-Za-z\s]+$/.test(formData.lastName)
      ){

      newErrors.lastName = "Enter valid Last Name";
    }

    //Email
    if(!formData.email.includes("@") || !formData.email.includes(".")){
      newErrors.email = "Enter valid email";
    }

    //Phone
   if(!formData.phone.trim() ||
        !/^[6-9]\d{9}$/.test(formData.phone) ||
        /(\d)\1{4,}/.test(formData.phone)
      ){
      newErrors.phone = "Enter Valid Phone Number";
   }

    //GroupName
    if(!formData.groupName){
      newErrors.groupName = "Group Name is required";
    }

    //Gender
    if(!formData.gender){
      newErrors.gender = "Gender is required";
    }

    //DOB

    if(formData.dob){
      const dob = new Date(formData.dob);
      const today = new Date();

      const hundredYearsAgo = new Date();
      hundredYearsAgo.setFullYear(today.getFullYear() - 100);

      if(dob > today || dob < hundredYearsAgo){
        newErrors.dob = "Enter valid Date of Birth";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  return (

        <div className="h-full flex flex-1 flex-col bg-[var(--neutral-100)] overflow-hidden">

          {/* PAGE HEADER */}
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
                type="button"
                onClick={()=>navigate("/users")}
                className="
                  mt-[22px]
                  flex
                  h-6
                  w-6 
                  justify-center
                  rounded-full" 
              >
                <img src={Back} alt="Back Button"/>
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
                  New User
                </h2>

              </div>

            </div>

          </div>


          {/* SCROLLABLE CONTENT */}
          <div className="flex flex-1 flex-col overflow-auto">

            <div className="w-full max-w-[1150px] px-6 py-5">

              {/* USER ID */}
              <div className="mb-3">

                <Input
                  id ="userId"
                  label="User ID"
                  type="text"
                  required={true}
                  value={formData.userId}
                  onChange={handleChange}
                  placeHolder="Enter User ID"
                  error={errors.userId}
                />
              </div>


              {/* GROUP NAME */}
              <div className="mb-3">

                <SearchableSelect
                  id="groupName"
                  label="Group Name"
                  value={formData.groupName}
                  required={true}
                  onChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        groupName: value
                      }))
                  }
                  options={grpoptions}
                  error={errors.groupName}
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


              {/* FORM GRID */}
              <div
                className="
                  grid
                  grid-cols-1
                  gap-x-5
                  gap-y-3
                  xl:grid-cols-2
                "
              >

                {/* FIRST NAME */}
                <div>

                  <Input
                    id ="firstName"
                    label="First Name"
                    type="text"
                    placeHolder="Enter first name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required = {true}
                    error = {errors.firstName}
                  />
                </div>


                {/* LAST NAME */}
                <div>

                  <Input
                    id="lastName"
                    label="Last Name"
                    type="text"
                    placeHolder="Enter last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    error={errors.lastName}
                     
                  />

                </div>


                {/* DOB */}
                <div>

                  <Input
                    type = "date"
                    id="dob"
                    label="Date of Birth"
                    value={formData.dob}
                    onChange={handleChange}
                    error={errors.dob}
                  />

                </div>


                {/* GENDER */}
                <div>

                  <Select
                    id="gender"
                    label="Gender"
                    value={formData.gender}
                    required={true}
                    onChange={(e)=>{
                      setFormData({
                        ...formData,gender:e.target.value
                      });
                    }}
                    options={genderOptions}
                    error = {errors.gender}
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

                {/* PHONE */}
                <div>

                  <Input
                    id ="phone"
                    label="Phone"
                    type="text"
                    placeHolder="Enter phone no."
                    value={formData.phone}
                    onChange={handleChange}
                    required={true}
                    error = {errors.phone}
                  />
                </div>


                {/* MAIL */}
                <div>

                  <Input
                    id="email"
                    label="Mail"
                    type="email"
                    placeHolder="Enter mail"
                    value={formData.email}
                    onChange={handleChange}
                    required={true}
                    error ={errors.email}
                  />
                </div>


                {/* ADDRESS */}
                <div>

                  <Input
                    id ="address"
                    label="Address"
                    type="text"
                    placeHolder="Enter Address"
                    value={formData.address}
                    onChange={handleChange}
                  />

                </div>


                {/* STATUS */}
                <div>

                  <p className="mb-[6px] text-[13px] font-semibold text-[var(--primary-900)]">
                    Status
                  </p>

                  <div className="flex h-[42px] items-center gap-3">

                    <Toggle
                      isOn={isOn}
                      onClick={handleToggle}
                    />
                  </div>

                </div>

              </div>


              {/* IMAGE SECTION */}
              <div className="mt-5">

                <ImgUploader
                  label="Image"
                  onChange={handleImageChange}
                  labelClassName="
                    mb-[6px]
                    block
                    text-[14px]
                    font-semibold
                    text-[var(--primary-900)]
                  "
                  className="hidden"
                />

                {
                  image && (

                    <div className="relative mt-3 w-fit">

                      <img
                        src={image}
                        alt="Preview"
                        className="
                          h-[90px]
                          w-[90px]
                          rounded-[6px]
                          border
                          border-[var(--neutral-300)]
                          object-cover
                        "
                      />

                      <button
                        type="button"
                        onClick={() => setImage(null)}
                        className="
                          absolute
                          -right-2
                          -top-2
                          flex
                          h-6
                          w-6
                          items-center
                          justify-center
                          rounded-full
                          bg-black
                          text-sm
                          font-bold
                          text-white
                          cursor-pointer
                        "
                      >
                        ✕
                      </button>

                    </div>
                  )
                }

              </div>

            </div>

          </div>


          {/* FOOTER */}
          <div
            className="
              border-t
              border-[var(--neutral-200)]
              bg-white
              px-6
              py-4
            "
          >

            <div className="flex gap-4">

              <Button
                type="submmit"
                text="Create"
                onClick={handleSubmit}
                className="
                  w-[120px]
                  bg-[var(--primary-900)]
                  text-white
                "
              />

              <Button
                type="button"
                text="Cancel"
                onClick = {()=>navigate("/users")}
                className="
                  w-[120px]
                  border
                  border-[var(--primary-900)]
                  bg-white
                  text-[var(--primary-900)]
                "
              />

            </div>

          </div>

        </div>
  );
}

export default NewUser;