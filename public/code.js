(function(){

const app = document.quarySelector(".app");
  const socket = io();
  
  let uname;

  app.quarySelector("join-screen # join-user").addEventListener("click", function(){
    let username = app.quarySelector("join-screen #Username").value;
    if(username.lenght == 0){
      return;
    }
    socket.emit("newuser", username);
    uname = username;
    app.quarySelector('.join-screen').classList.remove("active");
    app.quarySelector('.chat-screen').classList.add("active");
  });

  app.quarySelector(".chat-screen #send-message").addEventListener("click", function(){
    let messagetext = app.quarySelector(".chat-screen #message-input").value;
    if(message.lenght == 0){
      return;
    }
    renderMessage("my",{
      username:uname,
      text:message,
    });
    socket.emit("chat",{
      username:uname,
      text:message,
    });
    app.quarySelector(".chat-screen #message-input").value = "";
  })

  app.quarySelector(".chat-screen #exit-chat").addEventListner("click", function(){
    socket.emit("exituser", uname);
    window.location.href = window.location.href;
  });

  socket.on("updateuser", function(update){
  renderMessage("update",update);
  });
  
  socket.on("chat", function(message){
  renderMessage("other",message);
  });
  function renderMessage(type,message){
    let messageContainer = app.quarySelector(".chat-screen.messages");
    if(type == "my"){
      let el = document.createElement("div");
      el.setAttribute("class","message my-message");
      el.innerHTML = `
        <div 
        <div class="name">You</div>
        <div class="text">${message.text}</div>
        </div>
      `;
      messageContainer.appendChild(el);
    } else if(type == "other"){
            let el = document.createElement("div");
      el.setAttribute("class","message other-message");
      el.innerHTML = `
        <div 
        <div class="name">${message.username}</div>
        <div class="text">${message.text}</div>
        </div>
      `;
      messageContainer.appendChild(el);
    } else if(type == "update"){
      let el = document.createElement("div");
      el.setAttribute("class","update");
      el.innerText = message;
      messageContainer.appendChild(el);
    }
    //scroll chat to end 
    messageContainer.scrollTop = messageContainer.scrollHeight - messageContainer.clientHeight;
  }
    
})();
