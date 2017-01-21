var $calendar = $('.calendar');
var cal_id = 'okoi8uh03p6ik4bsc0lfa6vgs8@group.calendar.google.com';
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
  var days = {Monday:[], Tuesday:[], Wednesday:[], Thursday:[], Friday:[], Saturday:[], Sunday:[]};
  data.map( function (item) {
    var date = moment(item.start.dateTime);
    var dayOfWeek = date.format('dddd');
    days[dayOfWeek].push(item)
  });

  var keys = Object.keys(days)
  for(var i = 0; i < keys.length; i++){
    var eachDay = days[keys[i]];
    var stubbedDay = calendarDayHtml(eachDay, keys[i]);
    $calendar.append(stubbedDay);
  }
}

function calendarDayHtml(day, dayOfWeek) {
  var date = 00;
  var summaries = ''
  if(day.length){
    date = moment(day[0].start.dateTime).format('D');
    for(var i = 0; i < day.length; i++){
      summaries += 
        `<p>${day[i].summary + ' ' + 
        moment(day[i].start.dateTime).format('LT') + 
        '-' + moment(day[i].end.dateTime).format('LT') 
        }</p>`;
    }
  }
  return ` 
    <section class="calendar-individual-day">
      <section class="individual-day-date">
        <h2 class="date-numeral">${date}</h2>
        <h1 class="date-text">${dayOfWeek}</h1>
      </section>
      <section class="individual-day-activities">
        ${summaries}
      </section>
      <section class="individual-day-photos">
        <img src="truck.svg"/>
      </section>
    </section>
  `
}

getCalendar();