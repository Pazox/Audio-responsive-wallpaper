// This class represents a particle created by big enough difference in volume
var particle = class particle {
    constructor(velocity, color, posx, posy, len) {
        if (Math.abs(velocity) < 5)
            this.velocity = 10 * Math.sign(velocity)
        else
            this.velocity = velocity
        this.color = color
        this.posx = posx
        this.posy = posy
        this.rand = 0.5 - Math.random()
        this.cx = 0
        this.cy = 0
        this.len = len + Math.abs(this.velocity) * LEN_MULTIPLIER
    }

    // Moves the particle
    move() {
        let len = Math.sqrt(Math.pow(mouse.clientY - this.posy, 2) + Math.pow(mouse.clientX - this.posx, 2))
        
        this.posy += Math.round(this.velocity / 3 + (up * flipp / 2.5) / (Math.abs(this.velocity) / 10)) + this.cy / 3 + vibrate(len)
        this.posx += Math.round((this.rand) * 2) + this.cx / 3 + vibrate(len)

        // Mouse attractions
            if (grav && len > 10 && len < 300) {
                    this.cx -= grav * Math.abs(this.posx - mouse.clientX) / ((this.posx - mouse.clientX) * Math.pow(len * 0.09, 1.5))
                    this.cy -= grav * Math.abs(this.posy - mouse.clientY) / ((this.posy - mouse.clientY) * Math.pow(len * 0.09, 1.5))
             }
    }

}