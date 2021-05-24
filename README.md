# upload-api

POST /auth/register registers a user. JSON arguments: username and password, both strings
POST /auth/login performs login operation. JSON arguments: username and password, both strings
GET /auth/logout performs logout operation.

POST /images/upload performs the upload. Image has to be sent in the request. Only quthenticated users can send this request, with file size <= 500KB and png and jpeg files only accepted.
