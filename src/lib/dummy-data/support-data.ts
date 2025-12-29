const details = `
      <p>When you want to forward your domain, Network Solutions provides basic support. However, essential features like HTTPS and Analytics are missing.</p>
      <p>When you set up a redirect at Network Solutions, you need to manage the security of both domains yourself, as there’s no automatic installation of an SSL certificate. This can result in SSL errors when visiting the domain via HTTPS.</p>
      
      <h2>So, how do you secure your site with HTTPS when using Network Solutions?</h2>
      <p>RedirHub can handle this effortlessly. RedirHub automatically installs and manages the SSL certificates on your website, ensuring your security is always up to date. Plus, with RedirHub, redirecting your apex domain to the www version of your domain is done in a few clicks.</p>
      
      <h3>Step 1: Create a RedirHub account</h3>
      <p>Get started by creating an account: <a href="#">RedirHub Registration</a>.</p>
      
      <h3>Step 2: Add your domain to RedirHub</h3>
      <p>Add the domain you wish to redirect. For our example, we have a domain with Network Solutions ‘redirhub-example-network-solutions.xyz’.</p>
      <img src="/assets/images/solutions/SplitTesting.jpeg" alt="Add Domain" />
      
      <h3>Step 3: Navigate to Network Solutions</h3>
      <p>To allow redirecting via RedirHub, we need to make a one-time DNS change at Network Solutions.</p>
      <p>Log in with your Network Solutions credentials and from your Dashboard, click on ‘Domain Name’.</p>
      
      <h3>Step 4: Changing the DNS</h3>
      <p>Before adding the correct DNS records, make sure any existing A record for ‘www’ and ‘@’ are removed. Then add the following records:</p>
      <ul>
        <li>Record with Type ‘A’ Name ‘@’ and Value ‘3.33.236.10’</li>
        <li>Record with Type ‘CNAME’ Name ‘www’ and Value ‘edge.redirhub.com’</li>
      </ul>
      
      <h2>Closing: RedirHub is now set up with automatic HTTPS!</h2>
      <p>You’re all set! You’ve successfully set up RedirHub with Network Solutions. Your domain now has full HTTPS support and is redirecting via RedirHub.</p>
    `;

export const SUPPORT_ARTICLES = [
  // walkthrough
  {
    id: "1",
    title: "Azure DNS: URL redirects with HTTPS support",
    category: "walkthrough",
    slug: "azure-dns-redirects",
    content: details,
  },
  {
    id: "2",
    title: "Network Solutions: URL redirects with HTTPS support",
    category: "walkthrough",
    slug: "network-solutions-redirects",
    content: details,
  },
  {
    id: "3",
    title: "Namecheap: URL redirects with HTTPS support",
    category: "walkthrough",
    slug: "namecheap-redirects",
    content: details,
  },
  {
    id: "4",
    title: "Hover: URL redirects with HTTPS support",
    category: "walkthrough",
    slug: "hover-redirects",
    content: details,
  },
  {
    id: "5",
    title: "TransIP: URL redirects with HTTPS support",
    category: "walkthrough",
    slug: "transip-redirects",
    content: details,
  },
  {
    id: "6",
    title: "NS1: URL redirects with HTTPS support",
    category: "walkthrough",
    slug: "ns1-redirects",
    content: details,
  },
  {
    id: "7",
    title: "Amazon Route 53: URL redirects with HTTPS support",
    category: "walkthrough",
    slug: "amazon-route-53-redirects",
    content: details,
  },
  {
    id: "8",
    title: "Google Cloud DNS: URL redirects with HTTPS support",
    category: "walkthrough",
    slug: "google-cloud-dns-redirects",
    content: details,
  },
  {
    id: "9",
    title: "EuroDNS: URL redirects with HTTPS support",
    category: "walkthrough",
    slug: "eurodns-redirects",
    content: details,
  },
  {
    id: "10",
    title: "DNS Made Easy: URL redirects with HTTPS support",
    category: "walkthrough",
    slug: "dns-made-easy-redirects",
    content: details,
  },
  {
    id: "11",
    title:
      "Mijndomein: HTTPS URL Redirect Tutorial: Easy Step-by-Step Instructions",
    category: "walkthrough",
    slug: "mijndomein-redirects",
    content: details,
  },
  {
    id: "12",
    title:
      "Freenom: HTTPS URL Redirect Tutorial: Easy Step-by-Step Instructions",
    category: "walkthrough",
    slug: "freenom-redirects",
    content: details,
  },
  {
    id: "13",
    title: "DigitalOcean: URL redirects with HTTPS support",
    category: "walkthrough",
    slug: "digitalocean-redirects",
    content: details,
  },
  {
    id: "14",
    title: "How to Redirect CloudFlare Domain to Another URL for Free",
    category: "walkthrough",
    slug: "cloudflare-redirects",
    content: details,
  },
  {
    id: "15",
    title: "How to Forward GoDaddy Domain with HTTPS for Free",
    category: "walkthrough",
    slug: "godaddy-redirects",
    content: details,
  },

  // FEATURES
  { id: "16", title: "Nameservers", category: "Feature", slug: "nameservers" },
  {
    id: "17",
    title: "Wildcard Subdomains",
    category: "Feature",
    slug: "wildcard-subdomains",
    content: details,
  },
  {
    id: "18",
    title: "Service Level Agreement (SLA)",
    category: "Feature",
    slug: "sla",
    content: details,
  },
  {
    id: "19",
    title: "Matching",
    category: "Feature",
    slug: "matching",
    content: details,
  },
  {
    id: "20",
    title: "Dedicated IP for your redirects",
    category: "Feature",
    slug: "dedicated-ip",
    content: details,
  },
  {
    id: "21",
    title: "Automatic HTTPS",
    category: "Feature",
    slug: "automatic-https",
    content: details,
  },

  // FAQ
  {
    id: "22",
    title: "What happens if the requests limit is exceeded?",
    category: "FAQ",
    slug: "request-limit-exceeded",
    content: details,
  },
  {
    id: "23",
    title: "What can I do with the Free plan?",
    category: "FAQ",
    slug: "free-plan-details",
    content: details,
  },
  {
    id: "24",
    title: "What DNS types can I use?",
    category: "FAQ",
    slug: "dns-types",
    content: details,
  },
  {
    id: "25",
    title: "What are these DNS changes?",
    category: "FAQ",
    slug: "dns-changes-explanation",
    content: details,
  },
  {
    id: "26",
    title: "How long does the DNS change take?",
    category: "FAQ",
    slug: "dns-propagation-time",
    content: details,
  },
  {
    id: "27",
    title: "Is RedirHub for me?",
    category: "FAQ",
    slug: "is-redirhub-for-me",
    content: details,
  },
  {
    id: "28",
    title: "What is RedirHub?",
    category: "FAQ",
    slug: "what-is-redirhub",
    content: details,
  },
  {
    id: "29",
    title: "How to update your nameservers",
    category: "FAQ",
    slug: "update-nameservers",
    content: details,
  },

  // GUIDES
  {
    id: "30",
    title: "Troubleshooting new redirects",
    category: "Guide",
    slug: "troubleshooting-redirects",
    content: details,
  },
  {
    id: "31",
    title: "Redirecting non-www to www",
    category: "Guide",
    slug: "non-www-to-www",
    content: details,
  },
  {
    id: "32",
    title: "Getting Started",
    category: "Guide",
    slug: "getting-started",
    content: details,
  },
  {
    id: "33",
    title: "Setting Up URL Redirects with RedirHub: A Step-by-Step Guide",
    category: "Guide",
    slug: "step-by-step-setup",
    content: details,
  },
];
