document.addEventListener("DOMContentLoaded", function () {
    const yearInputs = document.querySelectorAll(".number");
    const enterButton = document.getElementById("enter");

    enterButton.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent the form from submitting

        const year1 = parseInt(yearInputs[0].value);
        const year2 = parseInt(yearInputs[1].value);
        const year3 = parseInt(yearInputs[2].value);
        const year4 = parseInt(yearInputs[3].value);

        // Combine the individual year inputs
        const selectedYear = year1 * 1000 + year2 * 100 + year3 * 10 + year4;

        if (isNaN(selectedYear)) {
            alert("Please enter your full birth year (e.g., 2001).");
        } else {
            const currentYear = new Date().getFullYear();
            const legalDrinkingAge = 21; // Adjust the legal drinking age as needed

            const userAge = currentYear - selectedYear;

            if (userAge >= legalDrinkingAge) {
                // User is of legal drinking age, allow access to the site
                window.location.href = "home.html"; // Replace with your main page
            } else {
                // User is underage
                document.body.style.backgroundImage = "url(../assets/age-verification/21.png)" // Remove during demo
                alert("You must be of legal drinking age to enter.");
            }
        }
    });

    //keeps only 1 int
    yearInputs.forEach(function (input) {
        input.addEventListener("input", function () {
            if (input.value.length > 1) {
                input.value = input.value[0];
            }
        });
    });

    // Additional event listener to clear the input when clicked
    yearInputs.forEach(function (input) {
        input.addEventListener("click", function () {
            input.value = "";
        });
    });

    //auto move to next box
    yearInputs.forEach(function (input, index) {
        input.addEventListener("input", function () {
            if (input.value.length === 1) {
                if (index < yearInputs.length - 1) {
                    yearInputs[index + 1].focus();
                }
            }
        });
    });
});
