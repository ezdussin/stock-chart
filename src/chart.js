class Chart{
    constructor(){
        this.x = 0
        this.y = 1
        this.chartFactor = 1
        this.progressVar = 1
        this.progressValue = 10
        this.progressDefaultValue = 10
        this.chartsArray = []
    }

    pushArray(){
        this.chartsArray.push({
            x: this.x,
            y: this.y,
            factor: this.chartFactor
        })
    }

    nextY(){
        const prob = Math.round(Math.random() * 100)
        const vector = Math.round(Math.random() * 1)

        this.x++

        if(this.y === 0) this.y = 1

        if(vector === 0){
            this.y = Math.round(Math.abs(this.y - (this.y * prob / 100)) * 100) / 100
        }
        else{
            this.y = Math.round(Math.abs(this.y + (this.y * prob / 100)) * 100) / 100
        }

        this.pushArray()
        
        if(this.x > 1) this.calcLastVar()
    }

    calcLastVar(){
        this.factor = this.y/this.chartsArray[this.chartsArray.length-1].y
    }

    calcProgressVar(){
        this.progressVar = this.y/this.chartsArray[this.progressValue-this.progressDefaultValue].y
    }
}

module.exports = Chart