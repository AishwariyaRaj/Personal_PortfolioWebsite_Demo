# 📧 Visitor Email Notification Setup Guide

## Overview
Your portfolio now has a visitor notification system! When someone visits your site, you'll automatically receive an email with their details (browser, OS, location, timestamp). Each visitor is tracked to prevent duplicate emails.

---

## 🚀 Step-by-Step Setup

### Step 1: Create an EmailJS Account
1. Go to **[https://www.emailjs.com/](https://www.emailjs.com/)**
2. Click **"Sign Up Free"** (creates a free account)
3. Verify your email
4. Log in to your dashboard

---

### Step 2: Set Up Email Service

1. In EmailJS dashboard, go to **"Email Services"** (left sidebar)
2. Click **"Add Service"**
3. Choose your email provider:
   - **Gmail (Recommended for beginners)**
   - Outlook
   - Custom SMTP
   - Or others

#### For Gmail:
- Select **"Gmail"**
- Click **"Connect Account"**
- Authenticate with your Gmail account
- Name the service (e.g., "Gmail Service")
- Click **"Create Service"**

**Save your Service ID** (you'll need it later)

---

### Step 3: Create Email Template

1. Go to **"Email Templates"** (left sidebar)
2. Click **"Create New Template"**
3. Fill in:
   - **Template Name**: "Visitor Notification"
   - **Subject**: `New Portfolio Visit - {{visit_time}}`

4. In the **Email Content** section, paste this template:

```html
<h2>🎉 New Portfolio Visitor!</h2>

<p><strong>Visit Time:</strong> {{visit_time}}</p>

<hr/>

<h3>Visitor Details:</h3>
<ul>
  <li><strong>Browser:</strong> {{browser}}</li>
  <li><strong>Operating System:</strong> {{os}}</li>
  <li><strong>User Agent:</strong> {{user_agent}}</li>
</ul>

<hr/>

<h3>📍 Location:</h3>
<ul>
  <li><strong>City:</strong> {{city}}</li>
  <li><strong>Country:</strong> {{country}}</li>
  <li><strong>IP Address:</strong> {{ip}}</li>
</ul>

<hr/>

<p><strong>Page Visited:</strong> <a href="{{page_url}}">{{page_url}}</a></p>

<hr/>

<p><em>This is an automated email from your portfolio tracking system.</em></p>
```

5. Click **"Save"**
6. **Save your Template ID** (you'll need it)

---

### Step 4: Get Your Public Key

1. Go to **"Account"** (top right menu)
2. Click **"API Keys"**
3. Find your **Public Key**
4. Copy it

---

### Step 5: Configure Your Portfolio

Now update your portfolio code with your EmailJS credentials:

**File:** `src/utils/visitorNotification.js`

Find these lines at the top:

```javascript
// ========== EMAILJS CONFIGURATION ==========
// Replace these with your actual EmailJS credentials
const EMAILJS_PUBLIC_KEY = 'YOUR_EMAILJS_PUBLIC_KEY_HERE'
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID_HERE'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID_HERE'
```

Replace with your actual values:
```javascript
const EMAILJS_PUBLIC_KEY = 'pk_abc123xyz...' // Your public key
const EMAILJS_SERVICE_ID = 'service_abc123...' // Your service ID
const EMAILJS_TEMPLATE_ID = 'template_abc123...' // Your template ID
```

---

## ✅ Testing

### Test 1: Check Console (Browser Developer Tools)

1. Open your portfolio
2. Press `F12` to open Developer Tools
3. Go to **Console** tab
4. You should see:
   ```
   EmailJS initialized successfully
   Sending visitor notification...
   ✅ Visitor notification email sent successfully!
   ```

### Test 2: Check Your Email Inbox
- Wait 1-2 seconds after page load
- Check your email (and spam folder)
- You should receive an email with visitor details

### Test 3: Test Duplicate Prevention

**In your browser console, run:**
```javascript
resetVisitorNotification()
```

Then:
1. Reload the page
2. Check your email again
3. You should receive another email (since we reset the visitor flag)

---

## 🛠️ Customization & Features

### Feature 1: Bot Detection (Enabled by Default)
The system automatically detects bots and prevents emailing you about them.

**Detected bots:**
- Googlebot, Bingbot, Crawlers
- Headless browsers
- Automation tools (Selenium, Puppeteer)

To disable bot detection, edit `src/utils/visitorNotification.js`:
```javascript
// Modify this line:
if (isBotTraffic()) {
  console.log('Bot traffic detected, skipping notification')
  return false
}

// To this:
// Bot detection disabled for testing
// if (isBotTraffic()) { ... }
```

### Feature 2: Location Tracking (Enabled by Default)
Users' approximate location (city/country) is automatically detected.

To disable location tracking:
1. Edit `src/utils/visitorNotification.js`
2. Change the `getVisitorLocation` function to always return:
```javascript
return {
  city: 'Not tracked',
  country: 'Not tracked',
  ip: 'Disabled'
}
```

### Feature 3: Email Limit Tracking
Each visitor is tracked using their browser's localStorage. They only get one email per visitor.

To reset for a specific visitor:
```javascript
localStorage.removeItem('portfolio_visitor_notified')
```

To clear all data:
```javascript
clearVisitorData()
```

---

## 📋 What Information is Tracked & Sent?

✅ **Sent in email:**
- Visit timestamp
- Browser name (Chrome, Firefox, Safari, etc.)
- Operating System (Windows, Mac, Linux, iOS, Android)
- Approximate location (city, country, IP)
- User agent string
- Page URL visited

❌ **NOT tracked:**
- Personal information (name, email, etc.)
- Passwords or sensitive data
- Cookies or tracking pixels
- Browsing behavior

---

## 🔒 Privacy & Security

✅ **Privacy-Friendly:**
- Location is approximate (city level)
- IP addresses are not stored permanently
- GDPR compliant (only operational data)
- No third-party trackers

✅ **Security:**
- Public Key is safe (meant to be public)
- EmailJS handles encryption
- No backend server needed

---

## ⚠️ Troubleshooting

### Issue: "EmailJS credentials not configured"
**Solution:** Update the three constants at the top of `src/utils/visitorNotification.js` with your actual IDs

### Issue: Email not received
**Checklist:**
1. ✅ Check Email Junk/Spam folder
2. ✅ Make sure credentials are correct
3. ✅ Verify email template was saved
4. ✅ Check browser console for errors (F12 → Console)
5. ✅ Verify "Enable Credentials Detection" is ON in EmailJS template settings

### Issue: Same email keeps coming
**Solution:** You might have same user testing. Run in console:
```javascript
resetVisitorNotification()
```

### Issue: Too many emails from bots
**Solution:** Bot detection is enabled by default. Bots should be filtered out. If still receiving, you can add bot patterns to the `botPatterns` array in `visitorNotification.js`

---

## 📊 Advanced: Monitoring Visitor Trends

**In browser console, you can:**

1. Check if current visitor was already notified:
```javascript
localStorage.getItem('portfolio_visitor_notified')
```

2. See all localStorage data:
```javascript
console.table(localStorage)
```

3. Reset notification to test again:
```javascript
resetVisitorNotification()
```

---

## 🎯 Next Steps (Optional Enhancements)

### Option 1: Add Visitor Counter
```javascript
// In App.jsx, add:
const visitCount = localStorage.getItem('portfolio_visit_count') || 0
localStorage.setItem('portfolio_visit_count', parseInt(visitCount) + 1)
```

### Option 2: Add Visit Log to Dashboard
Create a simple visitor stats page showing:
- Total visits
- Unique visitors
- Top browsers
- Top locations

### Option 3: Webhook Integration
Instead of Email, send to:
- Discord webhook
- Slack channel
- Database/Analytics service

---

## 📞 Support

**EmailJS Docs:** https://www.emailjs.com/docs/
**EmailJS Dashboard:** https://dashboard.emailjs.com

---

## 📝 Summary

✅ Visual flow:
1. User visits portfolio
2. **visitorNotification.js** runs
3. Collects: timestamp, browser, OS, location
4. EmailJS sends email to you
5. Visitor marked in localStorage (no duplicate emails)

**Time to setup:** ~5 minutes

**Cost:** FREE tier available (50 emails/month)

---

Good luck! 🚀
