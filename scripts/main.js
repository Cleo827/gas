// Auto-calculate LPG Quantity
function calculateLPGQty() {
    const unitPrice = parseFloat(document.getElementById('input-lpg-unit-price').value) || 0;
    const totalAmount = parseFloat(document.getElementById('input-total-amount').value) || 0;
    let qty = '';
    if (unitPrice > 0 && totalAmount > 0) {
        qty = (totalAmount / unitPrice).toFixed(2);
    }
    document.getElementById('input-lpg-qty').value = qty;
}

document.getElementById('input-lpg-unit-price').addEventListener('input', calculateLPGQty);
document.getElementById('input-total-amount').addEventListener('input', calculateLPGQty);

document.getElementById('receipt-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get values
    const name = document.getElementById('input-name').value;
    const phone = document.getElementById('input-phone').value;
    const lpgQty = document.getElementById('input-lpg-qty').value;
    const lpgUnitPrice = parseFloat(document.getElementById('input-lpg-unit-price').value) || 0;
    const totalAmount = parseFloat(document.getElementById('input-total-amount').value) || 0;
    const voucherInput = document.getElementById('input-voucher').value;
    const lpgUnit = document.getElementById('input-lpg-unit').value || 'Kg';

    // Handle voucher as string or number
    let voucherValue = 0;
    let voucherDisplay = voucherInput;
    if (!isNaN(parseFloat(voucherInput)) && voucherInput.trim() !== "") {
        voucherValue = parseFloat(voucherInput);
        voucherDisplay = '₦' + voucherValue.toLocaleString();
    }

    // Subtotal and grand total
    const subtotal = totalAmount;
    const grandTotal = subtotal - voucherValue;
    const today = new Date().toLocaleDateString();

    // Fill both receipts
    [
        {suffix: 'customer'},
        {suffix: 'official'}
    ].forEach(copy => {
        document.getElementById(`receipt-date-${copy.suffix}`).textContent = today;
        document.getElementById(`customer-name-${copy.suffix}`).textContent = name;
        document.getElementById(`customer-phone-${copy.suffix}`).textContent = phone;
        document.getElementById(`lpg-qty-${copy.suffix}`).textContent = lpgQty;
        document.getElementById(`lpg-unit-${copy.suffix}`).textContent = lpgUnit;
        document.getElementById(`lpg-unit-price-${copy.suffix}`).textContent = lpgUnitPrice.toLocaleString();
        document.getElementById(`lpg-total-${copy.suffix}`).textContent = totalAmount.toLocaleString();
        document.getElementById(`lpg-qty-summary-${copy.suffix}`).textContent = lpgQty + ' ' + lpgUnit;
        document.getElementById(`subtotal-${copy.suffix}`).textContent = subtotal.toLocaleString();
        document.getElementById(`discount-${copy.suffix}`).textContent = '-';
        document.getElementById(`voucher-${copy.suffix}`).textContent = voucherDisplay;
        document.getElementById(`grand-total-${copy.suffix}`).textContent = '₦' + grandTotal.toLocaleString();
    });

    // Show receipt, hide form, show back button
    document.getElementById('receipt-form').style.display = 'none';
    document.getElementById('receipt-wrapper').style.display = 'block';
    document.getElementById('back-button').style.display = 'inline-block';
});

// Print button
document.getElementById('print-button').addEventListener('click', function() {
    window.print();
});

// Back button
document.getElementById('back-button').addEventListener('click', function() {
    document.getElementById('receipt-form').reset();
    document.getElementById('input-lpg-qty').value = '';
    document.getElementById('receipt-form').style.display = 'block';
    document.getElementById('receipt-wrapper').style.display = 'none';
    document.getElementById('back-button').style.display = 'none';
});

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('receipt-form');
    const printButton = document.getElementById('print-button');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('input-name').value;
        const phone = document.getElementById('input-phone').value;
        const lpgQty = document.getElementById('input-lpg-qty').value;
        const lpgUnitPrice = parseFloat(document.getElementById('input-lpg-unit-price').value) || 0;
        const voucherInput = document.getElementById('input-voucher').value;

        // Try to parse voucher as number, else keep as string
        let voucherValue = 0;
        let voucherDisplay = voucherInput;
        if (!isNaN(parseFloat(voucherInput)) && isFinite(voucherInput)) {
            voucherValue = parseFloat(voucherInput);
            voucherDisplay = '₦' + voucherValue.toLocaleString();
        }

        const lpgTotal = lpgUnitPrice * (parseFloat(lpgQty) || 0);
        const subtotal = lpgTotal;
        const grandTotal = subtotal - voucherValue;

        document.getElementById('customer-name').textContent = name;
        document.getElementById('customer-phone').textContent = phone;
        document.getElementById('lpg-qty').textContent = lpgQty;
        document.getElementById('lpg-unit-price').textContent = lpgUnitPrice.toLocaleString();
        document.getElementById('lpg-total').textContent = lpgTotal.toLocaleString();
        document.getElementById('cylinder-desc').textContent = '';
        document.getElementById('cylinder-qty').textContent = '';
        document.getElementById('cylinder-unit-price').textContent = '';
        document.getElementById('cylinder-total').textContent = '';
        document.getElementById('subtotal').textContent = subtotal.toLocaleString();
        document.getElementById('discount').textContent = '-';
        document.getElementById('voucher').textContent = voucherDisplay;
        document.getElementById('grand-total').textContent = '₦' + grandTotal.toLocaleString();
        document.getElementById('receipt-date').textContent = new Date().toLocaleDateString();

        document.getElementById('receipt-form').style.display = 'none';
        document.getElementById('receipt').style.display = 'block';
    });

    printButton.addEventListener('click', function() {
        window.print();
    });
});