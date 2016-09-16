/*
==============================================================
	Date.js - July 30, 2002
	Extended date object. 

	Author: James Green
	
	Properties
		none.
	
	Methods
		getCharMonth();
		formatAs(fmt);
		getCharDay();
==============================================================
    History
	8/2/2002 JG Added two new formats: Day, Ddd
	            Added new method getCharDay()
	2/12/2003 JG Added support for time formats
==============================================================
*/ 

/*
	getCharDay()
	Returns the full day name of a date.

	Usage
		var d = new Date();
		dayName = d.getCharDay();
*/
Date.prototype.getCharDay = function Date_getCharDay() {
	var days = new Array(7);
	days[0] = "Sunday";
	days[1] = "Monday";
	days[2] = "Tuesday";
	days[3] = "Wednesday";
	days[4] = "Thursday";
	days[5] = "Friday";
	days[6] = "Saturday";
	
	return days[this.getDay()];
}

/*
	getCharMonth()
	Returns the full month name of a date.

	Usage
		var d = new Date();
		monthName = d.getCharMonth();
*/
Date.prototype.getCharMonth = function Date_getCharMonth() {
	var months = new Array(12);
	months[0] = "January";
	months[1] = "February";
	months[2] = "March";
	months[3] = "April";
	months[4] = "May";
	months[5] = "June";
	months[6] = "July";
	months[7] = "August";
	months[8] = "September";
	months[9] = "October";
	months[10] = "November";
	months[11] = "December";
	
	return months[this.getMonth()];
}

/*
	formatAs([fmtDateString])
	Returns a date in the format requested by the fmtDateString.

	Usage
		var d = new Date();
		newDate = d.formatAs("Month dd, yyyy");
	
	Default format
		Month dd, yyyy
		
	Accepted formats
		Month	- Full month name
		Mmm		- Abbreviated 3 character month name
		mm		- Two digit month
		dd		- Two digit day
		yy		- Two digit year
		yyyy	- Four digit year
		Day     - Full day name of week
		Ddd     - Abbreviated 3 character day of week
		hh      - Hours
		mn      - Minutes
		ss      - Seconds
		a       - am | pm
		Any character other than the above formats can be used as a delimiter.
		
	Example formats
		Month dd, yyyy			August 2, 2002
		Mmm dd, yyyy			Aug 2, 2002
		mm/dd/yyyy				08/02/2002
		yyyy-mm-dd				2002-08-02
		mm.dd.yy				08.02.2002
		Mmm yyyy				Aug 2002
		dd Month yyyy			2 August 2002
		Day, Month dd yyyy		Friday, August 2 2002
		Ddd, Mmm dd				Fri, Aug 2
		hh:mn:ss am             1:09:20 pm
		hh:mn:ss                13:09:20
		mm/dd/yyyy hh:mn:ssam   08/02/2002 1:09:20pm
*/
Date.prototype.formatAs = function Date_formatAs(fmt) {
	var dayOfMonth = this.getDate().toString();
	var m = this.getMonth()+1;
	m = m.toString();
	var fullYear = this.getUTCFullYear().toString();
	var shortYear = fullYear.substr(fullYear.length-2);
	var fullMonth = this.getCharMonth();
	var shortMonth = fullMonth.substr(0,3);
	var fullDay = this.getCharDay();
	var shortDay = fullDay.substr(0,3);
	var hours = this.getHours().toString();
	var minutes = this.getMinutes().toString();
	var seconds = this.getSeconds().toString();
	
	// If format contains dash, slash or dot, assume numbers are zero filled.
	var reDash = new RegExp("-");
	var reSlash = new RegExp("[/]");
	var reDot = new RegExp("[.]");
	var reAMPM = new RegExp("(am)|(pm)");
	var ampm = "";
	
	var zeroFill = (fmt.search(reDash)>=0) || (fmt.search(reSlash)>=0) || (fmt.search(reDot)>=0);
	var civilian = (fmt.search(reAMPM)>=0);
	
	var reFullMonth = /Month/;
	var reFullDay = /Day/;
	var reDayOfMonth = /dd/;
	var reFullYear = /yyyy/;
	var reShortYear = /yy/;
	var reShortMonth = /Mmm/;
	var reShortDay = /Ddd/;
	var reNumMonth = /mm/;
	var reHour = /hh/;
	var reMin = /mn/;
	var reSec = /ss/;
	
	// Default format
	if (fmt == null) fmt = "Month dd, yyyy";
	
	if (zeroFill) {
		if (dayOfMonth.length<2) dayOfMonth = "0" + dayOfMonth;
		if (m.length<2) m = "0" + m;
	}
	
	// Always zero fill minutes and seconds
	if (!civilian) {
		if (hours.length<2) hours = "0" + hours;
	}
	if (minutes.length<2) minutes = "0" + minutes;
	if (seconds.length<2) seconds = "0" + seconds;
	
	if (civilian) {
		if (hours > 12) {
			hours = hours - 12;
			ampm = "pm";
		} else {
			ampm = "am";
		}
	}
	
	// Sequence of these is very important.
	fmt = fmt.replace(reHour, hours);
	fmt = fmt.replace(reMin, minutes);
	fmt = fmt.replace(reSec, seconds);
	fmt = fmt.replace(reAMPM, ampm);
	fmt = fmt.replace(reFullMonth, fullMonth);		// must come before shortMonth replacement.
	fmt = fmt.replace(reShortDay, shortDay);		// must come before dayOfMonth replacement.
	fmt = fmt.replace(reDayOfMonth, dayOfMonth);
	fmt = fmt.replace(reShortMonth, shortMonth);
	fmt = fmt.replace(reNumMonth, m);
	fmt = fmt.replace(reFullYear, fullYear);		// must come before shortYear replacement.
	fmt = fmt.replace(reShortYear, shortYear);
    fmt = fmt.replace(reFullDay, fullDay);
	
	return fmt;
}
