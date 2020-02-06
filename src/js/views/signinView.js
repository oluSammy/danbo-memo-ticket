import {elements} from './base';

export const signInForm = ()=>{
    const html = `
        <div class="container sign-in">
            <div class="sign-in-box">
                <h3 class="sign-in-text">Sign In</h3>
                <form action="" class="sign-in-form">
                    <div class="margin-auto">
                        <input type="text" name="email" class="sign-in-email block sign-in-input" placeholder="EMAIL">
                        <input type="password" name="password" class="sign-in-pass block sign-in-input" placeholder="PASSWORD">  
                    </div>
                    <p class="error-text"></p>
                    <div class="form-action">
                        <button class="btn sign-in-btn"> Sign In <i class="fas fa-sign-in-alt"></i></button>
                        <a href="#" class="forgot-password">Forgot Password</a>
                    </div>
                </form>
                <p class="danbo-text">Danbo International Schools ICT</p>
            </div>
        </div>
    `;
    elements.screen.insertAdjacentHTML('afterbegin', html);
};


export const resetPass = ()=>{
    const html = `
        <div class="popup">
            <div class="modal modal-forgot-password">
                <a href="#" class="modal-succes-close modal-close forgot-close">&times;</a>
                <h3 class="memo-reciever-modal">Forgot Password</h3>
                <div class="memo-box clearfix">
                    <input type="email" name="reset" class="reset-password" placeholder="email">
                </div>
                <div class="cont-can ">
                    <button class="btn btn-close send-mail" type="submit">Reset Password</button>
                </div>
            </div>
        </div>
    `;
    elements.screen.insertAdjacentHTML('afterbegin', html);
}