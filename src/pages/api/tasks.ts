import type { NextApiRequest, NextApiResponse } from 'next'

export default function tasks(
  req:NextApiRequest, 
  res: NextApiResponse){
    const { method } = req;

    switch (method) {
      case 'GET':
        res.status(200).json({msg: 'getting tasks'});
        break;
      case 'POST':
        res.status(200).json({msg: 'creating a task'});
        break;
      case 'PUT':
        res.status(200).json({msg: 'updating all the task'});
        break;
      case 'DELETE':
        res.status(200).json({msg: 'deleting a task'});
        break;
      case 'PATCH':
        res.status(200).json({msg: 'updating part of a task'});
        break;
    
      default:
        break;
    }
}
