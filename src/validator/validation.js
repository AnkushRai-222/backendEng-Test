const validEmail=function(email){
     const emailRegex=/^[\w-\.]+@([\w-]+\.)+[\w-][a-z]{1,4}$/
    return emailRegex.test(email)
}
const validMobile=function(mobile){
    const mobileRegex=/^[6789]\d{9}$/

    return mobileRegex.test(mobile)
}
const ValidName=function(name){
    const nameRegex=/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/
    return nameRegex.test(name)
}

const validDate = function (value) {
    let dateFormatRegex = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/
    if (dateFormatRegex.test(value)) {
      return true
    } else {
      return false
    }
  }
module.exports = {validEmail,validMobile,ValidName,validDate}