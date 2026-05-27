
function SearchInput(props){

   return(

      <div className="relative w-[260px]">

         <input
            type="text"
            placeholder={props.placeHolder}
            value={props.value}
            onChange={props.onChange}
            className="
               h-11
               w-full
               rounded-md
               border
               border-[#d7d7e8]
               bg-white
               pl-4
               pr-10
               text-sm
               outline-none
               placeholder:text-gray-400
               focus:border-[#6b5cff]
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
               text-[#1c1c4d]
            "
         >
            ⌕
         </span>

      </div>

   )
}

export default SearchInput