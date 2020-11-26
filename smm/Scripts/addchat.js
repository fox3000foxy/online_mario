  menu = document.createElement("ul")
  menu.setAttribute("src","addchat.js")
  menu.setAttribute("style","position:absolute;right:0;top:-16px;width:20%;height:100%;background:white;border:1px solid black")
  document.getElementById("game").appendChild(menu);
  var page ='';
  var username = location.href.split("&username=")[1].split("&")[0]
  var inputtext="<input type='text' style='width:75%;position:absolute;left:0;bottom:0' id='sender'>"
  var inputsend="<button style='width:20%;position:absolute;left:80%;bottom:0;height:35px' id='baton' onclick='send()'>Send</button>"
  socket.on('chat', function(msg){
      msga = msg.split("&")
      if(msga[0]==salon)
      {
      page += msga[1]
      menu.innerHTML = "<br>"+page+inputtext+inputsend
      }
})
      menu.innerHTML = "<br>"+page+inputtext+inputsend

  function send(){
    message = document.getElementById('sender').value
    if(message!="")
    {socket.emit("chat",salon+"&<b>"+username+":</b> "+message+"<br>")}
    document.getElementById('sender').value = ''
}
