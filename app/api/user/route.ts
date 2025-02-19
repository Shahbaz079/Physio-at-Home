'use server'



import { MongoClient } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server'
import { clerkClient ,auth} from '@clerk/nextjs/server';


const uri = process.env.MONGO_URI as string;
const dbName = process.env.DB_NAME as string;

if (!uri) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

if (!dbName) {
  throw new Error('Invalid/Missing environment variable: "DB_NAME"');
}
export async function POST(request:NextRequest){

  let client:MongoClient|null=null;
try { 
    const  body  = await request.json();
     client = new MongoClient(uri!);
      // Use non-null assertion to ensure uri is defined 
      await client.connect(); 
      const db = client.db(dbName!); 

      
      const newUser = {
         name: body.name as string,

         email: body.email as string,

        



          createdAt: new Date(), 
          updatedAt: new Date() }; 

      const users = db.collection('users');

      const existingUser = await users.findOne({ email: newUser.email });
      if (existingUser) {
        return NextResponse.json({ error: 'User already exists' }, { status: 400 });
      }
      const result = await users.insertOne(newUser);
       if (result.acknowledged) { 
        // Perform additional actions if needed
        
  const client = await clerkClient();
  const { userId } = await auth() ;

        const res=await client.users.updateUserMetadata(userId!, {
          publicMetadata: {
            mongoId: result.insertedId,
          },
        })

          if(res) { console.log("updated");}
        return NextResponse.json(result);
      } 
      else{
        return NextResponse.json({ error: 'Failed to insert user' }, { status: 500 });
      }


}catch (error) { 
  if(error instanceof Error){
    return NextResponse.json({ error: 'Failed to insert user' }, { status: 500 });
  }else{
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
  
   
   }
    finally {
     if (client) {
       await client.close(); 
      } }
}