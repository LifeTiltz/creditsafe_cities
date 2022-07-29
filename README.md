# Creditsafe's City information app
 A website to check the weather and other bits of information.

 ## How to Run
 Please run the backend and frontend to use the website.
 You will also need a SQL server running to access the CRUD operations.
 The login for the admin page is admin@admin and the password is adminadmin
 There is no .env because this is currently a private repo just for creditsafe. It will be added.

 ## Future development
 Due to time constraints there are a few things not perfect. 

 First problem is the admin page. While the app is using firebase for authentication, it does not do authorization when doing the CRUD operations. Anyone that finds and uses the REST endpoints can do any CRUD operation. This wasn't flagged in the website outline, but it is something i think should be fixed. I did have fun using firebase auth for the first time. 

  Second thing that will be fixed is the CSS, or lack thereof. Had work not been so hectic (i went to bed at 3am working on this) i would have drawn it exactly as pictured in the documentation that i was given. The only interesting part of CSS would have been the modal and that isnt flashy or complex.
    
Third thing will be to have the SQL statements for an easy setup for remote developers working on this, or even testing it out. 