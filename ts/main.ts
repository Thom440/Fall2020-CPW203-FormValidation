window.onload = function() {
    let formBtn = <HTMLElement>document.querySelector("form > button");
    formBtn.onclick = main;
}

function main():void {
    createH2Message();

    resetErrorMessages();
    isTextPresent("first-name", "First name is required");
    isTextPresent("last-name", "Last name is required");

    validateDate();
}

function createH2Message() {
    let msgHeading = document.createElement("h2");
    msgHeading.innerText = "Processing Form";
    msgHeading.setAttribute("class", "message");
    let h1 = document.querySelector("h1");
    h1.insertAdjacentElement("afterend", msgHeading);

    setTimeout(function () {
        msgHeading.remove();
    }, 5000);
}

function validateDate() {
    let dobBox = <HTMLInputElement>document.getElementById("dob");
    let dob = dobBox.value;
    if (!isValidDate(dob)) {
        let errSpan = document.getElementById("dob-span");
        errSpan.innerHTML = "Invalid format. mm/dd/yyyy"
    }
}

function isValidDate(input:string):boolean {
    // Validating mm/dd/yyyy and m/d/yyyy
    // \d{1,2}\/\d{1,2}\/\d{4}
    let pattern = /^\d{1,2}\/\d{1,2}\/\d{4}$/g;
    return pattern.test(input);
}

/**
 * Returns true if the text with the given id
 * has some text inside it
 * @param id The id of the <input type="text"> to validate
 * @param errMsg The message to display in the sibling span of the text box
 */
function isTextPresent(id:string, errMsg:string):boolean {
    let txtBox = <HTMLInputElement>document.getElementById(id);
    let txtBoxValue = txtBox.value;
    if (txtBoxValue == "") {
        let errorSpan = <HTMLSpanElement>txtBox.nextElementSibling;
        errorSpan.innerText = errMsg;
        return false;
    }
    return true;
}

/**
 * Resets all the spans to default text
 */
function resetErrorMessages():void {
    let allSpans = document.querySelectorAll("form span");
    for (let i = 0; i < allSpans.length; i++) {
        let currSpan = <HTMLElement>allSpans[i];
        if (currSpan.hasAttribute("data-required")) {
            currSpan.innerText = "*";
        }
        else {
            currSpan.innerText = "";
        }
    }
}
