var mongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/admin';

console.log('app stated.');
/*
var sales = [
    { "item" : "item1", "price" : 10, "quantity" : 10, "date" : new Date() },
    { "item" : "item2", "price" : 11, "quantity" : 10, "date" : new Date() },
    { "item" : "item3", "price" : 12, "quantity" : 10, "date" : new Date() },
    { "item" : "item4", "price" : 13, "quantity" : 10, "date" : new Date() },
    { "item" : "item5", "price" : 14, "quantity" : 10, "date" : new Date() },
    { "item" : "item6", "price" : 15, "quantity" : 10, "date" : new Date() },
    { "item" : "item7", "price" : 16, "quantity" : 10, "date" : new Date() },
    { "item" : "item8", "price" : 17, "quantity" : 10, "date" : new Date() },
    { "item" : "item9", "price" : 18, "quantity" : 10, "date" : new Date() },
    { "item" : "item10", "price" : 19, "quantity" : 10, "date" : new Date() }
]
*/
mongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("admin");

    var sales = [];
    var id = 1;
    for(var i=1;i<=1000;i++){
        for(var j=1;j<=10;j++){
            sales.push({"_id":id, "item" : "item"+j, "price" : 10, "quantity" : 10, "date" : new Date() });
            id++;
        }
    }

        dbo.collection('sales').insertMany(sales,(err,result)=>{
            if(err){
                console.log(`insert error ${err}`);
            }else{
                console.log('insert success.');
            }
            db.close();
        });
    
});