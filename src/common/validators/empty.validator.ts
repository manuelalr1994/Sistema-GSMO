export const emptyObject = (object: Object): boolean => {

    if (!object) return true;    
    const empty: boolean = (Object.keys(object).length === 0)    
    return empty;
}

export const emptyString = (string: string): boolean => {

    if (!string) return true;    
    const empty: boolean = (string.length === 0)    
    return empty;
}

export const emptyArray = (array: any[]): boolean => {

    if (!array) return true;    
    const empty: boolean = (array.length === 0)    
    return empty;
}