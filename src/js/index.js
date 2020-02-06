import {auth, db, functions} from './models/firebaseConfig';
import * as adminView from './views/adminView';
import * as userView from './views/userView';
import * as signInView from './views/signinView';
import * as createMemoView from './views/createMemoView';
import * as writeMemoView from './views/writeMemoView';
import * as signInUsers from './models/signIn';
import * as signUpUsers from './models/signup';
import * as createNewMemo from './models/createMemo';
import {elements, clearScreen, clearMainBowl, memoRecieversWait} from './views/base';




///////STATE
const state = {};
window.state = state;


//////////USER SIGN IN
const userSignIn = async ()=>{
    /////////Auth Status Changes////
    auth.onAuthStateChanged( async (user) =>{
        // state.user = user;
        if(user){
            ///display log out button
            elements.logOut.style.visibility = 'visible';
            elements.logOut.style.opacity = '1';
            // console.log(user.email);
            state.userMail = user.email;
            state.displayName = user.displayName;
            state.uid = user.uid;

            const tokenResult = await user.getIdTokenResult();
        // //    console.log(tokenResult.claims.admin);

            //////Clear signIn box
            clearScreen();

            /////If user is an admin, load the admin page else load the user page
            if(tokenResult.claims.admin){
                let allDept;
                db.collection('department').doc('WpsYF5hC5KJlhTLwVvnC').get()
                .then(doc=>{
                    allDept = doc.data();
                }).then(rep=>{
                    adminView.adminPage(user.email, allDept);
                })

           }else{
               
                   
                   const userDetails = await db.collection('users').where('uid', '==', state.uid).get();
                   state.userDepartment =(userDetails.docs[0].data().department);
                   state.userDesignation =(userDetails.docs[0].data().designation);
   
                   userView.userPage(state.userMail, state.displayName, state.userDepartment, state.userDesignation);
                   createNewMemo.getReceivedMemo();
                //    const receivedMemo = getReceivedMemo();
                //    window.reMemo = receivedMemo;
                // //    console.log(receivedMemo) ;                  
                //    userView.receivedMemo(receivedMemo);               
           }

        } else{
            ////Hide log out button
            elements.logOut.style.visibility = 'hidden';   
            elements.logOut.style.opacity = '0';

            //Clear the screen and display the signup box

            // console.log('user signed out');
            delete state.userDepartment;
            delete state.userMail;
            delete state.userDesignation;
            delete state.uid;
            delete state.displayName;
            
            // state.map().clear();
            // // console.log(state);
            // // console.log(user);
        }
    });

    ////////Sign In/////////
    elements.signInBtn.addEventListener('click', async (e)=>{
        e.preventDefault();
        await signInUsers.signInUsers(elements.signInEmail.value, elements.signInPass.value);
        // // console.log('user signed in');
    })

    ///////Sign Out//////
    elements.logOut.addEventListener('click', async ()=>{
        auth.signOut();
        // //console.log('user signed out');

        
        //Display login form
        clearScreen();
        signInView.signInForm();
    })
};
userSignIn();

const passwordReset = ()=>{
    elements.screen.addEventListener('click', (e)=>{
        if(e.target.closest('.forgot-password')){
            signInView.resetPass();
        }else if(e.target.closest('.send-mail')){
            let email = document.querySelector('.reset-password').value
            if(email){
                signInUsers.forgotPassword(email);
            }else{
                alert('Enter a valid Password');
            }
        }

    })
};
passwordReset();


//////USER SIGNUP

