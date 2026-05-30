import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Tabs from "./components/Tabs";
import SearchInput from "./components/SearchInput";
import Select from "./components/Select";
import Button from "./components/Button";
import Table from "./components/Table";
import UnCheck from "./assets/icons/Uncheck.svg";
import More from "./assets/icons/more_vert.svg";

function WorkStation(){
    
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("Workstation");
    const [search, setSearch] = useState("");
    const [line, setLine] = useState("ALL");
    const [facility, setFacility] = useState("ALL");
    const [status, setStatus] = useState("Active");
    const [workStationData, setWorkStationData] = useState([]);
    const [openMenu, setOpenMenu] = useState(null);

    const lineOptions = [
        "ALL"
    ];

    const facilityOptions = [
        "ALL"
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
        fetch("http://localhost:5000/workstation")
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
                status:workStation.status,
                action: (
                    <div className="relative">
                        <button
                            type="button"
                            className="cursor-pointer"
                            onClick={() =>
                                setOpenMenu(openMenu === user.userId ? null : user.userId)
                            }
                        >
                            <img src={More} alt="more options"/>
                        </button>
                    
                        {
                            openMenu === workStation.workstationName && (
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

    return(
        <>
        <div className="min-h-screen bg-[#F4F5FB]">
            <Header />
            <div className="flex">
                <Sidebar />

                <div className="flex-1 bg-[#F4F5FB]">
                    <div className="px-6 pt-6">
                        <h2 className="text-[28px] font-bold text-[#272757]">
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

                        <div className="mt-1 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
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
                            labelClassName = "mb-2 block text-[14px] font-medium text-[#6E7191]"
                            label="Line"
                            value={line}
                            onChange={handleLineOptions}
                            options = {lineOptions}
                            className="w-[124px] h-[42px] px-4 rounded-[20px] border border-[#D9DBE9]
                            bg-white text-[15px] text-[#6E7191] outline-none appearance-none cursor-pointer"
                            
                            />

                            <Select
                            id="facillity"
                            labelClassName = "mb-2 block text-[14px] font-medium text-[#6E7191]"
                            label="Facility"
                            value={facility}
                            onChange={handleFacilityOptions}
                            options = {facilityOptions}
                            className="w-[124px] h-[42px] px-4 rounded-[20px] border border-[#D9DBE9]
                            bg-white text-[15px] text-[#6E7191] outline-none appearance-none cursor-pointer"
                            
                            />

                            <Select
                            id="status"
                            labelClassName = "mb-2 block text-[14px] font-medium text-[#6E7191]"
                            label="Status"
                            value={status}
                            onChange={handleStatusOptions}
                            options = {statusOptions}
                            className="w-[124px] h-[42px] px-4 rounded-[20px] border border-[#D9DBE9]
                            bg-white text-[15px] text-[#6E7191] outline-none appearance-none cursor-pointer"
                            
                            />

                            <Button 
                                text = "clear"
                                className="h-[42px] px-7 rounded-[4px] border border-[#3F3D8F] text-[#3F3D8F]
                                bg-[#D5D5EC] text-[15px] font-medium cursor-pointer"
                            />

                            <Button 
                                type="button"
                                text = "Create New"
                                onClick = {()=>navigate("/new-workstation")}
                                className="h-[42px] px-6 bg-[#3F3F8D] text-white rounded-[8px] cursor-pointer"
                            />
                          </div>
                        </div>

                        <div className="mt-5">
                            {
                                activeTab === "Workstation" && (
                                    <Table 
                                      columns = {columns}
                                      data = {workStationData}  
                                    />
                                )
                            }

                            {
                                activeTab === "Line" && (
                                    <h2>Line Content </h2>
                                )
                            }

                            {
                                activeTab === "Facility" && (
                                    <h2>Facillity content</h2>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default WorkStation;