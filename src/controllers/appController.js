const nodemailer = require("nodemailer");
const mailgen = require('mailgen')
const {email, password} = require('../env.js')


//-------------------|| TESTING MAIL SENDING ||----------------------

const signUp = async function (req, res) {
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  let message = {
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "i am succesfully sended the mail", // plain text body
    html: "<b>Hello world?</b>", // html body
  };

  transporter.sendMail(message).then((info) => {
    return res.status(201).send({
        msg:"email has been sended",
        info: info.messageId,
        preview: nodemailer.getTestMessageUrl(info)

        })
  }).catch(error =>{
    res.status(500).send(error)
  })
};


//-------------------|| REAL MAIL SENDING ||----------------------

const sendingmail = async function(req,res){

   // let data = req.body

    let config = {
        service: "gmail",
        auth:{
            user: email,
            pass: password  
        }
    }
 
    let transporter = nodemailer.createTransport(config)

    let mailGenerator = new mailgen({
        theme: "default",
        product: {
            name: "Abhay",
            link: "https://ethereal.email"
        }
    })

    let response = {
        body:{
            name: "abhay",
            intro: "your email has arrived",
            table: {
              data: [
               {
                 item : "trimmer",
                 discription : "men beard trimmer",
                 price: "650"
                } 
                ]
            },
            outro: "please visite again"
        }
    }

    let mail = mailGenerator.generate(response)

    let message = {
        from: email,
        to:   'abhaysingh958400@gmail.com',
        subject: "place Order",
        html: mail 
    }

    transporter.sendMail(message).then(()=>{
        return res.status(201).send({msg:"you recevied a email"})
    }).catch(error =>{
        return res.status(500).send(error)
    })
}


module.exports = { signUp, sendingmail };
