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
        "short-url-enterprise": {
          "value": "Unlimited",
          "tooltip": null
        }
      } as Record<string, { value: string | boolean | null; tooltip: null }>
    },
    {
      "id": "basic.hosts",
      "category": "Basic",
      "label": "Custom domains",
      "tooltip": null,
      "type": "param" as const,
      "plans": {
        "short-url-free": {
          "value": "1 custom domains",
          "tooltip": null
        },
        "short-url-basic": {
          "value": "2-5 custom domains",
          "tooltip": null
        },
        "short-url-plus": {
          "value": "10 custom domains",
          "tooltip": null
        },
        "short-url-enterprise": {
          "value": "Unlimited",
          "tooltip": null
        }
      } as Record<string, { value: string | boolean | null; tooltip: null }>
    },
    {
      "id": "basic.visits",
      "category": "Basic",
      "label": "Requests",
      "tooltip": null,
      "type": "param" as const,
      "plans": {
        "short-url-free": {
          "value": "1 million requests / mo",
          "tooltip": null
        },
        "short-url-basic": {
          "value": "1-6 million requests / mo",
          "tooltip": null
        },
        "short-url-plus": {
          "value": "10 million requests / mo",
          "tooltip": null
        },
        "short-url-enterprise": {
          "value": "Unlimited",
          "tooltip": null
        }
      } as Record<string, { value: string | boolean | null; tooltip: null }>
    },
    {
      "id": "basic.members",
      "category": "Basic",
      "label": "Team Members",
      "tooltip": null,
      "type": "param" as const,
      "plans": {
        "short-url-free": {
          "value": "1 team members",
          "tooltip": null
        },
        "short-url-basic": {
          "value": "1 team members",
          "tooltip": null
        },
        "short-url-plus": {
          "value": "10 team members",
          "tooltip": null
        },
        "short-url-enterprise": {
          "value": "Unlimited",
          "tooltip": null
        }
      } as Record<string, { value: string | boolean | null; tooltip: null }>
    },
    {
      "id": "basic.edge",
      "category": "Basic",
      "label": "Global delivery network ",
      "tooltip": null,
      "type": "bool" as const,
      "plans": {
        "short-url-free": {
          "value": true,
          "tooltip": null
        },
        "short-url-basic": {
          "value": true,
          "tooltip": null
        },
        "short-url-plus": {
          "value": true,
          "tooltip": null
        },
        "short-url-enterprise": {
          "value": true,
          "tooltip": null
        }
      } as Record<string, { value: string | boolean | null; tooltip: null }>
    },
    {
      "id": "basic.api",
      "category": "Basic",
      "label": "management API ",
      "tooltip": null,
      "type": "bool" as const,
      "plans": {
        "short-url-free": {
          "value": true,
          "tooltip": null
        },
        "short-url-basic": {
          "value": true,
          "tooltip": null
        },
        "short-url-plus": {
          "value": true,
          "tooltip": null
        },
        "short-url-enterprise": {
          "value": true,
          "tooltip": null
        }
      } as Record<string, { value: string | boolean | null; tooltip: null }>
    },
    {
      "id": "manage.qr",
      "category": "Management",
      "label": "QR codes",
      "tooltip": null,
      "type": "bool" as const,
      "plans": {
        "short-url-free": {
          "value": true,
          "tooltip": null
        },
        "short-url-basic": {
          "value": true,
          "tooltip": null
        },
        "short-url-plus": {
          "value": true,
          "tooltip": null
        },
        "short-url-enterprise": {
          "value": true,
          "tooltip": null
        }
      } as Record<string, { value: string | boolean | null; tooltip: null }>
    },
    {
      "id": "manage.idn",
      "category": "Management",
      "label": "IDN domains support",
      "tooltip": null,
      "type": "bool" as const,
      "plans": {
        "short-url-free": {
          "value": true,
          "tooltip": null
        },
        "short-url-basic": {
          "value": true,
          "tooltip": null
        },
        "short-url-plus": {
          "value": true,
          "tooltip": null
        },
        "short-url-enterprise": {
          "value": true,
          "tooltip": null
        }
      } as Record<string, { value: string | boolean | null; tooltip: null }>
    },
    {
      "id": "manage.3012",
      "category": "Management",
      "label": "301, 302 redirects",
      "tooltip": null,
      "type": "bool" as const,
      "plans": {
        "short-url-free": {
          "value": true,
          "tooltip": null
        },
        "short-url-basic": {
          "value": true,
          "tooltip": null
        },
        "short-url-plus": {
          "value": true,
          "tooltip": null
        },
        "short-url-enterprise": {
          "value": true,
          "tooltip": null
        }
      } as Record<string, { value: string | boolean | null; tooltip: null }>
    },
    {
      "id": "manage.3078",
      "category": "Management",
      "label": "307, 308 redirects",
      "tooltip": null,
      "type": "bool" as const,
      "plans": {
        "short-url-free": {
          "value": true,
          "tooltip": null
        },
        "short-url-basic": {
          "value": true,
          "tooltip": null
        },
        "short-url-plus": {
          "value": true,
          "tooltip": null
        },
        "short-url-enterprise": {
          "value": true,
          "tooltip": null
        }
      } as Record<string, { value: string | boolean | null; tooltip: null }>
    },
    {
      "id": "manage.txt",
      "category": "Management",
      "label": "Custom HTML",
      "tooltip": "Response custom HTML code instead of 301 redirect.",
      "type": "bool" as const,
      "plans": {
        "short-url-free": {
          "value": false,
          "tooltip": null
        },
        "short-url-basic": {
          "value": false,
          "tooltip": null
        },
        "short-url-plus": {
          "value": false,
          "tooltip": null
        },
        "short-url-enterprise": {
          "value": true,
          "tooltip": null
        }
      } as Record<string, { value: string | boolean | null; tooltip: null }>
    },
    {
      "id": "manage.modify",
      "category": "Management",
      "label": "Change target any time",
      "tooltip": null,
      "type": "bool" as const,
      "plans": {
        "short-url-free": {
          "value": true,
          "tooltip": null
        },
        "short-url-basic": {
          "value": true,
          "tooltip": null
        },
        "short-url-plus": {
          "value": true,
          "tooltip": null
        },
        "short-url-enterprise": {
          "value": true,
          "tooltip": null
        }
      } as Record<string, { value: string | boolean | null; tooltip: null }>
    },
    {
      "id": "manage.tag",
      "category": "Management",
      "label": "Tagging",
      "tooltip": "Make your redirects easier to find, group and organize by adding tags to them.",
      "type": "bool" as const,
      "plans": {
        "short-url-free": {
          "value": false,
          "tooltip": null
        },
        "short-url-basic": {
          "value": false,
          "tooltip": null
        },
        "short-url-plus": {
          "value": false,
          "tooltip": null
        },
        "short-url-enterprise": {
          "value": true,
          "tooltip": null
        }
      } as Record<string, { value: string | boolean | null; tooltip: null }>
    },
    {
      "id": "manage.bulk",
      "category": "Management",
      "label": "Bulk manage",
      "tooltip": "Bulk modify destination, tags",
      "type": "bool" as const,
      "plans": {
        "short-url-free": {
          "value": false,
          "tooltip": null
        },
        "short-url-basic": {
          "value": false,
          "tooltip": null
        },
        "short-url-plus": {
          "value": true,
          "tooltip": null
        },
        "short-url-enterprise": {
          "value": true,
          "tooltip": null
        }
      } as Record<string, { value: string | boolean | null; tooltip: null }>
    },
    {
      "id": "manage.import",
      "category": "Management",
      "label": "CVS import",
      "tooltip": "Import and export redirects from or to CVS file",
      "type": "bool" as const,
      "plans": {
        "short-url-free": {
          "value": false,
          "tooltip": null
        },
        "short-url-basic": {
          "value": false,
          "tooltip": null
        },
        "short-url-plus": {
          "value": false,
          "tooltip": null
        },
        "short-url-enterprise": {
          "value": true,
          "tooltip": null
        }
      } as Record<string, { value: string | boolean | null; tooltip: null }>
    },
    {
      "id": "manage.export",
      "category": "Management",
      "label": "CVS export",
      "tooltip": null,
      "type": "bool" as const,
      "plans": {
        "short-url-free": {
          "value": true,
          "tooltip": null
        },
        "short-url-basic": {
          "value": true,
          "tooltip": null
        },
        "short-url-plus": {
          "value": true,
          "tooltip": null
        },
        "short-url-enterprise": {
          "value": true,
          "tooltip": null
        }
      } as Record<string, { value: string | boolean | null; tooltip: null }>
    },
    {
      "id": "manage.https",
      "category": "Management",
      "label": "Full HTTPS",
      "tooltip": "We will automatically protect all your source hostnames with SSL/TLS certificates and renew them 30 days before expiry.",
      "type": "bool" as const,
      "plans": {
        "short-url-free": {
          "value": true,
          "tooltip": null
        },
        "short-url-basic": {
          "value": true,
          "tooltip": null
        },
        "short-url-plus": {
          "value": true,
          "tooltip": null
        },
        "short-url-enterprise": {
          "value": true,
          "tooltip": null
        }
      } as Record<string, { value: string | boolean | null; tooltip: null }>
    },
    {
      "id": "manage.speedtest",
      "category": "Management",
      "label": "Redirect to the fastest",
      "tooltip": "We run a speed test on each request and redirect to the fastest one",
      "type": "bool" as const,
      "plans": {
        "short-url-free": {
          "value": false,
          "tooltip": null
        },
        "short-url-basic": {
          "value": false,
          "tooltip": null
        },
        "short-url-plus": {
          "value": false,
          "tooltip": null
        },
        "short-url-enterprise": {
          "value": true,
          "tooltip": null
        }
      } as Record<string, { value: string | boolean | null; tooltip: null }>
    },
    {
      "id": "manage.plugins",
      "category": "Management",
      "label": "Security plugins",
      "tooltip": null,
      "type": "bool" as const,
      "plans": {
        "short-url-free": {
          "value": false,
          "tooltip": null
        },
        "short-url-basic": {
          "value": false,
          "tooltip": null
        },
        "short-url-plus": {
          "value": false,
          "tooltip": null
        },
        "short-url-enterprise": {
          "value": true,
          "tooltip": null
        }
      } as Record<string, { value: string | boolean | null; tooltip: null }>
    },
    {
      "id": "manage.upload-ssl",
      "category": "Management",
      "label": "Upload custom SSL",
      "tooltip": null,
      "type": "bool" as const,
      "plans": {
        "short-url-free": {
          "value": false,
          "tooltip": null
        },
        "short-url-basic": {
          "value": false,
          "tooltip": null
        },
        "short-url-plus": {
          "value": false,
          "tooltip": null
        },
        "short-url-enterprise": {
          "value": true,
          "tooltip": null
        }
      } as Record<string, { value: string | boolean | null; tooltip: null }>
    },
    {
      "id": "analytics.basic",
      "category": "Analytics",
      "label": "Basic analytics",
      "tooltip": null,
      "type": "bool" as const,
      "plans": {
        "short-url-free": {
          "value": false,
          "tooltip": null
        },
        "short-url-basic": {
          "value": true,
          "tooltip": null
        },
        "short-url-plus": {
          "value": true,
          "tooltip": null
        },
        "short-url-enterprise": {
          "value": true,
          "tooltip": null
        }
      } as Record<string, { value: string | boolean | null; tooltip: null }>
    },
    {
      "id": "analytics.detail",
      "category": "Analytics",
      "label": "Detailed analytics",
      "tooltip": null,
      "type": "bool" as const,
      "plans": {
        "short-url-free": {
          "value": false,
          "tooltip": null
        },
        "short-url-basic": {
          "value": false,
          "tooltip": null
        },
        "short-url-plus": {
          "value": true,
          "tooltip": null
        },
        "short-url-enterprise": {
          "value": true,
          "tooltip": null
        }
      } as Record<string, { value: string | boolean | null; tooltip: null }>
    },
    {
      "id": "analytics.raw",
      "category": "Analytics",
      "label": "Raw log export",
      "tooltip": "We can send original http log to your email",
      "type": "bool" as const,
      "plans": {
        "short-url-free": {
          "value": false,
          "tooltip": null
        },
        "short-url-basic": {
          "value": false,
          "tooltip": null
        },
        "short-url-plus": {
          "value": false,
          "tooltip": null
        },
        "short-url-enterprise": {
          "value": true,
          "tooltip": null
        }
      } as Record<string, { value: string | boolean | null; tooltip: null }>
    },
    {
      "id": "analytics.history",
      "category": "Analytics",
      "label": "More analytics history",
      "tooltip": "Look back over 12 months of basic historical analytics data.",
      "type": "text" as const,
      "plans": {
        "short-url-free": {
          "value": null,
          "tooltip": null
        },
        "short-url-basic": {
          "value": null,
          "tooltip": null
        },
        "short-url-plus": {
          "value": null,
          "tooltip": null
        },
        "short-url-enterprise": {
          "value": null,
          "tooltip": null
        }
      } as Record<string, { value: string | boolean | null; tooltip: null }>
    },
    {
      "id": "analytics.email",
      "category": "Analytics",
      "label": "Emailed reports ",
      "tooltip": null,
      "type": "bool" as const,
      "plans": {
        "short-url-free": {
          "value": false,
          "tooltip": null
        },
        "short-url-basic": {
          "value": false,
          "tooltip": null
        },
        "short-url-plus": {
          "value": false,
          "tooltip": null
        },
        "short-url-enterprise": {
          "value": true,
          "tooltip": null
        }
      } as Record<string, { value: string | boolean | null; tooltip: null }>
    },
    {
      "id": "security.encryption",
      "category": "Security & Compliance",
      "label": "Data encryption at rest/in transit ",
      "tooltip": null,
      "type": "bool" as const,
      "plans": {
        "short-url-free": {
          "value": true,
          "tooltip": null
        },
        "short-url-basic": {
          "value": true,
          "tooltip": null
        },
        "short-url-plus": {
          "value": true,
          "tooltip": null
        },
        "short-url-enterprise": {
          "value": true,
          "tooltip": null
        }
      } as Record<string, { value: string | boolean | null; tooltip: null }>
    },
    {
      "id": "security.2fs",
      "category": "Security & Compliance",
      "label": "Two-factor authentication ",
      "tooltip": null,
      "type": "bool" as const,
      "plans": {
        "short-url-free": {
          "value": true,
          "tooltip": null
        },
        "short-url-basic": {
          "value": true,
          "tooltip": null
        },
        "short-url-plus": {
          "value": true,
          "tooltip": null
        },
        "short-url-enterprise": {
          "value": true,
          "tooltip": null
        }
      } as Record<string, { value: string | boolean | null; tooltip: null }>
    },
    {
      "id": "security.sso",
      "category": "Security & Compliance",
      "label": "SAML single sign-on",
      "tooltip": null,
      "type": "bool" as const,
      "plans": {
        "short-url-free": {
          "value": false,
          "tooltip": null
        },
        "short-url-basic": {
          "value": false,
          "tooltip": null
        },
        "short-url-plus": {
          "value": false,
          "tooltip": null
        },
        "short-url-enterprise": {
          "value": true,
          "tooltip": null
        }
      } as Record<string, { value: string | boolean | null; tooltip: null }>
    },
    {
      "id": "security.assessment",
      "category": "Security & Compliance",
      "label": "Security assessment",
      "tooltip": null,
      "type": "bool" as const,
      "plans": {
        "short-url-free": {
          "value": false,
          "tooltip": null
        },
        "short-url-basic": {
          "value": false,
          "tooltip": null
        },
        "short-url-plus": {
          "value": false,
          "tooltip": null
        },
        "short-url-enterprise": {
          "value": true,
          "tooltip": null
        }
      } as Record<string, { value: string | boolean | null; tooltip: null }>
    },
    {
      "id": "support.email",
      "category": "Support",
      "label": "Email Support",
      "tooltip": null,
      "type": "bool" as const,
      "plans": {
        "short-url-free": {
          "value": true,
          "tooltip": null
        },
        "short-url-basic": {
          "value": true,
          "tooltip": null
        },
        "short-url-plus": {
          "value": true,
          "tooltip": null
        },
        "short-url-enterprise": {
          "value": true,
          "tooltip": null
        }
      } as Record<string, { value: string | boolean | null; tooltip: null }>
    },
    {
      "id": "support.livechat",
      "category": "Support",
      "label": "Live chat",
      "tooltip": null,
      "type": "bool" as const,
      "plans": {
        "short-url-free": {
          "value": true,
          "tooltip": null
        },
        "short-url-basic": {
          "value": true,
          "tooltip": null
        },
        "short-url-plus": {
          "value": true,
          "tooltip": null
        },
        "short-url-enterprise": {
          "value": true,
          "tooltip": null
        }
      } as Record<string, { value: string | boolean | null; tooltip: null }>
    },
    {
      "id": "support.sla",
      "category": "Support",
      "label": "100% uptime SLA",
      "tooltip": null,
      "type": "bool" as const,
      "plans": {
        "short-url-free": {
          "value": false,
          "tooltip": null
        },
        "short-url-basic": {
          "value": false,
          "tooltip": null
        },
        "short-url-plus": {
          "value": false,
          "tooltip": null
        },
        "short-url-enterprise": {
          "value": true,
          "tooltip": null
        }
      } as Record<string, { value: string | boolean | null; tooltip: null }>
    },
    {
      "id": "support.email-sla",
      "category": "Support",
      "label": "Email Support SLA",
      "tooltip": null,
      "type": "bool" as const,
      "plans": {
        "short-url-free": {
          "value": false,
          "tooltip": null
        },
        "short-url-basic": {
          "value": false,
          "tooltip": null
        },
        "short-url-plus": {
          "value": false,
          "tooltip": null
        },
        "short-url-enterprise": {
          "value": true,
          "tooltip": null
        }
      } as Record<string, { value: string | boolean | null; tooltip: null }>
    },
    {
      "id": "support.onboarding",
      "category": "Support",
      "label": "Onboarding Support",
      "tooltip": null,
      "type": "bool" as const,
      "plans": {
        "short-url-free": {
          "value": false,
          "tooltip": null
        },
        "short-url-basic": {
          "value": false,
          "tooltip": null
        },
        "short-url-plus": {
          "value": false,
          "tooltip": null
        },
        "short-url-enterprise": {
          "value": true,
          "tooltip": null
        }
      } as Record<string, { value: string | boolean | null; tooltip: null }>
    },
    {
      "id": "support.manager",
      "category": "Support",
      "label": "Account Manager",
      "tooltip": null,
      "type": "bool" as const,
      "plans": {
        "short-url-free": {
          "value": false,
          "tooltip": null
        },
        "short-url-basic": {
          "value": false,
          "tooltip": null
        },
        "short-url-plus": {
          "value": false,
          "tooltip": null
        },
        "short-url-enterprise": {
          "value": true,
          "tooltip": null
        }
      } as Record<string, { value: string | boolean | null; tooltip: null }>
    }
  ]
};
