  menu = document.createElement("ul")
  menu.setAttribute("src","addchat.js")
  menu.setAttribute("style","position:absolute;right:0;top:-16px;width:17.55%;height:100%;background:white;border:1px solid black")
  document.getElementById("game").appendChild(menu);
  var page ='';
  var username = location.href.split("&username=")[1].split("&")[0]
  socket.on('chat', function(msg){
      msga = msg.split("&")
      if(msga[0]==salon)
      {
      page = msga[1]
//       if(msga.length>=3){
//           for(i=0;i<msga.length;i++)
//           {
//             page += "&"+msga[i]+"\n"
//           }
//     }
      menu.innerHTML += "<br>"+page
      }
})
      menu.innerHTML = "<br>"+page

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
  input.innerHTML = inputtext+inputsend
