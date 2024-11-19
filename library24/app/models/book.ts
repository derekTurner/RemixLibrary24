import {Schema, model} from 'mongoose';
import { IAuthor } from './author';
import { IGenre } from './genre';


export interface IBook extends Document{
  _id: string,
  title: string,
  authors: IAuthor [],
  summary: string,
  isbn: string,
  genres: IGenre [],
  url: string 
}


const BookSchema:Schema = new Schema(
  {
    title:    {type: String, required: true},
    authors: [{type: Schema.Types.ObjectId, ref: 'Author', required: true}],
    summary:  {type: String, required: true},
    isbn:     {type: String, required: true},
    genres:  [{type: Schema.Types.ObjectId, ref: 'Genre', required: true}]
  }
);

BookSchema.set('toObject', { getters: true });  // https://mongoosejs.com/docs/guide.html#toObject  show virtuals in console logging
BookSchema.set('toJSON',   { getters: true });  

// Virtual for book's URL
BookSchema
.virtual('url')
.get(function () {
  return '/catalog/books/' + this._id;
});

//Export model
const Book = model<IBook>('Book', BookSchema);
export default Book;