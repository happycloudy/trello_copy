const randomId = ():number => {
    return Math.random() + Date.now()
}

export default randomId