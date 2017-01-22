const $ = require('./jquery');
const moment = require('moment');

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

function getCalendar() {
  $.ajax({
    url:"https://www.googleapis.com/calendar/v3/calendars/" + cal_id + "/events",
    data: params,
    success: function (data) {
      displayEvents(data.items);
    }
  });
}

function displayEvents(data) {
  var days = {Monday:[], Tuesday:[], Wednesday:[], Thursday:[], Friday:[], Saturday:[], Sunday:[]};
  var keys = Object.keys(days);  
  data.map( function (item) {
    var date = moment(item.start.dateTime);
    var dayOfWeek = date.format('dddd');
    days[dayOfWeek].push(item)
  });
  for(var i = 0; i < keys.length; i++){
    var eachDay = days[keys[i]];
    var stubbedDay = calendarDayHtml(eachDay, keys[i]);
    $calendar.append(stubbedDay);
  }
  var $calendarIndividualDay = $('.calendar-individual-day');
  $calendarIndividualDay.addClass('even-01');
}

function calendarDayHtml(day, dayOfWeek) {
  var date = moment().isoWeekday(dayOfWeek).format('D');
  var summaries = '';
  var runClub = '';
  var foodTruck = '';
  if(day.length){
    foodTruck = `<object id='truck' data="./imgs/truck.svg" width="50" height="50" type="image/svg+xml"></object>`
    for(var i = 0; i < day.length; i++){
      summaries += 
        `<p class="summary">${day[i].summary + ' <span class="summary-time">(' + 
        moment(day[i].start.dateTime).format('LT') + 
        ' - ' + moment(day[i].end.dateTime).format('LT') +
        ')</span>'}</p>`;
      if(day[i].summary.toLowerCase() === 'run club'){
        runClub = `<object id="shoe" data="./imgs/shoe.svg" width="50" height="50" type="image/svg+xml"></object>`
      }
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
        ${runClub}
        ${foodTruck}
      </section>
    </section>
  `
}

getCalendar();
