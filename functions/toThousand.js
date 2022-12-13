const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.export = (data)=>{
    return toThousand(data)
}
