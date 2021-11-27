class CPFValidation {
    constructor(sentCpf) {
        Object.defineProperty(this, 'cleanCpf', {
            writable: false,
            enumerable: true,
            configurable: false,
            value: sentCpf.replace(/\D+/g, '')
        })
    }

    sequence() {
        return this.cleanCpf.charAt(0).repeat(11) === this.cleanCpf
    }

    generateCpf(){
        const emptyCpf = this.cleanCpf.slice(0, 9)
        const digit1 = this.generateDigit(emptyCpf)
        const digit2 = this.generateDigit(emptyCpf + digit1)

        this.newCpf = emptyCpf + digit1 + digit2
    }

    generateDigit(emptyCpf){
        let total  = 0
        let reverse = emptyCpf.length + 1

        for(let num of emptyCpf ){
            total += reverse * Number(num)
            reverse--
        }
        const digit = 11- (total % 11)
        return digit <= 9 ? String(digit) : 0
    }

    valid() {
        if(!this.cleanCpf) return false
        if(typeof this.cleanCpf !== 'string') return false
        if(this.cleanCpf.length !== 11) return false
        if(this.sequence()) return false
        this.generateCpf()


        return (
            this.newCpf === this.cleanCpf ? "It is a valid CPF" : "It is a invalid CPF"
            )
    }

}

const validCpf = new CPFValidation('070.987.720-03')
console.log(validCpf.valid())