$(function(){
    $('input').on('keydown', function(e) {
        if ((e.which && e.which === 13) || (e.keyCode && e.keyCode === 13)) {
            // enterキーを無効にする
            // onClickEncoding();
            return false;
        }
        return true;
    });

    $('button').on({
        'click': ( e ) => {
            if ( e.toElement.id === '' ) { return; }
            
            const dispatchers = {
                'buttonDoShuffles': () => { onClickEncoding() },
            }

            dispatchers[e.toElement.id]();
        },
    });
});


function onClickEncoding() {
    // tensou
    const clearText = $('#clearText').val();

    const keys = generateKey( clearText );

    const cryptedText = encodeText( clearText, keys );


    // 結果を入れる
    $('#decodedText').val( cryptedText + '\n' + JSON.stringify(keys, replacer).replace(/[,"]/ig, '') );
}


// キーを生成する
function generateKey( clearText ) {
    const MAX_LENGTH = 90;

    let tmp = clearText.split('');
    let result = [];

    if ( tmp.length === 0 || tmp.length > MAX_LENGTH ) { return []; }

    while ( tmp.length > 0 ) {
        const MAX_INDEX = tmp.length - 1;

        let newIndex = Math.floor( Math.random() * (MAX_INDEX + 1) );

        if ( newIndex > MAX_INDEX || newIndex < 0 ) { return []; }

        result.push( newIndex );
        tmp.splice( newIndex, 1);
    }

    return result;
}


// シャッフルする
function encodeText( clearText, keys ) {
    
    let tmp = clearText.split('');
    let result = [];

    if ( tmp.length === 0 ) { return ''; }

    for (let index = 0; index < keys.length; index++) {
        const MAX_INDEX = tmp.length - 1;
        const newIndex = keys[index];
        
        if ( newIndex > MAX_INDEX || newIndex < 0 ) { return ''; }

        result.push( tmp[newIndex] );
        tmp.splice( newIndex, 1);
    }
    
    return result.join('');
}


function replacer(key, value) {
    if ( typeof value === 'number' ) {
        return ( '00' + value.toString(16) ).slice(-2);
    }
    return value;
}
