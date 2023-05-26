## Dokumentasi API

<details>

<summary>POST /auth/register</summary>

### POST /auth/register

#### Body
| Key         	| Type    	| Default 	| Required 	| Description                     	|
|--------------	|---------	| ---------	|----------	|---------------------------------	|
| name        	| String  	|         	| Yes      	| Name of the user                  |
| email       	| String    |          	| Yes      	| User email                       	|
| password     	| String  	|          	| Yes       | User password                   	|

#### Successful response
> Register successfully (200)
> ```JSON
> {
>   "statusCode": 200,
>   "data": [
>     {
>       "access_token": "xxx"
>     }
>   ]
> }
> ```

#### Failed response
> Required field didn't filled properly (400)
> ```JSON
> {
>   "statusCode": 400,
>   "message": [
>       "xxx",
>       "xxx",
>   ],
>   "error": "Bad Request"
> }
> ```

> Email already exists (400)
> ```JSON
> {
>   "statusCode": 400,
>   "message": "Email already exists"
> }
> ```

</details>

<details>
<summary>POST /auth/login</summary>

### POST /auth/login

#### Body
| Key         	| Type    	| Default 	| Required 	| Description                     	|
|--------------	|---------	| ---------	|----------	|---------------------------------	|
| email       	| String    |          	| Yes      	| User email                        |
| password     	| String  	|          	| Yes       | User password                  	  |

#### Successful response
> Login successfully (200)
> ```JSON
> {
>   "statusCode": 200,
>   "data": [
>     {
>       "access_token": "xxx"
>     }
>   ]
> }
> ```

#### Failed response
> Wrong Username / Password (400)
> ```JSON
> {
>   "statusCode": 401,
>   "message": "Unauthorized"
> }
> ```

> Required field didn't filled properly (400)
> ```JSON
> {
>   "statusCode": 400,
>   "message": [
>       "xxx",
>       "xxx",
>   ],
>   "error": "Bad Request"
> }
> ```

</details>

<details>
<summary>PATCH /user/{user_id}</summary>

### PATCH /user/{user_id}

#### Header
| Name         	| Type    	| Default 	| Required 	| Value                            	|
|--------------	| --------- | ---------	|----------	|---------------------------------	|
| Authorization | Bearer  	|         	| Yes      	| Auth token from register or login |


#### Params
| Name         	| Type    	| In      	| Default 	| Required 	| Description                     	|
|--------------	| --------- |---------	| ---------	|----------	|---------------------------------	|
| user_id       | Integer  	| Uri     	|         	| Yes      	| The ID of user                    |

#### Response
##### Successful response
> Successfully change user data  (200)
> ```JSON
> {
>   "statusCode": 200,
>   "data": [
>     {
>       "id": 1,
>       "name": "xxx",
>       "email": "xxx"
>     }
>   ]
> }
> ```
##### Failed response
> Id from token does not match user_id  (403)
> ```JSON
> {
>   "statusCode": 403,
>   "message": "Forbidden"
> }
> ```

</details>

<details>
<summary>DELETE /user/{user_id}</summary>

### DELETE /user/{user_id}

#### Header
| Name         	| Type    	| Default 	| Required 	| Value                            	|
|--------------	| --------- | ---------	|----------	|---------------------------------	|
| Authorization | Bearer  	|         	| Yes      	| Auth token from register or login |


#### Params
| Name         	| Type    	| In      	| Default 	| Required 	| Description                     	|
|--------------	| --------- |---------	| ---------	|----------	|---------------------------------	|
| user_id       | Integer  	| Uri     	|         	| Yes      	| The ID of user                    |

#### Response
##### Successful response
> Successfully delete the user  (204)
##### Failed response
> Id of token does not match user_id  (403)
> ```JSON
> {
>   "statusCode": 403,
>   "message": "Forbidden"
> }
> ```

> User didn't exists (400)
> ```JSON
> {
>     "statusCode": 400,
>     "message": "User didn't exists"
> }
> ```

</details>

<details>
<summary>POST /threads</summary>

### POST /threads

#### Header
| Name         	| Type    	| Default 	| Required 	| Value                            	|
|--------------	| --------- | ---------	|----------	|---------------------------------	|
| Authorization | Bearer  	|         	| Yes      	| Auth token from register or login |


#### Body
| Key         	| Type    	| Default 	| Required 	| Description                     	|
|--------------	|---------	| ---------	|----------	|---------------------------------	|
| title        	| String  	|         	| Yes      	| Name of thread                    |
| description 	| String    |          	| Yes      	| Description of thread             |
| topic        	| String  	|          	| Yes       | Topic of thread                   |
| image        	| File    	|          	| No        | Image of thread                   |
| audio        	| File    	|          	| No        | Audio of thread                   |

#### Response
##### Successful response