const userSignUp = ()=>{
    elements.screen.addEventListener('click', (e)=>{
        if(e.target.closest('.signup-btn')){
            e.preventDefault();
            let name = document.querySelector('.signup-first-name').value;
            let surName = document.querySelector('.signup-last-name').value;
            let email = document.querySelector('.signup-email').value;
            let pass1 = document.querySelector('.signup-pass').value;
            let pass2 = document.querySelector('.signup-pass-confirm').value;
            let dept = document.querySelector('.signup-dept').value;
            let designation = document.querySelector('.signup-designation').value;
            
            // console.log(signUpUsers.createUser(name,surName,email,pass1,pass2,dept,designation));
            
            if(signUpUsers.createUser(name,surName,email,pass1,pass2,dept,designation)){
                let displayName = `${name} ${surName}`;
                const newUser = functions.httpsCallable('createUser');
                newUser({
                    email: email,
                    pass: pass1,
                    displayName: displayName
                }).then(res=>{
                    db.collection('users').add({
                        name: name,
                        surname: surName,
                        email: email,
                        designation: designation,
                        department: dept,
                        uid: res.data.message,
                        pass: pass1
                    })
                }).then(()=>{
                    document.querySelector('.signup-first-name').value = '';
                    document.querySelector('.signup-last-name').value = '';
                    document.querySelector('.signup-email').value = '';
                    document.querySelector('.signup-pass').value = '';
                    document.querySelector('.signup-pass-confirm').value = '';
                    document.querySelector('.signup-dept').value = '';
                    document.querySelector('.signup-designation').value = '';
                    adminView.signUpSuccess('Done !');
                }).catch(e=>{
                    adminView.signUpError('Error! Try Again');
                })
            }else{
                // console.log('not ready');
            }
        } else if(e.target.closest('.modal-close')){
            document.querySelector('.popup').style.visibility = 'hidden';
            document.querySelector('.popup').style.opacity = '0';
        }
    })
}
userSignUp();

///////CREATE MEMO/////////

