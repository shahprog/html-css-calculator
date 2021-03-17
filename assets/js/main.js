const buttons  = document.querySelector('.calculator .buttons');
const c_dis_top = document.querySelector('.calculator .display .top');
const c_dis_bot = document.querySelector('.calculator .display .bottom');

const operands = {
    '×': '*',
    '÷': '/',
    '+': '+',
    '-': '-'
}
const only_operands = ['*', '/', '+','-']
const not_number_classes = ['operands', 'equal', 'backspace', 'clear', 'dot']

let oprands_pressed = false
let number_pressed = false
let formula = ''
let formula_visual = ''
let dot_pressed = false
let equal_pressed = false


buttons.addEventListener('click', e => {
    if(e.target.classList.contains('buttons') || e.target.classList.contains('row')) {
        return
    }
    const pressed = e.target.textContent.trim()

    if(e.target.classList.contains('operands') || e.target.classList.contains('equal') || e.target.classList.contains('backspace') || e.target.classList.contains('clear') || e.target.classList.contains('dot')) {
        if (e.target.classList.contains('operands')){      
            if(number_pressed === true && oprands_pressed === false){
                const operand = operands[pressed]
                formula += operand
                formula_visual += pressed
                oprands_pressed = true
                number_pressed = false
                dot_pressed = false
                equal_pressed = false
                c_dis_bot.textContent = formula_visual

                return
            }

            else {
                if (oprands_pressed === true){
                    formula = formula.substr(0, formula.length-1)
                    formula_visual = formula_visual.substr(0, formula_visual.length -1)
                    
                    const operand = operands[pressed]
                    formula += operand
                    formula_visual += pressed                    
                    
                    c_dis_bot.textContent = formula_visual
                    number_pressed = false
                }
            }
        }

        if (e.target.classList.contains('equal')) {
            if (formula == ''){
                e.target.classList.add('animate__animated')
                e.target.classList.add('animate__shakeX')

                setTimeout(x => {
                    e.target.classList.remove('animate__animated')
                    e.target.classList.remove('animate__shakeX')
                }, 1000)

                return
            }

            else if (equal_pressed) {
                e.target.classList.add('animate__animated')
                e.target.classList.add('animate__shakeX')

                setTimeout(x => {
                    e.target.classList.remove('animate__animated')
                    e.target.classList.remove('animate__shakeX')
                }, 1000)

                return
            }
            
            else if (oprands_pressed === false) {
                let res = math.evaluate(formula).toString()
                const fractions = res.split('.')
                
                let integer = fractions[0]
                let decimal = fractions[1]

                if (decimal) {
                    if(decimal.length > 2) {
                        decimal = '.' + decimal.substr(0,2)
                        res = `${integer}${decimal}`
                    }
                }

                c_dis_top.textContent = formula_visual
                c_dis_bot.textContent = res

                formula = res
                formula_visual = res

                equal_pressed = true

                if (formula_visual.includes('.') == false) {
                    dot_pressed = false
                }   
            }else{
                e.target.classList.add('animate__animated')
                e.target.classList.add('animate__shakeX')

                setTimeout(x => {
                    e.target.classList.remove('animate__animated')
                    e.target.classList.remove('animate__shakeX')
                }, 1000)
                
            }
        }

        if (e.target.classList.contains('dot')) {
            if(dot_pressed === false) {
                if (number_pressed == false){
                    formula_visual += '0.'
                }else{
                    formula_visual += '.'
                }

                formula += '.'
                
                c_dis_bot.textContent = formula_visual

                dot_pressed = true
            }
        }

        if (e.target.classList.contains('clear')) {
            oprands_pressed = false
            number_pressed = false
            dot_pressed = false

            formula = ''
            formula_visual = ''

            c_dis_top.textContent = ''
            c_dis_bot.textContent = '0'
        }

        if (e.target.classList.contains('backspace')) {            
            formula = formula.substr(0, formula.length-1)
            formula_visual = formula_visual.substr(0, formula_visual.length -1)

            if(only_operands.includes(formula.substr(formula.length-1, formula.length))) {
                oprands_pressed = true
                dot_pressed = false
                number_pressed = false
            }

            if(formula.substr(formula.length-1, formula.length) == '.') {
                dot_pressed = true
            }
            console.log(formula)
            if (formula_visual == ''){
                c_dis_bot.textContent = '0'
            }else{
                c_dis_bot.textContent = formula_visual
            }
        }
    }

    else{
        formula += pressed
        formula_visual += pressed
        number_pressed = true
        oprands_pressed = false
        equal_pressed = false
        c_dis_bot.textContent = formula_visual
    }

    

})