const bcrypt = require('bcrypt');

let hashPass = async(simplepassword)=>{
    const saltRound = 10;
    let hasspassword = await bcrypt.hashSync(simplepassword , saltRound);
    return hasspassword;       
    }
    let comparepassword = async (simplepassword,hasspassword)=>{
    let compared = await bcrypt.compare (simplepassword,hasspassword)
    return compared
    }
    module.exports={hashPass,comparepassword}