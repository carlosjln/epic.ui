( function( epic, window, document, undefined ) {
	var add_event = epic.event.add;
	var trim_spaces = epic.string.trim;
	var epic_button = epic.button;
	var add_class = epic.html.add_class;
	var last_dropdown_toggled;
	var epic_uid = epic.uid;

	var Option = (function() {
		function option( settings ) {
			var t = this;
			var container = t.container = document.createElement( "a" );
			
			container.setAttribute( "href", "#" );

			t.id = settings.id || epic_uid.next();
			t.caption( settings.caption );
			t.onselect = settings.onselect;
		}

		option.prototype = {
			constructor: option,

			disable: function() {
				var self = this;
				var container = self.container;
				
				container.className = "disabled";
				container.setAttribute( "disabled", "true" );

				self.disabled = true;
			},

			enable: function() {
				var self = this;
				var container = self.container;

				container.className = "";
				container.removeAttribute( "disabled" );

				self.disabled = false;
			},

			caption: function( caption ) {
				var t = this;

				if( caption === undefined ) {
					return t.caption;
				}
				
				if( typeof caption === "string" ) {
					t.caption = caption;
					t.container.innerHTML = caption;
				}
				
				return t;
			}
		};

		return option;
	})();

	function on_select( e, context ) {
		e.prevent_default();
		var option = context.option;

		if( option.disabled !== true ) {
			( option.onselect || context.dropdown.onselect ).call( e.target, e, option, context.data );
		}
	}

	function option_collection( dropdown ) {
		var items = [];
		var t = this;

		t.add = function( options ) {
			if( options === undefined ) {
				return;
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

			for( ; i < length; i++ ) {
				opt = options[i];

				li = document.createElement("li");

				if( opt.divide === true ) {
					li.className = 'divider';
				}else {
					option = items[ items.length ] = new Option( opt );
					container = option.container;
					context = {
						dropdown: dropdown,
						option: option,
						data: opt.data
					};

					add_event( container, "click", on_select, context );

					li.insertBefore( container, null );
				}
				
				document_fragment.insertBefore( li, null );
			}
			
			dropdown.list.insertBefore( document_fragment, null );
		};

		t.get = function( index ) {
			return items[ index ];
		};

		t.empty = function () {
			var list = dropdown.list;

            while (list.firstChild) {
                list.removeChild( list.firstChild );
            }
            
			return this;
		};

		t.contains = function( caption ) {
			var length = items.length;
			var i = 0;

			for( ; i < length; i++ ) {
				if( items[i].caption === caption ) {
					return true;
				}
			}

			return false;
		};
	}

	function dropdown( settings ) {
		var self = this;

		var container = self.container = document.createElement( "span" );
		var toggle = self.toggle_button = settings.toggle_button || new epic_button( {
			style: epic_button.style.primary,
			icon: new epic.icon( { name: "caret" } )
		} );
		var toggle_container = toggle.container;
		var list = self.list = document.createElement( "ul" );
		var options = self.options = new option_collection( self );

		// ENSURE THE TOGGLE BUTTON HAS THE ITS IDENTIFYING CLASS
		add_class( toggle_container, "dropdown-toggle" );

		list.className = "dropdown-menu";

		container.id = settings.id || "DD-" + epic_uid.next();
		container.insertBefore( toggle_container, null );
		container.insertBefore( list, null );
		add_class( container, "dropdown " + settings.classes );

		self.onselect = settings.onselect || do_nothing;
		
		add_event( toggle_container, "click", handle_toggle_click, self );

		options.add( settings.options );
	}

	dropdown.prototype = {
		constructor: dropdown,

		divide: function() {
			var divider = document.createElement( "hr" );
			divider.className = "divider unselectable";
			this.options.insertBefore( divider );

			return divider;
		},

		open: function() {
			open_dropdown( this );
		},

		close: function() {
			close_dropdown( this );
		},

		toggle: function() {
			var self = this;

			if( self.is_opened() ) {
				self.close();
			} else {
				self.open();
			}
		},

		is_opened: function() {
			return this.container.className.indexOf( "open" ) > -1;
		}
	};

	// EVENT HANDLERS
	function do_nothing( e ) {
		e.prevent_default();
	}

	function open_dropdown( instance ) {
		close_dropdown( last_dropdown_toggled );

		var container = instance.container;

		if( container.className.indexOf( "open" ) === -1 ) {
			container.className += " open";
		}

		last_dropdown_toggled = instance;
	}

	function close_dropdown( instance ) {
		if( ( instance instanceof dropdown ) === false ) {
			return;
		}

		var container = instance.container;
		container.className = trim_spaces( container.className.replace( /open/, "" ), true );

		last_dropdown_toggled = undefined;
	}

	function handle_toggle_click( e, instance ) {
		e.stop_propagation();
		instance.toggle();
	}

	add_event( document, "click", function( e ) {
		var target = e.target || {};
		var parent = target.parentNode || {};
		
		var target_class_name = target.className;
		var parent_class_name = parent.className;

		var target_is_dropdown = target_class_name && typeof target_class_name === "string" && target_class_name.indexOf( "dropdown" ) > -1;
		var parent_is_dropdown = parent_class_name && typeof parent_class_name === "string" && parent_class_name.indexOf( "dropdown" ) > -1;

		if( target_is_dropdown || parent_is_dropdown ) {
			return;
		}

		close_dropdown( last_dropdown_toggled );
	} );

	epic.dropdown = dropdown;
} )( epic, window, document );