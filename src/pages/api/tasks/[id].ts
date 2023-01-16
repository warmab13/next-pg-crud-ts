import { NextApiRequest, NextApiResponse } from "next"


// eslint-disable-next-line import/no-anonymous-default-export
export default (req:NextApiRequest, res:NextApiResponse)=>{
    const { method } = req;
    switch (method) {
        case 'GET':
            return res.status(200).json({msg: 'getting a unique task'})
        case 'PUT':
            return res.status(200).json({msg: 'updating a unique task'});
        case 'DELETE':
            return res.status(200).json({msg: 'deleting a unique task'});
        case 'PATCH':
            return res.status(200).json({msg: 'updating unique task'});
        default:
            res.status(400).json({msg: 'method not allowed'})
            break;
    }
}
