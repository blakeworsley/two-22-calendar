var $calendar = $('.calendar');
var cal_id = '';
var api_key = '';
var params = {
  key: api_key,
  timeMin: moment().startOf('isoWeek').format(), 
  timeMax: moment().endOf('isoWeek').format(),
  singleEvents: true,
  orderBy: 'startTime'
}

var calendarEvents = [];
var currentWeeksEvents = [];

function getCalendar(pageToken) {
  var nextPage = pageToken ? `&pageToken=${pageToken}` : '';
  $.ajax({
    url:"https://www.googleapis.com/calendar/v3/calendars/" + cal_id + "/events",
    data: params,
    success: function (data) {
      displayEvents(data.items);
    }
  })
}

function displayEvents(data) {
  data.map( function (item) {
    var date = moment(item.start.dateTime);
    var day = date.format('D');
    var dayOfWeek = date.format('dddd');
    var summary = function(){
      item.summary
    }
    $calendar.append(calendarDayHtml(day, item.summary, dayOfWeek, 'food truck'));
  });
}

function calendarDayHtml(date, summary, day, photo) {
  return ` 
    <section class="calendar-individual-day">
      <section class="individual-day-date">
        <h2 class="date-numeral">${date}</h2>
        <h1 class="date-text">${day}</h1>
      </section>
      <section class="individual-day-activities">
        <p>${summary}</p>
      </section>
      <section class="individual-day-photos">
        <img src="truck.svg"/>
      </section>
    </section>
  `
}

getCalendar();