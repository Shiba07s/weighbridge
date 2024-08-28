 base64 encoding in linux:

 echo -n 'root' | base64

 
Database configuaration:

sudo apt install mysql-server


sudo systemctl status mysql



sudo mysql

CREATE USER 'mhophi'@'%' IDENTIFIED WITH mysql_native_password BY 'mhophi';


GRANT ALL ON *.* to 'mhophi'@'%';


FLUSH PRIVILEGES;



Overview:
Our proposed E-commerce Multi-Vendor Software Solution is designed to 
empower to establish a thriving online marketplace where multiple vendors can 
showcase and sell their products. The platform will provide a user-friendly 
interface, streamlined inventory management, secure payment gateways, and a 
range of essential features to optimize the buying and selling experience.
Scope Of Work:
Admin Login:
• Web Pages Management
• Home Pages Section Management (Latest Product Section, sponsored 
Section & 199 deals Section and many more (Note: Sections are 
customizable))
• Categories Management (Main Category Sub & Sub-One Category)
• Vendor Management
• User Management
• Order Management (Pending Order Management, Confirm Order, 
Delivered Order Etc)
• Products Management
• Shipment Management
• Support Report
• Commission Management
• Review Report
• Offer/Discount Management
• Employee Management
• Payment Mode Management
• Accounts Management 
• & many more

User Login:
• Login with number/mail id
• Profile Management
• Set Default Currency
• Order Status
• Order History
• Total Lay buy 
• Total Group Buy
• Pre-Order Listing
• Donation (Donate, Viral Donation & recurring Donation)
• Wishlist
• Add Contact (Invites)
• Message
• Followed Marchant/Vendor List
• Pay with Payment Gateway
• Review Report
• Logout
Vendor Login: (User Can add businesses and become vendor)
• Can Manage vendor profile.
• Manage Profile Banner
• Pending Order Delivery
• Pre-Order Listing
• Lay Buy Orders
• Group Purchase Order
• Shipped Order
• Delivered Order
• Inventory Management (Stock Management, Invoice & Product 
Management)
• Total Pending Order
• Add Discount/Offer Coupon
• Employee Management (according to access)
• Message (Chat Option)
• Patron(Followers)
T&C Page for vendor
• Review Report
Dynamic Website:
• Dynamic Web Pages (Home, About Us, Support)
• Categories
• Search Bar
• Currency Converter
• Sing In/Sing up.
• Dynamic Sections for Products
• Dynamic Sliders
• Banners
• Footer (T&C, Address, Delivery Policies, Number Etc)
Note: Suggestion for Filter & sort option, Vendor Verification Option 
Instant Chat Option & Unlimited Dynamic Pages.
Tech Stack:
• Frontend for App: React Native Mobile Application (Android & iOS)
• Backend: Java
• Database: MySQL
• Frontend for Web: React Js
Project Duration:
Overall, the estimated timeline for developing software can range 4 to 5 months. 
Depending on the factors mentioned earlier. It is essential to have a well-defined 
plan, an experienced development team, and efficient project management to 
ensure a successful timely delivery of the software.

















//Create a spring boot maven project.
//
//2. Create a rest controller and implement the below APIs
//
//a. NewAccount creation API:
//
//Fields Datatype Value
//
//id String (Primary
//
// 
//
//key)
//
// 
//
//&lt;Auto generate&gt;
//
//name String &lt;input field&gt;
//
//accountNumber Long (Unique
//
//key)
//
// 
//
//&lt;input field&gt;
//
//balance Double &lt;default value&gt; Zero
//
// 
//
//Result: Primary key (id) should be returned.
//
//b. Update account API:
//
//Input fields:
//
//accountNumber: &lt;input field&gt;
//
//amount: &lt;input field&gt;
//
//type: &lt;input field&gt; &lt;possible values: ‘credit’/’debit’&gt;
//
//Update Logic:
//
//● If the type value is “credit” then the balance field in the database
//
//should be credited with the given amount.
//
//● If the type value is “debit” then the balance field in the database
//
//should be debited with the given amount.
//
// 
//
//c. Get account API:
//
//Input field:
//
//accountNumber: &lt;input field&gt;
//
//Result: Account entity response for the given account number.
//
//Storage:
//
//Use in-memory to store the entity, retrieve the same from memory, and update. No need
//
//for a database connection.
//
//Validation &amp; Configuration:
//
// 
//
//1. accountNumber: field length should be 12 digit (length should be configurable in
//
//application.properties file)
//
//2. type: allowed values are “credit” &amp; “debit” (allowed type values should be defined
//
//in the application.properties)
//
// 
//
//Expected classes:
//
//Rest Controller: &lt;for all rest APIs &gt;
//
//Service class with interface: &lt;should have business logic&gt;
//
//Entity: &lt;define all the fields for persistence&gt;
//
//Technology:
//
//Java 11, Spring &amp; Spring boot
  
