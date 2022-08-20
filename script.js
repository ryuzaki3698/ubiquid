function display() {
    window.print();
 }

 function openDropDown(event) {

	if ($("#dropdown-sort:visible").length) {
		$("#dropdown-sort").fadeOut("slow");
	}

 	$("#filter .dropdown-content").each(function( index ) {
        $(this).fadeOut("slow");
    }); 

 	if ($(event.target).attr('class').indexOf("dropdown") >= 0) {
 		$(event.target).next(".dropdown-content").toggle();
 	} else {
 		$(event.target).parent().next().toggle();
 	}
 	
 	$(event.target).toggleClass("chevron-anim");
	 
 }

 function openSort() {
 	if ($(".dropdown-content:visible").length) {
		$(".dropdown-content:visible").fadeOut("slow");
	}
 	$("#dropdown-sort").toggle();
 	$("#sort-content").toggleClass("chevron-anim");
 }

function addTag(event) {

	$("#filter .dropdown-content").each(function( index ) {
      	$(this).fadeOut('slow');
    });

    var filter = $(event.target).parent().attr("class");

    var filterCor = "";

	if (filter == "full") {
  		filterCor = "Télétravail total";
  	} else if (filter == "eventually") {
  		filterCor = "Télétravail partiel";
  	} else if (filter == "regularly") {
  		filterCor = "Télétravail pontuel";
  	} else if (filter == "unknown") {
  		filterCor = ""
  	} else if (filter == "none") {
  		filterCor = "Aucun télétravail"
  	} else if (filter == "cdi") {
  		filterCor = "CDI";
  	} else if (filter == "cdd") {
  		filterCor = "CDD";
  	} else if (filter == "stage") {
  		filterCor = "Stage";
  	} else if (filter == "alternance") {
  		filterCor = "Alternance";
  	} else if (filter == "fullstack") {
  		filterCor = "Dev Fullstack";
  	} else if (filter == "frontend") {
  		filterCor = "Dev Frontend";
  	} else if (filter == "manager") {
  		filterCor = "Manager";
  	} else if (filter == "backend") {
  		filterCor = "Dev Backend";
  	} else {
  		filterCor = filter;
  	}

	$( "#content-tags" ).append( "<div id='"+filter+"' class='tag'>"+filterCor+"<div class='close' onclick='removeTag(event)'></div></div>" );

	$("#jobs-content .job-bloc").each(function( index ) {
		$(this).fadeOut('slow');
	});

	var arrFi = [];

	$("#content-tags .tag").each(function( index ) {
		arrFi.push($(this).attr('id'));
	});

	//Filter with or

	for (i = 0; i < arrFi.length; ++i) {
		$("#jobs-content .job-bloc."+arrFi[i]).each(function( index ) {
			$(this).fadeIn("slow");
		});
	}

	
	//Filter with and

	/*var classToSearch = "";

	for (i = 0; i < arrFi.length; ++i) {
		classToSearch += "."+arrFi[i];
	}

	$("#jobs-content .job-bloc"+classToSearch).each(function( index ) {
		$(this).fadeIn("slow");
	});*/

}

function removeTag(event) {

	var toUncheck = $(event.target).parent().attr("id");

	$(event.target).parent().remove();

	$("#filter .dropdown-content ul li input").each(function( index ) {
        if ($(this).val() == toUncheck) {
            $(this).prop( "checked", false );
        }
    });

    $("#jobs-content .job-bloc").each(function( index ) {
		$(this).fadeOut('slow');
	});

    var arrFi = [];

	$("#content-tags .tag").each(function( index ) {
		arrFi.push($(this).attr('id'));
	});

	var classToSearch = "";

	for (i = 0; i < arrFi.length; ++i) {
		classToSearch += "."+arrFi[i];
	}

	$("#jobs-content .job-bloc"+classToSearch).each(function( index ) {
		$(this).fadeIn("slow");
	});

}

