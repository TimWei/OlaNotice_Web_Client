(function(){
  var HOST = 'http://localhost:9292'

  var router = new Router();

  router.route('/', function(cur_hash) {
    res = $.ajax({
      type: "GET",
      url: HOST + "/api/billboard",
      success: function (res) {
      
        $('#services-list').html('');
        div_active( $('#billboard') );
        data = JSON.parse(res);
        for(key in data){
          item = data[key];
          append_service(item, key);
        }
      },
      error: function (json) {
        console.log('API not available!');
        window.location.hash = 'error';
      }
    });
  });

  function div_active(element) {
    $('.container > div').hide();
    element.show();
  }

  function append_service(item, service_id){
    var service_item = $('<div>');
    var click_pad = $('<a href="javascript: void(0);">');
    var li_item = $("<li class='list-group-item'>").text(item.name);
    var span_item = $("<span class='badge'>").text(item.messages.length);
    var message_ul = messages_builder(item.messages.reverse());
    click_pad.on('click',function(e){
      if(message_ul.hasClass('active')){
        message_ul.removeClass('active');
        message_ul.hide();
      }else{
        message_ul.addClass('active');
        message_ul.show();
      }
    }); 
    li_item.append(span_item);
    click_pad.append(li_item);
    service_item.append(click_pad).append(message_ul); 

    $('#services-list').append(service_item);
  }

  function messages_builder(messages){
    var result_ul = $("<ul class='sublist list-group' style='display: none;'>");
    messages.forEach(e => {
      new_message_item = $("<li class='list-group-item'>").text(e.body);
      date = $('<span class="small_date">').text(e.created_at)
      new_message_item.append(date);
      result_ul.append(new_message_item);
    });
    return result_ul;
  }
})()