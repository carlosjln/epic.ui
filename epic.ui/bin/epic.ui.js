/*!
 * EPIC.UI.JS - v1.0.4
 * Simple & awesome UI components for EPIC.JS
 * https://github.com/carlosjln/epic.ui
 * 
 * Copyright 2014
 * Released under MIT License
 * https://github.com/carlosjln/epic.ui/blob/master/LICENSE
 * 
 * Author: Carlos J. Lopez
 * https://github.com/carlosjln
 */
(function(epic) {
    function ui(){}
    ui.align = {
        'default': '', left: 'pull-left', right: 'pull-right'
    };
    epic.ui = ui
})(epic);
(function(epic) {
    function alert(settings) {
        var self = this;
        settings = self.settings = epic.object.merge(alert.default_settings, settings);
        var element = self.container = document.createElement('div');
        var inner = self.message = document.createElement('span');
        var type = settings.type;
        var message = settings.message;
        var target = settings.target;
        element.insertBefore(inner, null);
        inner.className = 'message';
        element.className = "alert alert-" + (type ? type : "default");
        if (message) {
            inner.innerHTML = message
        }
        if (target) {
            target.insertBefore(element, null)
        }
    }
    alert.prototype = {
        show: function() {
            this.container.style.display = 'block';
            return this
        }, hide: function() {
                this.container.style.display = 'none';
                return this
            }, set_message: function(message) {
                this.message.innerHTML = message;
                return this
            }, as_success: function() {
                return this.set_type(alert.type.success)
            }, as_info: function() {
                return this.set_type(alert.type.info)
            }, as_warning: function() {
                return this.set_type(alert.type.warning)
            }, as_danger: function() {
                return this.set_type(alert.type.danger)
            }, set_type: function(type) {
                var t = this;
                t.container.className = "alert alert-" + type;
                return t
            }
    };
    alert.type = {
        'default': 'default', success: 'success', info: 'info', warning: 'warning', danger: 'danger'
    };
    alert.default_settings = {
        type: alert.type.default, message: "", target: null, closable: false
    };
    epic.alert = alert
})(epic);
(function(epic, document) {
    var copy = epic.object.copy;
    var trim_spaces = epic.string.trim;
    var prototype = {
            constructor: icon, family: "", prefix: "", classes: "", change: function(name) {
                    var self = this;
                    if (name) {
                        self.name = name;
                        self.container.className = get_class(self)
                    }
                    return self
                }, set_align: function(alignment) {
                    var self = this;
                    if (typeof alignment === "string") {
                        self.align = alignment;
                        self.container.className = get_class(self)
                    }
                    return self
                }, set_caption: function(caption) {
                    var self = this;
                    if (typeof caption === "string") {
                        self.container.innerHTML = caption
                    }
                    return self
                }, hide: function() {
                    var self = this;
                    self.container.style.display = 'none';
                    return self
                }, show: function() {
                    var self = this;
                    self.container.style.display = '';
                    return self
                }
        };
    function icon(settings) {
        settings = settings || {};
        var self = this;
        var i = self.container = document.createElement('i');
        copy(settings, self);
        i.className = get_class(self);
        self.set_caption(self.caption)
    }
    function get_class(self) {
        var prefix = self.prefix || '';
        var family = self.family || '';
        var name = self.name || '';
        var align = self.align || '';
        var classes = self.classes || '';
        prefix = prefix ? prefix + '-' : '';
        return trim_spaces(family + ' ' + prefix + name + ' ' + align + ' ' + classes, true)
    }
    icon.setup = function(default_settings) {
        copy(default_settings, icon.prototype)
    };
    icon.setup(prototype);
    epic.icon = icon
})(epic, document);
(function(epic, $) {
    var create_document_fragment = epic.html.create.document_fragment;
    function button(settings) {
        settings = settings || {};
        var self = this;
        for (var property in settings) {
            self[property] = settings[property]
        }
        var id = self.id = (self.id || "BTN-" + epic.uid.next());
        var caption = self.caption;
        var tag = self.tag;
        var size = self.size;
        var style = self.style;
        var attributes = self.attributes;
        var classes = self.classes = ('btn ' + self.classes);
        var role = tag === button.size.button ? 'type="' + self.role + '"' : "";
        var icon = self.icon = settings.icon || new epic.icon;
        var align = epic.ui.align;
        if (icon.align === align.default) {
            icon.set_align(align.left)
        }
        if (caption === "") {
            if (icon.name !== "") {
                classes += " btn-icon-only"
            }
            icon.set_align(align.default)
        }
        var html_tag = '<' + tag + ' id="' + id + '"' + role + ' class="' + classes + ' btn-size-' + size + ' btn-' + style + '" ' + attributes + '></' + tag + '>';
        var element = $(create_document_fragment(html_tag)).append(icon.container, caption);
        self.container = element.get(0)
    }
    button.size = {
        mini: 'mini', small: 'small', normal: 'normal', large: 'large'
    };
    button.tag = {
        anchor: 'a', button: 'button'
    };
    button.role = {
        button: 'button', submit: 'submit', reset: 'reset'
    };
    button.style = {
        'default': 'default', primary: 'primary', warning: 'warning', danger: 'danger', success: 'success', info: 'info'
    };
    var prototype = {
            caption: "", classes: "", attributes: "", tag: button.tag.button, size: button.size.normal, role: button.role.button, style: button.style.default
        };
    epic.object.extend(button, prototype);
    epic.button = button
})(epic, epic.html);
(function(epic, window, document) {
    var $ = epic.html;
    function create(tag, classname, style, content) {
        var element = document.createElement(tag);
        element.className = classname || "";
        element.style.cssText = style || "";
        element.innerHTML = content || "";
        return element
    }
    function viewport() {
        var self = this;
        self.views = [];
        self.container = create("div", "epic-viewport")
    }
    viewport.prototype.add_view = function() {
        var self = this;
        var views = self.views;
        var v = new view(self);
        self.container.insertBefore(v.container, null);
        views[views.length] = v;
        return v
    };
    function view(viewport) {
        var container = create("div", "epic-view", "");
        var loader = create("span", "epic-view-status", "", "Working...");
        var t = this;
        t.container = container;
        t.loader = loader;
        t.viewport = viewport;
        container.insertBefore(loader, null)
    }
    view.prototype = {
        is_busy: function(state) {
            var loader = this.loader;
            loader.style.display = 'none';
            loader.innerHTML = 'Working out...';
            if (state) {
                loader.style.display = 'inline';
                if (typeof state === "string") {
                    loader.innerHTML = state
                }
            }
        }, activate: function() {
                var self = this;
                var vp = self.viewport;
                var current_view = vp.current_view;
                if (current_view) {
                    current_view.container.style.display = "none"
                }
                self.container.style.display = 'block';
                vp.current_view = self;
                return self
            }, empty: function() {
                var self = this;
                var container = self.container;
                self.is_busy(false);
                $(container).empty().append(self.loader);
                return self
            }, append: function() {
                var self = this;
                $(self.container).insert(arguments);
                return self
            }
    };
    epic.viewport = viewport;
    epic.view = view
})(epic, window, document);
(function(epic, document) {
    function get_notification_rail() {
        var id = "epic-notification-rail";
        var rail = document.getElementById(id);
        if (rail === null) {
            rail = document.createElement("div");
            rail.id = id
        }
        if (rail.parentNode === null) {
            document.body.insertBefore(rail, null)
        }
        return rail
    }
    function notice(settings) {
        settings = epic.object.merge(notice.default_settings, settings);
        var t = this;
        var container = t.container = document.createElement('div');
        var title_bar = t.title = document.createElement('span');
        var close_button = t.close_button = document.createElement('span');
        var message = t.message = document.createElement('div');
        var notice_type = settings.type;
        var title = settings.title;
        var timeout = settings.timeout;
        title = title || (notice_type === notice.type.default ? "Information!" : (notice_type.charAt(0).toUpperCase() + notice_type.slice(1)) + "!");
        t.settings = settings;
        t.set_type(notice_type);
        close_button.innerHTML = "";
        close_button.className = "epic-notice-close";
        epic.event.add("click", close_button, notice.event.close, container);
        title_bar.innerHTML = title;
        title_bar.className = "epic-notice-title";
        message.innerHTML = settings.message;
        message.className = "epic-notice-content";
        container.insertBefore(close_button, null);
        container.insertBefore(title_bar, null);
        container.insertBefore(message, null);
        epic.event.add("mouseover", container, notice.event.mouseover, close_button);
        epic.event.add("mouseout", container, notice.event.mouseout, close_button);
        get_notification_rail().insertBefore(container, null);
        if (typeof timeout === "number") {
            setTimeout(function() {
                !t.is_closed() && fade(t.container)
            }, timeout * 1000)
        }
    }
    function notify(settings) {
        return new notice(settings)
    }
    function fade(element) {
        var opacity = 1;
        var timer = setInterval(function() {
                if (opacity <= 0.1) {
                    clearInterval(timer);
                    element.style.opacity = '1';
                    element.style.display = 'none'
                }
                element.style.opacity = opacity;
                element.style.filter = 'alpha(opacity=' + opacity * 100 + ")";
                opacity -= opacity * 0.3
            }, 50)
    }
    notice.prototype = {
        set_content: function(content) {
            var t = this;
            t.message.innerHTML = content;
            return t
        }, show: function() {
                var t = this;
                var container = t.container;
                container.style.display = 'block';
                if (t.parentNode === null) {
                    get_notification_rail().insertBefore(container, null)
                }
                return t
            }, hide: function() {
                var t = this;
                t.container.style.display = 'none';
                return t
            }, is_closed: function() {
                return this.container.style.display == 'none'
            }, as_success: function() {
                return this.set_type(alert.type.success)
            }, as_info: function() {
                return this.set_type(alert.type.info)
            }, as_warning: function() {
                return this.set_type(alert.type.warning)
            }, as_danger: function() {
                return this.set_type(alert.type.danger)
            }, set_type: function(type) {
                var t = this;
                t.container.className = "epic-notice epic-notice-" + type;
                return t
            }
    };
    notice.type = {
        'default': 'default', success: 'success', info: 'info', warning: 'warning', danger: 'danger'
    };
    notice.default_settings = {
        type: notice.type.default, message: "", closable: false, timeout: 5
    };
    notice.event = {
        close: function(e, container) {
            var parent = container.parentNode;
            parent.removeChild(container)
        }, mouseover: function(e, close_button) {
                close_button.style.display = "block"
            }, mouseout: function(e, close_button) {
                close_button.style.display = "none"
            }
    };
    notify.success = function(message, closable) {
        return new notice({
                type: notice.type.success, message: message, closable: closable
            })
    };
    notify.danger = function(message, closable) {
        return new notice({
                type: notice.type.danger, message: message, closable: closable
            })
    };
    notify.warning = function(message, closable) {
        return new notice({
                type: notice.type.warning, message: message, closable: closable
            })
    };
    notify.info = function(message, closable) {
        return new notice({
                type: notice.type.info, message: message, closable: closable
            })
    };
    epic.notice = notice;
    epic.notify = notify
})(epic, document);
(function(epic, $) {
    function box(settings) {
        var self = this;
        var id = settings.id || ("epic-box-" + epic.uid.next());
        var container = $('<div id="' + id + '" class="epic-box"></div>');
        var header = $('<div class="epic-box-header"></div>');
        var caption_wrapper = $('<div class="epic-box-caption-wrapper"></div>');
        var caption = $('<span class="epic-box-caption"></span>');
        var controls = $('<div class="epic-box-controls"></div>');
        var body = $('<div class="epic-box-body"></div>');
        var viewport = self.viewport = new epic.viewport;
        var provided_controls = settings.controls;
        self.settings = settings;
        self.container = container.get(0);
        self.header = header.get(0);
        self.caption_wrapper = caption_wrapper.get(0);
        self.icon = settings.icon || new epic.icon;
        self.caption = caption.get(0);
        self.controls = controls.get(0);
        self.body = body.get(0);
        body.append(viewport.container);
        caption_wrapper.append(self.icon.container);
        caption_wrapper.append(caption);
        header.append(caption_wrapper);
        header.append(controls);
        container.append(header);
        container.append(body);
        self.set_caption(settings.caption);
        self.resize(settings.width, settings.height);
        if (settings.singleview) {
            self.viewport.add_view().activate()
        }
        if (provided_controls) {
            controls.append(provided_controls)
        }
        if (settings.target) {
            $(settings.target).append(container)
        }
    }
    var prototype = box.prototype;
    prototype.set_caption = function(caption) {
        if (caption) {
            $(this.caption).html(caption)
        }
    };
    prototype.resize = function(width, height) {
        if (width && height) {
            var style = this.container.style;
            style.width = width + 'px';
            style.height = height + 'px'
        }
    };
    epic.box = box
})(epic, epic.html);
(function(epic) {
    var $ = epic.html;
    var add_event = epic.event.add;
    function create(tag, classname, style, content) {
        var element = document.createElement(tag);
        element.className = classname || "";
        element.style.cssText = style || "";
        element.innerHTML = content || "";
        return element
    }
    function overlay(settings) {
        var container = $(create("div", "modal-container"));
        var dark_side = $(create("div", "modal-overlay"));
        var content = $(settings.content).add_class("modal-content");
        var btn_hide = content.find(".btn-hide-overlay");
        var btn_remove = container.find(".btn-remove-overlay");
        var handle = overlay.events;
        var self = this;
        var event_data = {
                container: container, btn_close: (btn_remove || btn_hide), overlay: self
            };
        container.append(dark_side, content);
        self.container = container.get(0);
        self.overlay = dark_side.get(0);
        self.content = content.get(0);
        btn_hide.click(handle.on_hide, event_data);
        btn_remove.click(handle.on_hide, event_data);
        add_event(self.container, "keyup", handle.on_escape, event_data);
        $(settings.target || "body").append(container);
        var margin_top = content.height() / 2;
        var margin_left = content.width() / 2;
        content.css("margin", "-" + margin_top + "px 0 0 -" + margin_left + "px")
    }
    var prototype = overlay.prototype;
    prototype.hide = function() {
        this.container.style.display = 'none';
        return this
    };
    prototype.show = function() {
        this.container.style.display = 'block';
        return this
    };
    overlay.events = {
        on_hide: function(e) {
            e.preventDefault();
            e.data.overlay.hide()
        }, on_escape: function(e) {
                e.preventDefault();
                if (e.which === 27) {
                    e.data.btn_close.click()
                }
            }
    };
    epic.overlay = overlay
})(epic);
(function(epic, window, document, undefined) {
    var add_event = epic.event.add;
    var trim_spaces = epic.string.trim;
    var epic_button = epic.button;
    var add_class = epic.html.add_class;
    var last_dropdown_toggled;
    var epic_uid = epic.uid;
    var Option = (function() {
            function option(settings) {
                var self = this;
                var container = self.container = document.createElement("a");
                container.setAttribute("href", "#");
                self.set_caption(settings.caption);
                self.onselect = settings.onselect
            }
            option.prototype = {
                constructor: option, disable: function() {
                        var self = this;
                        var container = self.container;
                        container.className = "disabled";
                        container.setAttribute("disabled", "true");
                        self.disabled = true
                    }, enable: function() {
                        var self = this;
                        var container = self.container;
                        container.className = "";
                        container.removeAttribute("disabled");
                        self.disabled = false
                    }, set_caption: function(caption) {
                        var self = this;
                        if (typeof caption === "string") {
                            self.caption = caption;
                            self.container.innerHTML = caption
                        }
                        return self
                    }
            };
            return option
        })();
    function on_select(e, context) {
        e.prevent_default();
        var option = context.option;
        if (option.disabled !== true) {
            (option.onselect || context.dropdown.onselect).call(e.target, e, option, context.data)
        }
    }
    function option_collection(dropdown) {
        var items = [];
        var self = this;
        self.add = function(options) {
            if (options === undefined) {
                return
            }
            options = options instanceof Array ? options : [options];
            var document_fragment = document.createDocumentFragment();
            var length = options.length;
            var i = 0;
            var li;
            var opt;
            var option;
            var context;
            var container;
            for (; i < length; i++) {
                opt = options[i];
                li = document.createElement("li");
                if (opt.divide === true) {
                    li.className = 'divider'
                }
                else {
                    option = items[items.length] = new Option(opt);
                    container = option.container;
                    context = {
                        dropdown: dropdown, option: option, data: opt.data
                    };
                    add_event(container, "click", on_select, context);
                    li.insertBefore(container, null)
                }
                document_fragment.insertBefore(li, null)
            }
            dropdown.list.insertBefore(document_fragment, null)
        };
        self.get = function(index) {
            return items[index]
        }
    }
    function dropdown(settings) {
        var self = this;
        var container = self.container = document.createElement("span");
        var toggle = self.toggle_button = settings.toggle_button || new epic_button({
                style: epic_button.style.primary, icon: new epic.icon({name: "caret"})
            });
        var toggle_container = toggle.container;
        var list = self.list = document.createElement("ul");
        var options = self.options = new option_collection(self);
        add_class(toggle_container, "dropdown-toggle");
        list.className = "dropdown-menu";
        container.id = settings.id || "DD-" + epic_uid.next();
        container.insertBefore(toggle_container, null);
        container.insertBefore(list, null);
        add_class(container, "dropdown " + settings.classes);
        self.onselect = settings.onselect || do_nothing;
        add_event(toggle_container, "click", handle_toggle_click, self);
        options.add(settings.options)
    }
    function do_nothing(e) {
        e.prevent_default()
    }
    function open_dropdown(instance) {
        close_dropdown(last_dropdown_toggled);
        var container = instance.container;
        if (container.className.indexOf("open") === -1) {
            container.className += " open"
        }
        last_dropdown_toggled = instance
    }
    function close_dropdown(instance) {
        if ((instance instanceof dropdown) === false) {
            return
        }
        var container = instance.container;
        container.className = trim_spaces(container.className.replace(/open/, ""), true);
        last_dropdown_toggled = undefined
    }
    function handle_toggle_click(e, instance) {
        e.stop_propagation();
        instance.toggle()
    }
    dropdown.prototype = {
        constructor: dropdown, divide: function() {
                var divider = document.createElement("hr");
                divider.className = "divider unselectable";
                this.options.insertBefore(divider);
                return divider
            }, open: function() {
                open_dropdown(this)
            }, close: function() {
                close_dropdown(this)
            }, toggle: function() {
                var self = this;
                if (self.is_opened()) {
                    self.close()
                }
                else {
                    self.open()
                }
            }, is_opened: function() {
                return this.container.className.indexOf("open") > -1
            }
    };
    add_event(document, "click", function(e) {
        var target = e.target || {};
        var parent = target.parentNode || {};
        var target_class_name = target.className;
        var parent_class_name = parent.className;
        var target_is_dropdown = target_class_name && typeof target_class_name === "string" && target_class_name.indexOf("dropdown") > -1;
        var parent_is_dropdown = parent_class_name && typeof parent_class_name === "string" && parent_class_name.indexOf("dropdown") > -1;
        if (target_is_dropdown || parent_is_dropdown) {
            return
        }
        close_dropdown(last_dropdown_toggled)
    });
    epic.dropdown = dropdown
})(epic, window, document);