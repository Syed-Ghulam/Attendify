import { useEffect, useState } from "react";

function Facility() {

   const [search, setSearch] = useState("");

   const [facilityData, setFacilityData] =
      useState([]);

   useEffect(() => {

      // apiFetch("/facility")

   }, []);

   return (
      <div>
         Facility Filters

         Facility Table
      </div>
   );
}

export default Facility;