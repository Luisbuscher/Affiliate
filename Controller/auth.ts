import pool from './db2';
import crypto from 'crypto';

interface UserData {
    name: string;
    type: string;
    id: number;
}

export default async function validateUser(email: string, password: string): Promise<UserData | null> {
    try {
        // Obter conexão do pool.
        const connection = await pool.getConnection();

        const query: string = 'SELECT * FROM vash_user WHERE email = ?';
        const [results] = await connection.query(query, [email]);

        // Liberar conexão de volta para o pool.
        connection.release();

        if (results.length === 0) {
            return null;
        }

        const user: any = results[0];

        const md5sum = crypto.createHash('md5');
        md5sum.update(password);
        const hashedPassword: string = md5sum.digest('hex');

        if (hashedPassword !== user.senha) {
            return null;
        }

        if (user.status === 'ativo') {
            let dataUser: UserData = {
                name: user.user_name,
                type: user.type,
                id: user.user_id
            };

            return dataUser;

        } else if (user.status === 'inativo') {
            return null;
        } else {
            return null;
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}