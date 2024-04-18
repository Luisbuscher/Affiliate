import pool from "@/Controller/db2";
import { getServerSession } from "next-auth";

export async function GET() {
    console.log("Resposta 1");
    return new Response("Hello World");
}

export async function POST(request: Request) {
    const body = await request.json();
    const session = await getServerSession();

    const user_id = session?.user?.email;

    // Recebendo os valores da requisicao.
    const name = body.nome !== "" ? body.nome : "defaultName"; // Recebe o nome atraves do formulario.
    const cpf = body.cpf !== "" ? body.cpf : "defaultCpf"; // Recebe o CPF.
    const cnpj = body.cnpj !== "" ? body.cnpj : "defaultCnpj"; // Recebe o cnpj, caso esteja vazio ele mantem default.

    // ACESSANDO O BANCO DE DADOS.

    // Obter conexão do pool.
    const connection = await pool.getConnection();

    // Atualiza os dados na tabela vash_user.
    await connection.query('UPDATE vash_user SET nome = ? WHERE user_id = ?', [name, user_id]);

    // Atualiza os dados na tabela user_metadata
    await connection.query('UPDATE user_metadata SET cpf = ?, cnpj = ? WHERE user_id = ?', [cpf, cnpj, user_id]);

    // Liberar conexão de volta para o pool.
    connection.release();

    return new Response(JSON.stringify({ message: "Alteração de nome efetuada com sucesso" }), { status: 200, headers: { "Content-Type": "application/json" }});
}