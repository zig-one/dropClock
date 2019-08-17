var webalarm = require('../source/webbeep.js');
var localbeep = require('../source/Localbeep.js');
function BEEP(beepkind){
	if(beepkind=="") beepkind="defaut";
	localbeep(beepkind);
	webalarm.broadcast(" <audio id=\"myMusic\" autoplay=\"autoplay\" controls=\"controls\" > <source src=\"/public/music/"+beepkind+".mp3\" type=\"audio/mpeg\"></audio>");
}
module.exports=BEEP;

