# angularjs-auth-token-management

For security reasons, APIs that make data changes on a system require a security token as part of the request. This security token may have some expiration policy which forces the client application to refresh it after certain period of time.  In this session, we take a look at how the security token can be managed on a Single Page Application with no page refresh.

This project has the following components:

Client:
AngularJS SPA which interacts with a NodeJS server to demo calls to secured APIS

Server:
NodeJS server with open and secured APIs. The API are secured with a JWT token