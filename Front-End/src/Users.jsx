import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { API_URL } from "./config/api";
import Tabs from "./components/Tabs";
import SearchInput from './components/SearchInput' 
import Select from "./components/Select";
import Button from "./components/Button";
import  Table  from "./components/Table";
import UnCheck from "./assets/icons/Uncheck.svg"
import More from "./assets/icons/more_vert.svg";
import DummyImg from './assets/icons/DummyImg.svg'
import { toast } from "react-toastify";

function Users(){

   
    const navigate = useNavigate();
    const location = useLocation();
    const [search , setSearch] = useState("");
    const [gender , setGender] = useState("ALL");
    const [role , setRole] = useState("ALL");
    const [status, setStatus] = useState("ALL");
    const [userData, setUserData] = useState([]);
    const [openMenu, setOpenMenu] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(5);
    const [groupData, setGroupData] = useState([]);
  
    const [activeTab, setActiveTab] = useState(
      location.state?.activeTab || "Users"
    );

    const genderOptions = [
   "ALL",
   "Male",
   "Female",
   "Other"
];

const roleOptions = [
   "ALL",
  "System Admin"
];

const statusOptions = [
   "ALL",
   "Active",
   "Inactive"
];

const hasFilters =
  search ||
  gender !== "ALL" ||
  status !== "ALL";

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

const filteredUsers = userData.filter((user) => {

  const fullName =
    `${user.firstName} ${user.lastName}`.toLowerCase();

  const matchesSearch =
    search === "" ||
    user.userId.toLowerCase().includes(search.toLowerCase()) ||
    fullName.includes(search.toLowerCase());

  const matchesGender =
    gender === "ALL" ||
    user.gender === gender;

  const matchesStatus =
    status === "ALL" ||
    (status === "Active" && user.isActive) ||
    (status === "Inactive" && !user.isActive);

  return (
    matchesSearch &&
    matchesGender &&
    matchesStatus
  );
});

const filteredGroups = groupData.filter((group) => {

  const matchesSearch =
    search === "" ||
    group.groupName
      .toLowerCase()
      .includes(search.toLowerCase());

  const matchesStatus =
    status === "ALL" ||
    (status === "Active" && group.isActive) ||
    (status === "Inactive" && !group.isActive);

  return (
    matchesSearch &&
    matchesStatus
  );
});


const getTableData = () => {
  return filteredUsers.map((user) => ({
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
      <span className="text-[var(--link)]">
        {user.firstName} {user.lastName}
      </span>
    ),

    gender: user.gender,
    phoneNo: user.phone,
    email: user.email,
    groupName: user.groupName,
    roleName: "System Admin",
    createdOn: new Date(user.createdAt).toLocaleDateString(),
    status: user.isActive ? "Active": "Inactive",

    action: (
      <div className="relative">
        <Button
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
        </Button>

        {openMenu === user.userId && (
       <div
            className="absolute top-0 right-10 w-[120px]
            bg-white border border-[var(--neutral-200)]
            rounded-[8px] shadow-lg z-50"
          >
            <p
              className="px-4 py-2 cursor-pointer hover:bg-[var(--neutral-100)]"
              onClick={() =>
                navigate(`/view-user/${user.userId}`)
              }
            >
              View
            </p>

            <p
              className="px-4 py-2 cursor-pointer hover:bg-[var(--neutral-100)]"
              onClick={() =>
                navigate(`/edit-user/${user.userId}`)
              }
            >
              Edit
            </p>

            <p
              className="px-4 py-2 cursor-pointer hover:bg-[var(--neutral-100)]"
              onClick={() =>
                handleStatusToggle(user)
              }
            >
              {user.isActive ? "Inactive" : "Active"}
            </p>
          </div>
         )}
      </div>
    )
  }));
};

