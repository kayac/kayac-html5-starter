const execSync = require('child_process').execSync;

export default class RevLogger {
    constructor (files = {}) {
        this.files = files;
    }
    
    versions () {
        const data = {};
        Object.keys(this.files).forEach((key) => {
            data[key] = this.version(key);
        });
        return data;
    }

    version (key) {
        const filePath = this.files[key];
        const log = execSync(`git log --oneline ${filePath} | wc -l`).toString();
        const diff = execSync(`git diff HEAD --name-only ${filePath} | wc -l`).toString();
        return (parseInt(log) || 1) + parseInt(diff);
    }

    values () {
        return Object.keys(this.files).map((key) => {
            return this.files[key];
        });
    }
};
