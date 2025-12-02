// pages/api/users/login.js (Next.js API Route)
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { name, email, password_hash } = await request.json();

    // Buscar todos os usuários
    const response = await fetch("http://localhost:4000/api/users");
    const data = await response.json();
    const users = data.users; // sua resposta tem "users" e "message"

    // Procurar usuário que bate com name, email e password_hash
    const usuario = users.find(u =>
      u.name === name &&
      u.email === email &&
      u.password_hash === password_hash
    );

    if (!usuario) {
      return NextResponse.json({ erro: "Nome, email ou senha incorretos" }, { status: 401 });
    }

    return NextResponse.json({ usuario }, { status: 200 });

  } catch (err) {
    console.error("Erro no login:", err);
    return NextResponse.json({ erro: "Erro interno no servidor" }, { status: 500 });
  }
}
