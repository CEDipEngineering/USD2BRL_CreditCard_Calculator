document.addEventListener('DOMContentLoaded', () => {
    const usdAmountInput = document.getElementById('usdAmount');
    const clearUsdAmountButton = document.getElementById('clearUsdAmount');
    const exchangeRateInput = document.getElementById('exchangeRate');
    const exchangeRateDisplay = document.getElementById('exchangeRateDisplay');
    const iofRateInput = document.getElementById('iofRate');
    const iofRateToggle = document.getElementById('iofRateToggle');
    const safetyMarginInput = document.getElementById('safetyMargin');
    const safetyMarginToggle = document.getElementById('safetyMarginToggle');
    const brlAmountSpan = document.getElementById('brlAmount');
    const iofAmountSpan = document.getElementById('iofAmount');
    const safetyAmountSpan = document.getElementById('safetyAmount');
    const totalAmountSpan = document.getElementById('totalAmount');

    // Cache keys
    const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes in milliseconds
    const EXCHANGE_RATE_CACHE_KEY = 'exchangeRateCache';
    const CALCULATOR_STATE_CACHE_KEY = 'calculatorState';

    // Format currency values
    const formatCurrency = (value, currency = 'BRL') => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: currency
        }).format(value);
    };

    // Format exchange rate
    const formatExchangeRate = (rate) => {
        return new Intl.NumberFormat('pt-BR', {
            minimumFractionDigits: 4,
            maximumFractionDigits: 4
        }).format(rate);
    };

    // Save calculator state
    const saveCalculatorState = () => {
        const state = {
            usdAmount: usdAmountInput.value,
            iofRate: iofRateInput.value,
            iofEnabled: iofRateToggle.checked,
            safetyMargin: safetyMarginInput.value,
            safetyEnabled: safetyMarginToggle.checked
        };
        localStorage.setItem(CALCULATOR_STATE_CACHE_KEY, JSON.stringify(state));
    };

    // Load calculator state
    const loadCalculatorState = () => {
        const state = localStorage.getItem(CALCULATOR_STATE_CACHE_KEY);
        if (state) {
            try {
                const parsedState = JSON.parse(state);
                usdAmountInput.value = parsedState.usdAmount;
                iofRateInput.value = parsedState.iofRate;
                iofRateToggle.checked = parsedState.iofEnabled;
                safetyMarginInput.value = parsedState.safetyMargin;
                safetyMarginToggle.checked = parsedState.safetyEnabled;
                
                // Update input states
                iofRateInput.disabled = !parsedState.iofEnabled;
                safetyMarginInput.disabled = !parsedState.safetyEnabled;
            } catch (e) {
                console.error('Error loading calculator state:', e);
            }
        }
    };

    // Get exchange rate from repository cache
    const getExchangeRate = async () => {
        try {
            // Try to get from localStorage first
            const localCache = localStorage.getItem(EXCHANGE_RATE_CACHE_KEY);
            if (localCache) {
                const cache = JSON.parse(localCache);
                const now = Date.now();
                if (cache.timestamp && (now - cache.timestamp) < CACHE_DURATION) {
                    updateDisplay(cache.rate);
                    return cache.rate;
                }
            }

            // If no valid local cache, fetch from repository
            const response = await fetch('data/exchange-rate.json');
            const data = await response.json();
            
            // Update local cache
            const timestamp = Date.now();
            localStorage.setItem(EXCHANGE_RATE_CACHE_KEY, JSON.stringify({
                rate: data.rate,
                timestamp: timestamp
            }));

            updateDisplay(data.rate);
            return data.rate;
        } catch (error) {
            console.error('Error fetching exchange rate:', error);
            exchangeRateDisplay.textContent = 'Error';
            return null;
        }
    };

    // Update the display with the current rate
    const updateDisplay = (rate) => {
        exchangeRateInput.value = rate;
        exchangeRateDisplay.textContent = formatExchangeRate(rate);
    };

    // Calculate and update results
    const calculateResults = async () => {
        const usdAmount = parseFloat(usdAmountInput.value) || 0;
        const exchangeRate = parseFloat(exchangeRateInput.value) || 0;
        const iofRate = iofRateToggle.checked ? (parseFloat(iofRateInput.value) || 0) : 0;
        const safetyMargin = safetyMarginToggle.checked ? (parseFloat(safetyMarginInput.value) || 0) : 0;

        // Calculate base amount in BRL
        const brlAmount = usdAmount * exchangeRate;
        
        // Calculate IOF
        const iofAmount = brlAmount * (iofRate / 100);
        
        // Calculate safety margin amount
        const safetyAmount = brlAmount * (safetyMargin / 100);
        
        // Calculate total amount (BRL amount + IOF + safety margin)
        const totalAmount = brlAmount + iofAmount + safetyAmount;

        // Update the display
        brlAmountSpan.textContent = formatCurrency(brlAmount);
        iofAmountSpan.textContent = formatCurrency(iofAmount);
        safetyAmountSpan.textContent = formatCurrency(safetyAmount);
        totalAmountSpan.textContent = formatCurrency(totalAmount);

        // Update input states
        iofRateInput.disabled = !iofRateToggle.checked;
        safetyMarginInput.disabled = !safetyMarginToggle.checked;

        // Save state
        saveCalculatorState();
    };

    // Clear USD amount
    const clearUsdAmount = () => {
        usdAmountInput.value = '';
        calculateResults();
    };

    // Initialize exchange rate
    const initializeExchangeRate = async () => {
        const rate = await getExchangeRate();
        if (rate) {
            calculateResults();
        }
    };

    // Add event listeners
    [usdAmountInput, iofRateInput, iofRateToggle, safetyMarginInput, safetyMarginToggle].forEach(input => {
        input.addEventListener('input', calculateResults);
    });

    clearUsdAmountButton.addEventListener('click', clearUsdAmount);

    // Load saved state and initialize
    loadCalculatorState();
    initializeExchangeRate();
}); 