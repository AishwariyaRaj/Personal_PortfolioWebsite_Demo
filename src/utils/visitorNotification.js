/**
 * Visitor Notification System using EmailJS
 * 
 * This utility sends you an email notification whenever someone visits your portfolio.
 * It prevents duplicate emails from the same visitor by using localStorage.
 * 
 * SETUP INSTRUCTIONS:
 * 1. Sign up at https://www.emailjs.com (free tier available)
 * 2. Create an email service (e.g., Gmail)
 * 3. Create an email template in EmailJS dashboard
 * 4. Get your Public Key from Account settings
 * 5. Replace the placeholder values below with your actual IDs
 */

// ========== EMAILJS CONFIGURATION ==========
// Replace these with your actual EmailJS credentials
const EMAILJS_PUBLIC_KEY = 'EMAILJS_PUBLIC_KEY' // Get from: EmailJS Account Settings
const EMAILJS_SERVICE_ID = 'EMAILJS_SERVICE_ID' // Get from: EmailJS Services
const EMAILJS_TEMPLATE_ID = 'EMAILJS_TEMPLATE_ID' // Get from: EmailJS Templates

// Unique identifier for storing visitor status in localStorage
const VISITOR_NOTIFIED_KEY = 'portfolio_visitor_notified'

/**
 * Detect if the user is a bot
 * This helps reduce spam and unnecessary notifications
 * 
 * @returns {boolean} true if likely a bot, false if likely a real user
 */
const isBotTraffic = () => {
  const userAgent = navigator.userAgent.toLowerCase()
  
  // Common bot indicators
  const botPatterns = [
    'bot', 'crawler', 'spider', 'scraper', 'curl', 'wget',
    'googlebot', 'bingbot', 'slurp', 'duckduckbot', 'baiduspider',
    'yandexbot', 'facebook', 'twitter', 'whatsapp', 'telegram',
    'lighthouse', 'headless', 'phantomjs', 'selenium'
  ]
  
  return botPatterns.some(pattern => userAgent.includes(pattern))
}

/**
 * Get visitor's approximate location (city and country)
 * Uses the free ip-api.com service
 * 
 * @returns {Promise<Object>} Location data with city and country
 */
const getVisitorLocation = async () => {
  try {
    const response = await fetch('https://ipapi.co/json/')
    const data = await response.json()
    return {
      city: data.city || 'Unknown',
      country: data.country_name || 'Unknown',
      ip: data.ip || 'Unknown'
    }
  } catch (error) {
    console.log('Location fetch failed:', error)
    return {
      city: 'Unknown',
      country: 'Unknown',
      ip: 'Unknown'
    }
  }
}

/**
 * Get browser and device information
 * 
 * @returns {Object} Browser info including name, version, and OS
 */
const getBrowserInfo = () => {
  const userAgent = navigator.userAgent
  let browserName = 'Unknown'
  let osName = 'Unknown'

  // Detect OS
  if (userAgent.indexOf('Win') > -1) osName = 'Windows'
  else if (userAgent.indexOf('Mac') > -1) osName = 'MacOS'
  else if (userAgent.indexOf('Linux') > -1) osName = 'Linux'
  else if (userAgent.indexOf('Android') > -1) osName = 'Android'
  else if (userAgent.indexOf('iPhone') > -1) osName = 'iOS'

  // Detect Browser
  if (userAgent.indexOf('Firefox') > -1) browserName = 'Firefox'
  else if (userAgent.indexOf('Chrome') > -1) browserName = 'Chrome'
  else if (userAgent.indexOf('Safari') > -1) browserName = 'Safari'
  else if (userAgent.indexOf('Edge') > -1) browserName = 'Edge'
  else if (userAgent.indexOf('Opera') > -1) browserName = 'Opera'

  return {
    browser: browserName,
    os: osName,
    userAgent: userAgent.substring(0, 100) // Limit length
  }
}

/**
 * Wait for EmailJS library to load
 * The CDN script loads asynchronously, so we need to wait for it
 * 
 * @returns {Promise<boolean>} true if EmailJS loads, false if timeout
 */
