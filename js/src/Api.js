angular.module('Api', [])
    .service('$api', function ($http) {
        this.make = function (value, request) {
            var $resolved = false;
            var $errors = [];
            var $failed = false;
            var $status = null;
            var $headers = null;

            Object.defineProperty(value, '$resolved', {
                enumerable: false,
                configurable: false,
                get: function () {
                    return $resolved;
                }
            });

            Object.defineProperty(value, '$request', {
                enumerable: false,
                configurable: false,
                get: function () {
                    return request;
                }
            });

            Object.defineProperty(value, '$errors', {
                enumerable: false,
                configurable: false,
                get: function () {
                    return $errors;
                }
            });

            Object.defineProperty(value, '$failed', {
                enumerable: false,
                configurable: false,
                get: function () {
                    return $failed;
                }
            });

            Object.defineProperty(value, '$status', {
                enumerable: false,
                configurable: false,
                get: function () {
                    return $status;
                }
            });

            Object.defineProperty(value, '$headers', {
                enumerable: false,
                configurable: false,
                get: function () {
                    return $headers;
                }
            });

            request.success(function (response, status, headers) {
                $resolved = true;
                $status = status;
                $headers = headers;
                $failed = false;
            });

            request.error(function (response, status, headers) {
                $resolved = true;
                $failed = true;
                $status = status;
                $errors = response;
                $headers = headers;
            });
        };

        this.object = function (request) {
            var object = {};

            this.make(object, request);

            request.success(function (items) {
                angular.extend(object, items);
            });

            return object;
        };

        this.array = function (request) {
            var array = [];

            this.make(array, request);

            request.success(function (items) {
                items.map(function (item) {
                    array.push(item);
                });
            });

            return array;
        };
    })
;