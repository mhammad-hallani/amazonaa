# amazona


# lessons

1. Introduction
2. Install Tools
3. Create React App
4. Create Git Repository
5. List Products
6. Add routing: - npm i react-router-dom
                - create route for home screen
                - create route for product screen
7. Create Node.js Server :
    - create backend folder
    - run npm init in root folder(backend)
    - Update package.json set type : module (hata est3ml import badl require)
    - Add .js to imports
    - npm install express
    - create server.js
    - add start command as node backend/server.js
    - require express
    - create route for / return backend is ready.
    - move product.js from frontend to backend
    - create route for /api/products
    - return products
    - run npm start

8. Fetch Products from Backend
    - set proxy in package.json
    - npm install axios
    - use state hook
    - use effect hook
    - use reducer    

9. Manage State By Reducer Hook
    - define reducer
    - update fetch data
    - get state from reducer

10. add bootstrap UI Framework
    - npm install react-bootstrap bootstrap
    - update App.js

11. Create Product and Rating Component
    - create reating component
    - create product component
    - use reating component in product component

12. Create Product Details Screen
    - fetch product from backend
    - create 3 colums for image, info and action

13. Create Loading and Message Component
    - create loading component
    - use spinner component
    - create message component
    -create util.js to define getError function

14. Implement Add To Cart
    - Create React Context
    - define reducer
    - create store provider
    - implement add to cart button click handler

15. Complete Add To Cart 
    - check exist item in the cart
    - check count in stock in backend

16. Create Cart Screen 
    - create 2 columns
    - display items list
    - create action column

17. Complete    Cart Screen
    - click handler for inc/dec item
    - click handler for delete item
    - click handler for checkout

18. Create Singin Screen
    - Create Sign in Screen
    - add email and password
    - add sign in button

19. Connect To MongoDB Database
    - Create atlas mongodb database
    - install local mongodb database
    - npm install mongoose
    - connect to mongodb database

20. seed sample data
    - create Product model
    - create User model
    - create seed route
    - use route in server.js
    - seed sample product