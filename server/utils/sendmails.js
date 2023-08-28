const nodemailer = require("nodemailer");
require("dotenv").config();

exports.sendmails = async (email,title,body) => {
    try{
        const mailer = nodemailer.createTransport({
            host : process.env.HOST,
            auth : {
                user : process.env.USER,
                pass : process.env.PASS,
            }
        });

        await mailer.sendMail({
            from : "BLOG TEAM",
            to : email,
            subject : title,
            html : body,            
        });

        return {
            success : true,
            message : "mail sent successfully,",
    };

    }
    catch(e){
        return {
            success : false,
            message : "Unable to send a mail",
    };
    }
}

