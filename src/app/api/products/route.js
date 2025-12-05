export async function POST(request) {
    try {
        const body = await request.json();

        // Validar campos obrigatórios
        if (!body.name || !body.description || !body.price || !body.category || !body.photo) {
            return new Response(
                JSON.stringify({ 
                    error: 'Campos obrigatórios faltando',
                    required: ['name', 'description', 'price', 'category', 'photo']
                }),
                { 
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }

        // Validar preço
        const price = parseFloat(body.price);
        if (isNaN(price) || price < 0) {
            return new Response(
                JSON.stringify({ error: 'Preço inválido' }),
                { 
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }

        // Aqui você pode adicionar lógica para salvar no banco de dados
        // Por enquanto, apenas retornamos sucesso
        const novoProduct = {
            id: Date.now(),
            name: body.name,
            description: body.description,
            price: price,
            category: body.category,
            photo: body.photo,
            criadoEm: new Date().toISOString()
        };

        return new Response(
            JSON.stringify({ 
                message: 'Produto criado com sucesso',
                product: novoProduct
            }),
            { 
                status: 201,
                headers: { 'Content-Type': 'application/json' }
            }
        );

    } catch (error) {
        console.error('Erro ao processar requisição:', error);
        return new Response(
            JSON.stringify({ error: 'Erro ao processar requisição' }),
            { 
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
}
