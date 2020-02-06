import { elements } from "./base";
import {toggleSideBarClass} from '../models/createMemo'

export const memoReceivers = (deptArray, userArray)=>{
    const html = `
        <div class="main-bowl-header">Send Memo To..</div>
        

        <div class="memo-recievers-wrapper clearfix">
            <div class="memo-dept float">
                <h5 class="memo-reciever-header">Departments</h5>
                ${allDeptString(deptArray)}
                
            </div>
            <div class="memo-recievers float">
                <input type="checkbox" name="all" class="all" id="send-all">
                <label class="memo-all" for="all">Select All</label>
                <h5 class="memo-reciever-header"> ${deptArray[0]} Officers</h5>
                <form action="#" class="memo-recievers-list">
                   ${deptUsers(userArray)}
                </form>
            </div>
        </div>
        <div class="cont-can">
            <button class="btn btn-cancel-1 float" type="submit">Cancel</button>
            <button class="btn btn-receiver" type="submit">Continue</button>
        </div>
    `;
    document.querySelector('.main-bowl').insertAdjacentHTML('afterbegin', html);
};

export const allDeptString = (deptArray)=>{
    let string = ``;
    deptArray.forEach(el=>{
        string += `<li class = department-li data-dept="${el}">${el}</li>`
    })
    return string;
};

export const deptUsers = (usersArray)=>{
    let string =``;
    usersArray.forEach(el=>{
        string += `
            <div class="">
                <input type="checkbox" name="${el.displayName}" data-uid = ${el.uid} data-name="${el.displayName}" data-designation ="${el.designation}" class="memo-receive">
                <label class="memo-reciever-label" for="${el.displayName}"> ${el.displayName}</label>
            </div>
        `;
    })
    return string;
};

export const clearOfficers = ()=>{
    document.querySelector('.memo-recievers').innerHTML = '';
}

export const newOfficers = (userArray, dept)=>{
    const html = `
        <input type="checkbox" name="all" class="all" id="send-all">
        <label class="memo-all" for="all">Select All</label>
        <h5 class="memo-reciever-header"> ${dept} Officers</h5>
        <form action="#" class="memo-recievers-list">
        ${deptUsers(userArray)}
        </form>
    `;
    document.querySelector('.memo-recievers').insertAdjacentHTML('afterbegin', html);
}

export const showAllRecievers = (arr, write)=>{
    const html = `
        <div class="popup">
            <div class="modal modal-reciever">
                <h3 class="memo-reciever-modal">Memo Recievers</h3>
                <div class="memo-box clearfix">
                ${receiverString(arr)}
                </div>
                <div class="cont-can ">
                    <button class="btn btn-modal-back" type="submit">Back</button>
                    ${write?'':'<button class="btn btn-modal-proceed" type="submit">Proceed</button>'};
                </div>
            </div>
        </div>
    `;
    if(arr.length<1){
        alert('you have not selected a memo receiver');
    }else{
        elements.screen.insertAdjacentHTML('afterbegin', html);
    }
};

const receiverString = (receiverArr)=>{
    let string = ``;
    receiverArr.forEach(el=>{
        string += `
                <div class="float memo-reciever-container"> 
                    <p class="memo-reciever-name">${el.displayName}</p>
                    <p class="memo-reciever-desg float">${el.designation}</p>
                </div>
                                
        `;
    });
    return string;
}

export const memoSent = ()=>{
    
}