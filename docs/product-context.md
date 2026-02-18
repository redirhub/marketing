# RedirHub — Product & Marketing Context

Purpose:
This document gives AI agents (Claude Code / ChatGPT) the full product context needed for rebuilding the RedirHub marketing website using Next.js.

The agent should boldly rewrite unclear, technical, or developer-written text into marketing-friendly, concise, high-trust copy while preserving correctness.

⸻

1. What is RedirHub?

RedirHub is a global domain and URL redirection platform designed for IT teams, SEO professionals, domain portfolio owners, and projects that need simple, fast, and reliable redirect management.

Unlike branded link shorteners such as Bitly or marketing-focused link platforms, RedirHub focuses on:
• Domain + Path redirection
• URL forwarding for SEO optimization
• Infrastructure-level reliability
• Edge-accelerated performance
• High-volume domain parking and forwarding
• Simple developer-friendly operations

The platform is built to be affordable, scalable, and instantly responsive with a powerful real-time dashboard.

2. Current Brand Voice

Tone characteristics extracted from your current homepage:
• Direct and confident
(“Your domains. Globally redirected. Instantly.”)
• Clear and infrastructure-focused
(Highlights speed, security, HTTPS, 301/302)
• No exaggerated marketing language
• Short, punchy sentences
• Benefit-driven rather than feature-dense
• Professional and trustworthy, similar to:
• Linear
• Cloudflare
• Plausible
• Vercel (in its simple messaging)

Brand voice guidelines for AI rewriting:
• Speak with technical confidence without being verbose
• Prefer clarity over persuasion
• Highlight reliability, speed, and control
• Keep headlines short (3–7 words)
• Use balanced engineering + marketing tone
• Avoid jargon unless necessary
• Avoid hype words like “revolutionary”, “ultimate”, etc.

⸻

3. Positioning

Primary Positionings (must appear across the website)

1. Fastest Redirect Platform
   • Edge-accelerated
   • 4× faster than Bitly
   • Sub-100ms global performance
2. IT Redirection Infrastructure
   • Enterprise reliability
   • Scalable to thousands of domains
   • API-first
   • Robust DNS & HTTPS support

These two pillars form the identity of RedirHub:
Speed + Infrastructure Reliability

⸻

4. Pricing Model

RedirHub offers Basic and Pro plans.
Pricing scales based on number of hostnames.

Hostnames Basic Pro Requests Included
5 free 100,000
15 $10 $30 1M
25 $25 $45 3M
50 $25 $60 3M
100 $50 $70 6M
250 — $105 —
500 — $145 —
1000 — $200 —
2500 — $275 —
5000 — $405 —
10000 — $610 —
15000 — $710 —
25000 — $910 —
50000 — $1350 —

AI must not modify these values unless explicitly instructed.

⸻

5. Features List

Below is the authoritative list of RedirHub features.
AI should use these for:
• Website content
• Comparison pages
• Feature explanations
• Tooltips, cards, marketing blocks

Core Features
• Team Members
• Global delivery network
• Management API
• Dashboard Management
• Full HTTPS
• IDN domain support
• 301, 302 redirects
• 307, 308 redirects
• Path forwarding
• Query parameter forwarding
• Path-based redirect
• Multiple destinations
• Change target any time
• Tagging
• Wildcard domains (domain and subdomain level only — e.g., *.domain.com → destination; NOT path-level wildcards like /blog/*)
• Wildcard certificates
• CNAME support
• Nameservers
• Frame redirects
• Custom HTML redirect pages
• Bulk management
• CSV import
• CSV export
• Redirect to the fastest target (performance-based)
• Security plugins
• Upload custom SSL
• QR codes

Analytics & Logging
• Basic analytics
• Detailed analytics
• Raw log pipeline
• Weekly & monthly emailed reports

⸻

6. Competitors

AI should be able to generate comparison copy against:

1. redirect.pizza
   • Strong feature match
   • More expensive at scale
   • RedirHub focuses on speed + affordability + IT operations
2. Urllo
   • More lightweight
   • Less infrastructure-grade
   • RedirHub offers deeper DNS/HTTPS control and analytics

AI should highlight:
• Speed advantage
• Lower prices at scale
• Real-time updates
• IT-focused architecture

⸻

7. Messaging Themes to Use in Website Copy

When rewriting or generating new copy, emphasize:

Speed
• “Instant updates”
• “Global propagation in milliseconds”
• “Built for sub-100ms redirects”

Control
• “Full HTTPS everywhere”
• “Advanced redirect rules”
• “API-first infrastructure”

Reliability
• “Real-time dashboard”
• “Edge network redundancy”
• “Consistent uptime”

Scale
• “From 5 to 50,000 domains”
• “Infrastructure for domain portfolios”

Simplicity
• “Manage everything from one clear dashboard”
• “No deployment process”

⸻

8. Homepage Copy Direction (For AI Generation)

AI should follow this pattern:

Hero

Your domains.
Globally redirected. Instantly.

Subtext:
Fast, reliable redirects with real-time updates and full HTTPS.
Built for teams that need infrastructure-grade control.

CTA:
• Start for free
• No credit card required
• Change your destination any time

Section Types
• Value props (speed, reliability, control)
• Feature overview
• Pricing snapshot
• Competitor comparison
• FAQ

⸻

9. Tone Examples for Rewrite Logic

Original (developer style):

“RedirHub uses OpenResty-based scripts for edge caching and certificate automation.”

Rewrite:

“Your redirects update instantly across our global edge network — with HTTPS enabled automatically.”

⸻

Original:

“Users can define custom Lua logic for path forwarding.”

Rewrite:

“Forward paths exactly how you want — with flexible redirect rules for any use case.”

⸻

10. AI Rewrite Rules

When rewriting copy:
• Remove technical jargon unless essential
• Keep sentences short
• Focus on benefits, not implementation
• Avoid repeated phrases
• Maintain neutral, professional tone
• Prefer verbs like:
“manage”, “secure”, “forward”, “optimize”, “control”, “simplify”

When in doubt:
• Lean toward infrastructure reliability
• Avoid marketing hype

⸻

11. Page Types This Document Governs

AI should use this document when generating:
• Homepage
• Pricing
• Features overview
• Developer/API documentation
• SEO landing pages
• Competitor comparison pages
• Blog article templates
• Help Center / FAQ
• Dashboard UX copy (tooltips, descriptions)

Legal pages are not to be rewritten (unless prompted with explicit instructions).

⸻

12. Legal & Company Info
    • Company: REDIRHUB LTD, UK
    • Websites:
    • https://www.redirhub.com
    • https://dash.redirhub.com
    • Data storage: US, EU
    • Privacy contact: privacy@redirhub.com

⸻

13. What AI Should Always Avoid
    • Inventing features not listed in section 5
    • Changing pricing
    • Making claims that cannot be technically validated
    • Overly casual tone
    • Overly technical tone
    • Improperly modifying legal content

14. Feature Boundaries & Clarifications (Critical — Do Not Override)

    Wildcard support:
    • Wildcards work at domain/subdomain level only (e.g., *.domain.com)
    • There is NO path-level wildcard support (e.g., /blog/* → /articles/* is NOT supported)
    • DO NOT use path wildcard examples in any copy or feature descriptions

    Regex:
    • RedirHub does NOT support regular expressions / regex for redirect rules
    • Never mention "regex", "regular expressions", or "pattern matching" as a feature

    Page-to-page redirects:
    • RedirHub supports individual page-to-page redirect rules (specific source URL → specific destination URL)
    • This is distinct from wildcard/pattern matching — it is exact URL mapping
