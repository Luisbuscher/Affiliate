import pool from "@/Controller/db2";

export async function getData(id: any) {
    try {
        // Obter conexão do pool.
        const connection = await pool.getConnection();

        // Consulta para obter os IDs dos afiliados relacionados ao usuário com wallet_value e soma dos valores de saque.
        const queryData = 'SELECT a.user_id, w.wallet_value, COALESCE(d.total_withdrawal, 0) AS total_withdrawal FROM vash_afiliacao a LEFT JOIN vash_wallet w ON a.user_id = w.user LEFT JOIN ( SELECT user_id, COALESCE(SUM(value), 0) AS total_withdrawal FROM vash_wallet_transactions GROUP BY user_id ) d ON a.user_id = d.user_id WHERE a.code = ? AND COALESCE(d.total_withdrawal, 0) > 0;';
        const [resultData] = await connection.query(queryData, [id]);

        // Extrair apenas o user_id de resultData e colocá-los em um array.
        const userId = resultData.map((result: any) => result.user_id);
        // Extrair apenas o wallet_value.
        const walletValue = resultData.map((result: any) => result.wallet_value);
        // Extrair apenas o total_withdrawal de resultData e colocá-los em um array.
        const totalWithdrawal = resultData.map((result: any) => result.total_withdrawal);

        let userNames = [];
        for (let i = 0; i < userId.length; i++) {
            // Consulta para obter os IDs dos afiliados relacionados ao usuário com wallet_value e soma dos valores de saque.
            let queryUserName = 'SELECT user_name FROM vash_user WHERE user_id = ?';
            const [resultData] = await connection.query(queryUserName, [userId[i]]);
            
            if (resultData.length > 0) {
                userNames.push(resultData[0].user_name); // Adiciona o username ao array.
            }
        }

        // Liberar conexão de volta para o pool.
        connection.release();

        const response = {
            userId: userId,
            username: userNames,
            wallet: walletValue,
            withdrawal: totalWithdrawal
        }

        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}