function parseDate(str) {
    var mdy = str.split('/');
    return new Date(mdy[2], mdy[0]-1, mdy[1]);
}

function datediff(first, second) {
    return Math.round((second-first)/(1000*60*60*24));
}

function custom_sort(a, b) {
    return new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime();
}

function sortByDate() {

	$("#sort-content").removeClass("chevron-anim");
	$("#dropdown-sort").fadeOut("slow");
	$("#sort-content p span").text("");
	$("#sort-content p span").text("Date");

	$.getJSON( "data.json", function( data ) {

	  var items = [];

	  $("#jobs-content ul").remove();
	  
		data.sort((a, b) => {
		  return new Date(b.publishDate) - new Date(a.publishDate); // descending
		})

	  $.each( data, function( key, val ) {

	  	var date = val.publishDate;

	  	var today = new Date();
		var yyyy = today.getFullYear();
		var mm = today.getMonth() + 1; // Months start at 0!
		var dd = today.getDate();

		if (dd < 10) dd = '0' + dd;
		if (mm < 10) mm = '0' + mm;

		var currentDate = dd + '/' + mm + '/' + yyyy;


	  	var before = date.substring(0, date.indexOf('T'));

	  	var beforeForm1 = before.substring(0, before.indexOf('-'));

	  	var beforeForm2 = before.substring(
		    before.indexOf("-") + 1, 
		    before.lastIndexOf("-")
		);

	  	var beforeForm3 = before.substr(before.length - 2);
	  
	  	var postDate = beforeForm3 + '/' + beforeForm2 + '/' + beforeForm1;

	  	var compareDate = datediff(parseDate(postDate), parseDate(currentDate));

	  	if (val.remoteWork == "full") {
	  		var tvLabel = "Télétravail total";
	  	} else if (val.remoteWork == "eventually") {
	  		var tvLabel = "Télétravail partiel";
	  	} else if (val.remoteWork == "regularly") {
	  		var tvLabel = "Télétravail pontuel";
	  	} else if (val.remoteWork == "unknown") {
	  		var tvLabel = ""
	  	} else if (val.remoteWork == "none") {
	  		var tvLabel = "Aucun télétravail"
	  	} else {
	  		var tvLabel = val.remoteWork;
	  	}

	  	if (val.contractType == "cdi") {
	  		var labelWork = "CDI";
	  	} else if (val.contractType == "cdd") {
	  		var labelWork = "CDD";
	  	} else if (val.contractType == "stage") {
	  		var labelWork = "Stage";
	  	}  else if (val.contractType == "alternance") {
	  		var labelWork = "Alternance";
	  	} else {
	  		var labelWork = val.contractType;
	  	}

	  	var firstLetterCompany = val.company.slice(0,1);

	  	if (val.jobTitle == "fullstack") {
	  		var titleLabel = "Dev Fullstack";
	  	} else if (val.jobTitle == "frontend") {
	  		var titleLabel = "Dev Frontend";
	  	} else if (val.jobTitle == "manager") {
	  		var titleLabel = "Manager";
	  	} else if (val.jobTitle == "backend") {
	  		var titleLabel = "Dev Backend"
	  	} else {
	  		var titleLabel = val.jobTitle;
	  	}

	  	var dateStart = val.startDate;

	  	var beforeStart = dateStart.substring(0, dateStart.indexOf('T'));

	  	var beforeStartForm1 = beforeStart.substring(0, beforeStart.indexOf('-'));

	  	var beforeStartForm2 = beforeStart.substring(
		    beforeStart.indexOf("-") + 1, 
		    beforeStart.lastIndexOf("-")
		);

	  	var beforeStartForm3 = beforeStart.substr(beforeStart.length - 2);
	  
	  	var postDateStart = beforeStartForm3 + ' ' + GetMonthName(beforeStartForm2) + ' ' + beforeStartForm1;


	  	items.push( "<li onclick='openInfo(event)' class='job-bloc " + val.jobTitle + " " + val.contractType + " " + val.remoteWork + "' id='"+key+"'><div class='content-job'><div class='left'><div class='carre'>"+firstLetterCompany+"</div></div><div class='middle'><p class='title'>" + titleLabel + "<span class='" + val.remoteWork + "'>" + tvLabel + "</span></p><p class='desc'>" + val.company + " - " + val.city + " ————— " + labelWork + "</p></div><div class='right'><a onclick='reduceData(event)' class='reduce' href='#'>Réduire</a><p class='salary'>Salaire <span>" + val.salary + "K</span></p><p class='time'>Il y a "+ compareDate +" jours</p></div></div>         <div class='bloc-info-all'> <div class='header-info'> <div class='un'>" + val.company + " - " + val.city + "</div> <div class='deux'>" + labelWork + "</div> <div class='trois'>Début le : " + postDateStart + "</div> <div class='quatre'>Bac +"+ val.studyLevel +"</div> <p>Publié il y a " + compareDate + " jours</p> </div> <div class='content-info'><p>" + val.about + "</p></div> <a href='#'>Postuler</a> </di> </li>" );

	  });
	 
	  $( "<ul/>", {
	    "class": "my-new-list",
	    html: items.join( "" )
	  }).appendTo( "#jobs-content" );

	});
}

