import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "@remix-run/react";
import errorImage from './assets/images/errorImage.svg'

import styles from "./tailwind.css";

export const links = () => [
  { rel: "stylesheet", href: styles },
]
export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-slate-50">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}


// Remix propose une solution générale pour gérer les erreurs que j'ai implémenter ici.
// Toutefois, implémenter comme ici cela ne permet pas d'avoir des erreurs contextuelles et retourne une page identique à toute les erreurs.
// Il est possible de faire mieux et j'ai choisi cette solution dans un premier temps pour me consacrer à développer le reste des fonctionnalités. 
export function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);
  return (
    <html>
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <div className="flex-col flex justify-center items-center">
          <img src={errorImage} alt="error image" className="w-full h-auto"/>
          <div className="absolute flex flex-col justify-center items-center px-10 py-8 mt-20 bg-slate-50 rounded-3xl shadow-lg">
            <h1 className="text-xl font-bold my-2">Ho no ! An error occured...</h1>
            <Link to="/" className="bg-sky-200 px-2 rounded-lg mt-4 hover:bg-sky-300 active:bg-sky-100">
              Back
            </Link>
          </div>
        </div>
        <Scripts />
      </body>
    </html>
  );
}
