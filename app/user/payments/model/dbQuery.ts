import pool from "@/Controller/db2";

export async function getData(id: any) {
    try {
        // Obter conexão do pool.
        const connection = await pool.getConnection();

        // CONSULTA para obter os codigos de afiliacao.
        const queryCodes = 'SELECT value, date, status, comprovante FROM vash_wallet_transactions WHERE user_id = 62;';
        const [results] = await connection.query(queryCodes, [id]);

        // Liberar conexão de volta para o pool.
        connection.release();

        return results;
    } catch (error) {
        console.error(error);
        throw error;
    }
}