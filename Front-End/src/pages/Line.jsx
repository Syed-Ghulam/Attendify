import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchInput from "../components/SearchInput";
import Select from "../components/Select";
import Button from "../components/Button";
import Table from "../components/Table";
import UnCheck from "../assets/icons/Uncheck.svg";
import { apiFetch } from "../config/api";


function Line (){

    const [search, setSearch] = useState("");
    const [facility, setFacility] = useState("ALL");
    const [status, setStatus] = useState("ALL");

    const [lineData, setLineData] = useState([]);

    const navigate = useNavigate();

    const facilityOptions = [
        "ALL"
    ];

    const statusOptions = [
        "ALL",
        "Active",
        "Inactive"
    ];

    const clearFilters = () => {
    setSearch("");
    setFacility("ALL");
    setStatus("ALL");
    };

    const handleFacilityOptions = (e)=>{
        setFacility(e.target.value);
    };

    const handleStatusOptions = (e) =>{
        setStatus(e.target.value);
    };

    const lineColumns = [
        {
            label : (
                <button>
                    <img src={UnCheck} alt="checkbox" />
                </button>
            ),
            key: "checkBox"
        },

        {
            label: "Line Name / Number",
            key: "lineNameNumber"
        },

        {
            label:"Facility",
            key: "facility"
        },

        {
            label: "Created on",
            key:"createdOn"
        },

        {
            label:"Status",
            key: "status"
        },

        {
            label:"Action",
            key:"action"
        }
    ];

    useEffect(() => {
         apiFetch("/line")
            .then((res) => res.json())
            .then((data) => {

                const formattedData = data.map((line) => ({
                    checkBox:(
                        <button type="checkBox">
                            <img src={UnCheck} alt="checkbox" />
                        </button>
                    ),
                    lineNameNumber:line.lineNameNumber,
                    facility:line.facility,
                    createdOn: new Date(line.createdAt).toLocaleDateString(),
                    status: line.isActive ? "Active" : "Inactive",
                    action:"..."
                }));

                setLineData(formattedData);
            })
            .catch((err) => {
                console.log(err);
            });
    },[]);

    return(
        
                <div>
                    <div>

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
                                onClick = {()=>navigate("new-line")}
                                className="h-[42px] px-6 bg-[var(--primary-900)] text-white rounded-[8px] cursor-pointer"
                            />
                          </div>
                        </div>
                    </div>

                    <div className="mt-5">
                        <Table 
                         columns = {lineColumns}
                         data={lineData}
                        />
                    </div>
        </div>
    );
}
export default Line;