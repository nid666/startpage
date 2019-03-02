
     var CLIENT_ID = '';
     var API_KEY = 'AIzaSyB9PFu0aUoTHjQqOcUluglt8S2gmB62vP8'
     var CAL_ID = 'https://calendar.google.com/calendar/embed?title=Saint+Peter%27s+Prep+Calendar&height=600&wkst=1&bgcolor=%23FFFFFF&src=144grand@gmail.com&color=%23A32929&src=j2u1oqdhka8e0v1o4p5t6avcjk@group.calendar.google.com&color=%236E6E41&src=j62aodeshq58d2u3la7pi9b8os@group.calendar.google.com&color=%230D7813&src=4pjksvuk9if0th7fa6tp1ainoo@group.calendar.google.com&color=%2329527A&ctz=America/New_York'
     var SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];


     /**
      * Load Google Calendar client library. List upcoming events
      * once client library is loaded.
      */
     function loadCalendarApi() {
       gapi.client.setApiKey(API_KEY);
       gapi.client.load('calendar', 'v3', listUpcomingEvents);
     }

     /**
      * Print the summary and start datetime/date of the next ten events in
      * the authorized user's calendar. If no events are found an
      * appropriate message is printed.
      */
     function listUpcomingEvents() {
       var request = gapi.client.calendar.events.list({
         'calendarId': CAL_ID,
         'timeMin': (new Date()).toISOString(),
         'showDeleted': false,
         'singleEvents': true,
         'maxResults': 10,
         'orderBy': 'startTime'
       });
       request.execute(function(resp) {
         var events = resp.items;
         appendPre('Upcoming events:');

         if (events.length > 0) {
           for (i = 0; i < events.length; i++) {
             var event = events[i];
             var when = event.start.dateTime;
             if (!when) {
               when = event.start.date;
             }
             appendPre(event.summary + ' (' + when + ')')
           }
         } else {
           appendPre('No upcoming events found.');
         }

       });
     }
