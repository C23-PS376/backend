## Dokumentasi API

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
> Successfully change user data  (403)
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
> Id of token does not match user_id  (403)
> ```JSON
> {
>   "statusCode": 403,
>   "message": "Forbidden"
> }
> ```

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