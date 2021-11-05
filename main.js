const calcBtns = document.querySelectorAll('.calcBtn')
const calcResult = document.querySelector('.calcResult')
const calcReset = document.querySelector('.calcReset')
const display = document.querySelector('.display input')
const calcDel = document.querySelector('.calcDel')
const basic = document.querySelector('.basic')
const currency = document.querySelector('.currency')
const calcArea = document.querySelector('.calc-area')
const curArea = document.querySelector('.cur-area')
const fromArea = document.querySelector('input.from')
const toArea = document.querySelector('input.to')
const selectFrom = document.querySelector('select.from')
const selectTo = document.querySelector('select.to')
let expression = ''
let baseFrom = selectFrom.value
let baseTo = selectFrom.value

calcBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    expression += btn.value
    display.value = expression
    fromArea.value = expression
    convert()
  })
})

calcReset.addEventListener('click', () => {
  display.value = 0
  fromArea.value = 0
  toArea.value = 0
  expression = ''
})

calcResult.addEventListener('click', () => {
  try {
    expression = eval(expression)
    display.value = expression
  } catch (e) {
    expression = ''
    display.value = 'Error'
  }
})

calcDel.addEventListener('click', () => {
  if (expression.length > 0)
    expression = expression.slice(0, expression.length - 1)
  if (expression.length == 0) expression = ''
  display.value = expression
})

// * Currency Exchanger

currency.addEventListener('click', () => {
  expression = ''
  display.value = expression
  fromArea.value = expression
  basic.classList.remove('active')
  currency.classList.add('active')
  calcArea.classList.add('hide')
  curArea.classList.remove('hide')
  calcBtns.forEach((btn) => {
    if (
      [')', '(', '/', '*', '-', '+', '='].find((item) => item === btn.value)
    ) {
      btn.disabled = true
    }
  })
})

basic.addEventListener('click', () => {
  expression = ''
  display.value = expression
  fromArea.value = expression
  basic.classList.add('active')
  currency.classList.remove('active')
  calcArea.classList.remove('hide')
  curArea.classList.add('hide')
  calcBtns.forEach((btn) => {
    btn.disabled = false
  })
})

selectFrom.addEventListener('change', () => {
  baseFrom = selectFrom.value
  convert()
})

selectTo.addEventListener('change', () => {
  baseTo = selectTo.value
  convert()
})

const convert = async () => {
  try {
    if (baseTo == baseFrom) {
      toArea.value = fromArea.value
      return
    }
    const res = await fetch(
      `https://freecurrencyapi.net/api/v2/latest?apikey=32a7e800-3e44-11ec-8f2e-7d76219731f7&base_currency=${baseFrom.toUpperCase()}`
    )
    const rate = await res.json()
    console.log(rate.data)
    toArea.value = (
      +eval(expression) * +rate.data[baseTo.toUpperCase()]
    ).toFixed(2)
  } catch (e) {
    console.error(e)
  }
}

convert()
