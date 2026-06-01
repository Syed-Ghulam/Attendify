import { useState } from "react";
import imgUpload from '../assets/icons/imgUpload.svg';

function ImgUploader(props){

   const[error, setError] = useState("");

   const handleFileChange = (e) =>{
      const file = e.target.files[0];

      if(!file) return;

      const allowedTypes = [
         "image/jpeg",
         "image/jpg",
         "image/png"
      ];
   

   if(!allowedTypes.includes(file.type)) {
      setError("Only JPG , JPEG and PNG files are allowed");
      return;
   }

   if(file.size > 1024 * 1024){
      setError("Image size must be less than 1 MB");
      return;
   }

   setError("");

   props.onChange(file);
   };
   
   return(
      <div>
       <label htmlFor="imageUpload"
       className={props.labelClassName}>
        {props.label}
       </label>

         <label
            htmlFor="imageUpload"
           className="
            flex h-[92px] w-[280px] cursor-pointer
            flex-col justify-center rounded-md
            border border-[var(--color-upload-border)]
            bg-[var(--color-primary-light)]
            px-4
            "
         >

          <div className="flex items-center gap-2">
            <img src={imgUpload} alt="uploadImage" className="h-5 w-5" />
            <span className="text-[15px] font-semibold text-[var(--color-secondary)]">
               Add Profile Image
            </span>
          </div>

            <span className="mt-2 text-[10px] text-[var(--color-upload-text)]">
               Image size should be less than 1MB, only .jpg, .jpeg,
               .png formats are allowed.
            </span>

         </label>

         <input
            id="imageUpload"
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={handleFileChange}
            className="hidden"
         />
          {error && (
            <p className="mt-1 text-sm text-[var(--color-error)]">
               {error}
            </p>
          )}
      </div>
   )
}

export default ImgUploader;