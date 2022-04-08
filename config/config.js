const dotenv = require('dotenv')
dotenv.config();

const env = 'dev';

const config = () => {
    switch (env) {
        case 'dev':
        return {
            bd_string: `mongodb+srv://holisticad:${process.env.passMongo}@holistic-ireland.mnjpf.mongodb.net/Login?retryWrites=true&w=majority`,
            jwt_pass: 'batatafrita2019',
            jwt_expires_in: '7d'
        }

        case 'hml':
        return {    
            bd_string: `mongodb+srv://holisticad:${process.env.passMongo}@holistic-ireland.mnjpf.mongodb.net/Login?retryWrites=true&w=majority`,
            jwt_pass: 'batatafrita2019',
            jwt_expires_in: '7d'
        }

        case 'prod':
        return {
            bd_string: `mongodb+srv://holisticad:${process.env.passMongo}@holistic-ireland.mnjpf.mongodb.net/Login?retryWrites=true&w=majority`,
            jwt_pass: 'jfasdofjiof342342kjki4$@#$@#dsakdfsaf',
            jwt_expires_in: '7d'
        }
    }
}

console.log(`Iniciando a API em ambiente ${env.toUpperCase()}`);

module.exports = config();