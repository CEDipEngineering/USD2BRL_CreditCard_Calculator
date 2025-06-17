document.addEventListener('DOMContentLoaded', () => {
    const usdAmountInput = document.getElementById('usdAmount');
    const exchangeRateInput = document.getElementById('exchangeRate');
    const iofRateInput = document.getElementById('iofRate');
    const calculateButton = document.getElementById('calculate');
    const brlAmountSpan = document.getElementById('brlAmount');
    const iofAmountSpan = document.getElementById('iofAmount');
    const totalAmountSpan = document.getElementById('totalAmount');

    // Format currency values
    const formatCurrency = (value, currency = 'BRL') => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: currency
        }).format(value);
    };

    // Calculate and update results
    const calculateResults = () => {
        const usdAmount = parseFloat(usdAmountInput.value) || 0;
        const exchangeRate = parseFloat(exchangeRateInput.value) || 0;
        const iofRate = parseFloat(iofRateInput.value) || 0;

        // Calculate base amount in BRL
        const brlAmount = usdAmount * exchangeRate;
        
        // Calculate IOF (6.38% of the BRL amount)
        const iofAmount = brlAmount * (iofRate / 100);
        
        // Calculate total amount (BRL amount + IOF)
        const totalAmount = brlAmount + iofAmount;

        // Update the display
        brlAmountSpan.textContent = formatCurrency(brlAmount);
        iofAmountSpan.textContent = formatCurrency(iofAmount);
        totalAmountSpan.textContent = formatCurrency(totalAmount);
    };

    // Add event listeners
    calculateButton.addEventListener('click', calculateResults);

    // Calculate on input change
    [usdAmountInput, exchangeRateInput, iofRateInput].forEach(input => {
        input.addEventListener('input', calculateResults);
    });

    // Initial calculation
    calculateResults();
}); 