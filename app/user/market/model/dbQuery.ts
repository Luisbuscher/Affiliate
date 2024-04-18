import pool from "@/Controller/db2";

export async function getData(id: any) {
    try {
        // Obter conexão do pool.
        const connection = await pool.getConnection();

        // CONSULTA para obter os codigos de afiliacao.
        const queryCodes = 'SELECT title, code FROM vash_affiliate WHERE user_id = ?;';
        const [resultsCodes] = await connection.query(queryCodes, [id]);

        // Extrair apenas os titulos de resultsCodes e colocá-los em um array.
        const codeTitles = resultsCodes.map((result: any) => result.title);
        // Extrair os códigos.
        const codes = resultsCodes.map((result: any) => result.code);

        // CONSULTA para obter os titulos, links e cpa.
        const queryLinks = 'SELECT links, title, cpa, revshare, description FROM vash_link;';
        const [resultLinks] = await connection.query(queryLinks, [id]);

        // Extrair os links de resultLinks e colocá-los em um array.
        const links = resultLinks.map((result: any) => result.links);
        // Extrair os title.
        const title = resultLinks.map((result: any) => result.title);
        // Extrair os cpa.
        const cpa = resultLinks.map((result: any) => result.cpa);

        // Liberar conexão de volta para o pool.
        connection.release();

        // console.log("TESTE: "+cpa[0]);

        const response = {
            titleCode: codeTitles,
            codes: codes,
            gameTitle: title,
            cpa: cpa,
            gameLink: links
        }

        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}