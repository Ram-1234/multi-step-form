export default {
    alphabets: /^([A-Za-z\s])+$/,
    aplhaNumeric: /^[a-zA-Z0-9\s]+$/,
    mobile: {
      length: 10,
      regex: /^[6-9][0-9]{9}$/
    },
    password:{
      regex:/^(?=.*[A-Z].*[A-Z])(?=.*[a-z].*[a-z])(?=.*\d.*\d)(?=.*[@$!%*?&].*[@$!%*?&])[\w@$!%*?&]{8,}$/,
    },
    email:{
        length:50,
        regex:/\S+@\S+\.\S+|^$/
    },
    address: {
      min: 8,
      max: 100
    },
  }
  
  