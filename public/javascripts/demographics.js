/*** pie chart for demographics - age ***/
var index = -1;
function renderDemoAge(element, canvasWidth, canvasHeight, cityName) {
   // console.log(cityName);
    var values = [];
    $.getJSON('/data/demographics?filter=age').done(function(data) {
        $(element).html('');
        var i = data.rows.length;
        //console.log(data);
        while( i--){
            if(data.rows[i].Area == cityName){
                index = i;
                break;
            }
        }
        
        var ages = data.rows[index].Age;
        $.each(ages, function(i, val){
            values.push(val);
        });

       var pie = new d3pie(element.substring(1), {
        "header": {
            "title": {
                "text": cityName + " Age Groups",
                "fontSize": 20,
                "font": "open sans",
                "color": "#ffffff"
            }
        },
        "size": {
            "canvasWidth": canvasWidth,
            "canvasHeight": canvasHeight,
            "pieInnerRadius": null,
            "pieOuterRadius": "77%"
        },
        "data": {
            "sortOrder": "label-asc",
            "content": [
                {
                    "label": "0-4",
                    "value": values[0],
                    "color": "#2383c1"
                },
                {
                    "label": "5-14",
                    "value": values[1],
                    "color": "#64a61f"
                },
                {
                    "label": "15-24",
                    "value": values[2],
                    "color": "#7b6788"
                },
                {
                    "label": "25-44",
                    "value": values[3],
                    "color": "#a05c56"
                },
                {
                    "label": "45-64",
                    "value": values[4],
                    "color": "#961919"
                },
                {
                    "label": "65+",
                    "value": values[5],
                    "color": "#d8d239"
                }
            ]
        },
        "labels": {
            "outer": {
                "pieDistance": 10
            },
            "inner": {
                "hideWhenLessThanPercentage": 3
            },
            "mainLabel": {
                "color": "#c43d3d",
                "fontSize": 12
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
                "enabled": false
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
    });    
}

/*** pie chart for demographics - race ***/
function renderDemoRace(element, canvasWidth, canvasHeight, city) {
    var values = [];
    $.getJSON('/data/demographics?filter=race').done(function(data) {
        $(element).html('');
        var races = data.rows[index].Race;
        $.each(races, function(i, val){
            values.push(val);
        });

       var pie = new d3pie(element.substring(1), {
        "header": {
            "title": {
                "text": city + " Race Groups",
                "fontSize": 20,
                "font": "open sans",
                "color": "#ffffff"
            }
        },
        "size": {
            "canvasWidth": canvasWidth,
            "canvasHeight": canvasHeight,
            "pieInnerRadius": "25%",
            "pieOuterRadius": "77%"
        },
        "data": {
            "sortOrder": "label-asc",
            "content": [
                {
                    "label": "White",
                    "value": values[0],
                    "color": "#2383c1"
                },
                {
                    "label": "Hispanic",
                    "value": values[1],
                    "color": "#64a61f"
                },
                {
                    "label": "Black",
                    "value": values[2],
                    "color": "#7b6788"
                },
                {
                    "label": "Asian/Pacific Islander",
                    "value": values[3],
                    "color": "#a05c56"
                },
                {
                    "label": "Other",
                    "value": values[4],
                    "color": "#961919"
                }
            ]
        },
        "labels": {
            "outer": {
                "pieDistance": 18
            },
            "inner": {
                "hideWhenLessThanPercentage": 3
            },
            "mainLabel": {
                "color": "#c43d3d",
                "fontSize": 10
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
    });    
}

/*** pie chart for demographics - gender ***/
function renderDemoGender(element, canvasWidth, canvasHeight, city) {
    var values = [];
    $.getJSON('/data/demographics?filter=gender').done(function(data) {
        $(element).html('');
        var genders = data.rows[index].Gender;
        $.each(genders, function(i, val){
            values.push(val);
        });

       var pie = new d3pie(element.substring(1), {
        "header": {
            "title": {
                "text": city + " Gender Groups",
                "fontSize": 20,
                "font": "open sans",
                "color": "#ffffff"
            }
        },
        "size": {
            "canvasWidth": canvasWidth,
            "canvasHeight": canvasHeight,
            "pieInnerRadius": null,
            "pieOuterRadius": "80%"
        },
        "data": {
            "sortOrder": "label-asc",
            "content": [
                {
                    "label": "Male",
                    "value": values[0],
                    "color": "#2383c1"
                },
                {
                    "label": "Female",
                    "value": values[1],
                    "color": "#64a61f"
                }
            ]
        },
        "labels": {
            "outer": {
                "pieDistance": 17
            },
            "inner": {
                "hideWhenLessThanPercentage": 3
            },
            "mainLabel": {
                "color": "#c43d3d",
                "fontSize": 12
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
    });

    
}