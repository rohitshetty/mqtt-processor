exports['/database/esp8266/read'] = function (message) {
    console.log(message);
};

exports['/database/esp8266/write'] = function (message) {
    message = String(message);
    console.log("Recived ", message , " at /database/esp8266/write");
};
