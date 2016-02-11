import path from 'path';
import through from 'through2';
import File from 'vinyl';
import source from 'vinyl-source-stream';

module.exports = (fn) => {
    fn = fn || new Function();
    
    return through.obj(function (file, encoding, cb) {
        const bundleStream = fn(file);

        bundleStream
            .pipe(source(path.basename(file.path)))
            .pipe(through.obj((file, encoding, cb) => {
                this.push(file);
                cb();
            }));
        
        bundleStream.on('end', () => {
            cb();
        });
    });
};
