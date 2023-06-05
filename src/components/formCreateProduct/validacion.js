export default function Validation (input,setErrors,errors,e) {
    const regex = /^[0-9]+$/;
    let isValid = true;
    switch (e.target.name) {
        case 'name':
            if(!input.name)setErrors({...errors, name:'Campo Vacio'});
            else{
                if(input.name.length <4 ||input.name.length >40 ){
                    setErrors({...errors, name:'Debe tener entre 4 y 40 caracteres'});
                    isValid=false
                }
                if(isValid){
                    setErrors({...errors, name:''});
                }
            }
        break;
        case 'description':
            if(!input.description)setErrors({...errors, description:'Campo Vacio'});
            else{
                if(isValid){
                    setErrors({...errors, description:''});
                }
            }
        break;

        case 'img':
            console.log(input.img);
            if(!input.img)setErrors({...errors, img:'Campo Vacio'});
            else{
                if(isValid){
                    setErrors({...errors, img:''});
                }
            }
        break;

        case 'price':
            if(!input.price)setErrors({...errors, price:'Campo Vacio'});
            else{
                if(!regex.test(input.price)){
                    setErrors({...errors, price:'Solo se pueden ingresar numeros'});
                    isValid=false                   
                }
                if(isValid){
                    setErrors({...errors, price:''});
                }
            }
        break;

        case 'salePrice':
            if(!input.salePrice)setErrors({...errors, salePrice:'Campo Vacio'});
            else{
                if(!regex.test(input.salePrice)){
                    setErrors({...errors, salePrice:'Solo se pueden ingresar numeros'});
                    isValid=false                   
                }
                if(isValid){
                    setErrors({...errors, salePrice:''});
                }
            }
        break;

        case 'stock':
            if(!input.stock)setErrors({...errors, stock:'Campo Vacio'});
            else{
                if(!regex.test(input.stock)){
                    setErrors({...errors, stock:'Solo se pueden ingresar numeros'});
                    isValid=false                   
                }
                if(isValid){
                    setErrors({...errors, stock:''});
                }
            }
        break;

        case 'email':
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if(!input.email)setErrors({...errors, email:'Campo Vacio'});
            else{
                if (emailRegex.test(input.email)) {
                    setErrors({...errors, email:''});
                } else {
                    setErrors({...errors, email:'El mail es invalido'})
                }
            }

        break;

        case 'status':
            if(!input.status)setErrors({...errors, status:'Campo Vacio'});
            else{
                if(input.status==='*'){
                    setErrors({...errors, status:'*'})
                    isValid=false 
                }
                if(isValid){
                    setErrors({...errors, status:''}); 
                }
            }
        break

        case 'categories':
            if(!input.categories)setErrors({...errors, categories:'Campo Vacio'});
            else{
                if(input.categories==='*'){
                    setErrors({...errors, categories:'*'})
                    isValid=false 
                }
                if(isValid){
                    setErrors({...errors, categories:''}); 
                }
            }
        break
    
        default:
        break;
    }
}