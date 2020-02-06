import {auth} from './firebaseConfig';
import {elements} from '../views/base';
import {signUpSuccess} from '../views/adminView';

export const signInUsers = async (email, pass)=>{
    try{
        const user = await auth.signInWithEmailAndPassword(email, pass);
        // console.log(user);
        elements.errorText.innerHTML = '';
    }catch(e){
        if(e.code == 'auth/invalid-email'){
            elements.errorText.innerHTML = 'Email is invalid';
        }else if(e.code == 'auth/wrong-password'){
            elements.errorText.innerHTML = 'wrong-password';
        }
    }
};


export const forgotPassword = (email)=>{
    if(isEmailValid(email)){
        try{
            auth.sendPasswordResetEmail(email).then(el=>
                {
                    document.querySelector('.popup').style.visibility = 'hidden';
                    document.querySelector('.popup').style.opacity = '0';
                    signUpSuccess('email sent');
                })
        }catch(e){
            
        }
    }
}

const isEmailValid = (email)=>{
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(email.toLowerCase().match(re)){
        return true
    }else{
        alert(`email is invalid`);
        return false
    }
}