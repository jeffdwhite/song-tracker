const joi = require('joi');
const connection = require('../config/connection');

module.exports = {
  async createUser (req, res, next) {
    //Joi schema
    const schema = {
      //email must be in one of the listed domains and must be in two pieces (x.y)
      email: joi.string().email({
        "tldWhitelist": ["com","net","edu","org","gov"],
        "minDomainAtoms": 2
        }),
      //see below for RegEx explanation
      password: joi.string().regex(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()+=])(?=\S+$).{8,32}$/)
    };

    //Joi validation, need to remove confirmPassword
    const reqAlter =
    { email: req.body.email,
      password: req.body.password
    };
    const {error, value} = joi.validate(reqAlter, schema);

    //Connect to MarkLogic
    const dbReader = connection.marklogicConnect('dbReader');
    //create uri from email address
    const uri = `/user/${req.body.email}.json`;


    //test 1:  do the two entered passwords match?
    if (req.body.password !== req.body.confirmPassword) {
      res.status(400).send({error: "Your passwords do not match."});
    //test 2:  did a Joi validation from above fail?
    } else if (error) {
      switch(error.details[0].context.key) {
        case 'email': res.status(400).send({error: "Please provide a valid email address"});
        break;
        case 'password': res.status(400).send({error: "Please provide a valid password.<br>The password must be at least 8-32 digits long.<br>The password must contain at least 1 digit, lowercase, uppercase, and special character."});
        break;
        default: res.status(400).send({error: "Invalid registration information"});
      }
    //test 3:  does the user already exist in the database?
    } else {
      try {
        response = await dbReader.documents.probe(uri).result();
        if (response.exists) {
          res.status(400).send({error: "This email address is already is use!"});
        } else {
          next();
        }
      } catch (err) {
        res.status(500).send({error: "An unknown error has occurred, please try again."});
        // console.log(JSON.stringify(err, null, 2));
      };
    };
  }

};

/*
RegEx Explanation

^                 # start-of-string
(?=.*[0-9])       # a digit must occur at least once
(?=.*[a-z])       # a lower case letter must occur at least once
(?=.*[A-Z])       # an upper case letter must occur at least once
(?=.*[@#$%^&+=])  # a special character must occur at least once
(?=\S+$)          # no whitespace allowed in the entire string
.{8,}             # anything, at least eight places though
$                 # end-of-string

more simple logic RegEx validator:  ^[a-zA-Z0-9]{8-32}$
*/