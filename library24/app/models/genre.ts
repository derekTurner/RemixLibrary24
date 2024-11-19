import {Schema, model} from 'mongoose';

export interface IGenre extends Document{
  _id: string,
  name:string,
  url: string
}


const GenreSchema = new Schema(
  {
    name: {type: String, required: true}
  }
);

GenreSchema.set('toObject', { getters: true });  // https://mongoosejs.com/docs/guide.html#toObject  show virtuals in console logging
GenreSchema.set('toJSON',   { getters: true }); 

// Virtual for genre's URL
GenreSchema
.virtual('url')
.get(function () {
  return '/catalog/genres/' + this._id;
});

//Export model
const Genre = model<IGenre>('Genre', GenreSchema);
export default Genre;
