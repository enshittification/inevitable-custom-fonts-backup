var expect = require( 'chai' ).expect,
	mockery = require( 'mockery' ),
	Backbone = require( 'backbone' );

var helpers = require( './test-helper' );

var currentFontData = [
  {
    'type': 'body-text',
    'cssName': 'Lobster Two',
    'displayName': 'Lobster Two',
    'id': 'Lobster+Two',
    'fvds': [ 'i8' ],
    'currentFvd': 'i8',
    'subsets': [
      'latin'
    ],
    'provider': 'google'
  },
  {
    'type': 'headings',
    'cssName': 'Cinzel',
    'displayName': 'Cinzel',
    'id': 'Cinzel',
    'size': 5,
    'fvds': [ 'n4', 'n7', 'n9' ],
    'subsets': [
      'latin'
    ],
    'provider': 'google'
  }
];

var annotations = [
	{
		type: 'body-text',
		rules: [
			{ 'property': 'font-size', 'value': '16px' },
			{ 'property': 'font-family', 'value': 'Lato, sans-serif' }
		],
		selector: 'body, button, input, select, textarea'
	},
	{
		type: 'headings',
		rules: [
			{ 'property': 'font-size', 'value': '33px' },
			{ 'property': 'font-family', 'value': 'inherit' }
		],
		selector: '.entry-title'
	},
	{
		type: 'headings',
		rules: [
			{ 'property': 'font-size', 'value': '18px' },
			{ 'property': 'font-family', 'value': 'Lato, sans-serif' }
		],
		selector: '.site-title'
	},
];

var PreviewStyles;

