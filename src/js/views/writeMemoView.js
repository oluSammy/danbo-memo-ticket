export const writePage = (state, today)=>{
    const html = `
        <div class="main-bowl-header">Create Memo...</div>
        <div class="memo-top clearfix">
            <div class="memo-top-from float">
                <div class="memo-from clearfix">
                    <div class="from float">FROM:</div>
                    <div class="sender-info float">
                        <p class="sender-name memo-top-info">${state.displayName}</p>
                        <p class="designation memo-top-info">${state.userDesignation}</p>
                        <p class="sender-mail memo-top-info">${state.userMail}</p>
                    </div>
                </div>
            </div>
            <div class="memo-top-to float">
                <div class="clearfix">
                    <div class="from float">TO:</div>
                    <div class="sender-info float">
                        ${receiversString(state.memoReceivers)}
                    </div>
                </div>
            </div>
        </div>
        <div class="memo-subject">
            <div class="clearfix">

                <div class="float">
                    <label for="memo-subject-text" class="memo-subject-label from">SUBJECT:</label>
                    <input class="memo-subject-input" type="text" name="memo-subject-text" id="">
                </div>
            </div>
            <div class="clearfix">   
                <div class="memo-date float">
                    <div class="date-label from">DATE:</div>
                </div>         
                <div class="memo-date float">
                    <div class="date-label from">${today}</div>
                </div>
            </div>
        </div>    
        <div class="memo-content clearfix">
            <div class="memo-content-text from float">CONTENT:</div>
            <div class="paragraphs float">
                <textarea class="paragraph block content" name="paragraph" id="paragraph-1" cols="70" rows="10" placeholder="Content"></textarea>
            </div>
        </div>            
        <a class="add-para" href="" style="display: none"><span><i class="fas fa-plus-square"></i></span>Add Paragraph</a>
        <div class="cont-can">
            <button class="btn btn-cancel-2" type="submit">Cancel</button>
            <button class="btn btn-create" type="submit">Send Memo</button>
        </div>
    `;
    document.querySelector('.main-bowl').insertAdjacentHTML('afterbegin', html);
};

const receiversString = (memoReceivers)=>{
    let string = ``;
    memoReceivers.forEach((el, index)=>{
        if(index < 3){
            string += `<p class="sender-name memo-top-info">${el.displayName};</p>`;
        }
    })
        if(memoReceivers.length > 3){
            string += `<p class="memo-others">and ${state.memoReceivers.length - 3} others <a href="">View all</a></p>`;
        }
    return string;
};