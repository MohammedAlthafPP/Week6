var db=require('../config/connection')
var collection=require('../config/collections');
const async = require('hbs/lib/async');
const { reject } = require('bcrypt/promises');
const { response } = require("../app");
const collections = require('../config/collections');
var objectId = require('mongodb').ObjectId

module.exports={

    addProduct:(product,callback)=>{
        console.log(product);
        db.get().collection(collection.USER_COLLECTION).insertOne(product).then((data)=>{
            console.log(data);
            // callback(data.ops[0]._id);
            callback(true)
        })
    },

getAllProducts:()=>{
    return new Promise(async(resolve,reject)=>{
        let products=await db.get().collection(collection.USER_COLLECTION).find().toArray()
        resolve(products)
    })
},

// deleteProducts:(productId)=>{
// return new Promise((resolve,reject)=>{
//     db.get().collection(collection.PRODUCT_COLLECTION).removeOne({_id:objectId(productId)}).then((response)=>{
//         console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&"+response);
//         resolve(response)
//     })
// })
// }

deleteProducts:(productId)=>{
    return new Promise((resolve,reject)=>{
        db.get().collection(collections.USER_COLLECTION).remove({_id:objectId(productId)}).then((response)=>{
            resolve(response)
        })
        
    })
},

getProductDetails:(productId)=>{
    return new Promise((resolve,reject)=>{
        db.get().collection(collections.USER_COLLECTION).findOne({_id:objectId(productId)}).then((product)=>{
            resolve(product)
        })
    })
},

updateproduct:(productId,productDetails)=>{
    return new Promise((resolve,reject)=>{
        db.get().collection(collections.USER_COLLECTION)
        .updateOne({_id:objectId(productId)},{
            $set:{
                fname:productDetails.fname,
                Lname:productDetails.Lname,
                DOB:productDetails.DOB,
                inlineRadioOptions:productDetails.inlineRadioOptions,
                fEmail:productDetails.fEmail,
                fpassword:productDetails.fpassword
            }
            }).then((response)=>{
                resolve()
        })
    })
}


}