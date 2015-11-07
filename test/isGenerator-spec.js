/********************************************
 * Created by GUERIN Olivier, on 02/11/2015.*
 * Twitter: @MisterRaton                    *
 ********************************************/

var isGenerator = require( "../" );
var _isGenerator = require( "../" )._isGenerator;
var isGeneratorFunction = require( "../" ).isGeneratorFunction;
var test = require( "tape" );

test( "isGenerator function", function( assert ) {
    var actual, expected;

    actual = isGenerator( ( function* test() {} )() );
    expected = true;
    assert.equal( actual, expected, "Generator should return true" );

    actual = isGenerator( function* test() {} );
    expected = false;
    assert.equal( actual, expected, "Generator functions should return false" );

    assert.end();
} );

test( "_isGenerator function", function( assert ) {
    var actual, expected;

    actual = _isGenerator( ( function* test() {} )() );
    expected = true;
    assert.equal( actual, expected, "Generator should return true" );

    actual = _isGenerator( function* test() {} );
    expected = false;
    assert.equal( actual, expected, "Generator functions should return false" );

    assert.end();
} );

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
