import { fillTerminal } from "./views.js"

const terminal = $("#terminal-content-container");
const terminalHistory = ["solopie@website:~$ ls -l",
    "total 0",
    "-rw-r--r-- 1 solopie solopie 0 Jun  4 02:03 github",
    "-rw-r--r-- 1 solopie solopie 0 Jun  4 02:03 linkedin",
    "-rw-r--r-- 1 solopie solopie 0 Jun  4 02:03 projects",
    "-rw-r--r-- 1 solopie solopie 0 Jun  4 02:03 resume"]

fillTerminal(terminal, terminalHistory)

// Change font colour of prompt 
const prompt = "solopie@website"
const lines = $("li")
// Ignore the newest line which is the the current prompt
const oldLines = lines.slice(0, lines.length - 1)
for (let i of oldLines) {
    if (i.innerText.startsWith(prompt)) {
        const previousText = i.innerText.substring(prompt.length);
        i.innerHTML = "<span class=\"prompt\">solopie@website</span>" + previousText;
    }
}
