import Input from "./components/Input";
import { useState, useEffect } from "react";
import { useNavigate, useParams} from "react-router-dom";
import Toggle from "./components/Toggle";
import Button from "./components/Button";
import Back from './assets/icons/Back.svg';
import { apiService } from "./services/apiServices";


function ViewUser() {
  const navigate = useNavigate();
  const {userId} = useParams();
  const [isApi, setIsApi] = useState(false);
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

  } catch (error) {

    console.log(error);
    setIsApi(true);

  }
};

if(isApi){
  return(
    <p>try again</p>
  )
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

            <div className="flex items-center justify-between">
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
                  {`${formData.firstName} ${formData.lastName}`.trim()}
                </h2>
                </div>
                
              </div>

                <Button
                        type="button"
                        text="Edit"
                        onClick={() =>
                            navigate(`/edit-user/${userId}`)
                        }
                        className="
                            w-[120px]
                            bg-[var(--primary-900)]
                            text-white
                        "
                    />
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
                  value={formData.userId}
                  readOnly = {true}
                />

              </div>


              {/* GROUP NAME */}
              <div className="mb-3">

                <Input
                  id="groupName"
                  label="Group Name"
                  value={formData.groupName} 
                  readOnly={true}
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
                    value={formData.firstName}
                    readOnly={true}
                  />

                </div>


                {/* LAST NAME */}
                <div>

                  <Input
                    id="lastName"
                    label="Last Name"
                    type="text"
                    readOnly={true}
                    value={formData.lastName} 
                  />

                </div>


                {/* DOB */}
                <div>

                  <Input
                    type="date"
                    id="date of birth"
                    label="Date of Birth"
                    value={formData.dob}
                    readOnly={true}
                  />

                </div>


                {/* GENDER */}
                <div>

                  <Input
                    id="gender"
                    label="Gender"
                    value={formData.gender} 
                    readOnly={true} 
                  />
                </div>


                {/* PHONE */}
                <div>

                  <Input
                    id ="phone"
                    label="Phone"
                    type="text"
                    readOnly={true}
                    value={formData.phone} 
                  />

                </div>


                {/* MAIL */}
                <div>

                  <Input
                    id="email"
                    label="Mail"
                    type="email"
                    readOnly={true} 
                    value={formData.email}
                   
                  />

                </div>


                {/* ADDRESS */}
                <div>

                  <Input
                    id ="address"
                    label="Address"
                    type="text"
                    readOnly={true}
                    value={formData.address}
                  />

                </div>


                {/* STATUS */}
                <div>

                  <p className="mb-[6px] text-[13px] font-semibold text-[var(--primary-900)]">
                    Status
                  </p>

                  <div className="flex h-[42px] items-center gap-3">

                    <Toggle
                      isOn={formData.isActive}
                      disabled={true} 
                    />

                  </div>

                </div>

              </div> 

            </div>

          </div>


        </div>
  );
}

export default ViewUser;