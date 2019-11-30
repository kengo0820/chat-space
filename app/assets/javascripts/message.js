$(function(){
  function buildHTML(message){


    if (message.image) {
      var html = `<div class="message">
                    <div class="upper-info">
                      <div class="upper-info__talker">
                        ${message.user_name}
                      </div>
                      <div class="upper-info__date">
                        ${message.time}
                      </div>
                    </div>
                    <div class="lower-message">
                      <p class="lower-message__content">
                        ${message.content}
                      </p>
                      <img class="lower-message__image" src = ${message.image}>
                    </div>
                  </div>`
    } else {
      var html = `<div class="message">
                    <div class="upper-info">
                      <div class="upper-info__talker">
                        ${message.user_name}
                      </div>
                      <div class="upper-info__date">
                        ${message.time}
                      </div>
                    </div>
                    <div class="lower-message">
                      <p class="lower-message__content">
                        ${message.content}
                      </p>
                    </div>
                  </div>`
    }
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
});
