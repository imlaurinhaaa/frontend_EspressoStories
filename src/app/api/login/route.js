import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { erro: 'Email e senha são obrigatórios' },
                { status: 400 }
            );
        }

        const response = await fetch(new URL('/api/admins', request.url), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            return NextResponse.json(
                { erro: 'Erro ao buscar administradores' },
                { status: 500 }
            );
        }

        const admins = await response.json();

        // procurar apenas pelo email e depois comparar o hash
        const adminEncontrado = admins.find(admin => admin.email === email);

        if (!adminEncontrado) {
            return NextResponse.json(
                { erro: 'Email ou senha inválidos' },
                { status: 401 }
            );
        }

        const senhaValida = await bcrypt.compare(password, adminEncontrado.password_hash);

        if (!senhaValida) {
            return NextResponse.json(
                { erro: 'Email ou senha inválidos' },
                { status: 401 }
            );
        }

        return NextResponse.json({
            usuario: {
                id: adminEncontrado.id,
                name: adminEncontrado.name,
                email: adminEncontrado.email,
                photo: adminEncontrado.photo,
            },
        });
    } catch (error) {
        console.error('Erro no administradores:', error);
        return NextResponse.json(
            { erro: 'Erro ao processar administradores' },
            { status: 500 }
        );
    }
}