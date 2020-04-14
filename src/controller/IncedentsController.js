const connection = require('../database/connection');


module.exports = {


    async index(request, response) {
        const { page = 1 } = request.query;
        const [count] = await connection('incidents').count();

        incidents = await connection('incidents')
            .join('ongs', 'ong_id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsup',
                'ongs.city',
                'ongs.uf',

            ]);
        response.header('X-Total-Count', count['count(*)'])
        return response.json(incidents);
    },
    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;
        const incidente = await connection('incidents').where('id', id)
            .select('ong_id')
            .first();

        if (incidente.ong_id != ong_id) {

            return response.status(401).json({ error: 'operation not permited' });
        }
        await connection('incidents').where('id', id).delete()
            .then().catch(err => console.log(err));
        return response.status(204).send();
    },
    async create(request, response) {
        const { title, descricao, value } = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            descricao,
            value,
            ong_id

        }).then().catch(err => console.log(err));

        return response.json({ id })

    }


}