function generateShortURL(originalURL)
{
    const randomLength = 5
    const randomChr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split('')
    let randomShortURL = ''
    for (i = 0; i < randomLength; i++) {
        randomShortURL += randomChr[Math.floor(Math.random() * randomChr.length)]
    }
    return randomShortURL
}

module.exports = generateShortURL