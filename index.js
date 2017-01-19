function getCalendarEvents(){
  debugger;
  var cal_id = 'okoi8uh03p6ik4bsc0lfa6vgs8@group.calendar.google.com';
  var api_key = 'AIzaSyCN8Mk-7hj1UNhPB4MAdzeiZ8E7brMKaaQ';
  $.ajax({
    url:"https://www.googleapis.com/calendar/v3/calendars/" + cal_id + "/events?key=" + api_key,
    success: function(data) {
      console.log(data);
    }
  });
}

console.log('yo');

document.getElementById("demo").innerHTML = "Hello JavaScript!";

$(document).ready( getCalendarEvents() );