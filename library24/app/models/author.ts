import { Schema, model } from 'mongoose';
import type { Date } from 'mongoose';
import { DateTime } from 'luxon';

export interface IAuthor extends Document {
  _id: string;
  first_name: string;
  family_name: string;
  date_of_birth: Date;
  date_of_death: Date;
  name: string;
  date_of_birth_formatted: string;
  date_of_death_formatted: string;
  lifespan: number;
  url: string;
}




const AuthorSchema = new Schema(
  {
    first_name: {type: String, required: true, max: 100},
    family_name: {type: String, required: true, max: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date || null},
    
  }
);

AuthorSchema.set('toObject', { getters: true });  // https://mongoosejs.com/docs/guide.html#toObject  show virtuals in console logging
AuthorSchema.set('toJSON',   { getters: true });    //https://mongoosejs.com/docs/guide.html#toJSON   show virtuals in JSON.stringify


// Virtual for author's full name
AuthorSchema
.virtual('name')
.get(function () {
  return this.family_name + ', ' + this.first_name;
});

AuthorSchema
.virtual('date_of_birth_formatted')
.get(function () {
  return this.date_of_birth ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED) : '';
});

AuthorSchema
.virtual('date_of_death_formatted')
.get(function () {
 if (this.date_of_death != null) {
  return this.date_of_birth ? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED) : '';
 }else{
    return "living";
  }  
});

// Virtual for author's lifespan
AuthorSchema
.virtual('lifespan')
.get(function () {
  if(this.date_of_death != null){
  return "lifespan:" + (this.date_of_death.getFullYear() - this.date_of_birth!.getFullYear()).toString() + " years";
  } else {
    return "living"; 
  }
});


// Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function () {
  return '/catalog/authors/' + this._id;
});



//Export model

const Author =  model<IAuthor>('Author', AuthorSchema);
export default Author;
