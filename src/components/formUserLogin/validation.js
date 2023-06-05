export default function Validation (input,setErrors,errors,e) {
    let isValid = true;
    switch (e.target.name) {
        case 'nickname':
            if(!input.nickname)setErrors({...errors, nickname:'Campo Vacio'});
            else{
                if(isValid){
                    setErrors({...errors, nickname:''});
                }
            }
        break;
        case 'password':
            if(!input.password)setErrors({...errors, password:'Campo Vacio'});
            else{
                if(isValid){
                    setErrors({...errors, password:''});
                }
            }
        break;
    
        default:
        break;
    }
}