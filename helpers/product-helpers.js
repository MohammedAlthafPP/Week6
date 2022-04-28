var db=require('../config/connection')
var collection=require('../config/collections');
const async = require('hbs/lib/async');

module.exports={

    addProduct:(product,callback)=>{
        console.log(product);
        db.get().collection('product').insertOne(product).then((data)=>{
            console.log(data);
            // callback(data.ops[0]._id);
            callback(true)
        })
    },

getAllProducts:()=>{
    return new Promise(async(resolve,reject)=>{
        let products=await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
        resolve(products)
    })
}


}