describe( 'PreviewStyles', function() {
	before( function() {
		helpers.before();
		mockery.registerMock( '../helpers/annotations', annotations );
		PreviewStyles = require( '../../js/helpers/preview-styles' );
	} );

	after( helpers.after );

	afterEach( function() {
		Backbone.$( '#jetpack-custom-fonts-css' ).remove();
	} );

	describe( '.getFontStyleElement()', function() {
		it( 'returns the correct DOM element if one exists', function() {
			Backbone.$( 'head' ).append( '<style id="jetpack-custom-fonts-css">.site-title{ font-weight: 400; }</style>' );
			expect( PreviewStyles.getFontStyleElement().id ).to.equal( 'jetpack-custom-fonts-css' );
			Backbone.$( '#jetpack-custom-fonts-css' ).remove();
		} );

		it( 'returns falsy if no matching style element exists', function() {
			Backbone.$( '#jetpack-custom-fonts-css' ).remove();
			expect( PreviewStyles.getFontStyleElement() ).to.not.be.ok;
		} );
	} );

	describe( '.generateCssFromStyles()', function() {
		it( 'returns the correct css font-family for a css object', function() {
			expect( PreviewStyles.generateCssFromStyles( [ currentFontData[ 0 ] ] ) ).to.match( /font-family:\s?"Lobster Two"/ );
		} );

		it( 'returns the correct fallback css font-family for a css object', function() {
			expect( PreviewStyles.generateCssFromStyles( [ currentFontData[ 1 ] ] ) ).to.match( /.site-title\s?{.*?font-family:\s?[^,]+,\s?Lato, sans-serif/ );
		} );

		it( 'returns the correct css font-weight for a css object', function() {
			expect( PreviewStyles.generateCssFromStyles( [ currentFontData[ 0 ] ] ) ).to.match( /font-weight:\s?800/ );
		} );

		it( 'returns the correct css font-style for a css object', function() {
			expect( PreviewStyles.generateCssFromStyles( [ currentFontData[ 0 ] ] ) ).to.match( /font-style:\s?italic/ );
			expect( PreviewStyles.generateCssFromStyles( [ currentFontData[ 1 ] ] ) ).to.match( /font-style:\s?normal/ );
		} );

		it( 'returns the correct css font-sizes for a css object', function() {
			expect( PreviewStyles.generateCssFromStyles( [ currentFontData[ 1 ] ] ) ).to.match( /.entry-title\s?{.+?font-size:\s?42.9px/ );
			expect( PreviewStyles.generateCssFromStyles( [ currentFontData[ 1 ] ] ) ).to.match( /.site-title\s?{.+?font-size:\s?23.4px/ );
		} );

		it ( 'returns the default css font-weight for a style that lists multiple fvds', function() {
			expect( PreviewStyles.generateCssFromStyles( [ currentFontData[ 1 ] ] ) ).to.match( /font-weight:\s?400/ );
		} );

		it ( 'returns the default css font-weight for a style with no currentFvd property', function() {
			expect( PreviewStyles.generateCssFromStyles( [ currentFontData[ 1 ] ] ) ).to.match( /font-weight:\s?400/ );
		} );

		it ( 'returns no css font-size for a style that lists no size', function() {
			expect( PreviewStyles.generateCssFromStyles( [ currentFontData[ 0 ] ] ) ).to.not.match( /font-size/ );
		} );

		it( 'returns selectors for each annotation', function() {
			expect( PreviewStyles.generateCssFromStyles( currentFontData ) ).to.match( /\.site-title/ );
			expect( PreviewStyles.generateCssFromStyles( currentFontData ) ).to.match( /\.entry-title/ );
		} );

		it( 'does not return inherit in a font stack', function(){
			expect( PreviewStyles.generateCssFromStyles( currentFontData ) ).to.not.match( /, ?inherit/ );
		});
	} );

	describe( '.createStyleElementWith()', function() {
		it( 'returns a DOM element with the correct ID', function() {
			var out = PreviewStyles.createStyleElementWith( '.site-title{font-weight: 400;}' );
			expect( out[ 0 ].id ).to.equal( 'jetpack-custom-fonts-css' );
		} );
	} );

	describe( '.addStyleElementToPage()', function() {
		it( 'appends the element to the DOM', function() {
			var element = Backbone.$( '<style id="something"></style>' );
			PreviewStyles.addStyleElementToPage( element );
			expect( Backbone.$( '#something' ) ).to.have.length.above( 0 );
		} );
	} );

	describe( '.removeFontStyleElement()', function() {
		it( 'removes the existing style element from the DOM', function() {
			Backbone.$( 'head' ).append( '<style id="jetpack-custom-fonts-css">.site-title{ font-weight: 400; }</style>' );
			PreviewStyles.removeFontStyleElement();
			expect( Backbone.$( '#jetpack-custom-fonts-css' ) ).to.have.length( 0 );
		} );

		it( 'does not fail if there is no existing style element', function() {
			Backbone.$( '#jetpack-custom-fonts-css' ).remove();
			PreviewStyles.removeFontStyleElement();
			expect( Backbone.$( '#jetpack-custom-fonts-css' ) ).to.have.length( 0 );
		} );
	} );

	describe( '.writeFontStyles()', function() {
		it( 'removes the existing style element from the DOM', function() {
			Backbone.$( 'head' ).append( '<style id="jetpack-custom-fonts-css">.site-title{ font-weight: 400; }</style>' );
			PreviewStyles.writeFontStyles( currentFontData );
			expect( Backbone.$( '#jetpack-custom-fonts-css' ) ).to.have.length( 1 );
		} );

		it( 'adds a style element to the DOM', function() {
			PreviewStyles.writeFontStyles( currentFontData );
			expect( Backbone.$( '#jetpack-custom-fonts-css' ) ).to.have.length( 1 );
		} );

		it( 'adds the correct css styles to the page', function() {
			PreviewStyles.writeFontStyles( currentFontData );
			var element = Backbone.$( '#jetpack-custom-fonts-css' );
			expect( element.text() ).to.match( /.site-title\s?{.+?font-style:\s?normal/ );
			expect( element.text() ).to.match( /.site-title\s?{.+?font-weight:\s?400/ );
			expect( element.text() ).to.match( /body.+?font-family:\s?"Lobster Two"/ );
			expect( element.text() ).to.match( /.entry-title\s?{.+?font-size:\s?42.9px/ );
			expect( element.text() ).to.match( /.site-title\s?{.+?font-size:\s?23.4px/ );
		} );
	} );

} );
