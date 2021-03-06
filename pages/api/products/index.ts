import { NextApiRequest, NextApiResponse } from "next";

const { connectToDatabase } = require('../../../lib/mongodb');
const nextConnect = require('next-connect');

const handler = nextConnect({
   onError(error: any, req: NextApiRequest, res: NextApiResponse) {
      res.status(501).json({ error: `Something went wrong, error: ${error.message}` });
   },
   onNoMatch(req: NextApiRequest, res: NextApiResponse) {
      res.status(405).json({ error: `Method '${req.method}' is not allowed` });
   },
})
   .get(async (req: NextApiRequest, res: NextApiResponse) => {
      try {
         let { db } = await connectToDatabase();
         let products = await db
            .collection('products')
            .find({})
            .sort({ published: -1 })
            .toArray();
         return res.json({
            data: JSON.parse(JSON.stringify(products)),
            success: true,
         });

      } catch (error: any) {
         return res.json({
            message: new Error(error).message,
            success: false,
         });
      }
   })
   .post(async (req: NextApiRequest, res: NextApiResponse) => {
      try {
         let { db } = await connectToDatabase();
         await db.collection('products').insertOne(req.body);

         return res.json({
            message: "Product added successfully",
            success: true
         });
      } catch (error: any) {
         return res.json({
            message: new Error(error).message,
            success: false
         });
      }
   })


export default handler