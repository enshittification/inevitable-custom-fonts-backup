var api = require( '../helpers/api' ),
	debug = require( 'debug' )( 'jetpack-fonts' ),
	PreviewStyles = require( '../helpers/preview-styles' ),
	getViewForProvider = require( '../helpers/provider-views' ).getViewForProvider;

// Initialize the default Provider Views
require( '../providers/google' );

function addFontToPreview( font ) {
	var ProviderView = getViewForProvider( font.provider );
	if ( ! ProviderView ) {
		debug( 'live update failed because no provider could be found for', font );
		return;
	}
	ProviderView.addFontToPreview( font );
}

function liveUpdateFontsInPreview( selectedFonts ) {
	debug( 'rendering live update for new styles', selectedFonts );
	selectedFonts.forEach( addFontToPreview );
	PreviewStyles.writeFontStyles( selectedFonts );
}

function init() {
	debug( 'binding live updates for custom-fonts' );
	api( 'jetpack_fonts[selected_fonts]', function( value ) {
		value.bind( function( selectedFonts ) {
			liveUpdateFontsInPreview( selectedFonts );
		} );
	} );
	// The Customizer doesn't give us the initial value,
	// so do it manually on first run
	liveUpdateFontsInPreview( api( 'jetpack_fonts[selected_fonts]').get() );

}

module.exports = {
	liveUpdateFontsInPreview: liveUpdateFontsInPreview
};

api.bind( 'preview-ready', init );
