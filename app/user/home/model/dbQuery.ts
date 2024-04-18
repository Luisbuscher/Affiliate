import pool from "@/Controller/db2";

export async function getData(id: any) {
    try {
        // Obter conexão do pool.
        const connection = await pool.getConnection();

        // Consulta para obter o valor da carteira.
        const queryWallet = 'SELECT wallet_value FROM vash_wallet WHERE user = ?';
        const [resultsWallet] = await connection.query(queryWallet, [id]);
        const wallet = resultsWallet[0].wallet_value;

        // Consulta para obter o valor total dos saques.
        const queryWithdraw = 'SELECT SUM(value) AS withdrawValue FROM vash_wallet_transactions WHERE user_id = ?';
        const [resultsWithdraw] = await connection.query(queryWithdraw, [id]);
        const withdrawValue = resultsWithdraw[0].withdrawValue == null ? 0 : resultsWithdraw[0].withdrawValue;

        // Liberar conexão de volta para o pool.
        connection.release();

        // Calcular o rendimento total (valor da carteira + valor total dos saques).
        const totalBalance = parseFloat(wallet) + parseFloat(withdrawValue);

        const response = {
            wallet: wallet,
            withdraw: withdrawValue,
            balance: totalBalance
        }

        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}