//import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";//
//import type { FunctionComponent } from "react";

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

import { json } from "@remix-run/node";

import { useLoaderData } from "@remix-run/react";


import BookInstance, { IBookInstance } from '../models/bookinstance';


export const loader: unknown = async () => {

  //const instances = await BookInstance.find({book: '660e9425cd2a5343c986400a'}).exec();
  const instances = await BookInstance.find().exec();
  if (!instances) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ instances });
};



export default function Catalog() {
  const data = useLoaderData() as { instances: IBookInstance[] };
  //console.log(data);
  return (
    <div>
      <center><h1>Book Instance List</h1></center>
      <p>The library has the following books:</p>
      <Card style={{ width: '60em' }}>
        <Card.Body>
          <Card.Text>
            <ListGroup>
              {data.instances.map((instance) => (
                <ListGroup.Item className="card-text" key={instance._id}>
                  Book: {instance.book.toString()} <br/>
                  Imprint: {instance.imprint}<br/>
                  Status: {instance.status.toString()}<br/> 
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Text>
        </Card.Body>
      </Card>

    </div>

  );
}

