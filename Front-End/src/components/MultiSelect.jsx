import { useState } from "react";
import Arrow from "../assets/icons/Vector.svg";
import SearchInput from "./SearchInput";

function MultiSelect(props) {
   const [showOptions, setShowOptions] = useState(false);
   const [searchTerm, setSearchTerm] = useState("");

   const handleSelect = (item) => {
      if (props.value.includes(item)) {
         return;
      }

      props.onChange([...props.value, item]);
      setSearchTerm("");
   };

   const removeOption = (item) => {
      const filtered = props.value.filter(
         (data) => data !== item
      );

      props.onChange(filtered);
   };

   const filteredOptions = props.options.filter(
      (item) =>
         item.toLowerCase().includes(searchTerm.toLowerCase()) &&
         !props.value.includes(item)
   );

   return (
      <div className="relative">

         {/* LABEL */}
         <label
            className="
               mb-[6px]
               block
               text-[13px]
               font-semibold
               text-[var(--color-label)]
            "
         >
            {props.label}
            {props.required && (
               <span className="text-[var(--color-error)]">*</span>
            )}
         </label>

         {/* SELECT BOX */}
         <div
            onClick={() => setShowOptions(!showOptions)}
            className="
               relative
               min-h-[48px]
               w-full
               cursor-pointer
               rounded-md
               border
               border-[var(--color-border)]
               bg-[var(--color-white)]
               px-3
               py-2
               pr-10
               flex
               flex-wrap
               items-center
               gap-2
            "
         >
            <div className="flex flex-wrap items-center gap-2">

               {props.value.length === 0 && (
                  <p className="text-sm text-gray-400">
                     Select Group
                  </p>
               )}

               {props.value.map((item, index) => (
                  <div
                     key={index}
                     className="
                        flex
                        items-center
                        gap-2
                        rounded-md
                        bg-[var(--color-chip-bg)]
                        px-2
                        py-1
                        text-sm
                        text-[var(--color-chip-text)]
                     "
                  >
                     <span>{item}</span>

                     <button
                        type="button"
                        onClick={(e) => {
                           e.stopPropagation();
                           removeOption(item);
                        }}
                        className="text-xs font-bold text-[var(--color-chip-text)]"
                     >
                        ✕
                     </button>
                  </div>
               ))}
            </div>

            <img
               src={Arrow}
               alt="arrow"
               className="
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  w-3
                  h-3
                  pointer-events-none
               "
            />
         </div>

         {/* DROPDOWN */}
         {showOptions && (
            <div
               className="
                  absolute
                  z-10
                  mt-1
                  w-full
                  rounded-md
                  border
                  border-[var(--color-border)]
                  bg-[var(--color-white)]
                  shadow-md
               "
            >

               {/* SEARCH */}
               <div className="p-2 border-b border-[var(--color-border)]">
                  <SearchInput
                     value={searchTerm}
                     onChange={(e) =>
                        setSearchTerm(e.target.value)
                     }
                     placeholder="Search Group"
                  />
               </div>

               {/* OPTIONS */}
               <div className="max-h-60 overflow-y-auto">

                  {filteredOptions.length > 0 ? (
                     filteredOptions.map((item, index) => (
                        <div
                           key={index}
                           onClick={() => handleSelect(item)}
                           className="
                              cursor-pointer
                              px-4
                              py-3
                              text-sm
                              hover:bg-[var(--color-background)]
                           "
                        >
                           {item}
                        </div>
                     ))
                  ) : (
                     <div className="px-4 py-3 text-sm text-gray-500">
                        No options found
                     </div>
                  )}

               </div>
            </div>
         )}

         {/* ERROR */}
         {props.error && (
            <p className="mt-1 text-sm text-[var(--color-error)]">
               {props.error}
            </p>
         )}

      </div>
   );
}

export default MultiSelect;