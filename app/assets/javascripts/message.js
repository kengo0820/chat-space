$(function(){

  function buildHTML(message){
  
      var img = message.image ? `<img class="lower-message__image" src = '${message.image}'>` : '';
      var html = `<div class="message" data-message_id = '${message.id}'>
                    <div class="upper-info">
                      <div class="upper-info__talker">
                        ${message.user_name}
                      </div>
                      <div class="upper-info__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="lower-message">
                      <p class="lower-message__content">
                        ${message.content}
                      </p>
                      ${img}
                    </div>
                  </div>`
    return html;
  }
  $("#new_message").on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })    
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $('#new_message')[0].reset();
      $('input').prop('disabled', false);
    })

    .fail(function() {
      alert('error')
      $('input').prop('disabled', false);
    });
 
  });
  
  if (window.location.href.match(/\/groups\/\d+\/messages/)) {
      var reloadMessages = function() {
        last_message_id = $('.message:last').data("message_id")
        $.ajax({
          url: "api/messages",
          type: 'get',
          dataType: 'json',
          data: {id: last_message_id}
        })
        .done(function(messages) {
          var insertHTML = '';
          $.each(messages, function(i, message) {
            insertHTML += buildHTML(message)
          });
          $('.messages').append(insertHTML);
          $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});

        })
        .fail(function() {
          alert('error')
        });
      };
    };    

  setInterval(reloadMessages, 7000);
  

});

