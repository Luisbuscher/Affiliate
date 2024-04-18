import pool from "@/Controller/db2";

export async function getData(id: any) {
    try {
        // Obter conexão do pool.
        const connection = await pool.getConnection();

        // CONSULTA para obter url do site para convite.
        const queryUrl = 'SELECT value FROM vash_config WHERE meta = "url_site"';
        const [resultUrl] = await connection.query(queryUrl);

        // Extrair apenas os titulos de resultUrl e colocá-los em um array.
        const url = "https://"+resultUrl[0].value+"/join?id="+id;

        // Liberar conexão de volta para o pool.
        connection.release();

        // console.log("TESTE: "+cpa[0]);

        const response = {
            url: url
        }

        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}