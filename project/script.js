class FormulaCalculator {
    constructor() {
        this.feeInput = document.getElementById("fee");
        this.countInput = document.getElementById("count");
        this.discountInput = document.getElementById("discount");
        this.isForeignCheckbox = document.getElementById("isForeign");

        this.resultRaw = document.getElementById("result-raw");
        this.resultFinal = document.getElementById("result-final");

        this.discountNote = document.getElementById("discount-note");
        this.taxNote = document.getElementById("tax-note");

        this.inputs = [this.feeInput, this.countInput, this.discountInput, this.isForeignCheckbox];
        this.addListeners();
    }

    addListeners() {
        this.inputs.forEach(input => {
            input.addEventListener("input", () => this.evaluateFormula());
        });
    }

    validateInput(input) {
        if (isNaN(input.value) || input.value.trim() === "") {
            input.classList.add("invalid");
        } else {
            input.classList.remove("invalid");
        }
    }

    evaluateFormula() {
        this.validateInput(this.feeInput);
        this.validateInput(this.countInput);
        this.validateInput(this.discountInput);

        let fee = parseFloat(this.feeInput.value) || 0;
        let count = parseFloat(this.countInput.value) || 0;
        let discount = parseFloat(this.discountInput.value) || 0;
        let isForeign = this.isForeignCheckbox.checked;

        let totalRaw = count * fee;
        let totalWithDiscount = totalRaw;
        
        // بررسی تخفیف عمده
        if (count >= 10) {
            totalWithDiscount -= totalRaw * 0.1;
            this.discountNote.style.display = "block";
        } else {
            this.discountNote.style.display = "none";
        }

        // بررسی مالیات کالاهای خارجی
        if (isForeign) {
            totalWithDiscount += totalWithDiscount * 0.1;
            this.taxNote.style.display = "block";
        } else {
            this.taxNote.style.display = "none";
        }

        totalWithDiscount -= discount

        // نمایش نتایج نهایی
        this.resultRaw.textContent = `هزینه کل بدون تخفیف: ${totalRaw} تومان`;
        this.resultFinal.textContent = `هزینه نهایی: ${totalWithDiscount} تومان`;
    }
}

document.addEventListener("DOMContentLoaded", () => new FormulaCalculator());