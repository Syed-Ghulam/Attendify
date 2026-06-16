export const validateRequired = (value, fieldName) => {
    if(!value?.trim())
        return `${fieldName} is required`;
    return "";
};

export const validateSelect = (value, fieldName) => {
    if(!value)
        return `${fieldName} is required`;
    return "";
};

export const validateIpAddress = (value) => {

  const ipRegex =
  /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]\d?|0)\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]\d?|0)\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]\d?|0)\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]\d?|0)$/;

  if (!value.trim()) {
    return "IP Address is required";
  }

  if (!ipRegex.test(value)) {
    return "Please enter a valid IP Address";
  }

  return "";
};

export const validateName = (value, fieldName) => {
    if(!value.trim())
        return `${fieldName} is required`;

     if (!/^[A-Za-z\s]+$/.test(value)) 
        return `Enter Valid ${fieldName}`;

    return "";
};

export const validateOptionalName = (value, fieldName) => {
      if (value.trim() &&!/^[A-Za-z\s]+$/.test(value)) 
           return `Enter Valid ${fieldName}`;
  

  return "";
};

export const validateEmail = (value) => {

  if (!value.includes("@") || !value.includes(".")) 
      return "Enter valid Email";

  return "";
};

export const validatePhone = (value) => {

  if (!value.trim() || !/^[6-9]\d{9}$/.test(value) || /(\d)\1{4,}/.test(value)) 
    return "Enter Valid Phone Number";
  
  return "";
};

export const validateDob = (value) => {
    if (!value) 
       return "";


  const dob = new Date(value);

  if (isNaN(dob.getTime())) 
    return "Enter valid Date of Birth";

  const today = new Date();

  const hundredYearsAgo = new Date();
  hundredYearsAgo.setFullYear(today.getFullYear() - 100);

  if (dob > today || dob < hundredYearsAgo ) 
    return "Enter valid Date of Birth";

  return "";
}