function sortBySalary() {
	$("#sort-content").removeClass("chevron-anim");
	$("#dropdown-sort").fadeOut("slow");
	$("#sort-content p span").text("");
	$("#sort-content p span").text("Salaire");

	$.getJSON( "data.json", function( data ) {

		$("#jobs-content ul").remove();

	  var items = [];
	  
		data.sort(function(a, b){
		    return a.salary - b.salary;
		});

	  $.each( data, function( key, val ) {

	  	var date = val.publishDate;

	  	var today = new Date();
		var yyyy = today.getFullYear();
		var mm = today.getMonth() + 1; // Months start at 0!
		var dd = today.getDate();

		if (dd < 10) dd = '0' + dd;
		if (mm < 10) mm = '0' + mm;

		var currentDate = dd + '/' + mm + '/' + yyyy;


	  	var before = date.substring(0, date.indexOf('T'));

	  	var beforeForm1 = before.substring(0, before.indexOf('-'));

	  	var beforeForm2 = before.substring(
		    before.indexOf("-") + 1, 
		    before.lastIndexOf("-")
		);

	  	var beforeForm3 = before.substr(before.length - 2);
	  
	  	var postDate = beforeForm3 + '/' + beforeForm2 + '/' + beforeForm1;

	  	var compareDate = datediff(parseDate(postDate), parseDate(currentDate));

	  	if (val.remoteWork == "full") {
	  		var tvLabel = "Télétravail total";
	  	} else if (val.remoteWork == "eventually") {
	  		var tvLabel = "Télétravail partiel";
	  	} else if (val.remoteWork == "regularly") {
	  		var tvLabel = "Télétravail pontuel";
	  	} else if (val.remoteWork == "unknown") {
	  		var tvLabel = ""
	  	} else if (val.remoteWork == "none") {
	  		var tvLabel = "Aucun télétravail"
	  	} else {
	  		var tvLabel = val.remoteWork;
	  	}

	  	if (val.contractType == "cdi") {
	  		var labelWork = "CDI";
	  	} else if (val.contractType == "cdd") {
	  		var labelWork = "CDD";
	  	} else if (val.contractType == "stage") {
	  		var labelWork = "Stage";
	  	}  else if (val.contractType == "alternance") {
	  		var labelWork = "Alternance";
	  	} else {
	  		var labelWork = val.contractType;
	  	}

	  	var firstLetterCompany = val.company.slice(0,1);

	  	if (val.jobTitle == "fullstack") {
	  		var titleLabel = "Dev Fullstack";
	  	} else if (val.jobTitle == "frontend") {
	  		var titleLabel = "Dev Frontend";
	  	} else if (val.jobTitle == "manager") {
	  		var titleLabel = "Manager";
	  	} else if (val.jobTitle == "backend") {
	  		var titleLabel = "Dev Backend";
	  	} else {
	  		var titleLabel = val.jobTitle;
	  	}

	  	var dateStart = val.startDate;

	  	var beforeStart = dateStart.substring(0, dateStart.indexOf('T'));

	  	var beforeStartForm1 = beforeStart.substring(0, beforeStart.indexOf('-'));

	  	var beforeStartForm2 = beforeStart.substring(
		    beforeStart.indexOf("-") + 1, 
		    beforeStart.lastIndexOf("-")
		);

	  	var beforeStartForm3 = beforeStart.substr(beforeStart.length - 2);
	  
	  	var postDateStart = beforeStartForm3 + ' ' + GetMonthName(beforeStartForm2) + ' ' + beforeStartForm1;

	  	items.push( "<li onclick='openInfo(event)' class='job-bloc " + val.jobTitle + " " + val.contractType + " " + val.remoteWork + "' id='"+key+"'><div class='content-job'><div class='left'><div class='carre'>"+firstLetterCompany+"</div></div><div class='middle'><p class='title'>" + titleLabel + "<span class='" + val.remoteWork + "'>" + tvLabel + "</span></p><p class='desc'>" + val.company + " - " + val.city + " ————— " + labelWork + "</p></div><div class='right'><a onclick='reduceData(event)' class='reduce' href='#'>Réduire</a><p class='salary'>Salaire <span>" + val.salary + "K</span></p><p class='time'>Il y a "+ compareDate +" jours</p></div></div>         <div class='bloc-info-all'> <div class='header-info'> <div class='un'>" + val.company + " - " + val.city + "</div> <div class='deux'>" + labelWork + "</div> <div class='trois'>Début le : " + postDateStart + "</div> <div class='quatre'>Bac +"+ val.studyLevel +"</div> <p>Publié il y a " + compareDate + " jours</p> </div> <div class='content-info'><p>" + val.about + "</p></div> <a href='#'>Postuler</a> </di> </li>" );

	  });
	 
	  $( "<ul/>", {
	    "class": "my-new-list",
	    html: items.join( "" )
	  }).appendTo( "#jobs-content" );

	});
}

