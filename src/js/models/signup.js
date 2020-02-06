
export const createUser = (firstName, lastName, email, pass1, pass2, dept, designation)=>{

    return (validateName(firstName, 'First Name') && validateName(lastName, 'Sur Name') && isEmailValid(email) 
       &&  validatePassword(pass1) && confirmPassword(pass2, pass1) && validateDept(dept) && validateDesignation(designation))
}

 const validateName = (name, firstName)=>{
    let letters = /^[A-Za-z]+$/;
    if(name.match(letters)){
        return true;
    }else if(name === ''){
        document.querySelector('.signup-error-text').innerHTML = `${firstName} must not be empty`;
        return false;
    }else{
        document.querySelector('.signup-error-text').innerHTML = `${firstName} must contain only letters`;
        return false
    }
};

const validatePassword = (pass1)=>{
    if(pass1.length >= 6){
        return true;
    }else{
        document.querySelector('.signup-error-text').innerHTML = `password must be at least 6 characters`;
        return false
    }
    
};

const confirmPassword = (pass2, pass1)=>{
    if(pass2 == pass1){
        return true;
    }else{
        document.querySelector('.signup-error-text').innerHTML = `passwords don't match`;
        return false
    }
}

const isEmailValid = (email)=>{
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(email.toLowerCase().match(re)){
        return true
    }else{
        document.querySelector('.signup-error-text').innerHTML = `email is invalid`;
        return false
    }
}

const validateDept = (dept)=>{
    if(dept !== ''){
        return true;
    }else{
        document.querySelector('.signup-error-text').innerHTML = `Select Department`;
        return false
    }
}

const validateDesignation = (designation)=>{
    if(designation !== ''){
        return true;
    }else{
        document.querySelector('.signup-error-text').innerHTML = `designation must not be empty`;
        return false
    }
}
