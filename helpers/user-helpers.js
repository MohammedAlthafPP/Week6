// var db = require("../config/connection");
// var collection = require("../config/collections");
// const bcrypt = require("bcrypt"); //taking bcrypt here
// const { promise, reject } = require("bcrypt/promises");
// const async = require("hbs/lib/async");
// const { response } = require("../app");
// const { status } = require("express/lib/response");

// module.exports = {
//   //========================== password encoding=================
//   doSignup: (userData) => {
//     return new Promise(async (resolve, reject) => {
//       userData.fpassword = await bcrypt.hash(userData.fpassword, 10); //solt round ,default value is 10
//       db.get()
//         .collection(collection.USER_COLLECTION)
//         .insertOne(userData)
//         .then(response);
//       resolve(response);
//     });
//   },

//   //======================== login method =============
//   doLogin: (userData) => {
//     return new Promise(async (resolve, reject) => {
//       var loginStatus = false;
//       var response = {};
//       console.log(userData);
//       var user = await db
//         .get()
//         .collection(collection.USER_COLLECTION)
//         .findOne({ fEmail: userData.userName });
//       if (user) {
        
//         bcrypt.compare(userData.password, user.fpassword).then((status) => {
//           if (status) {
//             console.log("%%%%%%%%%%%%% login success $$$$$$$$$$$$$$$$$$$$$$$$$$$$");
//             response.user=user
//             response.user=true
//             resolve(response)
//           } else {
//             console.log("******************* login faile ************************");
//             resolve({status:false})
//           }
//         });
//       } else {
//         console.log("%%%%%%%%%%%%%%%%%%%%% Accsess prohibited %%%%%%%%%%%%%%%%%%%%%");
//         resolve({status:false})
//       }
//     });
//   },
// };




const db = require("../config/connection");
const collection = require("../config/collections");
const bcrypt = require("bcrypt");
const { reject } = require("bcrypt/promises");
const async = require("hbs/lib/async");
const { response } = require("../app");
const { status } = require("express/lib/response");

module.exports = {
    doSignup: (userData) => {
        return new Promise(async (resolve, reject) => {
            userData.fpassword = await bcrypt.hash(userData.fpassword, 10);
            db.get()
                .collection(collection.USER_COLLECTION)
                .insertOne(userData)
                .then(response);
            resolve(response);
        });
    },
    doLogin: (userData) => {
        return new Promise(async (resolve, reject) => {
            let loginStatus = false;
            let response = {};
            let user = await db
                .get()
                .collection(collection.USER_COLLECTION)
                .findOne({ fEmail: userData.userName });
            if (user) {

                bcrypt.compare(userData.password, user.fpassword).then((status) => {
                    if (status) {
                        console.log("$$$$$$$$$  login success $$$$$$$$$$$");
                        response.user = user
                        response.status = true
                        resolve(response)
                    } else {
                        console.log("*********** login failed ***************");
                        resolve({ status: false })
                    }
                });
            } else {
                console.log('%%%%%%%%%%%%%%%%%%% Access Prohibited %%%%%%%%%%%%%%%%')
                resolve({ status: false })
            }
        });
    },
};
