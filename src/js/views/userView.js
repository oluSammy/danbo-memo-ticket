import {elements} from './base';

export const userPage = (userMail, userDisplayName, userDept, userDesignation)=>{
    const html = `
        <section class="users-dashboard body clearfix">
            <div class="sidebar float">
                <button class="sidebar-btn create-memo">Create Memo</button>
                <button class="sidebar-btn Recieved-memo sidebar-active">Recieved Memos</button>
                <button class="sidebar-btn sent-memo">Sent Memos</button>
                <div class="current-user">
                    <p class="user-profile user-mail">${userMail}</p>
                    <p class="user-profile user-dept">${userDisplayName}</p>
                    <p class="user-profile user-dept">Department: ${userDept}</p>
                    <p class="user-profile user-position">Designation: ${userDesignation}</p>
                </div>
            </div>
            <div class="main-bowl float">   
                <div class="main-bowl-header">Recieved Memos</div>      
                <div class="memo-spinner">
                    <i class="fas fa-spinner"></i>
                    <p class="spinner-text">wait...</p>
                </div>
            </div>
        </section> 
    `;
    elements.screen.insertAdjacentHTML('afterbegin', html);
};


export const receivedMemo = (arr)=>{
    const html = `
        <div class="main-bowl-header">Received Memos</div>      
        <table class="table">
        <thead class="table-head">
            <tr class="table-row">
                <th>Date Received</th>
                <th>Subject</th>
                <th>Sender</th>
            </tr>
        </thead>
        <tbody class="table-body">
            ${memoString2(arr, 'receive')}
        </tbody>
    </table>
    <div class="pagination">
        <button class="btn btn-next" type="submit">Load More <i class="fas fa-arrow-circle-right"></i></button>
    </div>
    <div class="read-memo"></div>
    `;
    document.querySelector('.main-bowl').insertAdjacentHTML('afterbegin', html);
    // console.log(memoString(arr));
    // console.log(arr);
};

export const sentMemo = (arr)=>{
    const html = `
        <div class="main-bowl-header">Sent Memos</div>      
        <table class="table">
        <thead class="table-head">
            <tr class="table-row">
                <th>Date Sent</th>
                <th>Subject</th>
                <th>Recievers</th>
            </tr>
        </thead>
        <tbody class="table-body">
            ${memoString2(arr, 'sent')}
        </tbody>
    </table>
    <div class="pagination">
        <button class="btn load-more-memos" type="submit">Load More <i class="fas fa-arrow-circle-right"></i></button>
    </div>
    <div class="read-memo"></div>
    `;
    document.querySelector('.main-bowl').insertAdjacentHTML('afterbegin', html);
    // console.log(memoString(arr));
    // console.log(arr);
};

export const addNewMemo = (newList)=>{
    let html = `
        ${memoString2(newList, 'receive')}
    `;
    document.querySelector('.table-body').insertAdjacentHTML('beforeend', html);
};

export const newSentMemo = (newList)=>{
    let html = `
        ${memoString2(newList, 'sent')}
    `;
    document.querySelector('.table-body').insertAdjacentHTML('beforeend', html);
};

