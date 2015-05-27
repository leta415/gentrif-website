$(overview());
$($('#cssmenu li').hover(mouseEnterDataButton, mouseLeaveDataButton));

// Set up hover for data buttons
function mouseEnterDataButton() {
    var id = $(this).attr('id');
    // console.log("inside mouseEnterDataButton()");
    if (id == 'overviewButton') {
        overview();
    } else if (id == 'mapButton') {
        map();
    } else if (id == 'demographicsButton') {
        demog();
    } else if (id == 'incomeButton') {
        income();
    } else if (id == 'homevaluesButton') {
        homeval();
    } else if (id == 'bachdegreesButton') {
        bachdeg();
    }
}
function mouseLeaveDataButton() {}


// Set up data visualization change for click or hover
function overview() {
    // console.log("inside overview()");
    var htmlString = "<img src='//placehold.it/1000x462&text=overview'>";
    $('#panel').html(htmlString);
}

function map() {
    // console.log("inside map()");
    var htmlString = "<img src='//placehold.it/1000x462&text=map'>";
    $('#panel').html(htmlString);
}

function demog() {
    // console.log("inside demog()");
    var htmlString = "<img src='//placehold.it/1000x462&text=demographics'>";
    $('#panel').html(htmlString);
}

function income() {
    // console.log("inside income()");
    var htmlString = "<img src='//placehold.it/1000x462&text=household+income'>";
    $('#panel').html(htmlString);
}

function homeval() {
    // console.log("inside homeval()");
    var htmlString = "<img src='//placehold.it/1000x462&text=home+values'>";
    $('#panel').html(htmlString);
}

function bachdeg() {
    // console.log("inside bachdeg()");
    var htmlString = "<img src='//placehold.it/1000x462&text=bachelors+degrees'>";
    $('#panel').html(htmlString);
}