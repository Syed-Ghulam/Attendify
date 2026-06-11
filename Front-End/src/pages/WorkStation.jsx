import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Line from "./Line";
import Facility from "./Facility";
import Tabs from "../components/Tabs";
import ConfirmationModal from "../components/ConfirmationModal";
import SearchInput from "../components/SearchInput";
import Select from "../components/Select";
import Button from "../components/Button";
import Table from "../components/Table";
import UnCheck from "../assets/icons/Uncheck.svg";
import More from "../assets/icons/more_vert.svg";
import { apiFetch } from "../config/api";

function WorkStation(){
    
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("Workstation");
    const [search, setSearch] = useState("");
    const [line, setLine] = useState("ALL");
    const [facility, setFacility] = useState("ALL");
    const [status, setStatus] = useState("ALL");
    const [workStationData, setWorkStationData] = useState([]);
    const [openMenu, setOpenMenu] = useState(null);

    const [confirmModel, setConfirmModel] = useState({
        isOpen: false,
        title: "",
        message: "",
        onConfirm: null
        });

    const lineOptions = [
        "ALL",
        ...new Set(
            workStationData.map(
                (item) => item.lineNameNumber
            )
        )
    ];

    const facilityOptions = [
        "ALL",
        ...new Set(
            workStationData.map(
                (item) => item.facility
            )
        )
    ];

    const statusOptions = [
        "ALL",
        "Active",
        "Inactive"
    ];

    const workStationColumns = [
        {
            label:<button><img src={UnCheck} alt="checkbox"/></button>,
            key:"checkBox"
        },

        {
            label:"Workstation Name",
            key:"workstationName"
        },

        {
            label:"Code",
            key:"code",
        },

        {
            label: "IP Address",
            key:"ipAddress"
        },

        {
            label:"Facility",
            key:"facility"
        },

        {
            label:"Line Name/Number",
            key:"lineNameNumber"
        },

        {
            label:"Line Code",
            key:"linecode"
        },

        {
            label:"Created on",
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

    useEffect(()=>{
        apiFetch('/workstation')
        .then((res)=> res.json())
        .then((data) =>{
            const formattedData = data.map((workStation) =>({
                checkBox: <button type="checkBox"><img src={UnCheck} alt="checkbox"/></button>,
                workstationName:workStation.workstationName,
                code:workStation.code,
                ipAddress:workStation.ipAddress,
                facility: workStation.facility,
                lineNameNumber:workStation.linenameNumber,
                linecode:"DCC PRODUCT LINE 1",
                createdOn: new Date(workStation.createdAt).toLocaleDateString(),
                status:workStation.isActive ? "Active" : "Inactive",
                action:workStation

            }));
            setWorkStationData(formattedData)
        })
        .catch((err) =>{
            console.log(err);
        })
    },[]);

    const handleLineOptions = (e) =>{
        setLine(e.target.value);
    };

    const handleFacilityOptions = (e)=>{
        setFacility(e.target.value);
    };

    const handleStatusOptions = (e)=>{
        setStatus(e.target.value);
    };

    const updateWorkStationStatus = async (workStation) => {
   try {

      const response = await apiFetch(`/workstation/${workStation.id}`,
         {
            method: "PUT",
            body: JSON.stringify({
               isActive: !workStation.isActive,
               updatedBy: localStorage.getItem("userId")
            })
         }
      );

      if (!response.ok) {
         throw new Error("Failed");
      }

      setWorkStationData((prev) =>
         prev.map((item) =>
            item.action.id === workStation.id
               ? {
                   ...item,
                   status: !workStation.isActive
                     ? "Active"
                     : "Inactive",
                   action: {
                     ...item.action,
                     isActive: !workStation.isActive,
                     updatedBy: localStorage.getItem("userId")
                   }
                 }
               : item
         )
      );

      setOpenMenu(null);

   } catch (error) {
      console.log(error);
   }
};

const deleteWorkStation = async (workStation) => {
  try {
    const response = await apiFetch(`/workstation/${workStation.id}`,
      {
        method: "DELETE",
        body: JSON.stringify({
          updatedBy: localStorage.getItem("userId")
        })
      }
    );

    if (!response.ok) {
      throw new Error("Failed");
    }

    setWorkStationData((prev) =>
      prev.filter(
        (item) => item.action.id !== workStation.id
      )
    );

  } catch (error) {
    console.log(error);
  }
};

const filteredWorkStationData = workStationData.filter((row) => {

    const matchesSearch =
        row.workstationName
            .toLowerCase()
            .includes(search.toLowerCase());

    const matchesLine =
        line === "ALL" ||
        row.lineNameNumber === line;

    const matchesFacility =
        facility === "ALL" ||
        row.facility === facility;

    const matchesStatus =
        status === "ALL" ||
        row.status === status;

    return (
        matchesSearch &&
        matchesLine &&
        matchesFacility &&
        matchesStatus
    );
});

    const getWorkStationTableData = () => {
   return filteredWorkStationData.map((row) => ({
      ...row,

      action: (
         <div className="relative">
            <button
               type="button"
               className="cursor-pointer"
               onClick={() =>
                  setOpenMenu(
                     openMenu === row.action.id
                        ? null
                        : row.action.id
                  )
               }
            >
               <img src={More} alt="more options" />
            </button>

            {
               openMenu === row.action.id && (
                  <div
                     className="
                        absolute right-full mr-2 top-0
                        w-[120px]
                        bg-white
                        border border-[var(--neutral-200)]
                        rounded-[8px]
                        shadow-lg
                        z-50
                     "
                  >
                     <p
                        className="px-4 py-2 hover:bg-[var(--neutral-100)] cursor-pointer"
                        onClick={() => {
                           navigate(`/edit-workstation/${row.action.id}`);
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
                            title: "Delete WorkStation",
                            message: "Are you sure you want to delete this workstation?",
                            onConfirm: () => deleteWorkStation(row.action)
                            });
                        }}
                        >
                        Delete
                     </p>

                     <p
                        className="px-4 py-2 hover:bg-[var(--neutral-100)] cursor-pointer"
                        onClick={() => {
                            setConfirmModel({
                                isOpen: true,
                                title: row.action.isActive
                                    ? "Deactivate WorkStation"
                                    : "Activate WorkStation",
                                message: row.action.isActive
                                    ? "Are you sure you want to make this workstation inactive?"
                                    : "Are you sure you want to make this workstation active?",
                                onConfirm: () => updateWorkStationStatus(row.action)
                            });
                        }}
                        >
                        {row.action.isActive ? "Inactive" : "Active"}
                        </p>
                  </div>
               )
            }
         </div>
      )
   }));
};

const clearFilters = () => {
    setSearch("");
    setLine("ALL");
    setFacility("ALL");
    setStatus("ALL");
};
    return(
        <>
        

                <div className="flex-1 bg-[var(--neutral-100)]">
                    <div className="px-6 pt-6">
                        <h2 className="text-[28px] font-bold text-[var(--primary-900)]">
                            Manage Workstation
                        </h2>
                    </div>

                    <div className="mt-6 px-6">
                        <Tabs
                           tabs = {["Workstation","Line" ,"Facility"]}
                           activeTab = {activeTab}
                           setActiveTab ={setActiveTab}
                        />
                    </div>

                    <div className="px-6 p-5">

                        <div className="">
                            {
                                activeTab === "Workstation" && (
                                    <>
                                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
                                    <div className="w-full lg:w-[260px]">
                                        <SearchInput
                                        id="search"
                                        placeHolder = "Search"
                                        value={search}
                                        onChange = {(e) =>
                                            setSearch(e.target.value)
                                        } 
                                        />
                                    </div>

                                    <div className="flex flex-wrap items-end gap-4">
                                        <Select
                                        id="line"
                                        labelClassName = "mb-2 block text-[14px] font-medium text-[var(--neutral-500)]"
                                        label="Line"
                                        value={line}
                                        onChange={handleLineOptions}
                                        options = {lineOptions}
                                        className="w-[124px] h-[42px] px-4 rounded-[20px] border border-[var(--neutral-300)]
                                        bg-white text-[15px] text-[var(--neutral-500)] outline-none appearance-none cursor-pointer"
                                        
                                        />

                                        <Select
                                        id="facillity"
                                        labelClassName = "mb-2 block text-[14px] font-medium text-[var(--neutral-500)]"
                                        label="Facility"
                                        value={facility}
                                        onChange={handleFacilityOptions}
                                        options = {facilityOptions}
                                        className="w-[124px] h-[42px] px-4 rounded-[20px] border border-[var(--neutral-300)]
                                        bg-white text-[15px] text-[var(--neutral-500)] outline-none appearance-none cursor-pointer"
                                        
                                        />

                                        <Select
                                        id="status"
                                        labelClassName = "mb-2 block text-[14px] font-medium text-[var(--neutral-500)]"
                                        label="Status"
                                        value={status}
                                        onChange={handleStatusOptions}
                                        options = {statusOptions}
                                        className="w-[124px] h-[42px] px-4 rounded-[20px] border border-[var(--neutral-300)]
                                        bg-white text-[15px] text-[var(--neutral-500)] outline-none appearance-none cursor-pointer"
                                        
                                        />

                                    {
                                            (
                                                search ||
                                                line !== "ALL" ||
                                                facility !== "ALL" ||
                                                status !== "ALL"
                                            ) && (
                                                <Button
                                                    text="Clear"
                                                    onClick={clearFilters}
                                                    className="
                                                        h-[42px]
                                                        px-7
                                                        rounded-[4px]
                                                        border
                                                        border-[var(--primary-700)]
                                                        text-[var(--primary-700)]
                                                        bg-[var(--primary-100)]
                                                        text-[15px]
                                                        font-medium
                                                        cursor-pointer
                                                    "
                                                />
                                            )
                                        }

                                        <Button 
                                            type="button"
                                            text = "Create New"
                                            onClick = {()=>navigate("/new-workstation")}
                                            className="h-[42px] px-6 bg-[var(--primary-900)] text-white rounded-[8px] cursor-pointer"
                                        />
                                    </div>
                                    </div>
                                    <div className="mt-5">
                                    <Table 
                                      columns = {workStationColumns}
                                      data = {getWorkStationTableData()}  
                                    />
                                    </div>
                                    </>
                                )
                            }

                            {
                                activeTab === "Line" && (
                                    <Line />
                                )
                            }

                            {
                                activeTab === "Facility" && (
                                    <Facility />
                                )
                            }
                        </div>
                    </div>
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
export default WorkStation;