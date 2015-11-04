/********************************************
 * Created by GUERIN Olivier, on 02/11/2015.*
 * Twitter: @MisterRaton                    *
 ********************************************/

var isGeneratorFunction = require( "../" ).isGeneratorFunction;
var test = require( "tape" );

test( "isGeneratorFunction function", function( assert ) {
    var actual, expected;

    actual = isGeneratorFunction( ( function* test() {} )() );
    expected = false;
    assert.equal( actual, expected, "Generator should return false" );

    actual = isGeneratorFunction( function* test() {} );
    expected = true;
    assert.equal( actual, expected, "Generator functions should return true" );

    assert.end();
} );