const waitForEmailJS = async () => {
  let attempts = 0
  const maxAttempts = 50 // 5 seconds max wait (50 * 100ms)
  
  while (attempts < maxAttempts) {
    if (window.emailjs) {
      console.log('✅ EmailJS library loaded')
      return true
    }
    await new Promise(resolve => setTimeout(resolve, 100))
    attempts++
  }
  
  console.error('❌ EmailJS library failed to load after 5 seconds')
  return false
}

/**
 * Initialize EmailJS
 * This must be called once before sending emails
 */
const initializeEmailJS = async () => {
  // First, wait for the library to be available
  const available = await waitForEmailJS()
  
  if (!available) {
    console.error('EmailJS library not available')
    return false
  }

  if (window.emailjs) {
    try {
      window.emailjs.init(EMAILJS_PUBLIC_KEY)
      console.log('✅ EmailJS initialized with public key')
      return true
    } catch (error) {
      console.error('Error initializing EmailJS:', error)
      return false
    }
  } else {
    console.error('EmailJS library not loaded. Make sure to include the script in index.html')
    return false
  }
}

/**
 * Send visitor notification email via EmailJS
 * 
 * The email template in EmailJS should have these variables:
 * {{visit_time}}, {{browser}}, {{os}}, {{city}}, {{country}}, {{ip}}, {{page_url}}
 * 
 * @returns {Promise<boolean>} true if email sent successfully, false otherwise
 */
const sendVisitorNotification = async () => {
  try {
    // Check if already notified this visitor
    const alreadyNotified = localStorage.getItem(VISITOR_NOTIFIED_KEY)
    if (alreadyNotified) {
      console.log('Visitor already notified, skipping duplicate email')
      return false
    }

    // Check for bot traffic
    if (isBotTraffic()) {
      console.log('Bot traffic detected, skipping notification')
      return false
    }

    // Collect visitor information
    const browserInfo = getBrowserInfo()
    const locationInfo = await getVisitorLocation()
    const visitTime = new Date().toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })

    // Prepare email parameters for your EmailJS template
    const templateParams = {
      visit_time: visitTime,
      browser: browserInfo.browser,
      os: browserInfo.os,
      user_agent: browserInfo.userAgent,
      city: locationInfo.city,
      country: locationInfo.country,
      ip: locationInfo.ip,
      page_url: window.location.href,
      // Optional: add your own email address if your template needs it
      // to_email: 'your-email@gmail.com'
    }

    console.log('Sending visitor notification...', templateParams)

    // Send email via EmailJS
    const response = await window.emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    )

    if (response.status === 200) {
      console.log('✅ Visitor notification email sent successfully!')
      
      // Mark this visitor as notified to prevent duplicates
      localStorage.setItem(VISITOR_NOTIFIED_KEY, 'true')
      
      return true
    }
  } catch (error) {
    console.error('❌ Error sending visitor notification:', error)
    return false
  }
}

/**
 * Main function to initialize and send notification
 * Call this once when the page loads
 */
export const notifyVisitor = async () => {
  try {
    // Check if credentials are configured
    if (
      EMAILJS_PUBLIC_KEY === 'YOUR_EMAILJS_PUBLIC_KEY_HERE' ||
      EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID_HERE' ||
      EMAILJS_TEMPLATE_ID === 'YOUR_TEMPLATE_ID_HERE'
    ) {
      console.warn('⚠️ EmailJS credentials not configured. Please update the values at the top of visitorNotification.js')
      return false
    }

    // Initialize EmailJS (wait for library to load)
    const isInitialized = await initializeEmailJS()
    if (!isInitialized) {
      console.error('EmailJS not available')
      return false
    }

    // Send the notification
    const notificationSent = await sendVisitorNotification()
    return notificationSent
  } catch (error) {
    console.error('Error in notifyVisitor:', error)
    return false
  }
}

/**
 * OPTIONAL: Reset visitor notification for testing
 * Call this in browser console: resetVisitorNotification()
 */
export const resetVisitorNotification = () => {
  localStorage.removeItem(VISITOR_NOTIFIED_KEY)
  console.log('Visitor notification reset. Email will be sent on next page load.')
}

/**
 * OPTIONAL: Clear all visitor data
 */
export const clearVisitorData = () => {
  localStorage.clear()
  console.log('All visitor data cleared.')
}
