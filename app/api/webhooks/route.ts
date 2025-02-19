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

  const body = await request.json();
  const { type, data } = body;

  if (type === 'user.created'){
try { 
    
     client = new MongoClient(uri!);
      // Use non-null assertion to ensure uri is defined 
   
      await client.connect();
      console.log("connected")
      const db = client.db(dbName!); 

      const { id, email_addresses, username } = data;

      //we are using clerk's webhoook feature when a new user sign in 
      // a new user is created which triggers this endpoint and this api gets executed

      const newUser = {
         name: username as string,

         email: email_addresses[0].email_address as string,

        

         

          createdAt: new Date(), 
          updatedAt: new Date() }; 

         

      const users = db.collection('users');

     

      const existingUser = await users.findOne({ email: newUser.email });
      if (existingUser) {
        return NextResponse.json({ error: 'User already exists' }, { status: 400 });
      }

      try {
        const result = await users.insertOne(newUser);
        if (result.acknowledged) { 
         // Perform additional actions if needed
         
   const client = await clerkClient();
   
 
         const res=await client.users.updateUserMetadata(id!, {
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
      } catch (error) {
        console.error('Errorm:', error);
        if (error instanceof Error) {
          return NextResponse.json({ error: error.message }, { status: 500 });
        }
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
}


