import { NextApiRequest, NextApiResponse } from "next"
import { conn } from "@/pages/utils/database";

// eslint-disable-next-line import/no-anonymous-default-export
export default async(req:NextApiRequest, res:NextApiResponse)=>{
    const { method, query, body } = req;
    console.log(query);

    switch (method) {
        case 'GET':
            try {
                const text = 'SELECT * FROM tasks WHERE id = $1';
                const values = [query.id];
                const response = await conn.query(text, values);
                if(response.rows.length === 0)
                    return res.status(404).json({msg: 'task not found'});
    
                return res.status(200).json({result: response.rows[0]});
            } catch (error: any) {
                res.status(500).json({msg: 'internal server error', error: error.message});
            }
        case 'PUT':
            try {
                const { title, description } = body;
                const text = 'UPDATE tasks SET title = $1, description = $2 WHERE id = $3 RETURNING *';
                const values = [title, description, query.id];
                const response = await conn.query(text, values);
                if(response.rowCount === 0)
                    return res.status(404).json({msg: 'task not found'});
    
                return res.status(200).json({result: response.rows[0]});
            } catch (error: any) {
                res.status(500).json({msg: 'internal server error', error: error.message});
            }
            return res.status(200).json({msg: 'updating a unique task'});
        case 'DELETE':
            try {
                const text = 'DELETE FROM tasks WHERE id = $1 RETURNING *';
                const values = [query.id];
                const response = await conn.query(text, values);
                if(response.rowCount === 0)
                    return res.status(404).json({msg: 'task not found'});
    
                return res.status(200).json({result: response.rows[0]});
            } catch (error: any) {
                res.status(500).json({msg: 'internal server error', error: error.message});
            }
        case 'PATCH':
            return res.status(200).json({msg: 'updating unique task'});
        default:
            res.status(400).json({msg: 'method not allowed'})
            break;
    }
}
