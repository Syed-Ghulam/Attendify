import Input from "./components/Input";
import SearchableSelect from "./components/SearchableSelect";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {toast} from "react-toastify";
import Select from "./components/Select";
import Toggle from "./components/Toggle";
import ImgUploader from "./components/ImgUploader";
import Button from "./components/Button";
import Icon from "./components/Icon";
import { apiService } from "./services/apiServices";
import {
  validateRequired,
  validateSelect,
  validateName,
  validateOptionalName,
  validateEmail,
  validatePhone,
  validateDob
} from "./utils/validation";

function NewUser() {

  const navigate = useNavigate();
  const {userId} = useParams();
  const isEdit = !!userId;
  const [image, setImage] = useState(null);
  const [isApi, setIsApi] = useState(false);
  const [isOn, setIsOn] = useState(false);
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

    if(name === "userId")
      error = validateRequired(value, "User ID");

    if(name === "groupName")
      error = validateSelect(value, "Group Name");
    
    if(name === "firstName")
      error = validateName(value, "First Name");
      
    if(name === "lastName")
      error = validateOptionalName(value,"Last Name");
     
    if(name === "email")
      error = validateEmail(value);
    
    if(name === "phone")
      error = validatePhone(value);
   
    if(name === "dob")
      error = validateDob(value);
      
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


 const handleSubmit = async () => {

  if (!validateForm()) {
    return;
  }

  const payload = {
    ...formData,
    dob: formData.dob || null
  };

  try {

    if (isEdit) {

      await apiService.updateUser(
        userId,
        payload
      );

      toast.success("User Updated Successfully");

    } else {

      await apiService.createUser(
        payload
      );

      toast.success("User Created Successfully");

    }

    navigate("/users");

  } catch (error) {

    console.log(error);
    toast.error(error.message);

  }

};

 const validateForm = () => {

  let newErrors = {};

  const userIdError = validateRequired(formData.userId,"User ID");
  if (userIdError) 
    newErrors.userId = userIdError;
  

  const groupError = validateSelect(formData.groupName,"Group Name");
  if (groupError) 
    newErrors.groupName = groupError;
  

  const firstNameError = validateName(formData.firstName,"First Name");
  if (firstNameError) 
    newErrors.firstName = firstNameError;
  

  const lastNameError = validateOptionalName(formData.lastName,"Last Name");
  if (lastNameError) 
    newErrors.lastName = lastNameError;

  const emailError = validateEmail(formData.email);
  if (emailError) 
    newErrors.email = emailError;

  const phoneError = validatePhone(formData.phone);
  if (phoneError)
    newErrors.phone = phoneError;

  const genderError = validateSelect(formData.gender,"Gender");
  if (genderError) 
    newErrors.gender = genderError;

  const dobError = validateDob(formData.dob);
  if (dobError) 
    newErrors.dob = dobError;
  

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};

const loadUser = async () => {
  try {

    const data = await apiService.getUserById(
      userId
    );

    setFormData({
      userId: data.userId || "",
      groupName: data.groupName || "",
      firstName: data.firstName || "",
      lastName: data.lastName || "",
      dob: data.dob
        ? data.dob.split("T")[0]
        : "",
      gender: data.gender || "Male",
      phone: data.phone || "",
      email: data.email || "",
      address: data.address || "",
      isActive: data.isActive ?? false,
      image: data.image || ""
    });

    setIsOn(data.isActive);

  } catch (error) {

    console.log(error);
    setIsApi(true);

  }
};

useEffect(() => {

    if (isEdit) {
        loadUser();
    }

}, [isEdit]);

if (isApi) {
    return <p>Try again</p>;
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
              py-3
            "
          >

            <div className="flex items-center gap-3">

              <Button
                type="button"
                onClick={()=>navigate("/users")}
                className="
                  mt-[18px]
                  flex
                  h-6
                  w-6 
                  items-center
                  justify-center
                  rounded-full
                  cursor-pointer" 
              >
                <Icon name="Back" alt="Back Button"/>
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
                  {isEdit ? "Edit User" : "New User"}
                </h2>

              </div>

            </div>

          </div>


          {/* SCROLLABLE CONTENT */}
          <div className="flex flex-1 flex-col overflow-auto">

            <div className="w-full px-6 md:px-8 lg:px-10 py-6">

              {/* USER ID */}
              <div className="mb-5 w-full max-w-[520px]">

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
              <div className="mb-8 w-full max-w-[520px]">

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
                  md:grid-cols-2
                  gap-x-8
                  gap-y-6
                  w-full
                  xl:max-w-[1100px]
                "
              >

                {/* FIRST NAME */}
                <div className="w-full">

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
                <div className="w-full">

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
                <div className="w-full">

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
                <div className="w-full">

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
                    labelClassName="mt-[15px]
                      block
                      text-[13px]
                      font-semibold
                      text-[var(--primary-900)]
                    "
                    className="mt-3
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
                <div className="w-full">

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
                <div className="w-full">

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
                <div className="w-full">

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
                <div className="mt-5 w-full">

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
              <div className="mt-5 w-[250px]">

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
              px-4 sm:px-6
              py-4
            "
          >

            <div className="flex flex-wrap gap-4">

              <Button
                type="submmit"
                text={isEdit ? "Save" : "Create"}
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