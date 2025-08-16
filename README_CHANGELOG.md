# MASUKAME Luxury Website

## Overview
Bilingual (EN/JA) luxury wooden sculpture website for MASUKAME.
Pure HTML/CSS/JS implementation with no external dependencies.

## Features
- **Currency**: USD only (no conversion)
- **Languages**: English and Japanese with header toggle
- **Payment**: Full pre-payment in USD
- **Shipping**: Insured worldwide
- **Certificate**: Paper COA with signature only (no digital/NFT)

## Key Dates
- **Pre-order**: August 29, 2025, 18:00 Dublin Time (UTC+1)
- **Launch**: November 7, 2025, 18:00 GMT (UTC+0)

## File Structure
```
/
├── en/                 # English pages
│   ├── index.html      # Home
│   ├── purchase.html   # Purchase/Concierge
│   ├── terms.html      # Terms of Service
│   └── privacy.html    # Privacy Policy
├── ja/                 # Japanese pages
│   ├── index.html      # ホーム
│   ├── purchase.html   # 購入/コンシェルジュ
│   ├── terms.html      # 利用規約
│   └── privacy.html    # プライバシーポリシー
└── assets/
    ├── app.css         # Shared styles
    ├── app.js          # CTA switching, form validation
    ├── hero.jpg        # Hero image placeholder
    ├── ogp.jpg         # Social sharing image
    └── craft-*.jpg     # Gallery images

```

## Setup Instructions

### 1. Replace Placeholder Images
- `hero.jpg`: 1600x800px minimum, professional product shot
- `ogp.jpg`: 1200x630px for social media
- `craft-*.jpg`: Gallery images showing craftsmanship

### 2. Configure Form Endpoint
Edit `assets/app.js` line 59:
```javascript
const FORM_ENDPOINT = 'YOUR_ENDPOINT_HERE';
```

### 3. Add Analytics (Optional)
Add GA4 and Meta Pixel codes where indicated by placeholders.

## Features Implementation

### CTA Auto-Switching
The main CTA buttons automatically update based on dates:
- Before Aug 29: "Join Waitlist" / "ウェイトリストに参加"
- Aug 29 - Nov 7: "Pre-order now" / "今すぐ予約注文"
- After Nov 7: "Purchase / Concierge" / "購入 / コンシェルジュ"

### Form Security
- Honeypot field to detect bots
- 60-second rate limiting between submissions
- Client-side validation with required fields

### Responsive Design
- Desktop: 3-column grid layouts
- Mobile: Single column, optimized spacing
- Touch-friendly tap targets (44px minimum)

## Performance Optimizations
- Native lazy loading for images
- Minimal JavaScript (no frameworks)
- CSS variables for consistent theming
- Smooth scrolling for anchor links

## Accessibility
- Semantic HTML structure
- Alt text on all images
- ARIA labels where appropriate
- Keyboard navigation support
- Focus visible states

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6 JavaScript features used
- CSS Grid and Flexbox layouts

## Maintenance Notes
- Year in footer updates automatically
- Form submissions logged to console when no endpoint configured
- All prices hardcoded in USD
- No currency conversion needed

## Color Palette
- Background: #F7F4EF (Ivory)
- Text: #111111 (Ink Black)  
- Accent: #C9A227 (Gold, used sparingly)
- White: #FFFFFF
- Muted: #666666

## Typography
- Headings: Georgia, serif
- Body: system-ui, -apple-system, sans-serif
- Letter spacing: 0.02em (body), 0.1em (uppercase)
- Line height: 1.6-1.8

## Version History

### v1.0.0 (2025-01-16)
- Initial release
- Bilingual support (EN/JA)
- USD-only pricing
- No NFT references
- Complete MASUKAME product descriptions
- Form with honeypot and rate limiting
- Date-based CTA switching
- Responsive design
- Paper COA only