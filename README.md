# My Inventory

This app was created to meet the needs of a business looking to track their inventory and automatically purchase more products when inventory runs low. Inventory is tracked by scanning the bar code of the product.

This app utilizes Firebase to handle:

* User Authentication
* Data Storage
* Google Cloud Functions

## Personal notes

Pages:

### Inventory
* List all of the items in the inventory and their quantity, net cost, and unit cost. 
* Be able to filter and search for specific products in the current inventory.

### Add Item
* Expose the barcode scanner to get the item data to be added (add this price to the total worth of inventory).

### Remove Item
* Expose the barcode scanner to get the item data to be deleted (remove this price from the total worth of the inventory)
* Expose the database so that items can be removed manually (searched and deleted)
* Give an option to mark deletion as "Sold" (and add this figure to profits) or "Other" (and don't add to profits but just remove from total worth)

### Summary
* Display metrics 
* The total value of everything currently in the inventory.
* Net profits (if items sold) over the past week/month

#### DON'T FORGET
* Remove test mode from real time database and set permissions!
* Should probably eventually remove option to create an account and restrict those who don't have accounts from accessing database resources. I could create a set of keys, one of which would need to be specified by the new user in order for them to be allowed to create a new account. For example, new users are prompted with: "Enter a secret key to create a new account: <secret_key>", and if valid, they will be allowed to create a new account.