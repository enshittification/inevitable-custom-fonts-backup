<?php

class Jetpack_Fonts_Css_Generator {

	const CSS_FONT_SIZE_VALUE_RX = '/((\d*\.(\d+))|(\d+))([A-Za-z]{2,3}|%)/';

	/**
	 * Holds allowed font category types. @see `jetpack_fonts_rule_types` action
	 * @var array
	 */
	private $rule_types = array();

	/**
	 * Holds font rules added for a theme.
	 * @var array
	 */
	private $rules = array();

	/**
	 * Holds font pairs added.
	 * @var array
	 */
	private $pairs = array();

	/**
	 * Holds the separator to use when printing font CSS.
	 * @var string
	 */
	private $sep = '';

	/**
	 * Constructor
	 */
	public function __construct(){
		require_once( __DIR__ . '/lib/Fvd.php' );

		$default_types = array(
			array(
				'id'        => 'body-text',
				'name'      => __( 'Body Text' ),
				'bodyText'  => true,
				'fvdAdjust' => false,
				'sizeRange' => 3
			),
			array(
				'id'        => 'headings',
				'name'      => __( 'Headings' ),
				'bodyText'  => false,
				'fvdAdjust' => true,
				'sizeRange' => 10
			)
		);
		$this->rule_types = apply_filters( 'jetpack_fonts_rule_types', $default_types );

		foreach( $this->rule_types as $type ) {
			$this->rules[ $type['id'] ] = array();
		}

		add_action( 'jetpack_fonts_pairs', array( $this, 'default_pairs' ), 9 );

		if ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) {
			$this->sep = "\n";
		}
	}

	/**
	 * Main public method for adding font rules for a theme.
	 *
	 * Each theme can add multilple rules on the `jetpack_fonts_rules` action
	 * @param array $rule Rule array.
	 */
	public function add_rule( $rule ) {
		$this->validate_rule( $rule );
		$type = $rule['type'];
		unset( $rule['type'] );
		$rule = array_merge( array( 'media_query' => '' ), $rule );
		$this->rules[ $type ][] = $rule;
	}

	/**
	 * Whether or not there are rules currently set
	 * @return bool
	 */
	public function has_rules() {
		foreach( $this->rules as $rule_type => $rules ) {
			if ( ! empty( $rules ) ) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Get the current theme's font rules.
	 * @return array
	 */
	public function get_rules() {
		// If we already have rules, bail and return 'em
		if ( $this->has_rules() ) {
			return $this->rules;
		}

		// Load from a theme's annotation file
		$location = get_stylesheet_directory() . '/inc/jetpack-fonts.php';
		$location = apply_filters( 'jetpack_fonts_annotations_src', $location );
		if ( file_exists( $location ) ) {
			include_once $location;
		} else if ( is_child_theme() ) {
			$location = get_template_directory() . '/inc/jetpack-fonts.php';
			if ( file_exists( $location ) ) {
				include_once $location;
			}
		}

		// annotation files hook into this to add rules
		do_action( 'jetpack_fonts_rules', $this );
		return $this->rules;
	}

	/**
	 * Ensures that every font rule contains what is required for a font rule. Throws Exception if not.
	 * @param  array $rule Font rule.
	 * @return void
	 */
	private function validate_rule( $rule ) {
		foreach( array( 'type', 'selector', 'rules') as $key ) {
			if ( ! isset( $rule[ $key ] ) ) {
				throw new Exception( 'You must supply a \'' . $key . '\' attribute on your rule.' );
			}
		}
		if ( ! in_array( $rule['type'], $this->get_allowed_types() ) ) {
			throw new Exception( 'Your type of '. $rule['type'] . 'is not allowed. Use one of ' . implode( ',', $this->get_allowed_types() ) . '.' );
		}
		if ( ! is_array( $rule['rules'] ) || empty( $rule['rules'] ) ) {
			throw new Exception( 'You must supply at least one array in the $rule[\'rules\'] array.' );
		}
	}

	public function get_rule_types() {
		return $this->rule_types;
	}

	public function get_allowed_types() {
		return wp_list_pluck( $this->rule_types, 'id' );
	}

	public function get_pairs() {
		if ( ! did_action( 'jetpack_fonts_pairs' ) ) {
			do_action( 'jetpack_fonts_pairs', $this );
		}
		return $this->pairs;
	}

	public function add_pair( $pair ) {
		if ( $pair = $this->validate_pair( $pair ) ) {
			$this->pairs[] = $pair;
		}
	}

	public function default_pairs() {
		include dirname( __FILE__ ) . '/default-font-pairs.php';
	}

	protected function validate_pair( $pair ) {
		return array_map( array( $this, 'validate_pair_font' ), $pair );
	}

	protected function validate_pair_font( $font ) {
		foreach( array( 'type', 'provider', 'id') as $key ) {
			if ( ! isset( $font[ $key ] ) ) {
				throw new Exception( 'You must supply a \'' . $key . '\' attribute on your font.' );
			}
		}
		if ( ! in_array( $font['type'], $this->get_allowed_types() ) ) {
			throw new Exception( 'Your type of '. $font['type'] . 'is not allowed. Use one of ' . implode( ',', $this->get_allowed_types() ) . '.' );
		}

		if ( ! isset( $font['fvds'] ) || ! is_array( $font['fvds'] ) ) {
			switch( $font['type'] ) {
				case 'body-text' :
					$font['fvds'] = array( 'n4', 'i4', 'n7', 'i7' );
					break;
				case 'headings' :
					if ( isset( $font['fvds'] ) && is_string( $font['fvds'] ) ) {
						$font['fvds'] = (array) $font['fvds'];
					} else {
						$font['currentFvd'] = 'n4';
						$font['fvds'] = array( 'n4' );
					}
			}
		}
		return $font;
	}

	/**
	 * Returns Font CSS for current set of selected fonts and rules.
	 * @param  array $fonts list of selected fonts
	 * @return string       CSS for selected fonts
	 */
	public function get_css( $fonts ) {
		$css = $this->sep;
		$supplied_types =  wp_list_pluck( $fonts, 'type' );
		$rule_types = $this->get_rule_types();
		foreach ( $this->get_rules() as $type => $rules ) {
			if ( empty( $rules ) || ! in_array( $type, $supplied_types) ) {
				continue;
			}
			$font = $this->list_entry_item_by( $fonts, array( 'type' => $type ) );
			$rule_type = $this->list_entry_item_by( $this->get_rule_types(), array( 'id' => $type ) );
			$css .= $this->do_rules( $font, $rules, $rule_type );
		}
		return $css;
	}

	/**
	 * Like wp_list_filter, except the first matching item is returned.
	 * @param  array $list     An array of objects to filter
	 * @param array $args An array of key => value arguments to match against each object
	 * @param string $operator The logical operation to perform:
	 *    'AND' means all elements from the array must match;
	 *    'OR' means only one element needs to match;
	 *    'NOT' means no elements may match.
	 *   The default is 'AND'.
	 * @return mixed The first found object is successful, false if not.
	 */
	private function list_entry_item_by( $list, $args, $operator = 'AND' ) {
		$result = wp_list_filter( $list, $args );
		if ( ! empty( $result ) ) {
			return array_shift( $result );
		}
		return false;
	}

	/**
	 * Return CSS for a specific type of font rules.
	 * @param  array $font      Specified font for this set of rules
	 * @param  array $rules     Declared rules for this font rule
	 * @param  array $rule_type This set of $rules's type info
	 * @return string           CSS for this font + rules
	 */
	private function do_rules( $font, $rules, $rule_type ) {
		$css_rules = array();
		foreach ( $rules as $rule ) {
			$css = $this->css_open( $rule );
			$css .= $this->css_rules( $rule['rules'], $font, $rule_type );
			$css .= $this->css_close( $rule );
			array_push( $css_rules, $css );
		}
		return implode( $this->sep, $css_rules );
	}

	/**
	 * Return CSS property and value pairs for a set of rules and a font.
	 * @param  array $rules CSS property and value rules
	 * @param  array $font  A font for this font type
	 * @return string       CSS (property: value)s
	 */
	private function css_rules( $rules, $font, $type ) {
		$css_rules = array();
		$declaration_sep = ';' . $this->sep;
		$rule_sep = $this->sep ? ': ' : ':';
		$indent = $this->sep ? "\t" : '';
		$rules = $this->shim_rules_for_type( $rules, $type );
		foreach( $rules as $rule ) {
			switch( $rule['property'] ) {
				case 'font-family':
					$value = $this->maybe_font_stack( $font['cssName'], $rule['value'] );
					break;
				case 'font-weight':
					$value = $this->pick_weight( $font );
					break;
				case 'font-size':
					$value = $this->maybe_scale_font( $rule['value'], $font );
					break;
				case 'font-style':
					$value = $this->pick_style( $font );
					break;
				default:
					$value = false;
			}
			if ( $value ) {
				$css_rules[] = $indent . $rule['property'] . $rule_sep . $value;
			}
		}
		return implode( $declaration_sep, $css_rules );
	}

	private function maybe_font_stack( $font_name, $original ) {
		if ( $original === 'inherit' ) {
			return $font_name;
		}
		return $font_name . ',' . $original;
	}

	private function shim_rules_for_type( $rules, $type ) {
		$needs_style = ! $this->list_entry_item_by( $rules, array( 'property' => 'font-style' ) );
		$needs_weight = ! $this->list_entry_item_by( $rules, array( 'property' => 'font-weight' ) );
		if ( $needs_style ) {
			array_push( $rules, array( 'property' => 'font-style', 'value' => 'normal' ) );
		}
		if ( $needs_weight ) {
			array_push( $rules, array( 'property' => 'font-weight', 'value' => 'normal' ) );
		}
		return $rules;
	}

	private function maybe_scale_font( $value, $font ) {
		if ( ! isset( $font['size'] ) || ! $font['size'] ) {
			return false;
		}
		$matches = array();
		if ( ! preg_match( self::CSS_FONT_SIZE_VALUE_RX, $value, $matches ) ) {
			return false;
		}
		$scale = (int) $font['size'] * 0.06 + 1;
		$units = $matches[5];
		if ( ! empty( $matches[4] ) ) {
			// Integer size
			$new_value = intval( $matches[4] );
			$precision = ( $new_value > 9 ) ? 1 : 3;
		} else {
			// Floating point value
			$new_value = floatval( $matches[2] );
			$precision = strlen( $matches[3] ) + 1;
		}
		$new_value = round( $new_value * $scale, $precision );
		return (string) $new_value . $units;
	}

	private function pick_weight( $font ) {
		if ( !empty( $font['currentFvd'] ) ) {
			return $this->get_weight_from_fvd( $font['currentFvd'] );
		}
		$weights = array_map( array( $this, 'get_weight_from_fvd' ), $font['fvds'] );
		asort( $weights );
		return array_shift( $weights );
	}


	private function get_weight_from_fvd( $fvd ) {
		try {
			$parsed = kevintweber\KtwFvd\Fvd::Parse( $fvd );
			if ( $parsed && $parsed[ 'font-weight' ] ) {
				return $parsed[ 'font-weight' ];
			}
		} catch( Exception $e ) {
			// fall back to the default
		}
		return '400';
	}

	private function pick_style( $font ) {
		if ( !empty( $font['currentFvd'] ) ) {
			return $this->get_style_from_fvd( $font['currentFvd'] );
		}
		return 'normal';
	}

	private function get_style_from_fvd( $fvd ) {
		try {
			$parsed = kevintweber\KtwFvd\Fvd::Parse( $fvd );
			if ( $parsed && $parsed[ 'font-style' ] ) {
				return $parsed[ 'font-style' ];
			}
		} catch( Exception $e ) {
			// fall back to the default
		}
		return 'normal';
	}


	/**
	 * Open a CSS selector.
	 * @param  array $rule CSS rule
	 * @return string      Opening of a CSS selector
	 */
	private function css_open( $rule ) {
		$ret = '';
		if ( $rule['media_query'] ) {
			$ret .= '@media ' . $rule['media_query'] . '{' . $this->sep;
		}
		$ret .= $rule['selector'] . '{' . $this->sep;
		return $ret;
	}

	/**
	 * Close a CSS selector.
	 * @param  array $rule CSS rule
	 * @return string      Closing of a CSS selector
	 */
	private function css_close( $rule ) {
		$ret = $this->sep;
		if ( $rule['media_query'] ) {
			$ret .= '}' . $this->sep;
		}
		$ret .= '}' . $this->sep;
		return $ret;
	}

}
