1. Mention two parts of Express that you learned about this week.
the bros and the homies

  Server-side Routing
  Express is able to utilize routing to determine what kind of operation to perform based on the URL and type of HTTP request.

  Middleware
  Express is able to utilize middleware from various sources - it can use custom middleware made by the developer (including routes), ready-made third party middleware, and even built-in middleware to extend functionality.

2. Describe Middleware?

  Middleware is a piece of software that acts as a bridge or intermediary between two processes or applications/programs.

  In terms of Express, middleware are the array of functions that perform operations for each request.

3. Describe a Resource?

  In the context of web development, a resource is generally some form of data. On its own, it is more of an abstract concept used to represent the idea of certain objects like personal data or classes, for example, but it can be identified in the web by a URI (Uniform Resource Identifier), such as the URL string found in the address bar of a browser, and what that URI actually does is point to the 'location' or 'address' of a resource within a network (such as the World Wide Web, or even a locally hosted network).

4. What can the API return to help clients know if a request was successful?

  The API can return some form of response object to the client. Depending on the design and intended use, that response object may contain various key-value pairs to provide different information on how the request was processed, including success and failure.


5. How can we partition our application into sub-applications?

  The application can be split into different pieces of middleware (this includes routes).

  Middleware not only provides the benefit of extended functionality; when used correctly, it adds modularity as well. This can be augmented further by having a good directory structure.

  The idea here is separation of concerns - let each file/module/sub-application be focused on a particular task and organize them based on the types of said tasks.
