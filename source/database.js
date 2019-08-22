const lodashId = require('lodash-id');
const lodash = require('lodash');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('./data/db.json');
const db = low(adapter);
db._.mixin(lodashId);

const collection = db.defaults({ timeset: [] }).get('timeset');


function additem(item){
    //Insert a new alarm
  //  lodash.insert(db.timeset, item);
    collection.insert(item).write();
   
}

function deleteitem(ID){
   collection.removeById(ID).write();
}


function foreach(fun){	//console.log("coll",collection);
    var data=collection.value();
	 for(item in data){fun(data[item])}
}



module.exports={
foreach:foreach,
additem:additem,
deleteitem:deleteitem,
timeset:collection.value()
};


