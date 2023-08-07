const currencies = new Map([['PLN', 1]]);

function loadCurrencies() {
  loadLink('http://api.nbp.pl/api/exchangerates/tables/a');
  loadLink('http://api.nbp.pl/api/exchangerates/tables/b');
  setTimeout(loadOptions, 300);
}

function loadLink(link) {
  fetch(link)
      .then(response => response.json())
      .then(json => {
        json.forEach(table => {
          for(const x of table.rates) {
            currencies.set(x.code, x.mid);
          }
        }
      )
    }
  )
}

function loadOptions() {
  const selections = document.getElementsByTagName('select');
  let code = '';
  for (const currency of currencies.keys()) {
    code += '<option value="' + currency + '">' + currency + '</option>'; 
  }
  selections[0].innerHTML = code;
  selections[1].innerHTML = code;
  
  document.getElementById('fromCurrency').value = 'EUR';
  showOutput();
}

function showOutput() {
  const quantity = document.getElementById('input').value;
  const originCurrency = document.getElementById('fromCurrency').value;
  const targetCurrency = document.getElementById('toCurrency').value;
  //by default all currencies have values in relation to PLN so it have to be corrected
  const originTargetRelation = Math.round((currencies.get(originCurrency) / currencies.get(targetCurrency)) * 10000) / 10000;
  const output = Math.round((quantity * originTargetRelation) * 10000) / 10000;
  
  document.getElementById('output').innerHTML = output;
}

function switchCurrencies() {
  const originCurrency = document.getElementById('fromCurrency').value;
  const targetCurrency = document.getElementById('toCurrency').value;

  document.getElementById('fromCurrency').value = targetCurrency;
  document.getElementById('toCurrency').value = originCurrency;
  showOutput();
}