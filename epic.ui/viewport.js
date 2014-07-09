( function( epic, window, document ) {
	var epic_html = epic.html;
	var object_copy = epic.object.copy;

	function create( tag, classname, style, content ) {
		var element = document.createElement( tag );
		
		element.className = classname || "";
		element.style.cssText = style || "";
		element.innerHTML = content || "";
		
		return element;
	}

	function nothing( ) {
		
	}

	// VIEWPORT
	function viewport( settings ) {
		var self = this;

		self.views = [];
		self.container = create( "div", "epic-viewport" );

		object_copy( settings, self, true );
	}

	viewport.prototype.add_view = function() {
		var self = this;
		var views = self.views;
		var v = new view( {viewport: self} );

		self.container.insertBefore( v.container, null );

		views[ views.length ] = v;

		return v;
	};


	// VIEW 
	function view( settings ) {
		var container = create("div", "epic-view", "");
		var loader = create("span", "epic-view-status", "", "Working..."); 
		var self = this;
		
		self.container = container;
		self.loader = loader;
		self.viewport = settings.viewport;

		container.insertBefore( loader, null );
	}

	view.prototype = {
		is_busy: function( state ) {
			var self = this;
			var loader = self.loader;

			loader.style.display = 'none';
			loader.innerHTML = 'Working out...';

			if( state ) {
				loader.style.display = '';

				if( typeof state === "string" ) {
					loader.innerHTML = state;
				}
			}

			return  self;
		},

		activate: function() {
			var self = this;

			var vp = self.viewport;
			var current_view = vp.current_view;

			if( current_view ) {
				current_view.container.style.display = "none";
			}

			self.container.style.display = 'block';
			vp.current_view = self;

			(self.on_activate || vp.on_activate || nothing).call( vp, self );

			return self;
		},

		empty: function() {
			var self = this.is_busy( false );
			var container = self.container;

			// REMOVE ALL CHILDS
			while( container.firstChild ) {
				container.removeChild( container.firstChild );
			}

			// APPEND LOADER
			container.appendChild( self.loader );

			return self;
		},

		append: function( /*elements*/ ) {
			var self = this;

			epic_html( self.container ).insert( arguments );

			return self;
		}
	};

	epic.viewport = viewport;
	epic.view = view;
} )( epic, window, document );