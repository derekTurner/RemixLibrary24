import type { LoaderFunctionArgs } from "@remix-run/node";
import invariant from "tiny-invariant";

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";


import Author, { IAuthor } from '../models/author';
import Book, { IBook } from '../models/book';


export const loader: unknown = async ({
  params,
}: LoaderFunctionArgs) => {
  invariant(params.authorId, "Missing contactId param");
  const [author, books] = await Promise.all([
    Author.findById(params.authorId).exec(),
    Book.find({ authors: params.authorId }).exec()
  ]);

  if (!author) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ author, books });
};



export default function Catalog() {

  const { author, books } = useLoaderData<{ author: IAuthor, books: IBook[] }>();
  return (
    <div>
      <center><h1>Author Detail</h1></center>
      <p>The author has the following books:</p>
      <Card style={{ width: '60em' }}>
        <Card.Body>
          <Card.Text>
          <center><h1>{author.name}</h1></center><br />
          {author.date_of_birth_formatted} {author.lifespan}<br />
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