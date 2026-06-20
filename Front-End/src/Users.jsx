import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Tabs from "./components/Tabs";
import SearchInput from './components/SearchInput' 
import Select from "./components/Select";
import Button from "./components/Button";
import ConfirmationModal from "./components/ConfirmationModal";
import  Table  from "./components/Table";
import Icon from "./components/Icon";
import { toast } from "react-toastify";
import { apiService } from "./services/apiServices";
import { API_URL } from "./config/api";


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
    const [confirmModel, setConfirmModel] = useState({
      isOpen: false,
      title: "",
      message: "",
      onConfirm: null
    });
  
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
    label:<button><Icon name="UnCheck" alt="checkbox"/></button>,
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
      label:<button><Icon name="UnCheck" alt="checkbox"/></button>,
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
        <Icon name="UnCheck" alt="checkbox" />
      </button>
    ),

    profileImage: user.image ? (
      <img
        src={`${API_URL}/${user.image}`}
        alt="Profile"
        className="h-10 w-10 rounded-full object-cover"
      />) : (
      <Icon name="DummyImg" alt="Profile" />
    ),

    userId: user.userId,

    userName: (
      <button
        type="button"
        onClick={() =>
          navigate(`/view-user/${user.userId}`)
        }
        className="
          text-[var(--link)]
          cursor-pointer
          
        "
      >
        {user.firstName} {user.lastName}
      </button>
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
          <Icon name="More" alt="More" />
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
            className="px-4 py-2 cursor-pointer hover:bg-[var(--neutral-100)] text-red-600"
            onClick={() => {
              setConfirmModel({
                isOpen: true,
                title: "Delete User",
                message: "Are you sure you want to delete this user?",
                onConfirm: () => deleteUser(user)
              });
            }}
          >
            Delete
          </p>

            <p
              className="px-4 py-2 cursor-pointer hover:bg-[var(--neutral-100)]"
               onClick={() => {
                  setConfirmModel({
                    isOpen: true,
                    title: user.isActive
                      ? "Deactivate User"
                      : "Activate User",
                    message: user.isActive
                      ? "Are you sure you want to make this user inactive?"
                      : "Are you sure you want to make this user active?",
                    onConfirm: () => updateUserStatus(user)
                  });
                }}
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

  
  console.log("openMenu =", openMenu);
  return filteredGroups.map((group) => ({
    
    checkBox: (
      <button>
        <Icon name="UnCheck" alt="checkbox" />
      </button>
    ),

    groupName: group.groupName,
    description: group.description,
    createdOn: new Date(group.createdAt).toLocaleDateString(),
    status: group.isActive ? "Active" : "Inactive",

    action: (
      <div className="relative inline-block">
        <Button
          onClick={(e) => {
            e.stopPropagation();
            const menuId = `group-${group.id}`;
             console.log("Clicked", group.id);
             console.log("Menu ID:", menuId);
            setOpenMenu(
              openMenu === `group-${group.id}` 
                ? null 
                : `group-${group.id}`
            );
          }}
          className="cursor-pointer p-2 hover:bg-gray-100 rounded"
        >
          <Icon name="More" alt="More" />
        </Button>

        {openMenu === `group-${group.id}` && (
          <div
            className="
                absolute
                top-0
                right-10
                w-[120px]
                bg-white
                border
                border-[var(--neutral-200)]
                rounded-[8px]
                shadow-lg
                z-50
              "
            onClick={(e) => e.stopPropagation()}
          >
            <p
              className="px-4 py-2 hover:bg-[var(--neutral-100)] cursor-pointer"
              onClick={() => {
                console.log(group);
                navigate(`/edit-group/${group.id}`);
                setOpenMenu(null);
              }}
            >
              Edit
            </p>

            <p
              className="px-4 py-2 hover:bg-[var(--neutral-100)] cursor-pointer text-red-600"
              onClick={() => {
                setConfirmModel({
                  isOpen: true,
                  title: "Delete Group",
                  message: "Are you sure you want to delete this group?",
                  onConfirm: () => deleteGroup(group)
                });
              }}
            >
              Delete
            </p>
            <p
              className="px-4 py-2.5 hover:bg-[var(--neutral-100)] cursor-pointer"
              onClick={() => {
                    setConfirmModel({
                      isOpen: true,
                      title: group.isActive
                        ? "Deactivate Group"
                        : "Activate Group",
                      message: group.isActive
                        ? "Are you sure you want to make this group inactive?"
                        : "Are you sure you want to make this group active?",
                      onConfirm: () => handleGroupStatusToggle(group)
                    });
                  }}
            >
              {group.isActive ? "Inactive" : "Active"}
            </p>
          </div>
        )}
      </div>
    ),
  }));
};

useEffect(() => {
  loadUsers();
},[]);
  const loadUsers = async() => {
    try{
      const data = await apiService.getUsers();
      setUserData(data);
    } catch (error){
      console.log(error);
    }
  };

useEffect(() => {
  loadGroups();
}, []);

const loadGroups = async () => {
  try {

    const data =
      await apiService.getGroups();

    setGroupData(data);

  } catch (error) {

    console.log(error);

  }
};


const handleGenderOptions = (e) =>{
    setGender(e.target.value)
}

const handleRoleOptions = (e) =>{
    setRole(e.target.value)
}

const handleStatusOptions = (e) =>{
    setStatus(e.target.value)
};

const updateUserStatus = async (user) => {
  try {
    
    await apiService.updateUserStatus(
      user.userId, 
      {
        isActive: !user.isActive
      }
    );

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

     setOpenMenu(null);

     toast.success(
      user.isActive
        ? "User deactivated successfully"
        : "User activated successfully"
    );

   

  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (user) => {
  try {

    await apiService.deleteUser(
      user.userId
    );

    toast.success("User deleted successfully");

    setUserData((prev) =>
      prev.filter(
        (item) => item.userId !== user.userId
      )
    );

    setOpenMenu(null);

  } catch (error) {
    console.log(error);
    toast.error("Failed to delete user");
  }
};

const deleteGroup = async (group) => {
  try {

    await apiService.deleteGroup(group.id);

    toast.success("Group deleted successfully");

    setGroupData((prev) =>
      prev.filter(
        (item) => item.id !== group.id
      )
    );

    setOpenMenu(null);

  } catch (error) {
    console.log(error);
    toast.error("Failed to delete group");
  }
};

const handleGroupStatusToggle = async (group) => {
  try {
    
    await apiService.updateGroupStatus(group.id,{isActive: !group.isActive,});

    setGroupData((prev) =>
      prev.map((item) =>
        item.id === group.id
          ? { ...item, isActive: !item.isActive }
          : item
      )
    );

    setOpenMenu(null);
    toast.success(
      group.isActive ? "Group deactivated successfully" : "Group activated successfully"
    );

    
  } catch (error) {
    console.error(error);
    toast.error("Failed to update status");
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
        <ConfirmationModal
              isOpen={confirmModel.isOpen}
              title={confirmModel.title}
              message={confirmModel.message}
              onConfirm={() => {
                confirmModel.onConfirm?.();
                setConfirmModel({
                  isOpen: false,
                  title: "",
                  message: "",
                  onConfirm: null
                });
              }}
              onCancel={() =>
                setConfirmModel({
                  isOpen: false,
                  title: "",
                  message: "",
                  onConfirm: null
                })
              }
            />
        </>
    )
}

export default Users;