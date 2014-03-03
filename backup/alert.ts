/// <reference path="epic.ts" />

module epic {

	export class alert {
		public default_options : IAlertSettings = {
			title: null,
			message: "",
			type: "",
			target: null,

			closable: false
		};
		
		settings : IAlertSettings;
		element : HTMLElement;
		inner : HTMLElement;

		constructor( settings : IAlertSettings ) {
			var options = this.settings = <IAlertSettings> epic.tools.merge( this.default_options, settings );
			
			var element = this.element = document.createElement( 'div' );
			var inner = this.inner = document.createElement( 'span' );

			var type = options.type;
			var message = options.message;
			var target = options.target;

			element.insertBefore( inner, null );
			inner.className = 'message';

			if( type ) element.className = "alert alert-" + type;
			if( message ) inner.innerHTML = message;
			if( target ) target.insertBefore( element, null );
		}

		message( message: string ) {
			this.inner.innerHTML = message;
			return this;
		}

		as_success() {
			this.element.className = "alert-success";
			return this;
		}
	
		as_info() {
			this.element.className = "alert-info";
			return this;
		}

		as_warning() {
			this.element.className = "alert-warning";
			return this;
		}

		as_danger() {
			this.element.className = "alert-danger";
			return this;
		}

		at ( target: HTMLElement ){
			target.insertBefore( this.element, null );
			return this;
		}

		show (){
			this.element.style.display = 'block';
			return this;
		}

		hide (){
			this.element.style.display = 'none';
			return this;
		}

		// STATICS
		static TYPE = {
			Success: 'success',
			Info: 'info',
			Warning: 'warning',
			Danger: 'danger'
		};
	}

}