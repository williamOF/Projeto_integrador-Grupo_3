module.exports = (data) => {
    let dia  = data.split("/")[0];
    let mes  = data.split("/")[1];
    let ano  = data.split("/")[2];
  
    return ano + '-' + ("0"+mes).slice(-2) + '-' + ("0"+dia).slice(-2);
    // Utilizo o .slice(-2) para garantir o formato com 2 digitos.
  }