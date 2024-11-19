//import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";//
//import type { FunctionComponent } from "react";


import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

import { json } from "@remix-run/node";

import { useLoaderData, Link } from "@remix-run/react";



import Author, { IAuthor } from '../models/author';





export const loader: unknown = async () => {

  const authors = await Author.find({}, null, { virtuals: true })
    .sort([['family_name', 'ascending']])
    .exec();

  if (!authors) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({ authors });
};



export default function Catalog() {
  const data = useLoaderData() as { authors: IAuthor[] };
  //console.log(data);
  return (
    <div>
      <center><h1>Author List</h1></center>

      <Card style={{ width: '60em' }}>
        <Card.Body>
          <Card.Text>
            <ListGroup>
              {data.authors.map((author) => (
                <ListGroup.Item className="card-text" key={author._id}>
                  First Name: {author.first_name} <br />
                  Name: {author.name} <br />
                  Date of Birth: {author.date_of_birth_formatted}<br />
                  Lifespan: {author.lifespan}<br />
                  <Link to={author.url}>Details</Link>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Text>
        </Card.Body>
      </Card>

    </div>
  );
}










