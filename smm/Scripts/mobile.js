leftpushed = 0
rightpushed = 0
uppushed = 0
speedpushed = 0
downpushed = 0

function leftpush()
{
if (!leftpushed)
{keys.handler(event, true,0,"left");document.getElementById("leftbutton").style.background="lightgreen";leftpushed=1}
else
{keys.handler(event, false,0,"left");document.getElementById("leftbutton").style.background="red";leftpushed=0}
}
function rightpush()
{
if (!rightpushed)
{keys.handler(event, true,0,"right");document.getElementById("rightbutton").style.background="lightgreen";rightpushed=1}
else
{keys.handler(event, false,0,"right");document.getElementById("rightbutton").style.background="red";rightpushed=0}
}
function uppush()
{
if (!uppushed)
{keys.handler(event, true,0,"up");document.getElementById("upbutton").style.background="lightgreen";uppushed=1}
else
{keys.handler(event, false,0,"up");document.getElementById("upbutton").style.background="red";uppushed=0}
}
function downpush()
{
if (!downpushed)
{keys.handler(event, true,0,"down");document.getElementById("downbutton").style.background="lightgreen";downpushed=1}
else
{keys.handler(event, false,0,"down");document.getElementById("downbutton").style.background="red";downpushed=0}
}
function speedpush()
{
if (!speedpushed)
{keys.handler(event, true,0,"fireball");document.getElementById("speedbutton").style.background="lightgreen";speedpushed=1}
else
{keys.handler(event, false,0,"fireball");document.getElementById("speedbutton").style.background="red";speedpushed=0}
}

function reloadlocalstorage()
{
	localStorage.setItem("leftpushed",leftpushed)
	localStorage.setItem("rightpushed",rightpushed)
	localStorage.setItem("uppushed",uppushed)
	localStorage.setItem("downpushed",downpushed)
	localStorage.setItem("speedpushed",speedpushed)
}
setInterval("reloadlocalstorage()",500)
document.getElementById("buttonscontrol").style.visibility = "hidden"
//alert(confirm("Have you keyboard ?"))
if(document.cookie.split("kb=")[1].split(";")[0]=="false"){document.getElementById("buttonscontrol").style.visibility = "visible"}
