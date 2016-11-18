const execSync = require('child_process').execSync;

module.exports = function (files) {
    const data = {};
    Object.keys(files).forEach((key) => {
        const filePath = files[key];
        const log = execSync(`git log --oneline ${filePath} | wc -l`).toString();
        const diff = execSync(`git diff HEAD --name-only ${filePath} | wc -l`).toString();
        data[key] = (parseInt(log) || 1) + parseInt(diff);
    });
    return data;
};
