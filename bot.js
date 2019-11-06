// import discord
const Discord = require("discord.js")
const client = new Discord.Client()
require('dotenv').config({ path: '.env' })

// #region so many constants!

// event start point
const eventFirst = new Date(1572901200000)

// reward constant
const reward = 0

//time constants
const hours15 = 54000000
const hours4 = 14400000
const mins10 = 600000
const hours1 = 3600000

// role constants
const timezone_minus_5 = "641095573109211137"
const timezone_plus_2 = "641391614018715678"
const timezone_plus_8 = "641095615157370890"
const everyone = "641023205074796544"
const TimerBot = "641088516763156491"

// bot ID
const bot = "641039236786814976"

// ini vars
var start = false
var eventRunning = false

// #endregion

// new date prototype
Date.prototype.readableDate = function() {
    
    // // debug
    // console.log(this)
    // console.log(new Date(this.toUTCString()))

    // get month
    switch(this.getUTCMonth()){
        case 0: this.month = "January"; break
        case 1: this.month = "February"; break
        case 2: this.month = "March"; break
        case 3: this.month = "April"; break
        case 4: this.month = "May"; break
        case 5: this.month = "June"; break
        case 6: this.month = "July"; break
        case 7: this.month = "August"; break
        case 8: this.month = "September"; break
        case 9: this.month = "October"; break
        case 10: this.month = "November"; break
        case 11: this.month = "December"; break
    }

    // get time
    this.hour = this.getUTCHours()

    // get day
    switch(this.getUTCDay()){
        case 0: this.day = "Sunday"; break
        case 1: this.day = "Monday"; break
        case 2: this.day = "Tuesday"; break
        case 3: this.day = "Wednesday"; break
        case 4: this.day = "Thursday"; break
        case 5: this.day = "Friday"; break
        case 6: this.day = "Saturday"; break
    }

    // get date number
    this.date = this.getUTCDate()

    // build readable string
    return `${this.day}, ${this.month} ${this.date} at ${this.hour}:00`

}

// when the bot's ready
client.on("ready", () => {

    console.log("═".repeat(50) + "\n")
    // log bot running
    console.log(`${client.user.username} is online!`)

    // grab today's date
    var d = new Date(new Date().toUTCString())

    // #region date debug
    // console.log("Today: ", d, d.getTime())
    // console.log("First event: ", eventFirst, eventFirst.getTime())
    // console.log("ms between first event and now:", ((d.getTime() - eventFirst.getTime())) )
    // console.log("number of events between first event and now:", ((d.getTime() - eventFirst.getTime()) / hours15 ) )
    // console.log(((d.getTime() - eventFirst.getTime()) / 3600000))
    // #endregion

    // check if event is running
    if(((d.getTime() - eventFirst.getTime()) % hours15) <= (hours1 * 4)){
        console.log("Event currently running!")
        eventRunning = true
        console.log(((d.getTime() - eventFirst.getTime()) % hours15) / (hours1 * 4))
    }

    //get time of next event
    let nextEventMS = d.getTime() + (hours15 - ((d.getTime() - eventFirst.getTime()) % hours15))

    // console.log("Next event in ms:", nextEventMS)
    let nextEvent = new Date(nextEventMS)
    console.log("Next event: ", nextEvent)

    // run event
    skullalert(nextEventMS)
})

/* this is here for future stuffs
client.on("message", (message) => {
    if(!start) return
    //check if message is a dm & ignore it
    if(message.channel.type == "dm") return
    console.log(message.author.username)

    // start!
    if(message == "timer start"){

        // set start var to true, so timer doesnt run twice
        start = true

        // grab today's date
        var d = new Date()

        // #region date debug
        // console.log("Today: ", d, d.getTime())
        // console.log("First event: ", eventFirst, eventFirst.getTime())
        // console.log("ms between first event and now:", ((d.getTime() - eventFirst.getTime())))
        // console.log(((d.getTime() - eventFirst.getTime()) % 3600000))
        // #endregion

        //get time of next event
        let nextEventMS = d.getTime() + (hours15 - ((d.getTime() - eventFirst.getTime()) % hours15))

        // console.log("Next event in ms:", nextEventMS)
        let nextEvent = new Date(nextEventMS)
        console.log("Next event: ", nextEvent.toUTCString())

        // run event
        skullalert(nextEventMS)
    }
})
*/

