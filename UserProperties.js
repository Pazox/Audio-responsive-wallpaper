// User values change
function changeUserValues() {
    window.wallpaperPropertyListener = {
        applyUserProperties: function(properties) {

            // Particle amount in percentage
            if (properties.customint) {
                if (properties.customint.value !== "") {
                    userParticleAmount = properties.customint.value
                } else
                    userParticleAmount = 0
            }

            // Bar's movement speed
            if (properties.barSpeed) {
                if (properties.barSpeed.value !== "") {
                    moveSpeed = properties.barSpeed.value / 500
                } else {
                    moveSpeed = 0
                }
            }

            // Mouse gravity
            if (properties.grav) {
                if (properties.grav.value !== "") {
                    grav = properties.grav.value
                } else {
                    grav = 0
                }
            }
            
            // Bar bass action
            if (properties.bassAction) {
                if (properties.bassAction.value !== "") {
                    bassBar = properties.bassAction.value
                    checkUserBassEvent(properties.bassAction.value, shakeBar, BAR_BASS_INDEX)
                }
            }

            // Image bass action
            if (properties.bassImg) {
                if (properties.bassImg.value !== "") {
                    checkUserBassEvent(properties.bassImg.value, movePic, IMG_BASS_INDEX)
                }
            }

            // Particle bass action
            if (properties.bassParticle) {
                if (properties.bassParticle.value !== "") {
                        checkUserBassEvent(properties.bassParticle.value, particlesBassEvent, PART_BASS_INDEX)
                        checkUserBassEvent(properties.bassParticle.value, changeAlpha, STATIC_BASS_INDEX)
                    }
            }

            // Particle vibration
            if (properties.Vibrate) {
                if (properties.Vibrate.value !== "") {
                    if(properties.Vibrate.value == true) {
                        vibrate = vibrateParticle
                    } else {
                        vibrate = function() {return 0}
                    }
                }
            }

            // Volume amplification
            if (properties.volAmp) {
                if (properties.volAmp.value !== "") {
                    volAmpl = AMP_DEF + properties.volAmp.value / 2
                } else {
                    volAmpl = AMP_DEF
                }
            }

             // Picture blur amount
            if (properties.blur) {
                if (properties.blur.value !== "") {
                    blur = properties.blur.value / 10
                } else {
                    blur = 0
                }
            }

             // Picture saturation
            if (properties.saturation) {
                if (properties.saturation.value !== "") {
                    saturation = properties.saturation.value
                } else {
                    saturation = 0
                }
            }

            // Bar's position (top or bottom screen)
            if (properties.flip) {                          // TODO: reduce variables
                if (properties.flip.value == true) {
                    flipp = 1
                } else {
                    flipp = -1
                }
            }

            // High volume color
            if (properties.HighVol) {
                if (properties.HighVol.value != "") { // Convert the custom color to be applied as a CSS style 
                    customColor = properties.HighVol.value.split(' ');
                    customColor = customColor.map(function(c) {
                        return Math.ceil(c * 255);
                    });
                    document.body.style.background = "rgb(" + customColor[0] + "," + customColor[1] + "," + customColor[2] +")"
                    HighVolColor = customColor;
                    volMap.delete(1)
                    volMap.set(1, HighVolColor)
                }
            }

            // Second medium volume color
            if (properties.MedVol2) {
                if (properties.MedVol2.value != "") { // Convert the custom color to be applied as a CSS style 
                    customColor2 = properties.MedVol2.value.split(' ');
                    customColor2 = customColor2.map(function(c) {
                        return Math.ceil(c * 255);
                    });
                    MedVolColor2 = customColor2
                    volMap.delete(MED_VOL_2)
                    volMap.set(MED_VOL_2, MedVolColor2)
                }
            }

            // First medium volume color
            if (properties.MedVol) {
                if (properties.MedVol.value != "") { // Convert the custom color to be applied as a CSS style 
                    customColor3 = properties.MedVol.value.split(' ');
                    customColor3 = customColor3.map(function(c) {
                        return Math.ceil(c * 255);
                    });
                    MedVolColor = customColor3
                    volMap.delete(LOW_VOL)
                    volMap.set(LOW_VOL, MedVolColor)
                }
            }

            // Low volume color
            if (properties.LowVol) {
                if (properties.LowVol.value != "") { // Convert the custom color to be applied as a CSS style 
                    customColor4 = properties.LowVol.value.split(' ');
                    customColor4 = customColor4.map(function(c) {
                        return Math.ceil(c * 255);
                    });
                    LowVolColor = customColor4;
                    volMap.delete(0)
                    volMap.set(0, LowVolColor)
                }
            }

            // TODO: apply picture change on demand
            // Background selection
            if (properties.bgImage) {
                if (!properties.bgImage.value) {
                    if (properties.backgr) {
                        if (properties.backgr.value != "") {
                            let cust = properties.backgr.value.split(' ')
                            cust = cust.map(function(c) {
                                return Math.ceil(c * 255)
                            })
                            div.style.background = 'rgba(' + cust + ',1)'
                        }
                    }
                } else {
                    if (properties.customimage) {
                        if (properties.customimage.value != "") {
                            div.style.background = 'rgba(0,0,0,0)'
                            properties.customimage.value = properties.customimage.value.replace("%3A", ":")
                            div.style.background = "url('" + properties.customimage.value + "')"
                            div.style.backgroundRepeat = "no-repeat"
                            div.style.backgroundPosition = "-" + LEFT_OFFSET + "px -" + TOP_OFFSET + "px"
                            div.style.backgroundSize = "110% 110vh"
                        }
                    }
                }
            }

            if (properties.modern) {
                if (properties.modern.value) {
                    bar.width = (setWidth / arrlen)
                    bar.padding = 0
                } else {
                    bar.width = (setWidth / arrlen) - 1
                    bar.padding = 1
                }
            }


            // Particle's base opacity
            if (properties.partOpacity) {
                if (properties.partOpacity.value != "") { // Convert the custom color to be applied as a CSS style 
                    partOpa = properties.partOpacity.value / 100
                    diffPartOpa = 1 - partOpa
                }
            }
        }
    }
}