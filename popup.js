document.addEventListener("keydown", event => {
    if (event.keyCode == 13) {
        var val = document.getElementById("search-field").value;
        chrome.tabs.create({ url: "https://duckduckgo.com/?q=" + val});
    }
});
time_is_widget.init({New_York_z161:{}});
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
var time_is_widget=new time_is_widget()
function time_is_widget(){var ca=0,tD=0,tout=0,updint=1000,tl="",U="undefined",i,j,rd
var p={n:["Sunday.Monday.Tuesday.Wednesday.Thursday.Friday.Saturday.Sun.Mon.Tue.Wed.Thu.Fri.Sat.January.February.March.April.May.June.July.August.September.October.November.December"],w:"week ",W:"week .n",dy:" day"}
for(i in p)p[i]=decodeURIComponent(p[i])
p["n"]=p["n"].split(".")
this.init=function(P){if(tout!=0)clearInterval(time_is_widget.tout)
var a,q=[],c={dayname:"%l",dname:"%D",daynum:"%d",dnum:"%j",day_in_y:"%z",week:"%W",monthname:"%F",monthnum:"%m",mnum:"%n",yy:"%y",year:"%Y","12hours":"%h",hours:"%H",minutes:"%i",seconds:"%s",AMPM:"%A"},ct="TIME",tF="%H:%i:%s",dF="%Y-%d-%m",sF="%srH:%srm-%ssH:%ssm"
for(i in P){a=P[i]
a["p"]=""
if(typeof a["id"]==U)a["id"]=i
if(typeof a["time_format"]!=U)tF=a["time_format"]
if(typeof a["date_format"]!=U)dF=a["date_format"]
if(typeof a["sun_format"]!=U)sF=a["sun_format"]
for(j in c){dF=dF.replace(j,c[j])
tF=tF.replace(j,c[j])}
if(typeof a["template"]!=U)ct=a["template"]
tl="http://time.is/"+i.substr(0,a["id"].indexOf("AA")).replace("__",",_")
tl="<span onclick=\"location='"+tl.replace("'","\\\'")+"'\" title=\""+tl+'">'
a["template"]=ct.replace("SUN",tl+sF+"</span>").replace("TIME",tl+tF+"</span>").replace("DATE",'<span onclick="window.location=\'http://time.is/calendar\'" title="http://time.is/calendar">'+dF+'</span>')
if(-1==a["template"].indexOf("<sp"))a["template"]='<span onclick="window.location=\'http://time.is/\'">'+a["template"]+"</span>"
if(typeof a["v"]==U){q.push(a["id"])
if(typeof a["coords"]!=U)q[q.length-1]+="."+a["coords"].replace(",","_")}
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
this.tick=function(){var tU=new Date(),t=new Date(),c,pw
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
var d,y=t.getUTCFullYear()+"",m=t.getUTCMonth()+1,N=new Date(y,0,1),o=N.getDay()-1
if(o==-1)o=6
var W=Math.floor((t-N+N.getTimezoneOffset()*60000)/604800000+(o/7)),dn=p["dy"]+" "+Math.floor((t-N+N.getTimezoneOffset()*60000)/86400000+1)
if(o<4)W++
if(W==0){W=52
if(new Date(y-1,0,1).getDay()==4||new Date(y-1,11,31).getDay()==4)W=53}
if(p["W"]=="hy"){if(W==1)pw="1-ին շաբաթ"
else pw=W+"-րդ շաբաթ"}else pw=p["W"].replace(".n",W)
var g={t:t.getUTCHours(),r:c["v"][3],s:c["v"][5]},h={}
for(j in g){h[j]=l0(g[j])
h[j+"H"]=h[j]
h[j+"M"]="AM"
if(11<h[j]){h[j+"M"]="PM"
h[j]=l0(h[j]-12)
if(h[j]=="00")h[j]=12}}
d=c["template"].replace("srhour",h["rH"]).replace("sr12hour",h["r"]).replace("srAMPM",h["rM"]).replace("srminute",l0(c["v"][4])).replace("sshour",h["sH"]).replace("ss12hour",h["s"]).replace("ssAMPM",h["sM"]).replace("ssminute",l0(c["v"][6])).replace("dlhours",c["v"][7]).replace("dlminutes",c["v"][8]).replace("%h",h["t"]).replace("%H",h["tH"]).replace("%i",l0(t.getUTCMinutes())).replace("%s",l0(t.getUTCSeconds())).replace("%A",h["tM"]).replace("%j",t.getUTCDate()).replace("%d",l0(t.getUTCDate())).replace("%W",pw).replace("%n",m).replace("%m",l0(m)).replace("%y",y.substr(2,2)).replace("%Y",y).replace("%F",p["n"][13+m]).replace("%l",p["n"][t.getUTCDay()]).replace("%D",p["n"][7+t.getUTCDay()]).replace("%z",dn)
j=d.indexOf(">")
d=d.substr(0,j+1)+d.substr(j+1,1).toUpperCase()+d.substr(j+2,d.length-1)
if(d!=c["p"]){if(document.getElementById)o=document.getElementById(i);else o=eval()
if(null!=o){o.innerHTML=d;c["p"]=d}}}
if(typeof c["callback"]!=U)eval(c["callback"]+"(d)")}
tout=setTimeout('time_is_widget.tick("")',updint-tU%updint)}
function l0(n){return n>9?n:"0"+n}}
