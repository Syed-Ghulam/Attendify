import { useEffect, useState } from "react";
import SearchInput from "../components/SearchInput";
import Select from "../components/Select";
import Button from "../components/Button";
import Table from "../components/Table";
import ConfirmationModal from "../components/ConfirmationModal";
import UnCheck from "../assets/icons/Uncheck.svg";
import More from "../assets/icons/more_vert.svg";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../config/api";

function Facility() {

   const navigate = useNavigate();

   const [search, setSearch] = useState("");
   const [status, setStatus] = useState("ALL");
   const [openMenu, setOpenMenu] = useState(null);
   const [facilityData, setFacilityData] = useState([]);

   const [confirmModel, setConfirmModel] = useState({
      isOpen: false,
      title:"",
      message:"",
      onConfirm: null
   });

   const statusOptions = [
      "ALL",
      "Active",
      "Inactive"
   ];

   const clearFilters = () => {
      setSearch("");
      setStatus("ALL");
   };

   const handleStatusOptions = (e)=>{
      setStatus(e.target.value);
   };

   const facilityColumn = [
      {
         label: (
            <button>
               <img src={UnCheck} alt="checkbox" />
            </button>
         ),
         key:"checkBox"
      },

      {
         label: "Facility Name",
         key:"facilityName"
      },

      {
         label: "Location",
         key:"location"
      },

      {
         label:"Description",
         key:"description"
      },

      {
         label: "Created On",
         key:"createdOn"
      },

      {
         label: "Status",
         key:"status"
      },

      {
         label:"Action",
         key:"action"
      }
   ];

   useEffect(() => {
      apiFetch("/facility")
      .then((res) => res.json())
      .then((data) => {

         const formattedData = data.map((facility) => ({
            checkBox:(
               <button>
                  <img src={UnCheck} alt="checkbox" />
               </button>
            ),
            facilityName: facility.facilityName,
            location:facility.location,
            description: facility.description,
            createdOn: new Date(facility.createdAt).toLocaleDateString(),
            status: facility.isActive ? "Active" : "Inactive",
            action: facility
         }));

         setFacilityData(formattedData);
      })
      .catch((err) => {
         console.log(err);
      });
   },[]);

   const filteredFacilityData = facilityData.filter((row) => {

      const matchesSearch = row.facilityName.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = status === "ALL" || row.status === status;

      return(
         matchesSearch && matchesStatus
      );
   });

   const getFacilityTableData = () => {
      return filteredFacilityData.map((row) => ({
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
                  <img src={More} alt="more options" />
               </Button>

               {
                  openMenu === row.action.id && (
                     <div className="absolute right-full mr-2 top-0 w-[120px] bg-white
                              border border-[var(--neutral-200)] rounded-[8px] shadow-lg z-50" 
                     >
                        <p className="px-4 py-2 hover:bg-[var(--neutral-100)] cursor-pointer"
                           onClick={() => {
                              navigate();
                              setOpenMenu(null);
                           }}
                        >
                              Edit
                        </p>

                        <p className="px-4 py-2 hover:bg-[var(--neutral-100)] cursor-pointer text-red-600"
                           onClick={() => {
                                 setConfirmModel({
                                    isOpen: true,
                                    title: "Delete Facility",
                                    message: "Are you sure you want to delete this Facility ?",
                                    onConfirm: () => deleteFacility(row.action)
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
                                 title: row.action.isActive ? "Deactivate Facility" : "Activate Facility",
                                 message: row.action.isActive ? "Are you sure you want to make this Facility inactive ?"
                                             : "Are you sure you want to make this Facility active ?",
                                 onConfirm : () => updateFacilityStatus(row.action)                  
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
      }))
   }

     return(
       <>
          <div>

            <div>

               <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">

                  <div className="w-full lg:w-[260px]">

                     <SearchInput
                        id = "search"
                        placeHolder = "Search"
                        
                     />
                  </div>

                  <div>

                     <Select
                       id="status"
                       label="Status"
                       labelClassName="mb-2 block text-[14px] font-medium text-[var(--neutral-500)]"
                       className="w-[124px] h-[42px] px-4 rounded-[20px] border border-[var(--neutral-300)]
                       bg-white text-[15px] text-[var(--neutral-500)] outline-none appearance-none cursor-pointer"
                     />

                     {
                        (
                           search || status !=="ALL"
                        ) && (
                           <Button
                              text="Clear"
                              onClick={clearFilters}
                              className="h-[42px] px-7 rounded-[4px] border border-[var(--primary-700)]
                                  text-[var(--primary-100)] text-[15px] font-medium cursor-pointer" 
                           />
                        )
                     }

                     <Button
                        type="button"
                        text="Create New"
                        className="h-[42px] px-6 bg-[var(--primary-900)] text-white rounded-[8px] cursor-pointer"
                     />
                  </div>
               </div>
            </div>

            <div className="mt-5">

               <Table
                 columns = {facilityColumn}
                 data={getFacilityTableData()}
               />
            </div>
          </div>

          <ConfirmationModal 
             isOpen={confirmModel.isOpen}
             title = {confirmModel.title}
             message={confirmModel.message}
             onConfirm={()=>{
               confirmModel.onConfirm?.();
               setConfirmModel({
                  isOpen: false,
                  title: "",
                  message: "",
                  onConfirm:null
               });
             }}
             onCancel={() =>
               setConfirmModel({
                  isOpen: false,
                  title:"",
                  message:"",
                  onConfirm:null
               })
             }
          />
       </>

     )
}
export default Facility;