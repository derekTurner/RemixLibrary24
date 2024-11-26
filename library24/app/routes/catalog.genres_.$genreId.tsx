import type { LoaderFunctionArgs } from "@remix-run/node";
import invariant from "tiny-invariant";

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";

import Genre, { IGenre } from '../models/genre';
import Book, { IBook } from '../models/book';


export const loader: unknown = async ({
  params,
}: LoaderFunctionArgs) => {
  invariant(params.genreId, "Missing contactId param");
  const [genre, books] = await Promise.all([
    Genre.findById(params.genreId).exec(),
    Book.find({ genres: params.genreId }).exec()
  ]);

  if (!genre) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ genre, books });
};



export default function Catalog() {

  const {genre, books } = useLoaderData<{ genre: IGenre, books: IBook[] }>();
  return (
    <div>
      <center><h1>Genre Detail</h1></center>
      <p>The libary has the following books of this genre:</p>
      <Card style={{ width: '60em' }}>
        <Card.Body>
          <Card.Text>
          <center><h1>{genre.name}</h1></center><br />
          </Card.Text>
        </Card.Body>
      </Card>

   


<h2>Books</h2>
{books.map((book) => (
  <Card key={book._id} style={{ width: '60em' }}>
    <Card.Body>
      <Card.Text>
        <ListGroup>
          <ListGroup.Item className="card-text">
            <b>Title:</b> <b>Detail:</b>Detail:<Link to={book.url}>{book.title}</Link> <br />
            <b>Summary:</b>{book.summary}<br />
            
          </ListGroup.Item>
        </ListGroup>
      </Card.Text>
    </Card.Body>
  </Card>
))}

</div>

  );
}