'use strict'
exports['/database/esp8266/read'] = (message) => {
    //TODO add NoSQL db
    console.log(message);
};

exports['/database/esp8266/write'] = (message) => {
    message = String(message);
    console.log(`Recived ${message} at /database/esp8266/write`);
};
