( function( epic, $ ) {

	function tab_panel( settings ) {
		var t = this;

		var id = settings.id || ( "epic-tab-panel-" + epic.uid.next() );
		var container = $( '<div id="' + id + '" class="epic-tab-panel"></div>' );
		var viewport = t.viewport = new epic.viewport();

		t.container = container.append( viewport.container ).get( 0 );
		t.tabs = new tab_list( t );
		
		t.tabs.add( settings.tabs );
	}

	function tab_list( panel ) {
		var t = [];
		var panel_container = panel.container;
		var ul = t.container = document.createElement( "ul" );

		ul.className = "epic-tabs clearfix";
		
		t.constructor = tab_list;

		t.add = function( tabs ) {
			tabs = tabs instanceof Array ? tabs :
				tabs == null ? [] : [tabs];

			var container = t.container;
			var viewport = panel.viewport;

			var length = tabs.length;
			var i = 0;
			var item;

			for( ; i < length; i++ ) {
				item = new tab( t, viewport, tabs[ i ] );
				t[ t.length ] = item;
				container.insertBefore( item.container, null );
			}

			return t;
		};
		
		panel_container.insertBefore( ul, panel_container.firstChild );

		return t;
	}

	
	function tab( tab_list, viewport, settings ) {
		var t = this;
		
		var caption = t.caption = settings.caption;
		var a = t.anchor = $( '<a href="#">' + caption + '</a>' ).click( handle_tab_click, t );

		t.on_activate = settings.on_activate || nothing;
		t.view = viewport.add_view().append( settings.content );
		t.tab_list = tab_list;

		t.container = $( '<li></li>' ).append( a ).get( 0 );
		t.active = false;

		if( settings.active === true ) {
			t.activate();
		}
	}

	tab.prototype.activate = function() {
		var t = this;
		var active_tab = t.tab_list.active;

		// THERE'S NO SENSE ON ACTIVATING WHAT'S ALREADY ACTIVE
		if( t.active ) {
			return;
		}

		// DEACTIVATE PREVIOUS TAB
		if( active_tab ) {
			active_tab.deactivate();
		}

		// SET THE CURRENT TAB AS ACTIVE
		t.tab_list.active = t;
		t.active = true;
		t.container.className = "active";

		t.view.activate();
		t.on_activate( t );
	};

	tab.prototype.deactivate = function() {
		var t = this;
		var active_tab = t.tab_list.active;

		if( active_tab === t ) {
			t.tab_list.active = null;
		}
		
		t.active = false;
		t.container.className = "";
	};

	function handle_tab_click( e, tab ) {
		e.prevent_default();
		tab.activate();
	}

	function nothing() {
		
	}

	epic.tab_panel = tab_panel;

} )( epic, epic.html );