const btnCalculate = document.querySelector('.btnCalculate');
const label = document.querySelectorAll('label');
const inputDay = document.getElementById('day');
const inputMonth = document.getElementById('month');
const inputYear = document.getElementById('year');
const msgError = document.querySelectorAll('.msgError');
const invalidErrorMSG = document.querySelectorAll('.invalidErrorMSG');
const outputNumber  = document.querySelectorAll('.number')

btnCalculate.addEventListener('click', () => {
    function fillInAllFields() {
        if (inputDay.value.length == 0) {
            inputDay.classList.add('error');
            msgError[0].style.display = 'block';
            label[0].classList.add('error');
        }
        if (inputMonth.value.length == 0) {
            inputMonth.classList.add('error');
            msgError[1].style.display = 'block';
            label[1].classList.add('error');
        }
        if (inputYear.value.length == 0) {
            inputYear.classList.add('error');
            msgError[2].style.display = 'block';
            label[2].classList.add('error');
        }
    }

    function isInvalidValue(){
        let date = new Date()
        let lastDayOfTheMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        let dayOfMonth = lastDayOfTheMonth.getDate();
        let month = 12;
        let year = date.getFullYear()
        if(inputDay.value > dayOfMonth || inputDay.value == 0){
            inputDay.classList.add('error');
            invalidErrorMSG[0].style.display = 'block'
            label[0].classList.add('error');
            return true; // Retorna true se o valor for inválido
        }
        else if(inputMonth.value > month || inputMonth.value == 0){
            inputMonth.classList.add('error');
            invalidErrorMSG[1].style.display = 'block'
            label[1].classList.add('error');
            return true; // Retorna true se o valor for inválido
        }
        else if(inputYear.value > year || inputYear.value == 0){
            inputYear.classList.add('error');
            invalidErrorMSG[2].style.display = 'block'
            label[2].classList.add('error');
            return true; // Retorna true se o valor for inválido
        }
        return false; // Retorna false se todos os valores forem válidos
    }
    
    function clearErrorClasses() {
        // Remove a classe 'error' de todos os elementos relevantes
        inputDay.classList.remove('error');
        inputMonth.classList.remove('error');
        inputYear.classList.remove('error');
    
        msgError.forEach(errorElement => {
            errorElement.style.display = 'none';
        });
    
        label.forEach(labelElement => {
            labelElement.classList.remove('error');
        });
        invalidErrorMSG.forEach(invalidError => {
            invalidError.style.display = 'none';
        });
    }

    function calculateAge(day, month, year){
        let dateNow = new Date();
        let dayNow = dateNow.getDate();
        let monthNow = dateNow.getMonth() + 1;
        let yearNow = dateNow.getFullYear();

        // Calcula a diferença em anos, meses e dias
        let ageInYears = yearNow - year;
        let ageInMonths = monthNow - month;
        let ageInDays = dayNow - day;

        // Corrige possíveis casos em que o mês atual é menor que o mês de nascimento
        if (ageInMonths < 0 || (ageInMonths === 0 && ageInDays < 0)) {
            ageInYears--;
            ageInMonths += 12;
        }

        // Corrige possíveis casos em que o dia atual é menor que o dia de nascimento
        if (ageInDays < 0) {
            let daysInLastMonth = new Date(yearNow, monthNow - 1, 0).getDate();
            ageInMonths--;
            ageInDays += daysInLastMonth;
        }

        outputNumber[0].innerHTML = ageInYears;
        outputNumber[1].innerHTML = ageInMonths;
        outputNumber[2].innerHTML = ageInDays;
    }
    
    // Limpa todas as classes 'error' existentes
    clearErrorClasses();

    // Fluxo de validação
    if (inputDay.value.length == 0 || inputMonth.value.length == 0 || inputYear.value.length == 0) {
        fillInAllFields();
    } else {
        if (!isInvalidValue()) {
            let day = inputDay.value;
            let month = inputMonth.value;
            let year = inputYear.value;
            calculateAge(day, month, year)

            // Limpa os campos de entrada
            inputDay.value = '';
            inputMonth.value = '';
            inputYear.value = '';
        }
    }
});
