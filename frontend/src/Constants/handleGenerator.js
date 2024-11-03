class HandleGenerator{
    constructor(defaultType = "source", dedaultPosistion = "right"){
        this.defaultType = defaultType;
        this.defaultPosition = dedaultPosistion;
        this.handleCounter = 0;
    }
    createHandle(type = this.defaultType, position = this.defaultPosition, name = ""){
        const id  = `${type}-${this.handleCounter++}`;
        return {
            id: id,
            type: type,
            position: position,
            name: name
        }  
    }
}

export default HandleGenerator;