const createMemo =  ()=>{
    elements.screen.addEventListener('click', async(e)=>{
        if(e.target.closest('.create-memo')){
            state.memoReceivers = [];
            
            //  alert(`yup nigga, you bouto create a new memo`);
             
               //remove active class from sidebar btn 
               //add active class to create memo      
               createNewMemo.toggleSideBarClass('.create-memo');
               document.querySelector('.create-memo').classList.add('sidebar-active');

               //Clear main bowl =====>Create a function for this
               clearMainBowl();

               //load send memo to ...spinner  wait   
               memoRecieversWait();
               
               //get all departments                  
               const allDepartments =  await createNewMemo.getDepartments();
            //    console.log(allDepartments[0]);

               //get all users based on departments   |
               //display the list of departments and first set users
               db.collection('users').where('department', '==', allDepartments[0]).get().then(snapshot=>{
                let usersArray = []
                   snapshot.forEach(doc=>{
                       usersArray.push({displayName: `${doc.data().name} ${doc.data().surname}`, uid: `${doc.data().uid}`, designation: `${doc.data().designation}` });
                   })
                    clearMainBowl();
                   createMemoView.memoReceivers(allDepartments, usersArray);
               })               

               //clear spinner                        ||=======>function for this in base
               clearMainBowl();

               //load first dept and attach a class of each dept name
                // createMemoView.allDeptString(allDepartments);                //console.log(createMemoView.deptUsers(allUsers[0]));;
               //    createMemoView.memoReceivers();
         }
     });
 }
 createMemo();

 const selectDepartments = ()=>{
     elements.screen.addEventListener('click', async (e)=>{
         if(e.target.closest('.department-li')){
            const dept = e.target.dataset.dept;

             ///Clear officers
             createMemoView.clearOfficers();
             ///Load new officers
             db.collection('users').where('department', '==', dept).get().then(snapshot=>{
                let newArray = []
                   snapshot.forEach(doc=>{
                       newArray.push({displayName: `${doc.data().name} ${doc.data().surname}`, uid: `${doc.data().uid}`, designation: `${doc.data().designation}`});
                   })
                    createMemoView.newOfficers(newArray, dept);
                    const allReceivers = document.querySelectorAll('.memo-receive');
                    allReceivers.forEach(el=>{
                        if(state.memoReceivers.some(person => person.uid === el.dataset.uid)){  
                            el.checked = true;
                        }
                    })
                    let all = document.querySelector('.all');
                    [...allReceivers].every(isChecked) ? all.checked = true : all.checked = false;
               })
         }
     })
 }
 selectDepartments();

 const isChecked = (el)=>{
    return el.checked == true ? true : false;
 }

 
 const handleSelectAll = ()=>{
     elements.screen.addEventListener('change', (e)=>{
         const allReceivers = document.querySelectorAll('.memo-receive');
         if(e.target.closest('.all')){
            if(e.target.closest('.all').checked){
                 allReceivers.forEach(el=>{
                    if(state.memoReceivers.some(person => person.uid === el.dataset.uid)){  
                        
                    }else{
                        state.memoReceivers.push({displayName: `${el.dataset.name}`, uid: `${el.dataset.uid}`, designation: `${el.dataset.designation}`});
                    }
                    // if(state.memoReceivers.includes({displayName: `${el.dataset.name}`, uid: `${el.dataset.uid}`, designation: `${el.dataset.designation}`}) == false){
                    //     state.memoReceivers.push({displayName: `${el.dataset.name}`, uid: `${el.dataset.uid}`, designation: `${el.dataset.designation}`});                     
                    // //     // console.log(state.memoReceivers);
                    // }
                    el.checked = true;
                 })
            }else{
                allReceivers.forEach(el=>{
                    el.checked = false;                     
                         let index = state.memoReceivers.indexOf({displayName: `${el.dataset.name}`, uid: `${el.dataset.uid}`, designation: `${el.dataset.designation}`});
                         state.memoReceivers.splice(index, 1);                                              
                     
                }) 
            }
         }
         
     })   
 }
 handleSelectAll();

 /** */
 const selectReceiver = ()=>{
     elements.screen.addEventListener('change', e=>{
         if(e.target.closest('.memo-receive')){
             const targetReceiver = e.target.closest('.memo-receive');
             if(targetReceiver.checked){
                 if(state.memoReceivers.includes({displayName: `${targetReceiver.dataset.name}`, uid: `${targetReceiver.dataset.uid}`, designation: `${targetReceiver.dataset.designation}`}) === false){
                    //  console.log(false); 
                     state.memoReceivers.push({displayName: `${targetReceiver.dataset.name}`, uid: `${targetReceiver.dataset.uid}`, designation: `${targetReceiver.dataset.designation}`});
                 }
                 
             }else{   
                const index = state.memoReceivers.indexOf({displayName: `${targetReceiver.dataset.name}`, uid: `${targetReceiver.dataset.uid}`, designation: `${targetReceiver.dataset.designation}`});
                state.memoReceivers.splice(index, 1)
                
             }
         }
     })
 }
 selectReceiver();

 const checkReceiversList = ()=>{
     elements.screen.addEventListener('click', async e=>{
         if(e.target.closest('.btn-receiver')){
             e.preventDefault();
             createMemoView.showAllRecievers(state.memoReceivers, false);
         }else if(e.target.closest('.memo-others')){
            e.preventDefault();
            createMemoView.showAllRecievers(state.memoReceivers, true);
         }else if (e.target.closest('.btn-cancel-1')){
            createNewMemo.getReceivedMemo();
         }
     });
 }
 checkReceiversList();

 const modalBack = ()=>{
    elements.screen.addEventListener('click', async e=>{
        if(e.target.closest('.btn-modal-back')){
            document.querySelector('.popup').style.display = 'none';
        }
    });
}
modalBack();

const modalProceed = ()=>{
    elements.screen.addEventListener('click', async e=>{
        if(e.target.closest('.btn-modal-proceed')){
            //Remove popop
            document.querySelector('.popup').style.display = 'none';
            //clear main bowl
            clearMainBowl();
            //load write memo page
            writeMemoView.writePage(state, today());

        }
    });
}
modalProceed();


