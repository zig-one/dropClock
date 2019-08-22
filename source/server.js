var timedb=require('../source/database.js');

var fs = require('fs'),
    http = require('http');

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
                comments:timedb.timeset
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
           timedb.additem(query);
        } // 放置用户手动输入'/add'，导致query为空
        res.end()  // 结束响应，不能少
    }else if (pathname === '/delete') {
        	res.statusCode = 302      // 设置响应状态码为302(重定向)
       		res.setHeader('location', '/') // 设置响应头location，告诉浏览器重定向地址
		    timedb.deleteitem(query.ID);
       	 	//console.log(query);
     	   res.end()  // 结束响应，不能少
    }
     

});
server.listen(8000, function() {
  console.log('Server listening at http://localhost:8000/');
});
module.exports={
server:server
};

