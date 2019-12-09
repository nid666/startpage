var time_is_widget=new time_is_widget()
function time_is_widget(){var ca=0,tD=0,tout=0,updint=1000,tl="",U="undefined",i,rd,j
this.init=function(P){if(tout!=0)clearInterval(time_is_widget.tout)
var a,q=[],c={"12hours":"%h",hours:"%H",minutes:"%i",seconds:"%s",AMPM:"%A"},ct="TIME",tF="hours:minutes:seconds"
for(i in P){a=P[i]
a["p"]=""
if(typeof a["id"]==U)a["id"]=i
if(typeof a["time_format"]!=U)tF=a["time_format"]
for(j in c)tF=tF.replace(j,c[j])
tl="http://time.is/"+i.substr(0,a["id"].indexOf("AA")).replace("__",",_")
tF="<span onclick=\"location='"+tl.replace("'","\\\'")+"'\" title=\""+tl+'">'+tF+"</span>"
if(typeof a["contents"]!=U)ct=a["contents"]
a["contents"]=ct.replace("TIME",tF)
if(typeof a["v"]==U)q.push(a["id"])
P[i]=a}
this.ca=P
if(0<q.length){i=document.createElement("script")
i.setAttribute("src","//widget.time.is/?"+encodeURIComponent(q.join(".."))+"&t="+new Date().getTime())
j=document.getElementsByTagName("head").item(0)
j.appendChild(i)}else this.tick()}
this.cb=function(t,r,a){var rpT=new Date(),n=0
time_is_widget.tD=rpT.getTime()-t-Math.round((rpT-r)/2)
for(i in this.ca){this.ca[i]["v"]=a[n]
n++}
this.tick()}
this.tick=function(){var tU=new Date(),t=new Date(),c
tU.setTime(tU.getTime()-this.tD)
if(!rd&&document.readyState==="complete"){if(document.getElementById)i=document.getElementById("time_is_link")
else i=eval("time_is_link")
if(null==i||i.href.indexOf("time.is/")===-1){console.log('Link back to Time.is missing!')
return ''}else{if(!i.rel||i.innerHTML.length<3||i.offsetWidth<10||i.offsetHeight<5){rd="//widget.time.is/r/?"+i.rel+".w"+i.offsetWidth+".h"+i.offsetHeight+"."+encodeURIComponent(i.innerHTML)
i=document.createElement("script")
i.setAttribute("src",rd)
j=document.getElementsByTagName("head").item(0)
j.appendChild(i)}}}
for(i in this.ca){c=this.ca[i]
if(typeof c["v"][0]!=U){if((0<c["v"][1])&&(c["v"][1]<tU.getTime())){c["v"][0]=c["v"][2]
c["v"][1]=0}
t.setTime(c["v"][0]*60000+tU.getTime())
var d,o,H,M="AM",h=t.getUTCHours()
h=l0(h)
H=h
if(11<h){M="PM"
h=l0(h-12)}
if(h=="00")h=12
d=c["contents"].replace("%h",h).replace("%H",H).replace("%i",l0(t.getUTCMinutes())).replace("%s",l0(t.getUTCSeconds())).replace("%A",M)
if(d!=c["p"]){if(document.getElementById)o=document.getElementById(i);else o=eval()
if(null!=o){o.innerHTML=d;c["p"]=d}}}
if(typeof c["callback"]!=U)eval(c["callback"]+"(\""+encodeURI(d)+"\")")}
tout=setTimeout('time_is_widget.tick("")',updint-tU%updint)}
function l0(n){return n>9?n:"0"+n}}
<<<<<<< Updated upstream
=======


time_is_widget.init({New_York_z161:{}});
>>>>>>> Stashed changes
document.addEventListener("keydown", event => {
    if (event.keyCode == 13) {
        var val = document.getElementById("search-field").value;
        chrome.tabs.create({ url: "https://duckduckgo.com/?q=" + val});
    }
});


// Get current time and format
function getTime() {
    /*
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

    
   time_is_widget.init({New_York_z161:{}});
<<<<<<< Updated upstream
   
=======
   */
>>>>>>> Stashed changes
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
    time_is_widget.init({New_York_z161:{}});
    /*
    // Set up the clock
    document.getElementById("clock").innerHTML = getTime();
    // Set clock interval to tick clock
    setInterval( () => {
        document.getElementById("clock").innerHTML = getTime();
    },100);
    */
	
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
