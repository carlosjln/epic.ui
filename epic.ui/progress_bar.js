( function( epic, undefined ) {
	var epic_html = epic.html;

	function is_number( n ) {
		return !isNaN( parseFloat( n ) ) && isFinite( n );
	}

	function constructor() {
		var html = 
        '<div class="progress-bar">' +
            '<div class="bar"></div>' +
			'<span class="message"></span>' +
			'<label class="percent">0%</label>' +
        '</div>';

		var container = epic_html( html );
		var t = this;

		t.container = container.get( 0 );
		t.bar = container.find( ".bar" ).get( 0 );
		t.message = container.find( ".message" ).get( 0 );
		t.percent = container.find( ".percent" ).get( 0 );
	}

	constructor.prototype = {
		constructor: constructor,

		set_progress: function( value ) {
			if( is_number( value ) && value > -1 && value < 101 ) {
				var percent = value + '%';
				var t = this;

				t.bar.style.width = percent;
				t.percent.innerHTML = percent;
			}
		},

		set_message: function( message ) {
			this.message.innerHTML = message;
		},

		show: function() {
			this.container.style.display = "";
		},

		hide: function() {
			this.container.style.display = "none";
		}
	};

	epic.progress_bar = constructor;
} )( epic );