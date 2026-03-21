let mode = "youtube";

function setCalc(type) {
    mode = type;
    alert("Calculator selected: " + type);
}

function calculate() {

    let a = Number(document.getElementById("input1").value);
    let b = Number(document.getElementById("input2").value);

    let result = 0;

    if (mode === "youtube") {
        result = (a / 1000) * b;
    }

    else if (mode === "insta_eng") {
        result = ((a + b) / 10000) * 100;
    }

    else if (mode === "tiktok") {
        result = (a / 1000) * b * 1.2;
    }

    else if (mode === "brand") {
        result = (a / 1000) * 10;
    }

    else if (mode === "affiliate") {
        result = a * b;
    }

    else {
        result = a + b;
    }

    document.getElementById("result").innerHTML = "Result: " + result;

}
