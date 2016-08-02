import fs from 'fs';
import path from 'path';

export default function(dirPath) {
    return fs.readdirSync(dirPath).filter(function(file) {
        return fs.statSync(path.join(dirPath, file)).isDirectory();
    });
};