export const showReceivedMemo = (el)=>{
    document.querySelector('.read-memo').innerHTML = '';
    let html = `
    <div class="main-bowl-header"> Memo</div>
    <div class="memo-top clearfix">
        <div class="memo-top-from float">
            <div class="memo-from clearfix">
                <div class="from float">FROM:</div>
                <div class="sender-info float">
                    <p class="sender-name memo-top-info">${el.sender}</p>
                </div>
            </div>
        </div>
        <div class="memo-top-to float">
            <div class="clearfix">
                <div class="from float">TO:</div>
                <div class="sender-info float" style="font-size: 1.6rem">
                    ${state.displayName}
                </div>
            </div>
        </div>
    </div>
    <div class="memo-subject">
        <div class="clearfix">

            <div class="float">
                <label for="memo-subject-text " class="memo-subject-label from">SUBJECT:</label>
                <input class="memo-subject-input memo-subj" readonly type="text" name="memo-subject-text" id="">
            </div>
        </div>
        <div class="clearfix">   
            <div class="memo-date float">
                <div class="date-label from">DATE:</div>
            </div>         
            <div class="memo-date float">
                <div class="date-label from">${el.date}</div>
            </div>
        </div>
    </div>    
    <div class="memo-content clearfix">
        <div class="memo-content-text from float">CONTENT:</div>
        <div class="paragraphs float">
            <textarea class="paragraph block content" name="paragraph" id="paragraph-1" cols="70" rows="10" readonly>${el.content}</textarea>
        </div>
    </div>            
    <a class="add-para" href="" style="display: none"><span><i class="fas fa-plus-square"></i></span>Add Paragraph</a>
    `;
    document.querySelector('.read-memo').insertAdjacentHTML('afterbegin', html);
    document.querySelector('.memo-subj').value = el.subject;
};

export const showSentMemo = (el,arr)=>{
    document.querySelector('.read-memo').innerHTML = '';
    let html = `
    <div class="main-bowl-header"> Memo</div>
    <div class="memo-top clearfix">
        <div class="memo-top-from float">
            <div class="memo-from clearfix">
                <div class="from float">FROM:</div>
                <div class="sender-info float">
                    <p class="sender-name memo-top-info">${el.sender}</p>
                </div>
            </div>
        </div>
        <div class="memo-top-to float">
            <div class="clearfix">
                <div class="from float">TO:</div>
                <div class="sender-info float" style="font-size: 1.6rem">
                    ${receiversString(arr)}
                </div>
            </div>
        </div>
    </div>
    <div class="memo-subject">
        <div class="clearfix">

            <div class="float">
                <label for="memo-subject-text " class="memo-subject-label from">SUBJECT:</label>
                <input class="memo-subject-input memo-subj" readonly type="text" name="memo-subject-text" id="">
            </div>
        </div>
        <div class="clearfix">   
            <div class="memo-date float">
                <div class="date-label from">DATE:</div>
            </div>         
            <div class="memo-date float">
                <div class="date-label from">${el.date}</div>
            </div>
        </div>
    </div>    
    <div class="memo-content clearfix">
        <div class="memo-content-text from float">CONTENT:</div>
        <div class="paragraphs float">
            <textarea class="paragraph block content" name="paragraph" id="paragraph-1" cols="70" rows="10" readonly>${el.content}</textarea>
        </div>
    </div>            
    <a class="add-para" href="" style="display: none"><span><i class="fas fa-plus-square"></i></span>Add Paragraph</a>
    `;
    document.querySelector('.read-memo').insertAdjacentHTML('afterbegin', html);
    document.querySelector('.memo-subj').value = el.subject;
};


const memoString2 = (memoList, sentOrReceive)=>{
    let string = ``;
    memoList.forEach(doc=>{
      string += `
        <tr class="table-row table-row-${sentOrReceive == 'receive'? 'receive' : 'sent'}" data-id ="${doc.id}">
            <td data-id ="${doc.id}">${doc.date}</td>
            <td data-id ="${doc.id}">${limitChars(doc.subject)}</td>
            <td data-id ="${doc.id}">${doc.sender}</td>
        </tr>
      `;
    })
    return string;
};

const limitChars =(str)=>{
    return str.length > 65 ? str.substring(0, 65) + '...' : str;
};

const receiversString = (memoReceivers)=>{
    let string = ``;
    memoReceivers.forEach((el, index)=>{
        if(index < 3){
            string += `<p class="sender-name memo-top-info">${el.name}; <span>${el.designation}</span></p>`;
        }
    })
        if(memoReceivers.length > 3){
            string += `<p class="memo-others-sent">and ${memoReceivers.length - 3} others <a href="">View all</a></p>`;
        }
    return string;
};