> Successfully created new thread  (201)
> ```JSON
> {
>   "statusCode": 201,
>   "data": [
>     {
>       "id": ,
>       "title": "xxx",
>       "description": "xxx",
>       "topic": "xxx",
>       "image": "xxx",
>       "audio": "xxx"
>     }
>   ]
> }
> ```

##### Failed response
> Invalid Token (401)
> ```JSON
> {
>   "statusCode": 401,
>   "message": "Unauthorized"
> }
> ```

> Required field didn't filled properly (400)
> ```JSON
> {
>   "statusCode": 400,
>   "message": [
>     "title should not be empty",
>     "description should not be empty",
>     "topic should not be empty"
>   ],
>   "error": "Bad Request"
> }
> ```

> Incompatible Files (422)
> ```JSON
> {
>   "statusCode": 422,
>   "message": "audio is not a valid document. Accepted file format [mp3,wav,mpeg]"
> }
> ```

</details>

<details>
<summary>PATCH /threads/{thread_id}</summary>

### PATCH /threads/{thread_id}

#### Header
| Name         	| Type    	| Default 	| Required 	| Value                            	|
|--------------	| --------- | ---------	|----------	|---------------------------------	|
| Authorization | Bearer  	|         	| Yes      	| Auth token from register or login |

#### Params
| Name         	| Type    	| In      	| Default 	| Required 	| Description                     	|
|--------------	| --------- |---------	| ---------	|----------	|---------------------------------	|
| thread_id     | Integer  	| Uri     	|         	| Yes      	| The ID of thread                  |

#### Body
| Key         	| Type    	| Default 	| Required 	| Description                     	|
|--------------	|---------	| ---------	|----------	|---------------------------------	|
| title        	| String  	|         	| No      	| Name of thread                    |
| description 	| String    |          	| No      	| Description of thread             |
| topic        	| String  	|          	| No       | Topic of thread                   |
| image        	| File    	|          	| No        | Image of thread                   |
| audio        	| File    	|          	| No        | Audio of thread                   |

#### Response
##### Successful response

> Successfully updated the thread  (200)
> ```JSON
> {
>   "statusCode": 200,
>   "data": {
>     "id": ,
>     "title": "xxx",
>     "description": "xxx",
>     "topic": "xxx",
>     "image": "xxx",
>     "audio": "xxx"
>   }
> }
> ```

##### Failed response

> Thread didn't exists (400)
> ```JSON
> {
>     "statusCode": 400,
>     "message": "Thread didn't exists"
> }
> ```

</details>

<details>
<summary>GET /threads</summary>

### GET /threads

#### Response
##### Successful response

> Successfully get the thread  (200)
> ```JSON
> {
>   "statusCode": 200,
>   "data": [
>     {
>       "id": 1,
>       "title": "xxx",
>       "description": "xxx",
>       "comments_count": "xxx",
>       "likes_count": "xxx",
>       "topic": "xxx",
>       "image": "xxx",
>       "audio": "xxx",
>       "created_at": "xxx",
>       "updated_at": "xxx"
>     },
>   ]
> }
> ```

</details>

<details>
<summary>GET /threads/{thread_id}</summary>

### GET /threads

#### Params
| Name         	| Type    	| In      	| Default 	| Required 	| Description                     	|
|--------------	| --------- |---------	| ---------	|----------	|---------------------------------	|
| thread_id     | Integer  	| Uri     	|         	| Yes      	| The ID of thread                  |
#### Response
##### Successful response

> Successfully get the thread  (200)
> ```JSON
> {
>   "statusCode": 200,
>   "data": {
>     "id": 1,
>     "title": "xxx",
>     "description": "xxx",
>     "comments_count": "xxx",
>     "likes_count": "xxx",
>     "topic": "xxx",
>     "image": "xxx",
>     "audio": "xxx",
>     "created_at": "xxx",
>     "updated_at": "xxx"
>   }
> }
> ```

</details>

<details>
<summary>DELETE /threads/{thread_id}</summary>

### DELETE /threads/{thread_id}

#### Header
| Name         	| Type    	| Default 	| Required 	| Value                            	|
|--------------	| --------- | ---------	|----------	|---------------------------------	|
| Authorization | Bearer  	|         	| Yes      	| Auth token from register or login |

#### Params
| Name         	| Type    	| In      	| Default 	| Required 	| Description                     	|
|--------------	| --------- |---------	| ---------	|----------	|---------------------------------	|
| thread_id     | Integer  	| Uri     	|         	| Yes      	| The ID of thread                  |

#### Response
##### Successful response
> Successfully delete the user  (204)
##### Failed response

> Id from the token does not match with the creator of thread  (403)
> ```JSON
> {
>   "statusCode": 403,
>   "message": "Forbidden"
> }
> ```

> Thread didn't exists (400)
> ```JSON
> {
>     "statusCode": 400,
>     "message": "Thread didn't exists"
> }
> ```


</details>
