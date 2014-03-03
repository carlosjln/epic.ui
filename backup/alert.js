/// <reference path="epic.ts" />
var epic;
(function (epic) {
    var alert = (function () {
        function alert(settings) {
            this.default_options = {
                title: null,
                message: "",
                type: "",
                target: null,
                closable: false
            };
            var options = this.settings = epic.tools.merge(this.default_options, settings);

            var element = this.element = document.createElement('div');
            var inner = this.inner = document.createElement('span');

            var type = options.type;
            var message = options.message;
            var target = options.target;

            element.insertBefore(inner, null);
            inner.className = 'message';

            if (type)
                element.className = "alert alert-" + type;
            if (message)
                inner.innerHTML = message;
            if (target)
                target.insertBefore(element, null);
        }
        alert.prototype.message = function (message) {
            this.inner.innerHTML = message;
            return this;
        };

        alert.prototype.as_success = function () {
            this.element.className = "alert-success";
            return this;
        };

        alert.prototype.as_info = function () {
            this.element.className = "alert-info";
            return this;
        };

        alert.prototype.as_warning = function () {
            this.element.className = "alert-warning";
            return this;
        };

        alert.prototype.as_danger = function () {
            this.element.className = "alert-danger";
            return this;
        };

        alert.prototype.at = function (target) {
            target.insertBefore(this.element, null);
            return this;
        };

        alert.prototype.show = function () {
            this.element.style.display = 'block';
            return this;
        };

        alert.prototype.hide = function () {
            this.element.style.display = 'none';
            return this;
        };

        alert.TYPE = {
            Success: 'success',
            Info: 'info',
            Warning: 'warning',
            Danger: 'danger'
        };
        return alert;
    })();
    epic.alert = alert;
})(epic || (epic = {}));
//# sourceMappingURL=alert.js.map
