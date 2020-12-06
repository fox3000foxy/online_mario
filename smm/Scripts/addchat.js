  menu = document.createElement("ul")
  menu.setAttribute("src","addchat.js")
  menu.setAttribute("style","position:absolute;right:0;top:-16px;width:17.55%;height:100%;background:white;border:1px solid black")
  document.getElementById("game").appendChild(menu);
  var page ='';
  var username = location.href.split("&username=")[1].split("&")[0]
function commands(user,cmd)
{
    switch(cmd){
      case "clear":menu.innerHTML="";break;
      case "marseille":menu.innerHTML+="<br><b>"+user+"</b>" +" is for Marseille<br>";break;
      case "happy":menu.innerHTML+="<br><b>"+user+"</b>" +" is happy <img style='width:32px;height:32px' src='https://as1.ftcdn.net/jpg/01/42/89/16/500_F_142891654_fAtXH5vro91F1TynMjQ3RHfXXMXhqR2M.jpg'><br>";break;
      case "sad":menu.innerHTML+="<br><b>"+user+"</b>" +" is sad <img style='width:32px;height:32px' src='https://webstockreview.net/images/emoji-clipart-sadness-16.png'><br>";break;
      case "enjoy":menu.innerHTML+="<br><b>"+user+"</b>" +" is enjoy<br>";break;
      default : menu.innerHTML+="<br><b>"+user+"</b>" +" try command \"!"+cmd+"\"<br>";break;
    }
}
  socket.on('chat', function(msg){decrypt(msg)})
      menu.innerHTML = "<br>"+page

      function decrypt(msg){
          msga = msg.split("&")
      if(msga[0]==salon)
      {
      page = msga[1]
      if(msga[1].indexOf("!")!=-1) {commands(msg.split("<b>")[1].split(":</b>")[0],msga[1].split("!")[1].split("<br>")[0])}
      else menu.innerHTML += "<br>"+unescape(page)
      }
    }
      
  function send(){
    message = document.getElementById('sender').value
    document.getElementById('sender').value = ''
    document.getElementById('game').focus()
    if(message!="")
    {socket.emit("chat",salon+"&<b>"+username+":</b> "+message+"<br>")}
}

socket.emit("chat",salon+"&<b>"+username+" connect</b><br>")

window.addEventListener("beforeunload", function (event) {
socket.emit('chat',salon+'&<b>'+username+' disconnect</b><br>')
//  event.preventDefault();
});

  input = document.createElement("div")
  input.setAttribute("src","addchat.js")
  input.setAttribute("style","position:absolute;right:0;bottom:0px;width:20%;height:100%")
  var inputtext="<input type='text' style='width:75%;position:absolute;left:0;bottom:0' id='sender'>"
  var inputsend="<button style='width:20%;position:absolute;left:80%;bottom:0;height:35px' id='baton' onclick='send()'>Send</button>"
    document.getElementById("game").appendChild(input);
    function loadinputs(){
        if(document.getElementById('sender')) {lavalue = document.getElementById('sender').value}
  input.innerHTML = ""
  input.innerHTML = inputtext+inputsend
         document.getElementById('sender').value = lavalue
    }
    loadinputs()
