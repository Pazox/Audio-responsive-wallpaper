// Returns a random number of pixels to move the particle
function vibrateParticle(len) {
	return (Math.random() - 0.5) * Math.sqrt(len /  INTENSITY_FACTOR)
}

// Gets audio input and process it, generates bass event
const listener = arr => {
    for(var i = 1; i < audioArr.length; i++) {
        audioArr[i] = audioArr[i-1]
    }

    audioArr[0] = prevprevAudio
    prevprevAudio = prevAudio
    prevAudio = audio
    audio = arr.map(function(x) {
        return x * volAmpl
    })

    let sum = 0
    for (var i = 2; i < 6; i++) {
        sum += audio[i]
    }
    let avg = sum / 6

    if (BassOccurrence(audio[SHAKE_INDEX], audio[SHAKE_INDEX - 1], sum / 6)) {
        if (shake == 0) {
            shake = Math.floor(SHAKE_VAL * Math.sqrt(avg))
        }
        triggerParticleBass()
    }
    
}

// The function contains all the sub-drawing functions
const draw = _ => {
                context.clearRect(0, 0, window.innerWidth, window.innerHeight)
                drawParticles()

                context.globalAlpha = 1

                drawAudioBar()

                if (shake > 0) {
                    shake--
                }

                rotation = mod(rotation, window.innerWidth) + moveSpeed
                requestAnimationFrame(draw)
            }


// This function is responsible for drawing the audio bar, image bass event and particle creation
function drawAudioBar() {
    // audio bar drawing
    for (const [i, part] of audio.entries()) {
        let x = ((((i * bar.width)) + ((i + 1) * bar.padding) - bar.padding / 2) + rotation * bar.width + setWidth) % setWidth - 15

        // Bass image events
        if (shake > 0) {
            funcArray[IMG_BASS_INDEX].forEach(function (func) {
                func()
            })
        }

        let avgAudio = (part + prevAudio[i] + prevprevAudio[i])
        for(var j = 0; j < audioArr.length; j++) {
            avgAudio += audioArr[j][i]
        }
        avgAudio /= (audioArr.length + 3)

        let minBor = Math.max(Math.max(Math.max(Math.min(Math.sign(Math.floor(avgAudio/LOW_VOL))*LOW_VOL, LOW_VOL)), Math.sign(Math.floor(avgAudio/MED_VOL_2))*MED_VOL_2), Math.sign(avgAudio - 1))
        let maxBor = Math.max(Math.max(Math.max(Math.sign(Math.floor(avgAudio/LOW_VOL))*MED_VOL_2, LOW_VOL)), Math.sign(Math.floor(avgAudio/MED_VOL_2)))
        let minBorDis = (avgAudio - minBor) / (maxBor - minBor)
        let maxBorDis = (maxBor - avgAudio) / (maxBor - minBor)
        try {
            
            switch (minBor) {
                case 1:
                context.fillStyle = 'rgb(' + HighVolColor[0] + ',' + HighVolColor[1] + ',' + HighVolColor[2] + ')'
                break;
                default:
                context.fillStyle = 'rgba(' + (volMap.get(minBor)[0]*maxBorDis + volMap.get(maxBor)[0]*minBorDis) + ',' + (volMap.get(minBor)[1]*maxBorDis + volMap.get(maxBor)[1]*minBorDis) + ',' + (volMap.get(minBor)[2]*maxBorDis + volMap.get(maxBor)[2]*minBorDis) + ',' + (avgAudio + 0.5) + ')'
                break;
            }
        }

        catch(error) {
            context.fillStyle = 'rgb(' + volMap.get(0)[0] + ',' + volMap.get(0)[1] + ',' + volMap.get(0)[2] +')'
        }
       
            funcArray[BAR_BASS_INDEX].forEach(function (func) {
                x += func()
            })

        context.fillRect(x, topBar + botBar * (canvas.height - bar.height * avgAudio), bar.width, bar.height * avgAudio)

        // Particle creation

        items = (items % 100) + 1
        if (part > prevAudio[i] && part > MIN_VOL_PARTICLE) {
            if (userParticleAmount - items < 0) {
                continue
            } else if (!particleArray.hasOwnProperty(context.fillStyle)) {
                    particleArray[context.fillStyle] = []
            	}
                particleArray[context.fillStyle].push(new particle(flipp * (bar.height * part - bar.height * prevAudio[i]), context.fillStyle, x, topBar * (bar.height * avgAudio) + botBar * (canvas.height - bar.height * avgAudio), BASE_PART_SIZE + (avgAudio * 20)))
            
        }
    }
}

// This function is responsible for drawing existing particles
function drawParticles() {

				// subtracts 1 from up if up is not 0
	            if (up > 0) {
                    up -= 1
                }
                context.globalAlpha = partOpa + (diffPartOpa * up / UP_CONST)


	            // particle drawing
                Object.entries(particleArray).forEach(([i, ar]) => {
                    context.fillStyle = ar[0].color
                    for (var p = ar.length - 1; p >= 0; p--) {
                        let arp = ar[p]

                        //removing particles
                        if (arp.posy >= canvas.height || arp.posx >= window.innerWidth + (window.innerWidth / arrlen) || arp.posx < -(window.innerWidth / arrlen) || arp.posy < 0) {
                            ar.splice(ar.indexOf(arp), 1)
                        } else {
                            funcArray[PART_BASS_INDEX].forEach(function (func) {
                                func(arp)
                            })
                            context.fillRect(arp.posx - 0.3 * arp.len, arp.posy, arp.len, arp.len)
                            arp.move()
                        }
                    }

                    if (ar.length == 0) {
                        delete particleArray[i]
                    }
                })
}

// The function triggers when the mouse is moved and stores it's position in a variable
function storeMouse(e) {
	if (!e) e = window.event;
	mouse = {
	    clientX: e.clientX,
	    clientY: e.clientY
	};
}

// Necessary for debugging (needs to uncomment the label in the body tag)
function debug(value) {
    document.getElementById("label").innerHTML = value
}