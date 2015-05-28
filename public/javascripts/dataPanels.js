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

function demoAge() {
    // console.log("inside demog()");
    //var htmlString = "<img src='//placehold.it/1000x462&text=demographics'>";
    $('#panel').html("");
    var pie = new d3pie("panel", {
    "header": {
        "title": {
            "text": "Demographics - Age",
            "fontSize": 24,
            "font": "open sans",
            "color": "#ffffff"
        },
        "subtitle": {
            "color": "#999999",
            "fontSize": 12,
            "font": "open sans"
        },
        "titleSubtitlePadding": 9
    },
    "footer": {
        "color": "#999999",
        "fontSize": 10,
        "font": "open sans",
        "location": "bottom-left"
    },
    "size": {
        "canvasWidth": 590,
        "pieOuterRadius": "87%"
    },
    "data": {
        "sortOrder": "value-asc",
        "content": [
            {
                "label": "JavaScript",
                "value": 264131,
                "color": "#2383c1"
            },
            {
                "label": "Ruby",
                "value": 218812,
                "color": "#64a61f"
            }
        ]
    },
    "labels": {
        "outer": {
            "pieDistance": 32
        },
        "inner": {
            "hideWhenLessThanPercentage": 3
        },
        "mainLabel": {
            "color": "#ffffff",
            "fontSize": 11
        },
        "percentage": {
            "color": "#ffffff",
            "decimalPlaces": 0
        },
        "value": {
            "color": "#ffffff",
            "fontSize": 11
        },
        "lines": {
            "enabled": true
        },
        "truncation": {
            "enabled": true
        }
    },
    "effects": {
        "pullOutSegmentOnClick": {
            "effect": "linear",
            "speed": 400,
            "size": 8
        }
    },
    "misc": {
        "gradient": {
            "enabled": true,
            "percentage": 100
        }
    }
});
}

function demoRace() {
    // console.log("inside demog()");
    var htmlString = "<img src='//placehold.it/1000x462&text=demographics'>";
    $('#panel').html(htmlString);
}

function demoGender() {
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
    $('#panel').html('');
    renderEducation();
    // var htmlString = "<img src='//placehold.it/1000x462&text=bachelors+degrees'>";
    // $('#panel').html(htmlString);
}