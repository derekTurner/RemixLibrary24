//import {redirect } from "@remix-run/node";
import { Container, Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

import {
  Links,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import type { MetaFunction } from "@remix-run/node";
// existing imports

import "./app.css"; // includes bootstrap

export const meta: MetaFunction = () => {
  return [
    { title: "Local Library" },
    {
      property: "og:title",
      content: "Very cool app",
    },
    {
      name: "description",
      content: "Acess local library",
    },
  ];
};


export default function App() {

  const retrieve = [
    ['/', 'home'],
    ['/catalog/', 'Catalog'],
    ['/catalog/books/', 'All books'],
    ['/catalog/authors/', 'All authors'],
    ['/catalog/genres/', 'All genres'],
    ['/catalog/instances/', 'All book-instances']

  ]

  const create = [
    ['/catalog/books/create', 'Create book'],
    ['/catalog/authors/create', 'Create author'],
    ['/catalog/genres/create', 'Create genre'],
    ['/catalog/instances/create', 'Create book-instance']
  ]

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        {/* comments in JSX are in braces  */}
        <Container fluid="md">
          <Row >
            <Col xs={3} >
              <h1>Local Library</h1>
              <Card className="text-left" border="primary">
                <Card.Body>
                  <ul>
                    <nav>
                      {retrieve.map((retriever) => (
                        <li key={retriever[1]}>
                          <NavLink
                            className={({ isActive, isPending }) =>
                              isActive
                                ? "active" : isPending
                                  ? "pending" : ""
                            }
                            to={retriever[0]}
                          >
                            {retriever[1]}
                          </NavLink>
                        </li>
                      ))}
                    </nav>
                  </ul>
                </Card.Body>
              </Card>

              <h2>Create</h2>
              <Card className="text-left" border="primary">
                <Card.Body>
                  <ul>
                    <nav>
                      {create.map((retriever) => (
                        <li key={retriever[1]}>
                          <NavLink
                            className={({ isActive, isPending }) =>
                              isActive
                                ? "active" : isPending
                                  ? "pending" : ""
                            }
                            to={retriever[0]}
                          >
                            {retriever[1]}
                          </NavLink>
                        </li>
                      ))}
                    </nav>
                  </ul>
                </Card.Body>
              </Card>
            </ Col>

            <Col >
              <Outlet />
              <ScrollRestoration />
              <Scripts />
            </Col>
          </Row>
        </Container>
      </body>
    </html>
  );
}