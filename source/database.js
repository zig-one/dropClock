let filename1="./data/timeset.json";
let filename2="./data/id.json";
let timedrops=[];
let ID=0;

//初始化
function readdata(){
    var fs=require('fs');
    if(fs.existsSync(filename1)){
        timedrops=JSON.parse(fs.readFileSync(filename1));
    }
   if(fs.existsSync(filename2)){
        ID=parseInt(JSON.parse(fs.readFileSync(filename2)));
    }
}
readdata();


//保存时间
function savedata(){  
    var fs = require('fs');
    fs.writeFileSync(filename1, JSON.stringify(timedrops));
    fs.writeFileSync(filename2, JSON.stringify(ID));
}


function add(item){
	item.enable="false";
	item.ID=ID;ID=ID+1;
	timedrops.unshift(item);
	savedata();
}

function deleteitem(ID){
	timedrops.forEach(function(item, index, arr) {
  		  if(item.ID==ID) {
   	  	   arr.splice(index, 1);
   		 }
		});
savedata();
}


function foreach(fun){
	 for(item in timedrops){fun(timedrops[item])}
}

//闹钟部分


module.exports={
foreach:foreach,
add:add,
deleteitem:deleteitem,
timedrops:timedrops
};


