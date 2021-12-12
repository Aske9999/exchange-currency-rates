const enter = document.querySelector('#enter')
const result = document.querySelector('#result')
const exchangeBtn = document.querySelector('#exchange-btn')
const currency = document.querySelector('#currency')
const currencyResult = document.querySelector('#currency-result')
const history = document.querySelector('#history')
const inputs = document.querySelectorAll('.num-input')

const disableBtn = () => {
    exchangeBtn.disabled = !(enter.value && currency.value && currencyResult.value);
}
enter.addEventListener('input', disableBtn)
currency.addEventListener('change', disableBtn)
currencyResult.addEventListener('change', disableBtn)

fetch('https://api.exchangerate.host/latest')
    .then(response => response.json())
    .then(data => {
        Object.keys(data.rates).forEach(item => {
            // const option = document.createElement('option')
            // option.textContent = item
            // option.value = item
            // currency.append(option)
            // currencyResult.append(option)
            const option = `<option value=${item}>${item}<option>`
            currency.innerHTML += option
            currencyResult.innerHTML += option
        })
    })

exchangeBtn.addEventListener('click', () => {
    fetch(`https://api.exchangerate.host/latest?base=${currency.value}&symbols=${currencyResult.value}`)
        .then(response => response.json())
        .then(data => {
            result.value = Object.values(data.rates)[0] * enter.value
            addHistory()
        })
})

const addHistory = () => {
    const li = document.createElement('li')
    li.textContent = `${enter.value}${currency.value} = ${result.value}${currencyResult.value}`
    history.append(li)
}

const resultBtn = document.querySelector('#result-btn')
resultBtn.addEventListener('click', () => {
    if (confirm('Press OK or cancel')){
        history.innerHTML = ''
        Array.from(inputs).forEach(it => it.value = '')
    }
})