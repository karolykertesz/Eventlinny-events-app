const Tokens = require('csrf');
export default function handler (req,res){
    const tokens = new Tokens();
    const secret = await tokens.secretSync();
    const token = await tokens.create(secret);
    if (req.method === "GET"){

    }

}