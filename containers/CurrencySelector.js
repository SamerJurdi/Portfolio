import { useEffect, useState } from 'react'
import { handleResponse } from '../lib/common'

export default function CurrencySelector({ updatePrices }) {
    const [selectedCurrency, setSelectedCurrency] = useState('')
    const [currencyList, setCurrencyList] = useState([])

    const handleCurrencyChange = (event) => {
        setSelectedCurrency(event.target.value)
        updatePrices(event.target.value)

        fetch('/api/setUserCurrency', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ currencyId: event.target.value }),
        })
    }

    useEffect(() => {
        fetch("/api/getRealCurrencies", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
            .then(async response => {
                let resp = await response.json()
                setCurrencyList(resp.currencyList)
                setSelectedCurrency(resp.selectedCurrency)
                handleResponse(resp)
            })
    }, [])

    return (
        <div>
            <label htmlFor="country-select">Select a currency: </label>
            <select
                id="country-select"
                value={selectedCurrency}
                onChange={handleCurrencyChange}
            >
                {currencyList.map(currency =>
                    <option key={currency.CurrencyId} value={currency.CurrencyId}>
                        {currency.Name}
                    </option>
                )}
            </select>
        </div>
    )
}
