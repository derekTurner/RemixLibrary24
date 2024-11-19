//import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";//
//import type { FunctionComponent } from "react";

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

import { json } from "@remix-run/node";

import { useLoaderData, Link } from "@remix-run/react";



import Genre, { IGenre } from '../models/genre';


export const loader: unknown = async () => {

  const genres = await Genre.find({}, null, { virtuals: true })
    .sort([['name', 'ascending']])
    .exec();

  if (!genres) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({ genres });
};



export default function Catalog() {
  const data = useLoaderData() as { genres: IGenre[] };
  //console.log(data);
  return (
    <div>
      <center><h1>Genre List</h1></center>
      <p>The library features the following book genres:</p>
      <Card style={{ width: '60em' }}>
        <Card.Body>
          <Card.Text>
            <ListGroup>
              {data.genres.map((genre) => (
                <ListGroup.Item className="card-text" key={genre._id}>
                  Name: {genre.name} <br />
                  <Link to={genre.url}>Details</Link>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Text>
        </Card.Body>
      </Card>

    </div>
  );
}











