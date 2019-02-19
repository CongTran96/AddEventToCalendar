function convertDateToUTC(date)
{
    var year = ("0000" + (date.getFullYear().toString())).slice(-4);
    var month = ("00" + ((date.getMonth() + 1).toString())).slice(-2);
    var day = ("00" + ((date.getDate()).toString())).slice(-2);
    var hours = ("00" + (date.getHours().toString())).slice(-2);
    var minutes = ("00" + (date.getMinutes().toString())).slice(-2);
    var seconds = ("00" + (date.getSeconds().toString())).slice(-2);

    var time = 'T' + hours + minutes + seconds;

    var date_UTC = year + month + day + time;

    return date_UTC;
}

var isDroped = false;
function dropdown()
{
    if (!isDroped) {
        console.log('add event succeed');
        document.getElementById("addeventatc1").setAttribute("style", "visibility: visible; z-index: 100004; outline: 0px;");
        document.getElementById("addeventatc1-drop").setAttribute("style", "display: block; left: -2px; top: -2px;");
        document.getElementById("addeventatc1-drop").setAttribute("class", "addeventatc_dropdown topdown addeventatc-selected");
    } else {
        console.log('hide menu');
        document.getElementById("addeventatc1-drop").setAttribute("style", "display: none");
    }
    isDroped = !isDroped;
}

$('html').click(function() {
    $('#addeventatc1-drop').hide(); 
    isDroped = !isDroped;
    console.log('running outside click');
});

$('#addeventatc1').click(function(event){
    event.stopPropagation();
});

function generateCalendarLink(id, type, subject, details, dateStart, dateEnd, locations) {
    var now_day = convertDateToUTC(new Date());

    var calendarEvent = [
        'BEGIN:VCALENDAR',
        'PRODID:Calendar',
        'VERSION:2.0',
        'BEGIN:VEVENT',
        'UID:' + 'default',
        'CLASS:PUBLIC',
        'DESCRIPTION:' + details,
        'DTSTAMP;VALUE=DATE-TIME:' + now_day,
        'DTSTART;VALUE=DATE-TIME:' + dateStart,
        'DTEND;VALUE=DATE-TIME:' + dateEnd,
        'LOCATION:' + locations,
        'SUMMARY;LANGUAGE=en-us:' + subject,
        'TRANSP:TRANSPARENT',
        'END:VEVENT',
        'END:VCALENDAR'
    ];
    calendarEvent = calendarEvent.join("\n");
    document.getElementById("addeventatc1").addEventListener("click", dropdown);
    
    var link = '';

    if (configuration[type]['link_type'] == 'link') {
        var link = configuration[type]['link']['value'] + configuration[type]['link']['param1'] + subject + configuration[type]['link']['param2'] + 
            details + configuration[type]['link']['param3'] + dateStart + configuration[type]['link']['param4'] + dateEnd + configuration[type]['link']['param5'] + locations;
    } else {
        var link = configuration[type]['link']['value'] + calendarEvent;
        console.log('id:', id);
        document.getElementById(id).setAttribute("download", "event.ics");
    }

    document.getElementById(id).setAttribute("href", link);

    // document.getElementById().setAttribute("href", yahooCalendarLink);
}

var subject = "add title";
// var dates = "20190219T080000/20190220T100000";

var dateStart = "20190219T080000";
var dateEnd = "20190220T100000";

var details = "some+description";
var locations = "Garage+Boston+-+20+Linden+Street+-+Allston,+MA+02134";

var configuration = {
    google: {
        link: {
            value: "https://calendar.google.com/calendar/r/eventedit?",
            param1: "text=",
            param2: "&details=",
            param3: "&dates=",
            param4: "/",
            param5: "&location="
        },
        link_type: "link", 
    },
    outlook_online: {
        link: {
            value: "https://outlook.live.com/owa/?path=/calendar/action/compose&rru=addevent",
            param1: "&subject=",
            param2: "&body=",
            param3: "&startdt=",
            param4: "&enddt=",
            param5: "&location="
        },
        link_type: "link", 
    },
    yahoo: {
        link: {
            value: "https://calendar.yahoo.com/?v=60&view=d&type=20",
            param1: "&title=",
            param2: "&desc=",
            param3: "&st=",
            param4: "&et=",
            param5: "&in_loc="
        },
        link_type: "link", 
    },
    outlook: {
        link: {
            value: "data:text/html,",
        },
        link_type: "link_download", 
    },
    apple: {
        link: {
            value: "data:text/html,",
        },
        link_type: "link_download", 
    }
}

generateCalendarLink('addeventatc-appleical', 'apple', subject, details, dateStart, dateEnd, locations);
generateCalendarLink('addeventatc-google', 'google', subject, details, dateStart, dateEnd, locations);
generateCalendarLink('addeventatc-outlook', 'outlook', subject, details, dateStart, dateEnd, locations);
generateCalendarLink('addeventatc-outlookcom', 'outlook_online', subject, details, dateStart, dateEnd, locations);
generateCalendarLink('addeventatc-yahoo', 'yahoo', subject, details, dateStart, dateEnd, locations);

// --------------------------------------------------------------------------------------------------
