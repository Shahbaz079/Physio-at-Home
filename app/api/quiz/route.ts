'use server';

import { MongoClient, ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';


const uri = process.env.MONGO_URI as string;
const dbName = process.env.DB_NAME as string;

if (!uri) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

if (!dbName) {
  throw new Error('Invalid/Missing environment variable: "DB_NAME"');
}
 
export interface IQuiz extends Document {
  _id:ObjectId;
  user: ObjectId;
  score: number;
  correctAnswers: number[];
  wrongAnswers: number[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUser extends Document {
  name: string;
  email: string;
  pastQuizes: ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

export async function POST(request: NextRequest) {
  let client: MongoClient | null = null;

  try {
    const body = await request.json();
    const { userId, score, correctAnswers, wrongAnswers } = body;

    client = new MongoClient(uri!);
    await client.connect();
    const db = client.db(dbName);

    const newQuiz = {
      user: new ObjectId(userId as string),
      score,
      correctAnswers,
      wrongAnswers,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const quizs = db.collection('quizs');
    const users = db.collection('users');

    const existingUser: IUser | null = await users.findOne<IUser>({ _id: new ObjectId(userId as string) }); //checing if the user giving quiz exist in the database or not

    if (!existingUser) {
      return NextResponse.json({ error: 'User Not Found' }, { status: 404 });
    }

    const oldQuizs = existingUser.pastQuizes || [];

    const result = await quizs.insertOne(newQuiz);

    if (result.acknowledged) {
      //when the result of quiz is successfully inserted into collection, it's inserted Id will get saved to that user as an array of ObjectIds 
      const updatedQuizes=oldQuizs.length>0?[...oldQuizs,result.insertedId]:[result.insertedId]
      const res = await users.updateOne({ _id: new ObjectId(userId as string) }, { $set: { pastQuizes: updatedQuizes } });

      if (res.modifiedCount > 0) {
        return NextResponse.json(result);
      } else {
        return NextResponse.json({ error: "Failed to complete quiz insertion" });
      }
    } else {
      return NextResponse.json({ error: 'Failed to insert Quiz' }, { status: 500 });
    }
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
    }
  } finally {
    if (client) {
      await client.close();
    }
  }
}


export async function GET(request: NextRequest) {
  let client: MongoClient | null = null;

  try {
    const userId = request.nextUrl.searchParams.get('id');

    client = new MongoClient(uri!);
    await client.connect();
    const db = client.db(dbName);

   

    const quizs = db.collection('quizs');
    const users = db.collection('users');

    const existingUser: IUser | null = await users.findOne<IUser>({ _id: new ObjectId(userId as string) });

    if (!existingUser) {
      return NextResponse.json({ error: 'User Not Found' }, { status: 404 });
    }

    const oldQuizs = existingUser.pastQuizes ;
   //To get the quiz result of a particular result first go to users collection and find that particular collection
    const userQuizes = oldQuizs ? await quizs.find(
      { _id: { $in: oldQuizs } },
    ).sort({createdAt:-1}).toArray() : [];

    // then take the object IDs of all the quizes he/she has attempted and then serch for those quizs in quizs collection and then return it

   return NextResponse.json(userQuizes);
 
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
    }
  } finally {
    if (client) {
      await client.close();
    }
  }
}