const btn = document.getElementsByClassName("button")
console.log(btn)

// U T I L S---------------------------------------------------------------------------------------------------------------------
const sleep = async () => {
    setTimeout(() => { }, 400);
}
const input = document.getElementById("current-input")
const lastinput = document.getElementById("last-input")

// Clear All
btn[0].addEventListener("click", () => {
    input.innerHTML = 0
    lastinput.innerHTML = ""
})

// Add the number
const addnumber = (num) => {
    if (input.innerHTML === "0") {
        {
            input.innerHTML = num
        }
    }
    else {
        input.innerHTML += num
    }
}

// Handlers ---------------------------------------------------------------------------------------------------------------------
const finalconvert = (str) => {
    str = str.replaceAll("/", "\u00F7")
    str = str.replaceAll("*", "\u00D7")
    return str
}

// Click and Hit handler
const hit = (val) => {
    let arr = ["+", "-", "/", "*"]
    let lastconverted = lastinput.innerHTML.replace(/\u00F7/g, "/")
    lastconverted = lastconverted.replace(/\u00D7/g, "*")
    let pattern = /\+|\-|\/|\*/g
    // console.log(input.innerHTML)
    // console.log(lastconverted)
    console.log(val)

    // Check for numbers
    if (isNaN(val) === false) {
        addnumber(val)
    }

    // Check math symbols
    else if (arr.forEach(character => {
        if (val === character) {
            let temp = input.innerHTML.replace(/\u00F7/g, "/")
            temp = temp.replace(/\u00D7/g, "*")

            // if last input is empty
            if (lastinput.innerHTML === "") {
                console.log("input is empty")
                // input has /0
                if (eval(temp) == NaN || eval(temp)===Infinity) {
                    alert("The result is heptic please clear all inputs and do a good math")
                }
                else {
                    lastinput.innerHTML = input.innerHTML + finalconvert(val)
                    input.innerHTML = "0"
                }
            }
            // last input is not empty
            else {
                // if last input is a number
                if (isNaN(lastconverted[lastconverted.length - 1]) === false) {
                    lastinput.innerHTML = finalconvert(val)
                }
                // last is symbol
                else {
                    console.log("last symbol")
                    // check for /0
                    if (eval(lastconverted + temp) === NaN || eval(lastconverted + temp) === Infinity) {
                        alert("The result is heptic please clear all inputs and do a good math")
                    }
                    else {
                        if (input.innerHTML === "0") {
                            lastinput.innerHTML = finalconvert(lastconverted.slice(0, lastconverted.length - 1) + val)
                        }
                        else {
                            lastinput.innerHTML = finalconvert(eval(lastconverted + input.innerHTML).toString() + val);
                            input.innerHTML = "0"
                        }
                    }
                }
            }
            lastinput.classList.add("slide")
        }
    }));

    // Decimal point
    else if (val === ".") {
        // end is a symbol
        if (isNaN(input.innerHTML[input.innerHTML.length - 1])) {
            // symbol is not decimal
            if (input.innerHTML[input.innerHTML.length - 1] !== ".") {
                input.innerHTML += "0" + val
            }
            else {
                console.log("already decimal there")
            }
        }
        // end index at input has number
        else {
            let converted = input.innerHTML.replace(/\u00F7/g, "/")
            converted = converted.replace(/\u00D7/g, "*")
            let temp = converted.split(pattern)
            console.log(temp)
            // the end number already has decimal
            if (temp[temp.length - 1].includes(".")) {
                console.log("already decimal there")
            }
            else {
                input.innerHTML += val
            }
        }
    }

    // Enter
    else if (val === "Enter" || val === "=") {
        // if last input is empty
        if (lastconverted === "") {
            let temp = input.innerHTML.replace(/\u00F7/g, "/")
            temp = temp.replace(/\u00D7/g, "*")
            if (eval(temp) == NaN || eval(temp) === Infinity) {
                alert("The result is heptic please clear all inputs and do a good math")
            }
            else { input.innerHTML = eval(temp) }
        }
        else {
            // if last input has symbol
            if (isNaN(lastconverted)) {
                // the /0 
                if (eval(lastconverted + input.innerHTML) === NaN || eval(lastconverted + input.innerHTML) === Infinity) {
                    alert("The result is heptic please clear all inputs and do a good math")
                }
                else {
                    input.innerHTML = eval(lastconverted + input.innerHTML)
                    lastinput.innerHTML = ""
                }
            }
            // last input
            else {
                input.innerHTML = eval(lastconverted)
                lastinput.innerHTML = ""
            }
        }
    }

    // Backspace
    else if (val === "Backspace") {
        if (input.innerHTML.length > 1) {
            input.innerHTML = finalconvert(input.innerHTML.slice(0, input.innerHTML.length - 1))
        }
        else {
            input.innerHTML = "0"
        }
    }

    // Clear all
    else if (val === "Escape") {
        input.innerHTML = 0
        lastinput.innerHTML = ""
    }
    // console.log(input.scrollWidth - input.clientWidth, input.scrollLeft)
    input.scrollLeft = input.scrollWidth
}

// Animation end handler
lastinput.addEventListener('animationend', () => { lastinput.classList.remove("slide") })

// Key press events -------------------------------------------------------------------------------------------------------------
window.addEventListener('keydown', (event) => {
    if (event.key === " ") {
        event.preventDefault();
    }
    else { hit(event.key) }
})

// Click events -----------------------------------------------------------------------------------------------------------------

// Number Handlers
// 0
btn[20].addEventListener("click", () => {
    addnumber(0)
})
// 7
btn[3].addEventListener("click", () => {
    addnumber(7)
})
// 8
btn[4].addEventListener("click", () => {
    addnumber(8)
})
// 9
btn[5].addEventListener("click", () => {
    addnumber(9)
})
// 4
btn[6].addEventListener("click", () => {
    addnumber(4)
})
// 5
btn[7].addEventListener("click", () => {
    addnumber(5)
})
// 6
btn[8].addEventListener("click", () => {
    addnumber(6)
})
// 1
btn[9].addEventListener("click", () => {
    addnumber(1)
})
// 2
btn[10].addEventListener("click", () => {
    addnumber(2)
})
// 3
btn[11].addEventListener("click", () => {
    addnumber(3)
})

// Backspace
btn[12].addEventListener("click", () => {
    hit("Backspace")
})

// Divide
btn[13].addEventListener("click", () => {
    hit("/")
})

// Multiply
btn[14].addEventListener("click", () => {
    hit("*")
})

// Minus
btn[15].addEventListener("click", () => {
    hit("-")
})

// Plus
btn[16].addEventListener("click", () => {
    hit("+")
})

// Decimal
btn[18].addEventListener("click", () => {
    hit(".")
})
btn[21].addEventListener("click", () => {
    hit(".")
})


// Equal
btn[22].addEventListener("click", () => {
    hit("Enter")
})
btn[23].addEventListener("click", () => {
    hit("Enter")
})

