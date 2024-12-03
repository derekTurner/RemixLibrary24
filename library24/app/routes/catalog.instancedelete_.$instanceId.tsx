import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import BookInstance, { IBookInstance } from '../models/bookinstance';
import type { LoaderFunctionArgs } from "@remix-run/node";



export const loader: unknown = async ({
  params,
}: LoaderFunctionArgs) => {
  invariant(params.instanceId, "Missing contactId param");
  await BookInstance.deleteOne({_id:params.instanceId });
  return redirect('/catalog/books') ;// redisplay book details
};
