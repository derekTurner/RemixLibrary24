import { Schema, model } from 'mongoose';
import type { Date } from 'mongoose';
import { DateTime } from 'luxon';

export interface IBookInstance{
  _id: string;
  book:string,
  imprint:string,
  status:string,
  due_back: Date,
  due_back_formatted: string,
  url: string
}

const BookInstanceSchema = new Schema(
  {
    book: { type: Schema.Types.ObjectId, ref: 'Book', required: true }, //reference to the associated book
    imprint: {type: String, required: true},
    status: {type: String, required: true, enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'], default: 'Maintenance'},
    due_back: {type: Date, default: Date.now}
  }
);

BookInstanceSchema.set('toObject', { getters: true });  // https://mongoosejs.com/docs/guide.html#toObject  show virtuals in console logging
BookInstanceSchema.set('toJSON',   { getters: true });  

// Virtual for bookinstance's URL
BookInstanceSchema
.virtual('url')
.get(function () {
  return '/catalog/instances/' + this._id;
});

BookInstanceSchema
.virtual('due_back_formatted')
.get(function () {
  if (this.due_back != null) {
  return DateTime.fromJSDate(this.due_back).toLocaleString(DateTime.DATE_MED);
}else{
  return "In Library";
}  
});

//Export model

const BookInstance = model<IBookInstance>('BookInstance', BookInstanceSchema);
export default BookInstance;