import type { NextApiRequest, NextApiResponse } from 'next'
import { conn } from '../utils/database';

type Data = {
  msg: string,
  time: string
}

export default async function index( req:NextApiRequest, res: NextApiResponse<Data>){
  const response = await conn.query('SELECT NOW()')
  return res.json({msg: 'pong', time: response.rows[0].now });
}
