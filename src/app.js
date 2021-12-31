const fs = require('fs')
const User = require('./user')
const Chart = require('./chart')
const {waitInputMsg} = require('./gui')

const user = new User('0x001')
const chart = new Chart()

process.stdin.setRawMode(true)
process.stdin.resume()
process.stdin.setEncoding('utf8')

const checkBet = () => {
    if(user.betting){
        console.log(user.willIncrease, chart.progressVar)
        if(user.willIncrease && chart.progressVar > 1 ||
            !user.willIncrease && chart.progressVar < 1){
            user.money += (user.betValue * 2)
        }
    }
    user.betValue = 1
}

const waitKey = () => {
    console.log(
        `\nname: ${user.name}
${waitInputMsg}money: $ ${user.money}\tbet: $ ${user.betValue}
progress variation: x${chart.progressVar.toFixed(16)}`
    )

    process.stdin.once('data', (key) => {
        switch(key){
            case '\u0003':
                process.exit()
            case 'e':
                user.betting = false
                displayChart()
                return
            case 'q':
                user.bettingState(false)
                displayChart()
                return
            case 'w':
                user.bettingState(true)
                displayChart()
                return
            case 'a':
                user.changeBetValue(-1)
                break
            case 's':
                user.changeBetValue(+1)
                break
            default:
                break
        }
        
        waitKey()
    })
    process.stdin.end()
}

const displayChart = () => {
    var timer = setInterval(() => {
        if(chart.x < chart.progressValue){
            chart.nextY()
            console.log({
                x: chart.x,
                y: chart.y
            })
        }else{
            chart.calcProgressVar()
            checkBet()
            storeData()
            clearInterval(timer)
            waitKey()
        }
    }, 1000)
}

const storeData = () => {
    chart.progressValue += 10

    const json = {
        user: {
            name: user.name,
            money: user.money
        },
        chart_info: chart.chartsArray
    }

    const data = JSON.stringify(json, null, 2)

    fs.writeFileSync('chart.json', data)
}

displayChart()