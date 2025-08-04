const submitButton = document.getElementById("btnSubmit");

function submitContactForm() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    if (name && email && message) {
        alert("Thank you, the council will review your suggestion when possible!")
        resetForm();
    }
}

function resetForm() {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("message").value = "";
}

submitButton.addEventListener("click", submitContactForm);
