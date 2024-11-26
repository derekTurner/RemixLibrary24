import type { LoaderFunctionArgs } from "@remix-run/node";
import invariant from "tiny-invariant";

import Card from 'react-bootstrap/Card';

import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import BookInstance, { IBookInstance } from '../models/bookinstance';


export const loader: unknown = async ({
  params,
}: LoaderFunctionArgs) => {
  invariant(params.instanceId, "Missing instanceId param");

  const instance = await BookInstance.findById(params.instanceId).exec();
  if (!instance) {
    throw new Response("Not Found", { status: 404 });
  }
  console.log(instance);
  return json({ instance });

};



export default function Catalog() {
  
  const {instance} = useLoaderData<{ instance: IBookInstance }>();
  return (
    <div>
      <center><h1>Book Instance</h1></center>
      <p>Details of single instance of a book:</p>
      <Card style={{ width: '60em' }}>
        <Card.Body>
          <Card.Text>
                  Book: {instance.book} <br/>
                  Imprint:{instance.imprint}<br/>
                  Status:{instance.status}<br/> 
                  Due back:{instance.due_back_formatted}<br/>
          </Card.Text>
        </Card.Body>
      </Card>

    </div>

  );
}

