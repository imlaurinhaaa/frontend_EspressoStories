import { NextResponse } from 'next/server';

let usuarios = [];

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("Recebido no backend:", body);

    // Validação dos campos obrigatórios
    const { name, email, password_hash, cep } = body;
    if (!name || !email || !password_hash || !cep) {
      return NextResponse.json(
        { erro: "Todos os campos são obrigatórios: nome, email, senha, cep" },
        { status: 400 }
      );
    }

    const novoUsuario = {
      id: usuarios.length + 1,
      name: name,
      email,
      password_hash: password_hash, 
      cep,
    };

    usuarios.push(novoUsuario);

    console.log("Usuário criado:", novoUsuario);

    return NextResponse.json({ usuario: novoUsuario }, { status: 201 });

  } catch (error) {
    console.error("Erro na rota /api/users:", error);
    return NextResponse.json({ erro: error.message || "Erro ao criar usuário" }, { status: 500 });
  }
}
