/* 
	init.js
	Page initialization functionality. 

	:AUTHOR: James Green
	:CREATED: June 11, 2008
	
	:UPDATED:
	JG 06/11/2008 - Initial setup.
	JG 01/08/2009 - Added statement to dynamically set photo layout width to match enclosed photo.
	
	:DEPENDENCIES: 
	/lib/jquery-1.2.2.js
	/lib/Date.js
	
*/
function activateMenu() {
	var list = $("#panel-menu dd a");
	var menuCategory = $("#panel-menu dt a");
	var pageTitle = $("h1").text().toLowerCase();
	var pageFolder = $("#band-breadcrumb-navigation a:last").text().toLowerCase();
	var found = false;
	var isOpen = false;
	
	/*
		First check for a match on category.
	*/
	$(menuCategory).each(function(i, val) {
		if ($(val).text().toLowerCase() === pageFolder) {
			found = true;
			/* Open if closed */
			if (!$(this).hasClass("opened")) {
				$(this).click();
				$(this).addClass("opened");
				isOpen = true;
			}
			if (found) return false; // to break out of the loop.
		}
	});
	
	/*
		Check for a match with a menu option and the page title.
	*/
	$(list).each(function(i, val) {
		if ($(val).text().toLowerCase() === pageTitle) {
			found = true;
			/* Only open if currently closed */
			if (!isOpen) $(this).parent().parent().parent().prev().children("a").click();
			$(this).addClass("active"); // mark it active for presentation.
		}
	});

}
$(document).ready(function() {
	var today = new Date();
	$("#copyright-yr").text(today.formatAs("yyyy"));
	
	$("input[type='text']").addClass("text-field"); // For IE. Adds the field shading.
	$("#band-general-navigation li:first").css("background-image", "none"); // Remove the separator icon from the first item in the footer navigation.
	$("#panel-menu li:last").css("background-image", "none"); // Remove the separator the last list item.
	$("#panel-menu dt a").addClass("closed"); // Start with all menu groups closed.
	$("#band-breadcrumb-navigation li:last").css("background-image", "none"); // Remove separator icon from last breadcrumb.
	
	$(".panel li:last-child").addClass("no-divider");
	// Remove the separator from the last list element of 1 or more panels.
	/*$(".panel").each(function(i,val) {
    	$("a:last", this).addClass("no-divider");
	});*/
	$(".content-group").each(function(i,val) {
		var tallest = 0;
		var spacing = 35;
		
		$(".panel:not(:first)", $(this)).addClass("panel-spacing");	
		
		/* Find tallest panel within this group. Each panel within a group should match the tallest 
			member of that group only. */
		$(".panel", $(this)).each(function() {
			tallest = ($(this).height() > tallest)?$(this).height():tallest;
			
			// Remove the separator from the last list element of 1 or more panels.
	    	$("a:last", $(this)).addClass("no-divider");
		});
		$(".panel .inner", $(this)).css("height", tallest-spacing);
		/* Reset tallest for inspection of next group if it exists. */
		tallest = 0;		
	});
	$("#panel-feature .link-list li:last").css("background-image", "none");

	// Set photo layout width to match the enclosed photo. This is necessary for caption to float correctly.
	$(".photo-layout img").each(function(i) {
		$(this).parent().width( $(this).width() );
	});
								
	$("a.print-friendly").click(function() {
		window.print();
	});

	$("a#help").click(function() {
		window.open("/webhelp/index.htm", "Help", "width=600,height=400,location=no,menubar=no,toolbar=no,scrollbars=yes,top=0,left=160,resizable=yes,screenX=0,screenY=0", false);
		return false;
	});
	
	activateMenu();
});
