import { fillTerminal } from "./views.js"


// Global variable to hold history of terminal
let terminalHistory = ["Welcome to Solopie's Terminal!",
    "Run the \"help\" command to get some options!"]

function colourPrompt() {
    const prompt = "solopie@website"
    // Change font colour of prompt 
    const lines = $("li")
    // Ignore the newest line which is the the current prompt
    const oldLines = lines.slice(0, lines.length - 1)
    for (let i of oldLines) {
        if (i.innerText.startsWith(prompt)) {
            const previousText = i.innerText.substring(prompt.length);
            i.innerHTML = "<span class=\"prompt\">solopie@website</span>" + previousText;
        }
    }
}

function binding() {
    // Handling terminal input
    const inputForm = $("#input-form")
    inputForm.submit((event) => {
        event.preventDefault()
        const terminalInput = $("#terminal-input")
        appendInput(terminalInput[0].value)
    })
}

function appendInput(terminalInput) {
    const prompt = "solopie@website"
    const fullPrompt = prompt + ":~$ "
    terminalHistory.push(fullPrompt + terminalInput)
    terminalHistory.push(...runCommand(terminalInput))
    renderTerminal()
}

// Replicate functionality of terminal cause a real terminal is dangerous :)
// Will always return an array
// Will modularise commands into files when I make terminal more advanced
function runCommand(command) {
    console.log("Command: " + command)
    // Don't care about flags
    const commandArray = command.split(" ")
    command = commandArray[0]
    const options = commandArray.slice(1)

    switch (command) {
        case "":
            return []
        case "help":
            const helpOutput = [
                "This is a fake terminal. Don't waste your time :)",
                "Will put more fun stuff in here when I have time.",
                "Commands:",
                "ls - List out pages to access",
                "cd <page> - Access specified page",
                "clear - Clear the terminal"
            ]
            return helpOutput
        case "ls":
            const lsOutput = [
                "total 0",
                "-rw-r--r-- 1 solopie solopie 0 Jun  4 02:03 github",
                "-rw-r--r-- 1 solopie solopie 0 Jun  4 02:03 linkedin",
                "-rw-r--r-- 1 solopie solopie 0 Jun  4 02:03 projects",
                "-rw-r--r-- 1 solopie solopie 0 Jun  4 02:03 resume"]

            return lsOutput
        case "cd":
            const possibleLocations = ["github", "linkedin", "projects", "resume"]

            if (possibleLocations.includes(options[0])) {
                window.location.href = "/" + options[0]
            } else {
                return ["cd: no such page exists: " + options[0]]
            }
            // Don't need to return anything here
            break;
        case "clear":
            terminalHistory = []
            return []
    }

    // Invalid command
    return [command + ": command not found"]
}

// Render list of terminal output
export function renderTerminal() {
    const terminal = $("#terminal-content-container")
    fillTerminal(terminal, terminalHistory)
    colourPrompt()
    binding()

    // After rendering auto focus the input
    const terminalInput = $("#terminal-input")
    terminalInput.focus()
    // Don't need this?
    // terminalInput.select()
}