# upload-api

A REST API wherein an authenticated user can upload images within a 500KB limit to MongoDB.

! prefixed URLs only accessible by authorised users.

### Authentication

```POST /auth/register``` registers a user.

###### JSON Arguments
- ```username``` : String
- ```password``` : String

```POST /auth/register``` logs a user in.

###### JSON Arguments
- ```username``` : String
- ```password``` : String

```GET /auth/logout``` performs logout operation.

### Image upload

```!POST /images/upload``` performs the upload. Image has to be sent in the request. Only authenticated users can send this request, with file size <= 500KB and png and jpeg files only accepted.
