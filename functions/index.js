const functions = require('firebase-functions');
const admin = require('firebase-admin'); 
admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, context)=>{
    //get user and add custom claim
    return admin.auth().getUserByEmail(data.email)
    .then((user)=>{
        return admin.auth().setCustomUserClaims(user.uid, {
            admin: true
        })
    }).then(()=>{
        return{
            message: `Success ${data.email} has been named as an admin`
        }
    }).catch(e=>{
        return e;
    })
});

exports.createUser = functions.https.onCall((data, context)=>{
    return admin.auth().createUser({
        email: data.email,
        password: data.pass,
        displayName: data.displayName
    }).then(userRecord =>{
        return {
            message: `${userRecord.uid}`
        }
    }).catch(e=>{
        return e;
    })
});


////Add Admin
// const addAdmin = (userEmail)=>{
//     const addAdminRole = functions.httpsCallable('addAdminRole');
//     addAdminRole({email: userEmail}).then(result=>{
//         console.log(result);
//     })
// }
// addAdmin('olumorinsammy@gmail.com');
