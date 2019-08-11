

var exec = require('child_process').exec; 


let filename1="timeset.json";
let filename2="id.json";
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
	ID=ID+1;
}
readdata();
//保存时间
function savedata(){  
    var fs = require('fs');
    fs.writeFileSync(filename1, JSON.stringify(timedrops));
    fs.writeFileSync(filename2, JSON.stringify(ID));
}





var fs = require('fs'),
    http = require('http'),
    sio = require('socket.io');
let url = require('url')
let template = require('art-template')
var server = http.createServer(function(req, res) {
    let obj = url.parse(req.url, true) // 得到url模板解析后的Url对象，传入第二个参数“true”，将form表单提交的查询字符串query转换成对象
    let pathname = obj.pathname
    let query = obj.query
   if (pathname === '/') {
        fs.readFile('./public/views/index.html', (err, data) => {
            if (err) {
                return res.end('404 NOT FOUND')
            }
            let htmlStr = template.render(data.toString(), {
                comments:timedrops
            })
            res.end(htmlStr)
        })
    }  else if (pathname.indexOf('/public/') === 0){
        fs.readFile('.'+pathname, (err, data) => {
            if (err) {
                return res.end('404 NOT FOUND')
            }
            res.end(data)
        })
    }  else if (pathname ==='/post') {
        fs.readFile('./public/views/post.html', (err, data) => {
            if (err) {
                return res.end('404 NOT FOUND')
            }
            res.end(data)
        })
    } else if (pathname === '/add') {
        res.statusCode = 302      // 设置响应状态码为302(重定向)
        res.setHeader('location', '/') // 设置响应头location，告诉浏览器重定向地址
        if (query.time) {
            query.enable="false";
	    query.ID=ID;ID=ID+1;
            timedrops.unshift(query);
            savedata();
        } // 放置用户手动输入'/add'，导致query为空
        res.end()  // 结束响应，不能少
    }else if (pathname === '/delete') {
        	res.statusCode = 302      // 设置响应状态码为302(重定向)
       		 res.setHeader('location', '/') // 设置响应头location，告诉浏览器重定向地址
		ID=query.ID;
		timedrops.forEach(function(item, index, arr) {
  		  if(item.ID==ID) {
   	  	   arr.splice(index, 1);
   		 }
		});
       	 	//console.log(query);
     	   res.end()  // 结束响应，不能少
    }
     

});
server.listen(8000, function() {
  console.log('Server listening at http://localhost:8000/');
});
// Attach the socket.io server
io = sio.listen(server);



// Define a message handler
io.sockets.on('connection', function (socket) {
  socket.on('message', function (msg) {});});

//	setInterval((socket)=>{io.emit('message'," <audio id=\"myMusic\" autoplay=\"autoplay\"> <source src=\"/public/music/4.mp3\" type=\"audio/mpeg\"></audio>  ");},10*1000);





//闹钟部分
function reset(it){

    //console.log(it);
    timedrops[it].enable="false";
}
function alarm(){
    var now = new Date();
    var hour=now.getHours();
    var minu=now.getMinutes();

    for(item in timedrops){
        enable=timedrops[item].enable;
        time=timedrops[item].time;
        nhour=parseInt(time.substring(0,2));
        nminu=parseInt(time.substring(3,5));

        if(nhour==hour&&nminu==minu){
            if(enable=="false") {
                BEEP(timedrops[item].beepkind);
                timedrops[item].enable="true";
                setTimeout(reset,2*60*1000,item);
            }
        }
    }
}
setInterval(alarm,500);

function BEEP(beepkind){
    if(beepkind=="") beepkind="defaut";
     exec("mplayer ./public/music/"+beepkind+".*");
     io.emit('message'," <audio id=\"myMusic\" autoplay=\"autoplay\" controls=\"controls\" > <source src=\"/public/music/"+beepkind+".mp3\" type=\"audio/mpeg\"></audio>");
	//console.log("emit");
}

BEEP("start");






