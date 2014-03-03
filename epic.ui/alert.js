﻿( function( epic ) {

	function alert( settings ) {
		var self = this;
		settings = self.settings = epic.object.merge( alert.default_settings, settings );

		var element = self.container = document.createElement( 'div' );
		var inner = self.message = document.createElement( 'span' );

		var type = settings.type;
		var message = settings.message;
		var target = settings.target;

		element.insertBefore( inner, null );
		inner.className = 'message';
		
		element.className = "alert alert-" + (type ? type : "default");
		
		if( message ) {
			inner.innerHTML = message;
		}
		
		if( target ){
			target.insertBefore( element, null );
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
		
		closable: false
	};
	
	epic.alert = alert;

} )( epic );