function ImgUploader(props){

   return(
      <div>
       <label className={props.labelClassName}>
        {props.label}
       </label>

         <label
            htmlFor="imageUpload"
            className={` flex h-[92px] w-[280px] cursor-pointer
                flex-col justify-center rounded-md border border-[#d8d2ff] bg-[#D5D5EC] px-4
            `}
         >

            <p className="text-[15px] font-semibold text-[#272757]">
               + Add Profile Image
            </p>

            <span className="mt-2 text-[10px] text-[#8a8aa8]">
               Image size should be less than 1MB, only .jpg, .jpeg,
               .png formats are allowed.
            </span>

         </label>

         <input
            id="imageUpload"
            type="file"
            accept="image/*"
            onChange={props.onChange}
            className="hidden"
         />

      </div>
   )
}

export default ImgUploader