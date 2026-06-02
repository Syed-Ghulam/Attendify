import Input from "./components/Input";
import MultiSelect from "./components/MultiSelect";
import { useState, useEffect } from "react";
import { useNavigate, useParams} from "react-router-dom";
import Select from "./components/Select";
import Toggle from "./components/Toggle";
import ImgUploader from "./components/ImgUploader";
import Button from "./components/Button";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Back from './assets/icons/Back.svg';
import { API_URL } from "./config/api";
import {toast} from "react-toastify";

function EditUser() {

  const navigate = useNavigate();
  const {userId} = useParams();
  const [grpName, setGrpName] = useState([]);
  const [date, setDate] = useState("");
  const [gender, setGender] = useState("");
  const [isOn, setIsOn] = useState(false);
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
  userId: "",
  groupName: [],
  firstName: "",
  lastName: "",
  dob: "",
  gender: "Male",
  phone: "",
  email: "",
  address: "",
  status: "Inactive",
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

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleGrpChange = (values) => {
    setGrpName(values);
  };

  const handleToggle = () => {
    const newStatus = !isOn;

    setIsOn(newStatus);

    setFormData({
    ...formData,
    status: newStatus ? "Active" : "Inactive"
  });
  };

  const handleImageChange = (e) => {

    const file = e.target.files[0];

    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const validateField = (name, value) => {
  let error = "";

  if (name === "userId" && !value.trim()) {
    error = "User ID is required";
  }

  if (name === "firstName" && !value.trim()) {
    error = "First Name is required";
  }

  if (
    name === "email" &&
    value &&
    (!value.includes("@") || !value.includes("."))
  ) {
    error = "Enter valid email";
  }

  if (name === "phone") {
    if (!value.trim()) {
      error = "Phone number is required";
    } else if (!/^\d{10}$/.test(value)) {
      error = "Phone number must be 10 digits";
    }
  }

  if (name === "groupName" && value.length === 0) {
    error = "Group Name is required";
  }

  if (name === "gender" && !value) {
    error = "Gender is required";
  }

  return error;
};

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
      ...formData, groupName:formData.groupName.join(", ")
    };

    console.log(payload)
    try{
      const response = await fetch(
      `${API_URL}/users/${userId}`,
        {
          method:"PUT",

          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify(payload)
        }
      );
      const data = await response.json();
      console.log(data);
      toast.success("User Updated Successfully");
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

    //Email
    if(!formData.email.includes("@") || !formData.email.includes(".")){
      newErrors.email = "Enter valid email";
    }

    //Phone
    if(!formData.phone.trim()){
      newErrors.phone = "Phone number is required";
    }
    else if(!/^\d{10}$/.test(formData.phone)){
      newErrors.phone = "Phone number must be 10 digits";
    }

    //GroupName
    if(formData.groupName.length===0){
      newErrors.groupName = "Group Name is required";
    }

    //Gender
    if(!formData.gender){
      newErrors.gender = "Gender is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  useEffect(() => {

  fetch(`${API_URL}/users/${userId}`)
    .then((res) => res.json())
    .then((data) => {

      setFormData({
        userId: data.userId || "",
        groupName: data.groupName
          ? data.groupName.split(", ")
          : [],
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        dob: data.dob ? data.dob.split("T")[0] : "",
        gender: data.gender || "Male",
        phone: data.phone || "",
        email: data.email || "",
        address: data.address || "",
        status: data.status || "Inactive",
        image: data.image || ""
      });

      setIsOn(data.status === "Active");

    })
    .catch((err) => console.log(err));

}, [userId]);

  return (

    <div className="min-h-screen bg-[var(--color-background)]">

      {/* HEADER */}
      <Header />

      {/* BODY */}
      <div className="flex ">

        {/* SIDEBAR */}
        <Sidebar />

        {/* CONTENT */}
        <div className="flex flex-1 flex-col">

          {/* PAGE HEADER */}
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
                <img src={Back} alt="Back Button"/>
              </Button>

              <div>

                <p className="text-[12px] text-[var(--color-text-muted)]">
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
                  Edit User
                </h2>

              </div>

            </div>

          </div>


          {/* SCROLLABLE CONTENT */}
          <div className="flex flex-1 flex-col">

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

                <MultiSelect
                  label="Group Name"
                  multiple={true}
                  value={formData.groupName}
                  required={true}
                  onChange={(values) => 
                    updateField("groupName", values)
                  }
                  options={grpoptions}
                  error = {errors.groupName}
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
                  />

                </div>


                {/* DOB */}
                <div>

                  <Input
                    type="date"
                    id="date of birth"
                    label="Date of Birth"
                    value={formData.dob}
                    onChange={(e) => {
                      setFormData({
                        ...formData,dob : e.target.value
                      });
                    }}
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

                  <p className="mb-[6px] text-[13px] font-semibold text-[var(--color-secondary)]">
                    Status
                  </p>

                  <div className="flex h-[42px] items-center gap-3">

                    <Toggle
                      isOn={isOn}
                      onClick={handleToggle}
                    />

                    <p className="text-[14px] text-[var(--color-heading)]">
                      {isOn ? "Active" : "Inactive"}
                    </p>

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
                    text-[var(--color-secondary)]
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
                          border-[var(--color-border)]
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
              border-[var(--color-border-light)]
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
                  bg-[var(--color-primary)]
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
                  border-[var(--color-primary-outline)]
                  bg-white
                  text-[var(--color-primary-outline)]
                "
              />

              

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default EditUser;