import {db} from './firebaseConfig';
import {clearMainBowl} from '../views/base';
import * as userView from '../views/userView';

export const toggleSideBarClass = ()=>{
    const sideBars = document.querySelectorAll('.sidebar-btn');
    sideBars.forEach(btn=>{
        btn.classList.remove('sidebar-active');
    });
};

export const getDepartments = async ()=>{
   const departments = await db.collection('department').get()
   const allDepts = departments.docs[0].data()
//    console.log(allDepts);

   const allDepartments = []

   for(const prop in allDepts){
       allDepartments.push(allDepts[prop]);
   }
   return allDepartments;   
}

export const getAllUsers = async (depts)=>{
    const allUsers = [];
    depts.forEach(async (dept)=>{
        const users = await db.collection('users').where('department', '==', dept).get()
        let test = [];
        users.forEach(user=>{
            // test.push(`${user.data().name} ${user.data().surname} ${user.data().uid}`)
            test.push({diplayName: `${user.data().name} ${user.data().surname}`, uid: `${user.data().uid}` })
        })
        let array1 = new Array(...test);
        allUsers.push(array1);
        // console.log(allUsers.length);
    })
    // console.log(allUsers.length);
    return allUsers
}  

export const getReceivedMemo = ()=>{
    state.receiveQuery = db.collection('memos').where('receivers', 'array-contains', state.uid).orderBy('date', 'desc').limit(5);
    state.AllReceivedMemo = [];
    let allMemo = [];
    let all = [];
    state.receiveQuery.get().then(snapshot=>{
        snapshot.forEach((doc)=>{
            all.push(doc);
            let date = new Date((doc.data().date.seconds)*1000);
            let newDate = formatDate(date);

            allMemo.push({date: newDate, subject: doc.data().subject, content: doc.data().content, sender: doc.data().sender, id: doc.id})
            state.AllReceivedMemo.push({date: newDate, subject: doc.data().subject, content: doc.data().content, sender: doc.data().sender, id: doc.id})
        })
    }).then(rep=>{
        toggleSideBarClass();
        document.querySelector('.Recieved-memo').classList.add('sidebar-active');
        clearMainBowl();
        // memoString2(allMemo);
        userView.receivedMemo(allMemo);
        state.lastVisible = all[all.length -1];
    })
};

export const getNewReceivedMemo = ()=>{
    let newMemo = [];
    let all = [];
    try{
        db.collection('memos').where('receivers', 'array-contains', state.uid).orderBy('date', 'desc').startAfter(state.lastVisible).limit(5).get().then(snapshot=>{
            snapshot.forEach(doc=>{
                all.push(doc);
                let date = new Date((doc.data().date.seconds)*1000);
                let newDate = formatDate(date);
    
                newMemo.push({date: newDate, subject: doc.data().subject, content: doc.data().content, sender: doc.data().sender, id: doc.id})
                state.AllReceivedMemo.push({date: newDate, subject: doc.data().subject, content: doc.data().content, sender: doc.data().sender, id: doc.id})
            })
        }).then(rep=>{
                state.lastVisible = all[all.length -1];
                userView.addNewMemo(newMemo)
        })
    }catch(e){
        if(e.message == 'Function Query.startAfter() requires a valid first argument, but it was undefined.'){
            alert('all received memos have been loaded');
        };
    }
};

export const getSentMEmo = ()=>{
    state.allSentMemo = [];
    let allMemo = [];
    let all = [];
    db.collection('memos').where('senderId', '==', state.uid).orderBy('date', 'desc').limit(5).get().then(snapshot=>{
        snapshot.forEach((doc)=>{
            all.push(doc);
            let date = new Date((doc.data().date.seconds)*1000);
            let newDate = formatDate(date);

            allMemo.push({date: newDate, subject: doc.data().subject, content: doc.data().content, sender: doc.data().sender, id: doc.id, receiversId: doc.data().receivers})
            state.allSentMemo.push({date: newDate, subject: doc.data().subject, content: doc.data().content, sender: doc.data().sender, id: doc.id, receiversId: doc.data().receivers})
        })
    }).then(rep=>{
        state.allUsers = [];
        db.collection('users').get().then(snapshot=>{
            snapshot.forEach(doc=>{
                state.allUsers.push(doc.data());
            })
        })
    }).then(rep=>{
        toggleSideBarClass();
        document.querySelector('.sent-memo').classList.add('sidebar-active');
        clearMainBowl();
        // memoString2(allMemo);
        userView.sentMemo(allMemo);
        state.lastVisibleSent = all[all.length -1];
    })
};

export const getNewSentMEmo = ()=>{
    let allMemo = [];
    let all = [];
    try{
        db.collection('memos').where('sender', '==', state.displayName).orderBy('date', 'desc').startAfter(state.lastVisibleSent).limit(5).get().then(snapshot=>{
            snapshot.forEach((doc)=>{
                all.push(doc);
                let date = new Date((doc.data().date.seconds)*1000);
                let newDate = formatDate(date);
    
                allMemo.push({date: newDate, subject: doc.data().subject, content: doc.data().content, sender: doc.data().sender, id: doc.id, receiversId: doc.data().receivers})
                state.allSentMemo.push({date: newDate, subject: doc.data().subject, content: doc.data().content, sender: doc.data().sender, id: doc.id, receiversId: doc.data().receivers})
            })
        }).then(rep=>{
            db.collection('users').get().then(snapshot=>{
                snapshot.forEach(doc=>{
                    state.allUsers.push(doc.data());
                })
            })
        }).then(rep=>{
            state.lastVisibleSent = all[all.length -1];
            userView.newSentMemo(allMemo);
        })
    }catch(e){
        if(e.message == 'Function Query.startAfter() requires a valid first argument, but it was undefined.'){
            alert('all sent memos have been loaded');
        };
    }
    
};

const formatDate = (date)=>{
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let day = date.getDay();
    let month = date.getMonth();
    let year = date.getFullYear();
    let date1 = date.getDate();

    const days = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    let amOrPm = hours >= 12 ? 'PM' : 'AM';
    if(hours%12 == 0){
        hours = 12;
    }else if(hours>12){
        hours = hours%12;
    }else{
        hours = hours;
    }
    // hours = hours%12;
    // hours = hours ? hours : 12;

    return `${days[day]} ${months[month]} ${date1} ${year} - ${hours}:${minutes} ${amOrPm}`;
}

// export const getReceiversDetails = (receiversIds)=>{
//     let usersDetails = []
//     receiversIds.forEach(async (el)=>{
//         let details = await db.collection('users').where('uid', '==', el).get();
//         details.forEach(doc=>{
//             usersDetails.push({displayName: `${doc.data().name} ${doc.data().surname}`, designation: doc.data().designation });
//         })
//     })
//     return usersDetails;
// }