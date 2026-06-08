
function SearchInput(props){

   return(

      <div className="relative w-full">

         <input
            id={props.id}
            type="text"
            placeholder={props.placeHolder}
            value={props.value}
            onChange={props.onChange}
            className="
               h-11
               w-full
               rounded-md
               border
               border-[var(--neutral-300)]
               bg-white
               pl-4
               pr-10
               text-sm
               outline-none
               placeholder:text-gray-400
               focus:border-[var(--primary-500)]
            "
         />



         {/* SEARCH ICON */}
         <span
            className="
               absolute
               right-3
               top-1/2
               -translate-y-1/2
               text-xl
               text-[var(--primary-900)]
            "
         >
            ⌕
         </span>

      </div>

   )
}

export default SearchInput