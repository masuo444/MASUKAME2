# MASUKAME Analytics Setup Guide

## Required Account Setup

### 1. Google Analytics 4
1. Create Google Analytics account at https://analytics.google.com
2. Set up GA4 property for "MASUKAME Luxury Sculptures"
3. Replace `GA_MEASUREMENT_ID` in all HTML files with actual measurement ID (format: G-XXXXXXXXXX)

### 2. Meta Pixel (Facebook)
1. Create Facebook Business account at https://business.facebook.com
2. Create Pixel in Events Manager
3. Replace `YOUR_PIXEL_ID` in all HTML files with actual pixel ID

## Implemented Tracking Features

### Google Analytics 4
- ✅ Enhanced ecommerce tracking for $3,000 luxury products
- ✅ Custom dimensions for luxury customer segmentation
- ✅ Content grouping by product category and craftsmanship
- ✅ Conversion tracking for email inquiries
- ✅ High-value customer behavior analysis

### Meta Pixel
- ✅ Standard events: PageView, InitiateCheckout, Lead
- ✅ Custom events: LuxuryProductView, HighValueAudience, LuxuryPurchaseIntent
- ✅ Conversion API ready for server-side tracking
- ✅ Custom audience creation for wealthy demographics

## Key Metrics to Monitor

### Revenue Metrics
- **Purchase inquiries** (email clicks)
- **Customer Lifetime Value** (CLV) estimation
- **Conversion rate** from view to inquiry
- **Average order value** ($3,000 target)

### Luxury Brand Metrics
- **Engagement depth** (time on luxury product pages)
- **Geographic distribution** (wealthy regions)
- **Device preferences** (mobile vs desktop for luxury shoppers)
- **Traffic sources** (organic, social, referral quality)

### Customer Journey Tracking
- **Awareness**: Homepage views, story page engagement
- **Consideration**: FAQ page visits, multiple page sessions
- **Intent**: Purchase page visits, contact form interactions
- **Conversion**: Email inquiries, actual purchases

## Custom Audience Segments

### Google Analytics 4 Audiences
1. **High Intent Visitors**
   - Visited purchase page
   - Spent >2 minutes on site
   - Viewed multiple product images

2. **Luxury Art Enthusiasts**
   - Engaged with story content
   - Visited FAQ page
   - Returned visitors

3. **Purchase Ready**
   - Clicked email contact
   - Viewed pricing information
   - Multiple sessions

### Facebook Custom Audiences
1. **Website Visitors** (all pages)
2. **Product Viewers** (homepage + purchase page)
3. **High-Value Prospects** (purchase page visitors)
4. **Luxury Segment** (based on behavior and engagement)

## Conversion Events Hierarchy

### Level 1: Awareness
- Page views (all pages)
- Image slideshow interactions
- Story page engagement

### Level 2: Interest
- FAQ page visits
- Multiple page sessions
- Extended time on site (>90 seconds)

### Level 3: Intent
- Purchase page visits
- Contact information viewing
- Email clicks

### Level 4: Conversion
- Email inquiries sent
- Purchase contact form submissions
- Actual sales (manual tracking)

## Implementation Checklist

- [ ] Replace GA_MEASUREMENT_ID with actual Google Analytics ID
- [ ] Replace YOUR_PIXEL_ID with actual Facebook Pixel ID
- [ ] Set up Google Analytics 4 property and goals
- [ ] Configure Facebook Business Manager and Pixel
- [ ] Test all tracking events in browser developer tools
- [ ] Set up custom reports for luxury brand KPIs
- [ ] Configure conversion values and attribution models
- [ ] Enable Google Analytics Enhanced Ecommerce
- [ ] Set up automated reporting for key metrics

## Privacy Compliance Notes

- Analytics implementation includes GDPR-ready setup
- Cookie consent management may be required for EU visitors
- Data retention policies should align with luxury brand standards
- Customer data protection is essential for high-net-worth individuals

## Advanced Features Ready for Implementation

- **Google Tag Manager** integration for easier management
- **Server-side tracking** for enhanced privacy and accuracy
- **Cross-domain tracking** if multiple domains are used
- **Custom dashboard** creation for executive reporting
- **AI-powered insights** using Google Analytics Intelligence