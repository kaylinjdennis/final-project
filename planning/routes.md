### ROUTES

# RESTful

## (HOME PAGE)
* GET /api/user

# READ - User profile
* GET /api/user/:id

# READ - Friends page
* GET /api/user/friends/:id

# CREATE - action from the new group page
* POST /api/groups

# CREATE - action from the new bill page
* POST /api/bills


## BILLS

# BROWSE - view all bills
* GET /api/bills/:type/:user_id

# READ - view specific bill's page
* GET /api/bills/:id (bill id)

# EDIT - admin edit data 
* POST /api/bills/:id

# ADD - admin add item
* POST /api/bills (body: user_id & type)

# DELETE - delete bill
* POST /api/bills/:id/delete


## My FRIENDS

# BROWSE - view all friends 
* GET /api/users/friends/:user_id

# ADD - add friend
* POST /api/users/friends/:user_id
