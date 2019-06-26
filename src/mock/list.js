export default function ({mock}) {
    mock( '/api/findList', 'get', function( options ) {
        console.log('options', options)
    })
}