const getGroupTableData = () => {
   return filteredGroups.map((group) => ({
      checkBox: (
         <button>
            <img src={UnCheck} alt="checkbox" />
         </button>
      ),

      groupName: group.groupName,

      description: group.description,

      createdOn: new Date(group.createdAt).toLocaleDateString(),

      status: group.isActive? "Active":"Inactive",

      action: (
      <div className="relative">
        <Button
          onClick={() =>
            setOpenMenu(
              openMenu === group.Id
                ? null
                : group.id
            )
          }
          className="cursor-pointer"
        >
          <img src={More} alt="More" />
        </Button>

        {openMenu === group.id && (
          <div
            className="absolute top-0 right-10 w-[120px]
            bg-white border border-[var(--neutral-200)] rounded-[8px]
            shadow-lg z-50"
          >

            <p
              className="px-4 py-2 cursor-pointer"
              onClick={() =>
                navigate(`/edit-group/${group.id}`)
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


useEffect(() => {
   fetch(`${API_URL}/users`)
   .then((res) => res.json())
   .then((data) => {
      setUserData(data);
   })
   .catch((err) =>{ 
      console.log(err);
   });
},[]);

useEffect(() => {
   fetch(`${API_URL}/groups`)
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

const handleStatusToggle = async (user) => {
  try {
    const response = await fetch(
      `${API_URL}/users/${user.userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          isActive: !user.isActive
        })
      }
    );

    if (!response.ok) {
      throw new Error("Failed");
    }

    setUserData((prev) =>
      prev.map((item) =>
        item.userId === user.userId
          ? {
              ...item,
              isActive: !item.isActive
            }
          : item
      )
    );

     toast.success(
      user.isActive
        ? "User deactivated successfully"
        : "User activated successfully"
    );

    setOpenMenu(null);

  } catch (error) {
    console.log(error);
  }
};
    return(
        <>
            <div className="flex-1 flex flex-col overflow-auto">

                {/* Heading*/}

                <div className="px-6 pt-6">
                    <h2 className="text-[28px] font-bold text-[var(--primary-900)]">
                        Manage Users
                    </h2>
                </div>
        
            {/* Tabs Section */}
            <div className="mt-3 px-6">
            <Tabs 
               tabs={["Users","Groups"]}
               activeTab = {activeTab}
               setActiveTab = {setActiveTab}
            />
            </div>

             {/* Content */}
                 <div className="px-6 p-4 flex flex-col flex-1 min-h-0 bg-[var(--neural-100)] ">

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
                                    labelClassName="mb-2 block text-[14px] font-medium text-[var(--neutral-500)]"
                                    label="Gender"
                                    value={gender}
                                    onChange={handleGenderOptions}
                                    options={genderOptions}
                                    className="w-[124px] h-[42px] px-4 rounded-[20px]
                                    border border-[var(--neutral-300)] bg-white text-[15px]
                                   text-[var(--neutral-500)] outline-none cursor-pointer"
                                 />

                                 <Select
                                    id="role name"
                                    labelClassName="mb-2 block text-[14px] font-medium text-[var(--neutral-500)]"
                                    label="Role Name"
                                    value={role}
                                    onChange={handleRoleOptions}
                                    options={roleOptions}
                                    className="w-[124px] h-[42px] px-4 rounded-[20px]
                                    border border-[var(--neutral-300)] bg-white text-[15px]
                                    text-[var(--neutral-500)] outline-none cursor-pointer"
                                 />

                                 <Select
                                    id="status"
                                    labelClassName="mb-2 block text-[14px] font-medium text-[var(--neutral-500)]"
                                    label="Status"
                                    value={status}
                                    onChange={handleStatusOptions}
                                    options={statusOptions}
                                    className="w-[124px] h-[42px] px-4 rounded-[20px]
                                    border border-[var(--neutral-300)] bg-white text-[15px]
                                    text-[var(--neutral-500)] outline-none cursor-pointer"
                                 />
                              </>
                           )}

                           {activeTab === "Groups" && (
                              <Select
                                 id="status"
                                 labelClassName="mb-2 block text-[14px] font-medium text-[var(--neutral-500)]"
                                 label="Status"
                                 value={status}
                                 onChange={handleStatusOptions}
                                 options={statusOptions}
                                 className="w-[124px] h-[42px] px-4 rounded-[20px]
                                 border border-[var(--neutral-300)] bg-white text-[15px]
                                 text-[var(--neutral-500)] outline-none cursor-pointer"
                              />
                           )}

                           {hasFilters && (
                              <Button
                                 type="button"
                                 text="Clear"
                                 onClick={() => {
                                    setSearch("");
                                    setGender("ALL");
                                    setStatus("ALL");
                                 }}
                                 className="
                                    px-7
                                    border border-[var(--primary-700)]
                                    text-[var(--primary-700)]
                                    bg-[var(--primary-100)]
                                    text-[15px]
                                    font-medium
                                 "
                              />
                              )}

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
                              className=" px-6 bg-[var(--primary-900)]
                              text-white rounded-[8px]"
                           />
                        </div>
                    </div>
                       
                      <div className="mt-5 flex-1 overflow-auto">
                        {
                            activeTab === "Users" && (
                                <Table 
                                
                                columns = {columns}
                                data = {getTableData()}
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
        
        </>
    )
}

export default Users;