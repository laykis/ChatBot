var stompClient = null;

function connect() {

    var socket = new SockJS('/ws');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function () {
        onConnected(true);
        stompClient.subscribe('/topic/public', function (message) {
            console.log(message)
            showMessage("<img src='robot.png'/> : " + message.body)
        });
    });
}


function onConnected(connected) {

    $("#send").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#msg").html("");

}


function sendMessage() {
    let message = $("#msg").val()
    showMessage("<img src='face.png'/> : " + message);
    stompClient.send("/app/sendMessage", {}, JSON.stringify(message));

}

function showMessage(message) {
    $("#communicate").append("<tr><td>" + message + "</td></tr>");

    let chat = document.querySelector('#scrollpage');
    chat.scrollTop = chat.scrollHeight;
}

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $( "#send" ).click(function() { sendMessage(); });
});

connect();