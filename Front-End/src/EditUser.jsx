import Input from "./components/Input";
import SearchableSelect from "./components/SearchableSelect";
import { useState, useEffect } from "react";
import { useNavigate, useParams} from "react-router-dom";
import Select from "./components/Select";
import Toggle from "./components/Toggle";
import ImgUploader from "./components/ImgUploader";
import Button from "./components/Button";
import Icon from "./components/Icon";
import { apiService } from "./services/apiServices";
import {toast} from "react-toastify";
import {
  validateRequired,
  validateSelect,
  validateName,
  validateOptionalName,
  validateEmail,
  validatePhone,
  validateDob
} from "./utils/validation";

function EditUser() {

  const navigate = useNavigate();
  const {userId} = useParams();
  const [isOn, setIsOn] = useState(false);
  const [isApi, setIsApi] = useState(false);
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

  const handleImageChange = (e) => {

    const file = e.target.files[0];

    if (file) {
      setImage(URL.createObjectURL(file));
    }
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



  const updateField = (field, value) =>{
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));

    setErrors((prev) => ({
      ...prev,
      [field] : validateField(field, value)
    }));
  };

  const handleChange = (e)=>{
      updateField(e.target.id, e.target.value);
  };

  const handleSubmit = async() => {
    if(!validateForm()){
      return;
    }
    
    const payload = {
      ...formData,
      
    };

    try{
      await apiService.updateUser(
        userId,
        payload
      );
      
      toast.success("User Updated Successfully");
    } catch(error){
      console.log(error);
      toast.error("Error updating user");
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


  useEffect(() => {
  loadUser();
}, [userId]);

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
 

    if(isApi){
    return (
      <p>
        try again
      </p>
    )}
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
                  cursor-pointer
                  rounded-full" 
              >
                <Icon name="Back" alt="Back Button"/>
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
                  Edit User
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
                      updateField("groupName", value)
                  }
                  options={grpoptions}
                  error = {errors.groupName}
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
                    type="date"
                    id="dob"
                    label="Date of Birth"
                    value={formData.dob}
                    onChange={(e) => 
                      updateField("dob", e.target.value)
                    }
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
                    onChange={(e)=>
                      updateField("gender", e.target.value) 
                    }
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
                    error ={errors.phone}
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
                    error = {errors.email}
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

                    {/* <p className="text-[14px] text-[var(--primary-900)]">
                      {isOn ? "Active" : "Inactive"}
                    </p> */}

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
                type="submit"
                text="Save"
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

export default EditUser;