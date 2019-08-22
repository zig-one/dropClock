var schedule = require('node-schedule');

function scheduleCronstyle(){
schedule.scheduleJob('1 * * * * *',alarm);
}

scheduleCronstyle();

let BEEP=require('./beep.js');//BEEP(beepkind)
let timeTable=require('./database.js');



function reset(item){		//引用
    item.enable="false";
}


function alarm(){
   console.log("Alaram");
    var now = new Date();
    var hour=now.getHours();
    var minu=now.getMinutes();;
    timeTable.foreach((item)=>{ //item is like {"name":"","time":"","content":"","beepkind":"default","enable":"false","ID":0}
//	console.log("item",item);
        var enable=item.enable;
        var time=item.time;
        var nhour=parseInt(time.substring(0,2));
        var nminu=parseInt(time.substring(3,5));
        //console.log(nhour);
        if(nhour==hour&&nminu==minu){
                console.log("Alarm");
                BEEP(item.beepkind);
        }

    });
}

module.exports={
    alarm:alarm,
};

