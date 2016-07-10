import path from 'path';
import through2 from 'through2';
import Vinyl from 'vinyl';

module.exports = (fn) => {
    fn = fn || new Function();
    
    return through2.obj(function (file, encoding, cb) {
        const origin = this;
        
        const bundleStream = fn(file);
        const destStream = through2();
        
        const destFile = new Vinyl({
            path: path.basename(file.path),
            contents: destStream
        });

        let out = false;
        
        bundleStream
            .pipe(through2.obj(function (chunk, encoding, cb) {
                if (!out) {
                    this.push(destFile);
                    origin.push(destFile);
                    out = true;
                }
                
                destStream.push(chunk);
                cb();
            }, function () {
                destStream.push(null);
                this.push(null);
            }));
        
        bundleStream.on('end', () => {
            cb();
        });
    });
};
