# upload-api

A REST API wherein an authenticated user can upload images within a 500KB limit to MongoDB.

! prefixed URLs only accessible by logged-in users.

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

### Image upload and download

```!POST /images``` displays name and ID of all images that have been uploaded by the current user.

```!POST /images/upload``` performs the upload. Image has to be sent in the request. Only authenticated users can send this request, with file size <= 500KB and png and jpeg files only accepted.

```!POST /images/download/<image ID>``` downloads the image with given ID. This can be done only by the owner of that image.