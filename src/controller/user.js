
const userModel = require("../model/userSchema")

//-------------------------------------[ CREATE USER ]---------------------------------------//
const createUser = async function (req, res) {
    try {
      let data = req.body;
      let file = req.files;
  
      if (Object.keys(data).length == 0) { return res.status(400).send({ status: false, message: "Please give some data" }); }
  
      let { username , email , password ,profilePicture } = data;
  
      if (!username) { return res.status(400).send({ status: false, message: "usernameis mandatory" }); }
      if (!email) { return res.status(400).send({ status: false, message: "Email is mandatory" }); }
      if (file && file.length == 0) { return res.status(400).send({ status: false, message: "ProfileImage is a mandatory" }); }
      if (!password) { return res.status(400).send({ status: false, message: "Password is mandatory" }); }

      if (!validEmail(email)) { return res.status(400).send({ status: false, message: "Please provide correct email" }); }
      let findEmail = await userModel.findOne({ email });
      if (findEmail) { return res.status(400).send({ status: false, message: "User with this email already exists" }); }
      
      if (!validPassword(password)) { return res.status(400).send({ status: false, message: "Password Should be (8-15) in length with one upperCase, special character and number" }); }
      
      
      //..hashing
      const saltRounds = 10;
      const hash = bcrypt.hashSync(password, saltRounds)
      
      
      if (file && file.length > 0) {
        if (!isValidImg(file[0].originalname)) { return res.status(400).send({ status: false, message:"Please provide image in jpg|gif|png|jpeg|jfif " }); } 
      }
      let url = await uploadFile(file[0]);
      
      const userData = {
        username:username , email: email, password: hash
      }
      
      const user = await userModel.create(userData);
      return res.status(201).send({ status: true, message: "User created successfully", data: user });
  
    }
    catch (error) {
      return res.status(500).send({ status: false, message: error.message });
    }
  }
  
module.exports = {createUser}