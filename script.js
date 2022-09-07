// show a message with a type of the input
function showMessage(input, message, type) {
    // get the small element and set the message
    const msg = input.parentNode.querySelector("small");
    msg.innerText = message;
    // update the class for the input
    input.className = type ? "success" : "error";
    return type;
}

function showError(input, message) {
    return showMessage(input, message, false);
}

function showSuccess(input) {
    return showMessage(input, "", true);
}

function hasValue(input, message) {
    if (input.value.trim() === "") {
        return showError(input, message);
    }
    return showSuccess(input);
}

const EMAIL_REQUIRED = "Please enter your email";
const EMAIL_INVALID = "Please enter a correct email address format";

function validateEmail(input, requiredMsg, invalidMsg) {
    // check if the value is not empty
    if (!hasValue(input, requiredMsg)) {
        return false;
    }
    // validate email format
    const emailRegex =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const email = input.value.trim();
    if (!emailRegex.test(email)) {
        return showError(input, invalidMsg);
    }
    return true;
}

function onSubmitForm1(token) {
    submitForm("contact-form1", "form-response1", "BuyNowEmail1")
}

function onSubmitForm2(token) {
    submitForm("contact-form2", "form-response2", "BuyNowEmail2")
}

function submitForm(contactFormId, formResponseId, emailInputId) {
    // document.getElementById("contact-form").submit();
    let contactForm = document.getElementById(contactFormId);
    let formResponse = document.getElementById(formResponseId);
    // validate the form
    let emailValid = validateEmail(contactForm.elements[emailInputId], EMAIL_REQUIRED, EMAIL_INVALID);
    // if valid, submit the form.
    if (emailValid) {
        // alert("Demo only. No form was posted.");
        const data = new URLSearchParams();
        for (const pair of new FormData(contactForm)) {
            data.append(pair[0], pair[1]);
        }

        fetch("https://ftldigitalmarketingazurefunctions.azurewebsites.net/api/HttpStartFromLandingPage", {
            method: 'post',
            body: data,
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.success) {
                formResponse.innerHTML = "<p class='success'>Thank you for contacting us!</p>";
            } else {
                formResponse.innerHTML = "<p class='error'>Something went wrong. Please try again later.</p>";
            }
        })
        .catch(error => {
            console.error('Error:', error);
            formResponse.innerHTML = "<p class='error'>Something went wrong. Please try again later.</p>";
        });
    }
}