function openInfo(event) {

	$(event.target).find(".right .time").css("display", "none");
	$(event.target).find(".reduce").fadeIn("slow");

	$(event.target).find(".middle .desc").css("display", "none");

	$(event.target).parent().find(".bloc-info-all").slideDown("slow");

	if ($(event.target).find(".reduce").css("display") == "block") {
		var salary = $(event.target).find(".right .salary");
		var desti = $(event.target).find(".middle");
		$(salary).appendTo(desti);
	} else {
		var salary = $(event.target).find(".middle .salary");
		var desti = $(event.target).find(".right");
		$(salary).prependTo(desti);
	}

}

function reduceData(event) {

	$(event.target).parents(".job-bloc").find(".right .time").fadeIn("slow");
	$(event.target).parents(".job-bloc").find(".reduce").css("display", "none");

	$(event.target).parents(".job-bloc").find(".middle .desc").fadeIn("slow");

	$(event.target).parents(".job-bloc").find(".bloc-info-all").slideUp("slow");

	var salary = $(event.target).parents(".job-bloc").find(".middle .salary");
	var desti = $(event.target).parents(".job-bloc").find(".right");

	$(salary).prependTo(desti);
}

function GetMonthName(monthNumber) {
      var months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
      return months[monthNumber - 1];
}

var flag = true;

