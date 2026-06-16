import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchInput from "../components/SearchInput";
import Select from "../components/Select";
import Button from "../components/Button";
import Table from "../components/Table";
import Icon from "../components/Icon";
import { apiService } from "../services/apiServices";
import ConfirmationModal from "../components/ConfirmationModal";
import { toast } from "react-toastify";


function Line (){

    const [search, setSearch] = useState("");
    const [facility, setFacility] = useState("ALL");
    const [status, setStatus] = useState("ALL");
    const [openMenu, setOpenMenu] = useState(null);

    const [lineData, setLineData] = useState([]);

    const navigate = useNavigate();

    const [confirmModel, setConfirmModel] = useState({
        isOpen: false,
        title:"",
        message:"",
        onConfirm: null
    });

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
                    <Icon name="UnCheck" alt="checkbox" />
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
   loadLines();
}, []);

const loadLines = async () => {
   try {

      const data =
         await apiService.getLines();

      const formattedData = data.map(
         (line) => ({
            checkBox: (
               <button type="checkBox">
                  <Icon name="UnCheck" alt="checkbox" />
               </button>
            ),
            lineNameNumber: line.lineNameNumber,
            facility: line.facility,
            createdOn: new Date(
               line.createdAt
            ).toLocaleDateString(),
            status: line.isActive
               ? "Active"
               : "Inactive",
            action: line
         })
      );

      setLineData(formattedData);

   } catch (error) {

      console.log(error);

   }
};

    const updateLineStatus = async(line) => {

        try{

            await apiService.updateLine(
                line.id,
                {
                    isActive: !line.isActive
                }
                );

            setLineData((prev) =>
                prev.map((item) =>
                    item.action.id === line.id ? {
                        ...item,
                        status: !line.isActive ? "Active" : "Inactive",
                        action : {
                            ...item.action,
                            isActive: !line.isActive,
                            
                        }
                    } : item
                )
            );

            toast.success(
                line.isActive
                    ? "Line deactivated successfully"
                    : "Line activated successfully"
            );

            setOpenMenu(null);

        } catch (error){
            console.log(error);
        }
    };

    const deleteLine = async (line) => {

        try{

            await apiService.deleteLine(line.id);

            setLineData((prev) =>
                prev.filter(
                    (item) => item.action.id !== line.id
                ) 
            );

            
        toast.success("Line deleted successfully");

        setOpenMenu(null);

        } catch(error){
            console.log(error);
        }

    };

    const filteredLineData = lineData.filter((row) => {

        const matchesSearch = row.lineNameNumber.toLowerCase().includes(search.toLowerCase());

        const matchesFacility = facility === "ALL" || row.facility === facility;

        const matchesStatus = status === "ALL" || row.status === status;

        return (
            matchesSearch && matchesFacility && matchesStatus
        );
    });

    const getLineTableData = () => {
        return filteredLineData.map((row) => ({
            ...row,

            action: (
                <div className="relative">
                    <Button
                      type="button"
                      className="cursor-pointer"
                      onClick = {() => 
                        setOpenMenu(
                            openMenu === row.action.id ? null : row.action.id
                        )
                      }
                    >
                        <Icon name="More" alt="more options" />
                    </Button>

                    {
                        openMenu === row.action.id && (
                            <div className="absolute right-full mr-2 top-0 w-[120px] bg-white
                                    border border-[var(--neutral-200)] rounded-[8px] shadow-lg z-50"       
                            >
                                <p className="px-4 py-2 hover:bg-[var(--neutral-100)] cursor-pointer"
                                   onClick={()=> {
                                    navigate(`edit-line/${row.action.id}`);
                                    setOpenMenu(null);
                                   }}
                                >
                                    Edit
                                </p>

                                <p className="px-4 py-2 hover:bg-[var(--neutral-100)] cursor-pointer text-red-600"
                                    onClick={() => {
                                        setConfirmModel({
                                            isOpen: true,
                                            title: "Delete Line",
                                            message: "Are you sure you want to delete this Line ?",
                                            onConfirm: () => deleteLine(row.action)
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
                                          title: row.action.isActive ? "Deactivate Line" : "Activate Line",
                                          message: row.action.isActive ? "Are you sure you want to make this line inactive ?"
                                                    : "Are you sure you want to make this line active ?",
                                          onConfirm : () => updateLineStatus(row.action)                  
                                       })
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

    return(
        <>
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
                                        type="button"
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
                         data={getLineTableData()}
                        />
                    </div>
        </div>
        <ConfirmationModal 
           isOpen={confirmModel.isOpen}
           title = {confirmModel.title}
           message={confirmModel.message}
           onConfirm={() => {
            confirmModel.onConfirm?.();
            setConfirmModel({
                isOpen: false,
                title:"",
                message: "",
                onConfirm:null
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
    );
}
export default Line;