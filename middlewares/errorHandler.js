const errorHandlerMiddleware = (err, req, res, next) => {
  let customeError = {
    statusCode: err.statusCode || 500,
    message: err.message || "somthing wronge try again",
  };
  if(err.message==="incorrect email"){
    customeError.email="incorrect email"
  }
  if(err.message==="incorrect password"){
    customeError.password="incorrect password"
  }
  if(err.code===11000){
    customeError.email="this email is already use" 
    customeError.statusCode=401
  }
  if(err.name.includes("ValidationError")){
    Object.values(err.errors).forEach(({properties})=>{
      customeError[properties.path]=properties.message
    })
    customeError.statusCode=401
  }
  res.status(customeError.statusCode).json({err:customeError})
};
module.exports = errorHandlerMiddleware;

