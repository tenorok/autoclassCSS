const exec = require('child_process').exec,
    fs = require('fs'),
    vow = require('vow');

module.exports = {

    exec: function(command) {

        var promise = vow.promise();

        exec(command, function(err, stdout) {
            if(err) return promise.reject(err);
            // Удаление последнего лишнего переноса строки
            promise.fulfill(stdout.slice(0, -1));
        });

        return promise;
    },

    readFile: function(file) {

        var promise = vow.promise();

        fs.readFile(file, { 'encoding': 'utf-8' }, function(err, data) {
            if(err) return promise.reject(err);
            promise.fulfill(data);
        });

        return promise;
    },

    exists: function(path) {

        var promise = vow.promise();

        fs.exists(path, function(exists) {
            promise.fulfill(exists);
        });

        return promise;
    },

    unlink: function(path) {

        return vow
            .when(this.exists(path), function(exists) {
                return exists;
            })
            .then(function(exists) {

                var promise = vow.promise();
                if(!exists) return promise.fulfill();

                fs.unlink(path, function(err) {
                    if(err) return promise.reject(err);
                    promise.fulfill();
                });

                return promise;
            });
    }

};
