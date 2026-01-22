export const shortenUrlData = {
  "plans": [
    {
      "id": "short-url-free",
      "label": "Free",
      "badge": null,
      "product": "short-url",
      "product_name": "URL Shortener",
      "parent": null,
      "children": 0,
      "free": true,
      "price": 0,
      "annual_price": 0,
      "currency": "usd",
      "addons": [],
      "limits": [
        {
          "id": "records",
          "from": 100,
          "to": null,
          "text_list": "100 links",
          "text_subscribe": "100 links",
          "primary": true,
          "tooltip": null
        },
        {
          "id": "visits",
          "from": 1,
          "to": null,
          "text_list": "1 million requests / mo",
          "text_subscribe": "1 million requests / mo",
          "primary": true,
          "tooltip": null
        },
        {
          "id": "hosts",
          "from": 1,
          "to": null,
          "text_list": "1 custom domains",
          "text_subscribe": "1 custom domains",
          "primary": true,
          "tooltip": null
        },
        {
          "id": "members",
          "from": 1,
          "to": null,
          "text_list": "1 team members",
          "text_subscribe": "1 team members",
          "primary": false,
          "tooltip": null
        }
      ],
      "features": [
        {
          "id": "manage.https",
          "label": "Full HTTPS",
          "tooltip": "We will automatically protect all your source hostnames with SSL/TLS certificates and renew them 30 days before expiry."
        },
        {
          "id": "manage.frame",
          "label": "Frame",
          "tooltip": "Using iframe to keep source URL displayed in browser instead of 301 redirect."
        },
        {
          "id": "manage.pathbased",
          "label": "Path-based redirect",
          "tooltip": "Redirect your traffic to different destination according to slug"
        }
      ],
      "level": 0
    },
    {
      "id": "short-url-basic",
      "label": "Basic",
      "badge": null,
      "product": "short-url",
      "product_name": "URL Shortener",
      "parent": null,
      "children": 2,
      "free": false,
      "price": 10,
      "annual_price": 100,
      "currency": "usd",
      "addons": [],
      "limits": [
        {
          "id": "records",
          "from": 1000,
          "to": 10000,
          "text_list": "1000-10000 links",
          "text_subscribe": "1000 links",
          "primary": true,
          "tooltip": null
        },
        {
          "id": "visits",
          "from": 1,
          "to": 6,
          "text_list": "1-6 million requests / mo",
          "text_subscribe": "1 million requests / mo",
          "primary": true,
          "tooltip": null
        },
        {
          "id": "hosts",
          "from": 2,
          "to": 5,
          "text_list": "2-5 custom domains",
          "text_subscribe": "2 custom domains",
          "primary": true,
          "tooltip": null
        },
        {
          "id": "members",
          "from": 1,
          "to": null,
          "text_list": "1 team members",
          "text_subscribe": "1 team members",
          "primary": false,
          "tooltip": null
        }
      ],
      "features": [
        {
          "id": "manage.https",
          "label": "Full HTTPS",
          "tooltip": "We will automatically protect all your source hostnames with SSL/TLS certificates and renew them 30 days before expiry."
        },
        {
          "id": "manage.frame",
          "label": "Frame",
          "tooltip": "Using iframe to keep source URL displayed in browser instead of 301 redirect."
        },
        {
          "id": "manage.pathbased",
          "label": "Path-based redirect",
          "tooltip": "Redirect your traffic to different destination according to slug"
        },
        {
          "id": "analytics.basic",
          "label": "Basic analytics",
          "tooltip": null
        }
      ],
      "level": 1
    },
    {
      "id": "short-url-plus",
      "label": "Pro",
      "badge": "Popular",
      "product": "short-url",
      "product_name": "URL Shortener",
      "parent": null,
      "children": 0,
      "free": false,
      "price": 90,
      "annual_price": 900,
      "currency": "usd",
      "addons": [],
      "limits": [
        {
          "id": "records",
          "from": 100000,
          "to": null,
          "text_list": "100000 links",
          "text_subscribe": "100000 links",
          "primary": true,
          "tooltip": null
        },
        {
          "id": "visits",
          "from": 10,
          "to": null,
          "text_list": "10 million requests / mo",
          "text_subscribe": "10 million requests / mo",
          "primary": true,
          "tooltip": null
        },
        {
          "id": "hosts",
          "from": 10,
          "to": null,
          "text_list": "10 custom domains",
          "text_subscribe": "10 custom domains",
          "primary": true,
          "tooltip": null
        },
        {
          "id": "members",
          "from": 10,
          "to": null,
          "text_list": "10 team members",
          "text_subscribe": "10 team members",
          "primary": false,
          "tooltip": null
        }
      ],
      "features": [
        {
          "id": "analytics.detail",
          "label": "Detailed analytics",
          "tooltip": null
        },
        {
          "id": "manage.bulk",
          "label": "Bulk manage",
          "tooltip": "Bulk modify destination, tags"
        },
        {
          "id": "manage.https",
          "label": "Full HTTPS",
          "tooltip": "We will automatically protect all your source hostnames with SSL/TLS certificates and renew them 30 days before expiry."
        },
        {
          "id": "manage.frame",
          "label": "Frame",
          "tooltip": "Using iframe to keep source URL displayed in browser instead of 301 redirect."
        },
        {
          "id": "manage.pathbased",
          "label": "Path-based redirect",
          "tooltip": "Redirect your traffic to different destination according to slug"
        },
        {
          "id": "analytics.basic",
          "label": "Basic analytics",
          "tooltip": null
        }
      ],
      "level": 3
    },
    {
      "id": "short-url-business",
      "label": "Business",
      "badge": null,
      "product": "short-url",
      "product_name": "URL Shortener",
      "parent": null,
      "children": 0,
      "free": false,
      "price": 190,
      "annual_price": 1900,
      "currency": "usd",
      "addons": [],
      "limits": [
        {
          "id": "records",
          "from": 1000000,
          "to": null,
          "text_list": "1000000 links",
          "text_subscribe": "1000000 links",
          "primary": true,
          "tooltip": null
        },
        {
          "id": "visits",
          "from": 50,
          "to": null,
          "text_list": "50 million requests / mo",
          "text_subscribe": "50 million requests / mo",
          "primary": true,
          "tooltip": null
        },
        {
          "id": "hosts",
          "from": 20,
          "to": null,
          "text_list": "20 custom domains",
          "text_subscribe": "20 custom domains",
          "primary": true,
          "tooltip": null
        },
        {
          "id": "members",
          "from": 20,
          "to": null,
          "text_list": "20 team members",
          "text_subscribe": "20 team members",
          "primary": false,
          "tooltip": null
        }
      ],
      "features": [
        {
          "id": "analytics.detail",
          "label": "Detailed analytics",
          "tooltip": null
        },
        {
          "id": "analytics.raw",
          "label": "Raw log export",
          "tooltip": "We can send original http log to your email"
        },
        {
          "id": "analytics.history",
          "label": "More analytics history",
          "tooltip": "Look back over 12 months of basic historical analytics data."
        },
        {
          "id": "manage.bulk",
          "label": "Bulk manage",
          "tooltip": "Bulk modify destination, tags"
        },
        {
          "id": "manage.import",
          "label": "CVS import",
          "tooltip": "Import and export redirects from or to CVS file"
        },
        {
          "id": "manage.tag",
          "label": "Tagging",
          "tooltip": "Make your redirects easier to find, group and organize by adding tags to them."
        },
        {
          "id": "manage.plugins",
          "label": "Security plugins",
          "tooltip": null
        },
        {
          "id": "manage.speedtest",
          "label": "Redirect to the fastest",
          "tooltip": "We run a speed test on each request and redirect to the fastest one"
        },
        {
          "id": "manage.https",
          "label": "Full HTTPS",
          "tooltip": "We will automatically protect all your source hostnames with SSL/TLS certificates and renew them 30 days before expiry."
        },
        {
          "id": "manage.frame",
          "label": "Frame",
          "tooltip": "Using iframe to keep source URL displayed in browser instead of 301 redirect."
        },
        {
          "id": "manage.pathbased",
          "label": "Path-based redirect",
          "tooltip": "Redirect your traffic to different destination according to slug"
        },
        {
          "id": "analytics.basic",
          "label": "Basic analytics",
          "tooltip": null
        }
      ],
      "level": 4
    },
    {
      "id": "short-url-enterprise",
      "label": "Enterprise",
      "badge": null,
      "product": "short-url",
      "product_name": "URL Shortener",
      "parent": null,
      "children": 0,
      "free": false,
      "price": 1000,
      "annual_price": 10000,
      "currency": "usd",
      "addons": [],
      "limits": [
        {
          "id": "records",
          "from": 0,
          "to": null,
          "text_list": "Unlimited links",
          "text_subscribe": "Unlimited links",
          "primary": true,
          "tooltip": null
        },
        {
          "id": "visits",
          "from": 0,
          "to": null,
          "text_list": "Unlimited requests",
          "text_subscribe": "Unlimited requests",
          "primary": true,
          "tooltip": null
        },
        {
          "id": "hosts",
          "from": 0,
          "to": null,
          "text_list": "Unlimited custom domains",
          "text_subscribe": "Unlimited custom domains",
          "primary": true,
          "tooltip": null
        },
        {
          "id": "members",
          "from": 0,
          "to": null,
          "text_list": "Unlimited team members",
          "text_subscribe": "Unlimited team members",
          "primary": false,
          "tooltip": null
        }
      ],
      "features": [
        {
          "id": "support.priority",
          "label": "Priority support",
          "tooltip": null
        },
        {
          "id": "support.invoiced",
          "label": "Invoiced billing",
          "tooltip": "Pay bills via invoice, rather than using a credit card."
        },
        {
          "id": "security.assessment",
          "label": "Security assessment",
          "tooltip": null
        },
        {
          "id": "support.manager",
          "label": "Account Manager",
          "tooltip": null
        },
        {
          "id": "security.private",
          "label": "Private Network",
          "tooltip": "A group of clusters serving for your account only. A dedicated IP will also be assigned."
        },
        {
          "id": "support.sla",
          "label": "100% uptime SLA",
          "tooltip": null
        }
      ],
      "level": 50
    }
  ],
  "comparison": [
    {
      "id": "basic.records",
      "category": "Basic",
      "label": "Links",
      "tooltip": null,
      "type": "param" as const,
      "plans": {
        "short-url-free": {
          "value": "100 links",
          "tooltip": null
        },
        "short-url-basic": {
          "value": "1000-10000 links",
          "tooltip": null
        },
        "short-url-plus": {
          "value": "100000 links",
          "tooltip": null
        },
        "short-url-business": {
          "value": "1000000 links",
          "tooltip": null
        },
        "short-url-enterprise": {
          "value": "Unlimited",
          "tooltip": null
        }
      } as Record<string, { value: string; tooltip: null }>
    }
  ]
};
