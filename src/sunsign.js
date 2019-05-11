#!c:/progra~1/nodejs/node

class SunSign {
    getSunSign(name, dob) {
        let day = parseInt(dob.split('/')[0], 10);
        let month = parseInt(dob.split('/')[1], 10);
        // console.log(`day and month: ${day} and ${month}`);
    
        let astroSign; 
              
        // checks month and date within the  
        // valid range of a specified zodiac 
        if (month === 12){     
            if (day < 22) {
                astroSign = "Sagittarius";
            }
            else {
                astroSign ="capricorn";
            }
        } else if (month === 1){ 
            if (day < 20) {
                astroSign = "Capricorn";
            } else {
                astroSign = "aquarius";
            }
        } else if (month === 2){ 
            if (day < 19) {
                astroSign = "Aquarius"; 
            } else {
                astroSign = "pisces";
            } 
        } else if(month === 3){ 
            if (day < 21) {
                astroSign = "Pisces";
            } else {
                astroSign = "aries";
            }
        } else if (month === 4){ 
            if (day < 20) 
                astroSign = "Aries"; 
            else
                astroSign = "taurus"; 
        } else if (month === 5){ 
            if (day < 21) 
                astroSign = "Taurus"; 
            else
                astroSign = "gemini"; 
        } else if( month === 6){ 
            if (day < 21) 
                astroSign = "Gemini"; 
            else
                astroSign = "cancer"; 
        } else if (month === 7){ 
            if (day < 23) 
                astroSign = "Cancer"; 
            else
                astroSign = "leo"; 
        } else if( month === 8){ 
            if (day < 23)  
                astroSign = "Leo"; 
            else
                astroSign = "virgo"; 
        } else if (month === 9){ 
            if (day < 23) 
                astroSign = "Virgo"; 
            else
                astroSign = "libra"; 
        } else if (month === 10){ 
            if (day < 23) 
                astroSign = "Libra"; 
            else
                astroSign = "scorpio"; 
        } else if (month === 11){ 
            if (day < 22) 
                astroSign = "scorpio"; 
            else
                astroSign = "sagittarius"; 
        } 
        return astroSign;
    };
};

module.exports = SunSign;
