import { useState } from "react";
import Arrow from "../assets/icons/Vector.svg"

function MultiSelect(props){

   const [showOptions, setShowOptions] = useState(false);

   const handleSelect = (item) => {

      if(props.value.includes(item)){
         return;
      }

      props.onChange([...props.value, item]);
   }

   const removeOption = (item) => {

      const filtered = props.value.filter(
         (data) => data !== item
      );

      props.onChange(filtered);
   }

   return(
      <div className="relative">

         {/* LABEL */}
         <label
            className="
                    mb-[6px]
                    block
                    text-[13px]
                    font-semibold
                    text-[#2D2D5A]
                  "
         >
            {props.label}
            {props.required && (
                <span className="text-red-500">*</span>
            )}
         </label>


         {/* SELECT BOX */}
         <div
            onClick={() => setShowOptions(!showOptions)}
            className="relative min-h-[48px] w-full cursor-pointer rounded-md border
               border-[#d7d7e8] bg-white px-3 py-2 pr-10 flex flex-wrap items-center gap-2"
         >
         <div className="flex flex-wrap items-center gap-2">
            {
               props.value.length === 0 && (
                  <p className="text-sm text-gray-400">
                     Select Group
                  </p>
               )
            }

            <img src={Arrow} alt="arrow"
              className="absolute right-4 top-[55%] -translate-y-1/2 w-3 h-3 pointer-events-none"
             />

            {
               props.value.map((item, index) => (
                  <div
                     key={index}
                     className="flex items-center gap-2 rounded-md bg-[#ece9ff]
                        px-2 py-1 text-sm text-[#4f46c8]"
                  >

                     <span>{item}</span>

                     <button
                        type="button"
                        onClick={(e) => {
                           e.stopPropagation();
                           removeOption(item);
                        }}
                        className="text-xs font-bold text-[#4f46c8]"
                     >
                        ✕
                     </button>

                  </div>
               ))
            }
            </div>

         </div>


         {/* DROPDOWN */}
         {
            showOptions && (
               <div
                  className="absolute z-10 mt-1 w-full
                     rounded-md border border-[#d7d7e8] bg-white shadow-md"
               >

                  {
                     props.options.map((item, index) => (

                        <div
                           key={index}
                           onClick={() => handleSelect(item)}
                           className="cursor-pointer px-4 py-3 text-sm hover:bg-[#f4f4fb]"
                        >
                           {item}
                        </div>

                     ))
                  }
                
               </div>
            )
         }

         {props.error && (
            <p className="mt-1 text-sm text-red-500">
               {props.error}
            </p>
         )}

        

      </div>
   )
}

export default MultiSelect;