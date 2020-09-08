
const bcrypt = require('bcrypt')

const apiKeys = new Map()
    
for(let id=0; id<=10; id++){   
    
    bcrypt.hash( process.env.API_SECRET, 10, function(err, hash) {
        if(err) throw new Error("Erro ao gerar token")

        apiKeys.set(hash, { id })

    })
  
    
}

module.exports = apiKeys