$(document).ready(function() {

 	if (flag == true) {

	 	$.getJSON( "data.json", function( data ) {

		  var items = [];

		  $.each( data, function( key, val ) {

		  	if (val.contractType == "cdi") {
		  		var labelWork = "CDI";
		  	} else if (val.contractType == "cdd") {
		  		var labelWork = "CDD";
		  	} else if (val.contractType == "stage") {
		  		var labelWork = "Stage";
		  	}  else if (val.contractType == "alternance") {
	  			var labelWork = "Alternance";
	  		} else {
		  		var labelWork = val.contractType;
		  	}

		  	items.push( "<li class='"+val.contractType+"'><input type='checkbox' onclick='addTag(event)' value='" + val.contractType + "' />" + labelWork + "</li>" );
		  });

		  $( "<ul/>", {
		    "class": "my-new-list",
		    html: items.join( "" )
		  }).appendTo( "#contrat-dp" );
		});

	 	$.getJSON( "data.json", function( data ) {

		  var items = [];

		  $.each( data, function( key, val ) {

		  	if (val.remoteWork == "unknown") {
		  		//var tvLabel = "";
		  		val.remoteWork = "displayNone";
		  	} else if (val.remoteWork == "full") {
		  		var tvLabel = "Télétravail total";
		  	} else if (val.remoteWork == "eventually") {
		  		var tvLabel = "Télétravail partiel";
		  	} else if (val.remoteWork == "regularly") {
		  		var tvLabel = "Télétravail pontuel";
		  	} else if (val.remoteWork == "none") {
		  		var tvLabel = "Aucun télétravail";
		  	} else {
		  		var tvLabel = val.remoteWork;
	  		}

		    items.push( "<li class='" + val.remoteWork + "'><input type='checkbox' onclick='addTag(event)' value='" + val.remoteWork + "' />" + tvLabel + "</li>" );
		  });
		 
		  $( "<ul/>", {
		    "class": "my-new-list",
		    html: items.join( "" )
		  }).appendTo( "#tv-dp" );
		});

	 	$.getJSON( "data.json", function( data ) {

		  	var items = [];

			 $.each( data, function( key, val ) {

			 	if (val.jobTitle == "fullstack") {
			  		var titleLabel = "Dev Fullstack";
			  	} else if (val.jobTitle == "frontend") {
			  		var titleLabel = "Dev Frontend";
			  	} else if (val.jobTitle == "manager") {
			  		var titleLabel = "Manager";
			  	} else if (val.jobTitle == "backend") {
			  		var titleLabel = "Dev Backend"
			  	} else {
			  		var titleLabel = val.jobTitle;
			  	}

			    items.push( "<li class='" + val.jobTitle + "'><input type='checkbox' onclick='addTag(event)' value='" + val.jobTitle + "' />" + titleLabel + "</li>" );
			 });
			 
			  $( "<ul/>", {
			    "class": "my-new-list",
			    html: items.join( "" )
			  }).appendTo( "#poste-dp" );
		});

	 	flag = false;
	}


	$.getJSON( "data.json", function( data ) {

		$("#jobs-content ul").remove();

	  var items = [];

		data.sort((a, b) => {
		  return new Date(b.publishDate) - new Date(a.publishDate); // descending
		})

	  $.each( data, function( key, val ) {

	  	var date = val.publishDate;

	  	var today = new Date();
		var yyyy = today.getFullYear();
		var mm = today.getMonth() + 1; // Months start at 0!
		var dd = today.getDate();

		if (dd < 10) dd = '0' + dd;
		if (mm < 10) mm = '0' + mm;

		var currentDate = dd + '/' + mm + '/' + yyyy;


	  	var before = date.substring(0, date.indexOf('T'));

	  	var beforeForm1 = before.substring(0, before.indexOf('-'));

	  	var beforeForm2 = before.substring(
		    before.indexOf("-") + 1, 
		    before.lastIndexOf("-")
		);

	  	var beforeForm3 = before.substr(before.length - 2);
	  
	  	var postDate = beforeForm3 + '/' + beforeForm2 + '/' + beforeForm1;

	  	var compareDate = datediff(parseDate(postDate), parseDate(currentDate));

	  	if (val.remoteWork == "full") {
	  		var tvLabel = "Télétravail total";
	  	} else if (val.remoteWork == "eventually") {
	  		var tvLabel = "Télétravail partiel";
	  	} else if (val.remoteWork == "regularly") {
	  		var tvLabel = "Télétravail pontuel";
	  	} else if (val.remoteWork == "unknown") {
	  		var tvLabel = ""
	  	} else if (val.remoteWork == "none") {
	  		var tvLabel = "Aucun télétravail"
	  	} else {
	  		var tvLabel = val.remoteWork;
	  	}

	  	if (val.contractType == "cdi") {
	  		var labelWork = "CDI";
	  	} else if (val.contractType == "cdd") {
	  		var labelWork = "CDD";
	  	} else if (val.contractType == "stage") {
	  		var labelWork = "Stage";
	  	} else if (val.contractType == "alternance") {
	  		var labelWork = "Alternance";
	  	} else {
	  		var labelWork = val.contractType;
	  	}

	  	if (val.jobTitle == "fullstack") {
	  		var titleLabel = "Dev Fullstack";
	  	} else if (val.jobTitle == "frontend") {
	  		var titleLabel = "Dev Frontend";
	  	} else if (val.jobTitle == "manager") {
	  		var titleLabel = "Manager";
	  	} else if (val.jobTitle == "backend") {
	  		var titleLabel = "Dev Backend"
	  	} else {
	  		var titleLabel = val.jobTitle;
	  	}

	  	var firstLetterCompany = val.company.slice(0,1);


	  	var dateStart = val.startDate;

	  	var beforeStart = dateStart.substring(0, dateStart.indexOf('T'));

	  	var beforeStartForm1 = beforeStart.substring(0, beforeStart.indexOf('-'));

	  	var beforeStartForm2 = beforeStart.substring(
		    beforeStart.indexOf("-") + 1, 
		    beforeStart.lastIndexOf("-")
		);

	  	var beforeStartForm3 = beforeStart.substr(beforeStart.length - 2);
	  
	  	var postDateStart = beforeStartForm3 + ' ' + GetMonthName(beforeStartForm2) + ' ' + beforeStartForm1;

	  	items.push( "<li onclick='openInfo(event)' class='job-bloc " + val.jobTitle + " " + val.contractType + " " + val.remoteWork + "' id='"+key+"'><div class='content-job'><div class='left'><div class='carre'>"+firstLetterCompany+"</div></div><div class='middle'><p class='title'>" + titleLabel + "<span class='" + val.remoteWork + "'>" + tvLabel + "</span></p><p class='desc'>" + val.company + " - " + val.city + " ————— " + labelWork + "</p></div><div class='right'><a onclick='reduceData(event)' class='reduce' href='#'>Réduire</a><p class='salary'>Salaire <span>" + val.salary + "K</span></p><p class='time'>Il y a "+ compareDate +" jours</p></div></div>         <div class='bloc-info-all'> <div class='header-info'> <div class='un'>" + val.company + " - " + val.city + "</div> <div class='deux'>" + labelWork + "</div> <div class='trois'>Début le : " + postDateStart + "</div> <div class='quatre'>Bac +"+ val.studyLevel +"</div> <p>Publié il y a " + compareDate + " jours</p> </div> <div class='content-info'><p>" + val.about + "</p></div> <a href='#'>Postuler</a> </di> </li>" );

	  });
	 
	  $( "<ul/>", {
	    "class": "my-new-list",
	    html: items.join( "" )
	  }).appendTo( "#jobs-content" );

	});

	setTimeout(function() {
		$("#contrat-dp ul li").each(function() {
			$(this).siblings( 'li:contains("'+ $(this).text() +'")' ).remove();
		});
		$("#poste-dp ul li").each(function() {
			$(this).siblings( 'li:contains("'+ $(this).text() +'")' ).remove();
		});
		$("#tv-dp ul li").each(function() {
			$(this).siblings( 'li:contains("'+ $(this).text() +'")' ).remove();
		});
	}, 500);

 });
