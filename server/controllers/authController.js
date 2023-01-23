//PACKAGES
var Joi = require("joi");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var pool = require("../helpers/database");
var { jwtSecret }= require('../config/config');

async function registerUser(request, response) {
  let requestData = request.body;

  dataValidationResponse = await validateUserRegistrationData(
    requestData,
    response
  );
  if (dataValidationResponse.error === true) {
    return response.status(400).send(dataValidationResponse.message);
  }

  // hash user password
  try {
    dataValidationResponse.validatedData.password = await hashPassword(
      dataValidationResponse.validatedData.password
    );
  } catch (error) {
    console.log(error);
    return response.send("Something went wrong, try again");
  }

  console.log(dataValidationResponse);

  //
  try {
    sqlQuery = "INSERT INTO users(full_name, email, password) VALUES (?, ?, ?)";
    await pool.query(sqlQuery, [
      dataValidationResponse.validatedData.fullName,
      dataValidationResponse.validatedData.email,
      dataValidationResponse.validatedData.password,
    ]);
    return response.status(200).send("Registration successful");
  } catch (error) {
    console.log(error);
    if (error.errno === 1062) {
      return response.status(400).send("Email already exists");
    } else return response.status(400).send("Something went wrong, try again");
  }
}

async function loginUser(request, response) {
  let requestData = request.body;

  let dataValidationResponse = await validateUserLoginData(
    requestData,
    response
  );
  if (dataValidationResponse.error === true) {
    return response.status(400).send(dataValidationResponse.message);
  }
  // looks for user in users database. if not found returns message
  try {
    sqlQuery = "SELECT * FROM users WHERE email=?";
    var userDataFromDB = await pool.query(
      sqlQuery,
      dataValidationResponse.validatedData.email
    );
    if (!userDataFromDB[0]) {
      return response
        .status(200)
        .send("User not found. Please check email and password");
    }
  } catch (error) {
    console.log(error);
    return response.status(400).send("Something went wrong");
  }

  // verifies users password input 
  let userIsAuthed = verifyLoginPassword(
    userDataFromDB[0].password,
    dataValidationResponse.validatedData.password
  )

  if(userIsAuthed){
    // return response.status(200).send('User is authenticated')
    let token = createToken(userDataFromDB[0])
    if(!!token){
      return response.status(200).send({ message: 'User is authenticated', token})
    } else if (!token){
      return response.status(400).send('Something went wrong, please try again')
    }
  } else if (!userIsAuthed){
    return response.status(401).send('Incorrect Password')
  }
}

// -----------------------  LOCAL FUNCTIONS  --------------------------

//INPUT user input data object RETURNS returns error t/f and validated object or error
async function validateUserRegistrationData(data) {
  let userSchema = Joi.object({
    fullName: Joi.string().required(),
    email: Joi.string().required().lowercase().email().messages({
      "string.email": "Email must be valid",
    }),
    password: Joi.string().required(),
  });
  try {
    const validatedData = await userSchema.validateAsync(data);
    return { error: false, validatedData };
  } catch (error) {
    console.log(error);
    return { error: true, message: error.details[0].message };
  }
}

//INPUT user input data object RETURNS returns error t/f and validated object or error
async function validateUserLoginData(data) {
  let userSchema = Joi.object({
    email: Joi.string().required().lowercase().email(),
    password: Joi.string().required()
  });
  try {
    const validatedData = await userSchema.validateAsync(data);
    return { error: false, validatedData };
  } catch (error) {
    console.log(error);
    return { error: true, message: "Incorrect email or password" };
  }
}

// INPUT string password RETURNS hashed input
function hashPassword(password) {
  hashedPassword = bcrypt.hashSync(password);
  return hashedPassword;
}

//INPUT users entered password and hashed user password RETURNS t/f
function verifyLoginPassword(userPassword, loginPassword) {
  return bcrypt.compareSync(loginPassword, userPassword);
}

//INPUT user data RETURNS token
function createToken(userData){
  let token = jwt.sign({id: userData.id, email: userData.email} ,jwtSecret)
  return token
}

module.exports = {
  registerUser,
  loginUser,
};
