/* -------------------------------------------
 * PRE CODE
 * -------------------------------------------
 */
you = "none"
if (location.href.indexOf("&play")!=-1)
{
 you = location.href.split("&play=")[1].split("&")[0]
 if (you.indexOf("#")!=-1)
 {
 you = you.split("#")[0]
 }
}
 camheight=1
  if(location.href.indexOf("base_level") != -1 && isNaN(parseInt(location.href.split("level=")[1]))){location.href = "index.html"}
 levelnumber = location.href.indexOf("base_level") != -1?parseInt(location.href.split("level=")[1]):0
 if (levelnumber == 15){alert("Good job ! You have finish all basics levels ! Congratulations !\n And now try to play Discord's levels !");location.href = 'index.html'}
	for (i=0;i<definedLevels[levelnumber].data.length;i++){
	for (j=0;j<definedLevels[levelnumber].data[0].length;j++){
	if (definedLevels[levelnumber].data[i][j]=='mario'){	
// 	if (location.href.indexOf('luigi') != -1)	definedLevels[levelnumber].data[i-1][j]='luigi'
// 	if (location.href.indexOf('peach') != -1)	definedLevels[levelnumber].data[i+1][j]='peach'
// 	if (location.href.indexOf('orange') != -1)	definedLevels[levelnumber].data[i-1][j-1]='orange'
// 	if (location.href.indexOf('blue') != -1)	definedLevels[levelnumber].data[i+1][j-1]='blue'
// 	if (location.href.indexOf('cyan') != -1)	definedLevels[levelnumber].data[i-1][j-2]='cyan'
// 	if (location.href.indexOf('indigo') != -1)	definedLevels[levelnumber].data[i+1][j-2]='indigo'
// 	if (location.href.indexOf('dark') != -1)	definedLevels[levelnumber].data[i-1][j-3]='dark'
// 	if (location.href.indexOf('yellow') != -1)	definedLevels[levelnumber].data[i+1][j-3]='yellow'
// 	if (location.href.indexOf('purple') != -1)	definedLevels[levelnumber].data[i-1][j-4]='purple'
	}
	}
	}
 
//  alert(location.origin)
 
counterplayer = 1
for (i=0;i<definedLevels[levelnumber].data.length-1;i++){
if (location.href.indexOf('luigi')!=-1){counterplayer += 1}
if (location.href.indexOf('peach')!=-1){counterplayer += 1}
if (location.href.indexOf('orange')!=-1){counterplayer += 1}
if (location.href.indexOf('blue')!=-1){counterplayer += 1}
if (location.href.indexOf('cyan')!=-1){counterplayer += 1}
if (location.href.indexOf('indigo')!=-1){counterplayer += 1}
if (location.href.indexOf('dark')!=-1){counterplayer += 1}
if (location.href.indexOf('yellow')!=-1){counterplayer += 1}
if (location.href.indexOf('cyan')!=-1){counterplayer += 1}
}
la100aine = 0
function newlive(){
ghref = parseInt(location.href.split("&lives=")[1].split("&")[0])
ghref -= 1
hashtag = 0
if (location.href.indexOf("#")!=-1)
	hashtag = parseInt(location.href.split("#")[1].split("&")[0])
nhref = location.href.split("&lives=")[0]
newlifes = ghref-(-hashtag)
nhref += "&lives="+newlifes
after = parseInt((ghref+1))
nhref += location.href.split("&lives="+after)[1].split("&")[0]
    	player = "&player="+location.href.split("&player=")[1].split("&")[0]
        salon= "&salon="+location.href.split("&salon=")[1].split("&")[0]
        play = "&play="+location.href.split("&play=")[1].split("&")[0]
        username = "&username="+location.href.split("&username=")[1].split("&")[0]
jref = nhref + "&coins="+numberCoin%100+username+player+salon+play
if (location.href.indexOf("&luigi")!=-1){jref += "&luigi"}
if (location.href.indexOf("&peach")!=-1){jref += "&peach"}
newhref = jref

if (document.getElementById('liveNumber').innerHTML < 1){
	newhref = location.href.split(".html")[0]
	newhref += ".html?"
	newhref += location.href.indexOf("menu.html")!=-1?"editor=0":"level=0"
if (location.href.indexOf("&luigi")!=-1){newhref += "&luigi"}
if (location.href.indexOf("&peach")!=-1){newhref += "&peach"}

        newhref += "&lives=4&coins=0"+username+player+salon+play
	}
	if(location.href.indexOf("editor=0")!=-1)
		newhref = newhref.replace("editor=0","editor=3")
}

adddeathplayer = 0
setInterval("if(adddeathplayer == counterplayer){newlive();setTimeout('location.href=newhref',4500);}",100)
		document.getElementById("finish").innerHTML ='<img id="finish_level" src="Content\/'+localStorage.getItem("attr")+'mario-finish.gif">'
