$($('#cssmenu li').hover(mouseEnterDataButton, mouseLeaveDataButton));


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
    renderDemoAge('#age-div', 480);
}

function demoRace() {
    renderDemoRace('#race-div', 480);
}

function demoGender() {
    renderDemoGender('#gender-div', 480);
}

function income() {
    renderIncome('#income-div', 480);
}

function homeval() {
    // $('#panel').html('');
    renderHome('#homevalue-div', 480);
}

function bachdeg() {    
    renderEducation('#education-div', 480);
}