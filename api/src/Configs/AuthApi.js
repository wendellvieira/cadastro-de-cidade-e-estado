const bcrypt = require('bcrypt')

// const apiKeys = require('./ApiKeys.js')
// console.log(apiKeys)

module.exports =  function( req, res, next ) {

	const reject = () => res.status(401).json("Acesso não autorizado!")

	const xApiKey = req.headers["x-api-key"]

	if( !xApiKey ) reject()

	bcrypt.compare( process.env.API_SECRET, xApiKey, (err, status) => {

		if( err || !status ) reject()

		next()

	})

}