
module epic {
	
	export class overlay {
		default_options: IOverlaySettings = {
			content: "",
			target: <HTMLElement><any> window.document.body,

			closable: false
		};

		container: HTMLElement;
		overlay: HTMLElement;
		content: HTMLElement;

		settings: IOverlaySettings;

		constructor( settings: IOverlaySettings ){
			var document = window.document;
			var options = this.settings = <IOverlaySettings> tools.merge( this.default_options, settings );
			var initial_content = options.content;

			var container = this.container = document.createElement( 'div' );
			var overlay = this.overlay = document.createElement( 'div' );
			var content = this.content = document.createElement( 'div' );

			var container_style = "display: none; position: absolute; top: 0; right: 0; bottom: 0; left: 0; z-index: 40001;";
			var overlay_style = 'width: 100%; height: 100%; position: absolute; top: 0; right: 0; bottom: 0; left: 0; z-index: 40001; background-color: #000; opacity: 0.5; -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=50)"; filter: alpha(opacity=50); z-index: 40001';
			var content_style = 'position: absolute; top: 50%; left: 50%; z-index: 40002;';

			container.style.cssText = container_style;
			container.className = "mobox";

			overlay.style.cssText = overlay_style;
			overlay.className = "mobox-overlay";

			content.style.cssText = content_style;
			content.className = 'mobox-content';

			// inserting initial content
			if( typeof initial_content === "string" ){
				content.innerHTML = initial_content;
			} else if( typeof initial_content === "object" ){
				content.insertBefore( initial_content, null );
			}

			container.insertBefore( overlay, null );
			container.insertBefore( content, null );

			options.target.insertBefore( container, null );
		}

		show(){
			this.container.style.display = "block";
			this.center();
		}

		hide(){
			this.container.style.display = "none";
		}

		center(){
	        var content = this.content;
	            
            var margin_top = -(content.offsetHeight / 2);
            var margin_left = -(content.offsetWidth / 2);
            var content_margin = margin_top + "px 0 0 " + margin_left + "px";
	        
            content.style.margin = content_margin;
		}
	}

}