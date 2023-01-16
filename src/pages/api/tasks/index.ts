import type { NextApiRequest, NextApiResponse } from 'next'

export default function tasks(
  req:NextApiRequest, 
  res: NextApiResponse){
    const { method } = req;

    switch (method) {
      case 'GET':
        return res.status(200).json({msg: 'getting tasks'});
      case 'POST':
        return res.status(200).json({msg: 'creating a task'});
      
      default:
        res.status(400).json({msg: 'invalid method'})
        break;
    }
}
