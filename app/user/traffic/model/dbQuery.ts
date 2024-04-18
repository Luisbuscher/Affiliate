import pool from "@/Controller/db2";

export async function getData(id: any) {
    try {
        // Obter conexão do pool.
        const connection = await pool.getConnection();

        // CONSULTA para obter os codigos de afiliacao.
        const queryData = 'SELECT ad.* FROM vash_affiliate_data ad JOIN vash_affiliate a ON ad.utm_source = a.code JOIN vash_user u ON a.user_id = u.user_id WHERE u.user_id = ?';
        const [resultsCodes] = await connection.query(queryData, [id]);

        // Liberar conexão de volta para o pool.
        connection.release();

        // console.log("TESTE: "+cpa[0]);

        const response = resultsCodes;

        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}