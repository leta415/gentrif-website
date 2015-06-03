// $(overview());
$($('#cssmenu li').hover(mouseEnterDataButton, mouseLeaveDataButton));
$(document).ready(function(){
    demoAge();
    demoRace();
    demoGender();
});

// Set up hover for data buttons
function mouseEnterDataButton() {
    var id = $(this).attr('id');
    // console.log("inside mouseEnterDataButton()");
    if (id == 'overviewButton') {
        overview();
    } else if (id == 'mapButton') {
        map();
    } else if (id == 'demographicsAButton') {
        demoAge();
    } else if (id == 'demographicsRButton') {
        demoRace();
    } else if (id == 'demographicsGButton') {
        demoGender();
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
function demoAge() {
    renderDemoAge('#age-div', 590);
}

function demoRace() {
    renderDemoRace('#race-div', 590);
}

function demoGender() {
    renderDemoGender('#gender-div', 590);
}

function income() {
    renderIncome();
}

function homeval() {
    $('#panel').html('');
}

function bachdeg() {    
    renderEducation('#panel', 960, 462);
}