const today = ()=>{
    const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let today = new Date();
    return  `${today.getFullYear()}, ${month[today.getMonth()]} ${today.getDate()} ${today.getHours()}:${today.getMinutes()}`;
}

const createReceiversArray = (arr)=>{
    let allReceiverId = [];
    arr.forEach(el=>{
        allReceiverId.push(el.uid);
    })
    return allReceiverId;
};

const createReceiversDisplayNAme = (arr)=>{
    let allReceiverId = [];
    arr.forEach(el=>{
        allReceiverId.push({name: el.displayName, designation: el.designation});
    })
    return allReceiverId;
};

const sendMemo = ()=>{
    elements.screen.addEventListener('click', e=>{
        if(e.target.closest('.btn-create')){
            e.preventDefault();
            
            //Create an array of receivers id
            const receiversArray = createReceiversArray(state.memoReceivers);
            const receiversNameAndDesig = createReceiversDisplayNAme(state.memoReceivers);
            let subject = document.querySelector('.memo-subject-input');
            let content = document.querySelector('.content');

            if(subject.value && content.value){

                db.collection('memos').add({
                    senderId: state.uid,
                    sender: state.displayName,
                    date: firebase.firestore.Timestamp.fromDate(new Date(today())),
                    subject: subject.value,
                    content: content.value,
                    receivers: receiversArray,
                    receiversDetails: receiversNameAndDesig
                }).then(rep=>{
                    subject.value = '';
                    content.value = '';
                    createNewMemo.getReceivedMemo();
                    adminView.signUpSuccess('Memo Sent!');
                    // clearMainBowl();
                    
                })
            }else{
                alert('write memo subject and content');
            }
        }
    })
}
sendMemo();


const receivedMemo = ()=>{
    elements.screen.addEventListener('click', e=>{
        if(e.target.closest('.Recieved-memo')){
            createNewMemo.getReceivedMemo();
        } else if(e.target.closest('.btn-next')){
            createNewMemo.getNewReceivedMemo();
        }else if(e.target.closest('.table-row-receive')){
            let memoId = e.target.dataset.id;
            state.AllReceivedMemo.forEach(el=>{
                if(el.id == memoId){
                    // console.log(el.content);
                    userView.showReceivedMemo(el);
                }
            })
        }
    })
};
receivedMemo();

const sentMemos = ()=>{
    elements.screen.addEventListener('click', e=>{
        if(e.target.closest('.sent-memo')){
            createNewMemo.getSentMEmo();
        } else if(e.target.closest('.load-more-memos')){
            createNewMemo.getNewSentMEmo();
        }else if(e.target.closest('.table-row-sent')){
            state.allSentMemo.forEach(el=>{
                if(el.id == e.target.dataset.id) {
                    state.newReceivers = [];
                     el.receiversId.forEach(el1=>{
                        state.allUsers.forEach(user=>{
                            if(user.uid == el1){state.newReceivers.push({name: `${user.name} ${user.surname}`, designation: `${user.designation}`})};
                        })
                     })
                    userView.showSentMemo(el, state.newReceivers);
                }
            });
        }else if(e.target.closest('.memo-others-sent')){
            e.preventDefault();
            createMemoView.showAllRecievers(state.newReceivers, true);
            // console.log('We move');
        }
    })
};
sentMemos();




// const viewOthers = ()=>{
//     elements.screen.addEventListener('click', e=>{
//         if(e.target.closest('.memo-others')){

//         }
//     })
// }

/**
 *Important! DO NO DELETE!!!


 
//  const addAdmin = (userEmail)=>{
//      const addAdminRole = functions.httpsCallable('addAdminRole');
//      addAdminRole({email: userEmail}).then(result=>{
// //          console.log(result);
//      })
//  }
//  addAdmin('olumorinsammy@gmail.com');
*/
