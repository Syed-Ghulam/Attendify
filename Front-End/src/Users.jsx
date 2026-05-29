import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Tabs from "./components/Tabs";
import SearchInput from './components/SearchInput' 
import Header from './components/Header'
import Sidebar from "./components/Sidebar";
import Select from "./components/Select";
import Button from "./components/Button";
import  Table  from "./components/Table";
import UnCheck from "./assets/icons/Uncheck.svg"
import More from "./assets/icons/more_vert.svg";
import DummyImg from './assets/icons/DummyImg.svg'

function Users(){

    const [activeTab, setActiveTab] = useState("Users");
    const [search , setSearch] = useState("");
    const [gender , setGender] = useState("ALL");
    const [role , setRole] = useState("ALL");
    const [status, setStatus] = useState("Active");
    const [userData, setUserData] = useState([]);
    const [openMenu, setOpenMenu] = useState(null);
    const navigate = useNavigate();

    const genderOptions = [
   "ALL",
   "Male",
   "Female",
   "Other"
];

const roleOptions = [
   "ALL",
   "Operator",
   "Developer",
   "Consultant"
];

const statusOptions = [
   "ALL",
   "Active",
   "Inactive"
];

const columns = [
 {
    label:<button><img src={UnCheck}/></button>,
    key:"checkBox"
 },

 {
    label:"Profile Image",
    key:"profileImage"
 },

 {
    label:"UserID",
    key:"userId"
 },

 {
    label:"User Name",
    key:"userName"
 },

 {
    label:"Gender",
    key:"gender"
 },

 {
    label:"Phone No.",
    key:"phoneNo"
 },

 {
    label:"Email",
    key:"email"
 },

 {
    label:"Group Name",
    key:"groupName"
 },
 
 {
    label:"Role Name",
    key:"roleName"
 },

 {
    label:"Created On",
    key:"createdOn"
 },

 {
    label:"Status",
    key:"status"
 },

 {
    label:"Action",
    key:"action"
 }
];

const grpColumns = [
   {
      label:<button><img src={UnCheck}/></button>,
      key:"checkBox"
   },

   {
      label:"Group Name",
      key:"groupName",
   },

    {
      label:"Description",
      key:"description",
   },

    {
      label:"Created on",
      key:"createdOn",
   },

    {
      label:"Status",
      key:"status",
   },

   {
      label:"Action",
      key:"action"
   }
];

const grpData = [
   {
      checkBox: <button><img src={UnCheck} /></button>,
      groupName: "Approver",
      description: "Inspection of products and packing",
      createdOn: "05/12/2024",
      status: "Active",
      action: <button><img src={More} /></button>
   },
   {
      checkBox: <button><img src={UnCheck} /></button>,
      groupName: "Operator",
      description: "Assembly / Testing of Products",
      createdOn: "03/12/2024",
      status: "Active",
      action: <button><img src={More} /></button>
   }
];
useEffect(() => {
   fetch("http://localhost:5000/users")
   .then((res) => res.json())
   .then((data) => {
      const formattedData = data.map((user) => ({
         checkBox: <button type="checkBox"><img src={UnCheck} /></button>,
         profileImage:<img src={DummyImg} />,
         userId: user.userId,
         userName:(
            <span className="text-[#0F5DE8]">
                {user.firstName} {user.lastName}
            </span>
         ),
         gender: user.gender,
         phoneNo: user.phone,
         email:user.email,
         groupName:user.groupName,
         roleName:"System Admin",
         createdOn: new Date(user.createdAt).toLocaleDateString(),
         status:user.status,
         action: (
               <div className="relative">
                  <button
                     className="cursor-pointer"
                     onClick={() =>{
                        console.log(openMenu)
                        setOpenMenu(openMenu === user.userId ? null : user.userId)
                     }}
                  >
                     <img src={More} />
                  </button>

                  {
                     openMenu === user.userId && (
                        <div
                           className="absolute right-0 mt-2 w-[120px] bg-white border border-[#E5E7F2]
                           rounded-[8px] shadow-lg z-50"
                        >
                           <p className="px-4 py-2 hover:bg-[#F4F5FB] cursor-pointer"
                              
                           >
                              View
                           </p>

                           <p className="px-4 py-2 hover:bg-[#F4F5FB] cursor-pointer"
                              
                           >
                              Edit
                           </p>

                        </div>
                     )
                  }
               </div>
            ),

      }));
      setUserData(formattedData);
   })
   .catch((err) =>{ 
      console.log(err);
   });
},[]);


const handleGenderOptions = (e) =>{
    setGender(e.target.value)
}

const handleRoleOptions = (e) =>{
    setRole(e.target.value)
}

const handleStatusOptions = (e) =>{
    setStatus(e.target.value)
}
    return(
        <>
        <div className="min-h-screen bg-[#F4F5FB]">

            <Header />

            <div className="flex">

            <Sidebar />

            <div className="flex-1 bg-[#F4F5FB]">

                {/* Heading*/}

                <div className="px-6 pt-6">
                    <h2 className="text-[28px] font-bold text-[#272757]">
                        Manage Users
                    </h2>
                </div>
        
            {/* Tabs Section */}
            <div className="mt-6 px-6">
            <Tabs 
               tabs={["Users","Groups"]}
               activeTab = {activeTab}
               setActiveTab = {setActiveTab}
            />
            </div>

             {/* Content */}
                 <div className="px-6 p-5">

                    <div className="mt-1 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 ">
                      <div className="w-full lg:w-[260px]">
                        <SearchInput
                            placeHolder="Search"
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                        />
                       </div>

                       <div className="flex flex-wrap items-end gap-4">

                           {activeTab === "Users" && (
                              <>
                                 <Select
                                    labelClassName="mb-2 block text-[14px] font-medium text-[#6E7191]"
                                    label="Gender"
                                    value={gender}
                                    onChange={handleGenderOptions}
                                    options={genderOptions}
                                    className="w-[124px] h-[42px] px-4 rounded-[20px]
                                    border border-[#D9DBE9] bg-white text-[15px]
                                    text-[#6E7191] outline-none cursor-pointer"
                                 />

                                 <Select
                                    labelClassName="mb-2 block text-[14px] font-medium text-[#6E7191]"
                                    label="Role Name"
                                    value={role}
                                    onChange={handleRoleOptions}
                                    options={roleOptions}
                                    className="w-[124px] h-[42px] px-4 rounded-[20px]
                                    border border-[#D9DBE9] bg-white text-[15px]
                                    text-[#6E7191] outline-none cursor-pointer"
                                 />

                                 <Select
                                    labelClassName="mb-2 block text-[14px] font-medium text-[#6E7191]"
                                    label="Status"
                                    value={status}
                                    onChange={handleStatusOptions}
                                    options={statusOptions}
                                    className="w-[124px] h-[42px] px-4 rounded-[20px]
                                    border border-[#D9DBE9] bg-white text-[15px]
                                    text-[#6E7191] outline-none cursor-pointer"
                                 />
                              </>
                           )}

                           {activeTab === "Groups" && (
                              <Select
                                 labelClassName="mb-2 block text-[14px] font-medium text-[#6E7191]"
                                 label="Status"
                                 value={status}
                                 onChange={handleStatusOptions}
                                 options={statusOptions}
                                 className="w-[124px] h-[42px] px-4 rounded-[20px]
                                 border border-[#D9DBE9] bg-white text-[15px]
                                 text-[#6E7191] outline-none cursor-pointer"
                              />
                           )}

                           <Button
                              text="Clear"
                              className="h-[42px] px-7 rounded-[4px]
                              border border-[#3F3D8F]
                              text-[#3F3D8F]
                              bg-[#D5D5EC]
                              text-[15px]
                              font-medium
                              cursor-pointer"
                           />

                           <Button
                              text="Create New"
                              onClick={() =>
                                 navigate(
                                    activeTab === "Users"
                                       ? "/new-user"
                                       : "/new-group"
                                 )
                              }
                              className="h-[42px] px-6 bg-[#3F3F8D]
                              text-white rounded-[8px] cursor-pointer"
                           />

                        </div>
                    </div>

                      <div className="mt-5 overflow-visible">
                        {
                            activeTab === "Users" && (
                                <Table 
                                
                                columns = {columns}
                                data = {userData}
                                />
                            
                            )
                        }

                        {
                            activeTab === "Groups" && (
                                <Table 
                                 
                                columns={grpColumns}
                                data={grpData}  
                                />
                            )
                        }
                    </div>
                </div>
        </div>

        <div>

        
        </div>
        </div>
        </div>
        </>
    )
}
export default Users;