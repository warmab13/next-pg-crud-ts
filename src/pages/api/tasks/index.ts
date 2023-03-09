import type { NextApiRequest, NextApiResponse } from 'next'
import { conn } from '../../utils/database';

export default async function tasks(
  req:NextApiRequest, 
  res: NextApiResponse){
    const { method } = req;

    switch (method) {
      case 'GET':
        try {
          const query = 'SELECT * FROM tasks';
          const response = await conn.query(query);
          return res.status(200).json({result: response.rows});
        } catch (error: any) {
          res.status(500).json({msg: 'internal server error', error: error.message});
        }
      case 'POST':
        try {
          const {title, description} = req.body;
          const values = [title, description];
          const query = 'INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *';
          const response = await conn.query( query, values);
          return res.status(200).json({result: response.rows[0]});
        } catch (error: any) {
          res.status(500).json({msg: 'internal server error', error: error.message});
        }
      default:
        res.status(400).json({msg: 'invalid method'})
        break;
    }
}
