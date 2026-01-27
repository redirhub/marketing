export interface RedirectLimit {
  id: string;
  from: number;
  to: number | null;
  text_list: string;
  text_subscribe: string;
  primary: boolean;
  tooltip: string | null;
}

export interface RedirectFeature {
  id: string;
  label: string;
  tooltip: string | null;
}

export interface RedirectAddon {
  code: string;
  type: string;
  metric_1: number;
  metric_2: number | null;
  metric_3: number | null;
  limits: Record<string, number>;
  price: number;
  annual_price: number;
}

export interface RedirectPlan {
  id: string;
  label: string;
  badge: string | null;
  product: string;
  product_name: string;
  parent: string | null;
  children: number;
  free: boolean;
  price: number;
  annual_price: number;
  currency: string;
  addons: RedirectAddon[];
  limits: RedirectLimit[];
  features: RedirectFeature[];
  level: number;
}

export interface ComparisonPlanValue {
  value: string | boolean | null;
  tooltip: string | null;
}

export interface ComparisonRow {
  id: string;
  category: string;
  label: string;
  tooltip: string | null;
  type: "param" | "bool" | "text";
  plans: Record<string, ComparisonPlanValue>;
}

export interface RedirectData {
  plans: RedirectPlan[];
  comparison: ComparisonRow[];
}

