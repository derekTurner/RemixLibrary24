//import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";//
//import type { FunctionComponent } from "react";



interface Details {
  numBooks: number,
  numBookInstances: number,
  numAvailableBookInstances: number,
  numAuthors: number,
  numGenres: number
}


import Card from 'react-bootstrap/Card';

import { json } from "@remix-run/node";

import { useLoaderData, } from "@remix-run/react";


import Book from '../models/book';
import Author from '../models/author';
import BookInstance from '../models/bookinstance';
import Genre from '../models/genre';



export const loader: unknown = async () => {



  const [
    numBooks,
    numBookInstances,
    numAvailableBookInstances,
    numAuthors,
    numGenres
  ] = await Promise.all([
    Book.countDocuments({}).exec(),
    BookInstance.countDocuments({}).exec(),
    BookInstance.countDocuments({ status: "Available" }).exec(),
    Author.countDocuments({}).exec(),
    Genre.countDocuments({}).exec(),
  ]);

  if (!numBooks) {
    throw new Response("Not Found", { status: 404 });
  }

  const details: Details = {
    numBooks,
    numBookInstances,
    numAvailableBookInstances,
    numAuthors,
    numGenres
  };

  return json({ details });
};


export default function Catalog() {
  console.log(useLoaderData<Details>());
  const detailJson = useLoaderData<{details:Details}>();
  const details: Details = detailJson.details;
  return (
    <div>
      <center><h1>Book Lists</h1></center>
      <p>The library has the following books:</p>
      <Card>
        <Card.Body>
          <Card.Text>
            Books: {details.numBooks} ,
            Instances: {details.numBookInstances} ,
            Available: {details.numAvailableBookInstances},
            Authors: {details.numAuthors},
            Genres: {details.numGenres}
          </Card.Text>
        </Card.Body>
      </Card>

    </div>
  );
}

