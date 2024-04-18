import pool from "@/Controller/db2";
import { getServerSession } from "next-auth";

export async function GET() {
    console.log("Resposta 1");
    return new Response("Hello World");
}

export async function POST(request: Request) {
    const body = await request.json();
    const session = await getServerSession();

    // const user_id = session?.user?.email;
    const user_id = 62;

    // Recebendo os valores da requisicao.
    const value = parseFloat(body?.value); // Converte o valor para um número.
    const pixKey = body?.pixKey; // Recebe o valor da chave pix.
    const name = body?.name; // Recebe o valor da chave pix.

    const date = new Date().toISOString().slice(0, 19).replace("T", " ");
    const status = "Pendente";
    const transactionType = "retirada";

    // ACESSANDO O BANCO DE DADOS.

    // Obter conexão do pool.
    const connection = await pool.getConnection();

    // Consulta para obter o valor da carteira.
    const queryWallet = 'SELECT wallet_value FROM vash_wallet WHERE user = ?';
    const [resultsWallet] = await connection.query(queryWallet, [user_id]);
    let wallet = parseFloat(resultsWallet[0].wallet_value);
    if(wallet < value){
        return new Response(JSON.stringify({ message: "Você não possui saldo suficiente" }), { status: 400, headers: { "Content-Type": "application/json" }});
    } else if(value < 100){
        return new Response(JSON.stringify({ message: "Valor minimo para saque é de 100 reais" }), { status: 400, headers: { "Content-Type": "application/json" }});
    }

    // Insere na carteira as informações do saque efetuado.
    const insertQuery = 'INSERT INTO vash_wallet_transactions (user_id, user, value, date, pix_key, status, transation) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const insertValues = [user_id, name, value, date, pixKey, status, transactionType];
    await connection.query(insertQuery, insertValues);

    // Atualiza o valor da carteira na tabela vash_wallet
    wallet -= value; // Diminui o valor do saque.
    const updateWalletQuery = 'UPDATE vash_wallet SET wallet_value = ? WHERE user = ?';
    await connection.query(updateWalletQuery, [wallet, user_id]);

    // Liberar conexão de volta para o pool.
    connection.release();

    console.log("Corpo da resposta 2 do model: " + user_id);
    return new Response(JSON.stringify({ message: "Saque efetuado com sucesso" }), { status: 200, headers: { "Content-Type": "application/json" }});
}