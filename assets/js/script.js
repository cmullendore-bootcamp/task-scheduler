
function LoadTasks(dateStamp) {
    var tasksJson = localStorage.getItem(`tasksdate-${dateStamp}`);
    var tasks = [];
    if (tasksJson) {
        tasks = JSON.parse(tasksJson);
    }

    $(tasks).each(function() {
        var cellId = "#" + this.hour;
        var eventsCell = $(cellId);
        $(eventsCell).empty().html(this.activities);
    });
}

function SaveTasks(dateStamp) {
    var tasks = []
    var cols = $(".eventcol");
    $(cols).each(function() {
        tasks.push({
            hour: $(this).attr("id"),
            activities: $(this).html()
        });
    });
    localStorage.setItem(`tasksdate-${dateStamp}`, JSON.stringify(tasks));
}

function ElapseDay() {
    var currHour = moment().format("HH");
    $(".eventcol").each(function() {
        if ($(this).attr("id") < currHour) {
            $(this).removeClass("present future");
            $(this).addClass("past");
        } else if ($(this).attr("id") == currHour) {
            $(this).removeClass("past future");
            $(this).addClass("present");
        }
        else {
            $(this).removeClass("past present");
            $(this).addClass("future");
        }
    })
}

$(".eventcol").on("click", function() {
    if ($(this).children("textarea").length > 0) {
        return;
    }
    var currentText = $(this).text();
    var textarea = $("<textarea>")
    $(textarea)
        .text(currentText);
    $(this).empty();
    $(this).append(textarea);
    $(textarea).focus();
});

$(".saveBtn").on("click", function() {
    var editBox = $(this).parent().children(".eventcol").children("textarea");
    
    if (editBox) {
        var toSave = $(editBox).val();
        var parent = $(editBox).parent()
        parent.empty();
        parent.append(toSave);
    }

    var dateStamp = moment().format("YYYYMMDD");

    SaveTasks(dateStamp);
});

var int = setInterval(ElapseDay, (1000 * 60 * 60));
ElapseDay();
LoadTasks(moment().format("YYYYMMDD"));