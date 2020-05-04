# lookslabel

Index.js : Node JS server code.


## UPDATE

- Uploads data to fireStore
- main DB is firestore now
- Images gets stored in cloud storage
- New Update: Server Functionality completed!

## ROUTES & THERE FUNCTIONS

`/api/profile` 
- Creates Profile upon authentication &  Sets profile id(uid)

`/api/webcam`
 - GET protocol gives you data of webcam clicked photos

-POST protocol stores images to storage and logs it into database(Firestore)

`/api/upload` 
- Module uses Form Data to upload pictures and other fields.
- Form data can carry a payload (10mb limit) which save files to storage and logs it to database.
- Returns json data 
  
## Q&A
- How to emulate firebase in your local server?
ans. firebase serve --only functions,hosting