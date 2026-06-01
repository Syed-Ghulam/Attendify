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

   
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("Users");
    const [search , setSearch] = useState("");
    const [gender , setGender] = useState("ALL");
    const [role , setRole] = useState("ALL");
    const [status, setStatus] = useState("Active");
    const [userData, setUserData] = useState([]);
    const [openMenu, setOpenMenu] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(5);
    const [groupData, setGroupData] = useState([]);

    const totalRecords = userData.length;
    const totalPages = Math.ceil(totalRecords / recordsPerPage);

    const startIndex = (currentPage -1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;

    const currentRecords = userData.slice(startIndex, endIndex);

   

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
    label:<button><img src={UnCheck} alt="checkbox"/></button>,
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
      label:<button><img src={UnCheck} alt="checkbox"/></button>,
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



const getTableData = () => {
  return currentRecords.map((user) => ({
    checkBox: (
      <button>
        <img src={UnCheck} alt="checkbox" />
      </button>
    ),

    profileImage: (
      <img src={DummyImg} alt="Profile" />
    ),

    userId: user.userId,

    userName: (
      <span className="text-[var(--color-link)]">
        {user.firstName} {user.lastName}
      </span>
    ),

    gender: user.gender,
    phoneNo: user.phone,
    email: user.email,
    groupName: user.groupName,
    roleName: "System Admin",
    createdOn: new Date(user.createdAt).toLocaleDateString(),
    status: user.status,

    action: (
      <div className="relative">
        <button
          onClick={() =>
            setOpenMenu(
              openMenu === user.userId
                ? null
                : user.userId
            )
          }
          className="cursor-pointer"
        >
          <img src={More} alt="More" />
        </button>

        {openMenu === user.userId && (
          <div
            className="absolute top-0 right-10 w-[120px]
            bg-white border border-[var(--color-border-light)] rounded-[8px]
            shadow-lg z-50"
          >

            <p
              className="px-4 py-2 cursor-pointer"
              onClick={() =>
                navigate(`/edit-user/${user.userId}`)
              }
            >
              Edit
            </p>
          </div>
        )}
      </div>
    )
  }));
};

const getGroupTableData = () => {
   return groupData.map((group) => ({
      checkBox: (
         <button>
            <img src={UnCheck} alt="checkbox" />
         </button>
      ),

      groupName: group.groupName,

      description: group.description,

      createdOn: new Date(group.createdAt).toLocaleDateString(),

      status: group.status,

      action: (
         <button>
            <img src={More} alt="more options" />
         </button>
      )
   }));
};


useEffect(() => {
   fetch("http://localhost:5000/users")
   .then((res) => res.json())
   .then((data) => {
      setUserData(data);
   })
   .catch((err) =>{ 
      console.log(err);
   });
},[]);

useEffect(() => {
   fetch("http://localhost:5000/groups")
   .then((res) => res.json())
   .then((data) => {
      
      setGroupData(data);
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
};
console.log("groupData", groupData);
    return(
        <>
        <div className="min-h-screen bg-[var(--color-background)]">

            <Header />

            <div className="flex">

            <Sidebar />

            <div className="flex-1 bg-[var(--color-background)]">

                {/* Heading*/}

                <div className="px-6 pt-6">
                    <h2 className="text-[28px] font-bold text-[var(--color-secondary)]">
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
                           id ="search"
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
                                    id="gender"
                                    labelClassName="mb-2 block text-[14px] font-medium text-[var(--color-text-muted)]"
                                    label="Gender"
                                    value={gender}
                                    onChange={handleGenderOptions}
                                    options={genderOptions}
                                    className="w-[124px] h-[42px] px-4 rounded-[20px]
                                    border border-[var(--color-border)] bg-white text-[15px]
                                   text-[var(--color-text-muted)] outline-none cursor-pointer"
                                 />

                                 <Select
                                    id="role name"
                                    labelClassName="mb-2 block text-[14px] font-medium text-[var(--color-text-muted)]"
                                    label="Role Name"
                                    value={role}
                                    onChange={handleRoleOptions}
                                    options={roleOptions}
                                    className="w-[124px] h-[42px] px-4 rounded-[20px]
                                    border border-[var(--color-border)] bg-white text-[15px]
                                    text-[var(--color-text-muted)] outline-none cursor-pointer"
                                 />

                                 <Select
                                    id="status"
                                    labelClassName="mb-2 block text-[14px] font-medium text-[var(--color-text-muted)]"
                                    label="Status"
                                    value={status}
                                    onChange={handleStatusOptions}
                                    options={statusOptions}
                                    className="w-[124px] h-[42px] px-4 rounded-[20px]
                                    border border-[var(--color-border)] bg-white text-[15px]
                                    text-[var(--color-text-muted)] outline-none cursor-pointer"
                                 />
                              </>
                           )}

                           {activeTab === "Groups" && (
                              <Select
                                 id="status"
                                 labelClassName="mb-2 block text-[14px] font-medium text-[var(--color-text-muted)]"
                                 label="Status"
                                 value={status}
                                 onChange={handleStatusOptions}
                                 options={statusOptions}
                                 className="w-[124px] h-[42px] px-4 rounded-[20px]
                                 border border-[var(--color-border)] bg-white text-[15px]
                                 text-[var(--color-text-muted)] outline-none cursor-pointer"
                              />
                           )}

                           <Button
                              type="reset"
                              text="Clear"
                              className="h-[42px] px-7 rounded-[4px]
                              border border-[var(--color-primary)]
                              text-[var(--color-primary)]
                              bg-[var(--color-primary-light)]
                              text-[15px]
                              font-medium
                              cursor-pointer"
                           />

                           <Button
                              type="button"
                              text="Create New"
                              onClick={() =>
                                 navigate(
                                    activeTab === "Users"
                                       ? "/new-user"
                                       : "/new-group"
                                 )
                              }
                              className="h-[42px] px-6 bg-[var(--color-primary)]
                              text-white rounded-[8px] cursor-pointer"
                           />

                        </div>
                    </div>
                       
                      <div className="mt-5 overflow-visible">
                        {
                            activeTab === "Users" && (
                                <Table 
                                
                                columns = {columns}
                                data = {getTableData()}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                totalPages={totalPages}
                                recordsPerPage={recordsPerPage}
                                setRecordsPerPage={setRecordsPerPage}
                                totalRecords={totalRecords}
                                />
                            
                            )
                        }

                        {
                            activeTab === "Groups" && (
                                <Table 
                                 
                                columns={grpColumns}
                                data={getGroupTableData()}  
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