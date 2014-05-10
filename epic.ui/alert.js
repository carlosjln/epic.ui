( function( epic ) {
	var copy = epic.object.copy;
	var add_event = epic.event.add;

	function alert( settings ) {
		settings = copy( alert.default_settings, settings, true );

		var t = this;

		var type = settings.type;
		var initial_message = settings.message;
		var target = settings.target;

		var container = t.container = document.createElement( 'div' );
		var message = t.message = document.createElement( 'span' );	
		var dismiss_button = document.createElement( 'a' );

		container.className = "alert alert-" + (type ? type : "default");
		container.insertBefore( message, null );
		
		message.className = 'message';
		
		dismiss_button.innerHTML = "x";
		dismiss_button.className = "alert-dismiss";
		dismiss_button.setAttribute( "href", "#");
		add_event( dismiss_button, "click", alert.event.dismiss, {
			alert: t,
			on_dismiss: settings.on_dismiss || function() {}
		} );

		if( initial_message ) {
			message.innerHTML = initial_message;
		}
		
		if( target ){
			target.insertBefore( container, null );
		}

		if( !settings.visible ) {
			this.hide();
		}

		if( settings.closable ) {
			container.insertBefore( dismiss_button, null  );
		}
	}

	alert.prototype = {
		show: function (){
			this.container.style.display = 'block';
			return this;
		},

		hide: function (){
			this.container.style.display = 'none';
			return this;
		},

		set_message: function( message ) {
			this.message.innerHTML = message;
			return this;
		},
		
		as_success: function() {
			return this.set_type( alert.type.success );
		},
		
		as_info: function() {
			return this.set_type( alert.type.info );
		},
		
		as_warning: function() {
			return this.set_type( alert.type.warning );
		},
		
		as_danger: function() {
			return this.set_type( alert.type.danger );
		},
		
		set_type: function ( type ) {
			var t = this;
			t.container.className = "alert alert-" + type;
			return t;
		}
	};

	alert.type = {
		'default': 'default',
		success: 'success',
		info: 'info',
		warning: 'warning',
		danger: 'danger'
	};
	
	alert.default_settings = {
		type: alert.type.default,
		message: "",
		target: null,
		
		visible: true,
		closable: false
	};
	
	alert.event = {
		dismiss: function( e, data ) {
			data.on_dismiss.call( data.alert.hide() );
		}
	};

	epic.alert = alert;

} )( epic );