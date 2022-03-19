var messagesList = [];
var me = null;
var to = null;
var accueil = null;

function getMessages(e) {
  to = {
    id: e.currentTarget.dataset.id,
    username: e.currentTarget.querySelector(".name").innerText
  };

  $('.chat-with').text(`Chat with ${to.username}`);
  $('*[data-id="'+to.id+'"] .new-message').html("");

  if (to.id == 0) {
    $("#message-to-send").attr('disabled', true);
    $('.chat').replaceWith(accueil.outerHTML)
  } else {
    $("#message-to-send").attr('disabled', false);
    $(".chat-header img").attr('src', e.currentTarget.querySelector(".avatar").src);
    $('.chat-num-messages').text('Messages loading...');

    $.ajax({url: '/chat/' + to.id, success: function(messages){
        messages.map(message => message.isMine = (message.from.username === me));
        messagesList[to.id] = [];
        helpers.updateMessageList(me, to, messages);
        helpers.resetChat(to);
    }});
  }
}

function app(user) {
  me = user;
  accueil = $(".chat")[0].cloneNode(true);

  var socket = io('/dashboard', { transports: ['websocket'] });

  // When socket connects, get a list of chatdashboad
  socket.on('connect', function () {
    // Update users list upon emitting updateUsersList event
    socket.on('updateUsersList', function(user) {
        helpers.updateUsersList(user);
    });

    socket.on('addMessage', function(message) {
      message.isMine = false;
      console.log(message)
      if (!messagesList[message.from]) messagesList[message.from] = [];
      messagesList[message.from].push(message);

      if (to && message.from == to.id) {
        helpers.addMessage(message);
        $(".chat-history").animate({
          scrollTop: $($('.message').toArray()).get(-1).offsetTop
        }, 2000);
      } else {
        $('*[data-id="'+message.from+'"] .new-message').html("<i class='fa fa-circle me'></i>");
      }
    });

    $('.people-list ul li').on('click', getMessages);

    $(".chat-message button").on('click', function(e) {

      var textareaEle = $("textarea[name='message-to-send']");
      var content = textareaEle.val().trim();
      textareaEle.val('');
      if(content !== '') {
        var message = { 
          from: me.id,
          to: to.id,
          date: Date.now(),
          message: content, 
        };
  
        socket.emit('newMessage', message);
        message.isMine = true;
        messagesList[to.id].push(message);
        helpers.addMessage(message);
      }
    });
  });
}

var helpers = {

  encodeHTML: function (string){
    return $('<div />').text(string).html();
  },

  // Update users list
  updateUsersList: function(user){
    console.log(user._id)

    let userHTML = $('.people-list ul li').toArray().find(x => x.querySelector(".name").innerText == user.username);

    if(userHTML){     
      if (user.connected) {
        userHTML.querySelector(".status").innerHTML = '<i class="fa fa-circle online"></i> online';
      } else {
        userHTML.querySelector(".status").innerHTML = '<i class="fa fa-circle offline"></i> offline';
      }
    } else {
        let userHTML = `<li class="clearfix" data-id="${user._id}">
          <img class="avatar" src="https://api.minimalavatars.com/avatar/${user.username}/png" alt="avatar" />
          <div class="about">
            <div class="name">${user.username}</div>
            <div class="status">
              <i class="fa fa-circle online"></i> online
            </div>
          </div>
        </li>`

        $('.people-list ul').append(userHTML);
        $('.people-list ul li:last-child').on('click', getMessages)
    }
  },

  updateMessageList: function(me, to, messages){
    messages.forEach(message => {
      let user = message.from == me.id ? message.to : message.from;
      message.isMine = (message.from === me.id);
      if (messagesList[user]) {
        messagesList[user].push(message);
      }
    });
  },

  resetChat: function(to){

    let messages = messagesList[to.id];

    // sort with data-time
    // messages.sort()

    $('.chat-history ul').html('');

    messages.forEach(message => {
      helpers.addMessage(message);
    });

    if (messages.length > 0) {
      $('.chat-num-messages').text(`already ${messages.length} messages`);
    } else {
      $('.chat-num-messages').text('no messages');
    }

    messages = $('.message').toArray()
    if (messages.length > 0) {
      $(".chat-history").animate({
        scrollTop: $(messages).get(-1).offsetTop
      }, 2000);
    }
  },

  addMessage: function(message){
    let date = new Date(message.date).toLocaleString({ weekday: 'short', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' });
    if (message.isMine) {
      var html = `<li class="clearfix">
        <div class="message-data align-right">
          <span class="message-data-time" >${date}</span> &nbsp; &nbsp;
          <span class="message-data-name" >${me.username}</span>
          
        </div>
        <div class="message my-message  float-right">
          ${message.message}
        </div>
      </li>`;
    } else {
      var html = `<li>
        <div class="message-data">
          <span class="message-data-name">${to.username}</span>
          <span class="message-data-time">${date}</span>
        </div>
        <div class="message other-message">
          ${message.message}
        </div>
      </li>`;
    }

    $('.chat-history ul').append(html);
  },
}