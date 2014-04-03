( function( epic ) {
	var $ = epic.html;
	var add_event = epic.event.add;

	function create( tag, classname, style, content ) {
		var element = document.createElement( tag );
		
		element.className = classname || "";
		element.style.cssText = style || "";
		element.innerHTML = content || "";
		
		return element;
	}

	function overlay( settings ) {
		var container = $( create("div", "overlay-container" ) );
		var dark_side = $( create("div", "overlay" ) );
		var content = $( settings.content ).add_class( "overlay-content" );

		var btn_hide = content.find( ".btn-hide-overlay" );
		var btn_remove = container.find( ".btn-remove-overlay" );

		var handle = overlay.events;
		var self = this;

		container.append( dark_side, content );

		self.closable = settings.closable;

		self.container = container.get( 0 );
		self.overlay = dark_side.get( 0 );
		self.content = content.get( 0 );

		btn_hide.click( handle.on_hide, self );
		btn_remove.click( handle.on_hide, self );
		dark_side.click( handle.on_hide, self );
		
		add_event( self.container, "keyup", handle.on_escape, self );
		
		$( settings.target || "body" ).append( container );

		var margin_top = content.height() / 2;
		var margin_left = content.width() / 2;

		content.css( "margin: -" + margin_top + "px 0 0 -" + margin_left + "px" );
	}

	var prototype = overlay.prototype;

	prototype.hide = function() {
		this.container.style.display = 'none';
		return this;
	};

	prototype.show = function() {
		this.container.style.display = 'block';
		return this;
	};

	overlay.events = {
		on_hide: function( e, oley ) {
			e.prevent_default();
			if( oley.closable === true ) {
				oley.hide();
			}
		},

		on_escape: function( e, oley ) {
			e.prevent_default();
			if( e.which === 27 && oley.closable === true ) {
				oley.hide();
			}
		}
	};

	epic.overlay = overlay;

} )( epic );