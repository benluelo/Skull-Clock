// import discord
const Discord = require("discord.js")
const client = new Discord.Client()
require('dotenv').config({ path: '.env' })
const chalk = require("chalk")

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

// chalk constants
const name = chalk.hex("#0000e6")
const time = chalk.cyanBright.bold
const rolename = chalk.yellow
const botOn = chalk.whiteBright.bold.underline
const date = chalk.keyword('orange')

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

    // get hour
    this.hour = this.getUTCHours()

    // get minute
    this.minute = this.getUTCMinutes().toString().padStart(2, "0")

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
    return `${this.day}, ${this.month} ${this.date} at **${this.hour}:${this.minute}**`

}

// when the bot's ready
client.on("ready", () => {

    console.log("═".repeat(50) + "\n")
    // log bot running
    console.log(botOn(`${client.user.username} is online!\n`))

    // grab today's date
    var d = new Date(new Date().toUTCString())

    // #region date debug
    console.log(time("Today- - - - - - - - - - - - - - - - - - - -:"), /*d,*/ d.readableDate(), d.getTime())
    console.log(time("First event- - - - - - - - - - - - - - - - -:"), eventFirst.readableDate(), eventFirst.getTime())
    console.log(time("MS between first event and now - - - - - - -:"), ((d.getTime() - eventFirst.getTime())) )
    console.log(time("number of events between first event and now:"), ((d.getTime() - eventFirst.getTime()) / hours15 ) )
    console.log(time("Hourss between first event and now - - - - -:"), ((d.getTime() - eventFirst.getTime()) / 3600000))
    // #endregion

    // check if event is running
    if(((d.getTime() - eventFirst.getTime()) % hours15) <= (hours1 * 4)){
        console.log(chalk.greenBright.bold.underline("Event currently running!"))
        eventRunning = true
        console.log(((d.getTime() - eventFirst.getTime()) % hours15) / (hours1 * 4))
    }

    //get time of next event
    let nextEventMS = d.getTime() + (hours15 - ((d.getTime() - eventFirst.getTime()) % hours15))

    // console.log("Next event in ms:", nextEventMS)
    let nextEvent = new Date(nextEventMS)
    console.log(time("Next event:"), nextEvent.readableDate())

    // run event
    // skullalert(nextEventMS)
})

// this is here for future stuffs
client.on("message", (message) => {

    //check if message is a dm and if so, ignore it
    if(message.channel.type == "dm") return
    console.log(chalk.keyword("lightgreen")("[LOG][MESSAGE] ") + message.author.username + ": " + message.content)

    // send whennext event is, if requested
    if(message == "%next event"){
        message.channel.send(`The next event starts ${new Date(new Date(new Date().toUTCString()).getTime() + (hours15 - ((new Date(new Date().toUTCString()).getTime() - eventFirst.getTime()) % hours15))).readableDate()} UTC!`)
    }
})


// // skull alert function
// function skullalert(event){

//     // console alert
//     console.log("\n\n\033[4m\033[41mSkull Alert!\033[0m\n")

//     // Get the Guild and store it under the variable "list"
//     const list = client.guilds.get("641023205074796544")

//     // loop through roles
//     list.roles.forEach(role => {

//         // skip @everyone and Timer Bot roles
//         if((role.id == everyone) || (role.id == TimerBot)) return

//         console.log(rolename("Role name:"), role.name)

//         // loop through each member with said role
//         role.members.forEach(member => {

//             // skip Timer Bot
//             if(member.user.bot) return

