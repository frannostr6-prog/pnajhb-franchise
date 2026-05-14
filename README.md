# PNA JHB Franchise Ordering Platform

## Files
- `index.html` — Franchisee ordering portal
- `admin.html` — Your admin panel to manage products

## How to deploy FREE on Netlify (5 minutes)

1. Go to https://netlify.com and sign up free
2. Drag and drop this folder onto the Netlify dashboard
3. Your app is live at a URL like `pnajhb-franchise.netlify.app`
4. You can set a custom name in Netlify settings

## How it works

### Adding products (you)
- Open `admin.html` on your device
- Add product name, price, description, and photo
- Products appear instantly in the ordering portal

### Placing orders (franchisees)
- They open `index.html` (your Netlify URL)
- Browse products with search and sort
- Tap a product, enter quantity, add to cart
- Enter their franchise name and submit order

## To connect orders to Google Sheets

1. Go to https://script.google.com
2. Create a new project and paste this code:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.openById('YOUR_SHEET_ID').getSheetByName('Orders');
  const data = JSON.parse(e.postData.contents);
  sheet.appendRow([data.date, data.franchiseName, data.items, data.total]);
  return ContentService.createTextOutput('OK');
}
```

3. Deploy as Web App (Anyone can access)
4. Copy the Web App URL
5. In `index.html`, replace `YOUR_GOOGLE_APPS_SCRIPT_URL` with that URL

Orders will now write directly to your Google Sheet every time a franchisee submits.
