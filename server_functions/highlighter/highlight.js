const chalk = require("chalk");

const success_highlighter = chalk.bold.green.inverse;
const warning_highlighter = chalk.bold.yellow.inverse;
const error_highlighter = chalk.bold.red.inverse;
const info_highlighter = chalk.bold.white.inverse;

module.exports = {
    success_highlighter: success_highlighter,
    warning_highlighter: warning_highlighter,
    error_highlighter: error_highlighter,
    info_highlighter, info_highlighter
}
