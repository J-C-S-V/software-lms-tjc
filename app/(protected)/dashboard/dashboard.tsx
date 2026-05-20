// app/dashboard/page.tsx (or wherever your server component lives)
export default function Dashboard() {
  // --- mock data ---
  const stats = [
    { title: 'Total Revenue', value: '$45,231.89', change: '+20.1%', up: true },
    { title: 'Subscriptions', value: '2,350', change: '+180.1%', up: true },
    { title: 'Sales', value: '12,234', change: '+19%', up: true },
    { title: 'Active Now', value: '573', change: '-3.2%', up: false }
  ];

  const revenueData = [
    { month: 'Jan', amount: 18600 },
    { month: 'Feb', amount: 24200 },
    { month: 'Mar', amount: 19800 },
    { month: 'Apr', amount: 30500 },
    { month: 'May', amount: 28700 },
    { month: 'Jun', amount: 33400 }
  ];

  const maxRevenue = Math.max(...revenueData.map((d) => d.amount));

  const recentOrders = [
    {
      id: '#3210',
      customer: 'Olivia Martin',
      product: 'Pro Plan',
      amount: '$249.00',
      status: 'Paid'
    },
    {
      id: '#3209',
      customer: 'Ava Johnson',
      product: 'Business Plan',
      amount: '$599.00',
      status: 'Pending'
    },
    {
      id: '#3208',
      customer: 'Michael Johnson',
      product: 'Pro Plan',
      amount: '$249.00',
      status: 'Paid'
    },
    {
      id: '#3207',
      customer: 'Lisa Anderson',
      product: 'Starter Plan',
      amount: '$99.00',
      status: 'Refunded'
    },
    {
      id: '#3206',
      customer: 'Samantha Green',
      product: 'Business Plan',
      amount: '$599.00',
      status: 'Paid'
    }
  ];

  const navItems = [
    { label: 'Dashboard', active: true },
    { label: 'Analytics' },
    { label: 'Customers' },
    { label: 'Orders' },
    { label: 'Settings' }
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* ---------- Sidebar ---------- */}
      <aside className="hidden md:flex md:flex-col md:w-64 bg-gray-900 text-white">
        <div className="px-6 py-8 text-2xl font-bold tracking-tight border-b border-gray-700">
          Acme Inc.
        </div>
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map((item) => (
            <a
              key={item.label}
              href="#"
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                item.active
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              {/* simple emoji as icon – no library needed */}
              <span className="mr-3 text-base">
                {item.label === 'Dashboard' && '📊'}
                {item.label === 'Analytics' && '📈'}
                {item.label === 'Customers' && '👥'}
                {item.label === 'Orders' && '📦'}
                {item.label === 'Settings' && '⚙️'}
              </span>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-700 text-xs text-gray-400">© 2026 Acme Inc.</div>
      </aside>

      {/* ---------- Main content ---------- */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* top bar */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              {/* mobile menu placeholder (no JS) */}
              <button className="md:hidden text-gray-500 hover:text-gray-700 p-1">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                  />
                </svg>
                <input
                  type="search"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 w-64 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  // readOnly because server component – no state
                  readOnly
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium text-gray-600">
                JD
              </div>
            </div>
          </div>
        </header>

        {/* main scrollable area */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* KPI cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div key={stat.title} className="bg-white rounded-xl shadow p-5">
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
                <div className="mt-2 flex items-center text-xs font-medium">
                  <span
                    className={`flex items-center gap-1 ${stat.up ? 'text-emerald-600' : 'text-red-600'}`}
                  >
                    {stat.up ? '▲' : '▼'} {stat.change}
                  </span>
                  <span className="text-gray-400 ml-1">from last month</span>
                </div>
              </div>
            ))}
          </div>

          {/* Chart + recent orders */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* bar chart card */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Revenue Overview</h3>
              <div className="flex items-end justify-between h-48 gap-2">
                {revenueData.map((item) => {
                  const heightPercent = (item.amount / maxRevenue) * 100;
                  return (
                    <div key={item.month} className="flex flex-col items-center flex-1">
                      {/* bar */}
                      <div
                        className="w-full bg-blue-100 rounded-t relative"
                        style={{ height: `${heightPercent}%` }}
                      >
                        <div
                          className="absolute bottom-0 left-0 right-0 bg-blue-500 rounded-t"
                          style={{ height: '100%' }}
                        ></div>
                      </div>
                      {/* label */}
                      <span className="text-xs text-gray-500 mt-2">{item.month}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* recent orders table card */}
            <div className="bg-white rounded-xl shadow p-6 overflow-auto">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Orders</h3>
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 border-b">
                    <th className="pb-2 font-medium">Order</th>
                    <th className="pb-2 font-medium">Customer</th>
                    <th className="pb-2 font-medium">Product</th>
                    <th className="pb-2 font-medium">Amount</th>
                    <th className="pb-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b last:border-0 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-3 font-medium text-gray-900">{order.id}</td>
                      <td className="py-3 text-gray-600">{order.customer}</td>
                      <td className="py-3 text-gray-600">{order.product}</td>
                      <td className="py-3 text-gray-900">{order.amount}</td>
                      <td className="py-3">
                        <span
                          className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                            order.status === 'Paid'
                              ? 'bg-emerald-100 text-emerald-700'
                              : order.status === 'Pending'
                                ? 'bg-amber-100 text-amber-700'
                                : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
