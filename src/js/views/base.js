export const elements = {
    signInEmail: document.querySelector('.sign-in-email'),
    signInPass: document.querySelector('.sign-in-pass'),
    signInBtn: document.querySelector('.sign-in-btn'),
    errorText: document.querySelector('.error-text'),
    logOut: document.querySelector('.btn-logout'),
    screen: document.querySelector('.wrapper'),
    resetPass: document.querySelector('.forgot-password')
}

export const clearScreen = ()=>{
    elements.screen.innerHTML = '';
};

export const clearMainBowl = ()=>{
    document.querySelector('.main-bowl').innerHTML = '';
}

export const memoRecieversWait = ()=>{
    const html = `
        <div class="main-bowl-header">Send Memo To..</div>
        <div class="memo-spinner">
            <i class="fas fa-spinner"></i>
            <p class="spinner-text">wait...</p>
        </div>    
    `;
    document.querySelector('.main-bowl').insertAdjacentHTML('afterbegin', html);
}