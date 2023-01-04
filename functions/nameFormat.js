
module.exports = (fullname) =>{
    let firstName = fullname.split(" ")[0];
    let secondName = fullname.split(" ")[1];

    if(!secondName){
        return firstName; 
    }else{
        return `${firstName} ${secondName}`
    }
}