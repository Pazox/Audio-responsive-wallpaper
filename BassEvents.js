// Picture movement
movePic = function() {
    let randomNum = Math.floor(Math.random() * 8)
    verDir = MOVES[randomNum][0]
    horDir = MOVES[randomNum][1]

    let topOffset = Math.min((shake / (canvas.height * 0.007) + (shake)) * verDir / IMG_BASE_DIVIDOR - TOP_OFFSET, 0)
    let leftOffset = Math.min((shake / (canvas.width * 0.007) + (shake)) * horDir / IMG_BASE_DIVIDOR - LEFT_OFFSET, 0)
    div.style.backgroundPosition = leftOffset + "px " + topOffset + "px"
}

// Shaking the bar
shakeBar = function() {
    return (shake % 4) * Math.pow(-1, shake % 2)
}

// Blurs and saturates the image
imageEffects = function() {
	    div.style.webkitFilter = "blur(" + blur * up / UP_CONST + "px) saturate(" + (100 + saturation * up / UP_CONST) + "%)"
}

// Checks if a bass event is enabled. If so it adds it to the enabled events, and disables it otherwise
checkUserBassEvent = function(isEnabled, bassEvent, funcIndex) {
    if(isEnabled) {
        funcArray[funcIndex].push(bassEvent)
    } else {
        let index = funcArray[funcIndex].indexOf(bassEvent)
        
        if(index >= 0)
            funcArray[funcIndex].splice(index, 1)
    }
}

// Responsible for generating particle bass event
particlesBassEvent = function(particle) {
    particle.posy += (up * flipp / 2.5) / (Math.abs(particle.velocity) / 10)
}

// This function checks if a bass events should trigger
BassOccurrence = function(audioIndex1, audioIndex2, avg) {
    if (audioIndex1 > MIN_AUDIO_SHAKE && audioIndex2 > MIN_AUDIO_SHAKE && avg > 0.215) {
        return true
    } else
    return false
}