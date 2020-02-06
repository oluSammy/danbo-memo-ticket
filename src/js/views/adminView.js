import {elements} from './base';


export const signInInput = ()=>{
    return {
        email: elements.signInEmail.value,
        password: elements.signInPass.value
    }
}

export const adminPage = (userEmail, deptObj)=>{
    const html = `
    <section class="sign-up-users body clearfix">
        <div class="sidebar float">
            <button class="sidebar-btn reg-users">Register User</button>
            <!--  <button class="sidebar-btn search-memo">Search Memos</button>
            <button class="sidebar-btn today-memo">Today's Memo</button>-->
            <div class="current-admin">
                <p>${userEmail}</p>
                <p>Admin</p>
            </div>
        </div>
        <div class="main-bowl float">
            <h5 class="main-bowl-header">Sign Up Users</h5>
            <form action="#" class="sign-up-users">
                <div class="input-set">
                    <label class="labels" for="first-name"> First Name:</label>
                    <input class="signup-first-name signup-input" type="text" name="first-name" id="first-name">

                    <label class="labels" for="last-name"> Last Name:</label>
                    <input class="signup-last-name signup-input" type="text" name="last-name" id="last-name">
                </div>
                <div class="input-set">
                    <label class="labels" for="signup-email">Email:</label>
                    <input class="signup-email signup-input" type="email" name="signup-email" id="signup-email">

                    <label class="labels" for="signup-pass">Password:</label>
                    <input class="signup-pass signup-input" type="password" name="signup-pass" id="signup-pass">

                    <div class="confirm-password">
                        <label class="labels signup-pass-confirm-label" for="signup-pass-confirm">Confirm Password:</label>
                        <input class="signup-pass-confirm signup-input" type="password" name="signup-pass-confirm" id="signup-password">
                    </div>
                </div>
                <div class="">
                    <label class="labels" for="signup-dept">Select Department:</label>
                    <select class="signup-input signup-dept">
                        <option value=""></option>
                        ${createDeptString(deptObj)}
                    </select>

                    <label class="labels" for="signup-designation">Designation:</label>
                    <input class="signup-input signup-designation" type="text">
                </div>
                <div class="">
                    <p class="signup-error-text"></p>
                    <button class="btn signup-btn" type="submit">Sign Up</button>
                </div>
            </form>
        </div>
    </section>
    `;
    elements.screen.insertAdjacentHTML('afterbegin', html);
};

export const signUpSuccess = (message)=>{
      const html = `
        <div class="popup">
            <div class="modal modal-succes">
                <a href="#" class="modal-succes-close modal-close">&times;</a>
                <h3 class="memo-reciever-modal">${message}</h3>
                <div class="memo-box clearfix">
                    <i class="fas fa-check-circle"></i>
                </div>
                <div class="cont-can ">
                    <button class="btn btn-close modal-close" type="submit">ok</button>
                </div>
            </div>
        </div>
        `;
        elements.screen.insertAdjacentHTML('afterbegin', html);
        // console.log('hello');
}

export const signUpError = (message)=>{
    const html = `
      <div class="popup">
          <div class="modal modal-succes">
              <a href="#" class="modal-succes-close modal-close">&times;</a>
              <h3 class="memo-reciever-modal">${message}</h3>
              <div class="memo-box clearfix">
                <i class="fas fa-exclamation-circle"></i>
              </div>
              <div class="cont-can ">
                  <button class="btn btn-close modal-close" type="submit">ok</button>
              </div>
          </div>
      </div>
      `;
      elements.screen.insertAdjacentHTML('afterbegin', html);
    //   console.log('hello');
};

const createDeptString = (deptObj)=>{
    let str = ``
    Object.values(deptObj).forEach(el=>{
        str += ` <option value="primary">${el}</option>`
    });
    return str;
};