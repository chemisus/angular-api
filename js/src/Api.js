angular.module('Api', [])
    .service('$api', function ($http, $rootScope) {
        this.make = function (value, request) {
            var $resolved = false;
            var $errors = [];
            var $failed = false;
            var $status = null;
            var $headers = null;

            var applied = false;

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

            Object.defineProperty(value, '$apply', {
                enumerable: false,
                configurable: false,
                get: function () {
                    if (!applied) {
                        applied = true;

                        request.success(function () {
                            $rootScope.$apply();
                        });

                        request.error(function () {
                            $rootScope.$apply();
                        });
                    }

                    return function () {};
                }
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
    .service('$object', function ($api, $http) {
        this.get = function (path, config) {
            return $api.object($http.get(path, config));
        };

        this.post = function (path, data, config) {
            return $api.object($http.post(path, data, config));
        };

        this.delete = function (path, config) {
            return $api.object($http.delete(path, config));
        };

        this.head = function (path, config) {
            return $api.object($http.head(path, config));
        };

        this.put = function (path, data, config) {
            return $api.object($http.put(path, data, config));
        };

        this.jsonp = function (path, config) {
            return $api.object($http.jsonp(path, config));
        };
    })
    .service('$array', function ($api, $http) {
        this.get = function (path, config) {
            return $api.array($http.get(path, config));
        };

        this.post = function (path, data, config) {
            return $api.array($http.post(path, data, config));
        };

        this.delete = function (path, config) {
            return $api.array($http.delete(path, config));
        };

        this.head = function (path, config) {
            return $api.array($http.head(path, config));
        };

        this.put = function (path, data, config) {
            return $api.array($http.put(path, data, config));
        };

        this.jsonp = function (path, config) {
            return $api.array($http.jsonp(path, config));
        };
    })
;