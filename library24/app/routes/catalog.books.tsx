//import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";//
//import type { FunctionComponent } from "react";

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

import { json } from "@remix-run/node";

import { useLoaderData, Link} from "@remix-run/react";


import Book, { IBook } from '../models/book';


export const loader: unknown = async () => {

  const books = await Book.find({}).populate('authors').populate('genres').exec();
  if (!books) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ books });
};



export default function Catalog() {
  const data = useLoaderData() as { books: IBook[] };

  return (
    <div>
      <center><h1>Book List</h1></center>
      <p>The library has the following books:</p>
      <Card style={{ width: '60em' }}>
        <Card.Body>
          <Card.Text>
            <ListGroup>
              {data.books.map((book) => (
                <ListGroup.Item className="card-text" key={book._id} >
                  Title: {book.title} <br />
                  Authors:
                  <ul>
                    {book.authors.map((author) => (
                      <li key={author._id}>
                        {author.name}
                      </li>
                    ))}
                  </ul>

                  {/*Description:{book.summary}<br /> */}
                  Genres:
                  {book.genres !== null && book.genres.length > 0 && (
                    <ul>
                      {book.genres.map((genre) => (
                        <li key={genre._id}>
                          {genre.name}
                        </li>
                      ))}
                    </ul>
                  )
                  }
                  ISBN: {book.isbn} <br />
                  <Link to={book.url}>Details</Link>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Text>
        </Card.Body>
      </Card>

    </div>

  );
}

