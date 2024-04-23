const ErrorService = require("../service/errorsService");

module.exports = (req, res, next) => {
    try {
/* Получаем данные о пользователе  */
       const fingerprint = req.fingerprint.components;
       const location = fingerprint.geoip.country
         ? fingerprint.geoip.city
           ? `${fingerprint.geoip.country}, ${fingerprint.geoip.city}`
           : fingerprint.geoip.country
         : "локация неизвестна";
       const browser = fingerprint.useragent.browser.family
         ? fingerprint.useragent.browser.family
         : "неизвестный браузер";
       const device = fingerprint.useragent.device.family
         ? fingerprint.useragent.device.family
         : "неизвестное устройство";
       const os = fingerprint.useragent.os.family
         ? fingerprint.useragent.os.family
         : "неизвестная ОС";

         req.location = location
         req.device = device
         req.browser = browser
         req.os=os
         next()
    } catch (e) {
        ErrorService(e, res)
    }
       

}