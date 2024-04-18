import pool from './db2';
import crypto from 'crypto';

interface UserData {
    name: string;
    type: string;
    id: number;
}

export default async function registerUser(username: string, phone: string, email: string, password: string, repeatPassword: string): Promise<UserData | null> {
    const birthdate: string = '1900-01-01';

    // Verificar se as senhas correspondem.
    if (password !== repeatPassword) {
        return null;
    }

    // Verificar campos obrigatórios.
    if (!username || !phone || !email || !password) {
        return null;
    }

    try {
        // Obter conexão do pool.
        const connection = await pool.getConnection();

        // Verificar se o e-mail já está cadastrado.
        const checkEmailSQL: string = 'SELECT * FROM vash_user WHERE email = ?';
        const [existingUser] = await connection.query(checkEmailSQL, [email]);

        if (existingUser.length > 0) {
            // Liberar conexão de volta para o pool.
            connection.release();
            return null;
        }

        // Gerar hash MD5 da senha usando o módulo 'crypto'.
        const hashedPassword: string = crypto.createHash('md5').update(password).digest('hex');

        // Definir valores padrão.
        const userType: string = 'user';
        const status: string = 'ativo';

        // Inserir usuário na tabela vash_user.
        const insertUserSQL: string = 'INSERT INTO vash_user (user_name, email, type, nome, senha, status, verificationToken, nascimento) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        const userInsertResult: any = await connection.query(insertUserSQL, [username, email, userType, username, hashedPassword, status, '0', birthdate]);
        const userId: number = userInsertResult[0].insertId;

        // Inserir metadados do usuário.
        const insertMetadataSQL: string = `
            INSERT INTO user_metadata (
                user_id, name, lastName, birthDate, rg, cpf, cnpj, gender, nationality, country, address, number,
                complement, cep, neighborhood, city, contact, whatsapp, email, banco, agencia, tipo_de_conta,
                rg_front, rg_verso, self, profile_1, profile_2, profile_3, terms, imagem_direitos, teste_equipamento
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        await connection.query(insertMetadataSQL, [userId, username, 'lastNameValue', birthdate, 'defaultRg', 'defaultCpf', 'defaultCnpj', 'defaultGender', 'defaultNationality', 'defaultCountry', 'defaultAddress', 'defaultNumber', 'defaultComplement', 'defaultCep', 'defaultNeighborhood', 'defaultCity', phone, phone, email, 'defaultBanco', 'defaultAgencia', 'defaultTipoConta', 'defaultRgFront', 'defaultRgVerso', 'defaultSelf', 'defaultProfile1', 'defaultProfile2', 'defaultProfile3', 'defaultTerms', 'defaultImagemDireitos', 'defaultTesteEquipamento']);

        // Inserir carteira para usuário.
        const insertWalletSQL: string = `
            INSERT INTO vash_wallet (user, wallet_value, wallet_meta, status, type, ip, create_date, update_date) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())
        `;
        await connection.query(insertWalletSQL, [userId, 0, 'default', 1, 'brl', '0']);

        // Gerar um código full para o -> vash_affiliate.
        let first: string = Math.random().toString(36).substr(-4).toUpperCase(); // Converte para maiúscula.
        let last: number = Math.floor((Math.random() * (9999 - 1000)) + 1000); // Gera um valor entre 999 e 10000.
        let code_full: string = `${first}-${last}`;

        // Inserir código de afiliado.
        const vash_affiliate: string = `INSERT INTO vash_affiliate (user_id, title, code, date_generated, status) VALUES (?, ?, ?, NOW(), 'ativo')`;
        await connection.query(vash_affiliate, [userId, username, code_full]);

        // Liberar conexão de volta para o pool.
        connection.release();

        // Se tudo ocorrer corretamente, loga automaticamente com os valores.
        let dataUser: UserData = {
            name: username,
            type: "user",
            id: userId
        };

        return dataUser;

    } catch (error) {
        console.error(error);
        throw error;
    }
}