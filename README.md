# News-App

A Full Stack Application build on java in backend using spring boot framework and react in frontend. It that allows user to login, search for US and UK news based on the keywords provided and logout successfully. Also, the code will take care of user and search validation. 

<img width="960" alt="home page" src="https://github.com/user-attachments/assets/d08e134c-370f-41b0-8351-e12d48405abf">

Credentials Used:
-----------------
Default username: test
Default password: test

App Flow:
---------
<img width="363" alt="App Flow" src="https://github.com/user-attachments/assets/6426feeb-9849-468c-b0f9-6483d06854f9">

Swagger Open API Spec:
----------------------
http://localhost:8080/swagger-ui.html

<img width="926" alt="swagger api doc" src="https://github.com/user-attachments/assets/1b5b62ec-e009-4948-b2bc-bd93ce5f7f20">

News fetched from public API's:
----------------------------
* Content Search API: "https://open-platform.theguardian.com/"
* Article Search API: "https://developer.nytimes.com/" 

SOLID Principles implemented:
----------------------------
* Single Responsibility Principle: Every class handles one responsibility.
* Open Closed Principle: Designed to enable extensions in code.

Design Patterns implemented:
----------------------------
Strategy Design Pattern: Based on the user selection (condition), if user wants to search for content or article, request is made to the respective search API.

Securtiy Aspect implemented:
----------------------------
Spring Security is implemented with a form login to check if user is authenticated before user can serach for news articles and content. 
By default, user is authorized to access urls "/" and "/login". 
* If user is not authenticated, alert message is displayed. 
* If user is authenticated, user is authorized to access urls "/articleList" and "/contentList".

Build and Deployment:
---------------------
* Build using Jenkins (Added Jenkins file in the code)
* Deploy to Docker using Jenkins (Added Docker file in the code)



