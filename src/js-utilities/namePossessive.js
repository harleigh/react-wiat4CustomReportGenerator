

export function setPossessive( sName ) {
    if( sName.slice(-1).toLowerCase() ==="s"){
        return  sName+"'"
    } else {
        return sName+"'s"
    }
}
