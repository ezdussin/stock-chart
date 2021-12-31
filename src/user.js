class User{
    constructor(userName = 'user'){
        this.name = userName
        this.money = 10
        this.betValue = 1
        this.willIncrease = true
        this.betting = false
    }

    changeBetValue(value){
        if(this.betValue === 1 && value === -1 || this.betValue >= this.money && value === +1) return
        this.betValue = this.betValue + value
    }

    bettingState(willIncrease = false){
        this.betting = true
        this.money -= this.betValue
        this.willIncrease = willIncrease
    }
}

module.exports = User