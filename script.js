const btn = document.getElementsByClassName("button")
const input = document.getElementById("current-input")
const lastinput = document.getElementById("last-input")
const copy = document.getElementById("copy-msg")
console.log(btn)

// U T I L S---------------------------------------------------------------------------------------------
const sleep = async (e) => {
    setTimeout(e(), 2000);
}

// Clear All
btn[0].addEventListener("click", () => {
    input.innerHTML = 0
    lastinput.innerHTML = ""
})

// Copy to clipboard 
btn[1].addEventListener("click", async () => {
    if (navigator.clipboard !== undefined) {
        navigator.clipboard.writeText(input.innerHTML);
    }
    else { // for http connection
        box.focus()
        box.select()
        try {
            document.execCommand('copy');
        } catch (err) {
            console.error('Unable to copy to clipboard', err);
        }
        box.setSelectionRange(input.innerHTML.length, input.innerHTML.length) // set cursor on last position
    }
    copy.innerHTML = "Copied to clipboard \u2713"
})
btn[1].addEventListener("mouseenter", () => {
    // console.log("mouseover")
    copy.style.display = "block"
})
btn[1].addEventListener("mouseleave", () => {
    // console.log("mouseover")
    copy.style.display = "none"
    copy.innerHTML = "Copy to clipboard"
})
btn[1].addEventListener("blur", () => {
    // console.log("mouseover")
    copy.style.display = "none"
    copy.innerHTML = "Copy to clipboard"
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

// Calculation handler
const calc = (str) => {
    str = eval(str).toString()
    if (str.includes(".")) {
        let arr = eval(str).toString().split(".")
        let res = ""
        let temp = arr[1]
        console.log(arr[1])
        // More than 5 digits after decimal
        if (temp.length > 10) {
            // initially assume that decimal has recursive digits
            let x = 2
            // lets see if decimal is having limited precision and will end at some place
            for (let i = 2; i < 10; i++) {
                if (temp[i] === temp[i - 1]) { }
                // 
                else {
                    x = i;
                    break;
                }
            }
            temp = temp.slice(0, x) + "." + temp.slice(x, temp.length)
            temp = Math.round(temp)
        }
        res = arr[0] + "." + temp
        res = eval(res).toString()
        return res
    }
    else{
        return str
    }
}

// Handlers ---------------------------------------------------------------------------------------------------------------------
const finalconvert = (str) => {
    str = str.replaceAll("/", "\u00F7")
    str = str.replaceAll("*", "\u00D7")
    return str
}

// % function
const percent = (str) => {
    let arr = str.split("%")
    let result = (parseFloat(arr[0]) * (parseFloat(arr[1]) / 100)).toString()
    return result
}

// Click and Hit handler
const hit = (val) => {
    let arr = ["+", "-", "/", "*"]
    let lastconverted = lastinput.innerHTML.replace(/\u00F7/g, "/")
    lastconverted = lastconverted.replace(/\u00D7/g, "*")
    let temp = input.innerHTML.replace(/\u00F7/g, "/")
    temp = temp.replace(/\u00D7/g, "*")
    let pattern = /\+|\-|\/|\*/g

    // Check for numbers
    if (isNaN(val) === false) {
        addnumber(val)
    }

    // Check math symbols
    else if (arr.forEach(character => {
        if (val === character) {
            // if last input is empty
            if (lastinput.innerHTML === "") {
                console.log("input is empty")
                // input has /0
                if (calc(temp) == "NaN" || calc(temp) === "Infinity") {
                    alert("The result is heptic please clear all inputs and do a good math")
                }
                // input has %
                else if (temp.includes("%")) {
                    lastinput.innerHTML = calc(percent(temp))
                }
                else {
                    lastinput.innerHTML = calc(temp) + finalconvert(val)
                    input.innerHTML = "0"
                }
            }
            // last input is not empty
            else {
                // if last input end is a number
                if (isNaN(lastconverted[lastconverted.length - 1]) === false) {
                    lastinput.innerHTML += finalconvert(val)
                }
                // last input end is symbol
                else {
                    console.log("last symbol")
                    // input is 0 the replace symbol
                    if (calc(temp) === "0") {
                        lastinput.innerHTML = lastconverted.slice(0, lastconverted.length - 1) + finalconvert(val)
                    }
                    // check for /0
                    else if (calc(lastconverted + temp) === "NaN" || calc(lastconverted + temp) === "Infinity") {
                        alert("The result is heptic please clear all inputs and do a good math")
                    }
                    // % at end
                    else if ((lastconverted + temp).includes("%")) {
                        lastinput.innerHTML = calc(percent(lastconverted + temp)) + finalconvert(val)
                        input.innerHTML = "0"
                    }
                    else {
                        lastinput.innerHTML = finalconvert(calc(lastconverted + temp) + val);
                        input.innerHTML = "0"
                    }
                }
            }
            lastinput.classList.add("slide")
        }
    }));

    // Percentage
    else if (val === "%") {
        // if input is empty
        if (lastconverted === "") {
            // if input has %
            if (temp.includes("%")) { lastinput.innerHTML = calc(percent(temp)) }
            else { lastinput.innerHTML = finalconvert(calc(temp) + val); }
        }
        else {
            // last input end is symbol or input is 0 then replace
            if (isNaN(lastconverted[lastconverted.length - 1]) || calc(temp) === "0") {
                lastinput.innerHTML = lastconverted.slice(0, lastconverted.length - 1) + finalconvert(val);
            }
            // last input end is number
            else {
                lastinput.innerHTML += finalconvert(val);
            }
        }
        lastinput.classList.add("slide")
        input.innerHTML = "0"
    }

    // Plus or minus
    else if (val === "plus-minus") {
        // if last input is empty
        if (lastconverted === "") {
            lastinput.innerHTML = calc(temp) + "+"
        }
        // last input has symbol at end
        else if (isNaN(lastconverted[lastconverted.length - 1])) {
            let x = lastconverted[lastconverted.length - 1]
            let cut = finalconvert(lastconverted.slice(0, lastconverted.length - 1))
            // end is "+"
            if (x === "+") {
                lastinput.innerHTML = cut + "-"
            }
            else {
                lastinput.innerHTML = cut + "+"
            }
        }
        // last input has number at end
        else {
            lastinput.innerHTML = finalconvert(lastconverted) + "+"
        }
    }

    // Decimal point
    else if (val === ".") {
        // input end is a symbol
        if (isNaN(input.innerHTML[input.innerHTML.length - 1])) {
            // end symbol is not decimal then add
            if (input.innerHTML[input.innerHTML.length - 1] !== ".") {
                input.innerHTML += "0" + val
            }
            else {
                console.log("already decimal there")
            }
        }
        // end index at input is a number
        else {
            x = temp.split(pattern)
            console.log(x)
            // the end number already has decimal
            if (x[x.length - 1].includes(".")) {
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
            if (eval(temp) == NaN || eval(temp) === Infinity) {
                alert("The result is heptic please clear all inputs and do a good math")
            }
            // input has %
            else if (temp.includes("%")) {
                input.innerHTML = percent(temp)
            }
            else { input.innerHTML = eval(temp) }
        }
        // last input not empty
        else {
            // if last input has symbol
            if (isNaN(lastconverted[lastconverted.length - 1])) {
                // the /0 
                if (eval(lastconverted + temp) === NaN || eval(lastconverted + temp) === Infinity) {
                    console.log("/0 Entered")
                    alert("The result is heptic please clear all inputs and do a good math")
                }
                // % in last input 
                else if (lastconverted.includes("%")) {
                    console.log("Last input has %")
                    input.innerHTML = percent(lastconverted + temp)
                    lastinput.innerHTML = ""
                }
                else {
                    // 0/0
                    if (lastconverted[lastconverted.length - 1] === "/" && eval(temp) == 0) {
                        alert("The result is heptic please clear all inputs and do a good math")
                    }
                    else {
                        console.log("normal symbols")
                        input.innerHTML = eval(lastconverted + temp)
                        lastinput.innerHTML = ""
                    }
                }
            }
            // last input copy if no symbol at end of it
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
    event.preventDefault(); // prevent default key configs for browser and document
    console.log(event)
    if (event.key === " ") {
    }
    // Clear when "Delete" is pressed
    else if (event.key === "Delete") {
        btn[0].click()
    }
    // Copy to clipboard with "CTRL+C"
    else if (event.key === 'c' && event.ctrlKey === true) {
        async () => {
            btn[1].click()
            copy.style.display = "block"
            copy.innerHTML = "Copied to clipboard \u2713"
            const copyhit = () => {
                copy.style.display = "none"
                copy.innerHTML = "Copy to Clipboard"
            }
            await sleep(copyhit)
        }
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

// Plus - Minus
btn[17].addEventListener("click", () => {
    hit("plus-minus")
})
btn[19].addEventListener("click", () => {
    hit("plus-minus")
})

// Percentage
btn[2].addEventListener("click", () => {
    hit("%")
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

