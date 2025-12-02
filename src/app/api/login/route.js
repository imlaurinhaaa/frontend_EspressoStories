import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const body = await request.json();
        const { email, password_hash } = body;

        console.log("BODY RECEBIDO:", body);

        const response = await fetch("http://localhost:4000/admins");

        console.log("STATUS DO BACKEND:", response.status);

        const contentType = response.headers.get("content-type");
        console.log("CONTENT-TYPE:", contentType);

        if (!response.ok) {
            return NextResponse.json(
                { erro: "Erro ao acessar backend" },
                { status: 500 }
            );
        }

        const admins = await response.json();

        console.log("ADMINS RECEBIDOS:", admins);

        const admin = admins.find(
            (a) => a.email === email && a.password_hash === password_hash
        );

        if (!admin) {
            return NextResponse.json(
                { erro: "Email ou senha incorretos" },
                { status: 401 }
            );
        }

        return NextResponse.json({ usuario: admin }, { status: 200 });

    } catch (err) {
        console.error("ERRO COMPLETO:", err);
        return NextResponse.json(
            { erro: "Erro interno no servidor" },
            { status: 500 }
        );
    }
}
