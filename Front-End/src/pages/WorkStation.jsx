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
import Icon from "../components/Icon";
import { apiService } from "../services/apiServices";
import { toast } from "react-toastify";
import { arrayMove } from "@dnd-kit/sortable";

function WorkStation(){
    
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("Workstation");
    const [search, setSearch] = useState("");
    const [line, setLine] = useState("ALL");
    const [facility, setFacility] = useState("ALL");
    const [status, setStatus] = useState("ALL");
    const [workStationData, setWorkStationData] = useState([]);
    const [openMenu, setOpenMenu] = useState(null);
    const [facilityOptions, setFacilityOptions] = useState(["ALL"]);
    const [lineOptions, setLineOptions] = useState(["ALL"]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [isOrderChanged, setIsOrderChanged] = useState(false);

    const [confirmModel, setConfirmModel] = useState({
        isOpen: false,
        title: "",
        message: "",
        onConfirm: null
        });

    const statusOptions = [
        "ALL",
        "Active",
        "Inactive"
    ];


   useEffect(() => {
  loadWorkStations();
  loadFacilities();
  loadLine();
}, []);

const loadWorkStations = async () => {
  try {

    const data =
      await apiService.getWorkStations();

    const formattedData = data.map(
      (workStation) => ({
        id: workStation.id,
        checkBox:"",
        workstationName: workStation.workstationName,
        code: workStation.code,
        ipAddress: workStation.ipAddress,
        facility: workStation.facility,
        lineNameNumber: workStation.linenameNumber,
        linecode: "DCC PRODUCT LINE 1",
        createdOn: new Date(workStation.createdAt).toLocaleDateString(),
        status:
          workStation.isActive
            ? "Active"
            : "Inactive",
        action: workStation
      })
    );

    setWorkStationData(
      formattedData
    );

  } catch (error) {

    console.log(error);

  }
};

const loadFacilities = async () => {
    try {

        const data = await apiService.getFacilities();

        const facilities = [
            "ALL",
            ...new Set(
            data
                .filter(item => item.isActive)
                .map(item => item.facilityName)
        )];

        setFacilityOptions(facilities);

    } catch (error) {
        console.log(error);
    }
};

const loadLine = async () => {
    try{

        const data = await apiService.getLines();

        const lines = [
            "ALL",
            ...new Set(
                data.filter(line => line.isActive).map(line => line.lineNameNumber)
            )
             
        ];

        setLineOptions(lines);

    } catch (error) {
        console.log(error)
    }
};

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

      await apiService.updateWorkStationStatus(
        workStation.id,
        {
            isActive:!workStation.isActive
        }
      );

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
                   }
                 }
               : item
         )
      );

      toast.success(workStation.isActive ? "Workstation deactivated successfully" : "Workstation activated successfully");

      setOpenMenu(null);

   } catch (error) {
      console.log(error);
   }
};

const deleteWorkStation = async (workStation) => {
  try {
    await apiService.deleteWorkStation(
        workStation.id
    );

    setWorkStationData((prev) =>
      prev.filter(
        (item) => item.action.id !== workStation.id
      )
    );

    toast.success("Workstation deleted successfully");

    setOpenMenu(null);

  } catch (error) {
    console.log(error);
  }
};

const deleteSelectedWorkStations = async () => {

    try {

        await Promise.all(

            selectedRows.map((id) =>
                apiService.deleteWorkStation(id)
            )

        );

        setWorkStationData((prev) =>
            prev.filter(
                (item) =>
                    !selectedRows.includes(item.action.id)
            )
        );

        setSelectedRows([]);

        toast.success("Workstations deleted successfully");

    } catch (error) {

        console.log(error);
        toast.error("Failed to delete workstations");

    }

};

const handleWorkStationRowReorder = (activeId, overId) => {
    const oldIndex = workStationData.findIndex(
        (item) => item.id === activeId
    );

    const newIndex = workStationData.findIndex(
        (item) => item.id === overId
    );

    if(oldIndex === -1 || newIndex === -1){
        return;
    }

    setWorkStationData((prev) =>
        arrayMove(prev, oldIndex, newIndex)
    );

    setIsOrderChanged(true);
};

const saveWorkStationOrder = async () => {

    try{

        const payload = workStationData.map(
            (item, index) => ({
                id: item.id,
                displayOrder: index + 1
            })
        );

        await apiService.saveWorkStationOrder(payload);

        toast.success("Workstation order saved successfully");
        setIsOrderChanged(false);
        await loadWorkStations();
    } catch (error){

        console.log(error);
        toast.error(error.message || "Failed to save workstation order");
    }
}

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

    const handleRowSelect = (id) => {
        setSelectedRows((prev) => {

            if(prev.includes(id)){
                return prev.filter((item) => item !== id);
            }

            return [...prev, id];
        });
    };

    
    const handleSelectAll = () => {

        if(selectedRows.length === filteredWorkStationData.length){
            setSelectedRows([]);
        } else {
            setSelectedRows(
                filteredWorkStationData.map((workstation) => workstation.action.id)
            );
        }
    };

    const workStationColumns = [
        {
            label:(
                <input
                    type="checkbox"
                    checked={
                        filteredWorkStationData.length > 0 &&
                        selectedRows.length === filteredWorkStationData.length
                    }
                    onChange={handleSelectAll}
                    className="h-4 w-4 cursor-pointer" 
                />
            ),
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

    const getWorkStationTableData = () => {

   return filteredWorkStationData.map((row) => ({

      id: row.action.id,
      ...row,
      checkBox : (
        <input type="checkbox"
               checked={selectedRows.includes(row.action.id)}
               onChange={() => handleRowSelect(row.action.id)}
               className="h-3 w-3 cursor-pointer" 
        />
      ),

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
               <Icon name="More" alt="more options" />
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

const hasSelectedRows = selectedRows.length > 0;
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
                                        id="facility"
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

                                        {
                                            hasSelectedRows && (
                                                <Button
                                                    type="button"
                                                    text={`Delete (${selectedRows.length})`}
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
                                                                title: "Delete Workstations",
                                                                message: `Are you sure you want to delete ${selectedRows.length} workstation(s)?`,
                                                                onConfirm: deleteSelectedWorkStations
                                                            });

}}
                                                />
                                            )
                                        }

                                        {
                                            isOrderChanged && (
                                                <Button
                                                   type = "button"
                                                   text = "Save Order"
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
                                                            title: "Save Workstation order",
                                                            message: "Are you sure you want to save  the new workstation order?",
                                                            onConfirm: saveWorkStationOrder
                                                        })
                                                    }}
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
                                      selectedRows={selectedRows}
                                      rowKey="id" 
                                      onRowReorder={handleWorkStationRowReorder}
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