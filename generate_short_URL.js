function generateShortURL(originalURL)
{
    const randomLength = 5
    const randomChr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'  
    let randomShortURL = ''
    for (i = 0; i < randomLength; i++) {
        randomShortURL += randomChr[Math.floor(Math.random() * randomChr.length)]
    }
    return randomShortURL
}

function generateShortURLWithoutDuplicate(originalURL, duplicateShortURL){
    duplicate = true
    let randomShortURL = ''
    while (duplicate){
        let randomShortURL = generateShortURL(originalURL)
        if (duplicateShortURL !== randomShortURL)
            duplicate = false
    }
    return randomShortURL
}

module.exports = generateShortURL, generateShortURLWithoutDuplicate