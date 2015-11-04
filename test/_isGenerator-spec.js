/********************************************
 * Created by GUERIN Olivier, on 02/11/2015.*
 * Twitter: @MisterRaton                    *
 ********************************************/

var isGenerator = require( "../" )._isGenerator;
var test = require( "tape" );

test( "_isGenerator function", function( assert ) {
    var actual, expected;

    actual = isGenerator( ( function* test() {} )() );
    expected = true;
    assert.equal( actual, expected, "Generator should return true" );

    actual = isGenerator( function* test() {} );
    expected = false;
    assert.equal( actual, expected, "Generator functions should return false" );

    assert.end();
} );
