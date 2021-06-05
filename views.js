function fillTerminal(target, lines) {
    const template = $("#terminal-template").html();
    const templateScript = Handlebars.compile(template);
    const html = templateScript({ lines });

    $(target).append(html);
}

export { fillTerminal }