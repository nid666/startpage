document.addEventListener("keydown", event => {
    if (event.keyCode == 13) {
        var val = document.getElementById("search-field").value;
        chrome.tabs.create({ url: "https://duckduckgo.com/?q=" + val});
    }
});

// Get current time and format
function getTime() {
    let date = new Date(),
        min = date.getMinutes(),
        sec = date.getSeconds(),
        hour = date.getHours();
        if (hour > 12) {
          var hr = (hour - 12);
        } else {
          hr = hour
        }

    return "" +
        //this very bad 24 to 12 hour converter needs to be fixed and a 0 needs to be added to numbers less than 10
        //(hr < 10 ? ("0" + hour) : hour) + ":" +
        (hr < 10 ? ("0" + hr) : hr) + ":" +
        (min < 10 ? ("0" + min) : min) + ":" +
        (sec < 10 ? ("0" + sec) : sec);
}

// Get URL for daily announcements (thanks mr. butrym)
// Slightly flawed because it will only work if prep uploads them for that day
// Idea: add a email bot to morris's announcements emails that takes the .docx file and uploads it when its sent
function getAnnouncements() {
  var currentdate = new Date();
  var day = currentdate.getDate().toString();
  var month = (currentdate.getMonth() + 1).toString();
  month = ("000" + month).slice(-2);
  day = ("000" + day).slice(-2);
  var anc = "http://intranet.spprep.org/calendar/announcements/"+currentdate.getFullYear()+"-"+month+"-"+day+".html";
}

// Get the letter day from prep calender
// Use Samay's implementation from Prep App!
function getCalenderEventsURL() {
  let calenderURL = "https://www.googleapis.com/calendar/v3/calendars/144grand@gmail.com/events?key=AIzaSyCwrVw53CGqcgOrfX0Sc-0bbsrBMCJKg_o";
  let today = new Date();
  let calender_date = this.formatDate(today);
  return (calendarURL + "&timeMin=" + calender_date + "T10:00:00-07:00&timeMax=" + calender_date + "T10:00:00-09:00");
}


// Thanks Samay!
function fetchCalendarEvents() {
  return fetch(this.getCalendarEventsURL())
  .then(response => response.json())
  .then(responseJson => {
    var today = responseJson.items[0].summary;
    today = today.toString();
    today = this.setState({ today });
  });
}


window.onload = () => {
    let xhr = new XMLHttpRequest();
    // Request to open weather map
    xhr.open('GET', 'http://api.openweathermap.org/data/2.5/weather?id=5099836&units=imperial&appid=e5b292ae2f9dae5f29e11499c2d82ece');
    xhr.onload = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let json = JSON.parse(xhr.responseText);
                console.log(json);
                document.getElementById("temp").innerHTML = json.main.temp.toFixed(0) + " F";
                document.getElementById("weather-description").innerHTML = json.weather[0].description;
            } else {
                console.log('error msg: ' + xhr.status);
            }
        }
    }
    xhr.send();
    // Set up the clock
    document.getElementById("clock").innerHTML = getTime();
    // Set clock interval to tick clock
    setInterval( () => {
        document.getElementById("clock").innerHTML = getTime();
    },100);
}

document.addEventListener("keydown", event => {
    if (event.keyCode != 27) {
        document.getElementById('search').style.display = 'flex';
        document.getElementById('search-field').focus();
    } else if (event.keyCode == 27) {   // Esc to close search
        document.getElementById('search-field').value = '';
        document.getElementById('search-field').blur();
        document.getElementById('search').style.display = 'none';
    }
});
