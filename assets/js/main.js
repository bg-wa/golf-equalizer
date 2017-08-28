var player_data = []
var AVERAGE_SLOPE = 113

$(document).foundation();
$(document).ready(function(){
    init();
})


function updateSlope() {
    var course_slope = $('#course-slope-input').val();
    course_slope = course_slope == '' ? 0 : course_slope

    if (isInt(course_slope)){
        localStorage.setItem('golf-equalizer-course-slope', course_slope);
        redrawTable()
    }else{
        alert('Course Slope must be a number.')
    }
}

function addPlayer() {
    var player_name = $('#new-player-name-input').val();
    var player_handicap = $('#new-player-handicap-input').val();

    if (isInt(player_handicap)){
        var new_player = {
            name: player_name,
            handicap: player_handicap
        }

        player_data.push(new_player);
        redrawTable();

        $('#new-player-name-input').val('');
        $('#new-player-handicap-input').val('');
    }else{
        alert('Handicap must be a number.')
    }
}

function removePlayer(index){
    player_data.splice(index, 1);
    redrawTable();
}

function drawTable() {
    var course_slope = localStorage.getItem('golf-equalizer-course-slope');
    $.each(player_data, function(index, player){
        $('#players-table-body').append('<tr class="player"><td>' + player.name + '</td><td>'
            + player.handicap +  '</td><td>' + Math.ceil((course_slope/AVERAGE_SLOPE)*player.handicap) + '</td><td><a href="#" onclick="removePlayer(' + index + ')">Delete</a></td></tr>');
    })
}

function redrawTable(){
    localStorage.setItem('golf-equalizer-player-data', JSON.stringify(player_data));
    clearTable();
    drawTable();
}

function clearTable() {
    $('#players-table .player').remove();
}

function isInt(value) {
    if (isNaN(value)) {
        return false;
    }
    var x = parseFloat(value);
    return (x | 0) === x;
}


function init() {
    var player_data_string = localStorage.getItem('golf-equalizer-player-data');
    player_data = (player_data_string) ? JSON.parse(player_data_string) : [];

    $('#course-slope-input').val(localStorage.getItem('golf-equalizer-course-slope'));

    drawTable();
}