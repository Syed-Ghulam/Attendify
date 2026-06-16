import icons from "../assets/icons/index.js";

function Icon ({name, alt = "" , className = "",...props}){

    const icon = icons[name];

    if(!icon){
        console.warn(`Icon ${name} not found`);
        return null;
    }
        return (
            <img 
               src={icons[name]} 
               alt={alt || name}
               className={className}
               {...props} 
            />
        );
}
export default Icon;