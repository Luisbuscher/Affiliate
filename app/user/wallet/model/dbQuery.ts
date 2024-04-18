import pool from "@/Controller/db2";

export async function getData(id: any) {
    try {
        // Obter conexão do pool.
        const connection = await pool.getConnection();

        // Consulta para obter o valor da carteira.
        const queryWallet = 'SELECT wallet_value FROM vash_wallet WHERE user = ?';
        const [resultsWallet] = await connection.query(queryWallet, [id]);
        const wallet = resultsWallet[0].wallet_value;

        // Liberar conexão de volta para o pool.
        connection.release();

        const response = {
            wallet: wallet
        };

        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}