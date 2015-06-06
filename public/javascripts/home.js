function renderHome(element,cityName) {
    $('#panel').html('');
    var home;
    $.getJSON('/data/homevalue').done(function(data) {
        var i = data.rows.length;
        //console.log(data);
        while( i--){

            if(data.rows[i].Area == cityName){
                home = data.rows[i]['Median Home Value'];
                break;
            }
        }
        $(element).html("<div>Median home value in " + cityName + "</div><div>" + "$" + home + "</div>");
    });
}