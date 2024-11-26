import type { LoaderFunctionArgs } from "@remix-run/node";
import invariant from "tiny-invariant";

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";


import Book, { IBook } from '../models/book';
import BookInstance, { IBookInstance } from '../models/bookinstance';


export const loader: unknown = async ({
  params,
}: LoaderFunctionArgs) => {
  invariant(params.bookId, "Missing contactId param");
  //console.log(params.bookId);
  const [bookData, instanceData] = await Promise.all([
    Book.findById(params.bookId).populate('authors').populate('genres').exec(),
    BookInstance.find({ book: params.bookId }).exec()
  ]);

  if (!bookData) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ book: bookData, bookInstances: instanceData });
};



export default function Catalog() {
  const { book, bookInstances } = useLoaderData<{ book: IBook, bookInstances: IBookInstance[] }>();


  return (
    <div>
      <center><h1>Book Detail</h1></center>
      <p>The library has the following book copies:</p>
      <Card style={{ width: '60em' }}>
        <Card.Body>
          <Card.Text>
            <ListGroup>

              <ListGroup.Item className="card-text" key={book._id} >
                <h2>Title: {book.title} </h2><br />
                <b>Authors:</b>
                <ul>
                  {book.authors.map((author) => (
                    <li key={author._id}>
                      <Link to={author.url}>{author.name}</Link>
                    </li>
                  ))}
                </ul>

                <b>Description:</b>{book.summary}<br />
                <b>ISBN:</b>{book.isbn}<br />
                <b>Genres:</b>Genres:
                {book.genres !== null && book.genres.length > 0 && (
                  <ul>
                    {book.genres.map((genre) => (
                      <li key={genre._id}>
                        <Link to={genre.url}>{genre.name}</Link>
                      </li>
                    ))}
                  </ul>
                )
                }

              </ListGroup.Item>
            </ListGroup>
          </Card.Text>
        </Card.Body>
      </Card>


      <h2>Copies</h2>
      {bookInstances.map((bookInstance) => (
        <Card key={bookInstance._id} style={{ width: '60em' }}>
          <Card.Body>
            <Card.Text>
              <ListGroup>
                <ListGroup.Item className="card-text">
                  <b>Status:</b> {bookInstance.status} <br />
                  <b>Imprint:</b>{bookInstance.imprint}<br />
                  <b>Detail:</b>Detail:<Link to={bookInstance.url}>Details</Link>
                </ListGroup.Item>
              </ListGroup>
            </Card.Text>
          </Card.Body>
        </Card>
      ))}

    </div>

  );
}