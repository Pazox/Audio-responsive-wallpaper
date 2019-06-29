//  Constants   //
const MOVES             =   [[0, 1],                // Array of directions the image can move to
                            [0, -1],
                            [1, 0],
                            [-1, 0],
                            [1, 1],
                            [-1, 1],
                            [1, -1],
                            [-1, -1]]
const mod               = (x, n) => (x % n + n) % n // A function that fixes modulu for negative sign as well
const NOP               = () => {}                  // Function of no operation
const AMP_DEF           = 1.05                      // Volume base multipier
const LEN_MULTIPLIER    = 0.3                       // 
const arrlen            = 128                       // Length of the input audio array
const LOW_VOL           = 0.3                       // Low volume
const MED_VOL           = 0.43                      // Since you converted colors to points and not areas, this constant is not relevant and this is why the volMap is hashed accordinglly
const MED_VOL_2         = 0.6                       // Higher volume
const VOL_ARRAY         =   [[0, LOW_VOL],          // Array of areas divided by volume values
                            [LOW_VOL, MED_VOL],
                            [MED_VOL, MED_VOL_2],
                            [MED_VOL_2, 1]]
let grav = 0                                        // controls the gravity of the mouse
let mouse = {                                       // Represents the mouse's position
clientX: window.innerWidth,
clientY: window.innerHeight
}
const MIN_VOL_PARTICLE  = 0.3                       // Lowest volume to produce a particle
const BASE_MUL          = 1.5                       // Audio bar's height multiplier
const SHAKE_VAL         = 50                        // Shake's variable base multiplier
const MIN_AUDIO_SHAKE   = 0.000155                  // Lowest audio value to trigger bass events
const SHAKE_INDEX       = 6                         // Index in audio array of volume to produce bass events
const IMG_BASE_DIVIDOR  = 10                        // Base division for image displacement
const TOP_OFFSET        = window.innerHeight * 0.05 // Amount in pixel of pushing the image up
const LEFT_OFFSET       = window.innerWidth * 0.05  // Amount in pixel of pushing the image left
const UP_CONST          = 20                        // Inital value of 'up' constant
const BASE_PART_SIZE    = 3                         // Base particle size
const INTENSITY_FACTOR  = 75                        // Used to calculate how much a particle will vibrate
const PART_BASS_INDEX   = 0                         // Bass particle functions index in funcArray
const BAR_BASS_INDEX    = 1                         // Bass bar functions index in funcArray
const IMG_BASS_INDEX    = 2                         // Bass image functions index in funcArray
const STATIC_BASS_INDEX = 3                         // Bass static particle functions in funcArray

//  Variables  //
let saturate            = 1                         // amount of color saturation
let verDir              = 0                         // Vertical movement of the image
let horDir              = 0                         // Horizontal movement of the image
let volAmpl             = AMP_DEF                   // Music amplification value 
let flipp               = 1                         // Indicated if a bar has been flipped
let funcArray           = [[], [], [], []]          // Array filled with functions that are executed when bass event occurs
let customColor1                                    // Variable of LOW_VOL
let customColor2                                    // Variable of MED_VOL
let customColor3                                    // Variable of MED_VOL_2
let customColor4                                    // Variable of the highest volume possible (1)
let vibrate                                         // Contains a function of particle vibration (by user prefrences)
let triggerParticleBass                             // Contains the particle bass function (by user prefrences)
let up                  = 0                         // Handles the particle bass events (responsible for the particle's speed and it's alpha)
let blur                = 0                         // Image blur amount
let rotation            = 0                         // Handles the bar's movement
let userParticleAmount  = 0                         // Contains the % value of particles to create
let shake               = 0                         // Responsible for bass bar and image movement
let partOpa             = 0.2                       // Desired opacity of particles
let diffPartOpa         = 0.8                       // partOpa's complementary value
let HighVolColor                                    // User desired color for high volume
let MedVolColor2                                    // User desired color for second medium volume
let MedVolColor                                     // User desired color for first medium volume
let LowVolColor                                     // User desired color for low volume
let setWidth            = window.innerWidth +       // The total width of the application
                          (window.innerWidth / arrlen) * 2
let particleArray       = []                        // Array containing the created particles, grouped by their color
let items               = 0                         // Handles the percentage of particles created
let moveSpeed           = 0
let audioArr            = [[], []]                  // Array containing the last audio entries
let prevprevAudio       = []                        // Containing the third audio entry
let prevAudio           = []                        // Containing the second audio entry
let audio               = []                        // Containing the first audio entry
let volMap              = new Map()                 // Map that contains the volume contstants (LOW_VOL, MED_VOL ...) as keys and their corresponding color as value
let bar               =  {                        // A JSON contains bar's properties
                                width: (setWidth / arrlen) - 1,
                                height: 100 * BASE_MUL,
                                padding: 1
                            }
//canvas vars
let div = document.createElement('div')
const canvas = document.createElement('canvas')
const context = canvas.getContext('2d')