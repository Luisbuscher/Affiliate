export async function GET(){
    return Response.json("Hello World");
}

export async function POST(request: Request){
    console.log(request);
    return new Response("GET handler");
}