// skull alert function
function skullalert(event){

    // console alert
    console.log("\n\n\033[4m\033[41mSkull Alert!\033[0m\n")

    // Get the Guild and store it under the variable "list"
    const list = client.guilds.get("641023205074796544")

    // loop through roles
    list.roles.forEach(role => {

        // skip @everyone and Timer Bot roles
        if((role.id == everyone) || (role.id == TimerBot)) return

        console.log("\033[33mRole name:\033[0m", role.name)

        // loop through each member with said role
        role.members.forEach(member => {

            // skip Timer Bot
            if(member.user.bot) return

            // switch message per timezone
            let t = new Array(3)
            switch(role.id){
                case timezone_minus_5:
                    t[0] = new Date((event - (5 * hours1) + (15 * hours1)))
                    t[1] = new Date((event - (5 * hours1)) + hours4)
                    t[2] = "GMT -5"
                    break
                case timezone_plus_2:
                    t[0] = new Date((event + (2 * hours1) + (15 * hours1)))
                    t[1] = new Date((event + (2 * hours1)) + hours4)
                    t[2] = "GMT +2"
                    break
                case timezone_plus_8:
                    t[0] = new Date((event + (8 * hours1) + (15 * hours1)))
                    t[1] = new Date((event + (8 * hours1)) + hours4)
                    t[2] = "GMT +8"
                    break
                default:
                    t[0] = new Date(event  + (15 * hours1))
                    t[1] = new Date(event + hours4)
                    t[2] = "GMT"
            }

            // send actual message
            console.log("\033[34m"+member.user.tag+"\033[0m", t[2])
            console.log("Next skull event is at", t[0].readableDate(), "and the time to join the event closes at", t[1].readableDate())
            
            // create embed
            const embed = new Discord.RichEmbed()
                .setColor('#000080')
                .setDescription("💀**Skull Alert!**💀")
                // .setThumbnail("https://imgur.com/K7pw1Em")
                .addField('**Closes on:**', t[1].readableDate(), false)
                .addField('**Next event:**', t[0].readableDate(), false)
                // .setImage('https://i.imgur.com/wSTFkRM.png')
                .setTimestamp()
                .setFooter('benluelo')
            
            // send embed
            // member.send(embed)
        })
        console.log("")
    })

    // schedule next event
    setTimeout( () => {
        skullalert
    }, (hours15))

    // setInterval(skullalert, hours15, (event + hours15))

    // schedule join alert message
    setTimeout( () => {
        joinalert
    }, (hours15 - hours4 - mins10))
}

function joinalert(currentevent, eventrunning){

    // console alert
    console.log("\n\n\033[4m\033[41mJoin Alert!\033[0m\n")

    // check if theres an event running
    if(!eventRunning){

        // Get the Guild and store it under the variable "list"
        const list = client.guilds.get("641023205074796544")

        // loop through roles
        list.roles.forEach(role => {

            // skip @everyone and Timer Bot roles
            if((role.id == everyone) || (role.id == TimerBot)) return

            console.log("\033[33mRole name:\033[0m", role.name)

            // loop through each member with said role
            role.members.forEach(member => {

                // skip Timer Bot
                if(member.user.bot) return

                // switch message per timezone
                switch(role.id){
                    case timezone_minus_5:
                        console.log(member.user.tag, "-5")
                        break
                    case timezone_plus_8:
                        console.log(member.user.tag, "+8")
                        break
                    default:
                        console.log(member.user.tag, "default")
                }
            })
        })
        
    }else{

        //send embed per role saying when the event closes

    }
}

client.login(process.env.TOKEN)