//             // switch message per timezone
//             let t = new Array(3)
//             console.log(new Date(event))
//             switch(role.id){
//                 case timezone_minus_5:
//                     t[0] = new Date((event - (5 * hours1) + (15 * hours1) /* (eventRunning? (15 * hours1): 0) */))
//                     t[1] = new Date((event - (5 * hours1)) + hours4)
//                     t[2] = "GMT -5"
//                     break
//                 case timezone_plus_2:
//                     t[0] = new Date((event + (2 * hours1) + (15 * hours1) /* (eventRunning? (15 * hours1): 0) */))
//                     t[1] = new Date((event + (2 * hours1)) + hours4)
//                     t[2] = "GMT +2"
//                     break
//                 case timezone_plus_8:
//                     t[0] = new Date((event + (8 * hours1) + (15 * hours1) /* (eventRunning? (15 * hours1): 0) */))
//                     t[1] = new Date((event + (8 * hours1)) + hours4)
//                     t[2] = "GMT +8"
//                     break
//                 default:
//                     t[0] = new Date(event  + (15 * hours1))
//                     t[1] = new Date(event + hours4)
//                     t[2] = "GMT"
//             }

//             // send actual message
//             console.log(name(member.user.tag), t[2])
//             console.log(
//                 "Next skull event is at", date(t[0].readableDate()), 
//                 "\nand the time to join the current event that starts", date(new Date(t[0].getTime() - hours15).readableDate()), 
//                 "closes at", date(t[1].readableDate()))
            
//             // create embed
//             const embed = new Discord.RichEmbed()
//                 .setColor('#000080')
//                 .setDescription("💀**Skull Alert!**💀")
//                 // .setThumbnail("https://imgur.com/K7pw1Em")
//                 .addField(`**The event starting** __${new Date(t[0].getTime() - hours15).readableDate()}__ **closes**`, t[1].readableDate(), false)
//                 .addField('**The next event starts on:**', t[0].readableDate(), false)
//                 // .setImage('https://i.imgur.com/wSTFkRM.png')
//                 .setTimestamp()
//                 .setFooter('benluelo')
            
//             // send embed
//             member.send(embed)
//         })
//         console.log("")
//     })

//     // schedule next event
//     setTimeout( () => {
//         skullalert
//     }, (hours15), event)

//     console.log(time("Next event scheduled for:"), new Date(event + hours15).readableDate(), "UTC")

//     // setInterval(skullalert, hours15, (event + hours15))

//     // schedule join alert message
//     setTimeout( () => {
//         joinalert
//     }, (hours15 - hours4 - mins10))

//     console.log(time("Join alert scheduled for:"), new Date(event + hours4 - mins10).readableDate(), "UTC")
// }

// function joinalert(){

//     // console alert
//     console.log("\n\n\033[4m\033[41mJoin Alert!\033[0m\n")

//     // Get the Guild and store it in the variable "list"
//     const list = client.guilds.get("641023205074796544")

//     // check if theres an event running
//     if(!eventRunning){

//         // IF EVENT NOT RUNNING::

//         // loop through roles
//         list.roles.forEach(role => {

//             // skip @everyone and Timer Bot roles
//             if((role.id == everyone) || (role.id == TimerBot)) return

//             console.log(rolename("Role name:"), role.name)

//             // loop through each member with said role
//             role.members.forEach(member => {

//                 // skip Timer Bot
//                 if(member.user.bot) return

//                 const embed = new Discord.RichEmbed()
//                 .setTitle("Alert! Time to join the event closes in 10 minutes!")

//                 // send embed
//                 member.message.send(embed)
//             })
//         })

//     }else{

//         // IF EVENT RUNNING:

//         // loop through roles
//         list.roles.forEach(role => {

//             // skip @everyone and Timer Bot roles
//             if((role.id == everyone) || (role.id == TimerBot)) return

//             console.log("\033[33mRole name:\033[0m", role.name)

//             // loop through each member with said role
//             role.members.forEach(member => {

//                 // skip Timer Bot
//                 if(member.user.bot) return

//                 // switch message per timezone
//                 switch(role.id){
//                     case timezone_minus_5:
//                         console.log(member.user.tag, "-5")
//                         break
//                     case timezone_plus_8:
//                         console.log(member.user.tag, "+8")
//                         break
//                     default:
//                         console.log(member.user.tag, "default")
//                 }
//             })
//         })

//         //send embed per role saying when the event closes

//     }
// }

// login
client.login(process.env.TOKEN)