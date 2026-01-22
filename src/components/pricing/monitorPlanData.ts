export interface MonitorFeature {
  id: string;
  label: string;
  tooltip: string | null;
}

export const monitorData = {
  "plans": [
    {
      "id": "monitor-free",
      "label": "Free",
      "badge": null,
      "product": "monitor",
      "product_name": "Monitoring",
      "parent": null,
      "children": 0,
      "free": true,
      "price": 0,
      "annual_price": 0,
      "currency": "usd",
      "addons": [],
      "limits": [
        {
          "id": "tasks",
          "from": 3,
          "to": null,
          "text_list": "3 monitorings",
          "text_subscribe": "3 monitorings",
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
      "features": [] as MonitorFeature[],
      "level": 0
    },
    {
      "id": "monitor-basic",
      "label": "Basic",
      "badge": null,
      "product": "monitor",
      "product_name": "Monitoring",
      "parent": null,
      "children": 1,
      "free": false,
      "price": 10,
      "annual_price": 100,
      "currency": "usd",
      "addons": [],
      "limits": [
        {
          "id": "tasks",
          "from": 10,
          "to": null,
          "text_list": "10 monitorings",
          "text_subscribe": "10 monitorings",
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
      "features": [] as MonitorFeature[],
      "level": 1
    },
    {
      "id": "monitor-plus",
      "label": "Pro",
      "badge": "Popular",
      "product": "monitor",
      "product_name": "Monitoring",
      "parent": null,
      "children": 0,
      "free": false,
      "price": 90,
      "annual_price": 900,
      "currency": "usd",
      "addons": [],
      "limits": [
        {
          "id": "tasks",
          "from": 150,
          "to": null,
          "text_list": "150 monitorings",
          "text_subscribe": "150 monitorings",
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
      "features": [] as MonitorFeature[],
      "level": 3
    },
    {
      "id": "monitor-business",
      "label": "Business",
      "badge": null,
      "product": "monitor",
      "product_name": "Monitoring",
      "parent": null,
      "children": 0,
      "free": false,
      "price": 290,
      "annual_price": 2900,
      "currency": "usd",
      "addons": [],
      "limits": [
        {
          "id": "tasks",
          "from": 800,
          "to": null,
          "text_list": "800 monitorings",
          "text_subscribe": "800 monitorings",
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
      "features": [] as MonitorFeature[],
      "level": 5
    },
    {
      "id": "monitor-enterprise",
      "label": "Enterprise",
      "badge": null,
      "product": "monitor",
      "product_name": "Monitoring",
      "parent": null,
      "children": 0,
      "free": false,
      "price": 1000,
      "annual_price": 10000,
      "currency": "usd",
      "addons": [],
      "limits": [
        {
          "id": "tasks",
          "from": 0,
          "to": null,
          "text_list": "Unlimited monitorings",
          "text_subscribe": "Unlimited monitorings",
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
      "features": [] as MonitorFeature[],
      "level": 50
    }
  ],
  "comparison": [
    {
      "id": "basic.tasks",
      "category": "Basic",
      "label": "Monotorings",
      "tooltip": null,
      "type": "bool" as const,
      "plans": {
        "monitor-free": {
          "value": false,
          "tooltip": null
        },
        "monitor-basic": {
          "value": false,
          "tooltip": null
        },
        "monitor-plus": {
          "value": false,
          "tooltip": null
        },
        "monitor-business": {
          "value": false,
          "tooltip": null
        },
        "monitor-enterprise": {
          "value": true,
          "tooltip": null
        }
      } as Record<string, { value: boolean | string; tooltip: null }>
    }
  ]
};
