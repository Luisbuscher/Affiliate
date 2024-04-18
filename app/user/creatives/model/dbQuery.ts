import pool from "@/Controller/db2";

export async function getData(id: any) {
    try {
        // Obter conexão do pool.
        const connection = await pool.getConnection();

        // CONSULTA para obter link e title dos creativos.
        const queryCreatives = 'SELECT link, title FROM vash_creatives';
        const [resultCreatives] = await connection.query(queryCreatives, [id]);

        // Extrair apenas os titulos de resultCreatives e colocá-los em um array.
        const title = resultCreatives.map((result: any) => result.title);
        // Extrair os códigos.
        const link = resultCreatives.map((result: any) => result.link);

        // Liberar conexão de volta para o pool.
        connection.release();

        const response = {
            title: title,
            link: link
        }

        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}