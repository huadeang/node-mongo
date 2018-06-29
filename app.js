var mongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/admin';

console.log('app stated.');

mongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("admin");

    sumByItem(dbo);
    //sumByItemFilter(dbo,"item1");
    
    db.close();
    
   
  });


function sumByItem(dbo){
        dbo.collection('sales').aggregate(
            [
                {
                $group:
                    {
                    _id : "$item",totalQuantity : {$sum : "$quantity"}, count : {$sum : 1}
                    }
                },{
                    $sort :{
                        //length : 1
                        _id : 1
                    }
                }
            ]
        ,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                result.forEach(element => {
                    console.log(element);
                });
            }
        });
  }

  function sumByItemFilter(dbo,item){
    dbo.collection('sales').aggregate(
        [
            {
                $match:{
                    item:item
                }
            },
            {
            $group:
                {
                _id : "$item",totalQuantity : {$sum : {$multiply : ["$quantity","$price"]}}, count : {$sum : 1}
                }
            },
            {
                $sort:{
                    _id : 1
                }
            }
        ]
    ,(err,result)=>{
        if(err){
            console.log(err)
        }else{
            result.forEach(element => {
                console.log(element);
            });
        }
    });
}


  console.log('app stoped.');