import pool from "@/Controller/db2";

export async function getData(id: any) {
    try {
        // Obter conexão do pool.
        const connection = await pool.getConnection();

        // Consulta para obter o nome do usuario logado.
        const queryName = 'SELECT nome FROM vash_user WHERE user_id = ?;';
        const [resultName] = await connection.query(queryName, [id]);
        const name = resultName[0].nome;

        // Consulta para obter o CPF e CNPJ do usuario logado.
        const queryCpf = 'SELECT cpf, cnpj FROM user_metadata WHERE user_id = ?;';
        const [resultCpf] = await connection.query(queryCpf, [id]);

        const cpf = resultCpf[0].cpf; // Obtem o cpf.
        const cnpj = resultCpf[0].cnpj; // Obtem o cnpj.

        // Liberar conexão de volta para o pool.
        connection.release();

        const response = {
            name: name,
            cpf: cpf,
            cnpj: cnpj
        }

        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}