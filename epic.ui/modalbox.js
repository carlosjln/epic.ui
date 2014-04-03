( function( epic, window, document ) {

	var collection = {};
	var copy = epic.object.copy;

	function modalbox( settings ) {
		var t = this;
		var overlay_id = settings.id;
		var instance = collection[ overlay_id ];

		if( overlay_id ) {
			if( instance ) {
				instance.cached = true;
				return instance;
			}else {
				collection[ overlay_id ] = t;
			}
		}
		
		copy( modalbox.default_settings, settings, true );
		t.cached = false;

		var close = new epic.button( {
			classes: "epic-box-btn epic-btn-primary btn-hide-overlay",
			icon: new epic.icon( {
				prefix: "icon",
				name: "remove"
			})
		});
		
		var box = t.box = new epic.box( settings.box );

		if( settings.closable === true ) {
			box.controls.insertBefore( close.container, null );
		}

		var overlay = t.overlay = new epic.overlay( {
			content: box.container,
			closable: settings.closable
		});
	}
	
	modalbox.default_settings = {
		box: {
			caption: "Hello!",
			singleview: true,

			width: 600,
			height: 300
		},

		closable: true
	};
	
	modalbox.prototype = {
		constructor: modalbox,

		show: function() {
			this.overlay.show();
		},

		close: function() {
			this.overlay.hide();
		}
	};
	
	epic.modalbox = modalbox;

} )( epic, window, document );