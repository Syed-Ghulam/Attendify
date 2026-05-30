
function SearchInput(props){

   return(

      <div className="relative w-[260px]">

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
               border-[var(--color-border)]
               bg-[var(--color-white)]
               pl-4
               pr-10
               text-sm
               outline-none
               placeholder:text-gray-400
               focus:border-[var(--color-search-focus)]
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
               text-[var(--color-heading)]
            "
         >
            ⌕
         </span>

      </div>

   )
}

export default SearchInput