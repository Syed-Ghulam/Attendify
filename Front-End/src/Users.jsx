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
import { arrayMove } from "@dnd-kit/sortable";


function Users(){

   
    const navigate = useNavigate();
    const location = useLocation();
    const [search , setSearch] = useState("");
    const [gender , setGender] = useState("ALL");
    const [role , setRole] = useState("ALL");

    const [selectedRows, setSelectedRows] = useState({
      users: [],
      groups: []
    });
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
    const [isOrderChanged, setIsOrderChanged] = useState(false);
    const [isGroupOrderChanged, setIsGroupOrderChanged] = useState(false);

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

const handleRowSelect = (tableName, id) => {

  setSelectedRows((prev) => {
    const currentSelection = prev[tableName];

    return {
      ...prev,

      [tableName]: currentSelection.includes(id)
         ? currentSelection.filter((item) => item !== id)
         : [...currentSelection, id]
    };
  });
};


const handleSelectAll = () => {

  if(selectedRows.users.length === filteredUsers.length){
    setSelectedRows((prev) => ({
      ...prev,
      users: []
    }));

  } else {
    setSelectedRows((prev) => ({
      ...prev,
      users: filteredUsers.map((user) => user.userId)
    }));
  }
};

const handleGroupSelectAll = () => {
  if (selectedRows.groups.length === filteredGroups.length) {
    setSelectedRows((prev) => ({
      ...prev,
      groups: [],
    }));
  } else {
    setSelectedRows((prev) => ({
      ...prev,
      groups : filteredGroups.map((group) => group.id)
    }));
  }
};



const columns = [

 {
    label:(
      <input type="checkbox"
             checked = {
              filteredUsers.length > 0 && 
              selectedRows.users.length === filteredUsers.length
             } 
             onChange={handleSelectAll}
             className="h-4 w-4 cursor-pointer"
      />
    ),
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
      label:(
       <input type="checkbox"
        checked ={filteredGroups.length >0 && 
                  selectedRows.groups.length === filteredGroups.length}
                  onChange={handleGroupSelectAll} 
                  className="h-4 w-4 cursor-pointer"
         />
       ),
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
  return filteredUsers.map((user) => ({
    checkBox: (
      <input type="checkbox"
             checked = {selectedRows.users.includes(user.userId)}
             onChange={() => handleRowSelect("users",user.userId)}
             className="h-3 w-3 cursor-pointer" 
      />
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

  return filteredGroups.map((group) => ({
    id: group.id,
    checkBox: (
       <input
          type="checkbox"
          checked={selectedRows.groups.includes(group.id)}
          onChange={() => handleRowSelect("groups",group.id)}
          className="h-3 w- cursor-pointer"
        />
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

const deleteSelectedUsers = async () => {

  try{

    await Promise.all(
      selectedRows.users.map((userId) => 
        apiService.deleteUser(userId)
      )
    );

    setUserData((prev) => 
      prev.filter(
        (user) => !selectedRows.users.includes(user.userId)
      )
    );

    setSelectedRows((prev) => ({
      ...prev,
      users: []
    }));

    toast.success("Users deleted successfully");

  } catch (error){
    console.log(error);
    toast.error("Failed to delete users");
  }
};

const handleUserRowReorder = (activeId, overId) => {

  const oldIndex = userData.findIndex(
    (user) => user.userId === activeId
  );

  const newIndex = userData.findIndex(
    (user) => user.userId === overId
  );

  if(oldIndex === -1 || newIndex === -1){
    return;
  }

  setUserData((prev) =>
    arrayMove(prev, oldIndex, newIndex)
  );

  setIsOrderChanged(true);
};

const saveUserOrder = async() => {

  try{

    const payload = userData.map((user, index) => ({
      userId: user.userId,
      displayOrder: index + 1
    }));

    await apiService.saveUserOrder(payload);

    toast.success("User order saved successfully");

    setIsOrderChanged(false);

    setConfirmModel({
      isOpen: false,
      title: "",
      message: "",
      onConfirm: null
    });

    await loadUsers();

  } catch (error){
    console.log(error);
    toast.error(error.message || "Failed to save order");
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

const deleteSelectedGroups = async () => {

    try {
        await Promise.all(

            selectedRows.groups.map((groupId) =>
                apiService.deleteGroup(groupId)
            )

        );

        setGroupData((prev) =>
            prev.filter(
                (group) =>
                    !selectedRows.groups.includes(group.id)
            )
        );

        setSelectedRows((prev) => ({
            ...prev,
            groups: []
        }));

        toast.success("Groups deleted successfully");
    } catch (error) {
        console.log(error);
        toast.error("Failed to delete groups");
    }
};

const handleGroupRowReorder = (activeId, overId) => {

    const oldIndex = groupData.findIndex(
        (group) => group.id === activeId
    );

    const newIndex = groupData.findIndex(
        (group) => group.id === overId
    );

    if (oldIndex === -1 || newIndex === -1) {
        return;
    }

    setGroupData((prev) =>
        arrayMove(prev, oldIndex, newIndex)
    );

    setIsGroupOrderChanged(true);

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

const saveGroupOrder = async () => {

  try {

    const payload = groupData.map((group, index) => ({
      id: group.id,
      displayOrder: index + 1
    }));

    await apiService.saveGroupOrder(payload);

    toast.success("Group order saved successfully");

    setIsGroupOrderChanged(false);

    await loadGroups();

  } catch (error) {

    console.log(error);

    toast.error(
      error.message || "Failed to save group order"
    );

  }

};

const hasSelectedUsers = selectedRows.users.length > 0;
const hasSelectedGroups = selectedRows.groups.length > 0;

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

                            {activeTab === "Users" && hasSelectedUsers && (
                              <Button
                                 type = "button"
                                 text = {`Delete (${selectedRows.users.length})`}
                                className="
                                    px-7
                                    border border-[var(--primary-700)]
                                    text-[var(--primary-700)]
                                    bg-[var(--primary-100)]
                                    text-[15px]
                                    font-medium
                                 "
                                 onClick = {() => {
                                  setConfirmModel({
                                    isOpen: true,
                                    title: "Delete Users",
                                    message: `Are you sure you want to delete ${selectedRows.users.length} user(s)`,
                                    onConfirm: deleteSelectedUsers
                                  });
                                 }}
                              />
                            )}

                            {activeTab === "Groups" && hasSelectedGroups && (
                              <Button
                                type = "button"
                                text = {`Delete (${selectedRows.groups.length})`}
                                className="
                                    px-7
                                    border border-[var(--primary-700)]
                                    text-[var(--primary-700)]
                                    bg-[var(--primary-100)]
                                    text-[15px]
                                    font-medium
                                 "
                                onClick = {() => {
                                  setConfirmModel({
                                    isOpen: true,
                                    title: "Delete Groups",
                                    message: `Are you sure you want to delete ${selectedRows.groups.length} group(s)`,
                                    onConfirm: deleteSelectedGroups
                                  });
                                }}
                              />
                            )}   
                            {
                               activeTab === "Users" &&
                               isOrderChanged && (

                                <Button
                                   type="button"
                                   text ="Save Order"
                                    className="
                                    px-7
                                    border border-[var(--primary-700)]
                                    text-[var(--primary-700)]
                                    bg-[var(--primary-100)]
                                    text-[15px]
                                    font-medium
                                  "
                                  onClick = {()=> {
                                    setConfirmModel({
                                      isOpen: true,
                                      title: "Save User Order",
                                      message: "Are you sure you want to save the new user order?",
                                      onConfirm: saveUserOrder
                                    })
                                  }}


                                />
                               )
                            }

                            {
                                activeTab === "Groups" &&
                                isGroupOrderChanged && (

                                    <Button
                                        type="button"
                                        text="Save Order"
                                        className="
                                            px-7
                                            border border-[var(--primary-700)]
                                            text-[var(--primary-700)]
                                            bg-[var(--primary-100)]
                                            text-[15px]
                                            font-medium
                                        "
                                        onClick={() => {

                                            setConfirmModel({
                                                isOpen: true,
                                                title: "Save Group Order",
                                                message: "Are you sure you want to save the new group order?",
                                                onConfirm: saveGroupOrder
                                            });

                                        }}

                                    />

                                )
                              }
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
                                selectedRows={selectedRows.users}
                                rowKey = "userId"
                                onRowReorder={handleUserRowReorder}
                                />
                            
                            )
                        }

                        {
                            activeTab === "Groups" && (
                                <Table 
                                 
                                columns={grpColumns}
                                data={getGroupTableData()}
                                selectedRows={selectedRows.groups} 
                                rowKey = "id" 
                                onRowReorder={handleGroupRowReorder}
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