export const redirectData: RedirectData = {
  "plans": [
    {
      "id": "redirect-free",
      "label": "Free",
      "badge": null,
      "product": "redirect",
      "product_name": "Redirect",
      "parent": null,
      "children": 0,
      "free": true,
      "price": 0,
      "annual_price": 0,
      "currency": "usd",
      "addons": [],
      "limits": [
        {
          "id": "hosts",
          "from": 5,
          "to": null,
          "text_list": "5 source domains",
          "text_subscribe": "5 source domains",
          "primary": true,
          "tooltip": "with www sub-domains included"
        },
        {
          "id": "visits",
          "from": 0.1,
          "to": null,
          "text_list": "0.1 million requests / mo",
          "text_subscribe": "0.1 million requests / mo",
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
      "id": "redirect-basic",
      "label": "Basic",
      "badge": null,
      "product": "redirect",
      "product_name": "Redirect",
      "parent": null,
      "children": 2,
      "free": false,
      "price": 10,
      "annual_price": 100,
      "currency": "usd",
      "addons": [
        {
          "code": "redirect-basic-hostnames-50",
          "type": "hostnames",
          "metric_1": 50,
          "metric_2": 50,
          "metric_3": null,
          "limits": {
            "hosts": 50,
            "records": 50
          },
          "price": 15,
          "annual_price": 150
        },
        {
          "code": "redirect-basic-hostnames-100",
          "type": "hostnames",
          "metric_1": 100,
          "metric_2": 100,
          "metric_3": null,
          "limits": {
            "hosts": 100,
            "records": 100
          },
          "price": 40,
          "annual_price": 400
        }
      ],
      "limits": [
        {
          "id": "hosts",
          "from": 15,
          "to": 100,
          "text_list": "15-100 source domains",
          "text_subscribe": "15 source domains",
          "primary": true,
          "tooltip": "with www sub-domains included"
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
      "id": "redirect-pro",
      "label": "Pro",
      "badge": "Popular",
      "product": "redirect",
      "product_name": "Redirect",
      "parent": null,
      "children": 0,
      "free": false,
      "price": 30,
      "annual_price": 300,
      "currency": "usd",
      "addons": [
        {
          "code": "redirect-pro-hostnames-25",
          "type": "hostnames",
          "metric_1": 25,
          "metric_2": null,
          "metric_3": null,
          "limits": {
            "hosts": 25
          },
          "price": 15,
          "annual_price": 150
        },
        {
          "code": "redirect-pro-hostnames-50",
          "type": "hostnames",
          "metric_1": 50,
          "metric_2": null,
          "metric_3": null,
          "limits": {
            "hosts": 50
          },
          "price": 30,
          "annual_price": 300
        },
        {
          "code": "redirect-pro-hostnames-100",
          "type": "hostnames",
          "metric_1": 100,
          "metric_2": null,
          "metric_3": null,
          "limits": {
            "hosts": 100
          },
          "price": 40,
          "annual_price": 400
        },
        {
          "code": "redirect-pro-hostnames-250",
          "type": "hostnames",
          "metric_1": 250,
          "metric_2": null,
          "metric_3": null,
          "limits": {
            "hosts": 250
          },
          "price": 75,
          "annual_price": 750
        },
        {
          "code": "redirect-pro-hostnames-500",
          "type": "hostnames",
          "metric_1": 500,
          "metric_2": null,
          "metric_3": null,
          "limits": {
            "hosts": 500
          },
          "price": 115,
          "annual_price": 1150
        },
        {
          "code": "redirect-pro-hostnames-1000",
          "type": "hostnames",
          "metric_1": 1000,
          "metric_2": null,
          "metric_3": null,
          "limits": {
            "hosts": 1000
          },
          "price": 170,
          "annual_price": 1700
        },
        {
          "code": "redirect-pro-hostnames-2500",
          "type": "hostnames",
          "metric_1": 2500,
          "metric_2": null,
          "metric_3": null,
          "limits": {
            "hosts": 2500
          },
          "price": 245,
          "annual_price": 2450
        },
        {
          "code": "redirect-pro-hostnames-5000",
          "type": "hostnames",
          "metric_1": 5000,
          "metric_2": null,
          "metric_3": null,
          "limits": {
            "hosts": 5000
          },
          "price": 375,
          "annual_price": 3750
        },
        {
          "code": "redirect-pro-hostnames-10000",
          "type": "hostnames",
          "metric_1": 10000,
          "metric_2": null,
          "metric_3": null,
          "limits": {
            "hosts": 10000
          },
          "price": 580,
          "annual_price": 5800
        },
        {
          "code": "redirect-pro-hostnames-15000",
          "type": "hostnames",
          "metric_1": 15000,
          "metric_2": null,
          "metric_3": null,
          "limits": {
            "hosts": 15000
          },
          "price": 680,
          "annual_price": 6800
        },
        {
          "code": "redirect-pro-hostnames-25000",
          "type": "hostnames",
          "metric_1": 25000,
          "metric_2": null,
          "metric_3": null,
          "limits": {
            "hosts": 25000
          },
          "price": 880,
          "annual_price": 8800
        },
        {
          "code": "redirect-pro-hostnames-50000",
          "type": "hostnames",
          "metric_1": 50000,
          "metric_2": null,
          "metric_3": null,
          "limits": {
            "hosts": 50000
          },
          "price": 1320,
          "annual_price": 13200
        }
      ],
      "limits": [
        {
          "id": "hosts",
          "from": 15,
          "to": null,
          "text_list": "15 source domains",
          "text_subscribe": "15 source domains",
          "primary": true,
          "tooltip": "with www sub-domains included"
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
          "id": "manage.multi-dest",
          "label": "Multiple destinations",
          "tooltip": "Redirect to multiple destinations randomly or sequentially."
        },
        {
          "id": "manage.frame",
          "label": "Frame",
          "tooltip": "Using iframe to keep source URL displayed in browser instead of 301 redirect."
        },
        {
          "id": "manage.txt",
          "label": "Custom HTML",
          "tooltip": "Response custom HTML code instead of 301 redirect."
        },
        {
          "id": "manage.wildcards",
          "label": "Wildcards domain",
          "tooltip": "Configure catch all subdomains redirect to redirect all traffics from different hosts"
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
      "level": 2
    },
    {
      "id": "redirect-enterprise",
      "label": "Enterprise",
      "badge": null,
      "product": "redirect",
      "product_name": "Redirect",
      "parent": null,
      "children": 0,
      "free": false,
      "price": 1000,
      "annual_price": 10000,
      "currency": "usd",
      "addons": [],
      "limits": [
        {
          "id": "hosts",
          "from": 0,
          "to": null,
          "text_list": "Unlimited source domains",
          "text_subscribe": "Unlimited source domains",
          "primary": true,
          "tooltip": "with www sub-domains included"
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
      "label": "Redirects",
      "tooltip": null,
      "type": "param",
      "plans": {
        "redirect-free": {
          "value": "5 source urls",
          "tooltip": null
        },
        "redirect-basic": {
          "value": "15-100 source urls",
          "tooltip": null
        },
        "redirect-pro": {
          "value": "Unlimited",
          "tooltip": null
        },
        "redirect-enterprise": {
          "value": "Unlimited",
          "tooltip": null
        }
      }
    },
    {
      "id": "basic.hosts",
      "category": "Basic",
      "label": "Source Hosts",
      "tooltip": "with www sub-domains included",
      "type": "param",
      "plans": {
        "redirect-free": {
          "value": "2 source domains",
          "tooltip": null
        },
        "redirect-basic": {
          "value": "15-100 source domains",
          "tooltip": null
        },
        "redirect-pro": {
          "value": "15 source domains",
          "tooltip": null
        },
        "redirect-enterprise": {
          "value": "Unlimited",
          "tooltip": null
        }
      }
    },
    {
      "id": "basic.visits",
      "category": "Basic",
      "label": "Requests",
      "tooltip": null,
      "type": "param",
      "plans": {
        "redirect-free": {
          "value": "0.1 million requests / mo",
          "tooltip": null
        },
        "redirect-basic": {
          "value": "1-6 million requests / mo",
          "tooltip": null
        },
        "redirect-pro": {
          "value": "Unlimited",
          "tooltip": null
        },
        "redirect-enterprise": {
          "value": "Unlimited",
          "tooltip": null
        }
      }
    },
    {
      "id": "basic.members",
      "category": "Basic",
      "label": "Team Members",
      "tooltip": null,
      "type": "param",
      "plans": {
        "redirect-free": {
          "value": "1 team members",
          "tooltip": null
        },
        "redirect-basic": {
          "value": "1 team members",
          "tooltip": null
        },
        "redirect-pro": {
          "value": "Unlimited",
          "tooltip": null
        },
        "redirect-enterprise": {
          "value": "Unlimited",
          "tooltip": null
        }
      }
    },
    {
      "id": "basic.edge",
      "category": "Basic",
      "label": "Global delivery network ",
      "tooltip": null,
      "type": "bool",
      "plans": {
        "redirect-free": {
          "value": true,
          "tooltip": null
        },
        "redirect-basic": {
          "value": true,
          "tooltip": null
        },
        "redirect-pro": {
          "value": true,
          "tooltip": null
        },
        "redirect-enterprise": {
          "value": true,
          "tooltip": null
        }
      }
    },
    {
      "id": "basic.api",
      "category": "Basic",
      "label": "management API ",
      "tooltip": null,
      "type": "bool",
      "plans": {
        "redirect-free": {
          "value": true,
          "tooltip": null
        },
        "redirect-basic": {
          "value": true,
          "tooltip": null
        },
        "redirect-pro": {
          "value": true,
          "tooltip": null
        },
        "redirect-enterprise": {
          "value": true,
          "tooltip": null
        }
      }
    },
    {
      "id": "manage.https",
      "category": "Management",
      "label": "Full HTTPS",
      "tooltip": "We will automatically protect all your source hostnames with SSL/TLS certificates and renew them 30 days before expiry.",
      "type": "bool",
      "plans": {
        "redirect-free": {
          "value": true,
          "tooltip": null
        },
        "redirect-basic": {
          "value": true,
          "tooltip": null
        },
        "redirect-pro": {
          "value": true,
          "tooltip": null
        },
        "redirect-enterprise": {
          "value": true,
          "tooltip": null
        }
      }
    },
    {
      "id": "manage.qr",
      "category": "Management",
      "label": "QR codes",
      "tooltip": null,
      "type": "bool",
      "plans": {
        "redirect-free": {
          "value": true,
          "tooltip": null
        },
        "redirect-basic": {
          "value": true,
          "tooltip": null
        },
        "redirect-pro": {
          "value": true,
          "tooltip": null
        },
        "redirect-enterprise": {
          "value": true,
          "tooltip": null
        }
      }
    },
    {
      "id": "manage.idn",
      "category": "Management",
      "label": "IDN domains support",
      "tooltip": null,
      "type": "bool",
      "plans": {
        "redirect-free": {
          "value": true,
          "tooltip": null
        },
        "redirect-basic": {
          "value": true,
          "tooltip": null
        },
        "redirect-pro": {
          "value": true,
          "tooltip": null
        },
        "redirect-enterprise": {
          "value": true,
          "tooltip": null
        }
      }
    },
    {
      "id": "manage.3012",
      "category": "Management",
      "label": "301, 302 redirects",
      "tooltip": null,
      "type": "bool",
      "plans": {
        "redirect-free": {
          "value": true,
          "tooltip": null
        },
        "redirect-basic": {
          "value": true,
          "tooltip": null
        },
        "redirect-pro": {
          "value": true,
          "tooltip": null
        },
        "redirect-enterprise": {
          "value": true,
          "tooltip": null
        }
      }
    },
    {
      "id": "manage.3078",
      "category": "Management",
      "label": "307, 308 redirects",
      "tooltip": null,
      "type": "bool",
      "plans": {
        "redirect-free": {
          "value": true,
          "tooltip": null
        },
        "redirect-basic": {
          "value": true,
          "tooltip": null
        },
        "redirect-pro": {
          "value": true,
          "tooltip": null
        },
        "redirect-enterprise": {
          "value": true,
          "tooltip": null
        }
      }
    },
    {
      "id": "manage.frame",
      "category": "Management",
      "label": "Frame",
      "tooltip": "Using iframe to keep source URL displayed in browser instead of 301 redirect.",
      "type": "bool",
      "plans": {
        "redirect-free": {
          "value": true,
          "tooltip": null
        },
        "redirect-basic": {
          "value": true,
          "tooltip": null
        },
        "redirect-pro": {
          "value": true,
          "tooltip": null
        },
        "redirect-enterprise": {
          "value": true,
          "tooltip": null
        }
      }
    },
    {
      "id": "manage.txt",
      "category": "Management",
      "label": "Custom HTML",
      "tooltip": "Response custom HTML code instead of 301 redirect.",
      "type": "bool",
      "plans": {
        "redirect-free": {
          "value": false,
          "tooltip": null
        },
        "redirect-basic": {
          "value": false,
          "tooltip": null
        },
        "redirect-pro": {
          "value": true,
          "tooltip": null
        },
        "redirect-enterprise": {
          "value": true,
          "tooltip": null
        }
      }
    },
    {
      "id": "manage.fwd-path",
      "category": "Management",
      "label": "Path forwarding ",
      "tooltip": "Path forwarding copies the path from the requested URL and appends it to the target URL",
      "type": "bool",
      "plans": {
        "redirect-free": {
          "value": true,
          "tooltip": null
        },
        "redirect-basic": {
          "value": true,
          "tooltip": null
        },
        "redirect-pro": {
          "value": true,
          "tooltip": null
        },
        "redirect-enterprise": {
          "value": true,
          "tooltip": null
        }
      }
    },
    {
      "id": "manage.fwd-query",
      "category": "Management",
      "label": "Query parameter forwarding",
      "tooltip": "Query parameter forwarding copies the query parameters from the requested URL and appends them to the target URL.",
      "type": "bool",
      "plans": {
        "redirect-free": {
          "value": true,
          "tooltip": null
        },
        "redirect-basic": {
          "value": true,
          "tooltip": null
        },
        "redirect-pro": {
          "value": true,
          "tooltip": null
        },
        "redirect-enterprise": {
          "value": true,
          "tooltip": null
        }
      }
    },
    {
      "id": "manage.multi-dest",
      "category": "Management",
      "label": "Multiple destinations",
      "tooltip": "Redirect to multiple destinations randomly or sequentially.",
      "type": "bool",
      "plans": {
        "redirect-free": {
          "value": false,
          "tooltip": null
        },
        "redirect-basic": {
          "value": false,
          "tooltip": null
        },
        "redirect-pro": {
          "value": true,
          "tooltip": null
        },
        "redirect-enterprise": {
          "value": true,
          "tooltip": null
        }
      }
    },
    {
      "id": "manage.modify",
      "category": "Management",
      "label": "Change target any time",
      "tooltip": null,
      "type": "bool",
      "plans": {
        "redirect-free": {
          "value": true,
          "tooltip": null
        },
        "redirect-basic": {
          "value": true,
          "tooltip": null
        },
        "redirect-pro": {
          "value": true,
          "tooltip": null
        },
        "redirect-enterprise": {
          "value": true,
          "tooltip": null
        }
      }
    },
    {
      "id": "manage.tag",
      "category": "Management",
      "label": "Tagging",
      "tooltip": "Make your redirects easier to find, group and organize by adding tags to them.",
      "type": "bool",
      "plans": {
        "redirect-free": {
          "value": false,
          "tooltip": null
        },
        "redirect-basic": {
          "value": false,
          "tooltip": null
        },
        "redirect-pro": {
          "value": true,
          "tooltip": null
        },
        "redirect-enterprise": {
          "value": true,
          "tooltip": null
        }
      }
    },
    {
      "id": "manage.pathbased",
      "category": "Management",
      "label": "Path-based redirect",
      "tooltip": "Redirect your traffic to different destination according to slug",
      "type": "bool",
      "plans": {
        "redirect-free": {
          "value": true,
          "tooltip": null
        },
        "redirect-basic": {
          "value": true,
          "tooltip": null
        },
        "redirect-pro": {
          "value": true,
          "tooltip": null
        },
        "redirect-enterprise": {
          "value": true,
          "tooltip": null
        }
      }
    },
    {
      "id": "manage.bulk",
      "category": "Management",
      "label": "Bulk manage",
      "tooltip": "Bulk modify destination, tags",
      "type": "bool",
      "plans": {
        "redirect-free": {
          "value": false,
          "tooltip": null
        },
        "redirect-basic": {
          "value": false,
          "tooltip": null
        },
        "redirect-pro": {
          "value": true,
          "tooltip": null
        },
        "redirect-enterprise": {
          "value": true,
          "tooltip": null
        }
      }
    },
    {
      "id": "manage.cname",
      "category": "Management",
      "label": "CNAME",
      "tooltip": "Point your domain to our network using CNAME",
      "type": "bool",
      "plans": {
        "redirect-free": {
          "value": true,
          "tooltip": null
        },
        "redirect-basic": {
          "value": true,
          "tooltip": null
        },
        "redirect-pro": {
          "value": true,
          "tooltip": null
        },
        "redirect-enterprise": {
          "value": true,
          "tooltip": null
        }
      }
    },
    {
      "id": "manage.nameservers",
      "category": "Management",
      "label": "Nameservers",
      "tooltip": "Point your domain to our network using Nameservers",
      "type": "bool",
      "plans": {
        "redirect-free": {
          "value": false,
          "tooltip": null
        },
        "redirect-basic": {
          "value": false,
          "tooltip": null
        },
        "redirect-pro": {
          "value": false,
          "tooltip": null
        },
        "redirect-enterprise": {
          "value": true,
          "tooltip": null
        }
      }
    },
    {
      "id": "manage.import",
      "category": "Management",
      "label": "CVS import",
      "tooltip": "Import and export redirects from or to CVS file",
      "type": "bool",
      "plans": {
        "redirect-free": {
          "value": false,
          "tooltip": null
        },
        "redirect-basic": {
          "value": false,
          "tooltip": null
        },
        "redirect-pro": {
          "value": true,
          "tooltip": null
        },
        "redirect-enterprise": {
          "value": true,
          "tooltip": null
        }
      }
    },
    {
      "id": "manage.export",
      "category": "Management",
      "label": "CVS export",
      "tooltip": null,
      "type": "bool",
      "plans": {
        "redirect-free": {
          "value": true,
          "tooltip": null
        },
        "redirect-basic": {
          "value": true,
          "tooltip": null
        },
        "redirect-pro": {
          "value": true,
          "tooltip": null
        },
        "redirect-enterprise": {
          "value": true,
          "tooltip": null
        }
      }
    },
    {
      "id": "manage.wildcards",
      "category": "Management",
      "label": "Wildcards domain",
      "tooltip": "Configure catch all subdomains redirect to redirect all traffics from different hosts",
      "type": "bool",
      "plans": {
        "redirect-free": {
          "value": false,
          "tooltip": null
        },
        "redirect-basic": {
          "value": false,
          "tooltip": null
        },
        "redirect-pro": {
          "value": true,
          "tooltip": null
        },
        "redirect-enterprise": {
          "value": true,
          "tooltip": null
        }
      }
    },
    {
      "id": "manage.wildcard-ssl",
      "category": "Management",
      "label": "Wildcard Certificate",
      "tooltip": "Issue a certificate on *.domain.com instead of certificate on each subdomain",
      "type": "bool",
      "plans": {
        "redirect-free": {
          "value": false,
          "tooltip": null
        },
        "redirect-basic": {
          "value": false,
          "tooltip": null
        },
        "redirect-pro": {
          "value": false,
          "tooltip": null
        },
        "redirect-enterprise": {
          "value": true,
          "tooltip": null
        }
      }
    },
    {
      "id": "manage.speedtest",
      "category": "Management",
      "label": "Redirect to the fastest",
      "tooltip": "We run a speed test on each request and redirect to the fastest one",
      "type": "bool",
      "plans": {
        "redirect-free": {
          "value": false,
          "tooltip": null
        },
        "redirect-basic": {
          "value": false,
          "tooltip": null
        },
        "redirect-pro": {
          "value": true,
          "tooltip": null
        },
        "redirect-enterprise": {
          "value": true,
          "tooltip": null
        }
      }
    },
    {
      "id": "manage.plugins",
      "category": "Management",
      "label": "Security plugins",
      "tooltip": null,
      "type": "bool",
      "plans": {
        "redirect-free": {
          "value": false,
          "tooltip": null
        },
        "redirect-basic": {
          "value": false,
          "tooltip": null
        },
        "redirect-pro": {
          "value": true,
          "tooltip": null
        },
        "redirect-enterprise": {
          "value": true,
          "tooltip": null
        }
      }
    },
    {
      "id": "manage.upload-ssl",
      "category": "Management",
      "label": "Upload custom SSL",
      "tooltip": null,
      "type": "bool",
      "plans": {
        "redirect-free": {
          "value": false,
          "tooltip": null
        },
        "redirect-basic": {
          "value": false,
          "tooltip": null
        },
        "redirect-pro": {
          "value": false,
          "tooltip": null
        },
        "redirect-enterprise": {
          "value": true,
          "tooltip": null
        }
      }
    },
    {
      "id": "analytics.basic",
      "category": "Analytics",
      "label": "Basic analytics",
      "tooltip": null,
      "type": "bool",
      "plans": {
        "redirect-free": {
          "value": false,
          "tooltip": null
        },
        "redirect-basic": {
          "value": true,
          "tooltip": null
        },
        "redirect-pro": {
          "value": true,
          "tooltip": null
        },
        "redirect-enterprise": {
          "value": true,
          "tooltip": null
        }
      }
    },
    {
      "id": "analytics.detail",
      "category": "Analytics",
      "label": "Detailed analytics",
      "tooltip": null,
      "type": "bool",
      "plans": {
        "redirect-free": {
          "value": false,
          "tooltip": null
        },
        "redirect-basic": {
          "value": false,
          "tooltip": null
        },
        "redirect-pro": {
          "value": true,
          "tooltip": null
        },
        "redirect-enterprise": {
          "value": true,
          "tooltip": null
        }
      }
    },
    {
      "id": "analytics.raw",
      "category": "Analytics",
      "label": "Raw log export",
      "tooltip": "We can send original http log to your email",
      "type": "bool",
      "plans": {
        "redirect-free": {
          "value": false,
          "tooltip": null
        },
        "redirect-basic": {
          "value": false,
          "tooltip": null
        },
        "redirect-pro": {
          "value": true,
          "tooltip": null
        },
        "redirect-enterprise": {
          "value": true,
          "tooltip": null
        }
      }
    },
    {
      "id": "analytics.history",
      "category": "Analytics",
      "label": "More analytics history",
      "tooltip": "Look back over 12 months of basic historical analytics data.",
      "type": "text",
      "plans": {
        "redirect-free": {
          "value": null,
          "tooltip": null
        },
        "redirect-basic": {
          "value": null,
          "tooltip": null
        },
        "redirect-pro": {
          "value": null,
          "tooltip": null
        },
        "redirect-enterprise": {
          "value": null,
          "tooltip": null
        }
      }
    },
    {
      "id": "analytics.email",
      "category": "Analytics",
      "label": "Emailed reports ",
      "tooltip": null,
      "type": "bool",
      "plans": {
        "redirect-free": {
          "value": false,
          "tooltip": null
        },
        "redirect-basic": {
          "value": false,
          "tooltip": null
        },
        "redirect-pro": {
          "value": false,
          "tooltip": null
        },
        "redirect-enterprise": {
          "value": true,
          "tooltip": null
        }
      }
    },
    {
      "id": "security.encryption",
      "category": "Security & Compliance",
      "label": "Data encryption at rest/in transit ",
      "tooltip": null,
      "type": "bool",
      "plans": {
        "redirect-free": {
          "value": true,
          "tooltip": null
        },
        "redirect-basic": {
          "value": true,
          "tooltip": null
        },
        "redirect-pro": {
          "value": true,
          "tooltip": null
        },
        "redirect-enterprise": {
          "value": true,
          "tooltip": null
        }
      }
    },
    {
      "id": "security.2fs",
      "category": "Security & Compliance",
      "label": "Two-factor authentication ",
      "tooltip": null,
      "type": "bool",
      "plans": {
        "redirect-free": {
          "value": true,
          "tooltip": null
        },
        "redirect-basic": {
          "value": true,
          "tooltip": null
        },
        "redirect-pro": {
          "value": true,
          "tooltip": null
        },
        "redirect-enterprise": {
          "value": true,
          "tooltip": null
        }
      }
    },
    {
      "id": "security.sso",
      "category": "Security & Compliance",
      "label": "SAML single sign-on",
      "tooltip": null,
      "type": "bool",
      "plans": {
        "redirect-free": {
          "value": false,
          "tooltip": null
        },
        "redirect-basic": {
          "value": false,
          "tooltip": null
        },
        "redirect-pro": {
          "value": false,
          "tooltip": null
        },
        "redirect-enterprise": {
          "value": true,
          "tooltip": null
        }
      }
    },
    {
      "id": "security.assessment",
      "category": "Security & Compliance",
      "label": "Security assessment",
      "tooltip": null,
      "type": "bool",
      "plans": {
        "redirect-free": {
          "value": false,
          "tooltip": null
        },
        "redirect-basic": {
          "value": false,
          "tooltip": null
        },
        "redirect-pro": {
          "value": false,
          "tooltip": null
        },
        "redirect-enterprise": {
          "value": true,
          "tooltip": null
        }
      }
    },
    {
      "id": "support.email",
      "category": "Support",
      "label": "Email Support",
      "tooltip": null,
      "type": "bool",
      "plans": {
        "redirect-free": {
          "value": true,
          "tooltip": null
        },
        "redirect-basic": {
          "value": true,
          "tooltip": null
        },
        "redirect-pro": {
          "value": true,
          "tooltip": null
        },
        "redirect-enterprise": {
          "value": true,
          "tooltip": null
        }
      }
    },
    {
      "id": "support.livechat",
      "category": "Support",
      "label": "Live chat",
      "tooltip": null,
      "type": "bool",
      "plans": {
        "redirect-free": {
          "value": true,
          "tooltip": null
        },
        "redirect-basic": {
          "value": true,
          "tooltip": null
        },
        "redirect-pro": {
          "value": true,
          "tooltip": null
        },
        "redirect-enterprise": {
          "value": true,
          "tooltip": null
        }
      }
    },
    {
      "id": "support.sla",
      "category": "Support",
      "label": "100% uptime SLA",
      "tooltip": null,
      "type": "bool",
      "plans": {
        "redirect-free": {
          "value": false,
          "tooltip": null
        },
        "redirect-basic": {
          "value": false,
          "tooltip": null
        },
        "redirect-pro": {
          "value": false,
          "tooltip": null
        },
        "redirect-enterprise": {
          "value": true,
          "tooltip": null
        }
      }
    },
    {
      "id": "support.email-sla",
      "category": "Support",
      "label": "Email Support SLA",
      "tooltip": null,
      "type": "bool",
      "plans": {
        "redirect-free": {
          "value": false,
          "tooltip": null
        },
        "redirect-basic": {
          "value": false,
          "tooltip": null
        },
        "redirect-pro": {
          "value": false,
          "tooltip": null
        },
        "redirect-enterprise": {
          "value": true,
          "tooltip": null
        }
      }
    },
    {
      "id": "support.onboarding",
      "category": "Support",
      "label": "Onboarding Support",
      "tooltip": null,
      "type": "bool",
      "plans": {
        "redirect-free": {
          "value": false,
          "tooltip": null
        },
        "redirect-basic": {
          "value": false,
          "tooltip": null
        },
        "redirect-pro": {
          "value": false,
          "tooltip": null
        },
        "redirect-enterprise": {
          "value": true,
          "tooltip": null
        }
      }
    },
    {
      "id": "support.manager",
      "category": "Support",
      "label": "Account Manager",
      "tooltip": null,
      "type": "bool",
      "plans": {
        "redirect-free": {
          "value": false,
          "tooltip": null
        },
        "redirect-basic": {
          "value": false,
          "tooltip": null
        },
        "redirect-pro": {
          "value": false,
          "tooltip": null
        },
        "redirect-enterprise": {
          "value": true,
          "tooltip": null
        }
      }
    }
  ]
};

export const getRecommendedRedirectPlan = (hostnameCount: number): string => {
  if (hostnameCount <= 5) return 'redirect-free';
  if (hostnameCount <= 100) return 'redirect-basic';
  if (hostnameCount <= 50000) return 'redirect-pro';
  return 'redirect-enterprise';
};

export const getRedirectSliderConfig = () => {
  const proPlan = redirectData.plans.find(p => p.id === 'redirect-pro');
  let proMaxHostnames = 50000;
  if (proPlan) {
    const baseHosts = proPlan.limits.find(l => l.id === 'hosts')?.from || 15;
    const maxAddon = proPlan.addons.length > 0
      ? Math.max(...proPlan.addons.map(a => a.limits.hosts))
      : 0;
    proMaxHostnames = baseHosts + maxAddon;
  }

  const maxHostnames = 100000; 

  const sliderTicks = [
    { value: 5, label: '5' },        
    { value: 15, label: '15' },     
    { value: 25, label: '25' },     
    { value: 50, label: '50' },     
    { value: 100, label: '100' },    
    { value: 250, label: '250' },    
    { value: 500, label: '500' },    
    { value: 1000, label: '1K' },  
    { value: 2500, label: '2.5K' },  
    { value: 5000, label: '5K' }, 
    { value: 10000, label: '10K' }, 
    { value: 15000, label: '15K' }, 
    { value: 25000, label: '25K' }, 
    { value: 50000, label: '50K' },  
    { value: 100000, label: '100K' }, 
  ];

  return {
    min: 5, 
    max: maxHostnames,
    ticks: sliderTicks,
    proMaxHostnames, 
  };
};

export const calculatePlanPricing = (plan: RedirectPlan, hostnameCount: number, isAnnually: boolean) => {
    const hostsLimit = plan.limits.find((l) => l.id === 'hosts');
    const baseHostnames = hostsLimit?.from || 0;
    const maxBaseHostnames = hostsLimit?.to;

    let addonPrice = 0;
    let totalHostnames = baseHostnames;
    let isUnavailable = false;
    let selectedAddon: any = null;

    if (baseHostnames === 0) {
        totalHostnames = Infinity;
    } else if (hostnameCount > baseHostnames) {
        if (plan.addons && plan.addons.length > 0) {
            const sortedAddons = [...plan.addons].sort((a, b) => a.limits.hosts - b.limits.hosts);
            const requiredAddon = sortedAddons.find((addon) =>
                baseHostnames + addon.limits.hosts >= hostnameCount
            );
            if (requiredAddon) {
                addonPrice = isAnnually ? requiredAddon.annual_price : requiredAddon.price;
                totalHostnames = baseHostnames + requiredAddon.limits.hosts;
                selectedAddon = requiredAddon;
            } else {
                isUnavailable = true;
                const maxAddon = sortedAddons[sortedAddons.length - 1];
                totalHostnames = baseHostnames + maxAddon.limits.hosts;
            }
        } else {
            isUnavailable = true;
            if (maxBaseHostnames !== null && maxBaseHostnames !== undefined) {
                totalHostnames = maxBaseHostnames;
            }
        }
    }
    const basePrice = isAnnually ? plan.annual_price : plan.price;
    const totalPrice = typeof basePrice === 'number' ? basePrice + addonPrice : basePrice;
    return {
        totalPrice,
        isUnavailable,
        totalHostnames,
        basePrice,
        addonPrice,
        selectedAddon
    };
};